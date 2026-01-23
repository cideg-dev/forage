// service-worker.js - Service Worker avancé avec Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Configuration de base du cache
workbox.core.setCacheNameDetails({
  prefix: 'forage',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime'
});

// Activer le mode de débogage en développement
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Stratégie de cache pour les ressources statiques
workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
      }),
    ],
  })
);

// Stratégie de cache pour les images
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|gif|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
      }),
    ],
  })
);

// Stratégie de cache pour les polices
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
        maxEntries: 30,
      }),
    ],
  })
);

// Précharger les pages essentielles
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);