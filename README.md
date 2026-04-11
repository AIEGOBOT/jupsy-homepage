# jupsy-homepage

JUPSY company homepage built with Next.js App Router.

## Stack

- `Next.js 16`
- `React 19`
- App Router with a client-driven home page
- Shared portfolio data for the home page grid

## Routes

- `/`: home page with hero, client marquee, works preview, and inquiry modal
- `/about`: studio introduction and team page

## Project Structure

- `app/layout.js`: root layout, metadata, and font loading
- `app/page.js`: home page entry
- `app/about/page.js`: about page
- `app/works/works-data.js`: shared works filters and item data for the home portfolio
- `app/globals.css`: global stylesheet entry
- `app/site.css`: shared site styles for all pages
- `components/HomePageClient.js`: home UI, client marquee, works preview, inquiry modal
- `components/SiteHeader.js`: shared header with route-aware anchors
- `components/SiteFooter.js`: shared footer with contact anchor
- `.env.example`: local environment variable template
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

Copy `.env.example` to `.env.local` if local-only variables are needed later.

## Current Implementation Notes

- Main header navigation uses `/#home` and `/#works` anchors for `HOME` and `WORKS`, while `ABOUT` stays on its own route.
- The home page opens a shared inquiry modal from `Contact Us`, `이미지 제작 의뢰`, and `영상 제작 의뢰`.
- The about page also opens the shared inquiry modal directly from its header, footer, and CTA.
- Works filtering supports `All`, `Photography`, and `Cinematography`.
- The home portfolio grid is fixed to `3 columns` with equal card widths.
- Home portfolio cards currently use only these aspect keys from `works-data.js`: `1:1`, `4:3`, `16:9`, `9:16`.
- In the home portfolio grid, `9:16` items span `2 rows`; all other aspect types use `1 row`.
- Video works use local `WEBM` previews and open external links such as YouTube on click.
- Team cards on `/about` use the current text-first member grid layout.

## Asset Rules

- Keep asset directory names lowercase under `public/`
- Keep new portfolio entries in `app/works/works-data.js` instead of hardcoding them into page components
- When adding home portfolio items, always set an `aspect` value in `app/works/works-data.js`
- Allowed home portfolio aspect values are only `1:1`, `4:3`, `16:9`, and `9:16`
- Prefer lightweight web-ready images and `WEBM` previews for portfolio media
- Deployment targets such as Linux/Vercel are case-sensitive, so file names and import paths must match exactly

## Next Session Reminder

- If new works are added, update `app/works/works-data.js` first and keep the home portfolio within the current aspect rules unless the grid system itself is intentionally being redesigned
- If navigation is changed later, keep in mind that the current header intentionally mixes in-page anchors and dedicated routes
