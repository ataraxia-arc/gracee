create table if not exists products (
  id text primary key,
  user_id text not null,
  name text not null,
  sku text not null,
  category text not null,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  stock_quantity integer not null check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_user_sku_unique unique (user_id, sku)
);

create index if not exists products_user_id_idx on products (user_id);
create index if not exists products_user_category_idx on products (user_id, category);
