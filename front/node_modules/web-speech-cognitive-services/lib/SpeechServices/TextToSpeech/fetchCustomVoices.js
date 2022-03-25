"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _SpeechSynthesisVoice = _interopRequireDefault(require("./SpeechSynthesisVoice"));

/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, -1] }] */
function fetchCustomVoices(_x) {
  return _fetchCustomVoices.apply(this, arguments);
}

function _fetchCustomVoices() {
  _fetchCustomVoices = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var customVoiceHostname, deploymentId, region, subscriptionKey, hostname, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            customVoiceHostname = _ref.customVoiceHostname, deploymentId = _ref.deploymentId, region = _ref.region, subscriptionKey = _ref.subscriptionKey;
            hostname = customVoiceHostname || "".concat(region, ".customvoice.api.speech.microsoft.com"); // Although encodeURI on a hostname doesn't work as expected for hostname, at least, it will fail peacefully.

            _context.next = 4;
            return fetch("https://".concat(encodeURI(hostname), "/api/texttospeech/v2.0/endpoints/").concat(encodeURIComponent(deploymentId)), {
              headers: {
                accept: 'application/json',
                'ocp-apim-subscription-key': subscriptionKey
              }
            });

          case 4:
            res = _context.sent;

            if (res.ok) {
              _context.next = 7;
              break;
            }

            throw new Error('Failed to fetch custom voices');

          case 7:
            return _context.abrupt("return", res.json());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchCustomVoices.apply(this, arguments);
}

function _default(_x2) {
  return _ref3.apply(this, arguments);
}

function _ref3() {
  _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref2) {
    var customVoiceHostname, deploymentId, region, subscriptionKey, _yield$fetchCustomVoi, models;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customVoiceHostname = _ref2.customVoiceHostname, deploymentId = _ref2.deploymentId, region = _ref2.region, subscriptionKey = _ref2.subscriptionKey;
            _context2.next = 3;
            return fetchCustomVoices({
              customVoiceHostname: customVoiceHostname,
              deploymentId: deploymentId,
              region: region,
              subscriptionKey: subscriptionKey
            });

          case 3:
            _yield$fetchCustomVoi = _context2.sent;
            models = _yield$fetchCustomVoi.models;
            return _context2.abrupt("return", models.map(function (_ref4) {
              var gender = _ref4.properties.Gender,
                  lang = _ref4.locale,
                  voiceURI = _ref4.name;
              return new _SpeechSynthesisVoice.default({
                gender: gender,
                lang: lang,
                voiceURI: voiceURI
              });
            }).sort(function (_ref5, _ref6) {
              var x = _ref5.name;
              var y = _ref6.name;
              return x > y ? 1 : x < y ? -1 : 0;
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _ref3.apply(this, arguments);
}
//# sourceMappingURL=fetchCustomVoices.js.map