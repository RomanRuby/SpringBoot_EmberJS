define('myapp/router', ['exports', 'myapp/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('posts', function () {
      this.route('post', { path: ':post_id', resetNamespace: true });
    });
    this.route('authors', function () {
      this.route('author', { path: ':author_id', resetNamespace: true });
    });
  });

  exports.default = Router;
});