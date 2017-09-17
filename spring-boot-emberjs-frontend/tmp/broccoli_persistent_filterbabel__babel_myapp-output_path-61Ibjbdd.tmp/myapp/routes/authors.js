define('myapp/routes/authors', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      var store = this.store;
      return Ember.RSVP.hash({
        content: store.findAll('author'),
        posts: store.findAll('post')
      });
    },

    setupController: function setupController(controller, models) {
      controller.setProperties(models);
    },

    actions: {
      createAuthor: function createAuthor() {
        this.controllerFor('author').set('globals.isEditing', true);
        var newauthor = this.store.createRecord('author');
        this.transitionTo('author', newauthor.save());
      },

      saveAuthor: function saveAuthor() {
        this.modelFor('author').save();
      },

      deleteAuthor: function deleteAuthor() {
        this.modelFor('author').destroyRecord().then(function () {
          this.transitionTo('authors');
        }.bind(this));
      }
    }

  });
});