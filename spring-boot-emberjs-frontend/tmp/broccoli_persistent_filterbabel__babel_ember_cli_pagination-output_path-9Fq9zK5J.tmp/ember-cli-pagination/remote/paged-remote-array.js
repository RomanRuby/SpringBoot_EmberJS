define('ember-cli-pagination/remote/paged-remote-array', ['exports', 'ember', 'ember-cli-pagination/util', 'ember-cli-pagination/watch/lock-to-range', 'ember-cli-pagination/remote/mapping', 'ember-cli-pagination/page-mixin'], function (exports, _ember, _emberCliPaginationUtil, _emberCliPaginationWatchLockToRange, _emberCliPaginationRemoteMapping, _emberCliPaginationPageMixin) {

  var ArrayProxyPromiseMixin = _ember['default'].Mixin.create(_ember['default'].PromiseProxyMixin, {
    then: function then(success, failure) {
      var promise = this.get('promise');
      var me = this;

      return promise.then(function () {
        success(me);
      }, failure);
    }
  });

  exports['default'] = _ember['default'].ArrayProxy.extend(_emberCliPaginationPageMixin['default'], _ember['default'].Evented, ArrayProxyPromiseMixin, {
    page: 1,
    paramMapping: _ember['default'].computed(function () {
      return {};
    }),
    contentUpdated: 0,

    init: function init() {
      var initCallback = this.get('initCallback');
      if (initCallback) {
        initCallback(this);
      }

      this.addArrayObserver({
        arrayWillChange: function arrayWillChange(me) {
          me.trigger('contentWillChange');
        },
        arrayDidChange: function arrayDidChange(me) {
          me.incrementProperty('contentUpdated');
          me.trigger('contentUpdated');
        }
      });

      try {
        this.get('promise');
      } catch (e) {
        this.set('promise', this.fetchContent());
      }
    },

    addParamMapping: function addParamMapping(key, mappedKey, mappingFunc) {
      var paramMapping = this.get('paramMapping') || {};
      if (mappingFunc) {
        paramMapping[key] = [mappedKey, mappingFunc];
      } else {
        paramMapping[key] = mappedKey;
      }
      this.set('paramMapping', paramMapping);
      this.incrementProperty('paramsForBackendCounter');
      //this.pageChanged();
    },

    addQueryParamMapping: function addQueryParamMapping(key, mappedKey, mappingFunc) {
      return this.addParamMapping(key, mappedKey, mappingFunc);
    },

    addMetaResponseMapping: function addMetaResponseMapping(key, mappedKey, mappingFunc) {
      return this.addParamMapping(key, mappedKey, mappingFunc);
    },

    paramsForBackend: _ember['default'].computed('page', 'perPage', 'paramMapping', 'paramsForBackendCounter', function () {
      var paramsObj = _emberCliPaginationRemoteMapping.QueryParamsForBackend.create({ page: this.getPage(),
        perPage: this.getPerPage(),
        paramMapping: this.get('paramMapping') });
      var ops = paramsObj.make();

      // take the otherParams hash and add the values at the same level as page/perPage
      ops = _emberCliPaginationUtil['default'].mergeHashes(ops, this.get('otherParams') || {});

      return ops;
    }),

    rawFindFromStore: function rawFindFromStore() {
      var store = this.get('store');
      var modelName = this.get('modelName');

      var ops = this.get('paramsForBackend');
      var res = store.query(modelName, ops);

      return res;
    },

    fetchContent: function fetchContent() {
      this.set("loading", true);
      var res = this.rawFindFromStore();
      this.incrementProperty("numRemoteCalls");
      var me = this;

      res.then(function (rows) {
        var metaObj = _emberCliPaginationRemoteMapping.ChangeMeta.create({ paramMapping: me.get('paramMapping'),
          meta: rows.meta,
          page: me.getPage(),
          perPage: me.getPerPage() });

        me.set("loading", false);
        return me.set("meta", metaObj.make());
      }, function (error) {
        _emberCliPaginationUtil['default'].log("PagedRemoteArray#fetchContent error " + error);
        me.set("loading", false);
      });

      return res;
    },

    totalPages: _ember['default'].computed.alias("meta.total_pages"),

    lastPage: null,

    pageChanged: _ember['default'].observer("page", "perPage", function () {
      var page = this.get('page');
      var lastPage = this.get('lastPage');
      if (lastPage != page) {
        this.set('lastPage', page);
        this.set("promise", this.fetchContent());
      }
    }),

    lockToRange: function lockToRange() {
      _emberCliPaginationWatchLockToRange['default'].watch(this);
    },

    watchPage: _ember['default'].observer('page', 'totalPages', function () {
      var page = this.get('page');
      var totalPages = this.get('totalPages');
      if (parseInt(totalPages) <= 0) {
        return;
      }

      this.trigger('pageChanged', page);

      if (page < 1 || page > totalPages) {
        this.trigger('invalidPage', { page: page, totalPages: totalPages, array: this });
      }
    }),

    setOtherParam: function setOtherParam(k, v) {
      if (!this.get('otherParams')) {
        this.set('otherParams', {});
      }

      this.get('otherParams')[k] = v;
      this.incrementProperty('paramsForBackendCounter');
      _ember['default'].run.once(this, "pageChanged");
    }
  });
});