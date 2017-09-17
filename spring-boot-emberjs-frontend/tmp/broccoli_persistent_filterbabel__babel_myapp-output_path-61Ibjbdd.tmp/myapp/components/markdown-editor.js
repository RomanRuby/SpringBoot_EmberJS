define('myapp/components/markdown-editor', ['exports', 'ember-cli-markdown-editor/components/markdown-editor'], function (exports, _markdownEditor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _markdownEditor.default;
    }
  });
});