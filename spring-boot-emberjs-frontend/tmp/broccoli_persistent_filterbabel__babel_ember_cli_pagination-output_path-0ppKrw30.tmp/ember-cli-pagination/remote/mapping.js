define('ember-cli-pagination/remote/mapping', ['exports', 'ember', 'ember-cli-pagination/validate', 'ember-cli-pagination/util'], function (exports, _ember, _emberCliPaginationValidate, _emberCliPaginationUtil) {
  var QueryParamsForBackend = _ember['default'].Object.extend({
    defaultKeyFor: function defaultKeyFor(key) {
      if (key === 'perPage') {
        return 'per_page';
      }
      return null;
    },

    paramKeyFor: function paramKeyFor(key) {
      return this.getSuppliedParamMapping(key) || this.defaultKeyFor(key) || key;
    },

    getSuppliedParamMapping: function getSuppliedParamMapping(key) {
      var h = this.get('paramMapping') || {};
      return h[key];
    },

    accumParams: function accumParams(key, accum) {
      var val = this.get(key);
      var mappedKey = this.paramKeyFor(key);

      if (Array.isArray(mappedKey)) {
        this.accumParamsComplex(key, mappedKey, accum);
      } else {
        accum[mappedKey] = val;
      }
    },

    accumParamsComplex: function accumParamsComplex(key, mapArr, accum) {
      var mappedKey = mapArr[0];
      var mapFunc = mapArr[1];

      var val = mapFunc({ page: this.get('page'), perPage: this.get('perPage') });
      accum[mappedKey] = val;
    },

    make: function make() {
      var res = {};

      this.accumParams('page', res);
      this.accumParams('perPage', res);

      return res;
    }
  });

  exports.QueryParamsForBackend = QueryParamsForBackend;
  var ChangeMeta = _ember['default'].Object.extend({
    getSuppliedParamMapping: function getSuppliedParamMapping(targetVal) {
      var h = this.get('paramMapping') || {};

      // have to do this gross thing because mapping looks like this:
      // {total_pages: ['num_pages',function() ...]}
      //
      // but the way the code works, we need to check for an entry where val[0] == num_pages
      // and then return ['total_pages',function() ...]
      //
      // Gross, but that's how it's working for now
      for (var key in h) {
        var val = h[key];
        if (targetVal === val) {
          return key;
        } else if (Array.isArray(val) && val[0] === targetVal) {
          return [key, val[1]];
        }
      }

      return null;
    },

    finalKeyFor: function finalKeyFor(key) {
      return this.getSuppliedParamMapping(key) || key;
    },

    makeSingleComplex: function makeSingleComplex(key, mapArr, rawVal, accum) {
      var mappedKey = mapArr[0];
      var mapFunc = mapArr[1];

      var ops = { rawVal: rawVal, page: this.get('page'), perPage: this.get('perPage') };
      var mappedVal = mapFunc(ops);
      accum[mappedKey] = mappedVal;
    },

    make: function make() {
      var res = {};
      var meta = this.get('meta');

      for (var key in meta) {
        var mappedKey = this.finalKeyFor(key);
        var val = meta[key];

        if (Array.isArray(mappedKey)) {
          this.makeSingleComplex(key, mappedKey, val, res);
        } else {
          res[mappedKey] = val;
        }
      }

      this.validate(res);

      return res;
    },

    validate: function validate(meta) {
      if (_emberCliPaginationUtil['default'].isBlank(meta.total_pages)) {
        _emberCliPaginationValidate['default'].internalError("no total_pages in meta response", meta);
      }
    }
  });
  exports.ChangeMeta = ChangeMeta;
});