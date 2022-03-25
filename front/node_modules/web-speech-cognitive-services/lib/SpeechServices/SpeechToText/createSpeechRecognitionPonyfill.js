"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpeechRecognitionPonyfillFromRecognizer = createSpeechRecognitionPonyfillFromRecognizer;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _es = require("event-target-shim/es5");

var _cognitiveServiceEventResultToWebSpeechRecognitionResultList = _interopRequireDefault(require("./cognitiveServiceEventResultToWebSpeechRecognitionResultList"));

var _createPromiseQueue = _interopRequireDefault(require("../../Util/createPromiseQueue"));

var _patchOptions2 = _interopRequireDefault(require("../patchOptions"));

var _SpeechGrammarList = _interopRequireDefault(require("./SpeechGrammarList"));

var _SpeechSDK = _interopRequireDefault(require("../SpeechSDK"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// https://docs.microsoft.com/en-us/javascript/api/microsoft-cognitiveservices-speech-sdk/speechconfig?view=azure-node-latest#outputformat
// {
//   "RecognitionStatus": "Success",
//   "Offset": 900000,
//   "Duration": 49000000,
//   "NBest": [
//     {
//       "Confidence": 0.738919,
//       "Lexical": "second",
//       "ITN": "second",
//       "MaskedITN": "second",
//       "Display": "Second."
//     }
//   ]
// }
// {
//   "RecognitionStatus": "InitialSilenceTimeout",
//   "Offset": 50000000,
//   "Duration": 0
// }
var AudioConfig = _SpeechSDK.default.AudioConfig,
    OutputFormat = _SpeechSDK.default.OutputFormat,
    ResultReason = _SpeechSDK.default.ResultReason,
    SpeechConfig = _SpeechSDK.default.SpeechConfig,
    SpeechRecognizer = _SpeechSDK.default.SpeechRecognizer;

function serializeRecognitionResult(_ref) {
  var duration = _ref.duration,
      errorDetails = _ref.errorDetails,
      json = _ref.json,
      offset = _ref.offset,
      properties = _ref.properties,
      reason = _ref.reason,
      resultId = _ref.resultId,
      text = _ref.text;
  return {
    duration: duration,
    errorDetails: errorDetails,
    json: JSON.parse(json),
    offset: offset,
    properties: properties,
    reason: reason,
    resultId: resultId,
    text: text
  };
}

function averageAmplitude(arrayBuffer) {
  var array = new Int16Array(arrayBuffer);
  return [].reduce.call(array, function (averageAmplitude, amplitude) {
    return averageAmplitude + Math.abs(amplitude);
  }, 0) / array.length;
}

function cognitiveServicesAsyncToPromise(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      return fn.apply(void 0, args.concat([resolve, reject]));
    });
  };
}

var SpeechRecognitionEvent = /*#__PURE__*/function (_Event) {
  (0, _inherits2.default)(SpeechRecognitionEvent, _Event);

  var _super = _createSuper(SpeechRecognitionEvent);

  function SpeechRecognitionEvent(type) {
    var _this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        data = _ref2.data,
        emma = _ref2.emma,
        interpretation = _ref2.interpretation,
        resultIndex = _ref2.resultIndex,
        results = _ref2.results;

    (0, _classCallCheck2.default)(this, SpeechRecognitionEvent);
    _this = _super.call(this, type);
    _this.data = data;
    _this.emma = emma;
    _this.interpretation = interpretation;
    _this.resultIndex = resultIndex;
    _this.results = results;
    return _this;
  }

  return SpeechRecognitionEvent;
}(_es.Event);

