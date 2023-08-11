# Documentation

These notes explain how RiftDrop’s backend and storefront fit together. Each file covers one area — what’s happening, why, and where to look in the code.

| Doc | What’s inside |
| --- | --- |
| [schema.md](./schema.md) | Database models, enums, relations, indexes, and naming habits. |
| [auth.md](./auth.md) | Sign-in, JWT + rotating refresh tokens, OAuth, email verify, password reset, roles. |
| [cart.md](./cart.md) | Guest vs signed-in carts, line-item edits, stock checks, merge on login. |
| [checkout.md](./checkout.md) | Cart → order, reserving inventory, Stripe PaymentIntent, webhooks, expiry. |
| [orders.md](./orders.md) | Admin fulfillment, refunds (reserve-then-charge + cleanup job), returns, timeline. |
| [catalog.md](./catalog.md) | Categories, games/gear, variants, images, search indexing for the storefront. |
| [ai.md](./ai.md) | Chat assistant, recommendations, pluggable models, what happens with no API keys. |
| [background-jobs.md](./background-jobs.md) | Queue + inline fallback, cron sweeps, analytics, logging and health. |

Getting the app running is covered in the [root README](../README.md).
