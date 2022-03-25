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

var _es = require("event-target-shim/es5");

var _pDeferEs = _interopRequireDefault(require("p-defer-es5"));

var _onErrorResumeNext = _interopRequireDefault(require("on-error-resume-next"));

var _AudioContextQueue = _interopRequireDefault(require("./AudioContextQueue"));

var _fetchCustomVoices = _interopRequireDefault(require("./fetchCustomVoices"));

var _fetchVoices = _interopRequireDefault(require("./fetchVoices"));

var _patchOptions2 = _interopRequireDefault(require("../patchOptions"));

var _SpeechSynthesisEvent = _interopRequireDefault(require("./SpeechSynthesisEvent"));

var _SpeechSynthesisUtterance = _interopRequireDefault(require("./SpeechSynthesisUtterance"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// Supported output format can be found at https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/rest-text-to-speech#audio-outputs
var DEFAULT_OUTPUT_FORMAT = 'audio-24khz-160kbitrate-mono-mp3';
var EMPTY_ARRAY = [];

var _default = function _default(options) {
  var _patchOptions = (0, _patchOptions2.default)(options),
      audioContext = _patchOptions.audioContext,
      fetchCredentials = _patchOptions.fetchCredentials,
      _patchOptions$ponyfil = _patchOptions.ponyfill,
      ponyfill = _patchOptions$ponyfil === void 0 ? {
    AudioContext: window.AudioContext || window.webkitAudioContext
  } : _patchOptions$ponyfil,
      speechSynthesisDeploymentId = _patchOptions.speechSynthesisDeploymentId,
      _patchOptions$speechS = _patchOptions.speechSynthesisOutputFormat,
      speechSynthesisOutputFormat = _patchOptions$speechS === void 0 ? DEFAULT_OUTPUT_FORMAT : _patchOptions$speechS;

  if (!audioContext && !ponyfill.AudioContext) {
    console.warn('web-speech-cognitive-services: This browser does not support Web Audio and it will not work with Cognitive Services Speech Services.');
    return {};
  }

  var SpeechSynthesis = /*#__PURE__*/function (_EventTarget) {
    (0, _inherits2.default)(SpeechSynthesis, _EventTarget);

    var _super = _createSuper(SpeechSynthesis);

    function SpeechSynthesis() {
      var _this;

      (0, _classCallCheck2.default)(this, SpeechSynthesis);
      _this = _super.call(this);
      _this.queue = new _AudioContextQueue.default({
        audioContext: audioContext,
        ponyfill: ponyfill
      });

      _this.updateVoices();

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
        return EMPTY_ARRAY;
      }
    }, {
      key: "onvoiceschanged",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'voiceschanged');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'voiceschanged', value);
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
      value: function speak(utterance) {
        if (!(utterance instanceof _SpeechSynthesisUtterance.default)) {
          throw new Error('invalid utterance');
        }

        var _createDeferred = (0, _pDeferEs.default)(),
            reject = _createDeferred.reject,
            resolve = _createDeferred.resolve,
            promise = _createDeferred.promise;

        var handleError = function handleError(_ref) {
          var errorCode = _ref.error,
              message = _ref.message;
          var error = new Error(errorCode);
          error.stack = message;
          reject(error);
        };

        utterance.addEventListener('end', resolve);
        utterance.addEventListener('error', handleError);
        utterance.preload({
          deploymentId: speechSynthesisDeploymentId,
          fetchCredentials: fetchCredentials,
          outputFormat: speechSynthesisOutputFormat
        });
        this.queue.push(utterance);
        return promise.finally(function () {
          utterance.removeEventListener('end', resolve);
          utterance.removeEventListener('error', handleError);
        });
      }
    }, {
      key: "speaking",
      get: function get() {
        return this.queue.speaking;
      }
    }, {
      key: "updateVoices",
      value: function () {
        var _updateVoices = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
          var _this2 = this;

          var _yield$fetchCredentia, customVoiceHostname, region, speechSynthesisHostname, subscriptionKey;

          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return fetchCredentials();

                case 2:
                  _yield$fetchCredentia = _context3.sent;
                  customVoiceHostname = _yield$fetchCredentia.customVoiceHostname;
                  region = _yield$fetchCredentia.region;
                  speechSynthesisHostname = _yield$fetchCredentia.speechSynthesisHostname;
                  subscriptionKey = _yield$fetchCredentia.subscriptionKey;

                  if (!speechSynthesisDeploymentId) {
                    _context3.next = 14;
                    break;
                  }

                  if (!subscriptionKey) {
                    _context3.next = 12;
                    break;
                  }

                  console.warn('web-speech-cognitive-services: Listing of custom voice models are only available when using subscription key.');
                  _context3.next = 12;
                  return (0, _onErrorResumeNext.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                    var voices;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return (0, _fetchCustomVoices.default)({
                              customVoiceHostname: customVoiceHostname,
                              deploymentId: speechSynthesisDeploymentId,
                              region: region,
                              speechSynthesisHostname: speechSynthesisHostname,
                              subscriptionKey: subscriptionKey
                            });

                          case 2:
                            voices = _context.sent;

                            _this2.getVoices = function () {
                              return voices;
                            };

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  })));

                case 12:
                  _context3.next = 16;
                  break;

                case 14:
                  _context3.next = 16;
                  return (0, _onErrorResumeNext.default)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
                    var voices;
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.t0 = _fetchVoices.default;
                            _context2.next = 3;
                            return fetchCredentials();

                          case 3:
                            _context2.t1 = _context2.sent;
                            _context2.next = 6;
                            return (0, _context2.t0)(_context2.t1);

                          case 6:
                            voices = _context2.sent;

                            _this2.getVoices = function () {
                              return voices;
                            };

                          case 8:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  })));

                case 16:
                  this.dispatchEvent(new _SpeechSynthesisEvent.default('voiceschanged'));

                case 17:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function updateVoices() {
          return _updateVoices.apply(this, arguments);
        }

        return updateVoices;
      }()
    }]);
    return SpeechSynthesis;
  }(_es.EventTarget);

  return {
    speechSynthesis: new SpeechSynthesis(),
    SpeechSynthesisEvent: _SpeechSynthesisEvent.default,
    SpeechSynthesisUtterance: _SpeechSynthesisUtterance.default
  };
};

exports.default = _default;
//# sourceMappingURL=createSpeechSynthesisPonyfill.js.map