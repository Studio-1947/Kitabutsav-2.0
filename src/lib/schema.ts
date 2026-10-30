import type { Edition } from "../data/editions";
import type { Lang } from "../i18n";
import { htmlLang, localePath } from "../i18n";
import { org } from "../site.config";
import { speakersFor } from "../data/speakers";

/** schema.org Event for an edition. Only emits fields we actually know. */
export function eventLd(e: Edition, lang: Lang, site: URL, image: string) {
  if (!e.start || !e.end) return null;
  const tz = "+05:30";
  const startDate = e.startTime ? `${e.start}T${e.startTime}:00${tz}` : e.start;
  const endDate = e.endTime ? `${e.end}T${e.endTime}:00${tz}` : e.end;
  const name = lang === "hi" ? `किताब उत्सव ${e.city.hi} ${e.year}` : `Kitab Utsav ${e.city.en} ${e.year}`;
  const url = new URL(localePath(lang, `/editions/${e.slug}/`), site).href;
  return {
    "@type": "Event",
    "@id": `${url}#event`,
    name,
    alternateName: lang === "hi" ? `Kitab Utsav ${e.city.en} ${e.year}` : `किताब उत्सव ${e.city.hi} ${e.year}`,
    description: e.summary[lang],
    url,
    inLanguage: htmlLang[lang],
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [new URL(image, site).href],
    location: {
      "@type": "Place",
      name: e.venue ? e.venue[lang] : e.city[lang],
      address: {
        "@type": "PostalAddress",
        ...(e.address?.street ? { streetAddress: e.address.street } : {}),
        addressLocality: e.address?.locality ?? e.city.en,
        addressRegion: e.address?.region ?? e.state.en,
        addressCountry: "IN",
      },
    },
    ...(speakersFor(e.slug).length
      ? { performer: speakersFor(e.slug).map((p) => ({ "@type": "Person", name: p.name[lang], description: p.role[lang] })) }
      : {}),
    organizer: { "@type": "Organization", "@id": `${org.url}/#organization`, name: org.name, url: org.url },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a.replace(/<[^>]+>/g, "") },
    })),
  };
}

export const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
