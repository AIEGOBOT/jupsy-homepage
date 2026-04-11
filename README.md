# jupsy-homepage

JUPSY studio homepage built with Next.js App Router.

## Stack

- `Next.js 16`
- `React 19`
- App Router with a client-driven home page
- Shared portfolio data for the home page grid

## Routes

- `/`: home page with split hero, client marquee, works grid, and shared inquiry modal
- `/about`: studio introduction, workflow summary, team section, and inquiry CTA
- `/works/[slug]`: internal work detail page only for portfolio items that have a `detailSlug`

## Project Structure

- `app/layout.js`: root layout, metadata, and font loading
- `app/page.js`: home page entry
- `app/about/page.js`: about page
- `app/works/works-data.js`: shared works filters, home portfolio data, and detail-page data
- `app/works/[slug]/page.js`: dynamic work detail route
- `app/globals.css`: global stylesheet entry
- `app/site.css`: shared site styles for all pages
- `components/HomePageClient.js`: home UI, split hero, client marquee, works grid, inquiry modal
- `components/AboutPageClient.js`: about page client UI and inquiry modal trigger wiring
- `components/ContactModal.js`: shared inquiry modal used by home and about
- `components/SiteHeader.js`: shared header with route-aware anchors
- `components/SiteFooter.js`: shared footer with contact anchor
- `components/WorkDetailPageClient.js`: work detail hero and gallery client UI
- `.env.example`: local environment variable template
- `public/clients/`: client logo assets for the marquee
- `public/home/`: home preview card assets
- `public/works/image/`: portfolio still images
- `public/works/projects/`: per-project detail gallery assets
- `public/works/video/`: portfolio motion preview assets

## Development

- Install dependencies: `npm install`
- Run local dev server: `npm run dev`
- Build for production check: `npm run build`
- Start production server locally: `npm run start`

Default local address:

- `http://localhost:3000`

## Environment Variables

Copy `.env.example` to `.env.local` if local-only variables are needed later.

## Current Implementation Notes

- Main header navigation order is `HOME`, `WORKS`, `ABOUT`, and the top-right action is `문의하기`.
- The home hero is split into a dark top band and a media-driven bottom band.
- The home hero bottom currently rotates between `KBS` and `GEN AI SEOUL 2025` local videos.
- The home page opens the shared inquiry modal from `문의하기`, `이미지 제작 의뢰`, `영상 제작 의뢰`, and the footer contact action.
- The about page also opens the shared inquiry modal directly from its header, footer, and CTA.
- The inquiry modal is a split layout: dark left information panel and white right form panel.
- The inquiry form is intentionally still UI-only for now; no submission handler is connected yet.
- PayPal-related UI, API routes, helpers, and env var examples have been removed for now.
- Works filtering supports `All`, `Photography`, and `Cinematography`.
- The home portfolio grid is fixed to `3 columns` with equal card widths.
- Home portfolio cards currently use only these aspect keys from `works-data.js`: `1:1`, `4:3`, `16:9`, `9:16`.
- In the home portfolio grid, `9:16` items span `2 rows`; all other aspect types use `1 row`.
- Video works use local `WEBM` previews and currently open external links such as YouTube.
- Image works can open internal detail pages when the item has a `detailSlug`.
- Current internal detail pages include `revv`, `saerom-black-goat-beauty-cut`, `richcoco`, `galbitsal`, `blueberry`, `ssanghwa`, `suji-tang`, `prune-noni`, `hanwoo-bulgogi`, and `black-goat-soup`.
- Work detail pages currently use a full-screen hero image, centered overlay title, and a same-width image gallery below.
- The about page now uses centered section copy blocks similar to the home `Clients` and `Works` sections.
- Team cards on `/about` use the current text-first member grid layout without profile images.
- The `About` page hero now behaves like the home hero: it expands with viewport size and uses a full-width layout.

## Asset Rules

- Keep asset directory names lowercase under `public/`
- Keep new portfolio entries in `app/works/works-data.js` instead of hardcoding them into page components
- When adding home portfolio items, always set an `aspect` value in `app/works/works-data.js`
- Allowed home portfolio aspect values are only `1:1`, `4:3`, `16:9`, and `9:16`
- If a work should open its own internal detail page, add a `detailSlug` to the item and a matching entry in `workDetails`
- Detail-page assets should live under `public/works/projects/<project-slug>/`
- Current detail galleries are stored as `webp` files for lighter deployment and bandwidth use
- Gallery image file names should stay simple and ASCII-friendly when possible
- Prefer lightweight web-ready images and `WEBM` previews for portfolio media
- Deployment targets such as Linux/Vercel are case-sensitive, so file names and import paths must match exactly

## Next Session Reminder

- If new works are added, update `app/works/works-data.js` first and keep the home portfolio within the current aspect rules unless the grid system itself is intentionally being redesigned
- If another project needs a detail page, follow the `detailSlug` + `workDetails` + `public/works/projects/<slug>/` pattern used for the existing detail routes
- If a work should stay on the home grid only, do not add `detailSlug`
- If navigation is changed later, keep in mind that the current header intentionally mixes in-page anchors and dedicated routes
- Temporary local files such as `dev-server.log` and screenshot PNGs should not be committed
