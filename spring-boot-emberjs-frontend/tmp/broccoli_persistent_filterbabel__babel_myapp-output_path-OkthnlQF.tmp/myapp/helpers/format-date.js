define("myapp/helpers/format-date", ["exports", "moment"], function (exports, _moment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function (params) {
    var value = params[0];
    return (0, _moment.default)(value).fromNow();
  });
});