import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { stockStatus, type StockStatus } from "@/lib/inventory-math";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: string;
  stockQuantity: number;
  lowStockThreshold: number;
  status: StockStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = {
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
};

export type ProductFilters = {
  search?: string;
  category?: string;
  status?: "all" | StockStatus;
  sort?: "newest" | "name" | "price_asc" | "price_desc" | "stock";
};

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fields?: Record<string, string> };

export type DashboardData = {
  totalProducts: number;
  totalUnits: number;
  totalValue: string;
  lowStockCount: number;
  outOfStockCount: number;
  inStockCount: number;
  byCategory: { category: string; count: number; units: number; value: string }[];
  recent: Product[];
  lowStock: Product[];
};

type Row = {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: string | number;
  stock_quantity: number | string;
  low_stock_threshold: number | string;
  created_at: string | Date;
  updated_at: string | Date;
};

const SORTS: Record<NonNullable<ProductFilters["sort"]>, string> = {
  newest: "created_at desc",
  name: "lower(name) asc",
  price_asc: "price asc, lower(name) asc",
  price_desc: "price desc, lower(name) asc",
  stock: "stock_quantity asc, lower(name) asc",
};

function asInt(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

function money(v: unknown): string {
  const n = typeof v === "number" ? v : Number(v);
  return (Number.isFinite(n) ? n : 0).toFixed(2);
}

function stamp(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  return String(v ?? "");
}

function mapProduct(row: Row): Product {
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
    updatedAt: stamp(row.updated_at),
  };
}

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function parseProduct(input: unknown): Result<ProductInput> {
  const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const fields: Record<string, string> = {};
  const name = clean(o.name, 160);
  const sku = clean(o.sku, 64);
  const category = clean(o.category, 80);
  const description = clean(o.description, 2000);
  const price = typeof o.price === "number" ? o.price : Number(String(o.price ?? "").trim());
  const stockQuantity =
    typeof o.stockQuantity === "number" ? o.stockQuantity : Number(String(o.stockQuantity ?? "").trim());
  const lowStockThreshold =
    typeof o.lowStockThreshold === "number"
      ? o.lowStockThreshold
      : Number(String(o.lowStockThreshold ?? "").trim());

  if (!name) fields.name = "Enter a product name.";
  if (!sku) fields.sku = "Enter a SKU.";
  if (!category) fields.category = "Enter a category.";
  if (!Number.isFinite(price) || price < 0 || price > 9_999_999_999.99) {
    fields.price = "Enter a valid price.";
  }
  if (!Number.isInteger(stockQuantity) || stockQuantity < 0 || stockQuantity > 1_000_000) {
    fields.stockQuantity = "Enter a whole quantity of 0 or more.";
  }
  if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0 || lowStockThreshold > 1_000_000) {
    fields.lowStockThreshold = "Enter a whole low-stock threshold.";
  }
  if (Object.keys(fields).length) {
    return { ok: false, error: "Check the highlighted fields.", fields };
  }
  return {
    ok: true,
    data: {
      name,
      sku,
      category,
      description,
      price: Math.round(price * 100) / 100,
      stockQuantity,
      lowStockThreshold,
    },
  };
}

function isUnique(err: unknown): boolean {
  if (typeof err === "object" && err && "code" in err && (err as { code?: string }).code === "23505") {
    return true;
  }
  const message = err instanceof Error ? err.message : String(err);
  return /duplicate|unique/i.test(message);
}

function parseFilters(input: unknown): ProductFilters {
  const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const status = o.status;
  const sort = o.sort;
  return {
    search: clean(o.search, 80),
    category: clean(o.category, 80),
    status: status === "in" || status === "low" || status === "out" ? status : "all",
    sort:
      sort === "name" || sort === "price_asc" || sort === "price_desc" || sort === "stock"
        ? sort
        : "newest",
  };
}

export const listProducts = createServerFn({ method: "GET" })
  .validator((input: unknown) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<Result<Product[]>> => {
    const filters = parseFilters(data);
    const sql = await getSql();
    const params: unknown[] = [context.userId];
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
    if (filters.status === "low") {
      where += " and stock_quantity > 0 and stock_quantity <= low_stock_threshold";
    }
    if (filters.status === "in") where += " and stock_quantity > low_stock_threshold";
    const order = SORTS[filters.sort ?? "newest"];
    const rows = await sql.query<Row>(
      `select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products ${where} order by ${order}`,
      params,
    );
    return { ok: true, data: rows.map(mapProduct) };
  });

