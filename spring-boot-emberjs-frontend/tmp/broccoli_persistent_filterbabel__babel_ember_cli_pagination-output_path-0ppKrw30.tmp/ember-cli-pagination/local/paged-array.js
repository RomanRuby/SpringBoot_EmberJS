define('ember-cli-pagination/local/paged-array', ['exports', 'ember', 'ember-cli-pagination/util', 'ember-cli-pagination/divide-into-pages', 'ember-cli-pagination/watch/lock-to-range'], function (exports, _ember, _emberCliPaginationUtil, _emberCliPaginationDivideIntoPages, _emberCliPaginationWatchLockToRange) {
  exports['default'] = _ember['default'].ArrayProxy.extend(_ember['default'].Evented, {
    page: 1,
    perPage: 10,

    divideObj: function divideObj() {
      return _emberCliPaginationDivideIntoPages['default'].create({
        perPage: this.get('perPage'),
        all: this.get('content')
      });
    },

    arrangedContent: _ember['default'].computed("content.[]", "page", "perPage", function () {
      return this.divideObj().objsForPage(this.get('page'));
    }),

    totalPages: _ember['default'].computed("content.[]", "perPage", function () {
      return this.divideObj().totalPages();
    }),

    setPage: function setPage(page) {
      _emberCliPaginationUtil['default'].log("setPage " + page);
      return this.set('page', page);
    },

    watchPage: _ember['default'].observer('page', 'totalPages', function () {
      var page = this.get('page');
      var totalPages = this.get('totalPages');

      this.trigger('pageChanged', page);

      if (page < 1 || page > totalPages) {
        this.trigger('invalidPage', { page: page, totalPages: totalPages, array: this });
      }
    }),

    then: function then(success, failure) {
      var content = _ember['default'].A(this.get('content'));
      var me = this;
      var promise;

      if (content.then) {
        promise = content.then(function () {
          success(me);
        }, failure);
      } else {
        promise = new _ember['default'].RSVP.Promise(function (resolve) {
          resolve(success(me));
        });
      }

      return promise;
    },

    lockToRange: function lockToRange() {
      _emberCliPaginationWatchLockToRange['default'].watch(this);
    }
  });
});