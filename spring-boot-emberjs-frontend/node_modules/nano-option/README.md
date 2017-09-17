# nano-option
Create a nano adapter if option is not already a nano adapter. Also set `X-Couch-Full-Commit` header.

[![Build
Status](https://travis-ci.org/eHealthAfrica/nano-option.svg?branch=master)](https://travis-ci.org/eHealthAfrica/nano-option)

Used for the
[couchdb-bootstrap](https://github.com/eHealthAfrica/couchdb-bootstrap) suite.

## Usage
```js
var nanoOption = require('nano-option')

// This is all equivalent:
nanoOption('http://localhost:5984/mydb')
nanoOption(require('nano')('http://localhost:5984/mydb'))
nanoOption({
  url: 'http://localhost:5984/mydb',
  requestDefaults: {
    proxy: 'http://someproxy'
  }
})
```

## Tests
```sh
npm test
```
