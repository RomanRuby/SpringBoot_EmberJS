"use strict";



define('myapp/adapters/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = DS.RESTAdapter.extend({
    host: 'http://localhost:8084'
  });
});
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
define('myapp/authenticators/pouch', ['exports', 'ember-simple-auth-pouch/authenticators/pouch'], function (exports, _pouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pouch.default;
    }
  });
});
define('myapp/components/active-link', ['exports', 'ember-cli-active-link-wrapper/components/active-link'], function (exports, _activeLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeLink.default;
});
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
define('myapp/components/blog-author', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      saveAction: function saveAction() {
        this.sendAction('saveAction');
      },
      deleteAction: function deleteAction() {
        this.sendAction('deleteAction');
      }
    }
  });
});
define('myapp/components/blog-authors', ['exports', 'ember-cli-pagination/computed/paged-array'], function (exports, _pagedArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    authorsSorting: ['name'],
    arrangedContent: Ember.computed.sort('authors', 'authorsSorting'),

    pagedContent: (0, _pagedArray.default)('arrangedContent', {
      page: Ember.computed.alias('parent.page'),
      perPage: Ember.computed.alias('parent.perPage')
    }),

    actions: {
      createAuthor: function createAuthor() {
        this.sendAction('createAction');
      }
    }
  });
});
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
define('myapp/components/blog-post', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      saveAction: function saveAction() {
        this.sendAction('saveAction');
      },
      deleteAction: function deleteAction() {
        this.sendAction('deleteAction');
      }
    }
  });
});
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
define('myapp/components/ember-selectize', ['exports', 'ember-cli-selectize/components/ember-selectize'], function (exports, _emberSelectize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberSelectize.default;
});
define('myapp/components/fa-icon', ['exports', 'ember-font-awesome/components/fa-icon'], function (exports, _faIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faIcon.default;
    }
  });
});
define('myapp/components/fa-list', ['exports', 'ember-font-awesome/components/fa-list'], function (exports, _faList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faList.default;
    }
  });
});
define('myapp/components/fa-stack', ['exports', 'ember-font-awesome/components/fa-stack'], function (exports, _faStack) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _faStack.default;
    }
  });
});
define('myapp/components/markdown-editor', ['exports', 'ember-cli-markdown-editor/components/markdown-editor'], function (exports, _markdownEditor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _markdownEditor.default;
    }
  });
});
define('myapp/components/page-numbers', ['exports', 'ember-cli-pagination/components/page-numbers'], function (exports, _pageNumbers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pageNumbers.default;
    }
  });
});
define("myapp/controllers/author", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define("myapp/controllers/authors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    perPage: 10,

    queryParams: ["page", "perPage"]
  });
});
define("myapp/controllers/post", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    posts: Ember.inject.controller()
  });
});
define("myapp/controllers/posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    page: 1,
    perPage: 10,
    query: '',

    queryParams: ["page", "perPage", "query"]
  });
});
define('myapp/helpers/app-version', ['exports', 'myapp/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define("myapp/helpers/format-date", ["exports", "moment"], function (exports, _moment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function (params) {
    var value = params[0];
    return (0, _moment.default)(value).fromNow();
  });
});
define('myapp/helpers/format-markdown', ['exports', 'marked'], function (exports, _marked) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function (params) {
    var value = params[0];
    return Ember.String.htmlSafe((0, _marked.default)(value));
  });
});
define('myapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('myapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('myapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'myapp/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('myapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('myapp/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('myapp/initializers/ember-simple-auth', ['exports', 'myapp/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _environment, _configuration, _setupSession, _setupSessionService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.baseURL = _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
    }
  };
});
define('myapp/initializers/export-application-global', ['exports', 'myapp/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
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
define('myapp/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('myapp/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("myapp/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('myapp/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _setupSessionRestoration.default)(instance);
    }
  };
});
define('myapp/mixins/active-link', ['exports', 'ember-cli-active-link-wrapper/mixins/active-link'], function (exports, _activeLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _activeLink.default;
});
define('myapp/models/author', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Author = _emberPouch.Model.extend({
    name: _emberData.default.attr('string', { defaultValue: "" }),
    posts: _emberData.default.hasMany('posts')
  });

  exports.default = Author;
});
define('myapp/models/post', ['exports', 'ember-data', 'ember-pouch'], function (exports, _emberData, _emberPouch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Post = _emberPouch.Model.extend({
    title: _emberData.default.attr('string', { defaultValue: "" }),
    author: _emberData.default.belongsTo('author'),
    date: _emberData.default.attr('date'),
    body: _emberData.default.attr('string', { defaultValue: "" }),

    authorName: Ember.computed.readOnly('author.name')
  });

  exports.default = Post;
});
define('myapp/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
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
define('myapp/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend();
});
define("myapp/routes/author", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.store.findRecord('author', params.author_id);
    }
  });
});
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
define("myapp/routes/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('posts');
    }
  });
});
define("myapp/routes/post", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.store.findRecord('post', params.post_id);
    }
  });
});
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
define('myapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('myapp/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('myapp/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("myapp/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Y/IbuF1k", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\"],[6,\"h1\"],[9,\"id\",\"title\"],[7],[0,\"Blog\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"navbar navbar-default\"],[9,\"role\",\"navigation\"],[7],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\\t  \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n\\t\\t\\t\"],[4,\"link-to\",[\"application\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Blog\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"navbar-inner\"],[7],[0,\"\\n\\t\\t\\t\"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n\\t\\t\\t\\t\"],[4,\"active-link\",null,null,{\"statements\":[[4,\"link-to\",[\"posts\"],null,{\"statements\":[[0,\"Posts\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\\t\"],[4,\"active-link\",null,null,{\"statements\":[[4,\"link-to\",[\"authors\"],null,{\"statements\":[[0,\"Authors\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/application.hbs" } });
});
define("myapp/templates/author", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kwcXVzoD", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"blog-author\",null,[[\"author\",\"isEditing\",\"saveAction\",\"deleteAction\"],[[19,0,[\"model\"]],[19,0,[\"globals\",\"isEditing\"]],\"saveAuthor\",\"deleteAuthor\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/author.hbs" } });
});
define("myapp/templates/authors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ep+NrrAy", "block": "{\"symbols\":[],\"statements\":[[4,\"blog-authors\",null,[[\"authors\",\"page\",\"perPage\",\"createAction\"],[[19,0,[\"model\"]],[19,0,[\"page\"]],[19,0,[\"perPage\"]],\"createAuthor\"]],{\"statements\":[[1,[18,\"outlet\"],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/authors.hbs" } });
});
define("myapp/templates/authors/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "T5D9Yimj", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"class\",\"text-warning\"],[7],[0,\"Select an author\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/authors/index.hbs" } });
});
define("myapp/templates/components/blog-author-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5Ks6FMJM", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[19,0,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"doneEditing\"]],[7],[0,\"Done\"],[8],[8],[0,\"\\n  \"],[6,\"p\"],[7],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\",\"class\"],[\"text\",[19,0,[\"author\",\"name\"]],\"Author name\",\"form-control\"]]],false],[8],[0,\"\\n\\n  \"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"deleteAuthor\"]],[7],[0,\"Delete\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[0,\"Edit\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-author-edit.hbs" } });
});
define("myapp/templates/components/blog-author", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uh7eBrXy", "block": "{\"symbols\":[\"post\"],\"statements\":[[1,[25,\"blog-author-edit\",null,[[\"author\",\"isEditing\",\"saveAction\",\"deleteAction\"],[[19,0,[\"author\"]],[19,0,[\"isEditing\"]],\"saveAction\",\"deleteAction\"]]],false],[0,\"\\n\\n\"],[6,\"h1\"],[7],[1,[20,[\"author\",\"name\"]],false],[8],[0,\"\\n\\nPosts by \"],[1,[20,[\"author\",\"name\"]],false],[0,\":\\n\"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"author\",\"posts\"]]],null,{\"statements\":[[4,\"link-to\",[\"post\",[19,1,[]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[7],[1,[19,1,[\"title\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-author.hbs" } });
});
define("myapp/templates/components/blog-authors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zrC+s9se", "block": "{\"symbols\":[\"author\",\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t  \"],[2,\" author listing \"],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-xs-5\"],[7],[0,\"\\n\\t\\t  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"createAuthor\"]],[7],[0,\"Create\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"table\"],[9,\"class\",\"table\"],[7],[0,\"\\n\\t\\t\\t\\t\"],[6,\"thead\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"tr\"],[7],[6,\"th\"],[7],[0,\"Authors\"],[8],[8],[0,\"\\n\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"pagedContent\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[6,\"tr\"],[7],[6,\"td\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"author\",[19,1,[]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t• \"],[1,[19,1,[\"name\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\"],[8],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\"],[1,[25,\"page-numbers\",null,[[\"content\"],[[19,0,[\"pagedContent\"]]]]],false],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\n\\t\\t\"],[2,\" author content \"],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-xs-7\"],[7],[0,\"\\n\\t\\t\\t\"],[11,2],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-authors.hbs" } });
});
define("myapp/templates/components/blog-post-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/cKbZuio", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[19,0,[\"isEditing\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"doneEditing\"]],[7],[0,\"Done\"],[8],[8],[0,\"\\n\\t\"],[6,\"p\"],[7],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[19,0,[\"post\",\"title\"]],\"form-control\",\"Post title\"]]],false],[8],[0,\"\\n\\t\"],[6,\"p\"],[7],[1,[25,\"ember-selectize\",null,[[\"content\",\"selection\",\"optionValuePath\",\"optionLabelPath\",\"placeholder\"],[[19,0,[\"authors\"]],[19,0,[\"post\",\"author\"]],\"content.id\",\"content.name\",\"Post author\"]]],false],[8],[0,\"\\n  \"],[6,\"p\"],[7],[1,[25,\"markdown-editor\",null,[[\"value\",\"placeholder\",\"rows\"],[[19,0,[\"post\",\"body\"]],\"Post content\",\"5\"]]],false],[8],[0,\"\\n\\n  \"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"deletePost\"],[[\"class\"],[\"btn btn-default\"]]],[7],[0,\"Delete\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\"],[6,\"p\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"edit\"]],[7],[0,\"Edit\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-post-edit.hbs" } });
});
define("myapp/templates/components/blog-post", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "n+S+D08l", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"blog-post-edit\",null,[[\"post\",\"authors\",\"isEditing\",\"saveAction\",\"deleteAction\"],[[19,0,[\"post\"]],[19,0,[\"authors\"]],[19,0,[\"isEditing\"]],\"saveAction\",\"deleteAction\"]]],false],[0,\"\\n\\n\"],[6,\"h1\"],[7],[1,[20,[\"post\",\"title\"]],false],[8],[0,\"\\n\"],[6,\"h2\"],[7],[0,\"by \"],[1,[20,[\"post\",\"author\",\"name\"]],false],[0,\" \"],[6,\"small\"],[9,\"class\",\"muted\"],[7],[0,\"(\"],[1,[25,\"format-date\",[[19,0,[\"post\",\"date\"]]],null],false],[0,\")\"],[8],[8],[0,\"\\n\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"intro\"],[7],[0,\"\\n\\t\"],[1,[25,\"format-markdown\",[[19,0,[\"post\",\"excerpt\"]]],null],false],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"below-the-fold\"],[7],[0,\"\\n\\t\"],[1,[25,\"format-markdown\",[[19,0,[\"post\",\"body\"]]],null],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-post.hbs" } });
});
define("myapp/templates/components/blog-posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JoafcwmR", "block": "{\"symbols\":[\"post\",\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n\\t\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-xs-5\"],[7],[0,\"\\n\\t\\t  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"createPost\"]],[7],[0,\"Create\"],[8],[0,\" \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"placeholder\",\"autofocus\",\"key-press\"],[\"text\",[19,0,[\"query\"]],\"Filter Posts\",\"autofocus\",\"resetPage\"]]],false],[0,\"\\n\\t\\t\\t\"],[6,\"table\"],[9,\"class\",\"table\"],[7],[0,\"\\n\\t\\t\\t\\t\"],[6,\"thead\"],[7],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"tr\"],[7],[6,\"th\"],[7],[0,\"Recent Posts\"],[8],[8],[0,\"\\n\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"pagedContent\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[6,\"tr\"],[7],[6,\"td\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"post\",[19,1,[]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\"],[1,[19,1,[\"title\"]],false],[0,\" \"],[6,\"small\"],[9,\"class\",\"muted\"],[7],[0,\"by \"],[1,[19,1,[\"author\",\"name\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\"],[8],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\t\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\"],[8],[0,\"\\n\\t\\t\\t\"],[1,[25,\"page-numbers\",null,[[\"content\"],[[19,0,[\"pagedContent\"]]]]],false],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\n\\t\\t\"],[6,\"div\"],[9,\"class\",\"col-xs-7\"],[7],[0,\"\\n\\t\\t\\t\"],[11,2],[0,\"\\n\\t\\t\"],[8],[0,\"\\n\\t\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/components/blog-posts.hbs" } });
});
define("myapp/templates/post", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "P7zuqvke", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"blog-post\",null,[[\"post\",\"authors\",\"isEditing\",\"saveAction\",\"deleteAction\"],[[19,0,[\"model\"]],[19,0,[\"posts\",\"authors\"]],[19,0,[\"globals\",\"isEditing\"]],\"savePost\",\"deletePost\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/post.hbs" } });
});
define("myapp/templates/posts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aHlZu1VV", "block": "{\"symbols\":[],\"statements\":[[4,\"blog-posts\",null,[[\"posts\",\"page\",\"perPage\",\"query\",\"createAction\"],[[19,0,[\"model\"]],[19,0,[\"page\"]],[19,0,[\"perPage\"]],[19,0,[\"query\"]],\"createPost\"]],{\"statements\":[[0,\"  \"],[1,[18,\"outlet\"],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/posts.hbs" } });
});
define("myapp/templates/posts/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5tXQgv0O", "block": "{\"symbols\":[],\"statements\":[[6,\"p\"],[9,\"class\",\"text-warning\"],[7],[0,\"Select a post\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "myapp/templates/posts/index.hbs" } });
});
define('myapp/transforms/attachment', ['exports', 'ember-pouch/transforms/attachment'], function (exports, _attachment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _attachment.default;
    }
  });
});
define('myapp/transforms/attachments', ['exports', 'ember-pouch/transforms/attachments'], function (exports, _attachments) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _attachments.default;
    }
  });
});


define('myapp/config/environment', ['ember'], function(Ember) {
  var prefix = 'myapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("myapp/app")["default"].create({"name":"myapp","version":"0.0.0+"});
}
//# sourceMappingURL=myapp.map
