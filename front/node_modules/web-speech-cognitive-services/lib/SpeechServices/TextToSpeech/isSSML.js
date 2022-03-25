"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSSML;
var SPEAK_TAG_PATTERN = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*<speak([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]|\/?>)/;
var XML_PROLOG_PATTERN = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*<\?xml[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/;

function isSSML(text) {
  return SPEAK_TAG_PATTERN.test(text) || XML_PROLOG_PATTERN.test(text);
}
//# sourceMappingURL=isSSML.js.map