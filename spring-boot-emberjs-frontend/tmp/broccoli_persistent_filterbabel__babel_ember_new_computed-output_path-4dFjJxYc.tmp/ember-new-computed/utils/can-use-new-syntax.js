define('ember-new-computed/utils/can-use-new-syntax', ['exports', 'ember'], function (exports, _ember) {
  var supportsSetterGetter;

  try {
    _ember['default'].computed({
      set: function set() {},
      get: function get() {}
    });
    supportsSetterGetter = true;
  } catch (e) {
    supportsSetterGetter = false;
  }

  exports['default'] = supportsSetterGetter;
});