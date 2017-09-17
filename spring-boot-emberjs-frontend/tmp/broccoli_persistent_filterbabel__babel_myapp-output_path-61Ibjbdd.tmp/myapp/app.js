define('myapp/app', ['exports', 'myapp/resolver', 'ember-load-initializers', 'myapp/config/environment', 'marked'], function (exports, _resolver, _emberLoadInitializers, _environment, _marked) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _marked.default.setOptions({
    renderer: new _marked.default.Renderer(),
    breaks: true
  });

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});