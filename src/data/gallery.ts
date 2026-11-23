/**
 * Festival photos, per edition.
 *
 * The photos and their Hindi session captions come from the Kitab Utsav 1.0 site
 * (src/data/gallery-photos.ts, files in public/gallery/<edition>/). To add one, put the file in
 * public/gallery/<edition>/ and add a row there. Entries without `src` would render as
 * illustrated "photo coming" tiles.
 */
import type { L10n } from "./editions";
import { editions } from "./editions";
import { importedPhotos } from "./gallery-photos";

export type Moment = "opening" | "conversation" | "launch" | "exhibition" | "reading" | "performance" | "audience" | "signing";

export interface Photo {
  edition: string;
  moment: Moment;
  caption: L10n;
  src?: string;
  alt?: L10n;
  credit?: string;
  /** Original post the photo came from (Instagram). */
  href?: string;
  w?: number;
  h?: number;
  /** Layout hint for the masonry grid. */
  shape?: "wide" | "tall" | "square";
}

export const momentLabel: Record<Moment, L10n> = {
  opening: { hi: "उद्घाटन", en: "Opening" },
  conversation: { hi: "बातचीत", en: "Conversation" },
  launch: { hi: "लोकार्पण", en: "Book launch" },
  exhibition: { hi: "पुस्तक प्रदर्शनी", en: "Book exhibition" },
  reading: { hi: "पाठ", en: "Reading" },
  performance: { hi: "प्रस्तुति", en: "Performance" },
  audience: { hi: "पाठक", en: "Readers" },
  signing: { hi: "हस्ताक्षर", en: "Signing" },
};

const cityOf = (slug: string) => editions.find((e) => e.slug === slug)?.city;

export const gallery: Photo[] = importedPhotos
  .filter((p) => cityOf(p.edition))
  .map((p) => {
    const c = cityOf(p.edition)!;
    const year = p.edition.slice(-4);
    // Session titles are Hindi on the source posts; untitled photos get a plain edition label.
    const caption: L10n = p.caption
      ? { hi: p.caption, en: p.caption }
      : { hi: `किताब उत्सव ${c.hi} ${year}`, en: `Kitab Utsav ${c.en} ${year}` };
    return {
      edition: p.edition,
      moment: p.moment,
      shape: p.shape,
      src: p.src,
      w: p.w,
      h: p.h,
      caption,
      alt: caption,
      ...(p.credit ? { credit: p.credit } : {}),
      ...(p.href ? { href: p.href } : {}),
    };
  });

export const galleryFor = (edition: string) => gallery.filter((p) => p.edition === edition);
export const hasRealPhotos = gallery.some((p) => p.src);

/** Cover photo per edition, the same picks the 1.0 site used on its festivals page. */
const covers: Record<string, string> = {
  "bareilly-2026": "/gallery/bareilly-2026/bareilly-2026-002.webp",
  "indore-2026": "/gallery/indore-2026/indore-2026-052.webp",
  "patna-2026": "/gallery/patna-2026/patna-2026-150.webp",
  "mumbai-2026": "/gallery/mumbai-2026/mumbai-2026-191.webp",
  "bareilly-2025": "/gallery/bareilly-2025/bareilly-2025-230.webp",
  "bhopal-2025": "/gallery/bhopal-2025/bhopal-2025-301.webp",
};

/**
 * Where to anchor a photo when a card crops it (CSS object-position). Set for photos whose
 * heads sit near the top edge, so a crop doesn't cut them off. Default is centred.
 */
const focus: Record<string, string> = {
  "/gallery/mumbai-2026/mumbai-2026-191.webp": "50% 0%",
  "/gallery/mumbai-2026/mumbai-2026-177.webp": "50% 0%",
};
export const focusOf = (p: Photo) => (p.src && focus[p.src]) || "50% 50%";

/**
 * A photo to represent an edition: its chosen cover, else its first photo, else (for an edition
 * with no photos yet, such as an announced one) a different photo from the latest earlier visit to the same city.
 */
export const coverFor = (slug: string): Photo | undefined => {
  const own = gallery.filter((p) => p.edition === slug);
  if (own.length) return own.find((p) => p.src === covers[slug]) ?? own[0];
  const city = editions.find((e) => e.slug === slug)?.city.en;
  const earlier = editions
    .filter((e) => e.city.en === city && e.slug !== slug && gallery.some((p) => p.edition === e.slug))
    .sort((a, b) => b.year - a.year)[0];
  if (!earlier) return undefined;
  // Not that edition's own cover, so the two cards don't show the same picture.
  const cover = coverFor(earlier.slug);
  const pool = gallery.filter((p) => p.edition === earlier.slug && p.src !== cover?.src);
  return pool.find((p) => p.moment !== "audience" && p.shape !== "tall") ?? pool[0] ?? cover;
};
