# CAH Medusa v2 Backend

Medusa v2 e-commerce backend for the Cards Against Humanity clone.

## Tech Stack

- **Medusa v2** (2.13.3)
- **PostgreSQL** via Neon.tech
- **Manual Fulfillment** provider
- **Local File** storage

## Project Structure

```
medusa-backend/
├── .env.template       # Environment variable template
├── .gitignore
├── medusa-config.ts    # Medusa configuration
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── admin/          # Custom admin widgets
    ├── api/            # Custom API routes
    ├── jobs/           # Scheduled jobs
    ├── links/          # Module links
    ├── modules/        # Custom modules
    ├── scripts/        # Custom CLI scripts
    ├── subscribers/    # Event subscribers
    └── workflows/      # Custom workflows
```

## Deployment on Render.com

### 1. Create a Web Service

- Connect your GitHub repository
- Set **Root Directory** to `medusa-backend`
- Set **Runtime** to `Node`

### 2. Build & Start Commands

| Setting         | Value                                                                  |
| --------------- | ---------------------------------------------------------------------- |
| Build Command   | `npm install && npx medusa build`                                      |
| Start Command   | `cd .medusa/server && npm install && npm run predeploy && npm run start` |

### 3. Environment Variables

Set these in Render's dashboard:

```
DATABASE_URL=postgresql://neondb_owner:PASSWORD@HOST/neondb?sslmode=require
JWT_SECRET=cah-jwt-secret-2024-random
COOKIE_SECRET=cah-cookie-secret-2024-random
STORE_CORS=https://cah-assignment-m5rh.vercel.app
ADMIN_CORS=https://YOUR-RENDER-URL.onrender.com
AUTH_CORS=https://cah-assignment-m5rh.vercel.app,https://YOUR-RENDER-URL.onrender.com
NODE_ENV=production
MEDUSA_WORKER_MODE=shared
DISABLE_MEDUSA_ADMIN=false
MEDUSA_BACKEND_URL=https://YOUR-RENDER-URL.onrender.com
PORT=9000
```

> **Note:** If the build fails due to memory limits on Render's free tier, set
> `DISABLE_MEDUSA_ADMIN=true` to skip building the admin dashboard. The API
> will still work — you just won't have the admin UI.

### 4. After Deployment

1. Verify health: `https://YOUR-RENDER-URL.onrender.com/health` should return `OK`
2. Create an admin user via Render Shell:
   ```
   cd .medusa/server && npx medusa user -e admin@cah.com -p supersecret
   ```
3. Access admin dashboard: `https://YOUR-RENDER-URL.onrender.com/app`
4. Access store API: `https://YOUR-RENDER-URL.onrender.com/store/products`

## Local Development (if you can install)

```bash
cp .env.template .env
# Fill in your .env values
npm install
npx medusa db:migrate
npm run dev
```

Server runs at `http://localhost:9000`.
