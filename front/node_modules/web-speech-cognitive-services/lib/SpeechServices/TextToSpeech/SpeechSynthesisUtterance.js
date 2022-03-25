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

var _eventAsPromise = _interopRequireDefault(require("event-as-promise"));

var _fetchSpeechData = _interopRequireDefault(require("./fetchSpeechData"));

var _SpeechSynthesisEvent = _interopRequireDefault(require("./SpeechSynthesisEvent"));

var _subscribeEvent = _interopRequireDefault(require("./subscribeEvent"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function asyncDecodeAudioData(audioContext, arrayBuffer) {
  return new Promise(function (resolve, reject) {
    var promise = audioContext.decodeAudioData(arrayBuffer, resolve, reject); // Newer implementation of "decodeAudioData" will return a Promise

    promise && typeof promise.then === 'function' && resolve(promise);
  });
}

function playDecoded(audioContext, audioBuffer, source) {
  return new Promise(function (resolve, reject) {
    var audioContextClosed = new _eventAsPromise.default();
    var sourceEnded = new _eventAsPromise.default();
    var unsubscribe = (0, _subscribeEvent.default)(audioContext, 'statechange', function (_ref) {
      var state = _ref.target.state;
      return state === 'closed' && audioContextClosed.eventListener();
    });

    try {
      source.buffer = audioBuffer; // "ended" may not fire if the underlying AudioContext is closed prematurely

      source.onended = sourceEnded.eventListener;
      source.connect(audioContext.destination);
      source.start(0);
      Promise.race([audioContextClosed.upcoming(), sourceEnded.upcoming()]).then(resolve);
    } catch (err) {
      reject(err);
    } finally {
      unsubscribe();
    }
  });
}

var SpeechSynthesisUtterance = /*#__PURE__*/function (_EventTarget) {
  (0, _inherits2.default)(SpeechSynthesisUtterance, _EventTarget);

  var _super = _createSuper(SpeechSynthesisUtterance);

  function SpeechSynthesisUtterance(text) {
    var _this;

    (0, _classCallCheck2.default)(this, SpeechSynthesisUtterance);
    _this = _super.call(this);
    _this._lang = null;
    _this._pitch = 1;
    _this._rate = 1;
    _this._voice = null;
    _this._volume = 1;
    _this.text = text;
    _this.onboundary = null;
    _this.onend = null;
    _this.onerror = null;
    _this.onmark = null;
    _this.onpause = null;
    _this.onresume = null;
    _this.onstart = null;
    return _this;
  }

  (0, _createClass2.default)(SpeechSynthesisUtterance, [{
    key: "lang",
    get: function get() {
      return this._lang;
    },
    set: function set(value) {
      this._lang = value;
    }
  }, {
    key: "onboundary",
    get: function get() {
      return (0, _es.getEventAttributeValue)(this, 'boundary');
    },
    set: function set(value) {
      (0, _es.setEventAttributeValue)(this, 'boundary', value);
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
    key: "onmark",
    get: function get() {
      return (0, _es.getEventAttributeValue)(this, 'mark');
    },
    set: function set(value) {
      (0, _es.setEventAttributeValue)(this, 'mark', value);
    }
  }, {
    key: "onpause",
    get: function get() {
      return (0, _es.getEventAttributeValue)(this, 'pause');
    },
    set: function set(value) {
      (0, _es.setEventAttributeValue)(this, 'pause', value);
    }
  }, {
    key: "onresume",
    get: function get() {
      return (0, _es.getEventAttributeValue)(this, 'resume');
    },
    set: function set(value) {
      (0, _es.setEventAttributeValue)(this, 'resume', value);
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
    key: "pitch",
    get: function get() {
      return this._pitch;
    },
    set: function set(value) {
      this._pitch = value;
    }
  }, {
    key: "rate",
    get: function get() {
      return this._rate;
    },
    set: function set(value) {
      this._rate = value;
    }
  }, {
    key: "voice",
    get: function get() {
      return this._voice;
    },
    set: function set(value) {
      this._voice = value;
    }
  }, {
    key: "volume",
    get: function get() {
      return this._volume;
    },
    set: function set(value) {
      this._volume = value;
    }
  }, {
    key: "preload",
    value: function preload(_ref2) {
      var deploymentId = _ref2.deploymentId,
          fetchCredentials = _ref2.fetchCredentials,
          outputFormat = _ref2.outputFormat;
      this.arrayBufferPromise = (0, _fetchSpeechData.default)({
        fetchCredentials: fetchCredentials,
        deploymentId: deploymentId,
        lang: this.lang || window.navigator.language,
        outputFormat: outputFormat,
        pitch: this.pitch,
        rate: this.rate,
        text: this.text,
        voice: this.voice && this.voice.voiceURI,
        volume: this.volume
      }); // We need to call "catch" to make sure the Promise is running.
      // We will ignore the reject result and handled in play() later.

      this.arrayBufferPromise.catch();
    }
  }, {
    key: "play",
    value: function () {
      var _play = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(audioContext) {
        var source, audioBuffer;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // We should emit "start" event even if preload() failed.
                this.dispatchEvent(new _SpeechSynthesisEvent.default('start')); // HACK: iOS requires bufferSourceNode to be constructed before decoding data.

                source = audioContext.createBufferSource();
                _context.t0 = asyncDecodeAudioData;
                _context.t1 = audioContext;
                _context.next = 7;
                return this.arrayBufferPromise;

              case 7:
                _context.t2 = _context.sent;
                _context.next = 10;
                return (0, _context.t0)(_context.t1, _context.t2);

              case 10:
                audioBuffer = _context.sent;
                this._playingSource = source;
                _context.next = 14;
                return playDecoded(audioContext, audioBuffer, source);

              case 14:
                this._playingSource = null;
                this.dispatchEvent(new _SpeechSynthesisEvent.default('end'));
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t3 = _context["catch"](0);
                // "message" is not in spec but to provide a friendly message.
                this.dispatchEvent(new ErrorEvent('error', {
                  error: 'synthesis-failed',
                  message: _context.t3.stack
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function play(_x) {
        return _play.apply(this, arguments);
      }

      return play;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this._playingSource && this._playingSource.stop();
    }
  }]);
  return SpeechSynthesisUtterance;
}(_es.EventTarget);

var _default = SpeechSynthesisUtterance;
exports.default = _default;
//# sourceMappingURL=SpeechSynthesisUtterance.js.map