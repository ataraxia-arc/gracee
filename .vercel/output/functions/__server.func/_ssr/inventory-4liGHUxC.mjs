import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as stockStatus } from "./inventory-math-B4fNaOwi.mjs";
import { r as getSql } from "./db-CWqfpgGm.mjs";
import { t as authMiddleware } from "./middleware-DCT6hHWT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-4liGHUxC.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SORTS = {
	newest: "created_at desc",
	name: "lower(name) asc",
	price_asc: "price asc, lower(name) asc",
	price_desc: "price desc, lower(name) asc",
	stock: "stock_quantity asc, lower(name) asc"
};
function asInt(v) {
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? Math.trunc(n) : 0;
}
function money(v) {
	const n = typeof v === "number" ? v : Number(v);
	return (Number.isFinite(n) ? n : 0).toFixed(2);
}
function stamp(v) {
	if (v instanceof Date) return v.toISOString();
	return String(v ?? "");
}
function mapProduct(row) {
	const stockQuantity = asInt(row.stock_quantity);
	const lowStockThreshold = asInt(row.low_stock_threshold);
	return {
		id: row.id,
		name: row.name,
		sku: row.sku,
		category: row.category,
		description: row.description ?? "",
		price: money(row.price),
		stockQuantity,
		lowStockThreshold,
		status: stockStatus(stockQuantity, lowStockThreshold),
		createdAt: stamp(row.created_at),
		updatedAt: stamp(row.updated_at)
	};
}
function clean(value, max) {
	return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}
