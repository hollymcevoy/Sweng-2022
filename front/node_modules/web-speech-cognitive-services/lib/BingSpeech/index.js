"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
Object.defineProperty(exports, "createSpeechRecognitionPonyfill", {
  enumerable: true,
  get: function get() {
    return _createSpeechRecognitionPonyfill.default;
  }
});
Object.defineProperty(exports, "createSpeechSynthesisPonyfill", {
  enumerable: true,
  get: function get() {
    return _createSpeechSynthesisPonyfill.default;
  }
});
Object.defineProperty(exports, "fetchAuthorizationToken", {
  enumerable: true,
  get: function get() {
    return _fetchAuthorizationToken.default;
  }
});

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createSpeechRecognitionPonyfill = _interopRequireDefault(require("./SpeechToText/createSpeechRecognitionPonyfill"));

var _createSpeechSynthesisPonyfill = _interopRequireDefault(require("./TextToSpeech/createSpeechSynthesisPonyfill"));

var _fetchAuthorizationToken = _interopRequireDefault(require("./fetchAuthorizationToken"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _objectSpread;
            _context.t1 = _objectSpread;
            _context.t2 = {};
            _context.next = 5;
            return _createSpeechRecognitionPonyfill.default.apply(void 0, _args);

          case 5:
            _context.t3 = _context.sent;
            _context.t4 = (0, _context.t1)(_context.t2, _context.t3);
            _context.next = 9;
            return _createSpeechSynthesisPonyfill.default.apply(void 0, _args);

          case 9:
            _context.t5 = _context.sent;
            _context.next = 12;
            return (0, _context.t0)(_context.t4, _context.t5);

          case 12:
            return _context.abrupt("return", _context.sent);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}
//# sourceMappingURL=index.js.map