import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Workspace } from "@/components/workspace";
import { FieldError, PillButton, StatusPill } from "@/components/ui";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
  type Product,
  type ProductInput,
} from "@/lib/inventory";
import { formatMoney } from "@/lib/inventory-math";

type ProductSearch = { create?: "1"; q?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    create: search.create === "1" ? "1" : undefined,
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  component: ProductsPage,
});

const emptyForm: ProductInput = {
  name: "",
  sku: "",
  category: "",
  description: "",
  price: 0,
  stockQuantity: 0,
  lowStockThreshold: 5,
};

function ProductsPage() {
  const initial = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initial.q ?? "");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<"all" | "in" | "low" | "out">("all");
  const [sort, setSort] = useState<"newest" | "name" | "price_asc" | "price_desc" | "stock">("newest");
  const [editor, setEditor] = useState<{ mode: "create" | "edit"; product?: Product } | null>(
    initial.create === "1" ? { mode: "create" } : null,
  );
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      setLoading(true);
      listProducts({
        data: { search, category: category === "all" ? "" : category, status, sort },
      })
        .then((res) => {
          if (cancelled) return;
          if (!res.ok) {
            toast.error(res.error);
            return;
          }
          setProducts(res.data);
          if (!search && category === "all" && status === "all") {
            setCategoryOptions(Array.from(new Set(res.data.map((p) => p.category))).sort());
          }
        })
        .catch(() => {
          if (!cancelled) toast.error("Could not load products.");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 180);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [search, category, status, sort, user, isPending]);

  async function refresh() {
    const res = await listProducts({
      data: { search, category: category === "all" ? "" : category, status, sort },
    });
    if (res.ok) {
      setProducts(res.data);
      if (!search && category === "all" && status === "all") {
        setCategoryOptions(Array.from(new Set(res.data.map((p) => p.category))).sort());
      }
    }
  }

  async function save(input: ProductInput) {
    setBusy(true);
    try {
      const res =
        editor?.mode === "edit" && editor.product
          ? await updateProduct({ data: { ...input, id: editor.product.id } })
          : await createProduct({ data: input });
      if (!res.ok) {
        toast.error(res.error);
        return res;
      }
      toast.success(editor?.mode === "edit" ? "Product updated" : "Product added");
      setEditor(null);
      await refresh();
      return res;
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setBusy(true);
    try {
      const res = await deleteProduct({ data: pendingDelete.id });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Product deleted");
      setPendingDelete(null);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  const showEmpty = !loading && products.length === 0 && !search && category === "all" && status === "all";

  return (
    <Workspace
      crumb="Products"
      title="Products"
      action={
        <PillButton onClick={() => setEditor({ mode: "create" })}>
          <Plus size={16} className="mr-2" /> Add Product
        </PillButton>
      }
    >
      <div className="surface mb-4 grid gap-3 p-4 md:grid-cols-4">
        <label className="relative block md:col-span-1">
          <span className="sr-only">Search products</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="field pl-10"
            placeholder="Search name, SKU, or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select className="field" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          <option value="all">All categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="field" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Stock status">
          <option value="all">All stock</option>
          <option value="in">In stock</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
        <select className="field" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sort">
          <option value="newest">Newest</option>
          <option value="name">Name</option>
          <option value="price_asc">Price, low to high</option>
          <option value="price_desc">Price, high to low</option>
          <option value="stock">Stock, low to high</option>
        </select>
      </div>

      {loading ? (
        <div className="surface space-y-3 p-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-2xl bg-ivory" />
          ))}
        </div>
      ) : showEmpty ? (
        <section className="surface px-6 py-16 text-center">
          <h2 className="text-3xl tracking-tight">Your inventory starts here.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            Add your first product and begin building a clearer picture of your business.
          </p>
          <div className="mt-6">
            <PillButton onClick={() => setEditor({ mode: "create" })}>Add First Product</PillButton>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className="surface px-6 py-14 text-center text-sm text-muted">No products match those filters.</section>
      ) : (
        <>
          <div className="surface hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted">
                <tr className="border-b border-line">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-3 py-3 font-medium">SKU</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Price</th>
                  <th className="px-3 py-3 font-medium">Qty</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-4">
                      <p>{p.name}</p>
                      {p.description ? <p className="mt-1 max-w-xs truncate text-xs text-muted">{p.description}</p> : null}
                    </td>
                    <td className="px-3 py-4 text-muted">{p.sku}</td>
                    <td className="px-3 py-4">{p.category}</td>
                    <td className="px-3 py-4 tabular-nums">{formatMoney(p.price)}</td>
                    <td className="px-3 py-4 tabular-nums">{p.stockQuantity}</td>
                    <td className="px-3 py-4"><StatusPill status={p.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button type="button" className="rounded-full border border-line px-3 py-2 text-xs hover:bg-ivory" onClick={() => setEditor({ mode: "edit", product: p })}>
                          <span className="inline-flex items-center gap-1"><Pencil size={13} /> Edit</span>
                        </button>
                        <button type="button" className="rounded-full border border-line px-3 py-2 text-xs hover:bg-ivory" onClick={() => setPendingDelete(p)}>
                          <span className="inline-flex items-center gap-1"><Trash2 size={13} /> Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 md:hidden">
            {products.map((p) => (
              <li key={p.id} className="surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base">{p.name}</p>
                    <p className="text-xs text-muted">{p.sku} · {p.category}</p>
                  </div>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-3 text-sm tabular-nums">{formatMoney(p.price)} · {p.stockQuantity} units</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" className="h-11 flex-1 rounded-full border border-line text-sm" onClick={() => setEditor({ mode: "edit", product: p })}>Edit</button>
                  <button type="button" className="h-11 flex-1 rounded-full border border-line text-sm" onClick={() => setPendingDelete(p)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {editor ? (
        <ProductDialog
          mode={editor.mode}
          initial={
            editor.product
              ? {
                  name: editor.product.name,
                  sku: editor.product.sku,
                  category: editor.product.category,
                  description: editor.product.description,
                  price: Number(editor.product.price),
                  stockQuantity: editor.product.stockQuantity,
                  lowStockThreshold: editor.product.lowStockThreshold,
                }
              : emptyForm
          }
          busy={busy}
          onClose={() => setEditor(null)}
          onSave={save}
        />
      ) : null}

      {pendingDelete ? (
        <div className="fixed inset-0 z-50 grid place-items-end p-4 sm:place-items-center">
          <button type="button" className="absolute inset-0 bg-void/40" aria-label="Cancel delete" onClick={() => setPendingDelete(null)} />
          <div className="surface relative w-full max-w-md p-6" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title" className="text-2xl tracking-tight">Delete {pendingDelete.name}?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">This removes the product from your inventory. The action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-2">
              <PillButton tone="ghost" onClick={() => setPendingDelete(null)}>Cancel</PillButton>
              <PillButton disabled={busy} onClick={() => void confirmDelete()}>{busy ? "Deleting…" : "Delete product"}</PillButton>
            </div>
          </div>
        </div>
      ) : null}
    </Workspace>
  );
}

function ProductDialog({
  mode,
  initial,
  busy,
  onClose,
  onSave,
}: {
  mode: "create" | "edit";
  initial: ProductInput;
  busy: boolean;
  onClose: () => void;
  onSave: (input: ProductInput) => Promise<{ ok: boolean; fields?: Record<string, string> } | void>;
}) {
  const [form, setForm] = useState(initial);
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function set<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end overflow-y-auto sm:place-items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-void/40" aria-label="Close form" onClick={onClose} />
      <form
        className="surface relative max-h-[100dvh] w-full max-w-xl overflow-y-auto p-6 sm:max-h-[90dvh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await onSave({
            ...form,
            price: Number(form.price),
            stockQuantity: Number(form.stockQuantity),
            lowStockThreshold: Number(form.lowStockThreshold),
          });
          if (res && "ok" in res && !res.ok && res.fields) setFields(res.fields);
        }}
      >
        <p className="eyebrow">{mode === "create" ? "New product" : "Edit product"}</p>
        <h2 id="product-form-title" className="mt-2 text-3xl tracking-tight">
          {mode === "create" ? "Add a product" : "Update details"}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm sm:col-span-2">
            Product name
            <input className="field mt-1.5" value={form.name} onChange={(e) => set("name", e.target.value)} required />
            <FieldError message={fields.name} />
          </label>
          <label className="text-sm">
            SKU
            <input className="field mt-1.5" value={form.sku} onChange={(e) => set("sku", e.target.value)} required />
            <FieldError message={fields.sku} />
          </label>
          <label className="text-sm">
            Category
            <input className="field mt-1.5" list="grxx-categories" value={form.category} onChange={(e) => set("category", e.target.value)} required />
            <datalist id="grxx-categories">
              {["Electronics", "Apparel", "Grocery", "Office", "Home"].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <FieldError message={fields.category} />
          </label>
          <label className="text-sm sm:col-span-2">
            Description
            <textarea className="field mt-1.5 min-h-24" value={form.description} onChange={(e) => set("description", e.target.value)} />
          </label>
          <label className="text-sm">
            Price
            <input className="field mt-1.5" type="number" min={0} step="0.01" value={form.price} onChange={(e) => set("price", Number(e.target.value))} required />
            <FieldError message={fields.price} />
          </label>
          <label className="text-sm">
            Stock quantity
            <input className="field mt-1.5" type="number" min={0} step="1" value={form.stockQuantity} onChange={(e) => set("stockQuantity", Number(e.target.value))} required />
            <FieldError message={fields.stockQuantity} />
          </label>
          <label className="text-sm sm:col-span-2">
            Low-stock threshold
            <input className="field mt-1.5" type="number" min={0} step="1" value={form.lowStockThreshold} onChange={(e) => set("lowStockThreshold", Number(e.target.value))} required />
            <FieldError message={fields.lowStockThreshold} />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <PillButton tone="ghost" onClick={onClose}>Cancel</PillButton>
          <PillButton type="submit" disabled={busy}>{busy ? "Saving…" : "Save product"}</PillButton>
        </div>
      </form>
    </div>
  );
}
