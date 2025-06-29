self.addEventListener('install', event => {
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim any clients immediately so that the new service worker takes control
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Respond to all fetch events with a network request
  event.respondWith(fetch(event.request));
});
