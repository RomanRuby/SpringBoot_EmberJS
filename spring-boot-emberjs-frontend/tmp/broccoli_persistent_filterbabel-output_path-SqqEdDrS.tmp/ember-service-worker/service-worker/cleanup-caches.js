/*
 * Deletes all caches that start with the `prefix`, except for the
 * cache defined by `currentCache`
 */
export default function (prefix, currentCache) {
  return caches.keys().then(function (cacheNames) {
    cacheNames.forEach(function (cacheName) {
      var isOwnCache = cacheName.indexOf(prefix) === 0;
      var isNotCurrentCache = cacheName !== currentCache;

      if (isOwnCache && isNotCurrentCache) {
        caches["delete"](cacheName);
      }
    });
  });
}