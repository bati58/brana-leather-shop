-- Brana Leather — run in Supabase SQL Editor
-- Dashboard → SQL → New query → paste & run

-- Orders
create table if not exists orders (
  id text primary key,
  customer jsonb not null,
  items jsonb not null,
  delivery_method text not null,
  payment_method text not null,
  subtotal numeric not null,
  shipping numeric not null default 0,
  total numeric not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_status_idx on orders (status);

-- Newsletter subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  name text default '',
  email text not null unique,
  whatsapp text default '',
  created_at timestamptz not null default now()
);

-- Contact form messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security (service role bypasses; anon blocked by default)
alter table orders enable row level security;
alter table subscribers enable row level security;
alter table contact_messages enable row level security;

-- Optional: allow public read on products later
-- create table if not exists products (...);
