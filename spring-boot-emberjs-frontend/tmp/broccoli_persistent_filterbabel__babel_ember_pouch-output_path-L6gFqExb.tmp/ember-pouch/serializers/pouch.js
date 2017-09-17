define('ember-pouch/serializers/pouch', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get,
      getOwner = Ember.getOwner;

  var keys = Object.keys || Ember.keys;
  var assign = Object.assign || Ember.assign;

  var Serializer = _emberData.default.RESTSerializer.extend({

    init: function init() {
      this._super.apply(this, arguments);

      var config = getOwner(this).resolveRegistration('config:environment');
      this.dontsavedefault = config['emberpouch'] && config['emberpouch']['dontsavehasmany'];
    },

    _getDontsave: function _getDontsave(relationship) {
      return !Ember.isEmpty(relationship.options.dontsave) ? relationship.options.dontsave : this.dontsavedefault;
    },


    shouldSerializeHasMany: function shouldSerializeHasMany(snapshot, key, relationship) {
      var dontsave = this._getDontsave(relationship);
      var result = !dontsave;
      return result;
    },

    serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
      if (this._shouldSerializeHasMany(snapshot, relationship.key, relationship)) {
        this._super.apply(this, arguments);

        var key = relationship.key;

        if (!json[key]) {
          json[key] = [];
        }
      }
    },
    _isAttachment: function _isAttachment(attribute) {
      return ['attachment', 'attachments'].indexOf(attribute.type) !== -1;
    },
    serializeAttribute: function serializeAttribute(snapshot, json, key, attribute) {
      this._super(snapshot, json, key, attribute);
      if (this._isAttachment(attribute)) {
        // if provided, use the mapping provided by `attrs` in the serializer
        var payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key && this.keyForAttribute) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        // Merge any attachments in this attribute into the `attachments` property.
        // relational-pouch will put these in the special CouchDB `_attachments` property
        // of the document.
        // This will conflict with any 'attachments' attr in the model. Suggest that
        // #toRawDoc in relational-pouch should allow _attachments to be specified
        json.attachments = assign({}, json.attachments || {}, json[payloadKey]); // jshint ignore:line
        json[payloadKey] = keys(json[payloadKey]).reduce(function (attr, fileName) {
          attr[fileName] = assign({}, json[payloadKey][fileName]); // jshint ignore:line
          delete attr[fileName].data;
          delete attr[fileName].content_type;
          return attr;
        }, {});
      }
    },
    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var _this = this;

      var attributes = this._super(modelClass, resourceHash);
      var modelAttrs = get(modelClass, 'attributes');
      modelClass.eachTransformedAttribute(function (key) {
        var attribute = modelAttrs.get(key);
        if (_this._isAttachment(attribute)) {
          // put the corresponding _attachments entries from the response into the attribute
          var fileNames = keys(attributes[key]);
          fileNames.forEach(function (fileName) {
            attributes[key][fileName] = resourceHash.attachments[fileName];
          });
        }
      });
      return attributes;
    },
    extractRelationships: function extractRelationships(modelClass) {
      var _this2 = this;

      var relationships = this._super.apply(this, arguments);

      modelClass.eachRelationship(function (key, relationshipMeta) {
        if (relationshipMeta.kind === 'hasMany' && _this2._getDontsave(relationshipMeta) && !!relationshipMeta.options.async) {
          relationships[key] = { links: { related: key } };
        }
      });

      return relationships;
    }
  });

  // DEPRECATION: The private method _shouldSerializeHasMany has been promoted to the public API
  // See https://www.emberjs.com/deprecations/ember-data/v2.x/#toc_jsonserializer-shouldserializehasmany
  if (!_emberData.default.JSONSerializer.prototype.shouldSerializeHasMany) {
    Serializer.reopen({
      _shouldSerializeHasMany: function _shouldSerializeHasMany(snapshot, key, relationship) {
        return this.shouldSerializeHasMany(snapshot, key, relationship);
      }
    });
  }

  exports.default = Serializer;
});