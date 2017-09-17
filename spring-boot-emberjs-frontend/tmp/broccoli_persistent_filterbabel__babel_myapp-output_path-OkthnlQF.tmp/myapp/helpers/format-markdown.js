define('myapp/helpers/format-markdown', ['exports', 'marked'], function (exports, _marked) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function (params) {
    var value = params[0];
    return Ember.String.htmlSafe((0, _marked.default)(value));
  });
});