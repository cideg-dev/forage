// public/sw.js
const CACHE_NAME = 'forage-app-v1.0';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse depuis le cache ou faire une requête réseau
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression du cache ancien', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});