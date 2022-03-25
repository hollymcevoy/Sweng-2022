"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchSpeechData;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _buildSSML = _interopRequireDefault(require("./buildSSML"));

var DEFAULT_LANGUAGE = 'en-US';
var DEFAULT_VOICE = 'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)';
var SYNTHESIS_URL = 'https://speech.platform.bing.com/synthesize';

function fetchSpeechData(_x) {
  return _fetchSpeechData.apply(this, arguments);
}

function _fetchSpeechData() {
  _fetchSpeechData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var authorizationToken, _ref$lang, lang, outputFormat, pitch, rate, text, _ref$voice, voice, volume, ssml, res;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorizationToken = _ref.authorizationToken, _ref$lang = _ref.lang, lang = _ref$lang === void 0 ? DEFAULT_LANGUAGE : _ref$lang, outputFormat = _ref.outputFormat, pitch = _ref.pitch, rate = _ref.rate, text = _ref.text, _ref$voice = _ref.voice, voice = _ref$voice === void 0 ? DEFAULT_VOICE : _ref$voice, volume = _ref.volume;
            ssml = (0, _buildSSML.default)({
              lang: lang,
              pitch: pitch,
              rate: rate,
              text: text,
              voice: voice,
              volume: volume
            });
            _context.next = 4;
            return fetch(SYNTHESIS_URL, {
              headers: {
                Authorization: "Bearer ".concat(authorizationToken),
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': outputFormat
              },
              method: 'POST',
              body: ssml
            });

          case 4:
            res = _context.sent;

            if (!(res.status !== 200)) {
              _context.next = 7;
              break;
            }

            throw new Error("Failed to syntheis speech, server returned ".concat(res.status));

          case 7:
            return _context.abrupt("return", res.arrayBuffer());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchSpeechData.apply(this, arguments);
}
//# sourceMappingURL=fetchSpeechData.js.map