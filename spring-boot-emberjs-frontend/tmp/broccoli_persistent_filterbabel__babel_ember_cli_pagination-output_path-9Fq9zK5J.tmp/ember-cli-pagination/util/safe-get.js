define('ember-cli-pagination/util/safe-get', ['exports', 'ember', 'ember-cli-pagination/validate', 'ember-cli-pagination/util'], function (exports, _ember, _emberCliPaginationValidate, _emberCliPaginationUtil) {
  exports['default'] = _ember['default'].Mixin.create({
    getInt: function getInt(prop) {
      var raw = this.get(prop);
      if (raw === 0 || raw === "0") {
        // do nothing
      } else if (_emberCliPaginationUtil['default'].isBlank(raw)) {
          _emberCliPaginationValidate['default'].internalError("no int for " + prop + " val is " + raw);
        }
      return parseInt(raw);
    }
  });
});