/**
 * Site-wide settings. Change `site` in astro.config.mjs (or set SITE_URL) to the real domain
 * before deploying: canonical URLs, hreflang links, the sitemap and structured data use it.
 */
export const org = {
  name: "Rajkamal Prakashan",
  legalName: "Rajkamal Prakashan Pvt. Ltd.",
  url: "https://www.rajkamalprakashan.com",
  logo: "https://www.rajkamalprakashan.com/rajkamal-prakashan-logo-512.png",
  email: "info@rajkamalprakashan.com",
  phones: [
    { label: "011 4263 8228", tel: "+911142638228" },
    { label: "+91 98102 81912", tel: "+919810281912" },
  ],
  address: {
    streetAddress: "1-B, Netaji Subhash Marg, Daryaganj",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110002",
    addressCountry: "IN",
  },
  searchUrl: "https://www.rajkamalprakashan.com/search",
};

/**
 * Where "Book my seat" goes. No ticketing/registration link has been published yet, so it points
 * at the featured edition page. Replace with the real registration URL (absolute) when it exists.
 */
export const bookSeatUrl: string | null = null;

/** Kitab Utsav's own channels. */
export const festivalSocial = [
  { name: "Instagram", handle: "@kitab.utsav", url: "https://www.instagram.com/kitab.utsav/" },
  { name: "Facebook", handle: "@kitabutsav", url: "https://www.facebook.com/kitabutsav" },
];

/** Rajkamal group channels (same as the store footer). */
export const groupSocial = {
  rajkamal: [
    ["YouTube", "https://www.youtube.com/@RajkamalBooks"],
    ["Instagram", "https://www.instagram.com/rajkamalbooks"],
    ["Facebook", "https://www.facebook.com/RajkamalPrakashanSamooh"],
    ["X", "https://x.com/RajkamalBooks"],
    ["LinkedIn", "https://in.linkedin.com/company/rajkamalbooks"],
    ["Threads", "https://www.threads.com/@rajkamalbooks"],
  ],
  radhakrishna: [
    ["Instagram", "https://www.instagram.com/radhakrishnaprakashan"],
    ["Facebook", "https://www.facebook.com/RadhakrishnaPrakashan"],
    ["X", "https://x.com/RadhakrishnaPub"],
  ],
  lokbharti: [
    ["Instagram", "https://www.instagram.com/lokbhartiprakashan"],
    ["Facebook", "https://www.facebook.com/LokbhartiBooks"],
    ["X", "https://x.com/LokbhartiBooks"],
  ],
  urdu: [
    ["Instagram", "https://www.instagram.com/rajkamalurdu"],
    ["Facebook", "https://www.facebook.com/rajkamalurdu"],
    ["X", "https://x.com/RajkamalUrdu"],
  ],
} as const;

/**
 * Official Kitab Utsav logo. Drop the file into public/brand/ and set the path, e.g.
 * "/brand/kitab-utsav-logo.svg". While null, the site draws a typographic lockup in the
 * campaign colours instead (src/components/Wordmark.astro).
 */
export const festivalLogo: string | null = null;

/** Edition partners shown on posters ("साथ"). Add the remaining partner when confirmed. */
export const partners = {
  "bareilly-2026": ["Windermere Theatre", "Speaking Tiger"],
} as Record<string, string[]>;
