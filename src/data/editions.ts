/**
 * Kitab Utsav editions.
 *
 * Every fact here was gathered from public sources (Rajkamal Prakashan's own event pages and
 * social posts, plus press coverage) in October 2026. Where a fact was not confirmed it is left
 * empty rather than guessed: fill it in before launch.
 *
 * Dates are ISO (YYYY-MM-DD). `startTime` / `endTime` are 24h IST and only set when published.
 */

export type L10n = { hi: string; en: string };

export interface Edition {
  slug: string;
  city: L10n;
  state: L10n;
  year: number;
  /** ISO start date. Leave null when only the month is known. */
  start: string | null;
  end: string | null;
  /** Human label used when exact dates are not known. */
  monthLabel?: L10n;
  /** YYYY-MM when only the month is known; used for ordering. */
  month?: string;
  /** Announced but without final dates: counts as upcoming until `end` is set. */
  announced?: boolean;
  startTime?: string;
  endTime?: string;
  venue?: L10n;
  address?: {
    street?: string;
    locality: string;
    region: string;
    postalCode?: string;
  };
  mapQuery?: string;
  /** Short line used on cards and in meta descriptions. */
  summary: L10n;
  /** Longer copy for the edition page, one string per paragraph. */
  body: { hi: string[]; en: string[] };
  /** Verified numbers only. */
  stats?: { value: string; label: L10n }[];
  /** Verified names / moments only. */
  highlights?: { hi: string[]; en: string[] };
  /** Fallback for the home hero when no edition is upcoming. Upcoming editions take over automatically. */
  featured?: boolean;
}

