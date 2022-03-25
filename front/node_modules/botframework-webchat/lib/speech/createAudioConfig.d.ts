import { AudioConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { AudioStreamNode, DeviceInfo, Format } from './CustomAudioInputStream';
declare type AttachFunction = (audioNodeId: string) => Promise<{
    audioStreamNode: AudioStreamNode;
    deviceInfo: DeviceInfo;
    format: Format;
}>;
declare type TurnOffFunction = () => Promise<void>;
declare type CreateAudioConfigOptions = {
    /** Callback function for attaching the device by returning an audio node. */
    attach: AttachFunction;
    /** `true` to enable diagnostic information, otherwise, `false`. */
    debug?: true;
    /**
     * Callback function for turning off the device before detaching its node from an audio graph.
     *
     * Note: this is not called for Direct Line Speech.
     */
    turnOff?: TurnOffFunction;
};
export default function createAudioConfig(options: CreateAudioConfigOptions): AudioConfig;
export {};
//# sourceMappingURL=createAudioConfig.d.ts.map