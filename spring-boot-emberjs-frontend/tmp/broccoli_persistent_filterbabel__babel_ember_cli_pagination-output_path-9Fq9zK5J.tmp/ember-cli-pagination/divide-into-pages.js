define('ember-cli-pagination/divide-into-pages', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
    objsForPage: function objsForPage(page) {
      var range = this.range(page);
      var all = _ember['default'].A(this.get('all'));
      return _ember['default'].A(all.slice(range.start, range.end + 1));
    },

    totalPages: function totalPages() {
      var allLength = parseInt(this.get('all.length'));
      var perPage = parseInt(this.get('perPage'));
      return Math.ceil(allLength / perPage);
    },

    range: function range(page) {
      var perPage = parseInt(this.get('perPage'));
      var s = (parseInt(page) - 1) * perPage;
      var e = s + perPage - 1;

      return { start: s, end: e };
    }
  });
});