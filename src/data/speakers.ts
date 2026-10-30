/**
 * Speakers announced on @kitab.utsav for the Bareilly edition (October 2026).
 * Bios are condensed from the festival's own announcement posts. Add new names as they are
 * announced; `photo` is optional (put a square portrait in public/speakers/ and reference
 * "/speakers/x.jpg"). Without one the site draws a name tile, never a stand-in face.
 */
import type { L10n } from "./editions";

export interface Speaker {
  slug: string;
  name: L10n;
  role: L10n;
  bio: L10n;
  edition: string;
  photo?: string;
  appearances?: { city: L10n; year: string; edition?: string }[];
}

export const speakers: Speaker[] = [
  {
    slug: "geetashree",
    edition: "bareilly-2026",
    name: { hi: "गीताश्री", en: "Geetashree" },
    role: { hi: "पत्रकार और लेखक", en: "Journalist and writer" },
    bio: {
      hi: "सात कहानी-संग्रह, छह उपन्यास और स्त्री-विमर्श पर चार शोध-पुस्तकें। पत्रकारिता के लिए रामनाथ गोयनका सम्मान (2008-09) से सम्मानित; 1991 से 2017 तक सक्रिय पत्रकारिता, अब स्वतंत्र पत्रकारिता और लेखन।",
      en: "Author of seven story collections, six novels and four research books on women's writing. Winner of the Ramnath Goenka Award for journalism (2008-09); a working journalist from 1991 to 2017, now an independent journalist and writer.",
    },
    appearances: [{ city: { hi: "बरेली", en: "Bareilly" }, year: "2026", edition: "bareilly-2026" }],
  },
  {
    slug: "sujata",
    edition: "bareilly-2026",
    name: { hi: "सुजाता", en: "Sujata" },
    role: { hi: "कवि, उपन्यासकार और आलोचक", en: "Poet, novelist and critic" },
    bio: {
      hi: "हिन्दी के पहले सामुदायिक स्त्रीवादी ब्लॉग 'चोखेर बाली' की शुरुआत की। 'अनन्तिम मौन के बीच', 'स्त्री-निर्मिति', 'एक बटा दो', 'दरयागंज वाया बाज़ार फ़त्ते ख़ां' और 'आलोचना का स्त्रीपक्ष' की लेखक; दिल्ली विश्वविद्यालय में अध्यापन।",
      en: "Founder of 'Chokher Bali', the first community feminist blog in Hindi. Author of 'Anantim Maun ke Beech', 'Stree-Nirmiti', 'Ek Bata Do', 'Daryaganj Via Bazaar Fatte Khan' and 'Alochana ka Streepaksh'; teaches at Delhi University.",
    },
    appearances: [{ city: { hi: "बरेली", en: "Bareilly" }, year: "2026", edition: "bareilly-2026" }],
  },
  {
    slug: "adnan-kafeel-darvesh",
    edition: "bareilly-2026",
    name: { hi: "अदनान कफ़ील दरवेश", en: "Adnan Kafeel Darvesh" },
    role: { hi: "कवि", en: "Poet" },
    bio: {
      hi: "भारतभूषण अग्रवाल पुरस्कार (2018) से सम्मानित। कविता-संग्रह 'लानत का प्याला', 'ठिठुरते लैम्प पोस्ट' और 'नीली बयाज़'; कविताओं के अनुवाद कई भारतीय भाषाओं, अंग्रेज़ी और स्पेनिश में।",
      en: "Winner of the Bharatbhushan Agrawal Award (2018). Poetry collections 'Laanat ka Pyala', 'Thithurte Lamp Post' and 'Neeli Bayaaz', translated into several Indian languages, English and Spanish.",
    },
    appearances: [{ city: { hi: "बरेली", en: "Bareilly" }, year: "2026", edition: "bareilly-2026" }],
  },
  {
    slug: "govind-mishra",
    edition: "bhopal-2025",
    name: { hi: "गोविन्द मिश्र", en: "Govind Mishra" },
    role: { hi: "उपन्यासकार और कथाकार", en: "Novelist and story writer" },
    bio: { hi: "हिन्दी के वरिष्ठ रचनाकार और सरस्वती सम्मान से सम्मानित साहित्यकार।", en: "Senior Hindi writer and recipient of the Saraswati Samman." },
    appearances: [
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2022" },
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" },
    ],
  },
  {
    slug: "rajesh-joshi",
    edition: "bhopal-2025",
    name: { hi: "राजेश जोशी", en: "Rajesh Joshi" },
    role: { hi: "कवि, कथाकार और नाटककार", en: "Poet, writer and playwright" },
    bio: { hi: "समकालीन हिन्दी कविता के प्रमुख स्वर और साहित्य अकादेमी पुरस्कार से सम्मानित कवि।", en: "A major voice in contemporary Hindi poetry and a Sahitya Akademi Award recipient." },
    appearances: [
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2022" },
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" },
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" },
    ],
  },
  {
    slug: "shivmurti",
    edition: "bhopal-2025",
    name: { hi: "शिवमूर्ति", en: "Shivmurti" },
    role: { hi: "कथाकार और उपन्यासकार", en: "Story writer and novelist" },
    bio: { hi: "ग्रामीण समाज और बदलते जीवन-संसार के विशिष्ट हिन्दी कथाकार।", en: "A distinguished Hindi writer known for stories rooted in rural society and social change." },
    appearances: [
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" },
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" },
    ],
  },
  {
    slug: "kumar-ambuj",
    edition: "bhopal-2025",
    name: { hi: "कुमार अम्बुज", en: "Kumar Ambuj" },
    role: { hi: "कवि और आलोचक", en: "Poet and critic" },
    bio: { hi: "समकालीन हिन्दी कविता के महत्त्वपूर्ण कवि, निबन्धकार और आलोचक।", en: "An important contemporary Hindi poet, essayist and critic." },
    appearances: [{ city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" }],
  },
  {
    slug: "naresh-saxena",
    edition: "mumbai-2026",
    name: { hi: "नरेश सक्सेना", en: "Naresh Saxena" },
    role: { hi: "कवि", en: "Poet" },
    bio: { hi: "अपनी संक्षिप्त, संगीतधर्मी और गहन मानवीय कविताओं के लिए विख्यात वरिष्ठ कवि।", en: "Senior poet celebrated for concise, musical and deeply humane poetry." },
    appearances: [{ city: { hi: "मुम्बई", en: "Mumbai" }, year: "2026", edition: "mumbai-2026" }],
  },
  {
    slug: "geet-chaturvedi",
    edition: "bhopal-2025",
    name: { hi: "गीत चतुर्वेदी", en: "Geet Chaturvedi" },
    role: { hi: "कवि और कथाकार", en: "Poet and fiction writer" },
    bio: { hi: "कविता, कहानी और अनुवाद में सक्रिय समकालीन हिन्दी लेखक।", en: "Contemporary Hindi writer working across poetry, fiction and translation." },
    appearances: [{ city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" }],
  },
  {
    slug: "savita-bhargava",
    edition: "bhopal-2025",
    name: { hi: "सविता भार्गव", en: "Savita Bhargava" },
    role: { hi: "कवि", en: "Poet" },
    bio: { hi: "समकालीन हिन्दी कविता की सशक्त आवाज़ और सक्रिय साहित्यिक संवादक।", en: "A strong contemporary Hindi poetic voice and active literary interlocutor." },
    appearances: [
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" },
      { city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" },
    ],
  },
  {
    slug: "udayan-vajpeyi",
    edition: "bhopal-2025",
    name: { hi: "उदयन वाजपेयी", en: "Udayan Vajpeyi" },
    role: { hi: "कवि, कथाकार और अनुवादक", en: "Poet, writer and translator" },
    bio: { hi: "कविता, कथा, निबन्ध और अनुवाद के बीच सक्रिय बहुविध रचनाकार।", en: "A multidisciplinary writer across poetry, fiction, essays and translation." },
    appearances: [{ city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" }],
  },
  {
    slug: "nilesh-raghuvanshi",
    edition: "bhopal-2025",
    name: { hi: "नीलेश रघुवंशी", en: "Nilesh Raghuvanshi" },
    role: { hi: "कवि और कथाकार", en: "Poet and fiction writer" },
    bio: { hi: "समकालीन हिन्दी कविता और कथा की प्रमुख रचनाकार।", en: "A leading contemporary Hindi poet and fiction writer." },
    appearances: [{ city: { hi: "भोपाल", en: "Bhopal" }, year: "2023" }],
  },
  {
    slug: "abdul-bismillah",
    edition: "bhopal-2025",
    name: { hi: "अब्दुल बिस्मिल्लाह", en: "Abdul Bismillah" },
    role: { hi: "उपन्यासकार और कथाकार", en: "Novelist and story writer" },
    bio: { hi: "हाशिये के जीवन और सामाजिक यथार्थ के महत्त्वपूर्ण हिन्दी कथाकार।", en: "An important Hindi writer of marginal lives and social realities." },
    appearances: [{ city: { hi: "भोपाल", en: "Bhopal" }, year: "2025", edition: "bhopal-2025" }],
  },
];

/** Everyone documented at an edition, whether it is their main listing or a recorded appearance. */
export const speakersFor = (edition: string) =>
  speakers.filter((s) => s.edition === edition || s.appearances?.some((a) => a.edition === edition));

/**
 * Every speaker documented so far, across all editions. This is the festival's working
 * archive, not a claim of completeness: Kitab Utsav has run 16 editions since 2021, but this
 * file only holds the names captured from @kitab.utsav's own posts. Add more as they are
 * sourced, with a real `photo` in public/speakers/ where one exists.
 */
export const allSpeakers = speakers;


/** Official running totals from the @kitab.utsav profile (October 2026). */
export const festivalTotals = [
  { value: "5", label: { hi: "वर्ष", en: "years" } },
  { value: "7", label: { hi: "राज्य", en: "states" } },
  { value: "11", label: { hi: "शहर", en: "cities" } },
  { value: "16", label: { hi: "आयोजन", en: "editions" } },
];

export const tagline = { hi: "साथ जुड़ें, साथ पढ़ें", en: "Come together, read together" };
export const hashtag = "#साथजुड़ेंसाथपढ़ें";
