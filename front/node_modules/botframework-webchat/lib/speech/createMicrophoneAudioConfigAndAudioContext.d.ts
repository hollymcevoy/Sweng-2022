export default function createMicrophoneAudioConfigAndAudioContext({ audioContext, audioInputDeviceId, enableTelemetry }: {
    audioContext?: AudioContext;
    audioInputDeviceId?: string;
    enableTelemetry?: true;
}): {
    audioConfig: import("microsoft-cognitiveservices-speech-sdk").AudioConfig;
    audioContext: AudioContext;
};
//# sourceMappingURL=createMicrophoneAudioConfigAndAudioContext.d.ts.map