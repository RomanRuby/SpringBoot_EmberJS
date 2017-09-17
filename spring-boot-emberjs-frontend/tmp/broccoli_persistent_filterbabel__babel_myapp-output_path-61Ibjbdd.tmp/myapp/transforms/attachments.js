define('myapp/transforms/attachments', ['exports', 'ember-pouch/transforms/attachments'], function (exports, _attachments) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _attachments.default;
    }
  });
});