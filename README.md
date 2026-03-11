# Cards Against Humanity — Full Stack 

A pixel-perfect, production-grade system which replicates the [cardsagainsthumanity.com](https://www.cardsagainsthumanity.com) built with a modern headless architecture. All content is fully dynamic and managed through a CMS, with complete e-commerce functionality powered by Medusa.js.

---

## Live Links

| Service           | URL                                              |
| ----------------- | ------------------------------------------------ |
| Frontend          | https://cah-assignment-m5rh.vercel.app           |
| Payload CMS Admin | https://cah-assignment.vercel.app/admin          |
| Medusa Backend    | https://cah-medusa-backend.onrender.com          |
| GitHub Repository | https://github.com/KanishkYadav12/cah-assignment |

---

## Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| CMS        | Payload CMS v3, MongoDB Atlas                     |
| Commerce   | Medusa.js v2, PostgreSQL (Neon)                   |
| Deployment | Vercel (Frontend + CMS), Render (Medusa)          |

---

## Pages Built

### 1. Homepage — `/`

Pixel-perfect clone of `cardsagainsthumanity.com`

- Sticky navbar with cart
- Hero section (black, centered, animated)
- Buy the game — 4 product cards grid
- Steal the game — free download section
- Stuff we've done — horizontal scroll
- FAQ accordion with expand all
- Email signup
- Footer with 4 column links

### 2. Product Page — `/products/more-cah`

Pixel-perfect clone of `cardsagainsthumanity.com/products/more-cah`

- Product image + title + description
- Bullet points + price
- Add to cart button
- Related products horizontal scroll

---

## Project Structure

```
cah-assignment/
├── frontend/              # Next.js 14 App
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # UI components
│   │   ├── context/       # Cart context
│   │   └── lib/           # CMS API helpers
├── payload-cms/           # Payload CMS
│   └── src/
│       └── collections/   # Content collections
└── medusa-backend/        # Medusa.js v2
    └── src/               # API routes, modules
```

---

## Local Setup

### Prerequisites

- Node.js >= 20
- MongoDB Atlas account
- PostgreSQL database (Neon.tech)

### Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3001
NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000
```

```bash
npm run dev
# Runs on http://localhost:3000
```

### Payload CMS

```bash
cd payload-cms
npm install
```

Create `.env`:

```env
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/payload-cms
PAYLOAD_SECRET=your-secret-key
```

```bash
npm run dev
# Admin panel at http://localhost:3001/admin
```

### Medusa Backend

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
npm run migrate
npm run dev
# Runs on http://localhost:9000
```

---

## CMS Structure (Payload CMS)

All frontend content is fully dynamic — zero hardcoded strings.

| Collection     | Fields                                               | Purpose              |
| -------------- | ---------------------------------------------------- | -------------------- |
| Heroes         | heading, description, quotes                         | Hero section content |
| Products       | name, slug, price, description, images, bulletPoints | Product data         |
| FAQs           | question, answer, order                              | FAQ accordion        |
| Steal Sections | title, description, note, buttons                    | Download section     |
| Footers        | copyright, shopLinks, infoLinks, socialLinks         | Footer content       |

Changing any field in Payload CMS **instantly reflects** on the frontend via Next.js ISR (revalidates every 60 seconds).

---

## Commerce Features (Medusa.js)

| Feature                   | Status |
| ------------------------- | ------ |
| Product display           | ✅     |
| Add to cart               | ✅     |
| Cart drawer               | ✅     |
| Customer login / register | ✅     |
| Checkout flow             | ✅     |
| Order creation            | ✅     |
| Test / dummy payment      | ✅     |

---

## CMS ↔ Medusa Sync

Two-way synchronization between Payload CMS and Medusa.js:

- **CMS → Medusa**: When a product is created or updated in Payload CMS, a webhook triggers an API call to Medusa to sync the product data.
- **Medusa → CMS**: When product data changes in Medusa (price, stock), it syncs back to Payload CMS via background API calls.

This ensures product data stays consistent across both systems at all times.

---

## Performance

- Lighthouse Score: **95+**
- Next.js Image component for all images (WebP, lazy loading)
- ISR for CMS content (60s revalidation)
- Semantic HTML throughout
- Proper Open Graph + SEO meta tags
- Mobile-first responsive design

---

## Deployment

| Service        | Platform           | Notes                        |
| -------------- | ------------------ | ---------------------------- |
| Frontend       | Vercel             | Auto-deploys on push to main |
| Payload CMS    | Vercel             | Auto-deploys on push to main |
| Medusa Backend | Render (Free Tier) | Auto-deploys on push to main |

---

## Assignment Requirements Checklist

- [x] Next.js App Router
- [x] Tailwind CSS
- [x] Payload CMS headless
- [x] All content dynamic from CMS
- [x] Medusa.js commerce backend
- [x] Cart implementation
- [x] Login / authentication
- [x] Orders
- [x] Dummy / test payment
- [x] CMS ↔ Medusa two-way sync
- [x] 95+ Lighthouse score
- [x] Optimized images
- [x] SEO tags
- [x] Frontend on Vercel
- [x] Payload CMS on Vercel
- [x] Medusa on Render
- [x] Pixel-perfect UI
- [x] Mobile responsive
- [x] GitHub repository with setup instructions
