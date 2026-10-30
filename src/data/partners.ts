/**
 * Supporting partners and sponsors, from the festival's own partner logo folder (October 2026).
 * Logos live in public/partners/ (trimmed, max 640px, WebP). The folder gave name, type and city
 * only; which edition each partner backed was not listed, so partners are tied to a city, not to
 * an edition. Add `url` when you have the partner's official site.
 */
import type { L10n } from "./editions";

export type PartnerGroup = "government" | "venue" | "media" | "books" | "community" | "education" | "business";

export interface Partner {
  slug: string;
  name: L10n;
  /** Short descriptor shown under the name. */
  kind: L10n;
  city: L10n;
  group: PartnerGroup;
  logo: string;
  url?: string;
}

const c = {
  bareilly: { hi: "बरेली", en: "Bareilly" },
  bhopal: { hi: "भोपाल", en: "Bhopal" },
  bhopalJaipur: { hi: "भोपाल और जयपुर", en: "Bhopal & Jaipur" },
  chandigarh: { hi: "चंडीगढ़", en: "Chandigarh" },
  delhi: { hi: "नई दिल्ली", en: "New Delhi" },
  indore: { hi: "इन्दौर", en: "Indore" },
  jaipur: { hi: "जयपुर", en: "Jaipur" },
  jalandhar: { hi: "जालंधर", en: "Jalandhar" },
  mumbai: { hi: "मुम्बई", en: "Mumbai" },
  patna: { hi: "पटना", en: "Patna" },
  ranchi: { hi: "राँची", en: "Ranchi" },
};

