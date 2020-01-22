const CACHE_NAME = 'bordeaux'

const urlsToPrefetch = [
  '/',
  '/index.html',
  '/static/fonts/Felona.woff2',
  '/static/img/favicon.png',
  '/static/img/logo-192x192.png',
  '/static/img/logo-512x512.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache =>
        urlsToPrefetch
          .map(url => new Request(url))
          .map(request => fetch(request).then(response => cache.put(request, response.clone())))
      )
      .catch(function(error) {
        console.error('Pre-fetching failed:', error)
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
    ]).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response
      } else {
        return fetch(event.request).then(response => {
          return caches
            .open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, response.clone())
            })
            .then(() => {
              return response
            })
        })
      }
    })
  )
})

addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') {
    return self.skipWaiting()
  }
})
