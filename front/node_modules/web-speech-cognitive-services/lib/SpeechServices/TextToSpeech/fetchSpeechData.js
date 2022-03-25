"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base64Arraybuffer = require("base64-arraybuffer");

var _buildSSML = _interopRequireDefault(require("./buildSSML"));

var _isSSML = _interopRequireDefault(require("./isSSML"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_LANGUAGE = 'en-US';
var DEFAULT_OUTPUT_FORMAT = 'riff-16khz-16bit-mono-pcm';
var DEFAULT_VOICE = 'Microsoft Server Speech Text to Speech Voice (en-US, AriaNeural)';
var EMPTY_MP3_BASE64 = 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjU2LjEwMQAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU3LjY0AAAAAAAAAAAAAAAAJAUHAAAAAAAAAYYoRBqpAAAAAAD/+xDEAAPAAAGkAAAAIAAANIAAAARMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMQpg8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

function _default(_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var deploymentId, fetchCredentials, _ref$lang, lang, _ref$outputFormat, outputFormat, pitch, rate, text, _ref$voice, voice, volume, _yield$fetchCredentia, authorizationToken, region, speechSynthesisHostname, subscriptionKey, ssml, hostname, search, url, res;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deploymentId = _ref.deploymentId, fetchCredentials = _ref.fetchCredentials, _ref$lang = _ref.lang, lang = _ref$lang === void 0 ? DEFAULT_LANGUAGE : _ref$lang, _ref$outputFormat = _ref.outputFormat, outputFormat = _ref$outputFormat === void 0 ? DEFAULT_OUTPUT_FORMAT : _ref$outputFormat, pitch = _ref.pitch, rate = _ref.rate, text = _ref.text, _ref$voice = _ref.voice, voice = _ref$voice === void 0 ? DEFAULT_VOICE : _ref$voice, volume = _ref.volume;

            if (text) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", (0, _base64Arraybuffer.decode)(EMPTY_MP3_BASE64));

          case 3:
            _context.next = 5;
            return fetchCredentials();

          case 5:
            _yield$fetchCredentia = _context.sent;
            authorizationToken = _yield$fetchCredentia.authorizationToken;
            region = _yield$fetchCredentia.region;
            speechSynthesisHostname = _yield$fetchCredentia.speechSynthesisHostname;
            subscriptionKey = _yield$fetchCredentia.subscriptionKey;

            if (!(authorizationToken && subscriptionKey || !authorizationToken && !subscriptionKey)) {
              _context.next = 14;
              break;
            }

            throw new Error('Only "authorizationToken" or "subscriptionKey" should be set.');

          case 14:
            if (!(region && speechSynthesisHostname || !region && !speechSynthesisHostname)) {
              _context.next = 16;
              break;
            }

            throw new Error('Only "region" or "speechSynthesisHostnamename" should be set.');

          case 16:
            ssml = (0, _isSSML.default)(text) ? text : (0, _buildSSML.default)({
              lang: lang,
              pitch: pitch,
              rate: rate,
              text: text,
              voice: voice,
              volume: volume
            }); // Although calling encodeURI on hostname does not actually works, it fails faster and safer.

            hostname = speechSynthesisHostname || (deploymentId ? "".concat(encodeURI(region), ".voice.speech.microsoft.com") : "".concat(encodeURI(region), ".tts.speech.microsoft.com"));
            search = deploymentId ? "?deploymentId=".concat(encodeURI(deploymentId)) : '';
            url = "https://".concat(hostname, "/cognitiveservices/v1").concat(search);
            _context.next = 22;
            return fetch(url, {
              headers: _objectSpread({
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': outputFormat
              }, authorizationToken ? {
                Authorization: "Bearer ".concat(authorizationToken)
              } : {
                'Ocp-Apim-Subscription-Key': subscriptionKey
              }),
              method: 'POST',
              body: ssml
            });

          case 22:
            res = _context.sent;

            if (res.ok) {
              _context.next = 25;
              break;
            }

            throw new Error("web-speech-cognitive-services: Failed to syntheis speech, server returned ".concat(res.status));

          case 25:
            return _context.abrupt("return", res.arrayBuffer());

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}
//# sourceMappingURL=fetchSpeechData.js.map