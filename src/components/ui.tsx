import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { statusLabel, type StockStatus } from "@/lib/inventory-math";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`text-[15px] font-semibold tracking-[0.2em] ${light ? "text-white" : "text-ink"}`}>
        GRXX
      </span>
      <span className={`text-[10px] font-medium tracking-[0.22em] ${light ? "text-soft" : "text-muted"}`}>
        INTELLIGENCE
      </span>
    </span>
  );
}

export function PillLink({
  to,
  search,
  hash,
  children,
  tone = "ink",
}: {
  to: string;
  search?: Record<string, string>;
  hash?: string;
  children: ReactNode;
  tone?: "ink" | "ghost" | "light";
}) {
  const cls =
    tone === "ink"
      ? "bg-charcoal text-cream hover:bg-ink"
      : tone === "light"
        ? "bg-white/10 text-white border border-white/20 hover:bg-white/16"
        : "bg-transparent text-ink border border-line hover:bg-white";
  return (
    <Link
      to={to}
      search={search}
      hash={hash}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${cls}`}
    >
      {children}
    </Link>
  );
}

export function PillButton({
  children,
  tone = "ink",
  type = "button",
  disabled,
  onClick,
}: {
  children: ReactNode;
  tone?: "ink" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls =
    tone === "ink"
      ? "bg-charcoal text-cream hover:bg-ink"
      : "bg-transparent text-ink border border-line hover:bg-ivory";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${cls}`}
    >
      {children}
    </button>
  );
}

export function StatusPill({ status }: { status: StockStatus }) {
  const tone =
    status === "out"
      ? "bg-charcoal text-cream"
      : status === "low"
        ? "bg-ivory text-ink border border-line"
        : "bg-white text-ink border border-line";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs tracking-wide ${tone}`}>
      {statusLabel(status)}
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-ink/70">{message}</p>;
}
