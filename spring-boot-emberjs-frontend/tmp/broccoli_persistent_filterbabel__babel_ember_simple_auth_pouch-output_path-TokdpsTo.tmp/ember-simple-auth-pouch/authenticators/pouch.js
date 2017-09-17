define('ember-simple-auth-pouch/authenticators/pouch', ['exports', 'ember-simple-auth/authenticators/base', 'ember'], function (exports, _emberSimpleAuthAuthenticatorsBase, _ember) {
  var getOwner = _ember['default'].getOwner;
  exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
    store: _ember['default'].inject.service(),

    init: function init() {
      this._super.apply(this, arguments);

      this.db = this.getDb();
    },

    getDb: function getDb() {
      var config = getOwner(this).resolveRegistration('config:environment');

      //let the user override the default adapter
      var pouchAdapterName = config.authAdapter || 'application';

      var pouchAdapter = this.get('store').adapterFor(pouchAdapterName);

      _ember['default'].assert('You must have an ember-pouch adapter setup for authentication', pouchAdapter);

      return pouchAdapter.db;
    },

    restore: function restore(data) {
      var self = this;
      return this.db.getSession().then(function (resp) {
        var result = null;
        if (!_ember['default'].isEmpty(data.name) && resp.userCtx.name === data.name) {
          result = resp.userCtx;
          self.db.emit('loggedin');
        } else {
          result = _ember['default'].RSVP.reject("Not logged in or incorrect user in cookie");
        }

        return result;
      });
    },

    authenticate: function authenticate(username, password) {
      var self = this;
      return this.db.login(username, password).then(function () {
        return self.db.getSession().then(function (resp) {
          self.db.emit('loggedin');
          return resp.userCtx;
        });
      });
    },

    invalidate: function invalidate() {
      this.db.emit('loggedout');
      return this.db.logout();
    }
  });
});