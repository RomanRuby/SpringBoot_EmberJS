define('myapp/components/blog-post-edit', ['exports'], function (exports) {
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

      deletePost: function deletePost() {
        this.sendAction('deleteAction');
      }
    }
  });
});