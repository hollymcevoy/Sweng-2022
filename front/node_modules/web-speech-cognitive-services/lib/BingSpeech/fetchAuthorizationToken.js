"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var TOKEN_URL = 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken';

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(subscriptionKey) {
    var res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(TOKEN_URL, {
              headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
              },
              method: 'POST'
            });

          case 2:
            res = _context.sent;

            if (!(res.status !== 200)) {
              _context.next = 5;
              break;
            }

            throw new Error("Failed to fetch speech token, server returned ".concat(res.status));

          case 5:
            return _context.abrupt("return", res.text());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}
//# sourceMappingURL=fetchAuthorizationToken.js.map