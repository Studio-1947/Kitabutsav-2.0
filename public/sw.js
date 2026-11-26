/*
 * Kitab Utsav service worker: makes the site installable and readable offline.
 *  - Pages: network first, so visitors always get the latest; the copy is kept, and used when
 *    offline. A page never visited before falls back to /offline/.
 *  - Built assets (/_astro/, hashed and never change), fonts, icons and images: cache first,
 *    refreshed in the background. Images are capped so the cache can't grow without limit.
 * Bump VERSION to drop every old cache on the next visit.
 */
const VERSION = "ku-v1";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const IMAGES = `${VERSION}-images`;
const MAX_IMAGES = 160;
const PRECACHE = ["/", "/en/", "/offline/", "/programme/", "/visit/", "/en/programme/", "/en/visit/", "/favicon.svg", "/icons/icon-192-any.png", "/brand/kitab-utsav-logo.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const trim = async (name, max) => {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
};

const cacheFirst = async (req, name, max) => {
  const c = await caches.open(name);
  const hit = await c.match(req);
  const fetching = fetch(req).then((res) => {
    if (res && (res.ok || res.type === "opaque")) { c.put(req, res.clone()); if (max) trim(name, max); }
    return res;
  }).catch(() => hit);
  return hit || fetching;
};

const networkFirst = async (req) => {
  const c = await caches.open(PAGES);
  try {
    const res = await fetch(req);
    if (res && res.ok) c.put(req, res.clone());
    return res;
  } catch {
    return (await c.match(req, { ignoreSearch: true })) || (await c.match("/offline/"));
  }
};

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (req.mode === "navigate" && url.origin === self.location.origin) {
    event.respondWith(networkFirst(req));
    return;
  }
  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(cacheFirst(req, ASSETS));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_astro/") || url.pathname.startsWith("/scripts/") || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/brand/") || url.pathname === "/favicon.svg") {
    event.respondWith(cacheFirst(req, ASSETS));
    return;
  }
  if (req.destination === "image") {
    event.respondWith(cacheFirst(req, IMAGES, MAX_IMAGES));
  }
});
