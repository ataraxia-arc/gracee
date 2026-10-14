import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Menu, Package, UserRound, X } from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Wordmark } from "@/components/ui";

const subscribe = () => () => {};

export function Workspace({
  crumb,
  title,
  action,
  children,
}: {
  crumb: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { user, isPending } = useCurrentUserState();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const gate = useSyncExternalStore(subscribe, hasGateSessionMarker, () => false);

  if (isPending) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream text-sm text-muted">
        Loading your workspace…
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const initials = (user.displayName ?? user.primaryEmail ?? "G")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const items = [
    { label: "Overview", to: "/dashboard" as const, icon: LayoutDashboard },
    { label: "Products", to: "/products" as const, icon: Package },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink lg:grid lg:grid-cols-[248px_1fr]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-line bg-ivory p-5 transition-transform lg:static lg:w-auto lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="GRXX INTELLIGENCE home">
            <Wordmark />
          </Link>
          <button type="button" className="lg:hidden" aria-label="Close sidebar" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-1" aria-label="Workspace">
          {items.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-2xl px-3 text-sm ${active ? "bg-charcoal text-cream" : "text-ink hover:bg-white"}`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/dashboard"
            hash="account"
            onClick={() => setOpen(false)}
            className={`flex h-11 items-center gap-3 rounded-2xl px-3 text-sm ${hash === "account" ? "bg-white" : "text-ink hover:bg-white"}`}
          >
            <UserRound size={16} />
            Account
          </Link>
        </nav>
        <div className="absolute bottom-5 left-5 right-5">
          {gate ? (
            <p className="text-xs leading-5 text-muted">Signed in with your Grok session.</p>
          ) : (
            <button
              type="button"
              disabled={leaving}
              onClick={() => {
                setLeaving(true);
                void signOut("/").catch(() => setLeaving(false));
              }}
              className="flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-sm hover:bg-white disabled:cursor-wait"
            >
              <LogOut size={16} />
              {leaving ? "Signing out…" : "Logout"}
            </button>
          )}
        </div>
      </aside>
      {open ? <button type="button" aria-label="Close menu" className="fixed inset-0 z-30 bg-void/30 lg:hidden" onClick={() => setOpen(false)} /> : null}
      <div className="min-w-0">
        <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden" aria-label="Open sidebar" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
            <p className="text-sm text-muted">{crumb}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm">Welcome, {user.displayName ?? "there"}</p>
              <p className="text-xs text-muted">{user.primaryEmail}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-charcoal text-xs text-cream" aria-hidden="true">
              {initials}
            </span>
          </div>
        </header>
        <div className="px-4 py-8 sm:px-8">
          {title ? (
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h1 className="text-4xl tracking-tight sm:text-5xl">{title}</h1>
              {action}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
