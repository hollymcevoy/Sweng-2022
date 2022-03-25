"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchVoices;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _SpeechSynthesisVoice = _interopRequireDefault(require("./SpeechSynthesisVoice"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fetchVoices(_x) {
  return _fetchVoices.apply(this, arguments);
}

function _fetchVoices() {
  _fetchVoices = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var authorizationToken, region, speechSynthesisHostname, subscriptionKey, hostname, res, voices;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorizationToken = _ref.authorizationToken, region = _ref.region, speechSynthesisHostname = _ref.speechSynthesisHostname, subscriptionKey = _ref.subscriptionKey;
            // Although encodeURI on a hostname doesn't work as expected for hostname, at least, it will fail peacefully.
            hostname = speechSynthesisHostname || "".concat(encodeURI(region), ".tts.speech.microsoft.com");
            _context.next = 4;
            return fetch("https://".concat(hostname, "/cognitiveservices/voices/list"), {
              headers: _objectSpread({
                'content-type': 'application/json'
              }, authorizationToken ? {
                authorization: "Bearer ".concat(authorizationToken)
              } : {
                'Ocp-Apim-Subscription-Key': subscriptionKey
              })
            });

          case 4:
            res = _context.sent;

            if (res.ok) {
              _context.next = 7;
              break;
            }

            throw new Error('Failed to fetch voices');

          case 7:
            _context.next = 9;
            return res.json();

          case 9:
            voices = _context.sent;
            return _context.abrupt("return", voices.map(function (_ref2) {
              var gender = _ref2.Gender,
                  lang = _ref2.Locale,
                  voiceURI = _ref2.Name;
              return new _SpeechSynthesisVoice.default({
                gender: gender,
                lang: lang,
                voiceURI: voiceURI
              });
            }).sort(function (_ref3, _ref4) {
              var x = _ref3.name;
              var y = _ref4.name;
              return x > y ? 1 : x < y ? -1 : 0;
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchVoices.apply(this, arguments);
}
//# sourceMappingURL=fetchVoices.js.map