function prepareAudioConfig(audioConfig) {
  var originalAttach = audioConfig.attach;
  var boundOriginalAttach = audioConfig.attach.bind(audioConfig);
  var firstChunk;
  var muted; // We modify "attach" function and detect when audible chunk is read.
  // We will only modify "attach" function once.

  audioConfig.attach = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var reader;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return boundOriginalAttach();

          case 2:
            reader = _context2.sent;
            return _context2.abrupt("return", _objectSpread(_objectSpread({}, reader), {}, {
              read: function () {
                var _read = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                  var chunk;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return reader.read();

                        case 2:
                          chunk = _context.sent;

                          // The magic number 150 is measured by:
                          // 1. Set microphone volume to 0
                          // 2. Observe the amplitude (100-110) for the first few chunks
                          //    (There is a short static caught when turning on the microphone)
                          // 3. Set the number a bit higher than the observation
                          if (!firstChunk && averageAmplitude(chunk.buffer) > 150) {
                            audioConfig.events.onEvent({
                              name: 'FirstAudibleChunk'
                            });
                            firstChunk = true;
                          }

                          if (!muted) {
                            _context.next = 6;
                            break;
                          }

                          return _context.abrupt("return", {
                            buffer: new ArrayBuffer(0),
                            isEnd: true,
                            timeReceived: Date.now()
                          });

                        case 6:
                          return _context.abrupt("return", chunk);

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function read() {
                  return _read.apply(this, arguments);
                }

                return read;
              }()
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return {
    audioConfig: audioConfig,
    pause: function pause() {
      muted = true;
    },
    unprepare: function unprepare() {
      audioConfig.attach = originalAttach;
    }
  };
}

function createSpeechRecognitionPonyfillFromRecognizer(_ref4) {
  var createRecognizer = _ref4.createRecognizer,
      enableTelemetry = _ref4.enableTelemetry,
      looseEvents = _ref4.looseEvents,
      referenceGrammars = _ref4.referenceGrammars,
      textNormalization = _ref4.textNormalization;
  // If enableTelemetry is set to null or non-boolean, we will default to true.
  SpeechRecognizer.enableTelemetry(enableTelemetry !== false);

  var SpeechRecognition = /*#__PURE__*/function (_EventTarget) {
    (0, _inherits2.default)(SpeechRecognition, _EventTarget);

    var _super2 = _createSuper(SpeechRecognition);

    function SpeechRecognition() {
      var _this2;

      (0, _classCallCheck2.default)(this, SpeechRecognition);
      _this2 = _super2.call(this);
      _this2._continuous = false;
      _this2._interimResults = false;
      _this2._lang = typeof window !== 'undefined' ? window.document.documentElement.getAttribute('lang') || window.navigator.language : 'en-US';
      _this2._grammars = new _SpeechGrammarList.default();
      _this2._maxAlternatives = 1;
      return _this2;
    }

    (0, _createClass2.default)(SpeechRecognition, [{
      key: "emitCognitiveServices",
      value: function emitCognitiveServices(type, event) {
        this.dispatchEvent(new SpeechRecognitionEvent('cognitiveservices', {
          data: _objectSpread(_objectSpread({}, event), {}, {
            type: type
          })
        }));
      }
    }, {
      key: "continuous",
      get: function get() {
        return this._continuous;
      },
      set: function set(value) {
        this._continuous = value;
      }
    }, {
      key: "grammars",
      get: function get() {
        return this._grammars;
      },
      set: function set(value) {
        if (value instanceof _SpeechGrammarList.default) {
          this._grammars = value;
        } else {
          throw new Error("The provided value is not of type 'SpeechGrammarList'");
        }
      }
    }, {
      key: "interimResults",
      get: function get() {
        return this._interimResults;
      },
      set: function set(value) {
        this._interimResults = value;
      }
    }, {
      key: "maxAlternatives",
      get: function get() {
        return this._maxAlternatives;
      },
      set: function set(value) {
        this._maxAlternatives = value;
      }
    }, {
      key: "lang",
      get: function get() {
        return this._lang;
      },
      set: function set(value) {
        this._lang = value;
      }
    }, {
      key: "onaudioend",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'audioend');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'audioend', value);
      }
    }, {
      key: "onaudiostart",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'audiostart');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'audiostart', value);
      }
    }, {
      key: "oncognitiveservices",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'cognitiveservices');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'cognitiveservices', value);
      }
    }, {
      key: "onend",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'end');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'end', value);
      }
    }, {
      key: "onerror",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'error');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'error', value);
      }
    }, {
      key: "onresult",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'result');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'result', value);
      }
    }, {
      key: "onsoundend",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'soundend');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'soundend', value);
      }
    }, {
      key: "onsoundstart",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'soundstart');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'soundstart', value);
      }
    }, {
      key: "onspeechend",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'speechend');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'speechend', value);
      }
    }, {
      key: "onspeechstart",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'speechstart');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'speechstart', value);
      }
    }, {
      key: "onstart",
      get: function get() {
        return (0, _es.getEventAttributeValue)(this, 'start');
      },
      set: function set(value) {
        (0, _es.setEventAttributeValue)(this, 'start', value);
      }
    }, {
      key: "start",
      value: function start() {
        var _this3 = this;

        this._startOnce().catch(function (err) {
          _this3.dispatchEvent(new ErrorEvent('error', {
            error: err,
            message: err && (err.stack || err.message)
          }));
        });
      }
    }, {
      key: "_startOnce",
      value: function () {
        var _startOnce2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
          var _this4 = this;

          var recognizer, _prepareAudioConfig, pause, unprepare, queue, soundStarted, speechStarted, stopping, _recognizer$audioConf, detachAudioConfigEvent, phrases, dynamicGrammar, audioStarted, finalEvent, finalizedResults, _loop, loop, _ret;

          return _regenerator.default.wrap(function _callee3$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return createRecognizer(this.lang);

                case 2:
                  recognizer = _context4.sent;
                  _prepareAudioConfig = prepareAudioConfig(recognizer.audioConfig), pause = _prepareAudioConfig.pause, unprepare = _prepareAudioConfig.unprepare;
                  _context4.prev = 4;
                  queue = (0, _createPromiseQueue.default)();
                  _recognizer$audioConf = recognizer.audioConfig.events.attach(function (event) {
                    var name = event.name;

                    if (name === 'AudioSourceReadyEvent') {
                      queue.push({
                        audioSourceReady: {}
                      });
                    } else if (name === 'AudioSourceOffEvent') {
                      queue.push({
                        audioSourceOff: {}
                      });
                    } else if (name === 'FirstAudibleChunk') {
                      queue.push({
                        firstAudibleChunk: {}
                      });
                    }
                  }), detachAudioConfigEvent = _recognizer$audioConf.detach;

                  recognizer.canceled = function (_, _ref5) {
                    var errorDetails = _ref5.errorDetails,
                        offset = _ref5.offset,
                        reason = _ref5.reason,
                        sessionId = _ref5.sessionId;
                    queue.push({
                      canceled: {
                        errorDetails: errorDetails,
                        offset: offset,
                        reason: reason,
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.recognized = function (_, _ref6) {
                    var offset = _ref6.offset,
                        result = _ref6.result,
                        sessionId = _ref6.sessionId;
                    queue.push({
                      recognized: {
                        offset: offset,
                        result: serializeRecognitionResult(result),
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.recognizing = function (_, _ref7) {
                    var offset = _ref7.offset,
                        result = _ref7.result,
                        sessionId = _ref7.sessionId;
                    queue.push({
                      recognizing: {
                        offset: offset,
                        result: serializeRecognitionResult(result),
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.sessionStarted = function (_, _ref8) {
                    var sessionId = _ref8.sessionId;
                    queue.push({
                      sessionStarted: {
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.sessionStopped = function (_, _ref9) {
                    var sessionId = _ref9.sessionId;
                    // "sessionStopped" is never fired, probably because we are using startContinuousRecognitionAsync instead of recognizeOnceAsync.
                    queue.push({
                      sessionStopped: {
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.speechStartDetected = function (_, _ref10) {
                    var offset = _ref10.offset,
                        sessionId = _ref10.sessionId;
                    queue.push({
                      speechStartDetected: {
                        offset: offset,
                        sessionId: sessionId
                      }
                    });
                  };

                  recognizer.speechEndDetected = function (_, _ref11) {
                    var sessionId = _ref11.sessionId;
                    // "speechEndDetected" is never fired, probably because we are using startContinuousRecognitionAsync instead of recognizeOnceAsync.
                    // Update: "speechEndDetected" is fired for DLSpeech.listenOnceAsync()
                    queue.push({
                      speechEndDetected: {
                        sessionId: sessionId
                      }
                    });
                  };

                  phrases = this.grammars.phrases; // HACK: We are using the internal of SpeechRecognizer because they did not expose it

                  dynamicGrammar = recognizer.privReco.dynamicGrammar;
                  referenceGrammars && referenceGrammars.length && dynamicGrammar.addReferenceGrammar(referenceGrammars);
                  phrases && phrases.length && dynamicGrammar.addPhrase(phrases);
                  _context4.next = 20;
                  return cognitiveServicesAsyncToPromise(recognizer.startContinuousRecognitionAsync.bind(recognizer))();

                case 20:
                  if (recognizer.stopContinuousRecognitionAsync) {
                    this.abort = function () {
                      return queue.push({
                        abort: {}
                      });
                    };

                    this.stop = function () {
                      return queue.push({
                        stop: {}
                      });
                    };
                  } else {
                    this.abort = this.stop = undefined;
                  }

                  finalizedResults = [];
                  _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(loop) {
                    var event, abort, audioSourceOff, audioSourceReady, canceled, firstAudibleChunk, recognized, recognizing, stop, errorMessage, result, recognizable;
                    return _regenerator.default.wrap(function _loop$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return queue.shift();

                          case 2:
                            event = _context3.sent;
                            abort = event.abort, audioSourceOff = event.audioSourceOff, audioSourceReady = event.audioSourceReady, canceled = event.canceled, firstAudibleChunk = event.firstAudibleChunk, recognized = event.recognized, recognizing = event.recognizing, stop = event.stop; // We are emitting event "cognitiveservices" for debugging purpose.

                            Object.keys(event).forEach(function (name) {
                              return _this4.emitCognitiveServices(name, event[name]);
                            });
                            errorMessage = canceled && canceled.errorDetails;

                            if (!/Permission[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]denied/.test(errorMessage || '')) {
                              _context3.next = 9;
                              break;
                            }

                            // If microphone is not allowed, we should not emit "start" event.
                            finalEvent = {
                              error: 'not-allowed',
                              type: 'error'
                            };
                            return _context3.abrupt("return", "break");

                          case 9:
                            if (!loop) {
                              _this4.dispatchEvent(new SpeechRecognitionEvent('start'));
                            }

                            if (!errorMessage) {
                              _context3.next = 15;
                              break;
                            }

                            if (/1006/.test(errorMessage)) {
                              if (!audioStarted) {
                                _this4.dispatchEvent(new SpeechRecognitionEvent('audiostart'));

                                _this4.dispatchEvent(new SpeechRecognitionEvent('audioend'));
                              }

                              finalEvent = {
                                error: 'network',
                                type: 'error'
                              };
                            } else {
                              finalEvent = {
                                error: 'unknown',
                                type: 'error'
                              };
                            }

                            return _context3.abrupt("return", "break");

                          case 15:
                            if (!(abort || stop)) {
                              _context3.next = 22;
                              break;
                            }

                            if (abort) {
                              finalEvent = {
                                error: 'aborted',
                                type: 'error'
                              }; // If we are aborting, we will ignore lingering recognizing/recognized events. But if we are stopping, we need them.

                              stopping = 'abort';
                            } else {
                              // When we pause, we will send { isEnd: true }, Speech Services will send us "recognized" event.
                              pause();
                              stopping = 'stop';
                            } // Abort should not be dispatched without support of "stopContinuousRecognitionAsync".
                            // But for defensive purpose, we make sure "stopContinuousRecognitionAsync" is available before we can call.


                            if (!(abort && recognizer.stopContinuousRecognitionAsync)) {
                              _context3.next = 20;
                              break;
                            }

                            _context3.next = 20;
                            return cognitiveServicesAsyncToPromise(recognizer.stopContinuousRecognitionAsync.bind(recognizer))();

                          case 20:
                            _context3.next = 61;
                            break;

                          case 22:
                            if (!audioSourceReady) {
                              _context3.next = 27;
                              break;
                            }

                            _this4.dispatchEvent(new SpeechRecognitionEvent('audiostart'));

                            audioStarted = true;
                            _context3.next = 61;
                            break;

                          case 27:
                            if (!firstAudibleChunk) {
                              _context3.next = 32;
                              break;
                            }

                            _this4.dispatchEvent(new SpeechRecognitionEvent('soundstart'));

                            soundStarted = true;
                            _context3.next = 61;
                            break;

                          case 32:
                            if (!audioSourceOff) {
                              _context3.next = 40;
                              break;
                            }

                            // Looks like we don't need this line and all the tests are still working.
                            // Guessing probably stopping is already truthy.
                            // stopping = true;
                            speechStarted && _this4.dispatchEvent(new SpeechRecognitionEvent('speechend'));
                            soundStarted && _this4.dispatchEvent(new SpeechRecognitionEvent('soundend'));
                            audioStarted && _this4.dispatchEvent(new SpeechRecognitionEvent('audioend'));
                            audioStarted = soundStarted = speechStarted = false;
                            return _context3.abrupt("return", "break");

                          case 40:
                            if (!(stopping !== 'abort')) {
                              _context3.next = 61;
                              break;
                            }

                            if (!(recognized && recognized.result && recognized.result.reason === ResultReason.NoMatch)) {
                              _context3.next = 45;
                              break;
                            }

                            finalEvent = {
                              error: 'no-speech',
                              type: 'error'
                            };
                            _context3.next = 61;
                            break;

                          case 45:
                            if (!(recognized || recognizing)) {
                              _context3.next = 61;
                              break;
                            }

                            if (!audioStarted) {
                              // Unconfirmed prevention of quirks
                              _this4.dispatchEvent(new SpeechRecognitionEvent('audiostart'));

                              audioStarted = true;
                            }

                            if (!soundStarted) {
                              _this4.dispatchEvent(new SpeechRecognitionEvent('soundstart'));

                              soundStarted = true;
                            }

                            if (!speechStarted) {
                              _this4.dispatchEvent(new SpeechRecognitionEvent('speechstart'));

                              speechStarted = true;
                            }

                            if (!recognized) {
                              _context3.next = 60;
                              break;
                            }

                            result = (0, _cognitiveServiceEventResultToWebSpeechRecognitionResultList.default)(recognized.result, {
                              maxAlternatives: _this4.maxAlternatives,
                              textNormalization: textNormalization
                            });
                            recognizable = !!result[0].transcript;

                            if (recognizable) {
                              finalizedResults = [].concat((0, _toConsumableArray2.default)(finalizedResults), [result]);
                              _this4.continuous && _this4.dispatchEvent(new SpeechRecognitionEvent('result', {
                                results: finalizedResults
                              }));
                            } // If it is continuous, we just sent the finalized results. So we don't need to send it again after "audioend" event.


                            if (_this4.continuous && recognizable) {
                              finalEvent = null;
                            } else {
                              finalEvent = {
                                results: finalizedResults,
                                type: 'result'
                              };
                            }

                            if (!(!_this4.continuous && recognizer.stopContinuousRecognitionAsync)) {
                              _context3.next = 57;
                              break;
                            }

                            _context3.next = 57;
                            return cognitiveServicesAsyncToPromise(recognizer.stopContinuousRecognitionAsync.bind(recognizer))();

                          case 57:
                            // If event order can be loosened, we can send the recognized event as soon as we receive it.
                            // 1. If it is not recognizable (no-speech), we should send an "error" event just before "end" event. We will not loosen "error" events.
                            if (looseEvents && finalEvent && recognizable) {
                              _this4.dispatchEvent(new SpeechRecognitionEvent(finalEvent.type, finalEvent));

                              finalEvent = null;
                            }

                            _context3.next = 61;
                            break;

                          case 60:
                            if (recognizing) {
                              _this4.interimResults && _this4.dispatchEvent(new SpeechRecognitionEvent('result', {
                                results: [].concat((0, _toConsumableArray2.default)(finalizedResults), [(0, _cognitiveServiceEventResultToWebSpeechRecognitionResultList.default)(recognizing.result, {
                                  maxAlternatives: _this4.maxAlternatives,
                                  textNormalization: textNormalization
                                })])
                              }));
                            }

                          case 61:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _loop);
                  });
                  loop = 0;

                case 24:
                  if (!(!stopping || audioStarted)) {
                    _context4.next = 32;
                    break;
                  }

                  return _context4.delegateYield(_loop(loop), "t0", 26);

                case 26:
                  _ret = _context4.t0;

                  if (!(_ret === "break")) {
                    _context4.next = 29;
                    break;
                  }

                  return _context4.abrupt("break", 32);

                case 29:
                  loop++;
                  _context4.next = 24;
                  break;

                case 32:
                  if (speechStarted) {
                    this.dispatchEvent(new SpeechRecognitionEvent('speechend'));
                  }

                  if (soundStarted) {
                    this.dispatchEvent(new SpeechRecognitionEvent('soundend'));
                  }

                  if (audioStarted) {
                    this.dispatchEvent(new SpeechRecognitionEvent('audioend'));
                  }

                  if (finalEvent) {
                    if (finalEvent.type === 'result' && !finalEvent.results.length) {
                      finalEvent = {
                        error: 'no-speech',
                        type: 'error'
                      };
                    }

                    if (finalEvent.type === 'error') {
                      this.dispatchEvent(new ErrorEvent('error', finalEvent));
                    } else {
                      this.dispatchEvent(new SpeechRecognitionEvent(finalEvent.type, finalEvent));
                    }
                  } // Even though there is no "start" event emitted, we will still emit "end" event
                  // This is mainly for "microphone blocked" story.


                  this.dispatchEvent(new SpeechRecognitionEvent('end'));
                  detachAudioConfigEvent();
                  _context4.next = 44;
                  break;

                case 40:
                  _context4.prev = 40;
                  _context4.t1 = _context4["catch"](4);
                  // Logging out the erorr because Speech SDK would fail silently.
                  console.error(_context4.t1);
                  throw _context4.t1;

                case 44:
                  _context4.prev = 44;
                  unprepare();
                  recognizer.dispose();
                  return _context4.finish(44);

                case 48:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee3, this, [[4, 40, 44, 48]]);
        }));

        function _startOnce() {
          return _startOnce2.apply(this, arguments);
        }

        return _startOnce;
      }()
    }]);
    return SpeechRecognition;
  }(_es.EventTarget);

  return {
    SpeechGrammarList: _SpeechGrammarList.default,
    SpeechRecognition: SpeechRecognition,
    SpeechRecognitionEvent: SpeechRecognitionEvent
  };
}

var _default = function _default(options) {
  var _patchOptions = (0, _patchOptions2.default)(options),
      _patchOptions$audioCo = _patchOptions.audioConfig,
      audioConfig = _patchOptions$audioCo === void 0 ? AudioConfig.fromDefaultMicrophoneInput() : _patchOptions$audioCo,
      _patchOptions$enableT = _patchOptions.enableTelemetry,
      enableTelemetry = _patchOptions$enableT === void 0 ? true : _patchOptions$enableT,
      fetchCredentials = _patchOptions.fetchCredentials,
      looseEvents = _patchOptions.looseEvents,
      referenceGrammars = _patchOptions.referenceGrammars,
      speechRecognitionEndpointId = _patchOptions.speechRecognitionEndpointId,
      _patchOptions$textNor = _patchOptions.textNormalization,
      textNormalization = _patchOptions$textNor === void 0 ? 'display' : _patchOptions$textNor;

  if (!audioConfig && (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia)) {
    console.warn('web-speech-cognitive-services: This browser does not support WebRTC and it will not work with Cognitive Services Speech Services.');
    return {};
  }

  var createRecognizer = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(lang) {
      var _yield$fetchCredentia, authorizationToken, region, speechRecognitionHostname, subscriptionKey, speechConfig, host;

      return _regenerator.default.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return fetchCredentials();

            case 2:
              _yield$fetchCredentia = _context5.sent;
              authorizationToken = _yield$fetchCredentia.authorizationToken;
              region = _yield$fetchCredentia.region;
              speechRecognitionHostname = _yield$fetchCredentia.speechRecognitionHostname;
              subscriptionKey = _yield$fetchCredentia.subscriptionKey;

              if (speechRecognitionHostname) {
                host = {
                  hostname: speechRecognitionHostname,
                  port: 443,
                  protocol: 'wss:'
                };

                if (authorizationToken) {
                  speechConfig = SpeechConfig.fromHost(host);
                  speechConfig.authorizationToken = authorizationToken;
                } else {
                  speechConfig = SpeechConfig.fromHost(host, subscriptionKey);
                }
              } else {
                speechConfig = authorizationToken ? SpeechConfig.fromAuthorizationToken(authorizationToken, region) : SpeechConfig.fromSubscription(subscriptionKey, region);
              }

              if (speechRecognitionEndpointId) {
                speechConfig.endpointId = speechRecognitionEndpointId;
              }

              speechConfig.outputFormat = OutputFormat.Detailed;
              speechConfig.speechRecognitionLanguage = lang || 'en-US';
              return _context5.abrupt("return", new SpeechRecognizer(speechConfig, audioConfig));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }));

    return function createRecognizer(_x) {
      return _ref12.apply(this, arguments);
    };
  }();

  return createSpeechRecognitionPonyfillFromRecognizer({
    audioConfig: audioConfig,
    createRecognizer: createRecognizer,
    enableTelemetry: enableTelemetry,
    looseEvents: looseEvents,
    referenceGrammars: referenceGrammars,
    textNormalization: textNormalization
  });
};

exports.default = _default;
//# sourceMappingURL=createSpeechRecognitionPonyfill.js.map