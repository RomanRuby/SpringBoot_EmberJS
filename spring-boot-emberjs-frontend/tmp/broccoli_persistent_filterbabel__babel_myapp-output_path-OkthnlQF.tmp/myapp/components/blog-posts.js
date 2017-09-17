define('myapp/components/blog-posts', ['exports', 'ember-cli-pagination/computed/paged-array', 'ember-cli-filter-by-query'], function (exports, _pagedArray, _emberCliFilterByQuery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    // take in `posts` from our view
    // and sort it via `postsSorting`
    // into `arrangedContent`
    postsSorting: ['date:desc'],
    arrangedContent: Ember.computed.sort('posts', 'postsSorting'),

    // `arrangedContent` is then used by this filter to create `filteredContent`
    filteredContent: (0, _emberCliFilterByQuery.default)('arrangedContent', ['title', 'body', 'authorName', 'excerpt'], 'query', { conjunction: 'and', sort: false }),

    // `filteredContent` is then used by this to create the paged array
    // which is used by our view like so
    // => {{#each pagedContent as |post|}}
    // => {{page-numbers content=pagedContent}}
    pagedContent: (0, _pagedArray.default)('filteredContent', {
      page: Ember.computed.alias('parent.page'),
      perPage: Ember.computed.alias('parent.perPage')
    }),

    // define the actions, used by our view like so:
    // => <button {{action 'createPost'}}>Create</button>
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