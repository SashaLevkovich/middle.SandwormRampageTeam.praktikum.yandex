const CACHE_NAME = 'sandworm-cache-v1'

const URLS = [
  'index.html',
  'assets/Koulen-Regular.ttf',
  'assets/KulimPark-ExtraLight.ttf',
  'assets/KumbhSans-Regular.ttf',
  'assets/Lines.svg',
  'assets/Moons.svg',
  'assets/about-game.svg',
  'assets/app.js',
  'assets/background-without-text-upside-down.svg',
  'assets/background-without-text.svg',
  'assets/background.svg',
  'assets/body.png',
  'assets/chevronDown.svg',
  'assets/chevronUp.svg',
  'assets/errors-background.svg',
  'assets/forum-background.svg',
  'assets/forum.svg',
  'assets/head.png',
  'assets/index.css',
  'assets/leaderboard-background.svg',
  'assets/leaderboard.svg',
  'assets/tail.png',
  'assets/vite.svg',
]

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(name => caches.delete(name)))
    })
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
