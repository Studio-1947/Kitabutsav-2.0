/**
 * Day-wise programme for the featured edition (Bareilly, 23 to 27 October 2026).
 *
 * PLACEHOLDER DATA. Rajkamal has not published the Bareilly session list yet, so every session
 * below is a structural slot ("announcing soon") built on the usual Kitab Utsav format.
 * Replace `title`, `speakers` and times with the real schedule, then set `published: true`.
 * While `published` is false the site shows a "schedule to be announced" notice and does not
 * emit the sessions as structured data, so placeholder rows never reach Google.
 */
import type { L10n } from "./editions";

export type SessionKind = "opening" | "conversation" | "launch" | "discussion" | "reading" | "poetry" | "performance" | "exhibition";

export interface Session {
  time: string; // "11:00"
  end?: string;
  kind: SessionKind;
  title: L10n;
  speakers: string[];
  venue?: L10n;
}

export interface ProgrammeDay {
  date: string; // ISO
  sessions: Session[];
}

export const programme = {
  editionSlug: "bareilly-2026",
  published: false,
  days: [] as ProgrammeDay[],
};

const tba: L10n = { hi: "घोषणा शीघ्र", en: "To be announced" };

const dayTemplate = (date: string, first: Session | null, last: Session): ProgrammeDay => ({
  date,
  sessions: [
    { time: "11:00", end: "20:00", kind: "exhibition", title: { hi: "पुस्तक प्रदर्शनी", en: "Book exhibition" }, speakers: [] },
    ...(first ? [first] : []),
    { time: "13:00", kind: "conversation", title: tba, speakers: [] },
    { time: "15:00", kind: "launch", title: tba, speakers: [] },
    { time: "16:30", kind: "discussion", title: tba, speakers: [] },
    last,
  ],
});

programme.days = [
  dayTemplate(
    "2026-10-23",
    { time: "11:30", kind: "opening", title: { hi: "उद्घाटन सत्र", en: "Opening session" }, speakers: [] },
    { time: "18:00", kind: "reading", title: tba, speakers: [] },
  ),
  dayTemplate("2026-10-24", null, { time: "18:00", kind: "reading", title: tba, speakers: [] }),
  dayTemplate("2026-10-25", null, { time: "18:00", kind: "performance", title: tba, speakers: [] }),
  dayTemplate("2026-10-26", null, { time: "18:00", kind: "reading", title: tba, speakers: [] }),
  dayTemplate("2026-10-27", null, { time: "18:00", kind: "poetry", title: { hi: "समापन काव्य संध्या", en: "Closing poetry evening" }, speakers: [] }),
];

export const sessionKindLabel: Record<SessionKind, L10n> = {
  opening: { hi: "उद्घाटन", en: "Opening" },
  conversation: { hi: "बातचीत", en: "Conversation" },
  launch: { hi: "लोकार्पण", en: "Book launch" },
  discussion: { hi: "चर्चा", en: "Discussion" },
  reading: { hi: "पाठ", en: "Reading" },
  poetry: { hi: "काव्य संध्या", en: "Poetry evening" },
  performance: { hi: "प्रस्तुति", en: "Performance" },
  exhibition: { hi: "प्रदर्शनी", en: "Exhibition" },
};
