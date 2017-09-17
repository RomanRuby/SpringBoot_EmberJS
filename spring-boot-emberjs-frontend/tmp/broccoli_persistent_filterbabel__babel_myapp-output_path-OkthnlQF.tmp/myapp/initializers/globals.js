define('myapp/initializers/globals', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    var globals = {
      isEditing: false
    };

    application.register('globals:main', globals, { instantiate: false });
    application.inject('controller', 'globals', 'globals:main');
  }

  exports.default = {
    name: 'globals',
    initialize: initialize
  };
});