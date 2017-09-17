define('myapp/authenticators/pouch', ['exports', 'ember-simple-auth-pouch/authenticators/pouch'], function (exports, _pouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pouch.default;
    }
  });
});