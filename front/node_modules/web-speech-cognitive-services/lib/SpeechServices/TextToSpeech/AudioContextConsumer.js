"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/* eslint no-await-in-loop: "off" */
var _default = /*#__PURE__*/function () {
  function _default(audioContext) {
    (0, _classCallCheck2.default)(this, _default);
    this.audioContext = audioContext;
  }

  (0, _createClass2.default)(_default, [{
    key: "pause",
    value: function pause() {
      this.audioContext && this.audioContext.suspend();
      this.playingUtterance && this.playingUtterance.dispatchEvent(new CustomEvent('pause'));
    }
  }, {
    key: "resume",
    value: function resume() {
      this.audioContext && this.audioContext.resume();
      this.playingUtterance && this.playingUtterance.dispatchEvent(new CustomEvent('resume'));
    }
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(queue) {
        var utterance;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(utterance = queue.shift())) {
                  _context.next = 7;
                  break;
                }

                this.playingUtterance = utterance;
                _context.next = 4;
                return utterance.play(this.audioContext);

              case 4:
                this.playingUtterance = null;
                _context.next = 0;
                break;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this.playingUtterance && this.playingUtterance.stop();

      if (this.audioContext.state === 'suspended') {
        // Play -> Pause -> Cancel (stop)
        // This would generate these events: "start", "pause", "end"
        // Without this code, the "end" event will not emit until resume() is called
        // Cancelling an unstarted utterance will not emit any "start" or "end" event
        this.audioContext.resume();
      }
    }
  }]);
  return _default;
}();

exports.default = _default;
//# sourceMappingURL=AudioContextConsumer.js.map