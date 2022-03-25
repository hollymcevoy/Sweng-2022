import { AudioConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { WebSpeechPonyfillFactory } from 'botframework-webchat-api';
import CognitiveServicesAudioOutputFormat from './types/CognitiveServicesAudioOutputFormat';
import CognitiveServicesCredentials from './types/CognitiveServicesCredentials';
import CognitiveServicesTextNormalization from './types/CognitiveServicesTextNormalization';
export default function createCognitiveServicesSpeechServicesPonyfillFactory({ audioConfig, audioContext, audioInputDeviceId, credentials, enableTelemetry, speechRecognitionEndpointId, speechSynthesisDeploymentId, speechSynthesisOutputFormat, textNormalization }: {
    audioConfig?: AudioConfig;
    audioContext?: AudioContext;
    audioInputDeviceId?: string;
    credentials: CognitiveServicesCredentials;
    enableTelemetry?: true;
    speechRecognitionEndpointId?: string;
    speechSynthesisDeploymentId?: string;
    speechSynthesisOutputFormat?: CognitiveServicesAudioOutputFormat;
    textNormalization?: CognitiveServicesTextNormalization;
}): WebSpeechPonyfillFactory;
//# sourceMappingURL=createCognitiveServicesSpeechServicesPonyfillFactory.d.ts.map