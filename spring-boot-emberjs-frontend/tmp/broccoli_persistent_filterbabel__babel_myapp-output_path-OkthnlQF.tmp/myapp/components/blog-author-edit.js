define('myapp/components/blog-author-edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      edit: function edit() {
        this.set('isEditing', true);
      },

      doneEditing: function doneEditing() {
        this.set('isEditing', false);
        this.sendAction('saveAction');
      },

      deleteAuthor: function deleteAuthor() {
        this.sendAction('deleteAction');
      }
    }
  });
});