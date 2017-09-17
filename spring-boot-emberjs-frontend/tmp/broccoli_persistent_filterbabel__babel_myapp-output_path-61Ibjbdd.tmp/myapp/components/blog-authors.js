define('myapp/components/blog-authors', ['exports', 'ember-cli-pagination/computed/paged-array'], function (exports, _pagedArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    authorsSorting: ['name'],
    arrangedContent: Ember.computed.sort('authors', 'authorsSorting'),

    pagedContent: (0, _pagedArray.default)('arrangedContent', {
      page: Ember.computed.alias('parent.page'),
      perPage: Ember.computed.alias('parent.perPage')
    }),

    actions: {
      createAuthor: function createAuthor() {
        this.sendAction('createAction');
      }
    }
  });
});