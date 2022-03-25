"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var TOKEN_URL_TEMPLATE = 'https://{region}.api.cognitive.microsoft.com/sts/v1.0/issueToken';

function _default(_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var region, subscriptionKey, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            region = _ref.region, subscriptionKey = _ref.subscriptionKey;
            _context.next = 3;
            return fetch(TOKEN_URL_TEMPLATE.replace(/\{region\}/, region), {
              headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
              },
              method: 'POST'
            });

          case 3:
            res = _context.sent;

            if (res.ok) {
              _context.next = 6;
              break;
            }

            throw new Error("Failed to fetch authorization token, server returned ".concat(res.status));

          case 6:
            return _context.abrupt("return", res.text());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}
//# sourceMappingURL=fetchAuthorizationToken.js.map