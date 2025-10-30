// ALBAY STEPS Service Worker (basit cache-first)
const CACHE = "albay-steps-v1";
const ASSETS = [
  "/albay-panel/",
  "/albay-panel/index.html",
  "/albay-panel/panel.html",
  "/albay-panel/manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
