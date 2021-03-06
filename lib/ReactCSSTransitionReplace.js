'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /**
                    * Adapted from ReactCSSTransitionGroup.js by Facebook
                    *
                    * @providesModule ReactCSSTransitionReplace
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _chainFunction = require('chain-function');

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _domHelpers = require('./utils/dom-helpers');

var _ReactCSSTransitionReplaceChild = require('./ReactCSSTransitionReplaceChild');

var _ReactCSSTransitionReplaceChild2 = _interopRequireDefault(_ReactCSSTransitionReplaceChild);

var _PropTypes = require('react-transition-group/utils/PropTypes');

var _PropTypes2 = require('./utils/PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : _defaults(subClass, superClass); }

var reactCSSTransitionReplaceChild = _react2.default.createFactory(_ReactCSSTransitionReplaceChild2.default);

var ReactCSSTransitionReplace = (_temp = _class = function (_React$Component) {
  _inherits(ReactCSSTransitionReplace, _React$Component);

  function ReactCSSTransitionReplace(props, context) {
    _classCallCheck(this, ReactCSSTransitionReplace);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleDoneAppearing = function (key) {
      delete _this.transitioningKeys[key];
      if (key !== _this.state.currentKey) {
        // This child was removed before it had fully appeared. Remove it.
        _this.performLeave(key);
      }
    };

    _this.performLeave = function (key) {
      _this.transitioningKeys[key] = true;
      _this.childRefs[key].componentWillLeave(_this.handleDoneLeaving.bind(_this, key));
      if (!_this.state.currentChild || !(0, _reactDom.findDOMNode)(_this.childRefs[_this.state.currentKey])) {
        // The enter transition dominates, but if there is no entering
        // component or it renders null the height is set to zero.
        _this.enqueueHeightTransition();
      }
    };

    _this.performHeightTransition = function () {
      if (!_this.unmounted) {
        var state = _this.state;

        var currentChildNode = state.currentChild ? (0, _reactDom.findDOMNode)(_this.childRefs[state.currentKey]) : null;
        _this.setState({
          height: currentChildNode ? currentChildNode.offsetHeight : 0,
          width: _this.props.changeWidth ? currentChildNode ? currentChildNode.offsetWidth : 0 : null
        });
      }
      _this.rafHandle = null;
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      currentKey: '1',
      currentChild: _this.props.children ? _react2.default.Children.only(_this.props.children) : undefined,
      prevChildren: {},
      height: null,
      width: null
    };
    return _this;
  }

  ReactCSSTransitionReplace.prototype.componentWillMount = function componentWillMount() {
    this.shouldEnterCurrent = false;
    this.keysToLeave = [];
    this.transitioningKeys = {};
  };

  ReactCSSTransitionReplace.prototype.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.state.currentChild) {
      this.performAppear(this.state.currentKey);
    }
  };

  ReactCSSTransitionReplace.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
  };

  ReactCSSTransitionReplace.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChild = nextProps.children ? _react2.default.Children.only(nextProps.children) : undefined;
    var currentChild = this.state.currentChild;


    if (!currentChild && !nextChild || currentChild && nextChild && currentChild.key === nextChild.key) {
      return;
    }

    var _state = this.state,
        currentKey = _state.currentKey,
        prevChildren = _state.prevChildren;


    var nextState = {
      currentKey: String(Number(currentKey) + 1),
      currentChild: nextChild,
      height: 0,
      width: this.props.changeWidth ? 0 : null
    };

    if (nextChild) {
      this.shouldEnterCurrent = true;
    }

    if (currentChild) {
      var _extends2;

      var currentChildNode = (0, _reactDom.findDOMNode)(this.childRefs[currentKey]);
      nextState.height = currentChildNode ? currentChildNode.offsetHeight : 0;
      nextState.width = this.props.changeWidth ? currentChildNode ? currentChildNode.offsetWidth : 0 : null;
      nextState.prevChildren = _extends({}, prevChildren, (_extends2 = {}, _extends2[currentKey] = currentChild, _extends2));
      if (!this.transitioningKeys[currentKey]) {
        this.keysToLeave.push(currentKey);
      }
    }

    this.setState(nextState);
  };

  ReactCSSTransitionReplace.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.shouldEnterCurrent) {
      this.shouldEnterCurrent = false;
      // If the current child renders null there is nothing to enter
      if ((0, _reactDom.findDOMNode)(this.childRefs[this.state.currentKey])) {
        this.performEnter(this.state.currentKey);
      }
    }

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);

    // When the enter completes and the component switches to relative positioning the
    // child often gets selected after multiple clicks (at least in Chrome). To compensate
    // the current selection is cleared whenever the component updates.
    (0, _domHelpers.clearSelection)();
  };

  ReactCSSTransitionReplace.prototype.performAppear = function performAppear(key) {
    this.transitioningKeys[key] = true;
    this.childRefs[key].componentWillAppear(this.handleDoneAppearing.bind(this, key));
  };

  ReactCSSTransitionReplace.prototype.performEnter = function performEnter(key) {
    this.transitioningKeys[key] = true;
    this.childRefs[key].componentWillEnter(this.handleDoneEntering.bind(this, key));
    this.enqueueHeightTransition();
  };

  ReactCSSTransitionReplace.prototype.handleDoneEntering = function handleDoneEntering(key) {
    delete this.transitioningKeys[key];
    if (key === this.state.currentKey) {
      // The current child has finished entering so the height transition is also cleared.
      this.setState({ height: null });
    } else {
      // This child was removed before it had fully appeared. Remove it.
      this.performLeave(key);
    }
  };

  ReactCSSTransitionReplace.prototype.handleDoneLeaving = function handleDoneLeaving(key) {
    delete this.transitioningKeys[key];

    var nextState = { prevChildren: _extends({}, this.state.prevChildren) };
    delete nextState.prevChildren[key];
    delete this.childRefs[key];

    if (!this.state.currentChild || !(0, _reactDom.findDOMNode)(this.childRefs[this.state.currentKey])) {
      nextState.height = null;
    }

    this.setState(nextState);
  };

  ReactCSSTransitionReplace.prototype.enqueueHeightTransition = function enqueueHeightTransition() {
    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(this.performHeightTransition);
    }
  };

  ReactCSSTransitionReplace.prototype.wrapChild = function wrapChild(child, moreProps) {
    var transitionName = this.props.transitionName;

    if ((typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object' && transitionName !== null) {
      transitionName = _extends({}, transitionName);
      delete transitionName.height;
    }

    // We need to provide this childFactory so that
    // ReactCSSTransitionReplaceChild can receive updates to name,
    // enter, and leave while it is leaving.
    return reactCSSTransitionReplaceChild(_extends({
      name: transitionName,
      appear: this.props.transitionAppear,
      enter: this.props.transitionEnter,
      leave: this.props.transitionLeave,
      appearTimeout: this.props.transitionAppearTimeout,
      enterTimeout: this.props.transitionEnterTimeout,
      leaveTimeout: this.props.transitionLeaveTimeout
    }, moreProps), child);
  };

  ReactCSSTransitionReplace.prototype.storeChildRef = function storeChildRef(child, key) {
    var _this2 = this;

    var isCallbackRef = typeof child.ref !== 'string';
    (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of ReactCSSTransitionReplace and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute');

    return (0, _chainFunction2.default)(isCallbackRef ? child.ref : null, function (r) {
      _this2.childRefs[key] = r;
    });
  };

  ReactCSSTransitionReplace.prototype.render = function render() {
    var _this3 = this;

    var _state2 = this.state,
        currentKey = _state2.currentKey,
        currentChild = _state2.currentChild,
        prevChildren = _state2.prevChildren,
        height = _state2.height,
        width = _state2.width;

    var childrenToRender = [];

    var _props = this.props,
        overflowHidden = _props.overflowHidden,
        transitionName = _props.transitionName,
        component = _props.component,
        childComponent = _props.childComponent,
        notifyLeaving = _props.notifyLeaving,
        transitionAppear = _props.transitionAppear,
        transitionEnter = _props.transitionEnter,
        transitionLeave = _props.transitionLeave,
        changeWidth = _props.changeWidth,
        transitionAppearTimeout = _props.transitionAppearTimeout,
        transitionEnterTimeout = _props.transitionEnterTimeout,
        transitionLeaveTimeout = _props.transitionLeaveTimeout,
        containerProps = _objectWithoutProperties(_props, ['overflowHidden', 'transitionName', 'component', 'childComponent', 'notifyLeaving', 'transitionAppear', 'transitionEnter', 'transitionLeave', 'changeWidth', 'transitionAppearTimeout', 'transitionEnterTimeout', 'transitionLeaveTimeout']);

    // In edge there is a glitch as the container switches from not positioned
    // to a positioned element at the start of a transition which is solved
    // by applying the position and overflow style rules at all times.


    containerProps.style = _extends({}, containerProps.style, {
      position: 'relative'
    });
    if (overflowHidden) {
      containerProps.style.overflow = 'hidden';
    }

    if (height !== null) {
      var heightClassName = typeof transitionName === 'string' ? transitionName + '-height' : transitionName && transitionName.height || '';

      containerProps.className = String(containerProps.className || '') + ' ' + String(heightClassName);
      containerProps.style.height = height;
    }

    if (width !== null) {
      containerProps.style.width = width;
    }

    var positionAbsolute = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    Object.keys(prevChildren).forEach(function (key) {
      var child = prevChildren[key];
      childrenToRender.push(_react2.default.createElement(childComponent, { key: key, style: positionAbsolute }, _this3.wrapChild(notifyLeaving && typeof child.type !== 'string' ? _react2.default.cloneElement(child, { isLeaving: true }) : child, { ref: _this3.storeChildRef(child, key) })));
    });

    if (currentChild) {
      childrenToRender.push(_react2.default.createElement(childComponent, {
        key: currentKey,
        // Positioning must always be specified to keep the
        // current child on top of the leaving children
        style: this.transitioningKeys[currentKey] ? positionAbsolute : { position: 'relative' }
      }, this.wrapChild(currentChild, { ref: this.storeChildRef(currentChild, currentKey) })));
    }

    return _react2.default.createElement(component, containerProps, childrenToRender);
  };

  return ReactCSSTransitionReplace;
}(_react2.default.Component), _class.displayName = 'ReactCSSTransitionReplace', _class.defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true,
  overflowHidden: true,
  changeWidth: false,
  notifyLeaving: false,
  component: 'div',
  childComponent: 'span'
}, _temp);
exports.default = ReactCSSTransitionReplace;
module.exports = exports['default'];