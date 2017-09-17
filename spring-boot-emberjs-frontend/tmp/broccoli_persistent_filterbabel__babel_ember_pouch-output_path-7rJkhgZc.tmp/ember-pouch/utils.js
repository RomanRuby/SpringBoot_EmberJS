define("ember-pouch/utils", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // ember-data doesn't like getting a json response of {deleted: true}
  function extractDeleteRecord() {
    return null;
  }

  exports.extractDeleteRecord = extractDeleteRecord;
});