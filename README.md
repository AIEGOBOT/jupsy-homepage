# jupsy-homepage

JUPSY company homepage

## Pages

- `index.html`: Home
- `about.html`: About
- `works.html`: Works

## Asset Structure

- `works/image/`: works image assets
- `works/video/`: works motion preview assets
- `team/`: about page team profile images

## Works Video Rule

- Works video cards use `WEBM` moving thumbnails
- Clicking a video thumbnail opens a `YouTube link` or another external link
- Do not default to direct iframe embed as the main works card presentation

## Current Implementation Notes

- Main navigation is split into `HOME`, `ABOUT`, `WORKS`
- `ABOUT` is a separate page, not an in-page section on home
- `WORKS` is a separate page, not an in-page section on home
- Team cards on `about.html` currently use real images from `team/` where available
- `Han` and `Susie` are intentionally rendered as blank white cards without photos
- Team image files in the project are currently using the reduced web-ready copies, not the original full-size source files

## Next Session Reminder

- If image artifacts or rendering issues come back, first verify whether the problem is from the source file, browser scaling, or CSS overlays before replacing assets
