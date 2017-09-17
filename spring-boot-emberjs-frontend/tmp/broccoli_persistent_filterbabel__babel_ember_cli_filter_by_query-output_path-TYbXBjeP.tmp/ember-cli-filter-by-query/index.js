define('ember-cli-filter-by-query/index', ['exports', 'ember', 'ember-cli-filter-by-query/util/filter'], function (exports, _ember, _emberCliFilterByQueryUtilFilter) {

  var computedFilterByQuery = function computedFilterByQuery(dependentKey, propertyKeys, queryKey, options) {
    propertyKeys = _ember['default'].makeArray(propertyKeys);

    return _ember['default'].computed(queryKey, '' + dependentKey + '.@each.{' + propertyKeys.join(',') + '}', function () {

      var array = this.get(dependentKey);
      var query = this.get(queryKey) || '';

      return (0, _emberCliFilterByQueryUtilFilter['default'])(array, propertyKeys, query, options);
    });
  };

  exports['default'] = computedFilterByQuery;
});