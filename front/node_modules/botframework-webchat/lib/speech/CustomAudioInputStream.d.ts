import { AudioInputStream } from 'microsoft-cognitiveservices-speech-sdk';
import { AudioSourceEvent, EventSource } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common/Exports';
import { AudioStreamFormatImpl } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/sdk/Audio/AudioStreamFormat';
import { connectivity as Connectivity, ISpeechConfigAudioDevice, type as Type } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.speech/Exports';
import { DeferredPromise } from 'p-defer-es5';
declare type AudioStreamNode = {
    detach: () => Promise<void>;
    id: () => string;
    read: () => Promise<StreamChunk<ArrayBuffer>>;
};
declare type DeviceInfo = {
    connectivity?: Connectivity | 'Bluetooth' | 'Wired' | 'WiFi' | 'Cellular' | 'InBuilt' | 'Unknown';
    manufacturer?: string;
    model?: string;
    type?: Type | 'Phone' | 'Speaker' | 'Car' | 'Headset' | 'Thermostat' | 'Microphones' | 'Deskphone' | 'RemoteControl' | 'Unknown' | 'File' | 'Stream';
};
declare type Format = {
    bitsPerSample: number;
    channels: number;
    samplesPerSec: number;
};
declare type NormalizedOptions = Required<Omit<Options, 'debug'>> & {
    debug: boolean;
};
declare type Options = {
    debug?: true;
    id?: string;
};
declare type StreamChunk<T> = {
    isEnd: boolean;
    buffer: T;
    timeReceived: number;
};
declare const SYMBOL_DEVICE_INFO_DEFERRED: unique symbol;
declare const SYMBOL_EVENTS: unique symbol;
declare const SYMBOL_FORMAT_DEFERRED: unique symbol;
declare const SYMBOL_OPTIONS: unique symbol;
declare abstract class CustomAudioInputStream extends AudioInputStream {
    constructor(options?: Options);
    [SYMBOL_DEVICE_INFO_DEFERRED]: DeferredPromise<DeviceInfo>;
    [SYMBOL_EVENTS]: EventSource<AudioSourceEvent>;
    [SYMBOL_FORMAT_DEFERRED]: DeferredPromise<AudioStreamFormatImpl>;
    [SYMBOL_OPTIONS]: NormalizedOptions;
    /** Gets the event source for listening to events. */
    get events(): EventSource<AudioSourceEvent>;
    /** Gets the format of the audio stream. */
    get format(): Promise<AudioStreamFormatImpl>;
    /** Gets the ID of this audio stream. */
    id(): string;
    /** Emits an event. */
    protected onEvent(event: AudioSourceEvent): void;
    /** Emits an `AudioSourceInitializingEvent`. */
    protected emitInitializing(): void;
    /** Emits an `AudioSourceReadyEvent`. */
    protected emitReady(): void;
    /** Emits an `AudioSourceErrorEvent`. */
    protected emitError(error: Error): void;
    /** Emits an `AudioStreamNodeAttachingEvent`. */
    protected emitNodeAttaching(audioNodeId: string): void;
    /** Emits an `AudioStreamNodeAttachedEvent`. */
    protected emitNodeAttached(audioNodeId: string): void;
    /** Emits an `AudioStreamNodeErrorEvent`. */
    protected emitNodeError(audioNodeId: string, error: Error): void;
    /** Emits an `AudioStreamNodeDetachedEvent`. */
    protected emitNodeDetached(audioNodeId: string): void;
    /** Emits an `AudioSourceOffEvent`. */
    protected emitOff(): void;
    close(): void;
    turnOn(): void;
    detach(): void;
    /** Log the message to console if `debug` is set to `true`. */
    private debug;
    /** Implements this function. When called, it should start recording and return an `IAudioStreamNode`. */
    protected abstract performAttach(audioNodeId: string): Promise<{
        audioStreamNode: AudioStreamNode;
        deviceInfo: DeviceInfo;
        format: Format;
    }>;
    /** Attaches the device by returning an audio node. */
    attach(audioNodeId: string): Promise<AudioStreamNode>;
    /**
     * Implements this function. When called, it should stop recording. This is called before the `IAudioStreamNode.detach` function.
     *
     * Note: when using with Direct Line Speech, this function is never called.
     */
    protected performTurnOff(): Promise<void>;
    /** Turn off the audio device. This is called before detaching from the graph. */
    turnOff(): Promise<void>;
    /** Gets the device information. */
    get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
}
export default CustomAudioInputStream;
export type { AudioStreamNode, DeviceInfo, Format, Options };
//# sourceMappingURL=CustomAudioInputStream.d.ts.map