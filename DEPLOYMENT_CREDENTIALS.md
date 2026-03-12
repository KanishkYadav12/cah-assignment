# 🚀 Deployment Credentials & URLs

## 📍 Deployed URLs

| Service                 | URL                                              |
| ----------------------- | ------------------------------------------------ |
| **Frontend Storefront** | https://cah-assignment-m5rh.vercel.app           |
| **Payload CMS Admin**   | https://cah-assignment.vercel.app/admin          |
| **Medusa Backend API**  | https://cah-assignment.onrender.com              |

---

## 🔐 Login Credentials

### Medusa.js Admin Access

**Important**: In Medusa.js v2, admin authentication is handled through the Medusa Admin dashboard or API.

**Option 1: Using Medusa Admin Dashboard (API-based)**
- Base URL: `https://cah-assignment.onrender.com`
- Admin API Endpoint: `/admin/*`
- You'll need to create an admin user first

**Option 2: Create Admin User via Script**

Run the following command in your medusa-backend directory:

```bash
cd medusa-backend
npx medusa exec ./src/scripts/create-admin.ts
```

**Default Credentials** (after running script):
- Email: `admin@cah.com`
- Password: `Admin@123456`

**Note**: Since the Medusa Admin UI is disabled in your config, you'll access the admin APIs programmatically or re-enable the admin UI by changing `admin: { disable: false }` in `medusa-config.js`.

---

### Payload CMS Admin

- URL: https://cah-assignment.vercel.app/admin
- Email: *(Your Payload admin email - check your deployment env vars)*
- Password: *(Your Payload admin password)*

**To retrieve your Payload credentials:**
1. Check your Vercel environment variables for `PAYLOAD_SECRET`
2. If you created an admin during first deployment, use those credentials
3. If not, you can create one by:
   - Going to https://cah-assignment.vercel.app/admin
   - Following the initial setup flow (if first-time setup)

---

## 📊 Lighthouse Score

To generate your Lighthouse score report:

1. Visit: https://pagespeed.web.dev/
2. Enter your frontend URL: `https://cah-assignment-m5rh.vercel.app`
3. Run the analysis
4. Copy the report URL that Google generates (e.g., `https://pagespeed.web.dev/analysis?url=...`)

**Alternative**: Use Chrome DevTools:
1. Open your deployed site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Click "Generate report"
5. Share the report URL

---

## 🎯 Quick Checklist for Submission

- [ ] Frontend Storefront URL: `https://cah-assignment-m5rh.vercel.app`
- [ ] Lighthouse Score Report URL: *(Generate from PageSpeed Insights)*
- [ ] Payload CMS URL: `https://cah-assignment.vercel.app/admin`
- [ ] Payload CMS Credentials: *(Email & Password)*
- [ ] Medusa Backend URL: `https://cah-assignment.onrender.com`
- [ ] Medusa Admin Credentials: `admin@cah.com` / `Admin@123456` *(after running script)*

---

## 🛠️ How to Create Medusa Admin User NOW

### Option A: Run Locally Then Deploy (RECOMMENDED)

```bash
# 1. Navigate to medusa-backend
cd medusa-backend

# 2. Make sure you have the production DATABASE_URL in .env
# Copy from your Render environment variables

# 3. Run migrations (if needed)
npm run migrate

# 4. Run the admin creation script
npx medusa exec ./src/scripts/create-admin.ts

# Output will show:
# Admin user created successfully!
# Email: admin@cah.com
# Password: Admin@123456
```

### Option B: Use Medusa's Built-in User Creation

Since Medusa v2 admin panel is disabled in your config, you need to either:

1. **Enable Admin UI temporarily**:
   - Edit `medusa-backend/medusa-config.js`
   - Change `admin: { disable: true }` to `admin: { disable: false }`
   - Redeploy to Render
   - Access admin at `https://cah-assignment.onrender.com/app`
   - Create admin user through the UI
   - Disable again if needed

2. **Use API to create user**:
   - Use Postman or curl to call the Medusa Admin API
   - Endpoint: `POST /admin/users`
   - This requires an authenticated session

### Option C: Simplest Solution - Use These Credentials

Since you need credentials NOW for submission, I recommend:

1. Run the script locally with production database
2. Use these credentials in your submission:
   - **Email**: `admin@cah.com`
   - **Password**: `Admin@123456`

---

## 🚨 Quick Fix for Submission

If you need to submit RIGHT NOW and don't have time to set up admin user:

### For Medusa Access:
- **URL**: https://cah-assignment.onrender.com
- **Email**: admin@cah.com
- **Password**: Admin@123456
- **Note**: "Admin user needs to be created by running the setup script included in the repository"

### For Payload CMS:
- Check your Vercel dashboard → cah-assignment project → Settings → Environment Variables
- Look for any PAYLOAD_* variables or user credentials you set during deployment
- If you never created a Payload admin, you'll need to access the /admin route for first-time setup

---

## 📝 Alternative: Already Have a User?

If you already created users during development, check:

1. **Medusa**: Check your local `.env` or Render environment variables for any credentials you may have set
2. **Payload**: The first user is usually created when you first accessed `/admin`

Run this to check existing Medusa users:

```bash
cd medusa-backend
# Connect to your production DB and query users table
```

Or check Render logs for any user creation messages.
