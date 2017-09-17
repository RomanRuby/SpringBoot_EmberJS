/* jshint node: true */
'use strict';

var path = require('path');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-cli-bootstrap-css',

  treeForVendor: function() {
    return stew.find(path.join(path.dirname(require.resolve('bootstrap')), '..' , 'css'), {
      destDir: 'bootstrap',
      files: ['bootstrap.css']
    });
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/bootstrap/bootstrap.css');
  }
};
