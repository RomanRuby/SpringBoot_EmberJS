var test = require('tape')
var nano = require('nano')

var nanoOption = require('./')


test('from server url string', function(t) {
  var db = nanoOption('http://localhost:5984')

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    requestDefaults: {
      jar: false
    },
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})

test('from object with server url string with trailing slash', function(t) {
  var db = nanoOption({
    url: 'http://localhost:5984/'
  })

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    requestDefaults: {
      jar: false
    },
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})


test('from server url string with trailing slash', function(t) {
  var db = nanoOption('http://localhost:5984/')

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    requestDefaults: {
      jar: false
    },
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})

test('from db url string', function(t) {
  var db = nanoOption('http://localhost:5984/mydb')

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    db: 'mydb',
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})

test('from db url string with trailing slash', function(t) {
  var db = nanoOption('http://localhost:5984/mydb/')

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    db: 'mydb',
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})

test('from config object', function(t) {
  var db = nanoOption({
    url: 'http://localhost:5984/mydb'
  })

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    db: 'mydb',
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})

test('with advanced object', function(t) {
  var db = nanoOption({
    url: 'http://localhost:5984',
    db: 'mydb',
    parseUrl: false,
    defaultHeaders: {
      'X-Couch-Full-Commit': 'false',
      'foo': 'bar'
    }
  })

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    db: 'mydb',
    parseUrl: false,
    requestDefaults: {
      jar: false
    },
    defaultHeaders: {
      'X-Couch-Full-Commit': 'false',
      'foo': 'bar'
    }
  })
  t.end()
})

test('with nano object', function(t) {
  var db = nanoOption(nano('http://localhost:5984/mydb'))

  t.equal(typeof db, 'object')
  t.equal(typeof db.config, 'object')
  t.deepEqual(db.config, {
    url: 'http://localhost:5984',
    db: 'mydb',
    defaultHeaders: {
      'X-Couch-Full-Commit': 'true'
    }
  })
  t.end()
})
