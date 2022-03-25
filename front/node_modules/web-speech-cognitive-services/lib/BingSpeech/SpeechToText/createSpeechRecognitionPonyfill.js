"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var CognitiveSpeech = _interopRequireWildcard(require("microsoft-speech-browser-sdk"));

var _eventAsPromise = _interopRequireDefault(require("event-as-promise"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _DOMEventEmitter2 = _interopRequireDefault(require("../Util/DOMEventEmitter"));

var _fetchAuthorizationToken = _interopRequireDefault(require("../fetchAuthorizationToken"));

var _SpeechGrammarList = _interopRequireDefault(require("./SpeechGrammarList"));

var _excluded = ["eventListener"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var VERSION = "7.1.1";

function buildSpeechResult(transcript, confidence, isFinal) {
  var result = [{
    confidence: confidence,
    transcript: transcript
  }];
  result.isFinal = isFinal;
  return {
    results: [result],
    type: 'result'
  };
}

function bingSpeechPromisify(fn) {
  return function () {
    try {
      var _sink = new CognitiveSpeech.Sink();

      fn().then(_sink.Resolve, _sink.Reject);
      return new CognitiveSpeech.Promise(_sink);
    } catch (err) {
      sink.Reject(err.message);
    }
  };
}

var _default = function _default(_ref) {
  var authorizationToken = _ref.authorizationToken,
      subscriptionKey = _ref.subscriptionKey,
      textNormalization = _ref.textNormalization;

  if (!authorizationToken && !subscriptionKey) {
    console.warn('Either authorization token or subscription key must be specified');
    return {};
  } else if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
    console.warn('This browser does not support WebRTC and it will not work with Cognitive Services Speech Services.');
    return {};
  }

  var SpeechRecognition = /*#__PURE__*/function (_DOMEventEmitter) {
    (0, _inherits2.default)(SpeechRecognition, _DOMEventEmitter);

    var _super = _createSuper(SpeechRecognition);

    function SpeechRecognition() {
      var _this;

      (0, _classCallCheck2.default)(this, SpeechRecognition);
      _this = _super.call(this, ['audiostart', 'soundstart', 'speechstart', 'speechend', 'soundend', 'audioend', 'result', 'nomatch', 'error', 'start', 'end', 'cognitiveservices']);
      _this._lang = typeof window !== 'undefined' ? window.document.documentElement.getAttribute('lang') || window.navigator.language : 'en-US';
      _this.readyState = 0;
      _this.createRecognizer = (0, _memoizeOne.default)(function (language) {
        var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CognitiveSpeech.RecognitionMode.Interactive;
        var osPlatform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.navigator.userAgent;
        var osName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.navigator.appName;
        var osVersion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window.navigator.appVersion;
        var deviceManufacturer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'microsoft-speech-browser-sdk';
        var deviceModel = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'web-speech-cognitive-services';
        var deviceVersion = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : VERSION;
        var config = new CognitiveSpeech.RecognizerConfig(new CognitiveSpeech.SpeechConfig(new CognitiveSpeech.Context(new CognitiveSpeech.OS(osPlatform, osName, osVersion), new CognitiveSpeech.Device(deviceManufacturer, deviceModel, deviceVersion))), mode, language, CognitiveSpeech.SpeechResultFormat.Detailed);
        var fetchToken;

        if (authorizationToken) {
          fetchToken = bingSpeechPromisify( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(typeof authorizationToken === 'function')) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 3;
                    return authorizationToken();

                  case 3:
                    _context.t0 = _context.sent;
                    _context.next = 7;
                    break;

                  case 6:
                    _context.t0 = authorizationToken;

                  case 7:
                    return _context.abrupt("return", _context.t0);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
        } else if (subscriptionKey) {
          fetchToken = bingSpeechPromisify( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", (0, _fetchAuthorizationToken.default)(subscriptionKey));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
        }

        return CognitiveSpeech.CreateRecognizer(config, new CognitiveSpeech.CognitiveTokenAuthentication(fetchToken, fetchToken));
      });
      return _this;
    }

    (0, _createClass2.default)(SpeechRecognition, [{
      key: "grammars",
      get: function get() {
        return this._grammars;
      },
      set: function set(nextGrammars) {
        if (nextGrammars && !(nextGrammars instanceof _SpeechGrammarList.default)) {
          throw new Error('must be instance of SpeechGrammarList from "web-speech-cognitive-services"');
        }

        this._grammars = nextGrammars;
      }
    }, {
      key: "lang",
      get: function get() {
        return this._lang;
      },
      set: function set(nextLang) {
        this._lang = nextLang;
      }
    }, {
      key: "continuous",
      get: function get() {
        return false;
      },
      set: function set(nextContinuous) {
        nextContinuous && console.warn("Bing Speech: Cannot set continuous to ".concat(nextContinuous, ", this feature is not supported."));
      }
    }, {
      key: "interimResults",
      get: function get() {
        return true;
      },
      set: function set(nextInterimResults) {
        !nextInterimResults && console.warn("Bing Speech: Cannot set interimResults to ".concat(nextInterimResults, ", this feature is not supported."));
      }
    }, {
      key: "maxAlternatives",
      get: function get() {
        return 1;
      },
      set: function set(nextMaxAlternatives) {
        nextMaxAlternatives !== 1 && console.warn("Bing Speech: Cannot set maxAlternatives to ".concat(nextMaxAlternatives, ", this feature is not supported."));
      }
    }, {
      key: "serviceURI",
      get: function get() {
        return null;
      },
      set: function set(nextServiceURI) {
        nextServiceURI && console.warn("Bing Speech: Cannot set serviceURI to ".concat(nextServiceURI, ", this feature is not supported."));
      }
    }, {
      key: "abort",
      value: function abort() {
        // TODO: Should redesign how to stop a recognition session
        //       After abort is called, we should not saw it is a "success", "silent", or "no match"
        var _ref4 = this.recognizer || {},
            AudioSource = _ref4.AudioSource;

        AudioSource && AudioSource.TurnOff();
        this._aborted = true;
      }
    }, {
      key: "emitCognitiveServices",
      value: function emitCognitiveServices(type, event) {
        this.emit('cognitiveservices', _objectSpread(_objectSpread({}, event), {}, {
          subType: type
        }));
      }
    }, {
      key: "stop",
      value: function stop() {
        // TODO: Support stop
        var _ref5 = this.recognizer || {},
            AudioSource = _ref5.AudioSource;

        AudioSource && AudioSource.TurnOff();
      }
    }, {
      key: "start",
      value: function () {
        var _start = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
          var recognizer, _toPromise, eventListener, promises, speechContext, recognitionTriggered, error, listeningStarted, connectingToService, recognitionStarted, gotFirstHypothesis, speechHypothesis, recognitionEnded, speechDetailedPhrase, recognitionResult, best, _recognitionEnded;

          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  recognizer = this.recognizer = this.createRecognizer(this.lang, this.osPlatform || window.navigator.userAgent, this.osName || window.navigator.appName, this.osVersion || window.navigator.appVersion, this.deviceManufacturer || 'web-speech-cognitive-services', this.deviceModel || 'web-speech-cognitive-services', this.deviceVersion || VERSION);
                  _toPromise = toPromise(), eventListener = _toPromise.eventListener, promises = (0, _objectWithoutProperties2.default)(_toPromise, _excluded);
                  speechContext = this.grammars && this.grammars.createSpeechContext();
                  recognizer.Recognize(eventListener, speechContext && JSON.stringify(speechContext));
                  this._aborted = false;
                  _context3.next = 7;
                  return promises.recognitionTriggered;

                case 7:
                  recognitionTriggered = _context3.sent;
                  this.emitCognitiveServices('recognitionTriggered', recognitionTriggered);
                  _context3.next = 11;
                  return Promise.race([promises.listeningStarted, promises.recognitionEnded]);

                case 11:
                  listeningStarted = _context3.sent;
                  this.emitCognitiveServices(listeningStarted.Name === 'RecognitionEndedEvent' ? 'recognitionEnded' : ' listeningStarted', listeningStarted);

                  if (!(listeningStarted.Name === 'RecognitionEndedEvent')) {
                    _context3.next = 17;
                    break;
                  }

                  // Possibly not authorized to use microphone
                  if (listeningStarted.Status === CognitiveSpeech.RecognitionCompletionStatus.AudioSourceError) {
                    error = 'not-allowed';
                  } else {
                    error = CognitiveSpeech.RecognitionCompletionStatus[listeningStarted.Status];
                  }

                  _context3.next = 62;
                  break;

                case 17:
                  this.emit('start');
                  _context3.next = 20;
                  return promises.connectingToService;

                case 20:
                  connectingToService = _context3.sent;
                  this.emitCognitiveServices('connectingToService', connectingToService);
                  _context3.next = 24;
                  return Promise.race([promises.recognitionStarted, promises.recognitionEnded]);

                case 24:
                  recognitionStarted = _context3.sent;
                  this.emitCognitiveServices(recognitionStarted.Name === 'RecognitionEndedEvent' ? 'recognitionEnded' : 'recognitionStarted', recognitionStarted);
                  this.emit('audiostart');

                  if (!(recognitionStarted.Name === 'RecognitionEndedEvent')) {
                    _context3.next = 31;
                    break;
                  }

                  // Possibly network error
                  if (recognitionStarted.Status === CognitiveSpeech.RecognitionCompletionStatus.ConnectError) {
                    error = 'network';
                  } else {
                    error = CognitiveSpeech.RecognitionCompletionStatus[recognitionStarted.Status];
                  }

                  _context3.next = 42;
                  break;

                case 31:
                  _context3.next = 33;
                  return Promise.race([promises.getSpeechHypothesisPromise(), promises.speechEndDetected]);

                case 33:
                  speechHypothesis = _context3.sent;
                  this.emitCognitiveServices(speechHypothesis.Name === 'SpeechEndDetectedEvent' ? 'speechEndDetected' : 'speechHypothesis', speechHypothesis);

                  if (!(speechHypothesis.Name === 'SpeechEndDetectedEvent')) {
                    _context3.next = 37;
                    break;
                  }

                  return _context3.abrupt("break", 41);

                case 37:
                  if (!gotFirstHypothesis) {
                    gotFirstHypothesis = true;
                    this.emit('soundstart');
                    this.emit('speechstart');
                  }

                  this.emit('result', buildSpeechResult(speechHypothesis.Result.Text, .5, false));

                case 39:
                  _context3.next = 31;
                  break;

                case 41:
                  if (gotFirstHypothesis) {
                    this.emit('speechend');
                    this.emit('soundend');
                  }

                case 42:
                  this.emit('audioend');

                  if (!this._aborted) {
                    _context3.next = 51;
                    break;
                  }

                  error = 'aborted';
                  _context3.next = 47;
                  return promises.recognitionEnded;

                case 47:
                  recognitionEnded = _context3.sent;
                  this.emitCognitiveServices('recognitionEnded', recognitionEnded);
                  _context3.next = 62;
                  break;

                case 51:
                  _context3.next = 53;
                  return Promise.race([promises.speechDetailedPhrase, promises.recognitionEnded]);

                case 53:
                  speechDetailedPhrase = _context3.sent;
                  this.emitCognitiveServices(speechDetailedPhrase.Name === 'RecognitionEndedEvent' ? 'recognitionEnded' : 'speechDetailedPhrase', speechDetailedPhrase);

                  if (!(speechDetailedPhrase.Name !== 'RecognitionEndedEvent')) {
                    _context3.next = 62;
                    break;
                  }

                  recognitionResult = CognitiveSpeech.RecognitionStatus[speechDetailedPhrase.Result.RecognitionStatus];

                  if (recognitionResult === CognitiveSpeech.RecognitionStatus.Success) {
                    // TODO: [P2] Support maxAlternatives
                    best = speechDetailedPhrase.Result.NBest[0];
                    this.emit('result', buildSpeechResult(textNormalization === 'itn' ? best.ITN : textNormalization === 'lexical' ? best.Lexical : textNormalization === 'maskeditn' ? best.MaskedITN : best.Display, best.Confidence, true));
                  } else if (recognitionResult !== CognitiveSpeech.RecognitionStatus.NoMatch) {
                    // Possibly silent or muted
                    if (recognitionResult === CognitiveSpeech.RecognitionStatus.InitialSilenceTimeout) {
                      error = 'no-speech';
                    } else {
                      error = speechDetailedPhrase.Result.RecognitionStatus;
                    }
                  }

                  _context3.next = 60;
                  return promises.recognitionEnded;

                case 60:
                  _recognitionEnded = _context3.sent;
                  this.emitCognitiveServices('recognitionEnded', _recognitionEnded);

                case 62:
                  error && this.emit('error', {
                    error: error
                  });
                  this.emit('end');

                case 64:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function start() {
          return _start.apply(this, arguments);
        }

        return start;
      }()
    }]);
    return SpeechRecognition;
  }(_DOMEventEmitter2.default);

  return {
    SpeechGrammarList: _SpeechGrammarList.default,
    SpeechRecognition: SpeechRecognition
  };
};

exports.default = _default;

function toPromise() {
  var events = {
    ConnectingToServiceEvent: new _eventAsPromise.default(),
    ListeningStartedEvent: new _eventAsPromise.default(),
    RecognitionEndedEvent: new _eventAsPromise.default(),
    RecognitionStartedEvent: new _eventAsPromise.default(),
    RecognitionTriggeredEvent: new _eventAsPromise.default(),
    SpeechDetailedPhraseEvent: new _eventAsPromise.default(),
    SpeechEndDetectedEvent: new _eventAsPromise.default(),
    SpeechHypothesisEvent: new _eventAsPromise.default(),
    SpeechSimplePhraseEvent: new _eventAsPromise.default(),
    SpeechStartDetectedEvent: new _eventAsPromise.default()
  };
  return {
    connectingToService: events.ConnectingToServiceEvent.upcoming(),
    listeningStarted: events.ListeningStartedEvent.upcoming(),
    recognitionEnded: events.RecognitionEndedEvent.upcoming(),
    recognitionStarted: events.RecognitionStartedEvent.upcoming(),
    recognitionTriggered: events.RecognitionTriggeredEvent.upcoming(),
    speechDetailedPhrase: events.SpeechDetailedPhraseEvent.upcoming(),
    speechEndDetected: events.SpeechEndDetectedEvent.upcoming(),
    getSpeechHypothesisPromise: function getSpeechHypothesisPromise() {
      return events.SpeechHypothesisEvent.upcoming();
    },
    speechSimplePhrase: events.SpeechSimplePhraseEvent.upcoming(),
    speechStartDetected: events.SpeechStartDetectedEvent.upcoming(),
    eventListener: function eventListener(event) {
      var name = event.Name;
      var eventAsPromise = events[name];

      if (eventAsPromise) {
        eventAsPromise.eventListener.call(null, event);
      } else {
        console.warn("Unexpected event \"".concat(name, "\" from Cognitive Services, please file a bug to https://github.com/compulim/web-speech-cognitive-services"));
      }
    }
  };
}
//# sourceMappingURL=createSpeechRecognitionPonyfill.js.map