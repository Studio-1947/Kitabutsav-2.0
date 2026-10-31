import type { Edition } from "../data/editions";

export const locales = ["hi", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "hi";

export const htmlLang: Record<Lang, string> = { hi: "hi-IN", en: "en-IN" };
export const ogLocale: Record<Lang, string> = { hi: "hi_IN", en: "en_IN" };

/** "/editions/" -> "/editions/" for hi, "/en/editions/" for en */
export function localePath(lang: Lang, path = "/"): string {
  const clean = "/" + path.replace(/^\/+/, "");
  return lang === defaultLang ? clean : `/${lang}${clean === "/" ? "/" : clean}`;
}

/** Strip the locale prefix so the same route can be built in the other language. */
export function routeOf(pathname: string): string {
  const p = pathname.replace(/^\/en(?=\/|$)/, "");
  return p === "" ? "/" : p;
}

const hiMonths = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"];
const enMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const enShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const hiDays = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const parts = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
};

export function formatDate(iso: string, lang: Lang, withDay = false): string {
  const { y, m, d, dow } = parts(iso);
  if (lang === "hi") return `${withDay ? hiDays[dow] + ", " : ""}${d} ${hiMonths[m]} ${y}`;
  return `${withDay ? enDays[dow] + ", " : ""}${d} ${enMonths[m]} ${y}`;
}

/** 23 से 27 अक्टूबर 2026 / 23 to 27 October 2026 (short: 23-27 Oct 2026) */
export function formatRange(e: Pick<Edition, "start" | "end" | "monthLabel">, lang: Lang, short = false): string {
  if (!e.start || !e.end) return e.monthLabel ? e.monthLabel[lang] : "";
  const a = parts(e.start), b = parts(e.end);
  const months = lang === "hi" ? hiMonths : short ? enShort : enMonths;
  const sep = short ? "-" : lang === "hi" ? " से " : " to ";
  if (a.m === b.m && a.y === b.y) return `${a.d}${sep}${b.d} ${months[a.m]} ${a.y}`;
  if (a.y === b.y) return `${a.d} ${months[a.m]}${sep}${b.d} ${months[b.m]} ${a.y}`;
  return `${a.d} ${months[a.m]} ${a.y}${sep}${b.d} ${months[b.m]} ${b.y}`;
}

