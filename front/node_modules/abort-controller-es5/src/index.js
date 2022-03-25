import AbortControllerImpl, { AbortSignal as AbortSignalImpl } from 'abort-controller/dist/abort-controller';

const NativeAbortController = (typeof window === 'undefined' ? {} : window).AbortController;
const AbortController = NativeAbortController || AbortControllerImpl;

const NativeAbortSignal = (typeof window === 'undefined' ? {} : window).AbortSignal;
const AbortSignal = NativeAbortSignal || AbortSignalImpl;

module.exports = { AbortController, AbortSignal, default: AbortController };
