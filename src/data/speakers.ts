/**
 * Writers, poets, artists and speakers who have appeared at Kitab Utsav.
 *
 * The first block has bios condensed from the festival's own announcement posts. The roster
 * below it comes from the festival team's list of everyone who has attended (October 2026):
 * name, role and the editions they joined. Add a `bio` only from a real source. `photo` is
 * optional (put a square portrait in public/speakers/ and reference "/speakers/x.jpg"); without
 * one the site draws a name tile, never a stand-in face.
 *
 * Appearances are written as "City Year, City Year". When an edition page exists for that
 * city and year it is linked automatically.
 */
import { editions, type L10n } from "./editions";

export interface Speaker {
  slug: string;
  name: L10n;
  role: L10n;
  bio?: L10n;
  /** Main edition for this listing. Derived from the latest linked appearance when omitted. */
  edition?: string;
  photo?: string;
  appearances?: { city: L10n; year: string; edition?: string }[];
}

const cityNames: Record<string, string> = {
  Bareilly: "बरेली",
  Bhopal: "भोपाल",
  Chandigarh: "चंडीगढ़",
  Indore: "इन्दौर",
  Jalandhar: "जालंधर",
  Lucknow: "लखनऊ",
  Mumbai: "मुम्बई",
  Patna: "पटना",
};

/** "Mumbai 2023, Patna 2026" → appearances, oldest first, linked to edition pages that exist. */
const at = (list: string): NonNullable<Speaker["appearances"]> =>
  list
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => {
      const [, city, year] = x.match(/^(.+?)\s+(\d{4})$/) ?? [];
      if (!city || !cityNames[city]) throw new Error(`speakers.ts: unknown appearance "${x}"`);
      const slug = `${city.toLowerCase()}-${year}`;
      return { city: { hi: cityNames[city], en: city }, year, ...(editions.some((e) => e.slug === slug) ? { edition: slug } : {}) };
    })
    .sort((a, b) => a.year.localeCompare(b.year));

