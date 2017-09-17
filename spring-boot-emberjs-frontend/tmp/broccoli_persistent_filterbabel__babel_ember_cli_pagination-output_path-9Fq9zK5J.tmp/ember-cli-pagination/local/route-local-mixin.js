define('ember-cli-pagination/local/route-local-mixin', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    findPaged: function findPaged(name) {
      return this.get('store').find(name);
    }
  });
});