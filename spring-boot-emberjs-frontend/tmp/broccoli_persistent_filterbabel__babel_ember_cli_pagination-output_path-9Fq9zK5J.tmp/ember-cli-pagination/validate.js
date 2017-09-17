define('ember-cli-pagination/validate', ['exports', 'ember'], function (exports, _ember) {

  var Validate = _ember['default'].Object.extend();

  Validate.reopenClass({
    internalErrors: [],

    internalError: function internalError(str, obj) {
      this.internalErrors.push(str);
      _ember['default'].Logger.warn(str);
      if (obj) {
        _ember['default'].Logger.warn(obj);
      }
    },

    getLastInternalError: function getLastInternalError() {
      return this.internalErrors[this.internalErrors.length - 1];
    }
  });

  exports['default'] = Validate;
});