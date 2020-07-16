self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            '../',
            '/daf.js',
            '/daf.css',
            'index.html'
          ]
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request));
  });