export const createProduct = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<Result<Product>> => {
    const parsed = parseProduct(data);
    if (!parsed.ok) return parsed;
    const sql = await getSql();
    const id = crypto.randomUUID();
    const p = parsed.data;
    try {
      await sql.query(
        `insert into products
          (id, user_id, name, sku, category, description, price, stock_quantity, low_stock_threshold)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          id,
          context.userId,
          p.name,
          p.sku,
          p.category,
          p.description,
          p.price.toFixed(2),
          p.stockQuantity,
          p.lowStockThreshold,
        ],
      );
    } catch (err) {
      if (isUnique(err)) {
        return {
          ok: false,
          error: "A product with this SKU already exists.",
          fields: { sku: "This SKU is already in your inventory." },
        };
      }
      throw err;
    }
    const rows = await sql.query<Row>(
      `select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products where id = $1 and user_id = $2`,
      [id, context.userId],
    );
    return { ok: true, data: mapProduct(rows[0]) };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<Result<Product>> => {
    const o = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const id = clean(o.id, 80);
    if (!id) return { ok: false, error: "Missing product." };
    const parsed = parseProduct(o);
    if (!parsed.ok) return parsed;
    const sql = await getSql();
    const p = parsed.data;
    try {
      const rows = await sql.query<Row>(
        `update products set
           name = $3,
           sku = $4,
           category = $5,
           description = $6,
           price = $7,
           stock_quantity = $8,
           low_stock_threshold = $9,
           updated_at = now()
         where id = $1 and user_id = $2
         returning id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at`,
        [
          id,
          context.userId,
          p.name,
          p.sku,
          p.category,
          p.description,
          p.price.toFixed(2),
          p.stockQuantity,
          p.lowStockThreshold,
        ],
      );
      if (!rows.length) return { ok: false, error: "Product not found." };
      return { ok: true, data: mapProduct(rows[0]) };
    } catch (err) {
      if (isUnique(err)) {
        return {
          ok: false,
          error: "A product with this SKU already exists.",
          fields: { sku: "This SKU is already in your inventory." },
        };
      }
      throw err;
    }
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<Result<{ id: string }>> => {
    const id = clean(data, 80);
    if (!id) return { ok: false, error: "Missing product." };
    const sql = await getSql();
    const rows = await sql.query<{ id: string }>(
      `delete from products where id = $1 and user_id = $2 returning id`,
      [id, context.userId],
    );
    if (!rows.length) return { ok: false, error: "Product not found." };
    return { ok: true, data: { id } };
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DashboardData> => {
    const sql = await getSql();
    const userId = context.userId;
    const [totals] = await sql.query<{
      total_products: number | string;
      total_units: number | string;
      total_value: string | number;
      low_stock: number | string;
      out_of_stock: number | string;
      in_stock: number | string;
    }>(
      `select
         count(*)::int as total_products,
         coalesce(sum(stock_quantity), 0)::int as total_units,
         coalesce(sum(price * stock_quantity), 0)::text as total_value,
         count(*) filter (where stock_quantity > 0 and stock_quantity <= low_stock_threshold)::int as low_stock,
         count(*) filter (where stock_quantity = 0)::int as out_of_stock,
         count(*) filter (where stock_quantity > low_stock_threshold)::int as in_stock
       from products
       where user_id = $1`,
      [userId],
    );
    const categories = await sql.query<{
      category: string;
      count: number | string;
      units: number | string;
      value: string | number;
    }>(
      `select category,
              count(*)::int as count,
              coalesce(sum(stock_quantity), 0)::int as units,
              coalesce(sum(price * stock_quantity), 0)::text as value
       from products
       where user_id = $1
       group by category
       order by count desc, category asc`,
      [userId],
    );
    const recent = await sql.query<Row>(
      `select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products where user_id = $1 order by created_at desc limit 5`,
      [userId],
    );
    const low = await sql.query<Row>(
      `select id, name, sku, category, description, price, stock_quantity, low_stock_threshold, created_at, updated_at
       from products
       where user_id = $1 and stock_quantity > 0 and stock_quantity <= low_stock_threshold
       order by stock_quantity asc, name asc
       limit 6`,
      [userId],
    );
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
        value: money(c.value),
      })),
      recent: recent.map(mapProduct),
      lowStock: low.map(mapProduct),
    };
  });
