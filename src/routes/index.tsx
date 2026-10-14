import { createFileRoute } from "@tanstack/react-router";
import { HeroStage } from "@/components/hero-stage";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PillLink } from "@/components/ui";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="atmosphere min-h-screen">
      <SiteHeader />
      <main id="main">
        <section className="px-5 pb-6 pt-14 text-center sm:pt-20">
          <p className="eyebrow rise">The intelligence behind your inventory</p>
          <h1 className="display rise rise-d1 mx-auto mt-6 max-w-5xl text-ink">
            Your business,
            <br />
            reimagined.
          </h1>
          <p className="rise rise-d2 mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Organize effortlessly. Track intelligently. Grow confidently. Experience inventory management
            built for a clearer tomorrow.
          </p>
          <div className="rise rise-d3 mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillLink to="/login" search={{ mode: "signup" }}>
              Get Started
            </PillLink>
            <PillLink to="/" hash="features" tone="ghost">
              Explore Platform
            </PillLink>
          </div>
        </section>

        <HeroStage />

        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="eyebrow">Why GRXX INTELLIGENCE</p>
          <h2 className="display-md mt-4 max-w-3xl">
            Simplicity in every detail.
            <br />
            Clarity in every decision.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Effortless Organization", "Bring products, categories, and inventory records into one refined workspace."],
              ["02", "Smarter Business Insights", "Understand important inventory metrics instantly."],
              ["03", "Complete Control", "Manage product data with precision and confidence."],
            ].map(([n, title, copy]) => (
              <article key={n} className="surface p-7 transition-transform duration-200 hover:-translate-y-0.5">
                <p className="text-sm tracking-[0.18em] text-muted">{n}</p>
                <h3 className="mt-6 text-2xl tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-ivory py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow">Made to work smarter</p>
            <h2 className="display-md mt-4 max-w-3xl">
              Powerful tools for
              <br />
              a more intelligent business.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-12">
              <article className="surface p-7 lg:col-span-7">
                <p className="eyebrow">01</p>
                <h3 className="mt-4 text-3xl tracking-tight">Product Inventory Management</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                  A calm table for the records you actually keep — names, SKUs, prices, and quantities.
                </p>
                <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                  {[
                    ["Wireless Keyboard", "KB-001", "20"],
                    ["Studio Lamp", "LM-014", "8"],
                    ["Linen Notebook", "NB-220", "41"],
                  ].map(([name, sku, qty]) => (
                    <div key={sku} className="grid grid-cols-[1.4fr_0.8fr_auto] items-center gap-3 border-b border-line px-4 py-3 text-sm last:border-0">
                      <span>{name}</span>
                      <span className="text-muted">{sku}</span>
                      <span className="tabular-nums">{qty}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">Interface preview</p>
              </article>

              <article className="surface flex flex-col justify-between p-7 lg:col-span-5">
                <div>
                  <p className="eyebrow">02</p>
                  <h3 className="mt-4 text-3xl tracking-tight">Real-Time Stock Overview</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">In stock, low, and out — visible the moment you open the workspace.</p>
                </div>
                <div className="mt-8 flex items-end gap-3">
                  {[
                    ["In", "72%", "h-28"],
                    ["Low", "38%", "h-16"],
                    ["Out", "14%", "h-8"],
                  ].map(([label, width, height]) => (
                    <div key={label} className="flex-1">
                      <div className={`rounded-t-2xl bg-charcoal ${height}`} style={{ opacity: label === "In" ? 1 : label === "Low" ? 0.55 : 0.3 }} />
                      <p className="mt-2 text-xs text-muted">{label}</p>
                      <p className="text-sm tabular-nums">{width}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="surface p-7 lg:col-span-4">
                <p className="eyebrow">03</p>
                <h3 className="mt-4 text-2xl tracking-tight">Inventory Analytics</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Category mix and inventory value, drawn from your own records.</p>
                <svg viewBox="0 0 240 90" className="mt-6 w-full" aria-hidden="true">
                  <path d="M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 200 18, 240 12" fill="none" stroke="#161616" strokeWidth="2" />
                  <path d="M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 200 18, 240 12 V 90 H 0 Z" fill="#9890FF" opacity="0.25" />
                </svg>
              </article>

              <article className="surface p-7 lg:col-span-4">
                <p className="eyebrow">04</p>
                <h3 className="mt-4 text-2xl tracking-tight">Secure Account Access</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Your inventory stays yours. Every record is tied to the signed-in account.</p>
                <div className="mt-6 space-y-2 rounded-2xl border border-line bg-ivory p-4 text-sm">
                  <p className="flex justify-between"><span>Session</span><span className="text-muted">Protected</span></p>
                  <p className="flex justify-between"><span>Passwords</span><span className="text-muted">Hashed</span></p>
                  <p className="flex justify-between"><span>Records</span><span className="text-muted">Private</span></p>
                </div>
              </article>

              <article className="surface p-7 lg:col-span-4">
                <p className="eyebrow">05</p>
                <h3 className="mt-4 text-2xl tracking-tight">Organized Product Categories</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Group what you sell so search and filters stay effortless.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Electronics", "Apparel", "Grocery", "Office", "Home"].map((c) => (
                    <span key={c} className="rounded-full border border-line bg-ivory px-3 py-1.5 text-sm">{c}</span>
                  ))}
                </div>
              </article>

              <article className="surface p-7 lg:col-span-12">
                <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <p className="eyebrow">06</p>
                    <h3 className="mt-4 text-3xl tracking-tight">Business Performance Visibility</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                      Totals for products, units, and inventory value sit beside the items that need a closer look.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ["Products", "Counted"],
                      ["Units", "Summed"],
                      ["Value", "Priced"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-line bg-ivory p-4">
                        <p className="text-xs text-muted">{k}</p>
                        <p className="mt-3 text-lg tracking-tight">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-24 mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2 className="display-md mt-4">
              Your inventory,
              <br />
              understood.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted">
              Every product tells a story. GRXX INTELLIGENCE turns your inventory data into clarity so you can focus on what matters.
            </p>
            <div className="mt-8">
              <PillLink to="/dashboard">Explore Dashboard</PillLink>
            </div>
          </div>
          <div className="relative">
            <div className="surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Overview</p>
                <p className="text-xs tracking-[0.16em] text-soft">PREVIEW</p>
              </div>
              <p className="mt-6 text-4xl tracking-tight">At a glance</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Products", "Units", "Value", "Low stock"].map((label) => (
                  <div key={label} className="rounded-2xl border border-line bg-ivory p-4">
                    <p className="text-xs text-muted">{label}</p>
                    <div className="mt-4 h-2 w-16 rounded-full bg-charcoal/80" />
                  </div>
                ))}
              </div>
            </div>
            <div className="surface absolute -left-4 bottom-8 hidden w-44 p-4 sm:block">
              <p className="text-xs text-muted">Categories</p>
              <p className="mt-2 text-sm">Grouped with care</p>
            </div>
            <div className="surface absolute -right-2 -top-6 hidden w-48 p-4 sm:block">
              <p className="text-xs text-muted">Recent</p>
              <p className="mt-2 text-sm">Newest records first</p>
            </div>
          </div>
        </section>

        <section className="bg-ivory py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow">How it works</p>
            <h2 className="display-md mt-4 max-w-xl">Three quiet steps.</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                ["01", "Create Your Workspace", "Register securely and access your personal dashboard."],
                ["02", "Organize Your Inventory", "Add products, update details, and manage stock levels."],
                ["03", "Understand Your Business", "Monitor inventory metrics and gain meaningful insights."],
              ].map(([n, title, copy]) => (
                <li key={n}>
                  <p className="text-sm tracking-[0.2em] text-muted">{n}</p>
                  <h3 className="mt-4 text-2xl tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-28 text-center">
          <h2 className="display-md mx-auto max-w-3xl">
            Intelligence begins
            <br />
            with clarity.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Everything you need to manage your inventory, beautifully connected.
          </p>
          <div className="mt-8">
            <PillLink to="/login" search={{ mode: "signup" }}>
              Start with GRXX
            </PillLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
