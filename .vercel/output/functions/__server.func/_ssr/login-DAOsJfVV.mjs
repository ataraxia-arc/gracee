import { o as __toESM } from "../_runtime.mjs";
import { C as useNavigate, Q as require_react, T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { a as Wordmark, o as useCurrentUserState } from "./ui-DljB4Qx7.mjs";
import { t as GROK_PROVIDERS } from "./server-DdoUD0a2.mjs";
import { t as RedirectToSignIn } from "./gates-CUxTjxua.mjs";
import { f as Eye, p as EyeOff } from "../_libs/lucide-react.mjs";
import { r as Route$2 } from "./router-B8oW-HXn.mjs";
import { t as hero_default } from "./hero-CcNMERMY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DAOsJfVV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const mode = Route$2.useSearch().mode ?? "login";
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-cream text-muted",
		children: "Opening GRXX INTELLIGENCE…"
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/dashboard" });
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		if (mode === "signup") {
			if (!name.trim()) return setError("Enter your full name.");
			if (password.length < 8) return setError("Use at least 8 characters.");
			if (password !== confirm) return setError("Passwords do not match.");
		}
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error: err } = await authClient.signUp.email({
					name: name.trim(),
					email: email.trim(),
					password,
					callbackURL: "/dashboard"
				});
				if (err) {
					setError(err.message ?? "Could not create the account.");
					return;
				}
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/dashboard"
				});
				if (err) {
					setError(err.message ?? "Those credentials were not recognized.");
					return;
				}
			}
			await navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden flex-col justify-between bg-cream p-10 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "GRXX INTELLIGENCE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display-md mt-4 max-w-md",
						children: [
							"A clearer way",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"to keep stock."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-sm text-sm leading-6 text-muted",
						children: "Intelligent Inventory. Effortless Control. Your products stay private to your account."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[1.75rem] border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "",
						className: "h-56 w-full object-cover object-[center_20%]"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center bg-ivory px-5 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: mode === "signup" ? "Create account" : "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-4xl tracking-tight",
						children: mode === "signup" ? "Start with GRXX" : "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/login",
								search: { mode: "login" }
							}),
							className: `rounded-full px-4 py-2 ${mode === "login" ? "bg-charcoal text-cream" : "text-muted"}`,
							children: "Login"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/login",
								search: { mode: "signup" }
							}),
							className: `rounded-full px-4 py-2 ${mode === "signup" ? "bg-charcoal text-cream" : "text-muted"}`,
							children: "Signup"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 space-y-4",
						noValidate: true,
						children: [
							mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									value: name,
									onChange: (e) => setName(e.target.value),
									autoComplete: "name",
									required: true
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									autoComplete: "email",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative mt-1.5 block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field pr-12",
										type: show ? "text" : "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										autoComplete: mode === "signup" ? "new-password" : "current-password",
										required: true,
										minLength: 8
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted",
										"aria-label": show ? "Hide password" : "Show password",
										onClick: () => setShow((v) => !v),
										children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
									})]
								})]
							}),
							mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Confirm password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1.5",
									type: show ? "text" : "password",
									value: confirm,
									onChange: (e) => setConfirm(e.target.value),
									autoComplete: "new-password",
									required: true
								})]
							}) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-2xl border border-line bg-white px-4 py-3 text-sm",
								role: "alert",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "mt-2 flex h-12 w-full items-center justify-center rounded-full bg-charcoal text-sm font-medium text-cream disabled:cursor-wait disabled:opacity-60",
								children: busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs tracking-[0.16em] text-muted",
							children: "OR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "h-11 rounded-full border border-line bg-white text-sm hover:bg-cream",
								onClick: () => void signIn(p.providerId, { callbackURL: "/dashboard" }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