export function formatTime(t: string, lang: Lang): string {
  const [h, m] = t.split(":").map(Number);
  if (lang === "hi") {
    const part = h < 12 ? "सुबह" : h < 16 ? "दोपहर" : h < 19 ? "शाम" : "रात";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${part} ${h12}${m ? ":" + String(m).padStart(2, "0") : ""} बजे`;
  }
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const isUpcoming = (e: Edition, today = new Date()) => {
  if (!e.end) return !!e.announced;
  const end = new Date(e.end + "T23:59:59+05:30");
  return end.getTime() >= today.getTime();
};

export const ui = {
  hi: {
    siteName: "किताब उत्सव",
    siteNameFull: "राजकमल किताब उत्सव",
    tagline: "पाठ · बातचीत · चर्चा · लोकार्पण · पुस्तक प्रदर्शनी",
    by: "राजकमल प्रकाशन समूह",
    nav: { home: "मुखपृष्ठ", editions: "संस्करण", programme: "आयोजन", about: "किताब उत्सव के बारे में", partners: "साथी", visit: "पहुँचें", faq: "सवाल-जवाब", shop: "किताबें ख़रीदें" },
    bookSeat: "मेरी सीट बुक करें",
    upcomingEvents: "आगामी आयोजन",
    authorMeets: "लेखक से मिलिए",
    searchBy: "खोजें",
    searchWords: ["किताबें", "लेखक", "प्रकाशन"],
    searchLabel: "राजकमल पर किताबें खोजें",
    voice: "बोलकर खोजें",
    cancelSearch: "खोज बंद करें",
    openMenu: "मेन्यू खोलें",
    langSwitch: "English",
    langShort: "EN",
    themeLight: "लाइट थीम",
    themeDark: "डार्क थीम",
    addToCal: "कैलेंडर में जोड़ें",
    directions: "रास्ता देखें",
    seeProgramme: "कार्यक्रम देखें",
    allEditions: "सभी संस्करण",
    exploreDetails: "विस्तार से देखें",
    detailsSoon: "जल्द जानकारी",
    upcoming: "आगामी",
    past: "पिछला संस्करण",
    nextEdition: "अगला किताब उत्सव",
    dates: "तारीख़",
    time: "समय",
    venue: "स्थान",
    organiser: "आयोजक",
    daily: "रोज़",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    happeningNow: "उत्सव जारी है",
    readMore: "और पढ़ें",
    breadcrumbHome: "किताब उत्सव",
    otherEditions: "दूसरे संस्करण",
    highlights: "झलकियाँ",
    inNumbers: "आँकड़ों में",
    followUs: "किताब उत्सव से जुड़े रहें",
    scrollTop: "ऊपर जाएँ",
    showMore: "और देखें",
    newsletterTitle: "उत्सव की ख़बरें पाएँ",
    newsletterText: "अगले किताब उत्सव, नई किताबों और ऑफ़र्स की जानकारी",
    newsletterPlaceholder: "अपना ईमेल लिखें",
    newsletterBtn: "जुड़ें",
    newsletterThanks: "धन्यवाद! हम आपको ख़बर देंगे।",
    copyright: "किताब उत्सव, राजकमल प्रकाशन की एक पहल। © 2026",
    designedBy: "Designed by",
    skip: "मुख्य सामग्री पर जाएँ",
  },
  en: {
    siteName: "Kitab Utsav",
    siteNameFull: "Rajkamal Kitab Utsav",
    tagline: "Readings · Conversations · Discussions · Book launches · Book exhibition",
    by: "Rajkamal Prakashan Samuh",
    nav: { home: "Home", editions: "Editions", programme: "Events", about: "About Kitab Utsav", partners: "Partners", visit: "Visit", faq: "FAQ", shop: "Shop books" },
    bookSeat: "Book my seat",
    upcomingEvents: "Upcoming events",
    authorMeets: "Author meets",
    searchBy: "Search by",
    searchWords: ["Books", "Authors", "Publishers"],
    searchLabel: "Search books on Rajkamal",
    voice: "Voice search",
    cancelSearch: "Cancel search",
    openMenu: "Open menu",
    langSwitch: "हिन्दी",
    langShort: "हि",
    themeLight: "Light theme",
    themeDark: "Dark theme",
    addToCal: "Add to calendar",
    directions: "Get directions",
    seeProgramme: "See the programme",
    allEditions: "All editions",
    exploreDetails: "Explore details",
    detailsSoon: "Details soon",
    upcoming: "Upcoming",
    past: "Past edition",
    nextEdition: "Next Kitab Utsav",
    dates: "Dates",
    time: "Time",
    venue: "Venue",
    organiser: "Organiser",
    daily: "Daily",
    days: "days",
    hours: "hours",
    minutes: "min",
    seconds: "sec",
    happeningNow: "Happening now",
    readMore: "Read more",
    breadcrumbHome: "Kitab Utsav",
    otherEditions: "Other editions",
    highlights: "Highlights",
    inNumbers: "In numbers",
    followUs: "Follow Kitab Utsav",
    scrollTop: "Scroll to top",
    showMore: "Show more",
    newsletterTitle: "Get festival news",
    newsletterText: "Hear first about the next Kitab Utsav, new books and offers",
    newsletterPlaceholder: "Enter your email",
    newsletterBtn: "Subscribe",
    newsletterThanks: "Thank you! We will keep you posted.",
    copyright: "Kitab Utsav, an initiative by Rajkamal Prakashan. © 2026",
    designedBy: "Designed by",
    skip: "Skip to main content",
  },
} as const;

export type UI = (typeof ui)[Lang];
export const t = (lang: Lang) => ui[lang];
