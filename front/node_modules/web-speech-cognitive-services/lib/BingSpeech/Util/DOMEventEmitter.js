"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _events = _interopRequireDefault(require("events"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = /*#__PURE__*/function () {
  function _default() {
    var _this = this;

    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck2.default)(this, _default);
    this._events = new _events.default();
    events.forEach(function (name) {
      _this._events.addListener(name, function (event) {
        var handler = _this["on".concat(name)];

        handler && handler.call(_this, event);
      });
    });
  }

  (0, _createClass2.default)(_default, [{
    key: "addEventListener",
    value: function addEventListener(name, listener) {
      this._events.addListener(name, listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(name, listener) {
      name ? this._events.removeListener(name, listener) : this._events.removeAllListeners(name);
    }
  }, {
    key: "emit",
    value: function emit(name, event) {
      this._events.emit(name, _objectSpread(_objectSpread({}, event), {}, {
        target: this,
        type: name
      }));
    }
  }]);
  return _default;
}();

exports.default = _default;
//# sourceMappingURL=DOMEventEmitter.js.map