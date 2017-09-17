define('ember-pouch/adapters/pouch', ['exports', 'ember-data', 'ember-pouch/utils'], function (exports, _emberData, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var getOwner = Ember.getOwner,
      bind = Ember.run.bind,
      on = Ember.on,
      _Ember$String = Ember.String,
      pluralize = _Ember$String.pluralize,
      camelize = _Ember$String.camelize,
      classify = _Ember$String.classify;
  exports.default = _emberData.default.RESTAdapter.extend({
    coalesceFindRequests: false,

    // The change listener ensures that individual records are kept up to date
    // when the data in the database changes. This makes ember-data 2.0's record
    // reloading redundant.
    shouldReloadRecord: function shouldReloadRecord() {
      return false;
    },
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
      return false;
    },
    _onInit: on('init', function () {
      this._startChangesToStoreListener();
    }),
    _startChangesToStoreListener: function _startChangesToStoreListener() {
      var db = this.get('db');
      if (db) {
        this.changes = db.changes({
          since: 'now',
          live: true,
          returnDocs: false
        }).on('change', bind(this, 'onChange'));
      }
    },
    changeDb: function changeDb(db) {
      if (this.changes) {
        this.changes.cancel();
      }

      var store = this.store;
      var schema = this._schema || [];

      for (var i = 0, len = schema.length; i < len; i++) {
        store.unloadAll(schema[i].singular);
      }

      this._schema = null;
      this.set('db', db);
      this._startChangesToStoreListener();
    },
    onChange: function onChange(change) {
      // If relational_pouch isn't initialized yet, there can't be any records
      // in the store to update.
      if (!this.get('db').rel) {
        return;
      }

      var obj = this.get('db').rel.parseDocID(change.id);
      // skip changes for non-relational_pouch docs. E.g., design docs.
      if (!obj.type || !obj.id || obj.type === '') {
        return;
      }

      var store = this.store;

      if (this.waitingForConsistency[change.id]) {
        var promise = this.waitingForConsistency[change.id];
        delete this.waitingForConsistency[change.id];
        if (change.deleted) {
          promise.reject("deleted");
        } else {
          promise.resolve(this._findRecord(obj.type, obj.id));
        }
        return;
      }

      try {
        store.modelFor(obj.type);
      } catch (e) {
        // The record refers to a model which this version of the application
        // does not have.
        return;
      }

      var recordInStore = store.peekRecord(obj.type, obj.id);
      if (!recordInStore) {
        // The record hasn't been loaded into the store; no need to reload its data.
        this.unloadedDocumentChanged(obj);
        return;
      }
      if (!recordInStore.get('isLoaded') || recordInStore.get('hasDirtyAttributes')) {
        // The record either hasn't loaded yet or has unpersisted local changes.
        // In either case, we don't want to refresh it in the store
        // (and for some substates, attempting to do so will result in an error).
        return;
      }

      if (change.deleted) {
        store.unloadRecord(recordInStore);
      } else {
        recordInStore.reload();
      }
    },

    unloadedDocumentChanged: function unloadedDocumentChanged() /* obj */{
      /*
       * For performance purposes, we don't load records into the store that haven't previously been loaded.
       * If you want to change this, subclass this method, and push the data into the store. e.g.
       *
       *  let store = this.get('store');
       *  let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
       *  this.get('db').rel.find(recordTypeName, obj.id).then(function(doc){
       *    store.pushPayload(recordTypeName, doc);
       *  });
       */
    },

    willDestroy: function willDestroy() {
      if (this.changes) {
        this.changes.cancel();
      }
    },

    _init: function _init(store, type) {
      var self = this,
          recordTypeName = this.getRecordTypeName(type);
      if (!this.get('db') || _typeof(this.get('db')) !== 'object') {
        throw new Error('Please set the `db` property on the adapter.');
      }

      if (!Ember.get(type, 'attributes').has('rev')) {
        var modelName = classify(recordTypeName);
        throw new Error('Please add a `rev` attribute of type `string`' + ' on the ' + modelName + ' model.');
      }

      this._schema = this._schema || [];

      var singular = recordTypeName;
      var plural = pluralize(recordTypeName);

      // check that we haven't already registered this model
      for (var i = 0, len = this._schema.length; i < len; i++) {
        var currentSchemaDef = this._schema[i];
        if (currentSchemaDef.singular === singular) {
          return;
        }
      }

      var schemaDef = {
        singular: singular,
        plural: plural
      };

      if (type.documentType) {
        schemaDef['documentType'] = type.documentType;
      }

      var config = getOwner(this).resolveRegistration('config:environment');
      var dontsavedefault = config['emberpouch'] && config['emberpouch']['dontsavehasmany'];
      // else it's new, so update
      this._schema.push(schemaDef);
      // check all the subtypes
      // We check the type of `rel.type`because with ember-data beta 19
      // `rel.type` switched from DS.Model to string
      type.eachRelationship(function (_, rel) {
        if (rel.kind !== 'belongsTo' && rel.kind !== 'hasMany') {
          // TODO: support inverse as well
          return; // skip
        }
        var relDef = {},
            relModel = typeof rel.type === 'string' ? store.modelFor(rel.type) : rel.type;
        if (relModel) {
          var includeRel = true;
          rel.options = rel.options || {};
          if (typeof rel.options.async === "undefined") {
            rel.options.async = config.emberpouch && !Ember.isEmpty(config.emberpouch.async) ? config.emberpouch.async : true; //default true from https://github.com/emberjs/data/pull/3366
          }
          var options = Object.create(rel.options);
          if (rel.kind === 'hasMany' && (options.dontsave || typeof options.dontsave === 'undefined' && dontsavedefault)) {
            var inverse = type.inverseFor(rel.key, store);
            if (inverse) {
              if (inverse.kind === 'belongsTo') {
                self.get('db').createIndex({ index: { fields: ['data.' + inverse.name, '_id'] } });
                if (options.async) {
                  includeRel = false;
                } else {
                  options.queryInverse = inverse.name;
                }
              }
            }
          }

          if (includeRel) {
            relDef[rel.kind] = {
              type: self.getRecordTypeName(relModel),
              options: options
            };
            if (!schemaDef.relations) {
              schemaDef.relations = {};
            }
            schemaDef.relations[rel.key] = relDef;
          }
          self._init(store, relModel);
        }
      });

      this.get('db').setSchema(this._schema);
    },

    _recordToData: function _recordToData(store, type, record) {
      var data = {};
      // Though it would work to use the default recordTypeName for modelName &
      // serializerKey here, these uses are conceptually distinct and may vary
      // independently.
      var modelName = type.modelName || type.typeKey;
      var serializerKey = camelize(modelName);
      var serializer = store.serializerFor(modelName);

      serializer.serializeIntoHash(data, type, record, { includeId: true });

      data = data[serializerKey];

      // ember sets it to null automatically. don't need it.
      if (data.rev === null) {
        delete data.rev;
      }

      return data;
    },

    /**
     * Return key that conform to data adapter
     * ex: 'name' become 'data.name'
     */
    _dataKey: function _dataKey(key) {
      var dataKey = 'data.' + key;
      return "" + dataKey + "";
    },

    /**
     * Returns the modified selector key to comform data key
     * Ex: selector: {name: 'Mario'} wil become selector: {'data.name': 'Mario'}
     */
    _buildSelector: function _buildSelector(selector) {
      var dataSelector = {};
      var selectorKeys = [];

      for (var key in selector) {
        if (selector.hasOwnProperty(key)) {
          selectorKeys.push(key);
        }
      }

      selectorKeys.forEach(function (key) {
        var dataKey = this._dataKey(key);
        dataSelector[dataKey] = selector[key];
      }.bind(this));

      return dataSelector;
    },

    /**
     * Returns the modified sort key
     * Ex: sort: ['series'] will become ['data.series']
     * Ex: sort: [{series: 'desc'}] will became [{'data.series': 'desc'}]
     */
    _buildSort: function _buildSort(sort) {
      return sort.map(function (value) {
        var sortKey = {};
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              sortKey[this._dataKey(key)] = value[key];
            }
          }
        } else {
          return this._dataKey(value);
        }
        return sortKey;
      }.bind(this));
    },

    /**
     * Returns the string to use for the model name part of the PouchDB document
     * ID for records of the given ember-data type.
     *
     * This method uses the camelized version of the model name in order to
     * preserve data compatibility with older versions of ember-pouch. See
     * pouchdb-community/ember-pouch#63 for a discussion.
     *
     * You can override this to change the behavior. If you do, be aware that you
     * need to execute a data migration to ensure that any existing records are
     * moved to the new IDs.
     */
    getRecordTypeName: function getRecordTypeName(type) {
      return camelize(type.modelName);
    },


    findAll: function findAll(store, type /*, sinceToken */) {
      // TODO: use sinceToken
      this._init(store, type);
      return this.get('db').rel.find(this.getRecordTypeName(type));
    },

    findMany: function findMany(store, type, ids) {
      this._init(store, type);
      return this.get('db').rel.find(this.getRecordTypeName(type), ids);
    },

    findHasMany: function findHasMany(store, record, link, rel) {
      var inverse = record.type.inverseFor(rel.key, store);
      if (inverse && inverse.kind === 'belongsTo') {
        return this.get('db').rel.findHasMany(camelize(rel.type), inverse.name, record.id);
      } else {
        var result = {};
        result[pluralize(rel.type)] = [];
        return result; //data;
      }
    },

    query: function query(store, type, _query) {
      this._init(store, type);

      var recordTypeName = this.getRecordTypeName(type);
      var db = this.get('db');

      var queryParams = {
        selector: this._buildSelector(_query.filter)
      };

      if (!Ember.isEmpty(_query.sort)) {
        queryParams.sort = this._buildSort(_query.sort);
      }

      return db.find(queryParams).then(function (pouchRes) {
        return db.rel.parseRelDocs(recordTypeName, pouchRes.docs);
      });
    },

    queryRecord: function queryRecord(store, type, query) {
      var _this = this;

      return this.query(store, type, query).then(function (results) {
        var recordType = _this.getRecordTypeName(type);
        var recordTypePlural = pluralize(recordType);
        if (results[recordTypePlural].length > 0) {
          results[recordType] = results[recordTypePlural][0];
        } else {
          results[recordType] = null;
        }
        delete results[recordTypePlural];
        return results;
      });
    },

    /**
     * `find` has been deprecated in ED 1.13 and is replaced by 'new store
     * methods', see: https://github.com/emberjs/data/pull/3306
     * We keep the method for backward compatibility and forward calls to
     * `findRecord`. This can be removed when the library drops support
     * for deprecated methods.
    */
    find: function find(store, type, id) {
      return this.findRecord(store, type, id);
    },

    findRecord: function findRecord(store, type, id) {
      this._init(store, type);
      var recordTypeName = this.getRecordTypeName(type);
      return this._findRecord(recordTypeName, id);
    },

    _findRecord: function _findRecord(recordTypeName, id) {
      var _this2 = this;

      return this.get('db').rel.find(recordTypeName, id).then(function (payload) {
        // Ember Data chokes on empty payload, this function throws
        // an error when the requested data is not found
        if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' && payload !== null) {
          var singular = recordTypeName;
          var plural = pluralize(recordTypeName);

          var results = payload[singular] || payload[plural];
          if (results && results.length > 0) {
            return payload;
          }
        }

        return _this2._eventuallyConsistent(recordTypeName, id);
      });
    },


    //TODO: cleanup promises on destroy or db change?
    waitingForConsistency: {},
    _eventuallyConsistent: function _eventuallyConsistent(type, id) {
      var _this3 = this;

      var pouchID = this.get('db').rel.makeDocID({ type: type, id: id });
      var defer = Ember.RSVP.defer();
      this.waitingForConsistency[pouchID] = defer;

      return this.get('db').rel.isDeleted(type, id).then(function (deleted) {
        //TODO: should we test the status of the promise here? Could it be handled in onChange already?
        if (deleted) {
          delete _this3.waitingForConsistency[pouchID];
          throw "Document of type '" + type + "' with id '" + id + "' is deleted.";
        } else if (deleted === null) {
          return defer.promise;
        } else {
          Ember.assert('Status should be existing', deleted === false);
          //TODO: should we reject or resolve the promise? or does JS GC still clean it?
          if (_this3.waitingForConsistency[pouchID]) {
            delete _this3.waitingForConsistency[pouchID];
            return _this3._findRecord(type, id);
          } else {
            //findRecord is already handled by onChange
            return defer.promise;
          }
        }
      });
    },

    createRecord: function createRecord(store, type, record) {
      this._init(store, type);
      var data = this._recordToData(store, type, record);
      return this.get('db').rel.save(this.getRecordTypeName(type), data);
    },

    updateRecord: function updateRecord(store, type, record) {
      this._init(store, type);
      var data = this._recordToData(store, type, record);
      return this.get('db').rel.save(this.getRecordTypeName(type), data);
    },

    deleteRecord: function deleteRecord(store, type, record) {
      this._init(store, type);
      var data = this._recordToData(store, type, record);
      return this.get('db').rel.del(this.getRecordTypeName(type), data).then(_utils.extractDeleteRecord);
    }
  });
});