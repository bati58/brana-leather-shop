# Brana Leather — Launch checklist

## ✅ Completed

| Step | Status | Notes |
|------|--------|-------|
| **3 Payments** | ✅ | Telebirr, CBE, COD active. Add `CHAPA_SECRET_KEY` for live mobile pay |
| **7 Email** | ✅ | `batidev01@gmail.com` — Resend optional (`RESEND_API_KEY`) |
| **8 Social** | ✅ | Instagram, Telegram, WhatsApp wired |
| **4 Supabase scaffold** | ✅ | Schema + API persistence when keys set |
| **6 Analytics scaffold** | ✅ | GA4, Clarity, TikTok, Meta — load when env IDs set |
| **Shipping config** | ✅ | `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD`, `SHIPPING_FEE` |

---

## 🔲 Your turn — add to `.env.local`

### Step 4 — Supabase (orders, subscribers, contact saved to DB)

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in SQL Editor
3. Settings → API → copy keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Step 3 — Live Telebirr / CBE

```env
CHAPA_SECRET_KEY=CHASECK_TEST_xxxxxxxx
```

### Step 6 — Analytics

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxx
```

### Step 7 — Live emails

```env
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=Brana Leather <orders@yourdomain.com>
```

### Step 4 — Cloudinary (product images)

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

Use `cloudinaryUrl('products/wallet-01')` from `src/lib/cloudinary.ts`.

---

## 🔲 Remaining

### 1) Brand content
- [ ] Replace hero images in `src/components/home/Hero.tsx`
- [ ] Add real logo to Navbar/Footer
- [ ] Final About / FAQ copy

### 2) Product data
- [ ] Replace `src/lib/products.ts` with real catalog OR import to Supabase

### 5) Deploy
- [ ] Push to GitHub → Vercel → add all env vars → custom domain

### 9) Legal
- [ ] Review privacy & terms pages

---

## Test after Supabase setup

```bash
# Restart dev server after .env.local changes
npm run dev
```

1. Place COD order → check Supabase `orders` table
2. Newsletter signup → check `subscribers` table
3. Contact form → check `contact_messages` table
