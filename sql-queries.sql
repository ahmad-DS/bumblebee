CREATE TYPE table_status AS ENUM ('AVAILABLE', 'OCCUPIED');

-- create "tables" table
CREATE TABLE tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number int UNIQUE NOT NULL,
  qr_code_url text UNIQUE NOT NULL,
  status table_status DEFAULT 'AVAILABLE'
);
-- insert sample data into tables
insert into tables (table_number, qr_code_url)
values ('2', 'http://localhost:5173?table_number=2');

-- Create Menu Categories
create table menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

-- Create Menu Items
/*
Note: references here is shorthand for foreign key constraint. 
It means that category_id in menu_items table is a foreign key that references the id column in menu_categories table.
*/
create table menu_items (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric not null,
    is_available boolean default true,
    category_id uuid references menu_categories(id) 
)

create type order_status as enum ('PLACED', 'PREPARING','READY','SERVED', 'CLOSED');

-- Create Orders table
create table orders (
    id uuid primary key default gen_random_uuid(),
    table_id uuid references tables(id),
    status order_status default 'PLACED',
    total_amount numeric default 0,
    created_at timestamp default now(),
    customer_name text
)

-- Create Order Items table
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  menu_item_id uuid references menu_items(id),
  quantity int not null,
  price numeric not null
);

create type payment_method as enum ('CASH', 'CARD', 'UPI');
create type payment_status as enum ('PENDING', 'COMPLETED', 'FAILED');

-- Create Payments table
create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  amount numeric not null,
  method payment_method not null,
  status payment_status default 'PENDING',
  paid_at timestamp,
  transaction_ref text
);