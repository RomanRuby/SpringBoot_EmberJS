define('myapp/components/blog-posts', ['exports', 'ember-cli-pagination/computed/paged-array', 'ember-cli-filter-by-query'], function (exports, _pagedArray, _emberCliFilterByQuery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    postsSorting: ['date:desc'],
    arrangedContent: Ember.computed.sort('posts', 'postsSorting'),

    filteredContent: (0, _emberCliFilterByQuery.default)('arrangedContent', ['title', 'body', 'authorName'], 'query', { conjunction: 'and', sort: false }),

    pagedContent: (0, _pagedArray.default)('filteredContent', {
      page: Ember.computed.alias('parent.page'),
      perPage: Ember.computed.alias('parent.perPage')
    }),

    actions: {
      resetPage: function resetPage() {
        this.set('page', 1);
      },
      createPost: function createPost() {
        this.sendAction('createAction');
      }
    }
  });
});