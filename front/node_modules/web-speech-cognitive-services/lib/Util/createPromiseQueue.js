"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _pDeferEs = _interopRequireDefault(require("p-defer-es5"));

function _default() {
  var shiftDeferred;
  var queue = [];

  var push = function push(value) {
    if (shiftDeferred) {
      var _shiftDeferred = shiftDeferred,
          resolve = _shiftDeferred.resolve;
      shiftDeferred = null;
      resolve(value);
    } else {
      queue.push(value);
    }
  };

  var shift = function shift() {
    if (queue.length) {
      return Promise.resolve(queue.shift());
    }

    return (shiftDeferred || (shiftDeferred = (0, _pDeferEs.default)())).promise;
  };

  return {
    push: push,
    shift: shift
  };
}
//# sourceMappingURL=createPromiseQueue.js.map