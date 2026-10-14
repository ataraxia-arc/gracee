import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut } from "./client-1vAx-gM_.mjs";
import { a as Wordmark, o as useCurrentUserState } from "./ui-DljB4Qx7.mjs";
import { a as hasGateSessionMarker } from "./server-DdoUD0a2.mjs";
import { t as authMiddleware } from "./middleware-DCT6hHWT.mjs";
import { t as RedirectToSignIn } from "./gates-CUxTjxua.mjs";
import { c as Package, d as LayoutDashboard, l as Menu, n as UserRound, t as X, u as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-mY_7ygAe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribe = () => () => {};
function Workspace({ crumb, title, action, children }) {
	const { user, isPending } = useCurrentUserState();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const hash = useRouterState({ select: (s) => s.location.hash });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const gate = (0, import_react.useSyncExternalStore)(subscribe, hasGateSessionMarker, () => false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-cream text-sm text-muted",
		children: "Loading your workspace…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const initials = (user.displayName ?? user.primaryEmail ?? "G").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream text-ink lg:grid lg:grid-cols-[248px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 w-64 border-r border-line bg-ivory p-5 transition-transform lg:static lg:w-auto lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "GRXX INTELLIGENCE home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "lg:hidden",
							"aria-label": "Close sidebar",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-10 flex flex-col gap-1",
						"aria-label": "Workspace",
						children: [[{
							label: "Overview",
							to: "/dashboard",
							icon: LayoutDashboard
						}, {
							label: "Products",
							to: "/products",
							icon: Package
						}].map((item) => {
							const active = path === item.to;
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: `flex h-11 items-center gap-3 rounded-2xl px-3 text-sm ${active ? "bg-charcoal text-cream" : "text-ink hover:bg-white"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), item.label]
							}, item.label);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							hash: "account",
							onClick: () => setOpen(false),
							className: `flex h-11 items-center gap-3 rounded-2xl px-3 text-sm ${hash === "account" ? "bg-white" : "text-ink hover:bg-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 }), "Account"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-5 left-5 right-5",
						children: gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-5 text-muted",
							children: "Signed in with your Grok session."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: leaving,
							onClick: () => {
								setLeaving(true);
								signOut("/").catch(() => setLeaving(false));
							},
							className: "flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-sm hover:bg-white disabled:cursor-wait",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), leaving ? "Signing out…" : "Logout"]
						})
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close menu",
				className: "fixed inset-0 z-30 bg-void/30 lg:hidden",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden",
							"aria-label": "Open sidebar",
							onClick: () => setOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: crumb
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-right sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: ["Welcome, ", user.displayName ?? "there"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: user.primaryEmail
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-full bg-charcoal text-xs text-cream",
							"aria-hidden": "true",
							children: initials
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-8 sm:px-8",
					children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl tracking-tight sm:text-5xl",
							children: title
						}), action]
					}) : null, children]
				})]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listProducts = createServerFn({ method: "GET" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("e48423b7f039eaef36e9a5cee50455d668bd1893d939b0f522e23c7893602898"));
var createProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("aec1c50323080fcaac5616b82083d1900f615539fb17a28e5593c64e986ee604"));
var updateProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("1d799bd828188dab15e95fa8c6773d76c98159b65671cdbf8a5ae28eeceb51cc"));
var deleteProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("d226310449284e0e62b6f450e32bfb315d725e8b30dc0038babf13a9b5741f94"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3218daae38b514be8f535edf594be9b8b707e2992cfb2b6782bd375c60fc86fb"));
//#endregion
export { listProducts as a, getDashboard as i, createProduct as n, updateProduct as o, deleteProduct as r, Workspace as t };
