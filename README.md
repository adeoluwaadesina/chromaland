# Chromaland Developers - Plot 610 Terraces

A polished single-page marketing experience for Chromaland Developers, built with Next.js App Router, TypeScript, and Tailwind CSS. The site highlights Plot 610 Terraces in Daki Biyu, Abuja with immersive renders, smart-living features, an enquiry workflow, and mobile-first navigation.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS (custom theme + utility-first styling)
- React Hook Form + Zod validation
- Custom toast system, lightbox gallery, and accordions

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run type-safe linting (ESLint + Tailwind rules)
npm run lint

# Generate a production build
npm run build
```

Visit `http://localhost:3000` after running `npm run dev`.

## Asset Automation

Property renders, brand collateral, brochures, and social previews are generated through scripts under `scripts/`.

- `npm run extract:renders` - converts pages 6-11 of the architectural PDF into 1920px JPG renders.  
  - Place the real PDF at `/mnt/data/PLOT 610 PROPOSED TERRACE OPTION 2.pdf` or copy it to `assets/PLOT 610 PROPOSED TERRACE OPTION 2.pdf`.  
  - On Windows the script bundles Poppler binaries in `tools/` so no extra setup is required.  
    - This command is optional for CI; run it manually when you need to refresh the renders.
- `python scripts/create_brand_logo.py` - regenerates the gradient capsule logo and favicon.
- `python scripts/create_brochure.py` - updates the single-page PDF brochure placeholder.
- `python scripts/create_og_image.py` - refreshes the Open Graph image (`public/og.png`).
- `python scripts/create_location_map.py` - recreates the stylised static map illustration.

Re-run the relevant script whenever design assets change.

## Adding Another Property

1. Duplicate the current page structure inside `app/(site)/` by creating a new route group, e.g. `app/(site)/plot-611/page.tsx`.
2. Add the new property data to a dedicated module under `lib/` (follow `lib/data.ts` as a pattern).
3. Generate renders with `npm run extract:renders`, pointing `CHROMALAND_PDF` to the new PDF.
4. Update navigation (`lib/data.ts::NAV_ITEMS`) if you need to expose the new property via the global menu.
5. Configure marketing assets (logo, brochure, OG image) for the new property in `public/`.

## Environment Variables

The contact endpoint is currently stubbed and logs enquiries in development. Prepare email delivery by duplicating `env.example` to `.env.local` and supplying SMTP details:

```
EMAIL_TO=hello@chromaland.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=api-key
SMTP_PASSWORD=secret
```

## Testing & Quality

- `npm run lint` - ESLint (flat config) with Tailwind-specific rules.
- `npm run format` - Prettier with Tailwind class sorting.

## Folder Structure Highlights

- `app/(site)/` - marketing layout, hero, sections, and supporting pages (`/privacy`, `/terms`).
- `app/api/contact/` - POST endpoint validating enquiries via Zod (email sending stubbed).
- `components/` - shared UI primitives (buttons, layout, gallery, accordion, toasts).
- `lib/` - typed data sources and utilities.
- `public/` - brand assets, renders, icons, social images, and brochure.
- `scripts/` - repeatable asset-generation helpers (Python + Node).

## Accessibility & Performance Notes

- Semantic sectioning with `scroll-mt` offsets for anchored navigation.
- Mobile slide-in menu with focus handling and body scroll locking.
- Gallery lightbox supports keyboard arrows, Escape, and swipe gestures.
- Next/Image used across the site with responsive sizing and blur placeholders.
- Toast provider surfaces enquiry feedback with ARIA-friendly alerts.

Enjoy building Chromaland's next property drop!