const featured: Speaker[] = [
  {
    slug: "geetashree",
    edition: "bareilly-2026",
    name: { hi: "गीताश्री", en: "Geetashree" },
    role: { hi: "पत्रकार और लेखक", en: "Journalist and writer" },
    bio: {
      hi: "सात कहानी-संग्रह, छह उपन्यास और स्त्री-विमर्श पर चार शोध-पुस्तकें। पत्रकारिता के लिए रामनाथ गोयनका सम्मान (2008-09) से सम्मानित; 1991 से 2017 तक सक्रिय पत्रकारिता, अब स्वतंत्र पत्रकारिता और लेखन।",
      en: "Author of seven story collections, six novels and four research books on women's writing. Winner of the Ramnath Goenka Award for journalism (2008-09); a working journalist from 1991 to 2017, now an independent journalist and writer.",
    },
    appearances: at("Bareilly 2026"),
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
    appearances: at("Bareilly 2026"),
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
    appearances: at("Bareilly 2026"),
  },
  {
    slug: "govind-mishra",
    edition: "bhopal-2025",
    name: { hi: "गोविन्द मिश्र", en: "Govind Mishra" },
    role: { hi: "उपन्यासकार और कथाकार", en: "Novelist and story writer" },
    bio: { hi: "हिन्दी के वरिष्ठ रचनाकार और सरस्वती सम्मान से सम्मानित साहित्यकार।", en: "Senior Hindi writer and recipient of the Saraswati Samman." },
    appearances: at("Bhopal 2022, Bhopal 2025"),
  },
  {
    slug: "rajesh-joshi",
    edition: "bhopal-2025",
    name: { hi: "राजेश जोशी", en: "Rajesh Joshi" },
    role: { hi: "कवि, कथाकार और नाटककार", en: "Poet, writer and playwright" },
    bio: { hi: "समकालीन हिन्दी कविता के प्रमुख स्वर और साहित्य अकादेमी पुरस्कार से सम्मानित कवि।", en: "A major voice in contemporary Hindi poetry and a Sahitya Akademi Award recipient." },
    appearances: at("Bhopal 2022, Bhopal 2023, Bhopal 2025"),
  },
  {
    slug: "shivmurti",
    edition: "bhopal-2025",
    name: { hi: "शिवमूर्ति", en: "Shivmurti" },
    role: { hi: "कथाकार और उपन्यासकार", en: "Story writer and novelist" },
    bio: { hi: "ग्रामीण समाज और बदलते जीवन-संसार के विशिष्ट हिन्दी कथाकार।", en: "A distinguished Hindi writer known for stories rooted in rural society and social change." },
    appearances: at("Bhopal 2022, Bhopal 2025"),
  },
  {
    slug: "kumar-ambuj",
    edition: "bhopal-2025",
    name: { hi: "कुमार अम्बुज", en: "Kumar Ambuj" },
    role: { hi: "कवि और आलोचक", en: "Poet and critic" },
    bio: { hi: "समकालीन हिन्दी कविता के महत्त्वपूर्ण कवि, निबन्धकार और आलोचक।", en: "An important contemporary Hindi poet, essayist and critic." },
    appearances: at("Bhopal 2025"),
  },
  {
    slug: "naresh-saxena",
    edition: "mumbai-2026",
    name: { hi: "नरेश सक्सेना", en: "Naresh Saxena" },
    role: { hi: "कवि", en: "Poet" },
    bio: { hi: "अपनी संक्षिप्त, संगीतधर्मी और गहन मानवीय कविताओं के लिए विख्यात वरिष्ठ कवि।", en: "Senior poet celebrated for concise, musical and deeply humane poetry." },
    appearances: at("Mumbai 2026"),
  },
  {
    slug: "geet-chaturvedi",
    name: { hi: "गीत चतुर्वेदी", en: "Geet Chaturvedi" },
    role: { hi: "कवि और कथाकार", en: "Poet and fiction writer" },
    bio: { hi: "कविता, कहानी और अनुवाद में सक्रिय समकालीन हिन्दी लेखक।", en: "Contemporary Hindi writer working across poetry, fiction and translation." },
    appearances: at("Bhopal 2023"),
  },
  {
    slug: "savita-bhargava",
    edition: "bhopal-2025",
    name: { hi: "सविता भार्गव", en: "Savita Bhargava" },
    role: { hi: "कवि", en: "Poet" },
    bio: { hi: "समकालीन हिन्दी कविता की सशक्त आवाज़ और सक्रिय साहित्यिक संवादक।", en: "A strong contemporary Hindi poetic voice and active literary interlocutor." },
    appearances: at("Bhopal 2023, Bhopal 2025"),
  },
  {
    slug: "udayan-vajpeyi",
    edition: "bhopal-2025",
    name: { hi: "उदयन वाजपेयी", en: "Udayan Vajpeyi" },
    role: { hi: "कवि, निबन्धकार, कथाकार और अनुवादक", en: "Poet, essayist, short story writer and translator" },
    bio: { hi: "कविता, कथा, निबन्ध और अनुवाद के बीच सक्रिय बहुविध रचनाकार।", en: "A multidisciplinary writer across poetry, fiction, essays and translation." },
    appearances: at("Bhopal 2022, Bhopal 2025, Bareilly 2025"),
  },
  {
    slug: "nilesh-raghuvanshi",
    name: { hi: "नीलेश रघुवंशी", en: "Nilesh Raghuvanshi" },
    role: { hi: "कवि और कथाकार", en: "Poet and fiction writer" },
    bio: { hi: "समकालीन हिन्दी कविता और कथा की प्रमुख रचनाकार।", en: "A leading contemporary Hindi poet and fiction writer." },
    appearances: at("Bhopal 2023"),
  },
  {
    slug: "abdul-bismillah",
    edition: "bhopal-2025",
    name: { hi: "अब्दुल बिस्मिल्लाह", en: "Abdul Bismillah" },
    role: { hi: "उपन्यासकार और कथाकार", en: "Novelist and story writer" },
    bio: { hi: "हाशिये के जीवन और सामाजिक यथार्थ के महत्त्वपूर्ण हिन्दी कथाकार।", en: "An important Hindi writer of marginal lives and social realities." },
    appearances: at("Mumbai 2023, Bhopal 2025"),
  },
];

