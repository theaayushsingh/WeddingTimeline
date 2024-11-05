/// <reference lib="webworker" />

export {};

declare const self: ServiceWorkerGlobalScope;

// Declare the __WB_MANIFEST type
declare const __WB_MANIFEST: Array<{ url: string; revision: string | null }>;

const CACHE_NAME = 'wedding-app-v1';

// next-pwa will replace this with the precache manifest
self.__WB_MANIFEST;

const CACHED_URLS = [
  '/',
  '/manifest.json',
  '/images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/icons/icon-128x128.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-152x152.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CACHED_URLS);
      // We'll let next-pwa handle the precaching of __WB_MANIFEST
    })()
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      const fetchResponse = await fetch(event.request);
      return fetchResponse;
    })()
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map(async (key) => {
          if (key !== CACHE_NAME) {
            await caches.delete(key);
          }
        })
      );
    })()
  );
});