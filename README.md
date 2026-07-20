# Restaurant QR Ordering System

A modern QR-based restaurant ordering platform that allows customers to scan a table QR code, browse the menu, place orders digitally, and enables restaurant staff to manage incoming orders through a kitchen dashboard.

---

## Project Description

This application replaces traditional paper menus and manual order taking with a digital ordering experience.

### Core Objectives

* Enable contactless ordering through QR codes.
* Reduce waiter dependency for menu browsing and order placement.
* Provide real-time visibility of incoming orders for the kitchen.
* Streamline billing and order management for restaurant staff.

When a customer scans a QR code placed on a table, the application opens the menu for that specific table. Customers can add items to their cart, place an order, and the order becomes available to the restaurant staff for preparation and billing.

---

## Tech Stack Used

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **Redux Toolkit**

### Backend / BaaS

* **Supabase**

  * PostgreSQL Database
  * Authentication
  * Realtime APIs
  * Row-level database operations

### Other Tools

* **Git & GitHub**
* **Netlify / Vercel**
* **PostgreSQL**

---

## Architecture

This project uses a **frontend + Supabase architecture**.

```text
React App
    ↓
Supabase Client
    ↓
PostgreSQL Database
```

Instead of creating a separate Express/Node backend, the frontend communicates directly with Supabase using the official `@supabase/supabase-js` client.

Example:

```ts
const { data, error } = await supabase
  .from('menu_categories')
  .select('name');
```

This approach provides:

* Direct database access through secure APIs
* Built-in authentication
* Real-time capabilities
* Faster development and deployment

---

## Setup & Installation

### Prerequisites

* Node.js (v18+ recommended)
* npm or pnpm
* A Supabase project

### Clone the repository

```bash
git clone https://github.com/ahmad-DS/bumblebee.git
cd bumblebee
```

### Install dependencies

```bash
cd restaurant
npm install
```

### Configure environment variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in:

**Supabase → Project Settings → API**

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Database Tables

Main tables used in the project:

* `menu_categories`
* `menu_items`
* `orders`
* `order_items`
* `tables`

These tables support menu management, cart/order flow, and table-specific ordering.

---

## Key Features

### QR-Based Table Ordering

* Unique QR code for each table
* Opens the menu directly for that table
* No app installation required

### Digital Menu

* Browse categories and items
* View prices and descriptions
* Fast menu loading from Supabase

### Cart Management

* Add/remove items
* Update quantities
* Real-time price calculation

### Order Placement

* Submit orders digitally
* Store order details in PostgreSQL
* Associate orders with specific tables

### Kitchen Dashboard

* View incoming orders
* Track order status
* Improve kitchen workflow visibility

### Billing Support

* Generate customer bills
* Calculate totals from ordered items
* Reduce manual billing errors

---

## What I Learned

This project helped me gain hands-on experience with:

* Designing relational schemas in PostgreSQL
* Managing application state with Redux Toolkit
* Building production-style React + TypeScript applications
* Integrating Supabase for database, authentication, and realtime workflows
* Implementing QR-based user flows and table-specific ordering logic
* Handling asynchronous data fetching and error states

---

## Future Improvements

* Online payment integration (UPI / Stripe / Razorpay)
* Real-time order status updates for customers
* Inventory management
* Admin dashboard for menu management
* Printer integration for kitchen receipts
* Multi-branch restaurant support

---
