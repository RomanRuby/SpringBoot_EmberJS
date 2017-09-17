define('myapp/models/post', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Post = _emberPouch.Model.extend({
    title: _emberData.default.attr('string', { defaultValue: "" }),
    date: _emberData.default.attr('date'),
    body: _emberData.default.attr('string', { defaultValue: "" }),

    authorName: Ember.computed.readOnly('author.name')
  });

  exports.default = Post;
});