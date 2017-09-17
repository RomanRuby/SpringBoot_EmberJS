define('myapp/routes/posts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      var store = this.store;
      return Ember.RSVP.hash({
        content: store.findAll('post'),
        authors: store.findAll('author')
      });
    },

    setupController: function setupController(controller, models) {
      controller.setProperties(models);
    },

    redirect: function redirect(model, transition) {
      if (transition.targetName === 'posts.index') {
        if (model.content.get('length') !== 0) {
          this.transitionTo('post', model.content.sortBy('date').reverse().get('firstObject'));
        }
      }
    },

    actions: {
      createPost: function createPost() {
        this.controllerFor('post').set('globals.isEditing', true);
        var newPost = this.store.createRecord('post');
        newPost.set('date', new Date());
        this.transitionTo('post', newPost.save());
      },

      savePost: function savePost() {
        this.modelFor('post').save();
      },

      deletePost: function deletePost() {
        this.modelFor('post').destroyRecord().then(function () {
          this.transitionTo('posts');
        }.bind(this));
      }
    }
  });
});