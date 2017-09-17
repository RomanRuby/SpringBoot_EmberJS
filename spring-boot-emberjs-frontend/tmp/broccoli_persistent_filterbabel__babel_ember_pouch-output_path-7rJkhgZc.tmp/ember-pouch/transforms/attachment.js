define('ember-pouch/transforms/attachment', ['exports', 'ember-pouch/transforms/attachments'], function (exports, _attachments) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var isNone = Ember.isNone;
  exports.default = _attachments.default.extend({
    deserialize: function deserialize(serialized) {
      return this._super(serialized).pop();
    },
    serialize: function serialize(deserialized) {
      if (isNone(deserialized)) {
        return null;
      }
      return this._super([deserialized]);
    }
  });
});