export const editions: Edition[] = [
  {
    slug: "mumbai-2027",
    announced: true,
    city: { hi: "मुम्बई", en: "Mumbai" },
    state: { hi: "महाराष्ट्र", en: "Maharashtra" },
    year: 2027,
    start: null,
    end: null,
    month: "2027-02",
    monthLabel: { hi: "फ़रवरी 2027", en: "February 2027" },
    summary: {
      hi: "किताब उत्सव फ़रवरी 2027 में मुम्बई लौट रहा है। तारीख़ों, स्थान और वक्ताओं की घोषणा जल्द होगी।",
      en: "Kitab Utsav returns to Mumbai in February 2027. Dates, venue and speakers will be announced soon.",
    },
    body: {
      hi: [
        "अगला किताब उत्सव मुम्बई में होगा, फ़रवरी 2027 में। फ़रवरी 2026 के संस्करण के बाद यह मुम्बई में उत्सव की वापसी है।",
        "तारीख़ों, स्थान, वक्ताओं और दिन-वार कार्यक्रम की घोषणा जल्द होगी। सबसे पहले जानने के लिए Instagram पर @kitab.utsav से जुड़ें।",
      ],
      en: [
        "The next Kitab Utsav is in Mumbai, in February 2027. It marks the festival's return to the city after the February 2026 edition.",
        "Dates, venue, speakers and the day-wise programme will be announced soon. Follow @kitab.utsav on Instagram to hear first.",
      ],
    },
  },
  {
    slug: "bareilly-2026",
    featured: true,
    city: { hi: "बरेली", en: "Bareilly" },
    state: { hi: "उत्तर प्रदेश", en: "Uttar Pradesh" },
    year: 2026,
    start: "2026-10-23",
    end: "2026-10-27",
    startTime: "11:00",
    endTime: "20:00",
    venue: {
      hi: "विंडरमेयर थियेटर, बलवंत सिंह मार्ग, सिविल लाइन्स, अक्षर विहार के सामने, बरेली",
      en: "Windermere Theatre, Balwant Singh Marg, Civil Lines, opposite Akshar Vihar, Bareilly",
    },
    address: {
      street: "Windermere Theatre, Balwant Singh Marg, Civil Lines",
      locality: "Bareilly",
      region: "Uttar Pradesh",
    },
    mapQuery: "Windermere Theatre, Balwant Singh Marg, Civil Lines, Bareilly",
    summary: {
      hi: "किताब उत्सव बरेली लौटा। 23 से 27 अक्टूबर 2026, विंडरमेयर थियेटर, सिविल लाइन्स में पाँच दिन पाठ, बातचीत, चर्चा, लोकार्पण और पुस्तक प्रदर्शनी।",
      en: "Kitab Utsav returned to Bareilly for five days of readings, conversations, book launches and a book exhibition at Windermere Theatre, Civil Lines, 23 to 27 October 2026.",
    },
    body: {
      hi: [
        "राजकमल प्रकाशन समूह ने 23 से 27 अक्टूबर 2026 तक बरेली में पाँच दिवसीय किताब उत्सव आयोजित किया। आयोजन स्थल था विंडरमेयर थियेटर, बलवंत सिंह मार्ग, सिविल लाइन्स। उत्सव रोज़ सुबह 11 बजे से रात 8 बजे तक चला।",
        "पाँचों दिन लेखकों और पाठकों के बीच सीधा संवाद हुआ: किताबों पर बातचीत, रचना-पाठ, चर्चाएँ और नई किताबों के लोकार्पण। साथ में राजकमल, राधाकृष्ण, लोकभारती और राजकमल उर्दू की नई-पुरानी किताबों की प्रदर्शनी लगी।",
        "बरेली में यह किताब उत्सव की वापसी है। पिछले संस्करण के दौरान एक सुबह वीरेन डंगवाल के स्मारक पर उनकी कविताओं का पाठ हुआ था। वक्ताओं में गीताश्री, सुजाता और कवि अदनान कफ़ील दरवेश शामिल थे; बाक़ी नाम और सत्रों का ब्योरा जल्द जोड़ा जाएगा।",
      ],
      en: [
        "Rajkamal Prakashan Samuh held a five-day Kitab Utsav in Bareilly from 23 to 27 October 2026 at Windermere Theatre, Balwant Singh Marg, Civil Lines. The festival ran every day from 11 am to 8 pm.",
        "Each day brought readers and writers face to face: conversations about books, readings, panel discussions and launches of new titles, alongside an exhibition of new and classic books from Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu.",
        "This edition marks Kitab Utsav's return to Bareilly. During the previous edition, one morning was spent reading Viren Dangwal's poems at his memorial. Speakers included Geetashree, Sujata and poet Adnan Kafeel Darvesh; more names and session details will be added soon.",
      ],
    },
  },
  {
    slug: "indore-2026",
    city: { hi: "इन्दौर", en: "Indore" },
    state: { hi: "मध्य प्रदेश", en: "Madhya Pradesh" },
    year: 2026,
    start: "2026-09-04",
    end: "2026-09-08",
    venue: {
      hi: "प्रीतमलाल दुआ सभागृह, अहिल्या पुस्तकालय परिसर, रीगल चौराहा, इन्दौर",
      en: "Pritamlal Dua Sabhagrih, Ahilya Library campus, Regal Square, Indore",
    },
    address: {
      street: "Pritamlal Dua Sabhagrih, Ahilya Library campus, Regal Square",
      locality: "Indore",
      region: "Madhya Pradesh",
    },
    mapQuery: "Pritamlal Dua Sabhagrih, Indore",
    summary: {
      hi: "4 से 8 सितम्बर 2026, प्रीतमलाल दुआ सभागृह, अहिल्या पुस्तकालय परिसर, रीगल चौराहा, इन्दौर।",
      en: "4 to 8 September 2026 at Pritamlal Dua Sabhagrih, Ahilya Library campus, Regal Square, Indore.",
    },
    body: {
      hi: [
        "सितम्बर 2026 में किताब उत्सव इन्दौर पहुँचा। 4 से 8 सितम्बर तक अहिल्या पुस्तकालय परिसर के प्रीतमलाल दुआ सभागृह में पाठ, बातचीत, चर्चा, लोकार्पण और पुस्तक प्रदर्शनी हुई।",
        "उत्सव के दौरान कई नई किताबें लोकार्पित हुईं। एकता कश्मीरे और साथियों ने संजा की प्रस्तुति दी, और 'दौरा दौरा इन्दौर' सत्र में फ़ोटोग्राफ़र तनवीर फ़ारूक़ी ने शहर की विरासत और स्मृतियों पर बातचीत की।",
      ],
      en: [
        "In September 2026 Kitab Utsav came to Indore. From 4 to 8 September, the Pritamlal Dua Sabhagrih on the Ahilya Library campus hosted readings, conversations, discussions, book launches and a book exhibition.",
        "Several new books were launched during the festival. Ekta Kashmire and fellow artists performed Sanjha, and the 'Daura Daura Indore' session saw photographer Tanveer Farooqui in conversation about the city's heritage and memories.",
      ],
    },
  },
  {
    slug: "patna-2026",
    city: { hi: "पटना", en: "Patna" },
    state: { hi: "बिहार", en: "Bihar" },
    year: 2026,
    start: "2026-04-03",
    end: "2026-04-07",
    venue: { hi: "भारतीय नृत्य कला मंदिर, पटना", en: "Bharatiya Nritya Kala Mandir, Patna" },
    address: { street: "Bharatiya Nritya Kala Mandir", locality: "Patna", region: "Bihar" },
    mapQuery: "Bharatiya Nritya Kala Mandir, Patna",
    summary: {
      hi: "3 से 7 अप्रैल 2026, भारतीय नृत्य कला मंदिर, पटना।",
      en: "3 to 7 April 2026 at Bharatiya Nritya Kala Mandir, Patna.",
    },
    body: {
      hi: [
        "अप्रैल 2026 में किताब उत्सव पटना लौटा। 3 से 7 अप्रैल तक भारतीय नृत्य कला मंदिर में लेखकों और पाठकों की महफ़िल जमी।",
        "पटना किताब उत्सव का पुराना और प्रिय पड़ाव है। 2022 में यहीं नौ दिनों का उत्सव हुआ था।",
      ],
      en: [
        "In April 2026 Kitab Utsav returned to Patna. From 3 to 7 April, Bharatiya Nritya Kala Mandir brought writers and readers together.",
        "Patna is one of the festival's oldest stops: a nine-day edition was held here in 2022.",
      ],
    },
  },
  {
    slug: "mumbai-2026",
    city: { hi: "मुम्बई", en: "Mumbai" },
    state: { hi: "महाराष्ट्र", en: "Maharashtra" },
    year: 2026,
    start: "2026-02-06",
    end: "2026-02-10",
    startTime: "11:00",
    endTime: "22:00",
    venue: {
      hi: "पु.ल. देशपांडे सभागार, महाराष्ट्र कला अकादमी, रवीन्द्र नाट्य मंदिर, मुम्बई",
      en: "P.L. Deshpande Auditorium, Maharashtra Kala Academy, Ravindra Natya Mandir, Mumbai",
    },
    address: { street: "Ravindra Natya Mandir", locality: "Mumbai", region: "Maharashtra" },
    mapQuery: "Ravindra Natya Mandir, Mumbai",
    summary: {
      hi: "6 से 10 फ़रवरी 2026, पु.ल. देशपांडे सभागार, रवीन्द्र नाट्य मंदिर, मुम्बई।",
      en: "6 to 10 February 2026 at P.L. Deshpande Auditorium, Ravindra Natya Mandir, Mumbai.",
    },
    body: {
      hi: [
        "फ़रवरी 2026 में किताब उत्सव मुम्बई पहुँचा। 6 से 10 फ़रवरी तक रवीन्द्र नाट्य मंदिर के पु.ल. देशपांडे सभागार में सुबह 11 बजे से रात 10 बजे तक कार्यक्रम चले।",
        "उत्सव में दास्तानगो हिमांशु बाजपेयी की प्रस्तुति हुई और अभिनेता रजत कपूर भी उत्सव में पहुँचे।",
      ],
      en: [
        "In February 2026 Kitab Utsav travelled to Mumbai. From 6 to 10 February, the P.L. Deshpande Auditorium at Ravindra Natya Mandir hosted sessions from 11 am to 10 pm.",
        "The programme featured dastango Himanshu Bajpai, and actor Rajat Kapoor visited the festival.",
      ],
    },
  },
  {
    slug: "bhopal-2025",
    city: { hi: "भोपाल", en: "Bhopal" },
    state: { hi: "मध्य प्रदेश", en: "Madhya Pradesh" },
    year: 2025,
    start: "2025-09-06",
    end: "2025-09-10",
    venue: { hi: "हिन्दी भवन, भोपाल", en: "Hindi Bhawan, Bhopal" },
    address: { street: "Hindi Bhawan", locality: "Bhopal", region: "Madhya Pradesh" },
    mapQuery: "Hindi Bhawan, Bhopal",
    summary: {
      hi: "6 से 10 सितम्बर 2025, हिन्दी भवन, भोपाल। 32 सत्र, 100 से अधिक लेखक और रंगकर्मी, 5000 से अधिक किताबें।",
      en: "6 to 10 September 2025 at Hindi Bhawan, Bhopal. 32 sessions, 100+ writers and theatre artists, 5,000+ books.",
    },
    body: {
      hi: [
        "भोपाल वह शहर है जहाँ से किताब उत्सव की शुरुआत हुई, राजकमल प्रकाशन के स्थापना के 75वें वर्ष में। सितम्बर 2025 का आयोजन भोपाल में तीसरा किताब उत्सव था।",
        "6 से 10 सितम्बर तक हिन्दी भवन में पाँच दिनों में 32 सत्र हुए, जिनमें भोपाल और देश भर से 100 से अधिक लेखक और रंगकर्मी शामिल हुए। प्रदर्शनी में 5000 से अधिक किताबें थीं। उत्सव का समापन काव्य संध्या से हुआ।",
      ],
      en: [
        "Bhopal is where Kitab Utsav began, in the 75th year of Rajkamal Prakashan. The September 2025 edition was the third Kitab Utsav held in the city.",
        "Over five days at Hindi Bhawan, from 6 to 10 September, the festival ran 32 sessions with more than 100 writers and theatre artists from Bhopal and across the country. The exhibition carried more than 5,000 books, and the festival closed with a poetry evening.",
      ],
    },
    stats: [
      { value: "5", label: { hi: "दिन", en: "days" } },
      { value: "32", label: { hi: "सत्र", en: "sessions" } },
      { value: "100+", label: { hi: "लेखक और रंगकर्मी", en: "writers and artists" } },
      { value: "5000+", label: { hi: "किताबें", en: "books on display" } },
    ],
    highlights: {
      hi: [
        "उद्घाटन सत्र में गोविन्द मिश्र, विजय बहादुर सिंह, महेश कटारे, अब्दुल बिस्मिल्लाह, शिवमूर्ति, राजेश जोशी, रेखा कस्तवार, कुमार अम्बुज, मनोज रूपड़ा और सविता भार्गव।",
        "नीलेश रघुवंशी की किताब 'गद्य का पानी' का लोकार्पण।",
        "समापन काव्य संध्या में कुमार अम्बुज, पवन करण, नीलेश रघुवंशी, वसंत सकरगाए समेत कई कवि।",
      ],
      en: [
        "Opening session with Govind Mishra, Vijay Bahadur Singh, Mahesh Katare, Abdul Bismillah, Shivmurti, Rajesh Joshi, Rekha Kastwar, Kumar Ambuj, Manoj Rupda and Savita Bhargava.",
        "Launch of Nilesh Raghuvanshi's 'Gadya ka Pani'.",
        "Closing poetry evening with Kumar Ambuj, Pavan Karan, Nilesh Raghuvanshi, Vasant Sakargaye and others.",
      ],
    },
  },
  {
    slug: "lucknow-2024",
    city: { hi: "लखनऊ", en: "Lucknow" },
    state: { hi: "उत्तर प्रदेश", en: "Uttar Pradesh" },
    year: 2024,
    start: null,
    end: null,
    monthLabel: { hi: "जनवरी 2024", en: "January 2024" },
    venue: { hi: "अंतरराष्ट्रीय बौद्ध शोध संस्थान, लखनऊ", en: "International Buddha Research Institute, Lucknow" },
    address: { street: "International Buddha Research Institute", locality: "Lucknow", region: "Uttar Pradesh" },
    mapQuery: "International Buddha Research Institute, Lucknow",
    summary: {
      hi: "जनवरी 2024, अंतरराष्ट्रीय बौद्ध शोध संस्थान, लखनऊ में पाँच दिवसीय उत्सव।",
      en: "A five-day festival in January 2024 at the International Buddha Research Institute, Lucknow.",
    },
    body: {
      hi: [
        "जनवरी 2024 में लखनऊ के अंतरराष्ट्रीय बौद्ध शोध संस्थान में पाँच दिवसीय किताब उत्सव हुआ, जिसमें हिन्दी के प्रसिद्ध लेखकों और सामाजिक-सांस्कृतिक सवालों पर चर्चाएँ हुईं।",
      ],
      en: [
        "In January 2024 a five-day Kitab Utsav was held at the International Buddha Research Institute in Lucknow, with discussions on celebrated Hindi writers and on social and cultural questions.",
      ],
    },
  },
  {
    slug: "chandigarh-2023",
    city: { hi: "चंडीगढ़", en: "Chandigarh" },
    state: { hi: "चंडीगढ़", en: "Chandigarh" },
    year: 2023,
    start: "2023-02-10",
    end: "2023-02-14",
    venue: { hi: "पंजाब कला भवन, सेक्टर 16, चंडीगढ़", en: "Punjab Kala Bhawan, Sector 16, Chandigarh" },
    address: { street: "Punjab Kala Bhawan, Sector 16", locality: "Chandigarh", region: "Chandigarh" },
    mapQuery: "Punjab Kala Bhawan, Sector 16, Chandigarh",
    summary: {
      hi: "10 से 14 फ़रवरी 2023, पंजाब कला भवन, सेक्टर 16, चंडीगढ़।",
      en: "10 to 14 February 2023 at Punjab Kala Bhawan, Sector 16, Chandigarh.",
    },
    body: {
      hi: [
        "10 से 14 फ़रवरी 2023 तक पंजाब कला भवन, सेक्टर 16 में किताब उत्सव हुआ। हिन्दी किताबों का यह उत्सव पंजाबी और हिन्दी पाठकों के साझा शहर में पहुँचा।",
      ],
      en: [
        "From 10 to 14 February 2023 Kitab Utsav was held at Punjab Kala Bhawan, Sector 16, bringing the festival of Hindi books to a city shared by Hindi and Punjabi readers.",
      ],
    },
  },
  {
    slug: "patna-2022",
    city: { hi: "पटना", en: "Patna" },
    state: { hi: "बिहार", en: "Bihar" },
    year: 2022,
    start: "2022-11-05",
    end: "2022-11-13",
    summary: {
      hi: "5 से 13 नवम्बर 2022, पटना में नौ दिनों का किताब उत्सव।",
      en: "A nine-day Kitab Utsav in Patna, 5 to 13 November 2022.",
    },
    body: {
      hi: [
        "भोपाल और बनारस के बाद किताब उत्सव 5 से 13 नवम्बर 2022 तक पटना में हुआ। नौ दिनों तक चले इस उत्सव को बिहार के लेखकों का महाजुटान कहा गया।",
      ],
      en: [
        "After Bhopal and Banaras, Kitab Utsav came to Patna from 5 to 13 November 2022. The nine-day festival was described in the press as a grand gathering of Bihar's writers.",
      ],
    },
  },
];