export const partners: Partner[] = [
  { slug: "bihar-art-culture-youth", group: "government", city: c.patna, name: { hi: "कला, संस्कृति एवं युवा विभाग, बिहार सरकार", en: "Art, Culture & Youth Department, Govt. of Bihar" }, kind: { hi: "राज्य सरकार", en: "State government" }, logo: "/partners/bihar-art-culture-youth.webp" },
  { slug: "hindi-bhawan", group: "government", city: c.bhopal, name: { hi: "हिन्दी भवन", en: "Hindi Bhawan" }, kind: { hi: "साहित्यिक संस्थान", en: "Literary institution" }, logo: "/partners/hindi-bhawan.webp" },
  { slug: "jawahar-kala-kendra", group: "government", city: c.jaipur, name: { hi: "जवाहर कला केन्द्र", en: "Jawahar Kala Kendra" }, kind: { hi: "कला केन्द्र", en: "Arts centre" }, logo: "/partners/jawahar-kala-kendra.webp" },
  { slug: "maharashtra-kala-academy", group: "government", city: c.mumbai, name: { hi: "पु.ल. देशपांडे महाराष्ट्र कला अकादमी", en: "P.L. Deshpande Maharashtra Kala Academy" }, kind: { hi: "कला अकादमी", en: "Arts academy" }, logo: "/partners/maharashtra-kala-academy.webp" },
  { slug: "panjab-kala-parishad", group: "government", city: c.chandigarh, name: { hi: "पंजाब कला परिषद", en: "Panjab Kala Parishad" }, kind: { hi: "कला परिषद", en: "Arts council" }, logo: "/partners/panjab-kala-parishad.webp" },
  { slug: "trwi-ranchi", group: "government", city: c.ranchi, name: { hi: "डॉ. रामदयाल मुंडा जनजातीय कल्याण शोध संस्थान", en: "Dr. Ram Dayal Munda Tribal Welfare Research Institute" }, kind: { hi: "शोध संस्थान", en: "Research institute" }, logo: "/partners/trwi-ranchi.webp" },
  { slug: "windermere-theatre", group: "venue", city: c.bareilly, name: { hi: "विंडरमेयर थियेटर", en: "Windermere Theatre" }, kind: { hi: "रंगमंच", en: "Theatre" }, logo: "/partners/windermere-theatre.webp" },
  { slug: "my-fm", group: "media", city: c.bhopalJaipur, name: { hi: "94.3 माय एफ़एम", en: "94.3 MY FM" }, kind: { hi: "रेडियो", en: "Radio" }, logo: "/partners/my-fm.webp" },
  { slug: "samvad-news", group: "media", city: c.bareilly, name: { hi: "संवाद न्यूज़", en: "Samvad News" }, kind: { hi: "समाचार एजेंसी", en: "News agency" }, logo: "/partners/samvad-news.webp" },
  { slug: "speaking-tiger", group: "books", city: c.delhi, name: { hi: "स्पीकिंग टाइगर", en: "Speaking Tiger" }, kind: { hi: "प्रकाशन गृह", en: "Publishing house" }, logo: "/partners/speaking-tiger.webp" },
  { slug: "readers-paradise", group: "books", city: c.indore, name: { hi: "रीडर्स पैराडाइज़", en: "Readers Paradise" }, kind: { hi: "किताबों की दुकान", en: "Bookstore" }, logo: "/partners/readers-paradise.webp" },
  { slug: "adab-foundation", group: "community", city: c.chandigarh, name: { hi: "अदब फ़ाउंडेशन", en: "Adab Foundation" }, kind: { hi: "चंडीगढ़ लिटरेचर फ़ेस्टिवल", en: "Chandigarh Literature Festival" }, logo: "/partners/adab-foundation.webp" },
  { slug: "patal", group: "community", city: c.patna, name: { hi: "पटल", en: "Patal" }, kind: { hi: "साहित्यिक समुदाय", en: "Literary community" }, logo: "/partners/patal.webp" },
  { slug: "marm", group: "community", city: c.indore, name: { hi: "मर्म कला अनुष्ठान", en: "Marm" }, kind: { hi: "कला स्टूडियो", en: "Art studio" }, logo: "/partners/marm.webp" },
  { slug: "rupankan", group: "community", city: c.indore, name: { hi: "रूपांकन", en: "Rupankan" }, kind: { hi: "कला स्टूडियो", en: "Art studio" }, logo: "/partners/rupankan.webp" },
  { slug: "lpu", group: "education", city: c.jalandhar, name: { hi: "लवली प्रोफ़ेशनल यूनिवर्सिटी", en: "Lovely Professional University" }, kind: { hi: "विश्वविद्यालय", en: "University" }, logo: "/partners/lpu.webp" },
  { slug: "takshila", group: "education", city: c.patna, name: { hi: "तक्षशिला एजुकेशनल सोसाइटी", en: "Takshila Educational Society" }, kind: { hi: "शिक्षण संस्था", en: "Educational society" }, logo: "/partners/takshila.webp" },
  { slug: "lotus-electronics", group: "business", city: c.indore, name: { hi: "लोटस इलेक्ट्रॉनिक्स", en: "Lotus Electronics" }, kind: { hi: "इलेक्ट्रॉनिक्स सुपरमार्केट", en: "Electronics supermarket" }, logo: "/partners/lotus-electronics.webp" },
];

export const groupLabel: Record<PartnerGroup, L10n> = {
  government: { hi: "सरकार और सांस्कृतिक संस्थान", en: "Government and cultural institutions" },
  venue: { hi: "आयोजन स्थल", en: "Venue" },
  media: { hi: "मीडिया", en: "Media" },
  books: { hi: "प्रकाशन और किताबें", en: "Publishing and books" },
  community: { hi: "साहित्य और कला समुदाय", en: "Literary and arts communities" },
  education: { hi: "शिक्षा", en: "Education" },
  business: { hi: "व्यवसाय", en: "Business" },
};

export const groupOrder: PartnerGroup[] = ["government", "venue", "media", "books", "community", "education", "business"];

/** Partners based in an edition's city (city match only; see note at the top). */
export const partnersInCity = (cityEn: string) => partners.filter((p) => p.city.en.split(" & ").includes(cityEn));
