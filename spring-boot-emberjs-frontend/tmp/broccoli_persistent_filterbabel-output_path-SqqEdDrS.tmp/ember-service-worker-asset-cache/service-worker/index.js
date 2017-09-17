import { FILES, PREPEND, VERSION, REQUEST_MODE } from 'ember-service-worker-asset-cache/service-worker/config';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';

var CACHE_KEY_PREFIX = 'esw-asset-cache';
var CACHE_NAME = CACHE_KEY_PREFIX + '-' + VERSION;
var CACHE_URLS = FILES.map(function (file) {
  return new URL(file, PREPEND || self.location).toString();
});

/*
 * Removes all cached requests from the cache that aren't in the `CACHE_URLS`
 * list.
 */
var PRUNE_CURRENT_CACHE = function PRUNE_CURRENT_CACHE() {
  caches.open(CACHE_NAME).then(function (cache) {
    return cache.keys().then(function (keys) {
      keys.forEach(function (request) {
        if (CACHE_URLS.indexOf(request.url) === -1) {
          cache['delete'](request);
        }
      });
    });
  });
};

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return Promise.all(CACHE_URLS.map(function (url) {
      var request = new Request(url, { mode: REQUEST_MODE });
      return fetch(request).then(function (response) {
        if (response.status >= 400) {
          throw new Error('Request for ' + url + ' failed with status ' + response.statusText);
        }
        return cache.put(url, response);
      })['catch'](function (error) {
        console.error('Not caching ' + url + ' due to ' + error);
      });
    }));
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(Promise.all([cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME), PRUNE_CURRENT_CACHE()]));
});

self.addEventListener('fetch', function (event) {
  var isGETRequest = event.request.method === 'GET';
  var shouldRespond = CACHE_URLS.indexOf(event.request.url) !== -1;

  if (isGETRequest && shouldRespond) {
    event.respondWith(caches.match(event.request, { cacheName: CACHE_NAME }).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }));
  }
});