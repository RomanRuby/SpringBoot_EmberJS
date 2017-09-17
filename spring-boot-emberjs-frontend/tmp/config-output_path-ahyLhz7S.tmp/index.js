
    export const PROJECT_VERSION = '0.0.0';
    export const PROJECT_REVISION = '4a3a4210f7f6cac8a7ba09cd1607a9eb4bc138fb';
    export const VERSION = '1505677952893|0.0035638388352345896';
  
        self.addEventListener('install', function installEventListenerCallback(event) {
          return self.skipWaiting();
        });

        self.addEventListener('activate', function installEventListenerCallback(event) {
          return self.clients.claim();
        });
      