define("myapp/controllers/posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    perPage: 5,
    query: '',

    queryParams: ["page", "perPage", "query"]
  });
});