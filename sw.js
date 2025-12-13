const CACHE_NAME = 'nanoarcade-v1.3';
const urlsToCache = [
  '/NanoArcade/',
  '/NanoArcade/index.html',
  '/NanoArcade/manifest.json',
  '/NanoArcade/assets/images/icon-192.png',
  '/NanoArcade/assets/images/icon-512.png',
  '/NanoArcade/assets/images/logo.png',
  '/NanoArcade/assets/css/main.css',
  '/NanoArcade/assets/css/fontawesome-all.min.css',
  '/NanoArcade/icons/arcade.svg',
  '/NanoArcade/icons/gameboy.svg',
  '/NanoArcade/icons/nes.svg',
  '/NanoArcade/icons/snes.svg',
  '/NanoArcade/icons/genesis.svg',
  '/NanoArcade/icons/gba.svg',
  '/NanoArcade/icons/gbc.svg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('NanoArcade: Caching app shell');
        return cache.addAll(urlsToCache);
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
