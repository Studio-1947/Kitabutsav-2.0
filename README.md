# Kitab Utsav (Astro)

Website for **किताब उत्सव / Kitab Utsav**, the travelling Hindi book festival of Rajkamal Prakashan Samuh. Static Astro site, Hindi at `/` and English at `/en/`, using the same header and footer as the Rajkamal store build (ported markup, CSS and behaviour).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
SITE_URL=https://your-domain npm run build   # output in dist/
npm run preview
```

Deploys as plain static files (Vercel, Netlify, Cloudflare Pages, any CDN). On Vercel, add `SITE_URL` as an environment variable.

> Note: this project was written without a test build (the authoring sandbox had no npm access). Run `npm install && npm run build` once and fix anything the compiler flags before going live.

## Where things live

| What | File |
| --- | --- |
| Editions (dates, venues, copy, highlights) | `src/data/editions.ts` |
| Bareilly day-wise programme | `src/data/programme.ts` |
| FAQ (the "next edition" answers are generated from editions) | `src/data/faq.ts` |
| Gallery photos (placeholder slots) | `src/data/gallery.ts` |
| Partners and sponsors (18 logos in `public/partners/`) | `src/data/partners.ts` |
| Press coverage (placeholder slots) | `src/data/press.ts` |
| Announced speakers, official totals, tagline | `src/data/speakers.ts` |
| Festival logo slot, partners | `src/site.config.ts` |
| UI strings, date/time formatting, locale paths | `src/i18n/index.ts` |
| Contacts, social links, store URL | `src/site.config.ts` |
| Bold theme (tokens, header, footer, home, inner-page overrides) | `src/styles/bold.css` |
| Header / footer | `src/components/BoldHeader.astro` / `BoldFooter.astro` |
| Component CSS restyled by the theme | `src/styles/site.css` |
| Mobile tab bar CSS (ported) | `src/styles/rk-chrome.css` |
| Header/footer/tab bar behaviour, countdown, tabs | `public/scripts/chrome.js` |
| Footer cursor letters (ported) | `public/scripts/letters.js` |
| Pages (thin routes) / page templates | `src/pages/**` / `src/views/*.astro` |

To add a new edition, add an object to `editions` (newest first). The site works out the next edition from the dates at build time: while one is upcoming, the home hero shows its countdown, the header shows "Book my seat" and a calendar link, and Event schema is emitted. When nothing is upcoming, the hero switches to "next city, soon", "Book my seat" falls back to the last edition page, and Visit/Programme show a notice that the details are from the last edition. Its page, calendar file (`/ics/<slug>.ics`), sitemap entry, gallery block and previous/next links are generated automatically.

Main pages: **About Kitab Utsav** (`/about/`: the story, every edition and the gallery, with in-page tabs) and **Events** (`/programme/`), plus **Partners** (`/partners/`). Secondary pages in the footer: authors (`/resources/`), press, visit, FAQ. One page per edition at `/editions/<slug>/`. `/editions/` and `/gallery/` redirect to sections of `/about/`. Everything exists in Hindi and English.

Header CTAs: "मेरी सीट बुक करें" (primary, goes to `bookSeatUrl` in `site.config.ts`, else the current edition page) and "आगामी आयोजन" (Events).

Theme: the bold design (first built as a preview at `/2/`, which now redirects to `/`). Red page, white and cream rounded boxes, dark blue instead of black, Baloo 2 for display type and Mukta for text. On inner pages the header box and the page hero merge into one white box; each `.section` is its own rounded box.

## Design language

Page styling follows the @kitab.utsav campaign: white paper background, logo blue `#114B9C` and logo red `#DE2026`, marigold `#F2A33A` chevrons (»), sand `#E6CF94` city lettering, pale sky clouds, dashed blue info boxes and red name stickers. Display type is Baloo 2; body type and the header/footer stay on the store fonts. Light theme is the default; the store's dark toggle still works.

The lockup in `src/components/Wordmark.astro` is typographic with a generic open-book mark, not the official emblem (hands holding a book). Put the real logo file in `public/brand/` and set `festivalLogo` in `src/site.config.ts` to use it everywhere.

## Search (SEO) built in

- Real bilingual URLs with `hreflang` (hi-IN, en-IN, x-default) and canonical tags on every page.
- `@astrojs/sitemap` with i18n alternates, plus `robots.txt` pointing to it.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList on every page; `Event` for each dated edition (Bareilly drives the home page); `FAQPage`; `ItemList` on the editions archive. Programme sessions become `subEvent`s only once the real schedule is published.
- One city page per edition so searches like "किताब उत्सव बरेली", "Kitab Utsav Indore", "राजकमल किताब उत्सव पटना" each have a dedicated landing page.
- Open Graph / Twitter cards with a 1200x630 share image (`public/og/kitab-utsav.jpg`).
- Static HTML, no client framework, two small deferred scripts, fonts with `display=swap`.

After launch: verify the domain in Google Search Console, submit `/sitemap-index.xml`, and test a page in the Rich Results Test.

## Placeholders still in the site

- **Speaker portraits**: no real photos are set, so every speaker gets a name tile (initial letter in campaign colours). Add a square photo to `public/speakers/` and set `photo` in `speakers.ts`. The earlier `*-instagram.jpg` crops were poster fragments, and `authors-hero.jpg` was a grid of stock-looking faces; both were moved out of the project to `../kitab-utsav-removed-assets/`.
- **Gallery**: five captioned slots per edition, drawn as coloured "photo coming" tiles. Add real photos in `gallery.ts`.
- **Press**: four slots with placeholder outlet names and no links, shown greyed out. Replace with real articles or delete them before launch.

## Before launch: check these

1. **Domain**: set `SITE_URL` (default placeholder is `https://kitabutsav.rajkamalprakashan.com`).
2. **Programme**: `src/data/programme.ts` is placeholder structure ("घोषणा शीघ्र"). Fill sessions and set `published: true`.
3. **Entry policy**: the FAQ says to check @kitab.utsav for entry details. If entry is free, say so in `faq.ts`.
4. **Facts**: every date and venue came from Rajkamal's event pages, social posts and press coverage (October 2026). Lucknow 2024 has month only; Bhopal's first edition and Banaras are mentioned in the history but have no pages because their dates were not found. The earlier Bareilly edition is implied ("फिर लौट रहा है") but undated.
5. **Announcements**: "hear first" links go to @kitab.utsav on Instagram (there is no newsletter form).
6. **Upcoming vs past** is decided at build time. Rebuild after each edition ends (or on a schedule) so badges, countdown and schema stay correct.
7. **Share image** mentions Bareilly; regenerate it for the next edition.
8. **Logos** in `public/brand/` were rebuilt from the store SVG; swap in official files if you have them.
9. **Speakers**: only Geetashree, Sujata and Adnan Kafeel Darvesh were announced when this was built. Add names (and optional photos in `public/speakers/`) to `speakers.ts`; they also flow into the Event schema as performers.
10. **Partners**: posters show three "साथ" partners; only Windermere Theatre and Speaking Tiger could be identified.

Designed by Studio 1947.
