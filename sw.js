// Hors-ligne : met la coquille de l'appli en cache, réseau d'abord pour avoir la dernière version.
const CACHE = 'bibliotheque-v1'
const FILES = ['./', 'index.html', 'manifest.json', 'icon.svg']
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))))
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))))
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r }).catch(() => caches.match(e.request)))
})
