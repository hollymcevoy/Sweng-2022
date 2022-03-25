"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSpeechServicesPonyfill;
Object.defineProperty(exports, "createSpeechRecognitionPonyfill", {
  enumerable: true,
  get: function get() {
    return _SpeechToText.default;
  }
});
Object.defineProperty(exports, "createSpeechRecognitionPonyfillFromRecognizer", {
  enumerable: true,
  get: function get() {
    return _SpeechToText.createSpeechRecognitionPonyfillFromRecognizer;
  }
});
Object.defineProperty(exports, "createSpeechSynthesisPonyfill", {
  enumerable: true,
  get: function get() {
    return _TextToSpeech.default;
  }
});
Object.defineProperty(exports, "fetchAuthorizationToken", {
  enumerable: true,
  get: function get() {
    return _fetchAuthorizationToken.default;
  }
});

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _SpeechToText = _interopRequireWildcard(require("./SpeechServices/SpeechToText"));

var _TextToSpeech = _interopRequireDefault(require("./SpeechServices/TextToSpeech"));

var _fetchAuthorizationToken = _interopRequireDefault(require("./SpeechServices/fetchAuthorizationToken"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createSpeechServicesPonyfill() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var ponyfill = _objectSpread(_objectSpread({}, _SpeechToText.default.apply(void 0, [options].concat(args))), _TextToSpeech.default.apply(void 0, [options].concat(args)));

  return _objectSpread(_objectSpread({}, ponyfill), {}, {
    then: function then(resolve) {
      console.warn('web-speech-cognitive-services: This function no longer need to be called in an asynchronous fashion. Please update your code. We will remove this Promise.then function on or after 2020-08-10.');
      resolve(ponyfill);
    }
  });
}

var meta = document.createElement('meta');
meta.setAttribute('name', 'web-speech-cognitive-services');
meta.setAttribute('content', "version=".concat("7.1.1"));
document.head.appendChild(meta);
//# sourceMappingURL=SpeechServices.js.map