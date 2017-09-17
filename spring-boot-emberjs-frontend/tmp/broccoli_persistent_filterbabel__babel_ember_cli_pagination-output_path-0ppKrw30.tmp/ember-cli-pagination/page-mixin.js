define('ember-cli-pagination/page-mixin', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    getPage: function getPage() {
      return parseInt(this.get('page') || 1);
    },

    getPerPage: function getPerPage() {
      return parseInt(this.get('perPage'));
    }
  });
});