"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _microsoftCognitiveservicesSpeech = require("microsoft-cognitiveservices-speech-sdk/distrib/lib/microsoft.cognitiveservices.speech.sdk");

// We are only importing what we need.
var _default = {
  AudioConfig: _microsoftCognitiveservicesSpeech.AudioConfig,
  OutputFormat: _microsoftCognitiveservicesSpeech.OutputFormat,
  ResultReason: _microsoftCognitiveservicesSpeech.ResultReason,
  SpeechConfig: _microsoftCognitiveservicesSpeech.SpeechConfig,
  SpeechRecognizer: _microsoftCognitiveservicesSpeech.SpeechRecognizer
};
exports.default = _default;
//# sourceMappingURL=SpeechSDK.js.map