/** Build-time "today". Rebuild after each edition ends so this stays correct. */
const now = new Date();
const endsAt = (e: Edition) => (e.end ? new Date(`${e.end}T23:59:59+05:30`).getTime() : 0);
/** Sort key: exact start date, else the announced month, else the year. */
export const startKey = (e: Edition) => e.start ?? (e.month ? `${e.month}-01` : `${e.year}-01-01`);
/** True once exact dates are published (calendar file, countdown, Event schema). */
export const hasDates = (e: Edition) => !!(e.start && e.end);
/** Not over yet: dated and not ended, or announced without final dates. */
export const isAhead = (e: Edition) => (e.end ? endsAt(e) >= now.getTime() : !!e.announced);

/** Soonest edition that has not ended yet, or null when nothing is announced. */
export const nextEdition: Edition | null =
  editions.filter(isAhead).sort((a, b) => startKey(a).localeCompare(startKey(b)))[0] ?? null;

/** Most recent edition that has already ended. */
export const lastEdition: Edition =
  editions.filter((e) => e.start && endsAt(e) < now.getTime()).sort((a, b) => b.start!.localeCompare(a.start!))[0] ?? editions[0];

/** Drives the home hero, header calendar and Visit page: the next edition, else the latest one. */
export const featuredEdition: Edition = nextEdition ?? editions.find((e) => e.featured) ?? lastEdition;

/** Editions in date order, oldest first; used for previous/next links. */
const chronological = [...editions].filter((e) => e.start || e.month).sort((a, b) => startKey(a).localeCompare(startKey(b)));
export const neighbours = (slug: string) => {
  const i = chronological.findIndex((e) => e.slug === slug);
  return { prev: i > 0 ? chronological[i - 1] : null, next: i >= 0 && i < chronological.length - 1 ? chronological[i + 1] : null };
};

export const editionBySlug = (slug: string) => editions.find((e) => e.slug === slug);
