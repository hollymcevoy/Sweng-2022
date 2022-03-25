"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = patchOptions;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _resolveFunctionOrReturnValue = _interopRequireDefault(require("./resolveFunctionOrReturnValue"));

var _excluded = ["authorizationToken", "credentials", "looseEvent", "looseEvents", "region", "subscriptionKey"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var shouldWarnOnSubscriptionKey = true;

function patchOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var authorizationToken = _ref.authorizationToken,
      credentials = _ref.credentials,
      looseEvent = _ref.looseEvent,
      looseEvents = _ref.looseEvents,
      _ref$region = _ref.region,
      region = _ref$region === void 0 ? 'westus' : _ref$region,
      subscriptionKey = _ref.subscriptionKey,
      otherOptions = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  if (typeof looseEvent !== 'undefined') {
    console.warn('web-speech-cognitive-services: The option "looseEvent" should be named as "looseEvents".');
    looseEvents = looseEvent;
  }

  if (!credentials) {
    if (!authorizationToken && !subscriptionKey) {
      throw new Error('web-speech-cognitive-services: Credentials must be specified.');
    } else {
      console.warn('web-speech-cognitive-services: We are deprecating authorizationToken, region, and subscriptionKey. Please use credentials instead. The deprecated option will be removed on or after 2020-11-14.');

      credentials = /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!authorizationToken) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 3;
                  return (0, _resolveFunctionOrReturnValue.default)(authorizationToken);

                case 3:
                  _context.t1 = _context.sent;
                  _context.t2 = region;
                  _context.t0 = {
                    authorizationToken: _context.t1,
                    region: _context.t2
                  };
                  _context.next = 13;
                  break;

                case 8:
                  _context.t3 = region;
                  _context.next = 11;
                  return (0, _resolveFunctionOrReturnValue.default)(subscriptionKey);

                case 11:
                  _context.t4 = _context.sent;
                  _context.t0 = {
                    region: _context.t3,
                    subscriptionKey: _context.t4
                  };

                case 13:
                  return _context.abrupt("return", _context.t0);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function credentials() {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }

  return _objectSpread(_objectSpread({}, otherOptions), {}, {
    fetchCredentials: function () {
      var _fetchCredentials = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _yield$resolveFunctio, authorizationToken, customVoiceHostname, region, speechRecognitionHostname, speechSynthesisHostname, subscriptionKey, resolvedCredentials;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _resolveFunctionOrReturnValue.default)(credentials);

              case 2:
                _yield$resolveFunctio = _context2.sent;
                authorizationToken = _yield$resolveFunctio.authorizationToken;
                customVoiceHostname = _yield$resolveFunctio.customVoiceHostname;
                region = _yield$resolveFunctio.region;
                speechRecognitionHostname = _yield$resolveFunctio.speechRecognitionHostname;
                speechSynthesisHostname = _yield$resolveFunctio.speechSynthesisHostname;
                subscriptionKey = _yield$resolveFunctio.subscriptionKey;

                if (!(!authorizationToken && !subscriptionKey || authorizationToken && subscriptionKey)) {
                  _context2.next = 13;
                  break;
                }

                throw new Error('web-speech-cognitive-services: Either "authorizationToken" or "subscriptionKey" must be provided.');

              case 13:
                if (!(!region && !(speechRecognitionHostname && speechSynthesisHostname))) {
                  _context2.next = 17;
                  break;
                }

                throw new Error('web-speech-cognitive-services: Either "region" or "speechRecognitionHostname" and "speechSynthesisHostname" must be set.');

              case 17:
                if (!(region && (customVoiceHostname || speechRecognitionHostname || speechSynthesisHostname))) {
                  _context2.next = 21;
                  break;
                }

                throw new Error('web-speech-cognitive-services: Only either "region" or "customVoiceHostname", "speechRecognitionHostname" and "speechSynthesisHostname" can be set.');

              case 21:
                if (!authorizationToken) {
                  _context2.next = 26;
                  break;
                }

                if (!(typeof authorizationToken !== 'string')) {
                  _context2.next = 24;
                  break;
                }

                throw new Error('web-speech-cognitive-services: "authorizationToken" must be a string.');

              case 24:
                _context2.next = 28;
                break;

              case 26:
                if (!(typeof subscriptionKey !== 'string')) {
                  _context2.next = 28;
                  break;
                }

                throw new Error('web-speech-cognitive-services: "subscriptionKey" must be a string.');

              case 28:
                if (shouldWarnOnSubscriptionKey && subscriptionKey) {
                  console.warn('web-speech-cognitive-services: In production environment, subscription key should not be used, authorization token should be used instead.');
                  shouldWarnOnSubscriptionKey = false;
                }

                resolvedCredentials = authorizationToken ? {
                  authorizationToken: authorizationToken
                } : {
                  subscriptionKey: subscriptionKey
                };

                if (region) {
                  resolvedCredentials.region = region;
                } else {
                  resolvedCredentials.customVoiceHostname = customVoiceHostname;
                  resolvedCredentials.speechRecognitionHostname = speechRecognitionHostname;
                  resolvedCredentials.speechSynthesisHostname = speechSynthesisHostname;
                }

                return _context2.abrupt("return", resolvedCredentials);

              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fetchCredentials() {
        return _fetchCredentials.apply(this, arguments);
      }

      return fetchCredentials;
    }(),
    looseEvents: looseEvents
  });
}
//# sourceMappingURL=patchOptions.js.map