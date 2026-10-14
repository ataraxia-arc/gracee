import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PillLink, Wordmark } from "@/components/ui";

const links = [
  { label: "Home", to: "/", hash: undefined as string | undefined },
  { label: "Features", to: "/", hash: "features" },
  { label: "Solutions", to: "/", hash: "solutions" },
  { label: "Dashboard", to: "/dashboard", hash: undefined },
  { label: "Products", to: "/products", hash: undefined },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="shrink-0" aria-label="GRXX INTELLIGENCE home">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = item.hash ? false : path === item.to && item.to !== "/";
            return (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className={`text-sm transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {isPending ? (
            <span className="h-11 w-28 rounded-full bg-line/70" />
          ) : user ? (
            <PillLink to="/dashboard">Open workspace</PillLink>
          ) : (
            <>
              <Link to="/login" className="px-3 text-sm text-ink hover:text-muted">
                Sign In
              </Link>
              <PillLink to="/login" search={{ mode: "signup" }}>
                Get Started
              </PillLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-ivory px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-base hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {user ? (
                <PillLink to="/dashboard">Open workspace</PillLink>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="grid h-11 place-items-center rounded-full border border-line"
                  >
                    Sign In
                  </Link>
                  <PillLink to="/login" search={{ mode: "signup" }}>
                    Get Started
                  </PillLink>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Intelligent Inventory. Effortless Control.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-muted">Home</Link></li>
            <li><Link to="/" hash="features" className="hover:text-muted">Features</Link></li>
            <li><Link to="/" hash="solutions" className="hover:text-muted">Solutions</Link></li>
            <li><Link to="/dashboard" className="hover:text-muted">Dashboard</Link></li>
            <li><Link to="/products" className="hover:text-muted">Products</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Account</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-muted">Sign In</Link></li>
            <li><Link to="/login" search={{ mode: "signup" }} className="hover:text-muted">Create account</Link></li>
            <li><Link to="/dashboard" hash="account" className="hover:text-muted">Account</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-line px-5 py-5 text-xs text-muted">
        <p>© {new Date().getFullYear()} GRXX INTELLIGENCE</p>
        <p>Inventory, organized with clarity.</p>
      </div>
    </footer>
  );
}
