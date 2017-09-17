define('ember-cli-pagination/factory', ['exports', 'ember', 'ember-cli-pagination/remote/controller-mixin', 'ember-cli-pagination/local/controller-local-mixin', 'ember-cli-pagination/remote/route-mixin', 'ember-cli-pagination/local/route-local-mixin'], function (exports, _ember, _emberCliPaginationRemoteControllerMixin, _emberCliPaginationLocalControllerLocalMixin, _emberCliPaginationRemoteRouteMixin, _emberCliPaginationLocalRouteLocalMixin) {

  var Factory = _ember['default'].Object.extend({
    paginationTypeInner: function paginationTypeInner() {
      var res = this.get('config').paginationType;
      if (res) {
        return res;
      }
      var ops = this.get('config').pagination;
      if (ops) {
        return ops.type;
      }
      return null;
    },

    paginationType: function paginationType() {
      var res = this.paginationTypeInner();
      if (!(res === "local" || res === "remote")) {
        throw "unknown pagination type";
      }
      return res;
    },

    controllerMixin: function controllerMixin() {
      return ({
        local: _emberCliPaginationLocalControllerLocalMixin['default'],
        remote: _emberCliPaginationRemoteControllerMixin['default']
      })[this.paginationType()];
    },

    routeMixin: function routeMixin() {
      return ({
        local: _emberCliPaginationLocalRouteLocalMixin['default'],
        remote: _emberCliPaginationRemoteRouteMixin['default']
      })[this.paginationType()];
    }
  });

  Factory.reopenClass({
    controllerMixin: function controllerMixin(config) {
      return Factory.create({ config: config }).controllerMixin();
    },
    routeMixin: function routeMixin(config) {
      return Factory.create({ config: config }).routeMixin();
    }
  });

  exports['default'] = Factory;
});