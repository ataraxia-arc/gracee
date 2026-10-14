import type { ReactNode } from "react";
import hero from "@/assets/hero.jpg";

function Glass({
  className,
  kicker,
  title,
  children,
}: {
  className: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className={`glass-card pointer-events-none rounded-3xl p-4 ${className}`}>
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">{kicker}</p>
      <p className="mt-2 text-sm font-medium">{title}</p>
      <div className="mt-3">{children}</div>
    </article>
  );
}

export function HeroStage() {
  return (
    <div className="relative mx-auto mt-8 max-w-6xl px-4 sm:px-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-void shadow-[0_30px_80px_rgba(11,11,13,0.18)]">
        <div className="relative h-[460px] sm:h-[540px] lg:h-[680px]">
          <img
            src={hero}
            alt="Cinematic portrait lit with lavender and blue rim light, surrounded by orbital rings"
            className="drift absolute inset-0 h-full w-full object-cover object-[center_22%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-transparent to-void/50" />
          <svg
            className="orbit pointer-events-none absolute -inset-[18%] opacity-70"
            viewBox="0 0 800 800"
            fill="none"
            aria-hidden="true"
          >
            <ellipse cx="400" cy="400" rx="280" ry="120" stroke="rgba(152,144,255,0.55)" strokeWidth="1" />
            <ellipse cx="400" cy="400" rx="340" ry="170" stroke="rgba(108,150,234,0.35)" strokeWidth="1" transform="rotate(18 400 400)" />
          </svg>

          <div className="absolute inset-0 hidden lg:block">
            <Glass className="float-a absolute left-8 top-16 w-56" kicker="Live view" title="Inventory Overview">
              <div className="flex items-end gap-1.5">
                {[40, 62, 48, 78, 56, 88, 70].map((h) => (
                  <span key={h} className="w-2 rounded-full bg-white/80" style={{ height: `${h / 4}px` }} />
                ))}
              </div>
            </Glass>
            <Glass className="float-b absolute bottom-20 left-16 w-60" kicker="Watchlist" title="Stock Monitoring">
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex justify-between"><span>In stock</span><span>Steady</span></li>
                <li className="flex justify-between"><span>Low stock</span><span>Attention</span></li>
                <li className="flex justify-between"><span>Out of stock</span><span>Resolve</span></li>
              </ul>
            </Glass>
            <Glass className="float-c absolute right-10 top-20 w-60" kicker="Clarity" title="Product Intelligence">
              <div className="flex flex-wrap gap-1.5">
                {["Electronics", "Office", "Home"].map((c) => (
                  <span key={c} className="rounded-full border border-white/20 px-2 py-1 text-[11px]">{c}</span>
                ))}
              </div>
            </Glass>
            <Glass className="float-d absolute bottom-24 right-14 w-56" kicker="Signals" title="Business Insights">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-2/3 rounded-full bg-lavender" />
              </div>
              <p className="mt-2 text-xs text-white/70">Value, units, and movement in one glance.</p>
            </Glass>
            <Glass className="float-e absolute bottom-8 left-1/2 w-64 -translate-x-1/2" kicker="Workspace" title="Quick Organization">
              <p className="text-xs leading-5 text-white/75">Name, SKU, category, price, and quantity — kept in order.</p>
            </Glass>
          </div>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:hidden">
          {[
            ["Inventory Overview", "Every product, one refined view."],
            ["Product Intelligence", "Categories that stay easy to read."],
            ["Stock Monitoring", "See what needs attention."],
            ["Business Insights", "Value and units, clearly stated."],
            ["Quick Organization", "Add, edit, and refine without friction."],
          ].map(([title, copy]) => (
            <article key={title} className="glass-card rounded-2xl p-4">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-1 text-xs leading-5 text-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
