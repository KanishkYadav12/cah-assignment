# Cards Against Humanity — Full-Stack Clone

A pixel-perfect, production-grade clone of [cardsagainsthumanity.com](https://www.cardsagainsthumanity.com) built with a modern headless architecture. All content is fully dynamic and managed through Payload CMS, with complete e-commerce functionality powered by Medusa.js v2.

---

## Live Links

| Service           | URL                                              |
| ----------------- | ------------------------------------------------ |
| Frontend          | https://cah-assignment-m5rh.vercel.app           |
| Payload CMS Admin | https://cah-assignment.vercel.app/admin          |
| Medusa Backend    | https://cah-assignment.onrender.com              |
| GitHub Repository | https://github.com/KanishkYadav12/cah-assignment |

---

## Architecture Overview

```
┌──────────────────┐    ISR (60s)     ┌─────────────────────┐
│   Next.js 16     │ ◄─────────────── │   Payload CMS v3    │
│   (Frontend)     │                  │   (Content)         │
│   Vercel         │                  │   Vercel + MongoDB  │
└────────┬─────────┘                  └──────────┬──────────┘
         │                                       │
         │  Store API                  afterChange hooks
         │  (cart, auth, checkout)               │
         ▼                                       ▼
┌──────────────────┐    Webhook       ┌─────────────────────┐
│   Medusa.js v2   │ ────────────────►│   /api/medusa-      │
│   (Commerce)     │  product.updated │   webhook (Payload) │
│   Render + Neon  │                  └─────────────────────┘
└──────────────────┘
```

**Data Flow:**

1. **Frontend ← CMS**: Next.js fetches all page content (hero, products, FAQs, footer) from Payload CMS REST API with ISR (60s revalidation)
2. **Frontend → Medusa**: Cart operations, customer auth, and checkout go through Medusa Store API with publishable API key
3. **CMS → Medusa**: Product `afterChange` hook in Payload syncs product data to Medusa Admin API
4. **Medusa → CMS**: Webhook endpoint at `/api/medusa-webhook` receives product events and updates Payload

---

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Frontend   | Next.js 16.1.6 (App Router), TypeScript, Tailwind 4 |
| CMS        | Payload CMS v3.79.0, MongoDB Atlas                  |
| Commerce   | Medusa.js v2.13.3, PostgreSQL (Neon.tech)           |
| Deployment | Vercel (Frontend + CMS), Render (Medusa)            |

---

## Pages Built

### 1. Homepage — `/`

Pixel-perfect clone of `cardsagainsthumanity.com`

- Sticky black navbar with cart icon + badge
- Hero section with logo, description, press quotes, suit icons
- "Buy the game" — 2×2 product card grid
- "Steal the game" — free download section
- FAQ accordion with expand all toggle
- Email signup section
- 4-column footer with links

### 2. Product Page — `/products/more-cah`

Pixel-perfect clone of `cardsagainsthumanity.com/products/more-cah`

- Product image + title + price + description
- Bullet points list
- Quantity selector with +/- controls
- "Add to Cart" → opens cart drawer
- Related products horizontal scroll with individual "Add to Cart" buttons

### 3. Shop — `/shop`

- Product grid pulling all products from CMS

### 4. About — `/about`

- Static info page about Cards Against Humanity

### 5. Login — `/login`

- Customer login via Medusa Store API
- Email + password form
- Redirects to account page on success

### 6. Register — `/register`

- Customer registration via Medusa Auth + Store Customer API
- First name, last name, email, password
- Redirects to account page on success

### 7. Account — `/account`

- Displays logged-in customer profile (name, email)
- Logout button
- Protected route (redirects to login if unauthenticated)

### 8. Checkout — `/checkout`

- Multi-step checkout: Info → Shipping → Payment
- Order summary sidebar with item images, quantities, totals
- Shipping address form (address, city, state, zip, country)
- Manual/test payment (no real payment processed)
- Cart completion via Medusa API → order confirmation page
- Shows order ID and confirmation email address

---

## Project Structure

```
cah-assignment/
├── README.md                   # This file
├── frontend/                   # Next.js 16 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout with Auth + Cart providers, SEO metadata
│   │   │   ├── page.tsx        # Homepage — server component
│   │   │   ├── robots.ts       # robots.txt generation
│   │   │   ├── sitemap.ts      # sitemap.xml generation
│   │   │   ├── login/          # Customer login page
│   │   │   ├── register/       # Customer registration page
│   │   │   ├── account/        # Customer account page
│   │   │   ├── checkout/       # Multi-step checkout
│   │   │   ├── about/          # About page
│   │   │   ├── shop/           # Shop page
│   │   │   └── products/
│   │   │       └── more-cah/   # Product detail page
│   │   ├── components/
│   │   │   ├── Navbar.tsx      # Sticky nav with auth state
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BuySection.tsx
│   │   │   ├── StealSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── EmailSignup.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── context/
│   │   │   ├── CartContext.tsx  # Cart state + Medusa cart sync
│   │   │   └── AuthContext.tsx  # Customer auth + Medusa auth
│   │   └── lib/
│   │       ├── cms.ts          # Payload CMS API helpers
│   │       └── medusa.ts       # Medusa API helpers
├── payload-cms/                # Payload CMS v3
│   ├── src/
│   │   ├── payload.config.ts   # Collections, hooks, CORS
│   │   ├── collections/
│   │   │   ├── Users.ts
│   │   │   └── Media.ts
│   │   └── app/
│   │       └── api/
│   │           └── medusa-webhook/
│   │               └── route.ts  # Medusa → Payload sync endpoint
└── medusa-backend/             # Medusa.js v2
    ├── medusa-config.js        # Database, CORS, auth config
    └── src/
        └── index.ts
```

---

## Local Setup

### Prerequisites

- Node.js >= 20
- MongoDB Atlas account (or local MongoDB)
- PostgreSQL database (Neon.tech or local)

### 1. Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3001
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_key_here
```

```bash
npm run dev
# Runs on http://localhost:3000
```

### 2. Payload CMS

```bash
cd payload-cms
npm install
```

Create `.env`:

```env
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/payload-cms
PAYLOAD_SECRET=your-secret-key-min-32-chars
MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_ADMIN_TOKEN=your-medusa-admin-token
MEDUSA_WEBHOOK_SECRET=your-webhook-secret
```

```bash
npm run dev
# Admin panel at http://localhost:3001/admin
```

### 3. Medusa Backend

```bash
cd medusa-backend
npm install
```

Create `.env`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:3000,http://localhost:9000
NODE_ENV=development
```

```bash
npx medusa db:migrate
npm run dev
# Runs on http://localhost:9000
```

---

## CMS Collections (Payload CMS)

All frontend content is fully dynamic — **zero hardcoded strings**. Every section pulls data from Payload CMS.

| Collection    | Slug            | Fields                                                                                                     | Purpose              |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- |
| Hero          | `hero`          | heading, description, quoteOne/Source, quoteTwo/Source                                                     | Hero section content |
| Products      | `products`      | name, slug, price, description, buttonText, buttonLink, tagline, medusaVariantId, images[], bulletPoints[] | Product data         |
| FAQs          | `faqs`          | question, answer, order                                                                                    | FAQ accordion        |
| Steal Section | `steal-section` | title, description, note, buttonOneText, buttonTwoText                                                     | Download section     |
| Footer        | `footer`        | copyright, shopLinks[], infoLinks[], socialLinks[]                                                         | Footer content       |
| Users         | `users`         | email, password (auth)                                                                                     | CMS admin users      |
| Media         | `media`         | file uploads                                                                                               | Image storage        |

### API Endpoints

All collections are publicly readable (no auth required for read):

- `GET /api/hero?limit=1` — Hero content
- `GET /api/products?limit=100` — All products
- `GET /api/faqs?limit=100&sort=order` — FAQs sorted by order
- `GET /api/steal-section?limit=1` — Steal section content
- `GET /api/footer?limit=1` — Footer content

---

## Commerce Features (Medusa.js)

| Feature               | Implementation                                                     |
| --------------------- | ------------------------------------------------------------------ |
| Product display       | CMS products with `medusaVariantId` link to Medusa                 |
| Add to cart           | `POST /store/carts/{id}/line-items`                                |
| Cart drawer           | Slide-out drawer with quantity controls                            |
| Customer registration | `POST /auth/customer/emailpass/register` + `POST /store/customers` |
| Customer login        | `POST /auth/customer/emailpass` + `GET /store/customers/me`        |
| Checkout flow         | Multi-step: info → shipping → payment → confirm                    |
| Shipping address      | `POST /store/carts/{id}` with shipping_address                     |
| Test/dummy payment    | Manual payment provider (pp_system_default)                        |
| Order creation        | `POST /store/carts/{id}/complete`                                  |

### Auth Flow

1. **Register**: Creates auth identity via `/auth/customer/emailpass/register`, then creates customer profile via `/store/customers`
2. **Login**: Authenticates via `/auth/customer/emailpass`, receives JWT token, fetches profile via `/store/customers/me`
3. Token stored in localStorage, customer state in React context

### Checkout Flow

1. Contact info form (email, name)
2. Shipping address form (address, city, state, zip, country)
3. Payment selection (manual/test payment)
4. Cart completion → order created in Medusa
5. Order confirmation page with order ID

---

## CMS ↔ Medusa Two-Way Sync

### CMS → Medusa (afterChange Hook)

When a product is created or updated in Payload CMS:

1. The `afterChange` hook on the `products` collection fires
2. Searches Medusa for existing product by `handle` (matching Payload `slug`)
3. If found: updates via `POST /admin/products/{id}`
4. If not found: creates via `POST /admin/products`

**Config needed**: Set `MEDUSA_BACKEND_URL` and `MEDUSA_ADMIN_TOKEN` in Payload env.

### Medusa → CMS (Webhook)

Webhook endpoint at `POST /api/medusa-webhook`:

1. Receives `product.created` or `product.updated` events
2. Validates `x-webhook-secret` header (if configured)
3. Finds matching Payload product by slug ↔ handle
4. Updates product fields (name, description, price, medusaVariantId)
5. Creates new product in Payload if not found

**Config needed**: Set `MEDUSA_WEBHOOK_SECRET` in Payload env. Configure Medusa to send webhooks to `https://cah-assignment.vercel.app/api/medusa-webhook`.

---

## SEO & Performance

- **Meta tags**: Title (template-based), description, Open Graph, Twitter cards on all pages
- **robots.txt**: Generated via `src/app/robots.ts` — allows all crawlers, links to sitemap
- **sitemap.xml**: Generated via `src/app/sitemap.ts` — all pages with priorities and frequencies
- **Next.js Image**: All images use `next/image` with WebP optimization and lazy loading
- **ISR**: All CMS content revalidates every 60 seconds
- **Semantic HTML**: Proper headings, landmarks, aria-labels
- **Mobile-first**: Fully responsive design with Tailwind CSS breakpoints

---

## Environment Variables Reference

### Frontend (`.env.local`)

| Variable                             | Description                  |
| ------------------------------------ | ---------------------------- |
| `NEXT_PUBLIC_CMS_URL`                | Payload CMS base URL         |
| `NEXT_PUBLIC_MEDUSA_URL`             | Medusa backend base URL      |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa store publishable key |

### Payload CMS (`.env`)

| Variable                | Description                        |
| ----------------------- | ---------------------------------- |
| `DATABASE_URI`          | MongoDB connection string          |
| `PAYLOAD_SECRET`        | Payload encryption secret          |
| `MEDUSA_BACKEND_URL`    | Medusa backend URL (for sync hook) |
| `MEDUSA_ADMIN_TOKEN`    | Medusa admin API token (for sync)  |
| `MEDUSA_WEBHOOK_SECRET` | Secret for webhook verification    |

### Medusa Backend (`.env`)

| Variable        | Description                  |
| --------------- | ---------------------------- |
| `DATABASE_URL`  | PostgreSQL connection string |
| `JWT_SECRET`    | JWT signing secret           |
| `COOKIE_SECRET` | Cookie encryption secret     |
| `STORE_CORS`    | Frontend origin for CORS     |
| `ADMIN_CORS`    | Admin panel origin for CORS  |
| `AUTH_CORS`     | Auth flow origins for CORS   |

---

## Deployment

| Service        | Platform           | Notes                                |
| -------------- | ------------------ | ------------------------------------ |
| Frontend       | Vercel             | Auto-deploys on push to main         |
| Payload CMS    | Vercel             | Auto-deploys on push to main         |
| Medusa Backend | Render (Free Tier) | Auto-deploys on push, has cold start |

---

## Assignment Requirements Checklist

- [x] Next.js App Router with TypeScript
- [x] Tailwind CSS styling
- [x] Payload CMS headless — all content dynamic from CMS
- [x] Zero hardcoded content strings
- [x] Medusa.js v2 commerce backend
- [x] Cart implementation (add, remove, update quantity)
- [x] Customer login / registration
- [x] Multi-step checkout flow
- [x] Order creation via Medusa
- [x] Dummy / test payment
- [x] CMS → Medusa sync (afterChange hook)
- [x] Medusa → CMS sync (webhook endpoint)
- [x] SEO meta tags (OG, Twitter, per-page titles)
- [x] robots.txt + sitemap.xml
- [x] Optimized images (next/image)
- [x] ISR for CMS content (60s revalidation)
- [x] Frontend deployed on Vercel
- [x] Payload CMS deployed on Vercel
- [x] Medusa deployed on Render
- [x] Pixel-perfect UI
- [x] Mobile responsive
- [x] GitHub repository with setup instructions
