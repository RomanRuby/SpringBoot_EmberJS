var PROJECT_VERSION = '0.0.0';
export { PROJECT_VERSION };
var PROJECT_REVISION = '2776d5a54dc0cd528cc88af792efd492eb2d4062';
export { PROJECT_REVISION };
var VERSION = '1505679488562|0.7097070035707023';

export { VERSION };
self.addEventListener('install', function installEventListenerCallback(event) {
  return self.skipWaiting();
});

self.addEventListener('activate', function installEventListenerCallback(event) {
  return self.clients.claim();
});