// PokéRip service worker — offline caching with bounded size
const SHELL = 'pokerip-shell-v2';
const IMAGES = 'pokerip-images-v2';
const MAX_IMAGES = 200;

const SHELL_FILES = ['./', 'index.html', 'privacy.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== IMAGES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cache, max) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Card images: cache-first, capped
  if (req.destination === 'image' && url.origin !== location.origin) {
    e.respondWith(
      caches.open(IMAGES).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) {
          cache.put(req, res.clone()).then(() => trim(cache, MAX_IMAGES));
        }
        return res;
      })
    );
    return;
  }

  // App shell (same origin): stale-while-revalidate
  if (url.origin === location.origin) {
    e.respondWith(
      caches.open(SHELL).then(async (cache) => {
        const cached = await cache.match(req, { ignoreSearch: true });
        const network = fetch(req)
          .then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
  // API calls and everything else go straight to the network.
});
