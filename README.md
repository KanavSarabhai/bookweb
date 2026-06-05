# Shroff Publishers — Modern Bookstore Redesign

A premium, editorial redesign of the Shroff Publishers and Distributors technical bookstore experience. Built with Next.js, TypeScript, and Tailwind CSS.

## Design

- Warm ivory and cream surfaces with rich brown typography
- Muted gold accents and subtle editorial motion
- Cormorant Garamond (headings), Source Serif 4 (body), DM Sans (UI)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, bestsellers, new arrivals |
| `/books` | Full catalog with filters and sort |
| `/books/[slug]` | Product detail page |
| `/categories` | All categories |
| `/categories/[slug]` | Category listing |
| `/search` | Search with instant suggestions and filters |
| `/publishers` | Browse by publisher |
| `/cart` | Shopping cart |
| `/account/sign-in` | Sign in |
| `/account/register` | Register |
| `/account/track-order` | Order tracking |

## Production

```bash
npm run build
npm start
```

This prototype uses static mock catalog data. Connect to your existing CMS or ecommerce backend to wire live inventory, cart, and checkout.
