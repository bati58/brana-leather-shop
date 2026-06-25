# Brana Leather

Premium handcrafted leather goods e-commerce platform for Brana Leather — based in Bishoftu (Seven Lake City), Ethiopia.

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **State:** Zustand (cart persistence)
- **Payments:** Chapa, Telebirr, CBE Birr, COD, Stripe (ready to integrate)
- **Deployment:** Vercel-ready

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Setup

Copy `.env.example` to `.env.local` and configure your API keys:

```bash
cp .env.example .env.local
```

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/shop` |
| Category | `/shop/[category]` |
| Product Detail | `/product/[slug]` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| About & Contact | `/about` |
| Leather Care Guide | `/care-guide` |
| FAQ | `/faq` |
| Privacy Policy | `/privacy` |
| Terms & Conditions | `/terms` |

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

## Contact

Brana Leather — Bishoftu, Ethiopia — 0989977058
