import globalThis from '@babel/runtime-corejs3/core-js/global-this';
import { AbortController, AbortSignal } from '../lib/esm/index.mjs';

const scope = typeof globalThis === 'undefined' ? 0 : globalThis;

if (scope) {
  !scope.AbortController && (scope.AbortController = AbortController);
  !scope.AbortSignal && (scope.AbortSignal = AbortSignal);
}
