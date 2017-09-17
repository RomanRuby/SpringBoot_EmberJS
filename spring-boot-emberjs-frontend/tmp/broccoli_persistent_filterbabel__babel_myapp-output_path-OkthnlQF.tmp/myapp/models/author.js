define('myapp/models/author', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Author = _emberPouch.Model.extend({
    name: _emberData.default.attr('string', { defaultValue: "" }),
    posts: _emberData.default.hasMany('posts')
  });

  exports.default = Author;
});