/** [slug, Hindi name, English name, Hindi role, English role, appearances] */
type Row = [string, string, string, string, string, string];

const roster: Row[] = [
  ["gulzar", "गुलज़ार", "Gulzar", "गीतकार, कवि, पटकथा लेखक और निर्देशक", "Lyricist, poet, screenwriter and director", "Mumbai 2023, Mumbai 2026"],
  ["javed-akhtar", "जावेद अख़्तर", "Javed Akhtar", "गीतकार, कवि और पटकथा लेखक", "Lyricist, poet and screenwriter", "Mumbai 2023, Mumbai 2026, Patna 2026"],
  ["anurag-kashyap", "अनुराग कश्यप", "Anurag Kashyap", "निर्देशक, निर्माता, पटकथा लेखक और अभिनेता", "Director, producer, screenwriter and actor", "Chandigarh 2023"],
  ["piyush-mishra", "पीयूष मिश्रा", "Piyush Mishra", "अभिनेता, गीतकार और गायक", "Actor, lyricist and singer", "Chandigarh 2023, Mumbai 2023, Bhopal 2023, Jalandhar 2024"],
  ["raghubir-yadav", "रघुबीर यादव", "Raghubir Yadav", "अभिनेता, संगीतकार, गायक और रंगकर्मी", "Actor, music composer, singer and theatre artist", "Mumbai 2026, Bareilly 2026"],
  ["seema-kapoor", "सीमा कपूर", "Seema Kapoor", "निर्देशक, लेखक और अभिनेत्री", "Director, writer and actor", "Mumbai 2023, Bhopal 2025, Mumbai 2026, Bareilly 2026"],
  ["surjeet-patar", "सुरजीत पातर", "Surjeet Patar", "कवि और लेखक", "Poet and writer", "Chandigarh 2023"],
  ["govind-nihlani", "गोविन्द निहलानी", "Govind Nihlani", "निर्देशक, सिनेमैटोग्राफ़र, लेखक और निर्माता", "Director, cinematographer, writer and producer", "Mumbai 2023"],
  ["geetanjali-shree", "गीतांजलि श्री", "Geetanjali Shree", "लेखक", "Author", "Indore 2026"],
  ["purushottam-agarwal", "पुरुषोत्तम अग्रवाल", "Purushottam Agarwal", "लेखक और आलोचक", "Author and literary critic", "Bhopal 2022, Bareilly 2025"],
  ["ashok-kumar-pandey", "अशोक कुमार पाण्डेय", "Ashok Kumar Pandey", "लेखक और इतिहासकार", "Author and historian", "Patna 2022, Bareilly 2026"],
  ["gyan-chaturvedi", "ज्ञान चतुर्वेदी", "Gyan Chaturvedi", "व्यंग्यकार, लेखक और चिकित्सक", "Satirist, author and physician", "Bhopal 2022, Bhopal 2025, Indore 2026"],
  ["jerry-pinto", "जेरी पिंटो", "Jerry Pinto", "लेखक, कवि और अनुवादक", "Author, poet and translator", "Mumbai 2023"],
  ["bhalchandra-nemade", "भालचन्द्र नेमाड़े", "Bhalchandra Nemade", "उपन्यासकार, कवि और आलोचक", "Novelist, poet and literary critic", "Mumbai 2023"],
  ["rajendra-gupta", "राजेन्द्र गुप्ता", "Rajendra Gupta", "अभिनेता और रंग-निर्देशक", "Actor and theatre director", "Mumbai 2023, Mumbai 2026"],
  ["yunus-khan", "यूनुस ख़ान", "Yunus Khan", "रेडियो प्रस्तोता और लेखक", "Radio presenter and writer", "Mumbai 2023, Mumbai 2026, Patna 2026, Indore 2026"],
  ["saurabh-shukla", "सौरभ शुक्ला", "Saurabh Shukla", "अभिनेता और पटकथा लेखक", "Actor and screenwriter", "Mumbai 2023"],
  ["himani-shivpuri", "हिमानी शिवपुरी", "Himani Shivpuri", "अभिनेत्री", "Actor", "Mumbai 2023, Mumbai 2026"],
  ["ranjeet-kapoor", "रंजीत कपूर", "Ranjeet Kapoor", "रंग-निर्देशक और पटकथा लेखक", "Theatre director and screenwriter", "Mumbai 2023"],
  ["chandrakishor-jaiswal", "चन्द्रकिशोर जायसवाल", "Chandrakishor Jaiswal", "लेखक", "Author", "Patna 2023"],
  ["radhavallabh-tripathi", "राधावल्लभ त्रिपाठी", "Radhavallabh Tripathi", "कवि", "Poet", "Bhopal 2022, Bhopal 2023, Bhopal 2025, Indore 2026"],
  ["laxman-gaikwad", "लक्ष्मण गायकवाड़", "Laxman Gayakwad", "लेखक और सामाजिक कार्यकर्ता", "Author and social activist", "Mumbai 2023"],
  ["sharankumar-limbale", "शरणकुमार लिंबाले", "Sharan Kumar Limbale", "उपन्यासकार और दलित अधिकार कार्यकर्ता", "Novelist and Dalit rights activist", "Mumbai 2023"],
  ["rekha-bhardwaj", "रेखा भारद्वाज", "Rekha Bhardwaj", "गायिका और कलाकार", "Singer and artist", "Mumbai 2026"],
  ["punit-sharma", "पुनीत शर्मा", "Punit Sharma", "गीतकार और पटकथा लेखक", "Lyricist and screenwriter", "Mumbai 2026"],
  ["abhishek-shukla", "अभिषेक शुक्ला", "Abhishek Shukla", "शायर", "Shayar", "Lucknow 2024, Bareilly 2025, Mumbai 2026"],
  ["badri-narayan", "बद्री नारायण", "Badri Narayan", "कवि", "Poet", "Chandigarh 2023, Mumbai 2023"],
  ["atika-chauhan", "अतिका चौहान", "Atika Chauhan", "पटकथा लेखक", "Screenwriter", "Mumbai 2026"],
  ["tj-bhanu", "टी.जे. भानु", "T.J. Bhanu", "अभिनेत्री", "Actor", "Mumbai 2026"],
  ["rasika-agashe", "रसिका आगाशे", "Rasika Agashe", "रंग-निर्देशक और अभिनेत्री", "Theatre director and actor", "Mumbai 2026"],
  ["alok-dhanwa", "आलोकधन्वा", "Alok Dhanwa", "कवि", "Poet", "Patna 2022, Patna 2023, Patna 2026"],
  ["prem-kumar-mani", "प्रेमकुमार मणि", "Prem Kumar Mani", "निबन्धकार और चिन्तक", "Essayist and thinker", "Patna 2022, Patna 2023, Patna 2026"],
  ["gn-devy", "जी.एन. देवी", "G.N. Devy", "लेखक, भाषाविद् और सांस्कृतिक कार्यकर्ता", "Author, linguist and cultural activist", "Patna 2026"],
  ["pushpesh-pant", "पुष्पेश पंत", "Pushpesh Pant", "लेखक, खान-पान समीक्षक और इतिहासकार", "Author, food critic and historian", "Patna 2026, Indore 2026"],
  ["jasinta-kerketta", "जसिंता केरकेट्टा", "Jasinta Kerketta", "कवि", "Poet", "Patna 2026, Indore 2026"],
  ["sudhir-chandra", "सुधीर चन्द्र", "Sudhir Chandra", "लेखक और इतिहासकार", "Author and historian", "Indore 2026"],
  ["neha-dixit", "नेहा दीक्षित", "Neha Dixit", "लेखक और पत्रकार", "Author and journalist", "Indore 2026"],
  ["kalapini-komkali", "कलापिनी कोमकली", "Kalapini Komkali", "हिन्दुस्तानी शास्त्रीय गायिका", "Hindustani classical vocalist", "Indore 2026"],
  ["sudhir-vidyarthi", "सुधीर विद्यार्थी", "Sudhir Vidyarthi", "जीवनीकार और इतिहासकार", "Biographer and historian", "Bareilly 2026"],
  ["khalid-javed", "ख़ालिद जावेद", "Khalid Javed", "उपन्यासकार", "Novelist", "Bareilly 2025"],
  ["akhilesh", "अखिलेश", "Akhilesh", "लेखक", "Author", "Bareilly 2025"],
  ["himanshu-vajpai", "हिमांशु बाजपेयी", "Himanshu Vajpai", "दास्तानगो", "Dastango", ""],
  ["ashu-mishra", "आशु मिश्रा", "Ashu Mishra", "शायर", "Shayar", ""],
  ["hrishikesh-sulabh", "हृषीकेश सुलभ", "Hrishikesh Sulabh", "नाटककार और कथाकार", "Playwright and short story writer", ""],
  ["prabhat-singh", "प्रभात सिंह", "Prabhat Singh", "अनुवादक और पत्रकार", "Translator and journalist", ""],
  ["brijeshwer-singh", "डॉ. बृजेश्वर सिंह", "Dr. Brijeshwer Singh", "हड्डी रोग विशेषज्ञ, समाजसेवी और कला-संरक्षक", "Orthopaedic surgeon, philanthropist and arts patron", ""],
  ["mridula-garg", "मृदुला गर्ग", "Mridula Garg", "लेखक", "Author", ""],
  ["ravi-singh", "रवि सिंह", "Ravi Singh", "प्रकाशक और साहित्यिक सम्पादक", "Publisher and literary editor", ""],
  ["alka-saraogi", "अलका सरावगी", "Alka Sarawgi", "लेखक", "Author", ""],
  ["atul-tiwari", "अतुल तिवारी", "Atul Tiwari", "पटकथा लेखक, अभिनेता और रंग-निर्देशक", "Screenwriter, actor and theatre director", ""],
  ["chinmayi-tripathi", "चिन्मयी त्रिपाठी", "Chinmayi Tripathi", "गायिका और कलाकार", "Singer and artist", ""],
  ["rahman-abbas", "रहमान अब्बास", "Rahman Abbas", "उपन्यासकार", "Novelist", ""],
  ["sushant-singh", "सुशांत सिंह", "Sushant Singh", "अभिनेता", "Actor", ""],
  ["ram-gopal-bajaj", "रामगोपाल बजाज", "Ram Gopal Bajaj", "रंग-निर्देशक", "Theatre director", ""],
  ["rumi-jafri", "रूमी जाफ़री", "Rumi Jafri", "फ़िल्म निर्देशक और पटकथा लेखक", "Film director and screenwriter", ""],
  ["gaurav-solanki", "गौरव सोलंकी", "Gaurav Solanki", "कवि और पटकथा लेखक", "Poet and screenwriter", ""],
  ["asghar-wajahat", "असग़र वजाहत", "Asghar Wajahat", "लेखक", "Author", ""],
];

const fromRoster = roster.map(([slug, hi, en, roleHi, roleEn, list]): Speaker => {
  const appearances = at(list);
  return {
    slug,
    name: { hi, en },
    role: { hi: roleHi, en: roleEn },
    edition: [...appearances].reverse().find((a) => a.edition)?.edition,
    ...(appearances.length ? { appearances } : {}),
  };
});

export const speakers: Speaker[] = [...featured, ...fromRoster];

{
  const seen = new Set<string>();
  for (const s of speakers) {
    if (seen.has(s.slug)) throw new Error(`speakers.ts: duplicate slug "${s.slug}"`);
    seen.add(s.slug);
  }
}

/** Everyone documented at an edition, whether it is their main listing or a recorded appearance. */
export const speakersFor = (edition: string) =>
  speakers.filter((s) => s.edition === edition || s.appearances?.some((a) => a.edition === edition));

/**
 * Every speaker documented so far, across all editions. This is the festival's working
 * archive, not a claim of completeness: add more as they are sourced, with a real `photo`
 * in public/speakers/ where one exists.
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
