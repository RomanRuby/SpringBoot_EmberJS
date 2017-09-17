
    export const PROJECT_VERSION = '0.0.0';
    export const PROJECT_REVISION = '2776d5a54dc0cd528cc88af792efd492eb2d4062';
    export const VERSION = '1505679488562|0.7097070035707023';
  
        self.addEventListener('install', function installEventListenerCallback(event) {
          return self.skipWaiting();
        });

        self.addEventListener('activate', function installEventListenerCallback(event) {
          return self.clients.claim();
        });
      