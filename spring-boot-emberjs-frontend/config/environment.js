/* eslint-env node */
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'myapp',
    environment,
    rootURL: '/',
    locationType: 'auto',
    emberpouch: {
      dontsavehasmany: true
    },

    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {

    }
  };

  if (environment === 'development') {
  }

  ENV.authAdapter = 'application';
  if (environment === 'production') {
    ENV.rootURL = '/';
    ENV.remote_couch = 'https://martinic.cloudant.com/bloggr';
  }
  if ( ENV.remote_couch ) {
    var remote_couch_hostname = ENV.remote_couch.substring(0, ENV.remote_couch.indexOf('/', 9));
    ENV.contentSecurityPolicy = {
      'connect-src': "'self' " + remote_couch_hostname
    };
  }

  return ENV;
};
