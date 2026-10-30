/**
 * Press coverage.
 *
 * PLACEHOLDER DATA. The README notes that edition facts came partly from press coverage, but the
 * article links were not kept. Each entry below is a slot (no `url`) describing coverage known to
 * exist in outline only. Replace `outlet`, `headline`, `date` and add `url` from the real articles;
 * slots without a `url` are shown greyed out with "link coming". Delete any you cannot source.
 */
import type { L10n } from "./editions";
import { org } from "../site.config";

export interface Coverage {
  outlet: L10n;
  headline: L10n;
  date?: string;
  url?: string;
  edition?: string;
}

const outlet: L10n = { hi: "समाचार पत्र (नाम जोड़ें)", en: "Newspaper (add name)" };

export const coverage: Coverage[] = [
  { outlet, edition: "patna-2022", headline: { hi: "पटना में नौ दिन का किताब उत्सव, बिहार के लेखकों का महाजुटान", en: "Nine-day Kitab Utsav in Patna brings Bihar's writers together" } },
  { outlet, edition: "bhopal-2025", headline: { hi: "हिन्दी भवन में किताब उत्सव: पाँच दिन, 32 सत्र", en: "Kitab Utsav at Hindi Bhawan: five days, 32 sessions" } },
  { outlet, edition: "indore-2026", headline: { hi: "इन्दौर किताब उत्सव में संजा की प्रस्तुति", en: "Sanjha performance at Kitab Utsav Indore" } },
  { outlet, edition: "bareilly-2026", headline: { hi: "किताब उत्सव फिर लौटा बरेली", en: "Kitab Utsav returns to Bareilly" } },
];

/** Press desk. Uses the main Rajkamal inbox until a dedicated press address exists. */
export const pressContact = { email: org.email };
