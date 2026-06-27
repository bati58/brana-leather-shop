# Brana Leather

Premium handcrafted leather goods e-commerce site for Brana Leather, based in Bishoftu, Ethiopia.

## Overview

Brana Leather is a Next.js storefront for browsing leather products, filtering by category, viewing product detail pages, managing a cart, and placing checkout/contact requests.

## Tech Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS
- Zustand for cart state
- Supabase-ready data layer
- Chapa, Telebirr, CBE Birr, Cash on Delivery, and Stripe-ready payment flow
- Vercel-ready deployment

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | Purpose                            |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the local Next.js dev server |
| `npm run build` | Build the production app           |
| `npm run start` | Run the production build locally   |
| `npm run lint`  | Run Next.js linting                |

## Environment Variables

Use `.env.example` as the template and put real values in `.env.local`.

Important notes:

- Do not commit `.env.local`.
- Keep API keys and service-role keys out of GitHub.
- Add production environment variables directly in Vercel.
- `.env.example` should contain placeholders or safe public defaults only.
  
## Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add production environment variables in Vercel.
4. Deploy.
