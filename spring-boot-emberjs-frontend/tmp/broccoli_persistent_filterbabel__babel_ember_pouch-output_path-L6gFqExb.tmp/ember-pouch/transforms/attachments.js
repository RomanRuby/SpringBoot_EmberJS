define('ember-pouch/transforms/attachments', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      isNone = Ember.isNone;

  var keys = Object.keys || Ember.keys;

  exports.default = _emberData.default.Transform.extend({
    deserialize: function deserialize(serialized) {
      if (isNone(serialized)) {
        return [];
      }

      return keys(serialized).map(function (attachmentName) {
        var attachment = serialized[attachmentName];
        return Ember.Object.create({
          name: attachmentName,
          content_type: attachment.content_type,
          data: attachment.data,
          stub: attachment.stub,
          length: attachment.length,
          digest: attachment.digest
        });
      });
    },

    serialize: function serialize(deserialized) {
      if (!Ember.isArray(deserialized)) {
        return null;
      }

      return deserialized.reduce(function (acc, attachment) {
        var serialized = {
          content_type: get(attachment, 'content_type')
        };
        if (get(attachment, 'stub')) {
          serialized.stub = true;
          serialized.length = get(attachment, 'length');
          serialized.digest = get(attachment, 'digest');
        } else {
          serialized.data = get(attachment, 'data');
          serialized.length = get(attachment, 'length');
        }
        acc[get(attachment, 'name')] = serialized;
        return acc;
      }, {});
    }
  });
});