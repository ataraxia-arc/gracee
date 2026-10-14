import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Workspace } from "@/components/workspace";
import { PillLink, StatusPill } from "@/components/ui";
import { getDashboard, type DashboardData } from "@/lib/inventory";
import { formatCount, formatMoney } from "@/lib/inventory-math";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const EMPTY: DashboardData = {
  totalProducts: 0,
  totalUnits: 0,
  totalValue: "0.00",
  lowStockCount: 0,
  outOfStockCount: 0,
  inStockCount: 0,
  byCategory: [],
  recent: [],
  lowStock: [],
};

function DashboardPage() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<DashboardData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    setLoading(true);
    getDashboard()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your overview.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  const statusData = [
    { name: "In stock", value: data.inStockCount, fill: "#161616" },
    { name: "Low stock", value: data.lowStockCount, fill: "#9890FF" },
    { name: "Out of stock", value: data.outOfStockCount, fill: "#C6C3BD" },
  ].filter((d) => d.value > 0);

  return (
    <Workspace
      crumb="Overview"
      title="Your business, at a glance."
      action={<PillLink to="/products" search={{ create: "1" }}>Add product</PillLink>}
    >
      {error ? <p className="mb-6 text-sm" role="alert">{error}</p> : null}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total Products" value={loading ? "—" : formatCount(data.totalProducts)} hint="Records in your catalog" />
        <Metric label="Total Inventory Units" value={loading ? "—" : formatCount(data.totalUnits)} hint="Quantity on hand" />
        <Metric label="Total Inventory Value" value={loading ? "—" : formatMoney(data.totalValue)} hint="Price × quantity" />
        <Metric label="Low Stock Products" value={loading ? "—" : formatCount(data.lowStockCount)} hint="Above zero, at or under threshold" />
      </section>

      {!loading && data.totalProducts === 0 ? (
        <section className="surface mt-6 px-6 py-16 text-center">
          <h2 className="text-3xl tracking-tight">Your inventory starts here.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            Add your first product and begin building a clearer picture of your business.
          </p>
          <div className="mt-6">
            <PillLink to="/products" search={{ create: "1" }}>Add First Product</PillLink>
          </div>
        </section>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-5">
          <article className="surface p-6 xl:col-span-3">
            <h2 className="text-lg tracking-tight">Inventory distribution by category</h2>
            <p className="text-sm text-muted">Units held in each category</p>
            <div className="mt-4 h-64">
              {data.byCategory.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.byCategory} barSize={28}>
                    <XAxis dataKey="category" tick={{ fill: "#85837F", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fill: "#85837F", fontSize: 12 }} axisLine={false} tickLine={false} width={32} />
                    <Tooltip cursor={{ fill: "#F1EFE7" }} formatter={(v) => [formatCount(Number(v)), "Units"]} />
                    <Bar dataKey="units" fill="#161616" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted">Categories appear after you add products.</p>
              )}
            </div>
          </article>
          <article className="surface p-6 xl:col-span-2">
            <h2 className="text-lg tracking-tight">Stock status</h2>
            <p className="text-sm text-muted">Out, low, and in stock</p>
            <div className="mt-2 h-52">
              {statusData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} stroke="none">
                      {statusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="pt-10 text-sm text-muted">No stock to chart yet.</p>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>In stock</span><span className="tabular-nums">{data.inStockCount}</span></li>
              <li className="flex justify-between"><span>Low stock</span><span className="tabular-nums">{data.lowStockCount}</span></li>
              <li className="flex justify-between"><span>Out of stock</span><span className="tabular-nums">{data.outOfStockCount}</span></li>
            </ul>
          </article>
          <article className="surface p-6 xl:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg tracking-tight">Recent products</h2>
              <Link to="/products" className="text-sm text-muted hover:text-ink">View all</Link>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {data.recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm">{p.name}</p>
                    <p className="text-xs text-muted">{p.sku} · {p.category}</p>
                  </div>
                  <StatusPill status={p.status} />
                </li>
              ))}
              {!data.recent.length && !loading ? <li className="py-6 text-sm text-muted">No products yet.</li> : null}
            </ul>
          </article>
          <article className="surface p-6 xl:col-span-2">
            <h2 className="text-lg tracking-tight">Low-stock products</h2>
            <ul className="mt-4 space-y-3">
              {data.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                  <span>{p.name}</span>
                  <span className="tabular-nums text-muted">{p.stockQuantity} left</span>
                </li>
              ))}
              {!data.lowStock.length && !loading ? <li className="text-sm text-muted">Nothing is sitting at a low level.</li> : null}
            </ul>
          </article>
        </div>
      )}

      <section id="account" className="surface mt-6 scroll-mt-8 p-6">
        <h2 className="text-lg tracking-tight">Account</h2>
        <AccountLine />
      </section>
    </Workspace>
  );
}

function AccountLine() {
  const { user } = useCurrentUserState();
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      <p className="text-sm"><span className="text-muted">Name</span><br />{user?.displayName ?? "—"}</p>
      <p className="text-sm"><span className="text-muted">Email</span><br />{user?.primaryEmail ?? "—"}</p>
      <p className="text-sm leading-6 text-muted sm:col-span-2">
        This workspace shows only the products saved to the account you are signed in with. Inventory value is the sum of each product’s price multiplied by its quantity.
      </p>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="surface p-5">
      <p className="text-xs tracking-wide text-muted">{label}</p>
      <p className="mt-4 text-3xl tracking-tight tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </article>
  );
}
