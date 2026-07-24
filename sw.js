const CACHE_NAME = 'nanoarcade-v2.0.3';
const urlsToCache = [
  '/NanoArcade/',
  '/NanoArcade/index.html',
  '/NanoArcade/manifest.json',
  '/NanoArcade/assets/images/icon-192.png',
  '/NanoArcade/assets/images/icon-512.png',
  '/NanoArcade/assets/images/logo.png',
  '/NanoArcade/assets/css/main.css',
  '/NanoArcade/assets/css/fontawesome-all.min.css',
  '/NanoArcade/icons/arcade.png',
  '/NanoArcade/icons/gb.png',
  '/NanoArcade/icons/nes.png',
  '/NanoArcade/icons/snes.png',
  '/NanoArcade/icons/md.png',
  '/NanoArcade/icons/gba.png',
  '/NanoArcade/icons/gbc.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('NanoArcade: Caching app shell');
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url))
        ).then(results => {
          const failedUrls = results
            .map((result, index) => result.status === 'rejected' ? urlsToCache[index] : null)
            .filter(Boolean);
          if (failedUrls.length > 0) {
            console.warn('NanoArcade: Some optional app-shell assets could not be cached', failedUrls);
          }
        });
      })
      .catch(err => {
        console.log('NanoArcade: Cache failed, continuing anyway', err);
      })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('nanoarcade-')) {
            console.log('NanoArcade: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - network first, cache fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (APIs, CDNs for game data)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});
