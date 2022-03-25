import globalThis from '@babel/runtime-corejs3/core-js/global-this';

import markdownItAttrs from '../lib/esm/index.mjs';

const scope = typeof globalThis === 'undefined' ? 0 : globalThis;

scope && (scope.markdownItAttrs = markdownItAttrs);