function parseProduct(input) {
	const o = input && typeof input === "object" ? input : {};
	const fields = {};
	const name = clean(o.name, 160);
	const sku = clean(o.sku, 64);
	const category = clean(o.category, 80);
	const description = clean(o.description, 2e3);
	const price = typeof o.price === "number" ? o.price : Number(String(o.price ?? "").trim());
	const stockQuantity = typeof o.stockQuantity === "number" ? o.stockQuantity : Number(String(o.stockQuantity ?? "").trim());
	const lowStockThreshold = typeof o.lowStockThreshold === "number" ? o.lowStockThreshold : Number(String(o.lowStockThreshold ?? "").trim());
	if (!name) fields.name = "Enter a product name.";
	if (!sku) fields.sku = "Enter a SKU.";
	if (!category) fields.category = "Enter a category.";
	if (!Number.isFinite(price) || price < 0 || price > 9999999999.99) fields.price = "Enter a valid price.";
	if (!Number.isInteger(stockQuantity) || stockQuantity < 0 || stockQuantity > 1e6) fields.stockQuantity = "Enter a whole quantity of 0 or more.";
	if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0 || lowStockThreshold > 1e6) fields.lowStockThreshold = "Enter a whole low-stock threshold.";
	if (Object.keys(fields).length) return {
		ok: false,
		error: "Check the highlighted fields.",
		fields
	};
	return {
		ok: true,
		data: {
			name,
			sku,
			category,
			description,
			price: Math.round(price * 100) / 100,
			stockQuantity,
			lowStockThreshold
		}
	};
}
function isUnique(err) {
	if (typeof err === "object" && err && "code" in err && err.code === "23505") return true;
	const message = err instanceof Error ? err.message : String(err);
	return /duplicate|unique/i.test(message);
}
function parseFilters(input) {
	const o = input && typeof input === "object" ? input : {};
	const status = o.status;
	const sort = o.sort;
	return {
		search: clean(o.search, 80),
		category: clean(o.category, 80),
		status: status === "in" || status === "low" || status === "out" ? status : "all",
		sort: sort === "name" || sort === "price_asc" || sort === "price_desc" || sort === "stock" ? sort : "newest"
	};
}
var listProducts_createServerFn_handler = createServerRpc({
	id: "e48423b7f039eaef36e9a5cee50455d668bd1893d939b0f522e23c7893602898",
	name: "listProducts",
	filename: "src/lib/inventory.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).validator((input) => input).middleware([authMiddleware]).handler(listProducts_createServerFn_handler, async ({ data, context }) => {
	const filters = parseFilters(data);
	const sql = await getSql();
	const params = [context.userId];
	let where = "where user_id = $1";
	if (filters.search) {
		params.push(`%${filters.search}%`);
		const i = params.length;
		where += ` and (name ilike $${i} or sku ilike $${i} or category ilike $${i})`;
	}
	if (filters.category) {
		params.push(filters.category);
		where += ` and category = $${params.length}`;
	}
	if (filters.status === "out") where += " and stock_quantity = 0";
	if (filters.status === "low") where += " and stock_quantity > 0 and stock_quantity <= low_stock_threshold";
	if (filters.status === "in") where += " and stock_quantity > low_stock_threshold";
	const order = SORTS[filters.sort ?? "newest"];
	return {
		ok: true,
		data: (await sql.query(`select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products ${where} order by ${order}`, params)).map(mapProduct)
	};
});
var createProduct_createServerFn_handler = createServerRpc({
	id: "aec1c50323080fcaac5616b82083d1900f615539fb17a28e5593c64e986ee604",
	name: "createProduct",
	filename: "src/lib/inventory.ts"
}, (opts) => createProduct.__executeServer(opts));
var createProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createProduct_createServerFn_handler, async ({ data, context }) => {
	const parsed = parseProduct(data);
	if (!parsed.ok) return parsed;
	const sql = await getSql();
	const id = crypto.randomUUID();
	const p = parsed.data;
	try {
		await sql.query(`insert into products
          (id, user_id, name, sku, category, description, price, stock_quantity, low_stock_threshold)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [
			id,
			context.userId,
			p.name,
			p.sku,
			p.category,
			p.description,
			p.price.toFixed(2),
			p.stockQuantity,
			p.lowStockThreshold
		]);
	} catch (err) {
		if (isUnique(err)) return {
			ok: false,
			error: "A product with this SKU already exists.",
			fields: { sku: "This SKU is already in your inventory." }
		};
		throw err;
	}
	return {
		ok: true,
		data: mapProduct((await sql.query(`select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products where id = $1 and user_id = $2`, [id, context.userId]))[0])
	};
});
var updateProduct_createServerFn_handler = createServerRpc({
	id: "1d799bd828188dab15e95fa8c6773d76c98159b65671cdbf8a5ae28eeceb51cc",
	name: "updateProduct",
	filename: "src/lib/inventory.ts"
}, (opts) => updateProduct.__executeServer(opts));
var updateProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(updateProduct_createServerFn_handler, async ({ data, context }) => {
	const o = data && typeof data === "object" ? data : {};
	const id = clean(o.id, 80);
	if (!id) return {
		ok: false,
		error: "Missing product."
	};
	const parsed = parseProduct(o);
	if (!parsed.ok) return parsed;
	const sql = await getSql();
	const p = parsed.data;
	try {
		const rows = await sql.query(`update products set
           name = $3,
           sku = $4,
           category = $5,
           description = $6,
           price = $7,
           stock_quantity = $8,
           low_stock_threshold = $9,
           updated_at = now()
         where id = $1 and user_id = $2
         returning id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at`, [
			id,
			context.userId,
			p.name,
			p.sku,
			p.category,
			p.description,
			p.price.toFixed(2),
			p.stockQuantity,
			p.lowStockThreshold
		]);
		if (!rows.length) return {
			ok: false,
			error: "Product not found."
		};
		return {
			ok: true,
			data: mapProduct(rows[0])
		};
	} catch (err) {
		if (isUnique(err)) return {
			ok: false,
			error: "A product with this SKU already exists.",
			fields: { sku: "This SKU is already in your inventory." }
		};
		throw err;
	}
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "d226310449284e0e62b6f450e32bfb315d725e8b30dc0038babf13a9b5741f94",
	name: "deleteProduct",
	filename: "src/lib/inventory.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(deleteProduct_createServerFn_handler, async ({ data, context }) => {
	const id = clean(data, 80);
	if (!id) return {
		ok: false,
		error: "Missing product."
	};
	if (!(await (await getSql()).query(`delete from products where id = $1 and user_id = $2 returning id`, [id, context.userId])).length) return {
		ok: false,
		error: "Product not found."
	};
	return {
		ok: true,
		data: { id }
	};
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "3218daae38b514be8f535edf594be9b8b707e2992cfb2b6782bd375c60fc86fb",
	name: "getDashboard",
	filename: "src/lib/inventory.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const userId = context.userId;
	const [totals] = await sql.query(`select
         count(*)::int as total_products,
         coalesce(sum(stock_quantity), 0)::int as total_units,
         coalesce(sum(price * stock_quantity), 0)::text as total_value,
         count(*) filter (where stock_quantity > 0 and stock_quantity <= low_stock_threshold)::int as low_stock,
         count(*) filter (where stock_quantity = 0)::int as out_of_stock,
         count(*) filter (where stock_quantity > low_stock_threshold)::int as in_stock
       from products
       where user_id = $1`, [userId]);
	const categories = await sql.query(`select category,
              count(*)::int as count,
              coalesce(sum(stock_quantity), 0)::int as units,
              coalesce(sum(price * stock_quantity), 0)::text as value
       from products
       where user_id = $1
       group by category
       order by count desc, category asc`, [userId]);
	const recent = await sql.query(`select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products where user_id = $1 order by created_at desc limit 5`, [userId]);
	const low = await sql.query(`select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products
       where user_id = $1 and stock_quantity > 0 and stock_quantity <= low_stock_threshold
       order by stock_quantity asc, name asc
       limit 6`, [userId]);
	return {
		totalProducts: asInt(totals?.total_products),
		totalUnits: asInt(totals?.total_units),
		totalValue: money(totals?.total_value),
		lowStockCount: asInt(totals?.low_stock),
		outOfStockCount: asInt(totals?.out_of_stock),
		inStockCount: asInt(totals?.in_stock),
		byCategory: categories.map((c) => ({
			category: c.category,
			count: asInt(c.count),
			units: asInt(c.units),
			value: money(c.value)
		})),
		recent: recent.map(mapProduct),
		lowStock: low.map(mapProduct)
	};
});
//#endregion
export { createProduct_createServerFn_handler, deleteProduct_createServerFn_handler, getDashboard_createServerFn_handler, listProducts_createServerFn_handler, updateProduct_createServerFn_handler };
