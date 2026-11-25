const CACHE_NAME = "iirms-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch requests with cache-first strategy
self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (url.includes("/api/")) return;
  if (url.includes("/@vite") || url.includes("/@fs") || url.includes("/node_modules")) return;
  if (event.request.headers.get("upgrade") === "websocket") return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Activate service worker and clear old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
