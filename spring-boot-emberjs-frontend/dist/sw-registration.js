(function () {
  'use strict';

  var SUCCESS_HANDLERS = [];
  var ERROR_HANDLERS = [];

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
      var current = Promise.resolve();

      var _loop = function (i) {
        current = current.then(function () {
          return SUCCESS_HANDLERS[i](reg);
        });
      };

      for (var i = 0; i < SUCCESS_HANDLERS.length; i++) {
        _loop(i);
      }

      return current.then(function () {
        console.log('Service Worker registration succeeded. Scope is ' + reg.scope);
      });
    })['catch'](function (error) {
      var current = Promise.resolve();

      var _loop2 = function (i) {
        current = current.then(function () {
          return ERROR_HANDLERS[i](error);
        });
      };

      for (var i = 0; i < ERROR_HANDLERS.length; i++) {
        _loop2(i);
      }

      return current.then(function () {
        console.log('Service Worker registration failed with ' + error);
      });
    });
  }

}());