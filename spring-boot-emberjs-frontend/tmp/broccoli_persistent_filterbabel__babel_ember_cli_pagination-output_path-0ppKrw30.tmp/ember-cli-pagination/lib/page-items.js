define('ember-cli-pagination/lib/page-items', ['exports', 'ember', 'ember-cli-pagination/util', 'ember-cli-pagination/lib/truncate-pages', 'ember-cli-pagination/util/safe-get'], function (exports, _ember, _emberCliPaginationUtil, _emberCliPaginationLibTruncatePages, _emberCliPaginationUtilSafeGet) {
  exports['default'] = _ember['default'].Object.extend(_emberCliPaginationUtilSafeGet['default'], {
    pageItemsAll: _ember['default'].computed("currentPage", "totalPages", function () {
      var currentPage = this.getInt("currentPage");
      var totalPages = this.getInt("totalPages");
      _emberCliPaginationUtil['default'].log('PageNumbers#pageItems, currentPage ' + currentPage + ', totalPages ' + totalPages);

      var res = _ember['default'].A([]);

      for (var i = 1; i <= totalPages; i++) {
        res.push({
          page: i,
          current: currentPage === i,
          dots: false
        });
      }
      return res;
    }),
    //

    pageItemsTruncated: _ember['default'].computed('currentPage', 'totalPages', 'numPagesToShow', 'showFL', function () {
      var currentPage = this.getInt('currentPage');
      var totalPages = this.getInt("totalPages");
      var toShow = this.getInt('numPagesToShow');
      var showFL = this.get('showFL');

      var t = _emberCliPaginationLibTruncatePages['default'].create({ currentPage: currentPage, totalPages: totalPages,
        numPagesToShow: toShow,
        showFL: showFL });
      var pages = t.get('pagesToShow');
      var next = pages[0];

      return pages.map(function (page) {
        var h = {
          page: page,
          current: currentPage === page,
          dots: next !== page
        };
        next = page + 1;
        return h;
      });
    }),

    pageItems: _ember['default'].computed('currentPage', 'totalPages', 'truncatePages', 'numPagesToShow', function () {
      if (this.get('truncatePages')) {
        return this.get('pageItemsTruncated');
      } else {
        return this.get('pageItemsAll');
      }
    })
  });
});