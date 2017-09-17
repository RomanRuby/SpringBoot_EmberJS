define('ember-pouch/index', ['exports', 'ember-pouch/model', 'ember-pouch/adapters/pouch', 'ember-pouch/serializers/pouch'], function (exports, _model, _pouch, _pouch2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Serializer = exports.Adapter = exports.Model = undefined;
  exports.Model = _model.default;
  exports.Adapter = _pouch.default;
  exports.Serializer = _pouch2.default;
});