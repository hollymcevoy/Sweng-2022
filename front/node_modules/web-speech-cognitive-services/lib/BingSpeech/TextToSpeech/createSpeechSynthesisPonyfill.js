"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _AudioContextQueue = _interopRequireDefault(require("./AudioContextQueue"));

var _DOMEventEmitter2 = _interopRequireDefault(require("../Util/DOMEventEmitter"));

var _fetchAuthorizationToken = _interopRequireDefault(require("../fetchAuthorizationToken"));

var _fetchVoices = _interopRequireDefault(require("./fetchVoices"));

var _SpeechSynthesisUtterance = _interopRequireDefault(require("./SpeechSynthesisUtterance"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// Supported output format can be found at https://docs.microsoft.com/en-us/azure/cognitive-services/Speech/API-Reference-REST/BingVoiceOutput#Subscription
var DEFAULT_OUTPUT_FORMAT = 'audio-16khz-128kbitrate-mono-mp3';
var TOKEN_EXPIRATION = 600000;
var TOKEN_EARLY_RENEWAL = 60000;

var _default = function _default(_ref) {
  var authorizationToken = _ref.authorizationToken,
      _ref$ponyfill = _ref.ponyfill,
      ponyfill = _ref$ponyfill === void 0 ? {
    AudioContext: window.AudioContext || window.webkitAudioContext
  } : _ref$ponyfill,
      subscriptionKey = _ref.subscriptionKey;

  if (!authorizationToken && !subscriptionKey) {
    console.warn('Either authorizationToken or subscriptionKey must be specified');
    return {};
  } else if (!ponyfill.AudioContext) {
    console.warn('This browser does not support Web Audio and it will not work with Cognitive Services Speech Services.');
    return {};
  }

  var fetchMemoizedAuthorizationToken = (0, _memoizeOne.default)(function (_ref2) {
    var subscriptionKey = _ref2.subscriptionKey;
    return (0, _fetchAuthorizationToken.default)(subscriptionKey);
  }, function (arg, prevArg) {
    return arg.subscriptionKey === prevArg.subscriptionKey && arg.now - prevArg.now < TOKEN_EXPIRATION - TOKEN_EARLY_RENEWAL;
  });

  var SpeechSynthesis = /*#__PURE__*/function (_DOMEventEmitter) {
    (0, _inherits2.default)(SpeechSynthesis, _DOMEventEmitter);

    var _super = _createSuper(SpeechSynthesis);

    function SpeechSynthesis() {
      var _this;

      (0, _classCallCheck2.default)(this, SpeechSynthesis);
      _this = _super.call(this, ['voiceschanged']);
      _this.outputFormat = DEFAULT_OUTPUT_FORMAT;
      _this.queue = new _AudioContextQueue.default(ponyfill);
      return _this;
    }

    (0, _createClass2.default)(SpeechSynthesis, [{
      key: "cancel",
      value: function cancel() {
        this.queue.stop();
      }
    }, {
      key: "getVoices",
      value: function getVoices() {
        return (0, _fetchVoices.default)();
      }
    }, {
      key: "pause",
      value: function pause() {
        this.queue.pause();
      }
    }, {
      key: "resume",
      value: function resume() {
        this.queue.resume();
      }
    }, {
      key: "speak",
      value: function () {
        var _speak = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(utterance) {
          var _this2 = this;

          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (utterance instanceof _SpeechSynthesisUtterance.default) {
                    _context2.next = 2;
                    break;
                  }

                  throw new Error('invalid utterance');

                case 2:
                  return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              utterance.addEventListener('end', resolve);
                              utterance.addEventListener('error', reject);

                              if (!(typeof authorizationToken === 'function')) {
                                _context.next = 8;
                                break;
                              }

                              _context.next = 5;
                              return authorizationToken();

                            case 5:
                              _context.t0 = _context.sent;
                              _context.next = 18;
                              break;

                            case 8:
                              if (!authorizationToken) {
                                _context.next = 14;
                                break;
                              }

                              _context.next = 11;
                              return authorizationToken;

                            case 11:
                              _context.t1 = _context.sent;
                              _context.next = 17;
                              break;

                            case 14:
                              _context.next = 16;
                              return fetchMemoizedAuthorizationToken({
                                now: Date.now,
                                subscriptionKey: subscriptionKey
                              });

                            case 16:
                              _context.t1 = _context.sent;

                            case 17:
                              _context.t0 = _context.t1;

                            case 18:
                              utterance.authorizationToken = _context.t0;
                              utterance.outputFormat = _this2.outputFormat;
                              utterance.preload();

                              _this2.queue.push(utterance);

                            case 22:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x2, _x3) {
                      return _ref3.apply(this, arguments);
                    };
                  }()));

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function speak(_x) {
          return _speak.apply(this, arguments);
        }

        return speak;
      }()
    }, {
      key: "speaking",
      get: function get() {
        return this.queue.speaking;
      }
    }]);
    return SpeechSynthesis;
  }(_DOMEventEmitter2.default);

  return {
    speechSynthesis: new SpeechSynthesis(),
    SpeechSynthesisUtterance: _SpeechSynthesisUtterance.default
  };
};

exports.default = _default;
//# sourceMappingURL=createSpeechSynthesisPonyfill.js.map