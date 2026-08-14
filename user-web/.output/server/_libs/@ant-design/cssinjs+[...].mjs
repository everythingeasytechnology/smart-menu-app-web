import { r as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import processModule from "node:process";
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof processModule && "function" === typeof processModule.emit) {
			processModule.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.8";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/@rc-component/util/es/Dom/canUseDom.js
function canUseDom() {
	return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
//#endregion
//#region node_modules/@rc-component/util/es/hooks/useMemo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useMemo(getValue, condition, shouldUpdate) {
	const cacheRef = import_react.useRef({});
	if (!("value" in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) {
		cacheRef.current.value = getValue();
		cacheRef.current.condition = condition;
	}
	return cacheRef.current.value;
}
//#endregion
//#region node_modules/@rc-component/util/es/Dom/contains.js
function contains(root, n) {
	if (!root) return false;
	if (root.contains) return root.contains(n);
	let node = n;
	while (node) {
		if (node === root) return true;
		node = node.parentNode;
	}
	return false;
}
//#endregion
//#region node_modules/@rc-component/util/es/Dom/dynamicCSS.js
var APPEND_ORDER = "data-rc-order";
var APPEND_PRIORITY = "data-rc-priority";
var MARK_KEY = `rc-util-key`;
var containerCache = /* @__PURE__ */ new Map();
function getMark({ mark } = {}) {
	if (mark) return mark.startsWith("data-") ? mark : `data-${mark}`;
	return MARK_KEY;
}
function getContainer(option) {
	if (option.attachTo) return option.attachTo;
	return document.querySelector("head") || document.body;
}
function getOrder(prepend) {
	if (prepend === "queue") return "prependQueue";
	return prepend ? "prepend" : "append";
}
/**
* Find style which inject by rc-util
*/
function findStyles(container) {
	return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function injectCSS(css, option = {}) {
	if (!canUseDom()) return null;
	const { csp, prepend, priority = 0 } = option;
	const mergedOrder = getOrder(prepend);
	const isPrependQueue = mergedOrder === "prependQueue";
	const styleNode = document.createElement("style");
	styleNode.setAttribute(APPEND_ORDER, mergedOrder);
	if (isPrependQueue && priority) styleNode.setAttribute(APPEND_PRIORITY, `${priority}`);
	if (csp?.nonce) styleNode.nonce = csp?.nonce;
	styleNode.innerHTML = css;
	const container = getContainer(option);
	const { firstChild } = container;
	if (prepend) {
		if (isPrependQueue) {
			const existStyle = (option.styles || findStyles(container)).filter((node) => {
				if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER))) return false;
				const nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
				return priority >= nodePriority;
			});
			if (existStyle.length) {
				container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
				return styleNode;
			}
		}
		container.insertBefore(styleNode, firstChild);
	} else container.appendChild(styleNode);
	return styleNode;
}
function findExistNode(key, option = {}) {
	let { styles } = option;
	styles ||= findStyles(getContainer(option));
	return styles.find((node) => node.getAttribute(getMark(option)) === key);
}
function removeCSS(key, option = {}) {
	const existNode = findExistNode(key, option);
	if (existNode) getContainer(option).removeChild(existNode);
}
/**
* qiankun will inject `appendChild` to insert into other
*/
function syncRealContainer(container, option) {
	const cachedRealContainer = containerCache.get(container);
	if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
		const placeholderStyle = injectCSS("", option);
		const { parentNode } = placeholderStyle;
		containerCache.set(container, parentNode);
		container.removeChild(placeholderStyle);
	}
}
function updateCSS(css, key, originOption = {}) {
	const container = getContainer(originOption);
	const styles = findStyles(container);
	const option = {
		...originOption,
		styles
	};
	syncRealContainer(container, option);
	const existNode = findExistNode(key, option);
	if (existNode) {
		if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) existNode.nonce = option.csp?.nonce;
		if (existNode.innerHTML !== css) existNode.innerHTML = css;
		return existNode;
	}
	const newNode = injectCSS(css, option);
	newNode.setAttribute(getMark(option), key);
	return newNode;
}
//#endregion
//#region node_modules/@rc-component/util/es/warning.js
var warned = {};
var preWarningFns = [];
/**
* Pre warning enable you to parse content before console.error.
* Modify to null will prevent warning.
*/
var preMessage = (fn) => {
	preWarningFns.push(fn);
};
/**
* Warning if condition not match.
* @param valid Condition
* @param message Warning message
* @example
* ```js
* warning(false, 'some error'); // print some error
* warning(true, 'some error'); // print nothing
* warning(1 === 2, 'some error'); // print some error
* ```
*/
function warning(valid, message) {}
/** @see Similar to {@link warning} */
function note(valid, message) {}
function resetWarned() {
	warned = {};
}
function call(method, valid, message) {
	if (!valid && !warned[message]) {
		method(false, message);
		warned[message] = true;
	}
}
/** @see Same as {@link warning}, but only warn once for the same message */
function warningOnce(valid, message) {
	call(warning, valid, message);
}
/** @see Same as {@link warning}, but only warn once for the same message */
function noteOnce(valid, message) {
	call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
//#endregion
//#region node_modules/@rc-component/util/es/isEqual.js
/**
* Deeply compares two object literals.
* @param obj1 object 1
* @param obj2 object 2
* @param shallow shallow compare
* @returns
*/
function isEqual(obj1, obj2, shallow = false) {
	const refSet = /* @__PURE__ */ new Set();
	function deepEqual(a, b, level = 1) {
		const circular = refSet.has(a);
		warningOnce(!circular, "Warning: There may be circular references");
		if (circular) return false;
		if (a === b) return true;
		if (shallow && level > 1) return false;
		refSet.add(a);
		const newLevel = level + 1;
		if (Array.isArray(a)) {
			if (!Array.isArray(b) || a.length !== b.length) return false;
			for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i], newLevel)) return false;
			return true;
		}
		if (a && b && typeof a === "object" && typeof b === "object") {
			const keys = Object.keys(a);
			if (keys.length !== Object.keys(b).length) return false;
			return keys.every((key) => deepEqual(a[key], b[key], newLevel));
		}
		return false;
	}
	return deepEqual(obj1, obj2);
}
//#endregion
//#region node_modules/@emotion/hash/dist/hash.esm.js
function murmur2(str) {
	var h = 0;
	var k, i = 0, len = str.length;
	for (; len >= 4; ++i, len -= 4) {
		k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
		k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
		k ^= k >>> 24;
		h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	switch (len) {
		case 3: h ^= (str.charCodeAt(i + 2) & 255) << 16;
		case 2: h ^= (str.charCodeAt(i + 1) & 255) << 8;
		case 1:
			h ^= str.charCodeAt(i) & 255;
			h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	h ^= h >>> 13;
	h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	return ((h ^ h >>> 15) >>> 0).toString(36);
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/Cache.js
var SPLIT = "%";
/** Connect key with `SPLIT` */
function pathKey(keys) {
	return keys.join(SPLIT);
}
/** Record update id for extract static style order. */
var updateId = 0;
var Entity = class {
	instanceId;
	constructor(instanceId) {
		this.instanceId = instanceId;
	}
	/** @private Internal cache map. Do not access this directly */
	cache = /* @__PURE__ */ new Map();
	/** @private Record update times for each key */
	updateTimes = /* @__PURE__ */ new Map();
	extracted = /* @__PURE__ */ new Set();
	get(keys) {
		return this.opGet(pathKey(keys));
	}
	/** A fast get cache with `get` concat. */
	opGet(keyPathStr) {
		return this.cache.get(keyPathStr) || null;
	}
	update(keys, valueFn) {
		return this.opUpdate(pathKey(keys), valueFn);
	}
	/** A fast get cache with `get` concat. */
	opUpdate(keyPathStr, valueFn) {
		const nextValue = valueFn(this.cache.get(keyPathStr));
		if (nextValue === null) {
			this.cache.delete(keyPathStr);
			this.updateTimes.delete(keyPathStr);
		} else {
			this.cache.set(keyPathStr, nextValue);
			this.updateTimes.set(keyPathStr, updateId);
			updateId += 1;
		}
	}
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/StyleContext.js
var ATTR_TOKEN = "data-token-hash";
var ATTR_MARK = "data-css-hash";
var CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
function createCache() {
	const cssinjsInstanceId = Math.random().toString(12).slice(2);
	if (typeof document !== "undefined" && document.head && document.body) {
		const styles = document.body.querySelectorAll(`style[data-css-hash]`) || [];
		const { firstChild } = document.head;
		Array.from(styles).forEach((style) => {
			style[CSS_IN_JS_INSTANCE] ||= cssinjsInstanceId;
			if (style["__cssinjs_instance__"] === cssinjsInstanceId) document.head.insertBefore(style, firstChild);
		});
		const styleHash = {};
		Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
			const hash = style.getAttribute(ATTR_MARK);
			if (styleHash[hash]) {
				if (style["__cssinjs_instance__"] === cssinjsInstanceId) style.parentNode?.removeChild(style);
			} else styleHash[hash] = true;
		});
	}
	return new Entity(cssinjsInstanceId);
}
var StyleContext = /*#__PURE__*/ import_react.createContext({
	hashPriority: "low",
	cache: createCache(),
	defaultCache: true,
	autoPrefix: false
});
//#endregion
//#region node_modules/@ant-design/cssinjs/es/theme/ThemeCache.js
function sameDerivativeOption(left, right) {
	if (left.length !== right.length) return false;
	for (let i = 0; i < left.length; i++) if (left[i] !== right[i]) return false;
	return true;
}
var ThemeCache = class ThemeCache {
	static MAX_CACHE_SIZE = 20;
	static MAX_CACHE_OFFSET = 5;
	cache;
	keys;
	cacheCallTimes;
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
		this.keys = [];
		this.cacheCallTimes = 0;
	}
	size() {
		return this.keys.length;
	}
	internalGet(derivativeOption, updateCallTimes = false) {
		let cache = { map: this.cache };
		derivativeOption.forEach((derivative) => {
			if (!cache) cache = void 0;
			else cache = cache?.map?.get(derivative);
		});
		if (cache?.value && updateCallTimes) cache.value[1] = this.cacheCallTimes++;
		return cache?.value;
	}
	get(derivativeOption) {
		return this.internalGet(derivativeOption, true)?.[0];
	}
	has(derivativeOption) {
		return !!this.internalGet(derivativeOption);
	}
	set(derivativeOption, value) {
		if (!this.has(derivativeOption)) {
			if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
				const [targetKey] = this.keys.reduce((result, key) => {
					const [, callTimes] = result;
					if (this.internalGet(key)[1] < callTimes) return [key, this.internalGet(key)[1]];
					return result;
				}, [this.keys[0], this.cacheCallTimes]);
				this.delete(targetKey);
			}
			this.keys.push(derivativeOption);
		}
		let cache = this.cache;
		derivativeOption.forEach((derivative, index) => {
			if (index === derivativeOption.length - 1) cache.set(derivative, { value: [value, this.cacheCallTimes++] });
			else {
				const cacheValue = cache.get(derivative);
				if (!cacheValue) cache.set(derivative, { map: /* @__PURE__ */ new Map() });
				else if (!cacheValue.map) cacheValue.map = /* @__PURE__ */ new Map();
				cache = cache.get(derivative).map;
			}
		});
	}
	deleteByPath(currentCache, derivatives) {
		const cache = currentCache.get(derivatives[0]);
		if (derivatives.length === 1) {
			if (!cache.map) currentCache.delete(derivatives[0]);
			else currentCache.set(derivatives[0], { map: cache.map });
			return cache.value?.[0];
		}
		const result = this.deleteByPath(cache.map, derivatives.slice(1));
		if ((!cache.map || cache.map.size === 0) && !cache.value) currentCache.delete(derivatives[0]);
		return result;
	}
	delete(derivativeOption) {
		if (this.has(derivativeOption)) {
			this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
			return this.deleteByPath(this.cache, derivativeOption);
		}
	}
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/theme/Theme.js
var uuid = 0;
/**
* Theme with algorithms to derive tokens from design tokens.
* Use `createTheme` first which will help to manage the theme instance cache.
*/
var Theme = class {
	derivatives;
	id;
	constructor(derivatives) {
		this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
		this.id = uuid;
		if (derivatives.length === 0) derivatives.length;
		uuid += 1;
	}
	getDerivativeToken(token) {
		return this.derivatives.reduce((result, derivative) => derivative(token, result), void 0);
	}
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/theme/createTheme.js
var cacheThemes = new ThemeCache();
/**
* Same as new Theme, but will always return same one if `derivative` not changed.
*/
function createTheme(derivatives) {
	const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
	if (!cacheThemes.has(derivativeArr)) cacheThemes.set(derivativeArr, new Theme(derivativeArr));
	return cacheThemes.get(derivativeArr);
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/util/index.js
var resultCache = /* @__PURE__ */ new WeakMap();
var RESULT_VALUE = {};
function memoResult(callback, deps) {
	let current = resultCache;
	for (let i = 0; i < deps.length; i += 1) {
		const dep = deps[i];
		if (!current.has(dep)) current.set(dep, /* @__PURE__ */ new WeakMap());
		current = current.get(dep);
	}
	if (!current.has(RESULT_VALUE)) current.set(RESULT_VALUE, callback());
	return current.get(RESULT_VALUE);
}
var flattenTokenCache = /* @__PURE__ */ new WeakMap();
/**
* Flatten token to string, this will auto cache the result when token not change
*/
function flattenToken(token) {
	let str = flattenTokenCache.get(token) || "";
	if (!str) {
		Object.keys(token).forEach((key) => {
			const value = token[key];
			str += key;
			if (value instanceof Theme) str += value.id;
			else if (value && typeof value === "object") str += flattenToken(value);
			else str += value;
		});
		str = murmur2(str);
		flattenTokenCache.set(token, str);
	}
	return str;
}
/**
* Convert derivative token to key string
*/
function token2key(token, salt) {
	return murmur2(`${salt}_${flattenToken(token)}`);
}
`random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
var isClientSide = canUseDom();
function unit(num) {
	if (typeof num === "number") return `${num}px`;
	return num;
}
function where(options) {
	const { hashCls, hashPriority = "low" } = options || {};
	if (!hashCls) return "";
	const hashSelector = `.${hashCls}`;
	return hashPriority === "low" ? `:where(${hashSelector})` : hashSelector;
}
var isNonNullable = (val) => {
	return val !== void 0 && val !== null;
};
/**
* Get nonce value and inject it into CSS config if available.
*/
function injectCSPNonce(config, nonce) {
	const nonceStr = typeof nonce === "function" ? nonce() : nonce;
	if (nonceStr) return {
		...config,
		csp: {
			...config.csp,
			nonce: nonceStr
		}
	};
	return config;
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/util/css-variables.js
var token2CSSVar = (token, prefix = "") => {
	return `--${prefix ? `${prefix}-` : ""}${token}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
};
var serializeCSSVar = (cssVars, hashId, options) => {
	const { hashCls, hashPriority = "low", scope } = options || {};
	if (!Object.keys(cssVars).length) return "";
	const baseSelector = `${where({
		hashCls,
		hashPriority
	})}.${hashId}`;
	const scopes = [scope].flat().filter(Boolean);
	return `${scopes.length ? scopes.map((s) => `${baseSelector}.${s}`).join(", ") : baseSelector}{${Object.entries(cssVars).map(([key, value]) => `${key}:${value};`).join("")}}`;
};
var transformToken = (token, themeKey, config) => {
	const { hashCls, hashPriority = "low", prefix, unitless, ignore, preserve } = config || {};
	const cssVars = {};
	const result = {};
	Object.entries(token).forEach(([key, value]) => {
		if (preserve?.[key]) result[key] = value;
		else if ((typeof value === "string" || typeof value === "number") && !ignore?.[key]) {
			const cssVar = token2CSSVar(key, prefix);
			cssVars[cssVar] = typeof value === "number" && !unitless?.[key] ? `${value}px` : String(value);
			result[key] = `var(${cssVar})`;
		}
	});
	return [result, serializeCSSVar(cssVars, themeKey, {
		scope: config?.scope,
		hashCls,
		hashPriority
	})];
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/hooks/useGlobalCache.js
var effectMap = /* @__PURE__ */ new Map();
function useGlobalCache(prefix, keyPath, cacheFn, onCacheRemove, onCacheEffect) {
	const { cache: globalCache } = import_react.useContext(StyleContext);
	const fullPathStr = pathKey([prefix, ...keyPath]);
	const buildCache = (updater) => {
		globalCache.opUpdate(fullPathStr, (prevCache) => {
			const [times = 0, cache] = prevCache || [void 0, void 0];
			const data = [times, cache || cacheFn()];
			return updater ? updater(data) : data;
		});
	};
	import_react.useMemo(() => {
		buildCache();
	}, [fullPathStr]);
	const cacheContent = globalCache.opGet(fullPathStr)[1];
	(0, import_react.useInsertionEffect)(() => {
		buildCache(([times, cache]) => [times + 1, cache]);
		if (!effectMap.has(fullPathStr)) {
			onCacheEffect?.(cacheContent);
			effectMap.set(fullPathStr, true);
			Promise.resolve().then(() => {
				effectMap.delete(fullPathStr);
			});
		}
		return () => {
			globalCache.opUpdate(fullPathStr, (prevCache) => {
				const [times = 0, cache] = prevCache || [];
				if (times - 1 === 0) {
					onCacheRemove?.(cache, false);
					effectMap.delete(fullPathStr);
					return null;
				}
				return [times - 1, cache];
			});
		};
	}, [fullPathStr]);
	return cacheContent;
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/hooks/useCacheToken.js
var EMPTY_OVERRIDE = {};
var hashPrefix = "css";
var tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
	tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key, instanceId) {
	if (typeof document !== "undefined") document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`).forEach((style) => {
		if (style["__cssinjs_instance__"] === instanceId) style.parentNode?.removeChild(style);
	});
}
var TOKEN_THRESHOLD = -1;
function cleanTokenStyle(tokenKey, instanceId) {
	tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
	const cleanableKeyList = /* @__PURE__ */ new Set();
	tokenKeys.forEach((value, key) => {
		if (value <= 0) cleanableKeyList.add(key);
	});
	if (tokenKeys.size - cleanableKeyList.size > TOKEN_THRESHOLD) cleanableKeyList.forEach((key) => {
		removeStyleTags(key, instanceId);
		tokenKeys.delete(key);
	});
}
var getComputedToken = (originToken, overrideToken, theme, format) => {
	let mergedDerivativeToken = {
		...theme.getDerivativeToken(originToken),
		...overrideToken
	};
	if (format) mergedDerivativeToken = format(mergedDerivativeToken);
	return mergedDerivativeToken;
};
var TOKEN_PREFIX = "token";
/**
* Cache theme derivative token as global shared one
* @param theme Theme entity
* @param tokens List of tokens, used for cache. Please do not dynamic generate object directly
* @param option Additional config
* @returns Call Theme.getDerivativeToken(tokenObject) to get token
*/
function useCacheToken(theme, tokens, option) {
	const { cache: { instanceId }, container, hashPriority } = (0, import_react.useContext)(StyleContext);
	const { salt = "", override = EMPTY_OVERRIDE, formatToken, getComputedToken: compute, cssVar, nonce } = option;
	const mergedToken = memoResult(() => Object.assign({}, ...tokens), tokens);
	const tokenStr = flattenToken(mergedToken);
	const overrideTokenStr = flattenToken(override);
	const cssVarStr = flattenToken(cssVar);
	return useGlobalCache(TOKEN_PREFIX, [
		salt,
		theme.id,
		tokenStr,
		overrideTokenStr,
		cssVarStr
	], () => {
		const mergedDerivativeToken = compute ? compute(mergedToken, override, theme) : getComputedToken(mergedToken, override, theme, formatToken);
		const actualToken = { ...mergedDerivativeToken };
		const mergedSalt = `${salt}_${cssVar.prefix}`;
		const hashId = murmur2(mergedSalt);
		const hashCls = `${hashPrefix}-${hashId}`;
		actualToken._tokenKey = token2key(actualToken, mergedSalt);
		const [tokenWithCssVar, cssVarsStr] = transformToken(mergedDerivativeToken, cssVar.key, {
			prefix: cssVar.prefix,
			ignore: cssVar.ignore,
			unitless: cssVar.unitless,
			preserve: cssVar.preserve,
			hashPriority,
			hashCls: cssVar.hashed ? hashCls : void 0
		});
		tokenWithCssVar._hashId = hashId;
		recordCleanToken(cssVar.key);
		return [
			tokenWithCssVar,
			hashCls,
			actualToken,
			cssVarsStr,
			cssVar.key
		];
	}, ([, , , , themeKey]) => {
		cleanTokenStyle(themeKey, instanceId);
	}, ([, , , cssVarsStr, themeKey]) => {
		if (!cssVarsStr) return;
		let mergedCSSConfig = {
			mark: ATTR_MARK,
			prepend: "queue",
			attachTo: container,
			priority: -999
		};
		mergedCSSConfig = injectCSPNonce(mergedCSSConfig, nonce);
		const style = updateCSS(cssVarsStr, murmur2(`css-var-${themeKey}`), mergedCSSConfig);
		style[CSS_IN_JS_INSTANCE] = instanceId;
		style.setAttribute(ATTR_TOKEN, themeKey);
	});
}
//#endregion
//#region node_modules/@emotion/unitless/dist/unitless.esm.js
var unitlessKeys = {
	animationIterationCount: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
//#endregion
//#region node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {object}
* @return {object}
*/
var assign = Object.assign;
/**
* @param {string} value
* @param {number} length
* @return {number}
*/
function hash(value, length) {
	return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {RegExp} pattern
* @return {string?}
*/
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {string} search
* @return {number}
*/
function indexof(value, search) {
	return value.indexOf(search);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
/**
* @param {string[]} array
* @param {function} callback
* @return {string}
*/
function combine(array, callback) {
	return array.map(callback).join("");
}
/**
* @param {string[]} array
* @param {RegExp} pattern
* @return {string[]}
*/
function filter(array, pattern) {
	return array.filter(function(value) {
		return !match(value, pattern);
	});
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {object[]} siblings
* @param {number} length
*/
function node(value, root, parent, type, props, children, length, siblings) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: "",
		siblings
	};
}
/**
* @param {object} root
* @param {object} props
* @return {object}
*/
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
/**
* @param {object} root
*/
function lift(root) {
	while (root.root) root = copy(root.root, { children: [root] });
	append(root, root.siblings);
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var parens = 0;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40:
			if (previous != 108 && charat(characters, length - 1) == 58) parens++, characters += "(";
			else characters += delimit(character);
			break;
		case 41:
			parens--, characters += ")";
			break;
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (parens > 0) {
				characters += from(character);
				break;
			}
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
					if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters) && substr(characters, -1, void 0) !== " ") characters += " ";
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			if (parens > 0 && character) {
				characters += from(character);
				break;
			}
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && (strlen(characters) - length || variable === 0)) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1, declarations) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2, declarations), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
					if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);
					else {
						switch (atrule) {
							case 99: if (charat(characters, 3) === 110) break;
							case 108: if (charat(characters, 2) === 97) break;
							default: offset = 0;
							case 100:
							case 109:
							case 115:
						}
						if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
						else parse(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					if (parens > 0) break;
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @param {object[]} siblings
* @return {object}
*/
function comment(value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @param {object[]} siblings
* @return {object}
*/
function declaration(value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings);
}
//#endregion
//#region node_modules/stylis/src/Prefixer.js
/**
* @param {string} value
* @param {number} length
* @param {object[]} children
* @return {string}
*/
function prefix(value, length, children) {
	switch (hash(value, length)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599: return WEBKIT + value + value;
		case 4855: return WEBKIT + value.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + value;
		case 4789: return MOZ + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 5936: switch (charat(value, length + 11)) {
			case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
			case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
			case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
		}
		case 6828:
		case 4268:
		case 2903: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /space-between/, "justify") + WEBKIT + value + value;
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length) + value;
			break;
		case 2592:
		case 3360: return MS + replace(value, "template-", "") + value;
		case 4384:
		case 3616:
			if (children && children.some(function(element, index) {
				return length = index, match(element.props, /grid-\w+-end/);
			})) return ~indexof(value + (children = children[length].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
			return MS + replace(value, "-start", "") + value;
		case 4896:
		case 4128: return children && children.some(function(element) {
			return match(element.props, /grid-\w+-start/);
		}) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
				case 109: if (charat(value, length + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length, children) + value : value;
			}
			break;
		case 5152:
		case 5920: return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
			return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f : "") + value;
		});
		case 4949:
			if (charat(value, length + 6) === 121) return replace(value, ":", ":" + WEBKIT) + value;
			break;
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				case 120: return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
				case 100: return replace(value, ":", ":" + MS) + value;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return replace(value, "scroll-", "scroll-snap-") + value;
	}
	return value;
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	for (var i = 0; i < children.length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case NAMESPACE:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: if (!strlen(element.value = element.props.join(","))) return "";
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
*/
function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element.return) switch (element.type) {
			case DECLARATION:
				element.return = prefix(element.value, element.length, children);
				return;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(children = element.props, function(value) {
				switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write":
						lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter(children, callback) });
						break;
					case "::placeholder":
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
						lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
						lift(copy(element, { props: [value] }));
						assign(element, { props: filter(children, callback) });
				}
				return "";
			});
		}
	}
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/util/cacheMapUtil.js
var ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
/**
* This marks style from the css file.
* Which means not exist in `<style />` tag.
*/
var CSS_FILE_STYLE = "_FILE_STYLE__";
var cachePathMap;
var fromCSSFile = true;
function prepare() {
	if (!cachePathMap) {
		cachePathMap = {};
		if (canUseDom()) {
			const div = document.createElement("div");
			div.className = ATTR_CACHE_MAP;
			div.style.position = "fixed";
			div.style.visibility = "hidden";
			div.style.top = "-9999px";
			document.body.appendChild(div);
			let content = getComputedStyle(div).content || "";
			content = content.replace(/^"/, "").replace(/"$/, "");
			content.split(";").forEach((item) => {
				const [path, hash] = item.split(":");
				cachePathMap[path] = hash;
			});
			const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
			if (inlineMapStyle) {
				fromCSSFile = false;
				inlineMapStyle.parentNode?.removeChild(inlineMapStyle);
			}
			document.body.removeChild(div);
		}
	}
}
function existPath(path) {
	prepare();
	return !!cachePathMap[path];
}
function getStyleAndHash(path) {
	const hash = cachePathMap[path];
	let styleStr = null;
	if (hash && canUseDom()) {
		if (fromCSSFile) styleStr = CSS_FILE_STYLE;
		else {
			const style = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path]}"]`);
			if (style) styleStr = style.innerHTML;
			else delete cachePathMap[path];
		}
	}
	return [styleStr, hash];
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/hooks/useStyleRegister.js
var SKIP_CHECK = "_skip_check_";
var MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr, autoPrefix) {
	return (autoPrefix ? serialize(compile(styleStr), middleware([prefixer, stringify])) : serialize(compile(styleStr), stringify)).replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
	return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority = "high") {
	if (!hashId) return key;
	const hashSelector = where({
		hashCls: hashId,
		hashPriority
	});
	return key.split(",").map((k) => {
		const fullPath = k.trim().split(/\s+/);
		let firstPath = fullPath[0] || "";
		const htmlElement = firstPath.match(/^\w+/)?.[0] || "";
		firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
		return [firstPath, ...fullPath.slice(1)].join(" ");
	}).join(",");
}
var parseStyle = (interpolation, config = {}, { root, injectHash, parentSelectors } = {
	root: true,
	parentSelectors: []
}) => {
	const { hashId, layer, path, hashPriority, transformers = [], linters = [] } = config;
	let styleStr = "";
	let effectStyle = {};
	function parseKeyframes(keyframes) {
		const animationName = keyframes.getName(hashId);
		if (!effectStyle[animationName]) {
			const [parsedStr] = parseStyle(keyframes.style, config, {
				root: false,
				parentSelectors
			});
			effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
		}
	}
	function flattenList(list, fullList = []) {
		list.forEach((item) => {
			if (Array.isArray(item)) flattenList(item, fullList);
			else if (item) fullList.push(item);
		});
		return fullList;
	}
	flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]).forEach((originStyle) => {
		const style = typeof originStyle === "string" && !root ? {} : originStyle;
		if (typeof style === "string") styleStr += `${style}\n`;
		else if (style._keyframe) parseKeyframes(style);
		else {
			const mergedStyle = transformers.reduce((prev, trans) => trans?.visit?.(prev) || prev, style);
			Object.keys(mergedStyle).forEach((key) => {
				const value = mergedStyle[key];
				if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
					let subInjectHash = false;
					let mergedKey = key.trim();
					let nextRoot = false;
					if ((root || injectHash) && hashId) {
						if (mergedKey.startsWith("@")) subInjectHash = true;
						else if (mergedKey === "&") mergedKey = injectSelectorHash("", hashId, hashPriority);
						else mergedKey = injectSelectorHash(key, hashId, hashPriority);
					} else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
						mergedKey = "";
						nextRoot = true;
					}
					const [parsedStr, childEffectStyle] = parseStyle(value, config, {
						root: nextRoot,
						injectHash: subInjectHash,
						parentSelectors: [...parentSelectors, mergedKey]
					});
					effectStyle = {
						...effectStyle,
						...childEffectStyle
					};
					styleStr += `${mergedKey}${parsedStr}`;
				} else {
					function appendStyle(cssKey, cssValue) {
						const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
						let formatValue = cssValue;
						if (!unitlessKeys[cssKey] && typeof formatValue === "number" && formatValue !== 0) formatValue = `${formatValue}px`;
						if (cssKey === "animationName" && cssValue?._keyframe) {
							parseKeyframes(cssValue);
							formatValue = cssValue.getName(hashId);
						}
						styleStr += `${styleName}:${formatValue};`;
					}
					const actualValue = value?.value ?? value;
					if (typeof value === "object" && value?.[MULTI_VALUE] && Array.isArray(actualValue)) actualValue.forEach((item) => {
						appendStyle(key, item);
					});
					else if (isNonNullable(actualValue)) appendStyle(key, actualValue);
				}
			});
		}
	});
	if (!root) styleStr = `{${styleStr}}`;
	else if (layer) {
		if (styleStr) styleStr = `@layer ${layer.name} {${styleStr}}`;
		if (layer.dependencies) effectStyle[`@layer ${layer.name}`] = layer.dependencies.map((deps) => `@layer ${deps}, ${layer.name};`).join("\n");
	}
	return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
	return murmur2(`${path.join("%")}${styleStr}`);
}
var STYLE_PREFIX = "style";
/**
* Register a style to the global style sheet.
*/
function useStyleRegister(info, styleFn) {
	const { path, hashId, layer, nonce, clientOnly, order = 0 } = info;
	const { mock, hashPriority, container, transformers, linters, cache, layer: enableLayer, autoPrefix } = import_react.useContext(StyleContext);
	const fullPath = [hashId || ""];
	if (enableLayer) fullPath.push("layer");
	fullPath.push(...path);
	let isMergedClientSide = isClientSide;
	useGlobalCache(STYLE_PREFIX, fullPath, () => {
		const cachePath = fullPath.join("|");
		if (existPath(cachePath)) {
			const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
			if (inlineCacheStyleStr) return [
				inlineCacheStyleStr,
				styleHash,
				{},
				clientOnly,
				order
			];
		}
		const [parsedStyle, effectStyle] = parseStyle(styleFn(), {
			hashId,
			hashPriority,
			layer: enableLayer ? layer : void 0,
			path: path.join("-"),
			transformers,
			linters
		});
		const styleStr = normalizeStyle(parsedStyle, autoPrefix || false);
		return [
			styleStr,
			uniqueHash(fullPath, styleStr),
			effectStyle,
			clientOnly,
			order
		];
	}, (cacheValue, fromHMR) => {
		const [, styleId] = cacheValue;
		if (fromHMR && isClientSide) removeCSS(styleId, {
			mark: ATTR_MARK,
			attachTo: container
		});
	}, (cacheValue) => {
		const [styleStr, styleId, effectStyle, , priority] = cacheValue;
		if (isMergedClientSide && styleStr !== "_FILE_STYLE__") {
			let mergedCSSConfig = {
				mark: ATTR_MARK,
				prepend: enableLayer ? false : "queue",
				attachTo: container,
				priority
			};
			mergedCSSConfig = injectCSPNonce(mergedCSSConfig, nonce);
			const effectLayerKeys = [];
			const effectRestKeys = [];
			Object.keys(effectStyle).forEach((key) => {
				if (key.startsWith("@layer")) effectLayerKeys.push(key);
				else effectRestKeys.push(key);
			});
			effectLayerKeys.forEach((effectKey) => {
				updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_layer-${effectKey}`, {
					...mergedCSSConfig,
					prepend: true
				});
			});
			const style = updateCSS(styleStr, styleId, mergedCSSConfig);
			style[CSS_IN_JS_INSTANCE] = cache.instanceId;
			effectRestKeys.forEach((effectKey) => {
				updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_effect-${effectKey}`, mergedCSSConfig);
			});
		}
	});
}
//#endregion
//#region node_modules/@ant-design/cssinjs/es/hooks/useCSSVarRegister.js
var CSS_VAR_PREFIX = "cssVar";
var useCSSVarRegister = (config, fn) => {
	const { key, prefix, unitless, ignore, token, hashId, scope, nonce } = config;
	const { cache: { instanceId }, container, hashPriority } = (0, import_react.useContext)(StyleContext);
	const { _tokenKey: tokenKey } = token;
	const scopeKey = Array.isArray(scope) ? scope.join("@@") : scope;
	const stylePath = [
		...config.path,
		key,
		scopeKey,
		tokenKey
	];
	return useGlobalCache(CSS_VAR_PREFIX, stylePath, () => {
		const [mergedToken, cssVarsStr] = transformToken(fn(), key, {
			prefix,
			unitless,
			ignore,
			scope,
			hashPriority,
			hashCls: hashId
		});
		return [
			mergedToken,
			cssVarsStr,
			uniqueHash(stylePath, cssVarsStr),
			key
		];
	}, ([, , styleId]) => {
		if (isClientSide) removeCSS(styleId, {
			mark: ATTR_MARK,
			attachTo: container
		});
	}, ([, cssVarsStr, styleId]) => {
		if (!cssVarsStr) return;
		let mergedCSSConfig = {
			mark: ATTR_MARK,
			prepend: "queue",
			attachTo: container,
			priority: -999
		};
		mergedCSSConfig = injectCSPNonce(mergedCSSConfig, nonce);
		const style = updateCSS(cssVarsStr, styleId, mergedCSSConfig);
		style[CSS_IN_JS_INSTANCE] = instanceId;
		style.setAttribute(ATTR_TOKEN, key);
	});
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/Keyframes.js
var Keyframe = class {
	name;
	style;
	constructor(name, style) {
		this.name = name;
		this.style = style;
	}
	getName(hashId = "") {
		return hashId ? `${hashId}-${this.name}` : this.name;
	}
	_keyframe = true;
};
//#endregion
//#region node_modules/@ant-design/cssinjs/es/transformers/legacyLogicalProperties.js
function noSplit(list) {
	list.notSplit = true;
	return list;
}
noSplit(["borderTop", "borderBottom"]), noSplit(["borderTop"]), noSplit(["borderBottom"]), noSplit(["borderLeft", "borderRight"]), noSplit(["borderLeft"]), noSplit(["borderRight"]);
//#endregion
export { token2CSSVar as a, StyleContext as c, removeCSS as d, updateCSS as f, require_react as g, canUseDom as h, useCacheToken as i, isEqual as l, useMemo as m, useCSSVarRegister as n, unit as o, contains as p, useStyleRegister as r, createTheme as s, Keyframe as t, warningOnce as u };
