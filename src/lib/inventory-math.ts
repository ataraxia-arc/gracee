export type StockStatus = "in" | "low" | "out";

export function stockStatus(quantity: number, threshold: number): StockStatus {
  if (quantity <= 0) return "out";
  if (quantity <= threshold) return "low";
  return "in";
}

export function lineValue(price: number, quantity: number): number {
  return Math.round(price * quantity * 100) / 100;
}

export function formatMoney(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  const safe = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(Number.isFinite(n) ? n : 0);
}

export function statusLabel(status: StockStatus): string {
  if (status === "out") return "Out of stock";
  if (status === "low") return "Low stock";
  return "In stock";
}
