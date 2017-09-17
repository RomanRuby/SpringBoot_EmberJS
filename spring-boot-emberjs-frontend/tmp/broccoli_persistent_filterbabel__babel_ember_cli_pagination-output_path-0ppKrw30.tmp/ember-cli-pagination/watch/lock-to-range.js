define('ember-cli-pagination/watch/lock-to-range', ['exports'], function (exports) {
  exports['default'] = {
    watch: function watch(paged) {
      paged.on('invalidPage', function (event) {
        if (event.page < 1) {
          paged.set('page', 1);
        } else if (event.page > event.totalPages) {
          paged.set('page', event.totalPages);
        }
      });
    }
  };
});