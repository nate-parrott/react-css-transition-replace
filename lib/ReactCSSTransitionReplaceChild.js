'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CSSTransitionGroupChild = require('react-transition-group/CSSTransitionGroupChild');

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Uses react-transition-group/CSSTransitionGroupChild with the exception that
 * the first animation frame is skipped when starting new transitions since
 * entering absolutely positioned elements in Chrome does not animate otherwise.
 */
_CSSTransitionGroupChild2.default.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
  var _this2 = this;

  this.classNameAndNodeQueue.push({
    className: className,
    node: node
  });

  if (!this.rafHandle) {
    this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
      return _this2.flushClassNameAndNodeQueueOnNextFrame();
    });
  }
};

// In Chrome the absolutely positioned children would not animate on enter
// if the immediate animation frame is used so this skips to the next one.
_CSSTransitionGroupChild2.default.prototype.flushClassNameAndNodeQueueOnNextFrame = function flushClassNameAndNodeQueueOnNextFrame() {
  var _this2 = this;

  this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
    return _this2.flushClassNameAndNodeQueue();
  });
};

exports.default = _CSSTransitionGroupChild2.default;
module.exports = exports['default'];