"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveFunctionOrReturnValue;

function resolveFunctionOrReturnValue(fnOrValue) {
  return typeof fnOrValue === 'function' ? fnOrValue() : fnOrValue;
}
//# sourceMappingURL=resolveFunctionOrReturnValue.js.map