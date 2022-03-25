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

var _default = /*#__PURE__*/function () {
  function _default() {
    (0, _classCallCheck2.default)(this, _default);
  }

  (0, _createClass2.default)(_default, [{
    key: "pause",
    value: function pause() {
      this.audioContext && this.audioContext.suspend();
      this.playingUtterance && this.playingUtterance.emit('pause');
    }
  }, {
    key: "resume",
    value: function resume() {
      this.audioContext && this.audioContext.resume();
      this.playingUtterance && this.playingUtterance.emit('resume');
    }
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(queue, _ref) {
        var AudioContext, utterance;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                AudioContext = _ref.AudioContext;

                if (!this.audioContext) {
                  _context.next = 3;
                  break;
                }

                throw new Error('already started');

              case 3:
                _context.prev = 3;

              case 4:
                if (!(utterance = queue.shift())) {
                  _context.next = 11;
                  break;
                }

                this.playingUtterance = utterance;
                _context.next = 8;
                return utterance.play(this.audioContext || (this.audioContext = new AudioContext()));

              case 8:
                this.playingUtterance = null;
                _context.next = 4;
                break;

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return this.audioContext;

              case 14:
                _context.t0 = _context.sent;

                if (!_context.t0) {
                  _context.next = 17;
                  break;
                }

                this.audioContext.close();

              case 17:
                return _context.finish(11);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3,, 11, 18]]);
      }));

      function start(_x, _x2) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this.playingUtterance && this.playingUtterance.stop();

      if (this.audioContext) {
        // Play -> Pause -> Cancel (stop)
        // This would generate these events: "start", "pause", "end"
        // Without this code, the "end" event will not emit until resume() is called
        // Cancelling an unstarted utterance will not emit any "start" or "end" event
        this.audioContext.close();
        this.audioContext = null;
      }
    }
  }]);
  return _default;
}();

exports.default = _default;
//# sourceMappingURL=AudioContextConsumer.js.map