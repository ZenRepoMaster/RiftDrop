# RiftDrop — PlayStation Game Shop

RiftDrop is a full-stack storefront for **PS5 and PS4 games** (plus controllers and headsets). It ships with a customer catalog, an admin console, Stripe checkout, and an AI shopping assistant that can recommend titles or look up order status.

**Stack:** NestJS · Prisma · PostgreSQL (pgvector) · Redis · React (Vite) · TypeScript · Tailwind · Stripe.

```
ecommerce-website/
├── backend/    NestJS API
├── frontend/   React SPA (storefront + admin)
└── docs/       How the major flows work
```

## What you get

- **Storefront** — browse PS5/PS4 catalog, keyword + semantic search, cart, Stripe checkout.
- **Admin** — manage titles & categories, fulfill orders (status, refunds, returns), customers, and basic metrics.
- **Auth** — email/password with verification emails, Google OAuth, roles (Guest / Customer / Admin). Short JWT access tokens plus rotating opaque refresh tokens.
- **Checkout** — Stripe PaymentIntents, webhook capture, atomic stock holds so you don’t oversell, and idempotent refunds.
- **AI assistant** — streaming chat for “what should I play?” plus personalized recommendations. Plugs into Hugging Face / OpenAI-compatible models; falls back to full-text search if nothing is configured.
- **Ops** — BullMQ job queue (or inline fallback), analytics events, structured logs, health checks.

## Docs

Deeper walkthroughs live in [`docs/`](./docs):
[schema](./docs/schema.md) ·
[auth](./docs/auth.md) ·
[cart](./docs/cart.md) ·
[checkout](./docs/checkout.md) ·
[orders](./docs/orders.md) ·
[catalog](./docs/catalog.md) ·
[ai](./docs/ai.md) ·
[background jobs](./docs/background-jobs.md).

## Setup & run

### Prerequisites
- **Node.js 20+**
- **PostgreSQL 14+** with **`pgvector`** and **`citext`**, plus a role that can `CREATE EXTENSION`.
  - macOS: `brew install postgresql@16 pgvector`
  - Debian/Ubuntu: `apt install postgresql postgresql-16-pgvector`
  - then `createdb ecommerce`
- **Redis** (optional) — powers the job queue. Set `QUEUE_ENABLED=false` to skip it.
- **SMTP sink** (optional) — [Mailpit](https://mailpit.axllent.org) works with the default `.env` (SMTP `:1025`, UI http://localhost:8025).

### Backend → http://localhost:4000/api
```bash
cd backend
cp .env.example .env          # set DATABASE_URL (Google/Stripe/AI keys optional)
npm install
npm run prisma:generate
npm run prisma:migrate        # schema + extensions
npm run db:seed               # demo PS5/PS4 catalog, customers, orders
npm run start:dev
```

### Frontend → http://localhost:5173
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Demo logins
- Admin → `admin@riftdrop.test` / `Admin123!`
- Customer → `olivia.bennett@example.com` / `Password123!`

## Optional integrations
Everything below is optional — the shop still runs with sensible fallbacks.

- **Stripe** — `STRIPE_SECRET_KEY` (backend) + `VITE_STRIPE_PUBLISHABLE_KEY` (frontend). For webhooks: `stripe listen --forward-to localhost:4000/api/checkout/webhook` and set `STRIPE_WEBHOOK_SECRET`. Without keys, checkout uses a demo completion path.
- **Google OAuth** — `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`, callback `http://localhost:4000/api/auth/google/callback`.
- **AI models** — set `AI_CHAT_PROVIDER` / `AI_EMBEDDING_PROVIDER` (and HF or OpenAI-compatible keys) in `backend/.env`, then reindex with `POST /api/admin/catalog/reindex` and apply `backend/prisma/sql/ai-indexes.sql`. Details in [docs/ai.md](./docs/ai.md).

> Money is always stored and sent as integer cents (minor units).
