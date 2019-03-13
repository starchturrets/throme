const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'assets/',
];



caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache);
    });