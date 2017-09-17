define('myapp/adapters/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = DS.RESTAdapter.extend({
    host: 'http://localhost:8084'
  });
});