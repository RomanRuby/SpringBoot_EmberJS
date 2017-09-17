define('ember-cli-pagination/util', ['exports', 'ember'], function (exports, _ember) {

  var Util = _ember['default'].Object.extend();

  Util.reopenClass({
    log: function log() {},

    isBlank: function isBlank(obj) {
      if (obj === 0) {
        return false;
      }
      return !obj || obj === "";
    },

    keysOtherThan: function keysOtherThan(params, excludeKeys) {
      excludeKeys = _ember['default'].A(excludeKeys);
      var res = [];
      for (var key in params) {
        if (!excludeKeys.includes(key)) {
          res.push(key);
        }
      }
      return res;
    },

    paramsOtherThan: function paramsOtherThan(params, excludeKeys) {
      var res = {};
      var keys = this.keysOtherThan(params, excludeKeys);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = params[key];
        res[key] = val;
      }
      return res;
    },

    mergeHashes: function mergeHashes(a, b) {
      var res = {};
      var val;
      var key;

      for (key in a) {
        val = a[key];
        res[key] = val;
      }

      for (key in b) {
        val = b[key];
        res[key] = val;
      }

      return res;
    },

    isFunction: function isFunction(obj) {
      return typeof obj === 'function';
    },

    getHashKeyForValue: function getHashKeyForValue(hash, targetVal) {
      for (var k in hash) {
        var val = hash[k];
        if (val === targetVal) {
          return k;
        } else if (Util.isFunction(targetVal) && targetVal(val)) {
          return k;
        }
      }
      return undefined;
    }
  });

  exports['default'] = Util;
});