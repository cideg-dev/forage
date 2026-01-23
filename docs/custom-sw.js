// public/custom-sw.js
// Service Worker personnalisé pour l'application PWA

const CACHE_NAME = 'forage-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/bundle.js'
];

// Installer le service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepter les requêtes réseau
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

// Activer le service worker immédiatement
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});