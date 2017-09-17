
      (function() {
        if (typeof FastBoot === 'undefined') {
          var script = document.createElement('script')
          script.src = '/sw-registration.js';
          document.body.appendChild(script);
        }
      })();
    