"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _arrayToMap = _interopRequireDefault(require("../../Util/arrayToMap"));

var _SpeechSDK = _interopRequireDefault(require("../SpeechSDK"));

var _SpeechSDK$ResultReas = _SpeechSDK.default.ResultReason,
    RecognizingSpeech = _SpeechSDK$ResultReas.RecognizingSpeech,
    RecognizedSpeech = _SpeechSDK$ResultReas.RecognizedSpeech;

function _default(result) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$maxAlternatives = _ref.maxAlternatives,
      maxAlternatives = _ref$maxAlternatives === void 0 ? Infinity : _ref$maxAlternatives,
      _ref$textNormalizatio = _ref.textNormalization,
      textNormalization = _ref$textNormalizatio === void 0 ? 'display' : _ref$textNormalizatio;

  if (result.reason === RecognizingSpeech || result.reason === RecognizedSpeech && !result.json.NBest) {
    var resultList = [{
      confidence: 0.5,
      transcript: result.text
    }];

    if (result.reason === RecognizedSpeech) {
      resultList.isFinal = true;
    }

    return resultList;
  } else if (result.reason === RecognizedSpeech) {
    var _resultList = (0, _arrayToMap.default)((result.json.NBest || []).slice(0, maxAlternatives).map(function (_ref2) {
      var confidence = _ref2.Confidence,
          display = _ref2.Display,
          itn = _ref2.ITN,
          lexical = _ref2.Lexical,
          maskedITN = _ref2.MaskedITN;
      return {
        confidence: confidence,
        transcript: textNormalization === 'itn' ? itn : textNormalization === 'lexical' ? lexical : textNormalization === 'maskeditn' ? maskedITN : display
      };
    }), {
      isFinal: true
    });

    return _resultList;
  }

  return [];
}
//# sourceMappingURL=cognitiveServiceEventResultToWebSpeechRecognitionResultList.js.map