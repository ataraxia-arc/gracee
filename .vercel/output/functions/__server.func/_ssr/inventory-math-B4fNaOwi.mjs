//#region node_modules/.nitro/vite/services/ssr/assets/inventory-math-B4fNaOwi.js
function stockStatus(quantity, threshold) {
	if (quantity <= 0) return "out";
	if (quantity <= threshold) return "low";
	return "in";
}
function formatMoney(value) {
	const n = typeof value === "string" ? Number(value) : value;
	const safe = Number.isFinite(n) ? n : 0;
	return new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(safe);
}
function formatCount(n) {
	return new Intl.NumberFormat("en-US").format(Number.isFinite(n) ? n : 0);
}
function statusLabel(status) {
	if (status === "out") return "Out of stock";
	if (status === "low") return "Low stock";
	return "In stock";
}
//#endregion
export { stockStatus as i, formatMoney as n, statusLabel as r, formatCount as t };
