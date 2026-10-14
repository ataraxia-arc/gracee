import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { r as statusLabel } from "./inventory-math-B4fNaOwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DljB4Qx7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
function Wordmark({ light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-baseline gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-[15px] font-semibold tracking-[0.2em] ${light ? "text-white" : "text-ink"}`,
			children: "GRXX"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-[10px] font-medium tracking-[0.22em] ${light ? "text-soft" : "text-muted"}`,
			children: "INTELLIGENCE"
		})]
	});
}
function PillLink({ to, search, hash, children, tone = "ink" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		hash,
		className: `inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${tone === "ink" ? "bg-charcoal text-cream hover:bg-ink" : tone === "light" ? "bg-white/10 text-white border border-white/20 hover:bg-white/16" : "bg-transparent text-ink border border-line hover:bg-white"}`,
		children
	});
}
function PillButton({ children, tone = "ink", type = "button", disabled, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: `inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${tone === "ink" ? "bg-charcoal text-cream hover:bg-ink" : "bg-transparent text-ink border border-line hover:bg-ivory"}`,
		children
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs tracking-wide ${status === "out" ? "bg-charcoal text-cream" : status === "low" ? "bg-ivory text-ink border border-line" : "bg-white text-ink border border-line"}`,
		children: statusLabel(status)
	});
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1.5 text-sm text-ink/70",
		children: message
	});
}
//#endregion
export { Wordmark as a, StatusPill as i, PillButton as n, useCurrentUserState as o, PillLink as r, FieldError as t };
