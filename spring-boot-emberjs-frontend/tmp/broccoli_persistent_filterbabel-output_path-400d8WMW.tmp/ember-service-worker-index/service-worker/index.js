import { INDEX_HTML_PATH, VERSION, INDEX_EXCLUDE_SCOPE, INDEX_INCLUDE_SCOPE } from 'ember-service-worker-index/service-worker/config';

import { urlMatchesAnyPattern } from 'ember-service-worker/service-worker/url-utils';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';

var CACHE_KEY_PREFIX = 'esw-index';
var CACHE_NAME = CACHE_KEY_PREFIX + '-' + VERSION;

var INDEX_HTML_URL = new URL(INDEX_HTML_PATH, self.location).toString();

self.addEventListener('install', function (event) {
  event.waitUntil(fetch(INDEX_HTML_URL, { credentials: 'include' }).then(function (response) {
    return caches.open(CACHE_NAME).then(function (cache) {
      return cache.put(INDEX_HTML_URL, response);
    });
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME));
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var isGETRequest = request.method === 'GET';
  var isHTMLRequest = request.headers.get('accept').indexOf('text/html') !== -1;
  var isLocal = new URL(request.url).origin === location.origin;
  var scopeExcluded = urlMatchesAnyPattern(request.url, INDEX_EXCLUDE_SCOPE);
  var scopeIncluded = !INDEX_INCLUDE_SCOPE.length || urlMatchesAnyPattern(request.url, INDEX_INCLUDE_SCOPE);

  if (isGETRequest && isHTMLRequest && isLocal && scopeIncluded && !scopeExcluded) {
    event.respondWith(caches.match(INDEX_HTML_URL, { cacheName: CACHE_NAME }));
  }
});