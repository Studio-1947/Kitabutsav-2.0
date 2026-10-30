// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Set SITE_URL (or edit the fallback) to the production domain before deploying.
// Canonical URLs, hreflang tags, the sitemap, robots.txt and structured data all use it.
const site = process.env.SITE_URL || "https://kitabutsav.rajkamalprakashan.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  // Festivals and Gallery were folded into "About Kitab Utsav".
  redirects: {
    "/editions/": "/about/#editions",
    "/en/editions/": "/en/about/#editions",
    "/gallery/": "/about/#gallery",
    "/en/gallery/": "/en/about/#gallery",
  },
  i18n: {
    locales: ["hi", "en"],
    defaultLocale: "hi",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !/\/(en\/)?(editions|gallery)\/$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: "hi",
        locales: { hi: "hi-IN", en: "en-IN" },
      },
      changefreq: "weekly",
      priority: 0.7,
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === "/" || path === "/en/") item.priority = 1.0;
        else if (/\/(programme|visit)\/$/.test(path) || path.includes("bareilly-2026")) item.priority = 0.9;
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
