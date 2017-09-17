define('ember-cli-filter-by-query/util/filter', ['exports', 'ember'], function (exports, _ember) {
  /*global Sifter*/

  var filterByQuery = function filterByQuery(array, propertyKeys, query, options) {

    if (!query) {
      return _ember['default'].A(array);
    }

    options = _ember['default'].typeOf(options) === 'undefined' ? {} : options;
    propertyKeys = _ember['default'].makeArray(propertyKeys);
    var input, sifter, result, sort;
    sort = 'sort' in options ? options.sort : true;
    delete options['sort'];

    input = array.map(function (item) {
      var hash = {};
      propertyKeys.forEach(function (key) {
        hash[key] = _ember['default'].get(item, key);
      });
      return hash;
    });

    options.fields = options.fields || propertyKeys;
    options.limit = options.limit || array.length;
    if (sort) {
      options.sort = propertyKeys.map(function (key) {
        return { field: key, direction: 'asc' };
      });
    }

    sifter = new Sifter(input);
    if (!sort) {
      sifter.getSortFunction = function () {
        return null;
      };
    }
    result = sifter.search(query, options);

    return _ember['default'].A(result.items.map(function (item) {
      return _ember['default'].A(array).objectAt(item.id);
    }));
  };

  exports['default'] = filterByQuery;
});