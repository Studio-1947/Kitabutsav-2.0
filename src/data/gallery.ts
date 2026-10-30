/**
 * Festival photos, per edition.
 *
 * PLACEHOLDER DATA. No licensed festival photographs were available when this was built, so
 * every entry below is a captioned slot without `src`. The site draws these as illustrated
 * tiles marked "photo coming". To publish a real photo, put it in public/gallery/<edition>/
 * (landscape 3:2 or portrait 4:5, ~1600px on the long side, compressed JPG/WebP), set `src`
 * and `alt`, and add `credit` if the photographer should be named.
 */
import type { L10n } from "./editions";
import { editions } from "./editions";

export type Moment = "opening" | "conversation" | "launch" | "exhibition" | "reading" | "performance" | "audience" | "signing";

export interface Photo {
  edition: string;
  moment: Moment;
  caption: L10n;
  src?: string;
  alt?: L10n;
  credit?: string;
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

/** The same five moments for every edition until real photos replace them (packs a 4x2 grid). */
const slots: { moment: Moment; shape: Photo["shape"]; caption: (c: L10n) => L10n }[] = [
  { moment: "opening", shape: "wide", caption: (c) => ({ hi: `${c.hi} में उद्घाटन सत्र`, en: `Opening session in ${c.en}` }) },
  { moment: "exhibition", shape: "tall", caption: () => ({ hi: "प्रदर्शनी में किताबें टटोलते पाठक", en: "Readers browsing the book exhibition" }) },
  { moment: "signing", shape: "tall", caption: () => ({ hi: "पसंदीदा किताब पर हस्ताक्षर", en: "Signing a favourite book" }) },
  { moment: "conversation", shape: "square", caption: () => ({ hi: "मंच पर लेखक से बातचीत", en: "An author in conversation on stage" }) },
  { moment: "launch", shape: "square", caption: () => ({ hi: "नई किताब का लोकार्पण", en: "A new book is launched" }) },
];

export const gallery: Photo[] = editions.flatMap((e) =>
  slots.map((sl) => ({ edition: e.slug, moment: sl.moment, shape: sl.shape, caption: sl.caption(e.city) })),
);

export const galleryFor = (edition: string) => gallery.filter((p) => p.edition === edition);
export const hasRealPhotos = gallery.some((p) => p.src);
