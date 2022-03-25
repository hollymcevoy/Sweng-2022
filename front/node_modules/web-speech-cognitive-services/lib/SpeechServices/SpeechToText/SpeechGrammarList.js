"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/* eslint class-methods-use-this: "off" */
var _default = /*#__PURE__*/function () {
  function _default() {
    (0, _classCallCheck2.default)(this, _default);
    this._phrases = [];
  }

  (0, _createClass2.default)(_default, [{
    key: "addFromString",
    value: function addFromString() {
      throw new Error('JSGF is not supported');
    }
  }, {
    key: "phrases",
    get: function get() {
      return this._phrases;
    },
    set: function set(value) {
      if (Array.isArray(value)) {
        this._phrases = value;
      } else if (typeof value === 'string') {
        this._phrases = [value];
      } else {
        throw new Error("The provided value is not an array or of type 'string'");
      }
    }
  }]);
  return _default;
}();

exports.default = _default;
//# sourceMappingURL=SpeechGrammarList.js.map