define("myapp/controllers/authors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    perPage: 5,

    queryParams: ["page", "perPage"]
  });
});