# jupsy-homepage

JUPSY company homepage built with Next.js App Router.

## Stack

- `Next.js 16`
- `React 19`
- Static page rendering for the current marketing site

## Routes

- `/`: Home
- `/about`: About
- `/works`: Works

## Project Structure

- `app/layout.js`: root layout and metadata
- `app/page.js`: home page
- `app/about/page.js`: about page
- `app/works/page.js`: works page
- `app/globals.css`: global stylesheet entry
- `app/site.css`: shared site styles
- `components/`: shared header and footer
- `public/team/`: about page team profile images
- `public/works/image/`: works image assets
- `public/works/video/`: works motion preview assets

## Development

- Install dependencies: `npm install`
- Run local dev server: `npm run dev`
- Build for production check: `npm run build`
- Start production server locally: `npm run start`

Default local address:

- `http://localhost:3000`

## Asset Rules

- Keep asset directory names lowercase: `public/works/image`, `public/works/video`, `public/team`
- Deployment environments like `Vercel/Linux` are case-sensitive

## Works Video Rule

- Works video cards use `WEBM` moving thumbnails
- Clicking a video thumbnail opens a `YouTube link` or another external link
- Do not default to direct iframe embed as the main works card presentation

## Current Implementation Notes

- Main navigation is split into `HOME`, `ABOUT`, `WORKS`
- `ABOUT` is a separate route, not an in-page section on home
- `WORKS` is a separate route, not an in-page section on home
- Team cards on `/about` use real images from `public/team/` where available
- `Han` and `Susie` are intentionally rendered as blank white cards without photos
- Team image files in the project are currently using reduced web-ready copies, not original full-size source files

## Next Session Reminder

- If image artifacts or rendering issues come back, first verify whether the problem is from the source file, browser scaling, or CSS overlays before replacing assets
