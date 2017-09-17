export { addSuccessHandler };
export { addErrorHandler };
var PROJECT_REVISION = '{{PROJECT_REVISION}}';

export { PROJECT_REVISION };
var SUCCESS_HANDLERS = [];
var ERROR_HANDLERS = [];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('{{ROOT_URL}}sw.js', { scope: '{{ROOT_URL}}' }).then(function (reg) {
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

function addSuccessHandler(func) {
  SUCCESS_HANDLERS.push(func);
}

function addErrorHandler(func) {
  ERROR_HANDLERS.push(func);
}