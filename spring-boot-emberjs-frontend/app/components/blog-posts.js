import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import computedFilterByQuery from 'ember-cli-filter-by-query';

export default Ember.Component.extend({

  postsSorting: ['date:desc'],
  arrangedContent: Ember.computed.sort('posts', 'postsSorting'),

  filteredContent: computedFilterByQuery(
    'arrangedContent',
    ['title', 'body', 'authorName'],
    'query',
    { conjunction: 'and', sort: false}
  ),

  pagedContent: pagedArray('filteredContent', {
    page: Ember.computed.alias('parent.page'),
    perPage: Ember.computed.alias('parent.perPage')
  }),

  actions: {
    resetPage: function() {
      this.set('page', 1);
    },
    createPost: function() {
      this.sendAction('createAction');
    }
  }
});
