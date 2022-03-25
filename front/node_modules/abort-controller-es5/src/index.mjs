import AbortControllerImpl, { AbortSignal as AbortSignalImpl } from 'abort-controller/dist/abort-controller.mjs';

const NativeAbortController = (typeof window === 'undefined' ? {} : window).AbortController;
const AbortController = NativeAbortController || AbortControllerImpl;

const NativeAbortSignal = (typeof window === 'undefined' ? {} : window).AbortSignal;
const AbortSignal = NativeAbortSignal || AbortSignalImpl;

export default AbortController;
export { AbortController, AbortSignal };
