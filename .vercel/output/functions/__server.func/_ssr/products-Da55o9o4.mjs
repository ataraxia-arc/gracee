import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatMoney } from "./inventory-math-B4fNaOwi.mjs";
import { i as StatusPill, n as PillButton, o as useCurrentUserState, t as FieldError } from "./ui-DljB4Qx7.mjs";
import { a as Search, i as Trash2, o as Plus, s as Pencil } from "../_libs/lucide-react.mjs";
import { a as listProducts, n as createProduct, o as updateProduct, r as deleteProduct, t as Workspace } from "./inventory-mY_7ygAe.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-B8oW-HXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Da55o9o4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	sku: "",
	category: "",
	description: "",
	price: 0,
	stockQuantity: 0,
	lowStockThreshold: 5
};
function ProductsPage() {
	const initial = Route$1.useSearch();
	const { user, isPending } = useCurrentUserState();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categoryOptions, setCategoryOptions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)(initial.q ?? "");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [editor, setEditor] = (0, import_react.useState)(initial.create === "1" ? { mode: "create" } : null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		const t = window.setTimeout(() => {
			setLoading(true);
			listProducts({ data: {
				search,
				category: category === "all" ? "" : category,
				status,
				sort
			} }).then((res) => {
				if (cancelled) return;
				if (!res.ok) {
					toast.error(res.error);
					return;
				}
				setProducts(res.data);
				if (!search && category === "all" && status === "all") setCategoryOptions(Array.from(new Set(res.data.map((p) => p.category))).sort());
			}).catch(() => {
				if (!cancelled) toast.error("Could not load products.");
			}).finally(() => {
				if (!cancelled) setLoading(false);
			});
		}, 180);
		return () => {
			cancelled = true;
			window.clearTimeout(t);
		};
	}, [
		search,
		category,
		status,
		sort,
		user,
		isPending
	]);
	async function refresh() {
		const res = await listProducts({ data: {
			search,
			category: category === "all" ? "" : category,
			status,
			sort
		} });
		if (res.ok) {
			setProducts(res.data);
			if (!search && category === "all" && status === "all") setCategoryOptions(Array.from(new Set(res.data.map((p) => p.category))).sort());
		}
	}
	async function save(input) {
		setBusy(true);
		try {
			const res = editor?.mode === "edit" && editor.product ? await updateProduct({ data: {
				...input,
				id: editor.product.id
			} }) : await createProduct({ data: input });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Workspace, {
		crumb: "Products",
		title: "Products",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PillButton, {
			onClick: () => setEditor({ mode: "create" }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
				size: 16,
				className: "mr-2"
			}), " Add Product"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface mb-4 grid gap-3 p-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block md:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search products"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field pl-10",
								placeholder: "Search name, SKU, or category",
								value: search,
								onChange: (e) => setSearch(e.target.value)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "field",
						value: category,
						onChange: (e) => setCategory(e.target.value),
						"aria-label": "Category",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All categories"
						}), categoryOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "field",
						value: status,
						onChange: (e) => setStatus(e.target.value),
						"aria-label": "Stock status",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "in",
								children: "In stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "low",
								children: "Low stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "out",
								children: "Out of stock"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "field",
						value: sort,
						onChange: (e) => setSort(e.target.value),
						"aria-label": "Sort",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "name",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_asc",
								children: "Price, low to high"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_desc",
								children: "Price, high to low"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "stock",
								children: "Stock, low to high"
							})
						]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface space-y-3 p-6",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 animate-pulse rounded-2xl bg-ivory" }, i))
			}) : showEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl tracking-tight",
						children: "Your inventory starts here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-md text-sm leading-6 text-muted",
						children: "Add your first product and begin building a clearer picture of your business."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
							onClick: () => setEditor({ mode: "create" }),
							children: "Add First Product"
						})
					})
				]
			}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface px-6 py-14 text-center text-sm text-muted",
				children: "No products match those filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface hidden overflow-x-auto md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 font-medium",
									children: "SKU"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 font-medium",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 font-medium",
									children: "Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 font-medium",
									children: "Qty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium",
									children: "Actions"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-5 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.name }), p.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-xs truncate text-xs text-muted",
									children: p.description
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-4 text-muted",
								children: p.sku
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-4",
								children: p.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-4 tabular-nums",
								children: formatMoney(p.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-4 tabular-nums",
								children: p.stockQuantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: p.status })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "rounded-full border border-line px-3 py-2 text-xs hover:bg-ivory",
										onClick: () => setEditor({
											mode: "edit",
											product: p
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 13 }), " Edit"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "rounded-full border border-line px-3 py-2 text-xs hover:bg-ivory",
										onClick: () => setPendingDelete(p),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 }), " Delete"]
										})
									})]
								})
							})
						]
					}, p.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3 md:hidden",
				children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									p.sku,
									" · ",
									p.category
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: p.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm tabular-nums",
							children: [
								formatMoney(p.price),
								" · ",
								p.stockQuantity,
								" units"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 flex-1 rounded-full border border-line text-sm",
								onClick: () => setEditor({
									mode: "edit",
									product: p
								}),
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-11 flex-1 rounded-full border border-line text-sm",
								onClick: () => setPendingDelete(p),
								children: "Delete"
							})]
						})
					]
				}, p.id))
			})] }),
			editor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, {
				mode: editor.mode,
				initial: editor.product ? {
					name: editor.product.name,
					sku: editor.product.sku,
					category: editor.product.category,
					description: editor.product.description,
					price: Number(editor.product.price),
					stockQuantity: editor.product.stockQuantity,
					lowStockThreshold: editor.product.lowStockThreshold
				} : emptyForm,
				busy,
				onClose: () => setEditor(null),
				onSave: save
			}) : null,
			pendingDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 grid place-items-end p-4 sm:place-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-void/40",
					"aria-label": "Cancel delete",
					onClick: () => setPendingDelete(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface relative w-full max-w-md p-6",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "delete-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "delete-title",
							className: "text-2xl tracking-tight",
							children: [
								"Delete ",
								pendingDelete.name,
								"?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted",
							children: "This removes the product from your inventory. The action cannot be undone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
								tone: "ghost",
								onClick: () => setPendingDelete(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
								disabled: busy,
								onClick: () => void confirmDelete(),
								children: busy ? "Deleting…" : "Delete product"
							})]
						})
					]
				})]
			}) : null
		]
	});
}
function ProductDialog({ mode, initial, busy, onClose, onSave }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [fields, setFields] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	function set(key, value) {
		setForm((f) => ({
			...f,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-end overflow-y-auto sm:place-items-center sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-void/40",
			"aria-label": "Close form",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "surface relative max-h-[100dvh] w-full max-w-xl overflow-y-auto p-6 sm:max-h-[90dvh]",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "product-form-title",
			onSubmit: async (e) => {
				e.preventDefault();
				const res = await onSave({
					...form,
					price: Number(form.price),
					stockQuantity: Number(form.stockQuantity),
					lowStockThreshold: Number(form.lowStockThreshold)
				});
				if (res && "ok" in res && !res.ok && res.fields) setFields(res.fields);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: mode === "create" ? "New product" : "Edit product"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "product-form-title",
					className: "mt-2 text-3xl tracking-tight",
					children: mode === "create" ? "Add a product" : "Update details"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm sm:col-span-2",
							children: [
								"Product name",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									value: form.name,
									onChange: (e) => set("name", e.target.value),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.name })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [
								"SKU",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									value: form.sku,
									onChange: (e) => set("sku", e.target.value),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.sku })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [
								"Category",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									list: "grxx-categories",
									value: form.category,
									onChange: (e) => set("category", e.target.value),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "grxx-categories",
									children: [
										"Electronics",
										"Apparel",
										"Grocery",
										"Office",
										"Home"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.category })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm sm:col-span-2",
							children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "field mt-1.5 min-h-24",
								value: form.description,
								onChange: (e) => set("description", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [
								"Price",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									type: "number",
									min: 0,
									step: "0.01",
									value: form.price,
									onChange: (e) => set("price", Number(e.target.value)),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.price })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: [
								"Stock quantity",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									type: "number",
									min: 0,
									step: "1",
									value: form.stockQuantity,
									onChange: (e) => set("stockQuantity", Number(e.target.value)),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.stockQuantity })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm sm:col-span-2",
							children: [
								"Low-stock threshold",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									type: "number",
									min: 0,
									step: "1",
									value: form.lowStockThreshold,
									onChange: (e) => set("lowStockThreshold", Number(e.target.value)),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: fields.lowStockThreshold })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
						tone: "ghost",
						onClick: onClose,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillButton, {
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Save product"
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductsPage as component };
