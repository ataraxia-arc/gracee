import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatMoney, t as formatCount } from "./inventory-math-B4fNaOwi.mjs";
import { i as StatusPill, o as useCurrentUserState, r as PillLink } from "./ui-DljB4Qx7.mjs";
import { i as getDashboard, t as Workspace } from "./inventory-mY_7ygAe.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as Pie, r as YAxis, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-SEDVWRgg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	totalProducts: 0,
	totalUnits: 0,
	totalValue: "0.00",
	lowStockCount: 0,
	outOfStockCount: 0,
	inStockCount: 0,
	byCategory: [],
	recent: [],
	lowStock: []
};
function DashboardPage() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(EMPTY);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		setLoading(true);
		getDashboard().then((res) => {
			if (!cancelled) setData(res);
		}).catch(() => {
			if (!cancelled) setError("Could not load your overview.");
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	const statusData = [
		{
			name: "In stock",
			value: data.inStockCount,
			fill: "#161616"
		},
		{
			name: "Low stock",
			value: data.lowStockCount,
			fill: "#9890FF"
		},
		{
			name: "Out of stock",
			value: data.outOfStockCount,
			fill: "#C6C3BD"
		}
	].filter((d) => d.value > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Workspace, {
		crumb: "Overview",
		title: "Your business, at a glance.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
			to: "/products",
			search: { create: "1" },
			children: "Add product"
		}),
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-sm",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total Products",
						value: loading ? "—" : formatCount(data.totalProducts),
						hint: "Records in your catalog"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total Inventory Units",
						value: loading ? "—" : formatCount(data.totalUnits),
						hint: "Quantity on hand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Total Inventory Value",
						value: loading ? "—" : formatMoney(data.totalValue),
						hint: "Price × quantity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Low Stock Products",
						value: loading ? "—" : formatCount(data.lowStockCount),
						hint: "Above zero, at or under threshold"
					})
				]
			}),
			!loading && data.totalProducts === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface mt-6 px-6 py-16 text-center",
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
							to: "/products",
							search: { create: "1" },
							children: "Add First Product"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface p-6 xl:col-span-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg tracking-tight",
								children: "Inventory distribution by category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Units held in each category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-64",
								children: data.byCategory.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: data.byCategory,
										barSize: 28,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "category",
												tick: {
													fill: "#85837F",
													fontSize: 12
												},
												axisLine: false,
												tickLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												allowDecimals: false,
												tick: {
													fill: "#85837F",
													fontSize: 12
												},
												axisLine: false,
												tickLine: false,
												width: 32
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												cursor: { fill: "#F1EFE7" },
												formatter: (v) => [formatCount(Number(v)), "Units"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "units",
												fill: "#161616",
												radius: [
													8,
													8,
													0,
													0
												]
											})
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Categories appear after you add products."
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface p-6 xl:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg tracking-tight",
								children: "Stock status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Out, low, and in stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-52",
								children: statusData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: statusData,
										dataKey: "value",
										nameKey: "name",
										innerRadius: 52,
										outerRadius: 78,
										paddingAngle: 3,
										stroke: "none",
										children: statusData.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.fill }, entry.name))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pt-10 text-sm text-muted",
									children: "No stock to chart yet."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: data.inStockCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Low stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: data.lowStockCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Out of stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: data.outOfStockCount
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface p-6 xl:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg tracking-tight",
								children: "Recent products"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/products",
								className: "text-sm text-muted hover:text-ink",
								children: "View all"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 divide-y divide-line",
							children: [data.recent.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										p.sku,
										" · ",
										p.category
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: p.status })]
							}, p.id)), !data.recent.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "py-6 text-sm text-muted",
								children: "No products yet."
							}) : null]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface p-6 xl:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg tracking-tight",
							children: "Low-stock products"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-3",
							children: [data.lowStock.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-muted",
									children: [p.stockQuantity, " left"]
								})]
							}, p.id)), !data.lowStock.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: "Nothing is sitting at a low level."
							}) : null]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "account",
				className: "surface mt-6 scroll-mt-8 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg tracking-tight",
					children: "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLine, {})]
			})
		]
	});
}
function AccountLine() {
	const { user } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 grid gap-3 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					user?.displayName ?? "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					user?.primaryEmail ?? "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-6 text-muted sm:col-span-2",
				children: "This workspace shows only the products saved to the account you are signed in with. Inventory value is the sum of each product’s price multiplied by its quantity."
			})
		]
	});
}
function Metric({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-3xl tracking-tight tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
