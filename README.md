# jupsy-homepage

JUPSY company homepage built with Next.js App Router.

## Stack

- `Next.js 16`
- `React 19`
- App Router with a client-driven home page
- Shared portfolio data for home and works pages
- Route Handlers for PayPal order create/capture scaffolding

## Routes

- `/`: home page with hero, client marquee, works preview, and inquiry modal
- `/about`: studio introduction and team page
- `/works`: full portfolio gallery page
- `/api/paypal/create-order`: PayPal order creation route
- `/api/paypal/capture-order`: PayPal order capture route

## Project Structure

- `app/layout.js`: root layout, metadata, and font loading
- `app/page.js`: home page entry
- `app/about/page.js`: about page
- `app/works/page.js`: works archive page
- `app/works/works-data.js`: shared works filters and item data
- `app/globals.css`: global stylesheet entry
- `app/site.css`: shared site styles for all pages
- `components/HomePageClient.js`: home UI, client marquee, works preview, inquiry modal, PayPal panel
- `components/WorksGallery.js`: filterable works gallery
- `components/PayPalCheckout.js`: PayPal button scaffold
- `components/SiteHeader.js`: shared header with route-aware anchors
- `components/SiteFooter.js`: shared footer with contact anchor
- `lib/paypal.js`: PayPal API helper functions
- `.env.example`: PayPal environment variable template
- `public/clients/`: client logo assets for the marquee
- `public/home/`: home preview card assets
- `public/team/`: team profile images
- `public/works/image/`: portfolio still images
- `public/works/video/`: portfolio motion preview assets

## Development

- Install dependencies: `npm install`
- Run local dev server: `npm run dev`
- Build for production check: `npm run build`
- Start production server locally: `npm run start`

Default local address:

- `http://localhost:3000`

## Environment Variables

Copy `.env.example` to `.env.local` before testing PayPal flows.

- `PAYPAL_ENV`: `sandbox` or `live`
- `PAYPAL_CLIENT_ID`: server-side PayPal client id
- `PAYPAL_CLIENT_SECRET`: server-side PayPal client secret
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: browser PayPal client id
- `NEXT_PUBLIC_PAYPAL_CURRENCY`: default checkout currency
- `PAYPAL_DEFAULT_AMOUNT`: default server-side amount
- `NEXT_PUBLIC_PAYPAL_DEFAULT_AMOUNT`: default amount shown in the inquiry modal

`NEXT_PUBLIC_PAYPAL_CLIENT_ID` and `NEXT_PUBLIC_PAYPAL_DEFAULT_AMOUNT` are written in `.env.example` as references to the server-side values.

## Current Implementation Notes

- Main header navigation uses `/#home` and `/#works` anchors for `HOME` and `WORKS`, while `ABOUT` stays on its own route.
- A dedicated `/works` page still exists and uses the same `works-data.js` source as the home works preview.
- The home page opens a shared inquiry modal from `Contact Us`, `이미지 제작 의뢰`, and `영상 제작 의뢰`.
- Subpages do not open the modal directly; their header/footer contact links navigate back to the home contact anchor.
- The inquiry modal currently collects contact fields and embeds a PayPal checkout scaffold in the same panel.
- Works filtering supports `All`, `Photography`, and `Cinematography`.
- The home portfolio grid is fixed to `3 columns` with equal card widths.
- Home portfolio cards currently use only these aspect keys from `works-data.js`: `1:1`, `4:3`, `16:9`, `9:16`.
- In the home portfolio grid, `9:16` items span `2 rows`; all other aspect types use `1 row`.
- Video works use local `WEBM` previews and open external links such as YouTube on click.
- Team cards on `/about` use real images where available, while `Han` and `Susie` remain intentionally image-free cards.

## Asset Rules

- Keep asset directory names lowercase under `public/`
- Keep new portfolio entries in `app/works/works-data.js` instead of hardcoding them into page components
- When adding home portfolio items, always set an `aspect` value in `app/works/works-data.js`
- Allowed home portfolio aspect values are only `1:1`, `4:3`, `16:9`, and `9:16`
- Prefer lightweight web-ready images and `WEBM` previews for portfolio media
- Deployment targets such as Linux/Vercel are case-sensitive, so file names and import paths must match exactly

## Next Session Reminder

- If new works are added, update `app/works/works-data.js` first and keep the home portfolio within the current aspect rules unless the grid system itself is intentionally being redesigned
- If PayPal is being activated, test `create-order` and `capture-order` with sandbox credentials before switching to live
- If navigation is changed later, keep in mind that the current header intentionally mixes in-page anchors and dedicated routes
