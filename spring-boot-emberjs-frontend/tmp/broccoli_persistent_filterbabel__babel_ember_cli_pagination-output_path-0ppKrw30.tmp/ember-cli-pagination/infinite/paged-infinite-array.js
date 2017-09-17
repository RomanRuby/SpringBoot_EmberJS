define('ember-cli-pagination/infinite/paged-infinite-array', ['exports', 'ember', 'ember-cli-pagination/local/paged-array'], function (exports, _ember, _emberCliPaginationLocalPagedArray) {
  // import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

  var toArray = function toArray(a) {
    var res = [];
    if (a.forEach) {
      a.forEach(function (obj) {
        res.push(obj);
      });
    } else {
      res = a;
    }
    return res;
  };

  var pushPromiseObjects = function pushPromiseObjects(base, promise) {
    if (!base) {
      throw "pushPromiseObjects no base";
    }
    if (!promise) {
      throw "pushPromiseObjects no promise";
    }

    if (!promise.then) {
      throw "pushPromiseObjects no promise.then";
    }

    if (!base.pushObjects) {
      throw "pushPromiseObjects no base.pushObjects";
    }

    promise.then(function (r) {
      base.pushObjects(toArray(r));
    });
    return promise;
  };

  var InfiniteBase = _ember['default'].ArrayProxy.extend({
    page: 1,

    arrangedContent: _ember['default'].computed('content.[]', function () {
      return this.get('content');
    }),

    init: function init() {
      this.set('content', _ember['default'].A([]));
      this.addRecordsForPage(1);
    },

    loadNextPage: function loadNextPage() {
      this.incrementProperty('page');
      var page = this.get('page');
      return this.addRecordsForPage(page);
    },

    addRecordsForPage: function addRecordsForPage(page) {
      var arr = this.getRecordsForPage(page);
      return pushPromiseObjects(this.get('content'), arr);
    },

    getRecordsForPage: function getRecordsForPage() /* page */{
      throw "Not Implemented";
    }
  });

  var c = InfiniteBase.extend({
    getRecordsForPage: function getRecordsForPage(page) {
      var c = this.get('all');
      c.set('page', page);
      return c;
    },

    then: function then(f, f2) {
      return this.get('all').then(f, f2);
    }
  });

  c.reopenClass({
    createFromUnpaged: function createFromUnpaged(ops) {
      var unpaged = _ember['default'].A(ops.all);
      var perPage = ops.perPage || 10;
      var paged = _emberCliPaginationLocalPagedArray['default'].create({ perPage: perPage, content: unpaged });
      return this.create({ all: paged });
    }
  });

  exports['default'] = c;
});