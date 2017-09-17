define('ember-cli-pagination/computed/paged-array', ['exports', 'ember', 'ember-cli-pagination/local/paged-array', 'ember-cli-pagination/infinite/paged-infinite-array'], function (exports, _ember, _emberCliPaginationLocalPagedArray, _emberCliPaginationInfinitePagedInfiniteArray) {

  function makeLocal(contentProperty, ops) {
    return _ember['default'].computed("", function () {
      var pagedOps = {
        parent: this,
        content: _ember['default'].computed.alias('parent.' + contentProperty)
      };

      // update the old binding method to the new alias method
      // converts {pageBinding: 'page'} to {page: Ember.computed.alias('parent.page')}
      for (var key in ops) {
        if (ops.hasOwnProperty(key)) {
          var alias = key.replace(/Binding$/, '');
          var value = ops[key];
          if (alias !== key) {
            pagedOps[alias] = _ember['default'].computed.alias('parent.' + value);
            _ember['default'].deprecate('Using Binding is deprecated, use Ember.computed.alias or Ember.computed.oneWay instead', false, {
              id: 'addon.ember-cli-pagination.paged-array',
              until: '3.0.0',
              url: 'http://emberjs.com/deprecations/v2.x#toc_ember-binding' // @TODO change this to our changelog entry
            });
            // ^ deprecation warning based off of https://github.com/emberjs/ember.js/pull/13920/files
          } else {
              pagedOps[key] = value;
            }
        }
      }

      var paged = _emberCliPaginationLocalPagedArray['default'].create(pagedOps);

      // paged.lockToRange();
      return paged;
    });
  }

  function makeInfiniteWithPagedSource(contentProperty /*, ops */) {
    return _ember['default'].computed(contentProperty, function () {
      return _emberCliPaginationInfinitePagedInfiniteArray['default'].create({ all: this.get(contentProperty) });
    });
  }

  function makeInfiniteWithUnpagedSource(contentProperty, ops) {
    return _ember['default'].computed(contentProperty, function () {
      var all = this.get(contentProperty);
      if (all) {
        all = _ember['default'].A(all);
      }
      ops.all = all;
      return _emberCliPaginationInfinitePagedInfiniteArray['default'].createFromUnpaged(ops);
    });
  }

  exports['default'] = function (contentProperty, ops) {
    ops = ops || {};

    if (ops.infinite === true) {
      return makeInfiniteWithPagedSource(contentProperty, ops);
    } else if (ops.infinite) {
      return makeInfiniteWithUnpagedSource(contentProperty, ops);
    } else {
      return makeLocal(contentProperty, ops);
    }
  };
});