import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, signIn } from "@/lib/auth/client";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import hero from "@/assets/hero.jpg";
import { Wordmark } from "@/components/ui";

type Mode = "login" | "signup";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { mode?: Mode } => ({
    mode: search.mode === "signup" ? "signup" : search.mode === "login" ? "login" : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const mode: Mode = Route.useSearch().mode ?? "login";
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return <div className="grid min-h-screen place-items-center bg-cream text-muted">Opening GRXX INTELLIGENCE…</div>;
  }
  if (user) return <RedirectToSignIn to="/dashboard" />;

  async function onSubmit(e: FormEvent) {
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
          callbackURL: "/dashboard",
        });
        if (err) {
          setError(err.message ?? "Could not create the account.");
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/dashboard",
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

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between bg-cream p-10 lg:flex">
        <Wordmark />
        <div>
          <p className="eyebrow">GRXX INTELLIGENCE</p>
          <h1 className="display-md mt-4 max-w-md">
            A clearer way
            <br />
            to keep stock.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
            Intelligent Inventory. Effortless Control. Your products stay private to your account.
          </p>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-line">
          <img src={hero} alt="" className="h-56 w-full object-cover object-[center_20%]" />
        </div>
      </section>
      <section className="flex items-center justify-center bg-ivory px-5 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Wordmark />
          </div>
          <p className="eyebrow">{mode === "signup" ? "Create account" : "Welcome back"}</p>
          <h2 className="mt-3 text-4xl tracking-tight">
            {mode === "signup" ? "Start with GRXX" : "Sign in"}
          </h2>
          <div className="mt-6 flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => navigate({ to: "/login", search: { mode: "login" } })}
              className={`rounded-full px-4 py-2 ${mode === "login" ? "bg-charcoal text-cream" : "text-muted"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/login", search: { mode: "signup" } })}
              className={`rounded-full px-4 py-2 ${mode === "signup" ? "bg-charcoal text-cream" : "text-muted"}`}
            >
              Signup
            </button>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            {mode === "signup" ? (
              <label className="block text-sm">
                Full name
                <input className="field mt-1.5" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
              </label>
            ) : null}
            <label className="block text-sm">
              Email
              <input className="field mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </label>
            <label className="block text-sm">
              Password
              <span className="relative mt-1.5 block">
                <input
                  className="field pr-12"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((v) => !v)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            {mode === "signup" ? (
              <label className="block text-sm">
                Confirm password
                <input
                  className="field mt-1.5"
                  type={show ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </label>
            ) : null}
            {error ? (
              <p className="rounded-2xl border border-line bg-white px-4 py-3 text-sm" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-charcoal text-sm font-medium text-cream disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
          <div className="mt-8">
            <p className="text-center text-xs tracking-[0.16em] text-muted">OR</p>
            <div className="mt-4 grid gap-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  className="h-11 rounded-full border border-line bg-white text-sm hover:bg-cream"
                  onClick={() => void signIn(p.providerId, { callbackURL: "/dashboard" })}
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
