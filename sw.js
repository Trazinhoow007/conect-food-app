const CACHE_NAME = 'conect-food-cache-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Evento de instalação: abre o cache e armazena os arquivos principais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: serve arquivos do cache se disponíveis
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o arquivo estiver no cache, retorna ele
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      }
    )
  );
});

