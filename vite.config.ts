import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          strategies: 'generateSW',
          registerType: 'autoUpdate',
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf,woff}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'gstatic-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'unsplash-images-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60 // 1 semaine
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ],
            skipWaiting: true,
            clientsClaim: true
          },
          manifest: {
            name: 'ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS',
            short_name: 'Forage',
            description: 'Spécialiste panafricain du forage profond et de l\'hydraulique industrielle',
            theme_color: '#0e7490',
            background_color: '#f8fafc',
            display: 'standalone',
            start_url: '/',
            scope: '/',
            id: '/',
            icon: 'public/android-chrome-192x192.png',
            icons: [
              {
                src: 'android-chrome-72x72.png',
                sizes: '72x72',
                type: 'image/png'
              },
              {
                src: 'android-chrome-96x96.png',
                sizes: '96x96',
                type: 'image/png'
              },
              {
                src: 'android-chrome-128x128.png',
                sizes: '128x128',
                type: 'image/png'
              },
              {
                src: 'android-chrome-144x144.png',
                sizes: '144x144',
                type: 'image/png'
              },
              {
                src: 'android-chrome-152x152.png',
                sizes: '152x152',
                type: 'image/png'
              },
              {
                src: 'android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable'
              },
              {
                src: 'android-chrome-384x384.png',
                sizes: '384x384',
                type: 'image/png'
              },
              {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ],
            categories: ['utilities', 'business'],
            lang: 'fr',
            dir: 'ltr',
            orientation: 'portrait'
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
