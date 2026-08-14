import { r as __toESM } from "../../_runtime.mjs";
import { A as wrapperRaf, C as getNodeRef, D as useSyncState, E as useComposeRef, F as require_react_dom, M as useSafeState, N as useLayoutEffect$1, O as useId_default, P as useEvent, S as composeRef, T as supportRef, b as getDOM, h as getTargetScrollBarSize, p as pickAttrs, v as useLockFocus, w as supportNodeRef } from "../@ant-design/cssinjs-utils+[...].mjs";
import { d as removeCSS, f as updateCSS, g as require_react, h as canUseDom, p as contains } from "../@ant-design/cssinjs+[...].mjs";
import { C as clsx } from "../@ant-design/icons+[...].mjs";
//#region node_modules/@rc-component/motion/es/context.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react = /* @__PURE__ */ __toESM(require_react());
var Context = /*#__PURE__*/ import_react.createContext({});
var MotionProvider = (props) => {
	const { children, ...rest } = props;
	const memoizedValue = import_react.useMemo(() => {
		return { motion: rest.motion };
	}, [rest.motion]);
	return /*#__PURE__*/ import_react.createElement(Context.Provider, { value: memoizedValue }, children);
};
//#endregion
//#region node_modules/@rc-component/motion/es/interface.js
var STATUS_NONE = "none";
var STATUS_APPEAR = "appear";
var STATUS_ENTER = "enter";
var STATUS_LEAVE = "leave";
var STEP_NONE = "none";
var STEP_PREPARE = "prepare";
var STEP_START = "start";
var STEP_ACTIVE = "active";
/**
* Used for disabled motion case.
* Prepare stage will still work but start & active will be skipped.
*/
var STEP_PREPARED = "prepared";
//#endregion
//#region node_modules/@rc-component/motion/es/util/motion.js
function makePrefixMap(styleProp, eventName) {
	const prefixes = {};
	prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
	prefixes[`Webkit${styleProp}`] = `webkit${eventName}`;
	prefixes[`Moz${styleProp}`] = `moz${eventName}`;
	prefixes[`ms${styleProp}`] = `MS${eventName}`;
	prefixes[`O${styleProp}`] = `o${eventName.toLowerCase()}`;
	return prefixes;
}
function getVendorPrefixes(domSupport, win) {
	const prefixes = {
		animationend: makePrefixMap("Animation", "AnimationEnd"),
		transitionend: makePrefixMap("Transition", "TransitionEnd")
	};
	if (domSupport) {
		if (!("AnimationEvent" in win)) delete prefixes.animationend.animation;
		if (!("TransitionEvent" in win)) delete prefixes.transitionend.transition;
	}
	return prefixes;
}
var vendorPrefixes = getVendorPrefixes(canUseDom(), typeof window !== "undefined" ? window : {});
var style = {};
if (canUseDom()) ({style} = document.createElement("div"));
var prefixedEventNames = {};
function getVendorPrefixedEventName(eventName) {
	if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
	const prefixMap = vendorPrefixes[eventName];
	if (prefixMap) {
		const stylePropList = Object.keys(prefixMap);
		const len = stylePropList.length;
		for (let i = 0; i < len; i += 1) {
			const styleProp = stylePropList[i];
			if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
				prefixedEventNames[eventName] = prefixMap[styleProp];
				return prefixedEventNames[eventName];
			}
		}
	}
	return "";
}
var internalAnimationEndName = getVendorPrefixedEventName("animationend");
var internalTransitionEndName = getVendorPrefixedEventName("transitionend");
var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
var animationEndName = internalAnimationEndName || "animationend";
var transitionEndName = internalTransitionEndName || "transitionend";
function getTransitionName(transitionName, transitionType) {
	if (!transitionName) return null;
	if (typeof transitionName === "object") return transitionName[transitionType.replace(/-\w/g, (match) => match[1].toUpperCase())];
	return `${transitionName}-${transitionType}`;
}
//#endregion
//#region node_modules/@rc-component/motion/es/hooks/useDomMotionEvents.js
var useDomMotionEvents_default = ((onInternalMotionEnd) => {
	const cacheElementRef = (0, import_react.useRef)();
	function removeMotionEvents(element) {
		if (element) {
			element.removeEventListener(transitionEndName, onInternalMotionEnd);
			element.removeEventListener(animationEndName, onInternalMotionEnd);
		}
	}
	function patchMotionEvents(element) {
		if (cacheElementRef.current && cacheElementRef.current !== element) removeMotionEvents(cacheElementRef.current);
		if (element && element !== cacheElementRef.current) {
			element.addEventListener(transitionEndName, onInternalMotionEnd);
			element.addEventListener(animationEndName, onInternalMotionEnd);
			cacheElementRef.current = element;
		}
	}
	import_react.useEffect(() => () => {
		removeMotionEvents(cacheElementRef.current);
		cacheElementRef.current = null;
	}, []);
	return [patchMotionEvents, removeMotionEvents];
});
//#endregion
//#region node_modules/@rc-component/motion/es/hooks/useIsomorphicLayoutEffect.js
var useIsomorphicLayoutEffect = canUseDom() ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/@rc-component/motion/es/hooks/useNextFrame.js
var useNextFrame_default = (() => {
	const nextFrameRef = import_react.useRef(null);
	function cancelNextFrame() {
		wrapperRaf.cancel(nextFrameRef.current);
	}
	function nextFrame(callback, delay = 2) {
		cancelNextFrame();
		const nextFrameId = wrapperRaf(() => {
			if (delay <= 1) callback({ isCanceled: () => nextFrameId !== nextFrameRef.current });
			else nextFrame(callback, delay - 1);
		});
		nextFrameRef.current = nextFrameId;
	}
	import_react.useEffect(() => () => {
		cancelNextFrame();
	}, []);
	return [nextFrame, cancelNextFrame];
});
//#endregion
//#region node_modules/@rc-component/motion/es/hooks/useStepQueue.js
var FULL_STEP_QUEUE = [
	STEP_PREPARE,
	STEP_START,
	STEP_ACTIVE,
	"end"
];
var SIMPLE_STEP_QUEUE = [STEP_PREPARE, STEP_PREPARED];
function isActive(step) {
	return step === "active" || step === "end";
}
var useStepQueue_default = ((status, prepareOnly, callback) => {
	const [step, setStep] = useSafeState(STEP_NONE);
	const [nextFrame, cancelNextFrame] = useNextFrame_default();
	function startQueue() {
		setStep(STEP_PREPARE, true);
	}
	const STEP_QUEUE = prepareOnly ? SIMPLE_STEP_QUEUE : FULL_STEP_QUEUE;
	useIsomorphicLayoutEffect(() => {
		if (step !== "none" && step !== "end") {
			const index = STEP_QUEUE.indexOf(step);
			const nextStep = STEP_QUEUE[index + 1];
			const result = callback(step);
			if (result === false) setStep(nextStep, true);
			else if (nextStep) nextFrame((info) => {
				function doNext() {
					if (info.isCanceled()) return;
					setStep(nextStep, true);
				}
				if (result === true) doNext();
				else Promise.resolve(result).then(doNext);
			});
		}
	}, [status, step]);
	import_react.useEffect(() => () => {
		cancelNextFrame();
	}, []);
	return [startQueue, step];
});
//#endregion
//#region node_modules/@rc-component/motion/es/hooks/useStatus.js
function useStatus(supportMotion, visible, getElement, { motionEnter = true, motionAppear = true, motionLeave = true, motionDeadline, motionLeaveImmediately, onAppearPrepare, onEnterPrepare, onLeavePrepare, onAppearStart, onEnterStart, onLeaveStart, onAppearActive, onEnterActive, onLeaveActive, onAppearEnd, onEnterEnd, onLeaveEnd, onVisibleChanged }) {
	const [asyncVisible, setAsyncVisible] = import_react.useState();
	const [getStatus, setStatus] = useSyncState(STATUS_NONE);
	const [style, setStyle] = import_react.useState([null, null]);
	const currentStatus = getStatus();
	const mountedRef = (0, import_react.useRef)(false);
	const deadlineRef = (0, import_react.useRef)(null);
	function getDomElement() {
		return getElement();
	}
	const activeRef = (0, import_react.useRef)(false);
	/**
	* Clean up status & style
	*/
	function updateMotionEndStatus() {
		setStatus(STATUS_NONE);
		setStyle([null, null]);
	}
	const onInternalMotionEnd = useEvent((event) => {
		const status = getStatus();
		if (status === "none") return;
		const element = getDomElement();
		if (event && !event.deadline && event.target !== element) return;
		const currentActive = activeRef.current;
		let canEnd;
		if (status === "appear" && currentActive) canEnd = onAppearEnd?.(element, event);
		else if (status === "enter" && currentActive) canEnd = onEnterEnd?.(element, event);
		else if (status === "leave" && currentActive) canEnd = onLeaveEnd?.(element, event);
		if (currentActive && canEnd !== false) updateMotionEndStatus();
	});
	const [patchMotionEvents] = useDomMotionEvents_default(onInternalMotionEnd);
	const getEventHandlers = (targetStatus) => {
		switch (targetStatus) {
			case STATUS_APPEAR: return {
				[STEP_PREPARE]: onAppearPrepare,
				[STEP_START]: onAppearStart,
				[STEP_ACTIVE]: onAppearActive
			};
			case STATUS_ENTER: return {
				[STEP_PREPARE]: onEnterPrepare,
				[STEP_START]: onEnterStart,
				[STEP_ACTIVE]: onEnterActive
			};
			case STATUS_LEAVE: return {
				[STEP_PREPARE]: onLeavePrepare,
				[STEP_START]: onLeaveStart,
				[STEP_ACTIVE]: onLeaveActive
			};
			default: return {};
		}
	};
	const eventHandlers = import_react.useMemo(() => getEventHandlers(currentStatus), [currentStatus]);
	const [startStep, step] = useStepQueue_default(currentStatus, !supportMotion, (newStep) => {
		if (newStep === "prepare") {
			const onPrepare = eventHandlers[STEP_PREPARE];
			if (!onPrepare) return false;
			return onPrepare(getDomElement());
		}
		if (newStep in eventHandlers) setStyle([eventHandlers[newStep]?.(getDomElement(), null) || null, newStep]);
		if (newStep === "active" && currentStatus !== "none") {
			patchMotionEvents(getDomElement());
			if (motionDeadline > 0) {
				clearTimeout(deadlineRef.current);
				deadlineRef.current = setTimeout(() => {
					onInternalMotionEnd({ deadline: true });
				}, motionDeadline);
			}
		}
		if (newStep === "prepared") updateMotionEndStatus();
		return true;
	});
	activeRef.current = isActive(step);
	const visibleRef = (0, import_react.useRef)(null);
	useIsomorphicLayoutEffect(() => {
		if (mountedRef.current && visibleRef.current === visible) return;
		setAsyncVisible(visible);
		const isMounted = mountedRef.current;
		mountedRef.current = true;
		let nextStatus;
		if (!isMounted && visible && motionAppear) nextStatus = STATUS_APPEAR;
		if (isMounted && visible && motionEnter) nextStatus = STATUS_ENTER;
		if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) nextStatus = STATUS_LEAVE;
		const nextEventHandlers = getEventHandlers(nextStatus);
		if (nextStatus && (supportMotion || nextEventHandlers["prepare"])) {
			setStatus(nextStatus);
			startStep();
		} else setStatus(STATUS_NONE);
		visibleRef.current = visible;
	}, [visible]);
	(0, import_react.useEffect)(() => {
		if (currentStatus === "appear" && !motionAppear || currentStatus === "enter" && !motionEnter || currentStatus === "leave" && !motionLeave) setStatus(STATUS_NONE);
	}, [
		motionAppear,
		motionEnter,
		motionLeave
	]);
	(0, import_react.useEffect)(() => () => {
		mountedRef.current = false;
		clearTimeout(deadlineRef.current);
	}, []);
	const firstMountChangeRef = import_react.useRef(false);
	(0, import_react.useEffect)(() => {
		if (asyncVisible) firstMountChangeRef.current = true;
		if (asyncVisible !== void 0 && currentStatus === "none") {
			if (firstMountChangeRef.current || asyncVisible) onVisibleChanged?.(asyncVisible);
			firstMountChangeRef.current = true;
		}
	}, [asyncVisible, currentStatus]);
	let mergedStyle = style[0];
	if (eventHandlers["prepare"] && step === "start") mergedStyle = {
		transition: "none",
		...mergedStyle
	};
	const styleStep = style[1];
	return [
		getStatus,
		step,
		mergedStyle,
		asyncVisible ?? visible,
		!mountedRef.current && currentStatus === "none" && supportMotion && motionAppear ? "NONE" : step === "start" || step === "active" ? styleStep === step : true
	];
}
//#endregion
//#region node_modules/@rc-component/motion/es/CSSMotion.js
function isRefNotConsumed(children) {
	return children?.length < 2;
}
/**
* `transitionSupport` is used for none transition test case.
* Default we use browser transition event support check.
*/
function genCSSMotion(config) {
	let transitionSupport = config;
	if (typeof config === "object") ({transitionSupport} = config);
	function isSupportTransition(props, contextMotion) {
		return !!(props.motionName && transitionSupport && contextMotion !== false);
	}
	const CSSMotion = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
		const { visible = true, removeOnLeave = true, forceRender, children, motionName, leavedClassName, eventProps } = props;
		const { motion: contextMotion } = import_react.useContext(Context);
		const supportMotion = isSupportTransition(props, contextMotion);
		const nodeRef = (0, import_react.useRef)();
		function getDomElement() {
			return getDOM(nodeRef.current);
		}
		const [getStatus, statusStep, statusStyle, mergedVisible, styleReady] = useStatus(supportMotion, visible, getDomElement, props);
		const status = getStatus();
		const renderedRef = import_react.useRef(mergedVisible);
		if (mergedVisible) renderedRef.current = true;
		const refObj = import_react.useMemo(() => {
			const obj = {};
			Object.defineProperties(obj, {
				nativeElement: {
					enumerable: true,
					get: getDomElement
				},
				inMotion: {
					enumerable: true,
					get: () => () => getStatus() !== STATUS_NONE
				},
				enableMotion: {
					enumerable: true,
					get: () => () => supportMotion
				}
			});
			return obj;
		}, []);
		import_react.useImperativeHandle(ref, () => refObj, []);
		const idRef = import_react.useRef(0);
		if (styleReady) idRef.current += 1;
		const returnNode = import_react.useMemo(() => {
			if (styleReady === "NONE") return null;
			let motionChildren;
			const mergedProps = {
				...eventProps,
				visible
			};
			if (!children) motionChildren = null;
			else if (status === "none") {
				if (mergedVisible) motionChildren = children({ ...mergedProps }, nodeRef);
				else if (!removeOnLeave && renderedRef.current && leavedClassName) motionChildren = children({
					...mergedProps,
					className: leavedClassName
				}, nodeRef);
				else if (forceRender || !removeOnLeave && !leavedClassName) motionChildren = children({
					...mergedProps,
					style: { display: "none" }
				}, nodeRef);
				else motionChildren = null;
			} else {
				let statusSuffix;
				if (statusStep === "prepare") statusSuffix = "prepare";
				else if (isActive(statusStep)) statusSuffix = "active";
				else if (statusStep === "start") statusSuffix = "start";
				const motionCls = getTransitionName(motionName, `${status}-${statusSuffix}`);
				motionChildren = children({
					...mergedProps,
					className: clsx(getTransitionName(motionName, status), {
						[motionCls]: motionCls && statusSuffix,
						[motionName]: typeof motionName === "string"
					}),
					style: statusStyle
				}, nodeRef);
			}
			return motionChildren;
		}, [idRef.current]);
		if (isRefNotConsumed(children) && supportNodeRef(returnNode)) {
			const originNodeRef = getNodeRef(returnNode);
			if (originNodeRef !== nodeRef) return /*#__PURE__*/ import_react.cloneElement(returnNode, { ref: composeRef(originNodeRef, nodeRef) });
		}
		return returnNode;
	});
	CSSMotion.displayName = "CSSMotion";
	return CSSMotion;
}
var CSSMotion_default = genCSSMotion(supportTransition);
var STATUS_KEEP = "keep";
var STATUS_REMOVE = "remove";
var STATUS_REMOVED = "removed";
function wrapKeyToObject(key) {
	let keyObj;
	if (key && typeof key === "object" && "key" in key) keyObj = key;
	else keyObj = { key };
	return {
		...keyObj,
		key: String(keyObj.key)
	};
}
function parseKeys(keys = []) {
	return keys.map(wrapKeyToObject);
}
function diffKeys(prevKeys = [], currentKeys = []) {
	let list = [];
	let currentIndex = 0;
	const currentLen = currentKeys.length;
	const prevKeyObjects = parseKeys(prevKeys);
	const currentKeyObjects = parseKeys(currentKeys);
	prevKeyObjects.forEach((keyObj) => {
		let hit = false;
		for (let i = currentIndex; i < currentLen; i += 1) {
			const currentKeyObj = currentKeyObjects[i];
			if (currentKeyObj.key === keyObj.key) {
				if (currentIndex < i) {
					list = list.concat(currentKeyObjects.slice(currentIndex, i).map((obj) => ({
						...obj,
						status: "add"
					})));
					currentIndex = i;
				}
				list.push({
					...currentKeyObj,
					status: STATUS_KEEP
				});
				currentIndex += 1;
				hit = true;
				break;
			}
		}
		if (!hit) list.push({
			...keyObj,
			status: STATUS_REMOVE
		});
	});
	if (currentIndex < currentLen) list = list.concat(currentKeyObjects.slice(currentIndex).map((obj) => ({
		...obj,
		status: "add"
	})));
	/**
	* Merge same key when it remove and add again:
	*    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
	*/
	const keys = {};
	list.forEach(({ key }) => {
		keys[key] = (keys[key] || 0) + 1;
	});
	Object.keys(keys).filter((key) => keys[key] > 1).forEach((matchKey) => {
		list = list.filter(({ key, status }) => key !== matchKey || status !== "remove");
		list.forEach((node) => {
			if (node.key === matchKey) node.status = STATUS_KEEP;
		});
	});
	return list;
}
//#endregion
//#region node_modules/@rc-component/motion/es/CSSMotionList.js
function _extends$5() {
	_extends$5 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$5.apply(this, arguments);
}
var MOTION_PROP_NAMES = [
	"eventProps",
	"visible",
	"children",
	"motionName",
	"motionAppear",
	"motionEnter",
	"motionLeave",
	"motionLeaveImmediately",
	"motionDeadline",
	"removeOnLeave",
	"leavedClassName",
	"onAppearPrepare",
	"onAppearStart",
	"onAppearActive",
	"onAppearEnd",
	"onEnterStart",
	"onEnterActive",
	"onEnterEnd",
	"onLeaveStart",
	"onLeaveActive",
	"onLeaveEnd"
];
/**
* Generate a CSSMotionList component with config
* @param transitionSupport No need since CSSMotionList no longer depends on transition support
* @param CSSMotion CSSMotion component
*/
function genCSSMotionList(transitionSupport, CSSMotion = CSSMotion_default) {
	class CSSMotionList extends import_react.Component {
		static defaultProps = { component: "div" };
		state = { keyEntities: [] };
		static getDerivedStateFromProps({ keys }, { keyEntities }) {
			return { keyEntities: diffKeys(keyEntities, parseKeys(keys)).filter((entity) => {
				const prevEntity = keyEntities.find(({ key }) => entity.key === key);
				if (prevEntity && prevEntity.status === "removed" && entity.status === "remove") return false;
				return true;
			}) };
		}
		removeKey = (removeKey) => {
			this.setState((prevState) => {
				return { keyEntities: prevState.keyEntities.map((entity) => {
					if (entity.key !== removeKey) return entity;
					return {
						...entity,
						status: STATUS_REMOVED
					};
				}) };
			}, () => {
				const { keyEntities } = this.state;
				if (keyEntities.filter(({ status }) => status !== "removed").length === 0 && this.props.onAllRemoved) this.props.onAllRemoved();
			});
		};
		render() {
			const { keyEntities } = this.state;
			const { component, children, onVisibleChanged, onAllRemoved, ...restProps } = this.props;
			const Component = component || import_react.Fragment;
			const motionProps = {};
			MOTION_PROP_NAMES.forEach((prop) => {
				motionProps[prop] = restProps[prop];
				delete restProps[prop];
			});
			delete restProps.keys;
			return /*#__PURE__*/ import_react.createElement(Component, restProps, keyEntities.map(({ status, ...eventProps }, index) => {
				const visible = status === "add" || status === "keep";
				return /*#__PURE__*/ import_react.createElement(CSSMotion, _extends$5({}, motionProps, {
					key: eventProps.key,
					visible,
					eventProps,
					onVisibleChanged: (changedVisible) => {
						onVisibleChanged?.(changedVisible, { key: eventProps.key });
						if (!changedVisible) this.removeKey(eventProps.key);
					}
				}), isRefNotConsumed(children) ? (props) => children({
					...props,
					index
				}) : (props, ref) => children({
					...props,
					index
				}, ref));
			}));
		}
	}
	return CSSMotionList;
}
var CSSMotionList_default = genCSSMotionList(supportTransition);
//#endregion
//#region node_modules/@rc-component/motion/es/index.js
var es_default$2 = CSSMotion_default;
//#endregion
//#region node_modules/@rc-component/portal/es/Context.js
var OrderContext = /*#__PURE__*/ import_react.createContext(null);
//#endregion
//#region node_modules/@rc-component/portal/es/mock.js
var inline = false;
function inlineMock(nextInline) {
	if (typeof nextInline === "boolean") inline = nextInline;
	return inline;
}
//#endregion
//#region node_modules/@rc-component/portal/es/useDom.js
var EMPTY_LIST = [];
/**
* Will add `div` to document. Nest call will keep order
* @param render Render DOM in document
*/
function useDom(render, debug) {
	const [ele] = import_react.useState(() => {
		if (!canUseDom()) return null;
		return document.createElement("div");
	});
	const appendedRef = import_react.useRef(false);
	const queueCreate = import_react.useContext(OrderContext);
	const [queue, setQueue] = import_react.useState(EMPTY_LIST);
	const mergedQueueCreate = queueCreate || (appendedRef.current ? void 0 : (appendFn) => {
		setQueue((origin) => {
			return [appendFn, ...origin];
		});
	});
	function append() {
		if (!ele.parentElement) document.body.appendChild(ele);
		appendedRef.current = true;
	}
	function cleanup() {
		ele.parentElement?.removeChild(ele);
		appendedRef.current = false;
	}
	useLayoutEffect$1(() => {
		if (render) {
			if (queueCreate) queueCreate(append);
			else append();
		} else cleanup();
		return cleanup;
	}, [render]);
	useLayoutEffect$1(() => {
		if (queue.length) {
			queue.forEach((appendFn) => appendFn());
			setQueue(EMPTY_LIST);
		}
	}, [queue]);
	return [ele, mergedQueueCreate];
}
//#endregion
//#region node_modules/@rc-component/portal/es/util.js
/**
* Test usage export. Do not use in your production
*/
function isBodyOverflowing() {
	return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
//#endregion
//#region node_modules/@rc-component/portal/es/useScrollLocker.js
var UNIQUE_ID = `rc-util-locker-${Date.now()}`;
var uuid = 0;
function useScrollLocker(lock) {
	const mergedLock = !!lock;
	const [id] = import_react.useState(() => {
		uuid += 1;
		return `${UNIQUE_ID}_${uuid}`;
	});
	useLayoutEffect$1(() => {
		if (mergedLock) {
			const scrollbarSize = getTargetScrollBarSize(document.body).width;
			const isOverflow = isBodyOverflowing();
			updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
		} else removeCSS(id);
		return () => {
			removeCSS(id);
		};
	}, [mergedLock, id]);
}
//#endregion
//#region node_modules/@rc-component/portal/es/useEscKeyDown.js
var stack = [];
var IME_LOCK_DURATION = 200;
var lastCompositionEndTime = 0;
var onGlobalKeyDown = (event) => {
	if (event.key === "Escape" && !event.isComposing) {
		if (Date.now() - lastCompositionEndTime < IME_LOCK_DURATION) return;
		const len = stack.length;
		for (let i = len - 1; i >= 0; i -= 1) stack[i].onEsc({
			top: i === len - 1,
			event
		});
	}
};
var onGlobalCompositionEnd = () => {
	lastCompositionEndTime = Date.now();
};
function attachGlobalEventListeners() {
	window.addEventListener("keydown", onGlobalKeyDown);
	window.addEventListener("compositionend", onGlobalCompositionEnd);
}
function detachGlobalEventListeners() {
	if (stack.length === 0) {
		window.removeEventListener("keydown", onGlobalKeyDown);
		window.removeEventListener("compositionend", onGlobalCompositionEnd);
	}
}
function useEscKeyDown(open, onEsc) {
	const id = useId_default();
	const onEventEsc = useEvent(onEsc);
	const ensure = () => {
		if (!stack.find((item) => item.id === id)) stack.push({
			id,
			onEsc: onEventEsc
		});
	};
	const clear = () => {
		stack = stack.filter((item) => item.id !== id);
	};
	(0, import_react.useMemo)(() => {
		if (open) ensure();
		else if (!open) clear();
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (open) {
			ensure();
			attachGlobalEventListeners();
			return () => {
				clear();
				detachGlobalEventListeners();
			};
		}
	}, [open]);
}
//#endregion
//#region node_modules/@rc-component/portal/es/Portal.js
var getPortalContainer = (getContainer) => {
	if (getContainer === false) return false;
	if (!canUseDom() || !getContainer) return null;
	if (typeof getContainer === "string") return document.querySelector(getContainer);
	if (typeof getContainer === "function") return getContainer();
	return getContainer;
};
//#endregion
//#region node_modules/@rc-component/portal/es/index.js
var es_default$1 = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { open, autoLock, getContainer, debug, autoDestroy = true, children, onEsc } = props;
	const [shouldRender, setShouldRender] = import_react.useState(open);
	const mergedRender = shouldRender || open;
	import_react.useEffect(() => {
		if (autoDestroy || open) setShouldRender(open);
	}, [open, autoDestroy]);
	const [innerContainer, setInnerContainer] = import_react.useState(() => getPortalContainer(getContainer));
	import_react.useEffect(() => {
		const customizeContainer = getPortalContainer(getContainer);
		setInnerContainer(() => customizeContainer ?? null);
	});
	const [defaultContainer, queueCreate] = useDom(mergedRender && !innerContainer, debug);
	const mergedContainer = innerContainer ?? defaultContainer;
	useScrollLocker(autoLock && open && canUseDom() && (mergedContainer === defaultContainer || mergedContainer === document.body));
	useEscKeyDown(open, onEsc);
	let childRef = null;
	if (children && supportRef(children) && ref) childRef = getNodeRef(children);
	const mergedRef = useComposeRef(childRef, ref);
	if (!mergedRender || !canUseDom() || innerContainer === void 0) return null;
	const renderInline = mergedContainer === false || inlineMock();
	let reffedChildren = children;
	if (ref) reffedChildren = /*#__PURE__*/ import_react.cloneElement(children, { ref: mergedRef });
	return /*#__PURE__*/ import_react.createElement(OrderContext.Provider, { value: queueCreate }, renderInline ? reffedChildren : /*#__PURE__*/ (0, import_react_dom.createPortal)(reffedChildren, mergedContainer));
});
//#endregion
//#region node_modules/@rc-component/dialog/es/context.js
var RefContext = /*#__PURE__*/ import_react.createContext({});
//#endregion
//#region node_modules/@rc-component/dialog/es/util.js
function getMotionName(prefixCls, transitionName, animationName) {
	let motionName = transitionName;
	if (!motionName && animationName) motionName = `${prefixCls}-${animationName}`;
	return motionName;
}
function getScroll(w, top) {
	let ret = w[`page${top ? "Y" : "X"}Offset`];
	const method = `scroll${top ? "Top" : "Left"}`;
	if (typeof ret !== "number") {
		const d = w.document;
		ret = d.documentElement[method];
		if (typeof ret !== "number") ret = d.body[method];
	}
	return ret;
}
function offset(el) {
	const rect = el.getBoundingClientRect();
	const pos = {
		left: rect.left,
		top: rect.top
	};
	const doc = el.ownerDocument;
	const w = doc.defaultView || doc.parentWindow;
	pos.left += getScroll(w);
	pos.top += getScroll(w, true);
	return pos;
}
//#endregion
//#region node_modules/@rc-component/dialog/es/Dialog/Content/MemoChildren.js
var MemoChildren_default = /*#__PURE__*/ import_react.memo(({ children }) => children, (_, { shouldUpdate }) => !shouldUpdate);
//#endregion
//#region node_modules/@rc-component/dialog/es/Dialog/Content/Panel.js
function _extends$4() {
	_extends$4 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$4.apply(this, arguments);
}
var Panel = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls, className, style, title, ariaId, footer, closable, closeIcon, onClose, children, bodyStyle, bodyProps, modalRender, onMouseDown, onMouseUp, holderRef, visible, forceRender, width, height, classNames: modalClassNames, styles: modalStyles, isFixedPos, focusTrap } = props;
	const { panel: panelRef } = import_react.useContext(RefContext);
	const internalRef = (0, import_react.useRef)(null);
	const mergedRef = useComposeRef(holderRef, panelRef, internalRef);
	const [ignoreElement] = useLockFocus(visible && isFixedPos && focusTrap !== false, () => internalRef.current);
	import_react.useImperativeHandle(ref, () => ({ focus: () => {
		internalRef.current?.focus({ preventScroll: true });
	} }));
	const contentStyle = {};
	if (width !== void 0) contentStyle.width = width;
	if (height !== void 0) contentStyle.height = height;
	const footerNode = footer ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-footer`, modalClassNames?.footer),
		style: { ...modalStyles?.footer }
	}, footer) : null;
	const headerNode = title ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-header`, modalClassNames?.header),
		style: { ...modalStyles?.header }
	}, /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-title`, modalClassNames?.title),
		id: ariaId,
		style: { ...modalStyles?.title }
	}, title)) : null;
	const closableObj = (0, import_react.useMemo)(() => {
		if (typeof closable === "object" && closable !== null) return closable;
		if (closable) return { closeIcon: closeIcon ?? /*#__PURE__*/ import_react.createElement("span", { className: `${prefixCls}-close-x` }) };
		return {};
	}, [
		closable,
		closeIcon,
		prefixCls
	]);
	const ariaProps = pickAttrs(closableObj, true);
	const closeBtnIsDisabled = typeof closable === "object" && closable.disabled;
	const closerNode = closable ? /*#__PURE__*/ import_react.createElement("button", _extends$4({
		type: "button",
		onClick: onClose,
		"aria-label": "Close"
	}, ariaProps, {
		className: clsx(`${prefixCls}-close`, modalClassNames?.close),
		disabled: closeBtnIsDisabled,
		style: modalStyles?.close
	}), closableObj.closeIcon) : null;
	const content = /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-container`, modalClassNames?.container),
		style: modalStyles?.container
	}, closerNode, headerNode, /*#__PURE__*/ import_react.createElement("div", _extends$4({
		className: clsx(`${prefixCls}-body`, modalClassNames?.body),
		style: {
			...bodyStyle,
			...modalStyles?.body
		}
	}, bodyProps), children), footerNode);
	return /*#__PURE__*/ import_react.createElement("div", {
		key: "dialog-element",
		role: "dialog",
		"aria-labelledby": title ? ariaId : null,
		"aria-modal": "true",
		ref: mergedRef,
		style: {
			...style,
			...contentStyle
		},
		className: clsx(prefixCls, className),
		onMouseDown,
		onMouseUp,
		tabIndex: -1,
		onFocus: (e) => {
			ignoreElement(e.target);
		}
	}, /*#__PURE__*/ import_react.createElement(MemoChildren_default, { shouldUpdate: visible || forceRender }, modalRender ? modalRender(content) : content));
});
//#endregion
//#region node_modules/@rc-component/dialog/es/Dialog/Content/index.js
function _extends$3() {
	_extends$3 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$3.apply(this, arguments);
}
var Content = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls, title, style, className, visible, forceRender, destroyOnHidden, motionName, ariaId, onVisibleChanged, mousePosition } = props;
	const dialogRef = (0, import_react.useRef)(null);
	const panelRef = (0, import_react.useRef)(null);
	import_react.useImperativeHandle(ref, () => ({
		...panelRef.current,
		inMotion: dialogRef.current.inMotion,
		enableMotion: dialogRef.current.enableMotion
	}));
	const [transformOrigin, setTransformOrigin] = import_react.useState();
	const contentStyle = {};
	if (transformOrigin) contentStyle.transformOrigin = transformOrigin;
	function onPrepare() {
		if (!dialogRef.current?.nativeElement) return;
		const elementOffset = offset(dialogRef.current.nativeElement);
		setTransformOrigin(mousePosition && (mousePosition.x || mousePosition.y) ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px` : "");
	}
	return /*#__PURE__*/ import_react.createElement(es_default$2, {
		visible,
		onVisibleChanged,
		onAppearPrepare: onPrepare,
		onEnterPrepare: onPrepare,
		forceRender,
		motionName,
		removeOnLeave: destroyOnHidden,
		ref: dialogRef
	}, ({ className: motionClassName, style: motionStyle }, motionRef) => /*#__PURE__*/ import_react.createElement(Panel, _extends$3({}, props, {
		ref: panelRef,
		title,
		ariaId,
		prefixCls,
		holderRef: motionRef,
		style: {
			...motionStyle,
			...style,
			...contentStyle
		},
		className: clsx(className, motionClassName)
	})));
});
//#endregion
//#region node_modules/@rc-component/dialog/es/Dialog/Mask.js
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
var Mask = (props) => {
	const { prefixCls, style, visible, maskProps, motionName, className } = props;
	return /*#__PURE__*/ import_react.createElement(es_default$2, {
		key: "mask",
		visible,
		motionName,
		leavedClassName: `${prefixCls}-mask-hidden`
	}, ({ className: motionClassName, style: motionStyle }, ref) => /*#__PURE__*/ import_react.createElement("div", _extends$2({
		ref,
		style: {
			...motionStyle,
			...style
		},
		className: clsx(`${prefixCls}-mask`, motionClassName, className)
	}, maskProps)));
};
//#endregion
//#region node_modules/@rc-component/dialog/es/Dialog/index.js
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
var Dialog = (props) => {
	const { prefixCls = "rc-dialog", zIndex, visible = false, focusTriggerAfterClose = true, wrapStyle, wrapClassName, wrapProps, onClose, afterOpenChange, afterClose, transitionName, animation, closable = true, mask = true, maskTransitionName, maskAnimation, maskClosable = true, maskStyle, maskProps, rootClassName, rootStyle, classNames: modalClassNames, styles: modalStyles } = props;
	const lastOutSideActiveElementRef = (0, import_react.useRef)(null);
	const wrapperRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const [animatedVisible, setAnimatedVisible] = import_react.useState(visible);
	const [isFixedPos, setIsFixedPos] = import_react.useState(false);
	const ariaId = useId_default();
	function saveLastOutSideActiveElementRef() {
		if (!contains(wrapperRef.current, document.activeElement)) lastOutSideActiveElementRef.current = document.activeElement;
	}
	function focusDialogContent() {
		if (!contains(wrapperRef.current, document.activeElement)) contentRef.current?.focus();
	}
	function doClose() {
		setAnimatedVisible(false);
		if (mask && lastOutSideActiveElementRef.current && focusTriggerAfterClose) {
			try {
				lastOutSideActiveElementRef.current.focus({ preventScroll: true });
			} catch (e) {}
			lastOutSideActiveElementRef.current = null;
		}
		if (animatedVisible) afterClose?.();
	}
	function onDialogVisibleChanged(newVisible) {
		if (newVisible) focusDialogContent();
		else doClose();
		afterOpenChange?.(newVisible);
	}
	function onInternalClose(e) {
		onClose?.(e);
	}
	const mouseDownOnMaskRef = (0, import_react.useRef)(false);
	let onWrapperClick = null;
	if (maskClosable) onWrapperClick = (e) => {
		if (wrapperRef.current === e.target && mouseDownOnMaskRef.current) onInternalClose(e);
	};
	function onWrapperMouseDown(e) {
		mouseDownOnMaskRef.current = e.target === wrapperRef.current;
	}
	(0, import_react.useEffect)(() => {
		if (visible) {
			mouseDownOnMaskRef.current = false;
			setAnimatedVisible(true);
			saveLastOutSideActiveElementRef();
			if (wrapperRef.current) {
				const computedWrapStyle = getComputedStyle(wrapperRef.current);
				setIsFixedPos(computedWrapStyle.position === "fixed");
			}
		} else if (animatedVisible && contentRef.current.enableMotion() && !contentRef.current.inMotion()) doClose();
	}, [visible]);
	const mergedStyle = {
		zIndex,
		...wrapStyle,
		...modalStyles?.wrapper,
		display: !animatedVisible ? "none" : null
	};
	return /*#__PURE__*/ import_react.createElement("div", _extends$1({
		className: clsx(`${prefixCls}-root`, rootClassName),
		style: rootStyle
	}, pickAttrs(props, { data: true })), /*#__PURE__*/ import_react.createElement(Mask, {
		prefixCls,
		visible: mask && visible,
		motionName: getMotionName(prefixCls, maskTransitionName, maskAnimation),
		style: {
			zIndex,
			...maskStyle,
			...modalStyles?.mask
		},
		maskProps,
		className: modalClassNames?.mask
	}), /*#__PURE__*/ import_react.createElement("div", _extends$1({
		className: clsx(`${prefixCls}-wrap`, wrapClassName, modalClassNames?.wrapper),
		ref: wrapperRef,
		onClick: onWrapperClick,
		onMouseDown: onWrapperMouseDown,
		style: mergedStyle
	}, wrapProps), /*#__PURE__*/ import_react.createElement(Content, _extends$1({}, props, {
		isFixedPos,
		ref: contentRef,
		closable,
		ariaId,
		prefixCls,
		visible: visible && animatedVisible,
		onClose: onInternalClose,
		onVisibleChanged: onDialogVisibleChanged,
		motionName: getMotionName(prefixCls, transitionName, animation)
	}))));
};
//#endregion
//#region node_modules/@rc-component/dialog/es/DialogWrap.js
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
var DialogWrap = (props) => {
	const { visible, getContainer, forceRender, destroyOnHidden = false, afterClose, closable, panelRef, keyboard = true, scrollLock = true, onClose } = props;
	const { scrollLock: _, ...restProps } = props;
	const [animatedVisible, setAnimatedVisible] = import_react.useState(visible);
	const refContext = import_react.useMemo(() => ({ panel: panelRef }), [panelRef]);
	const onEsc = ({ top, event }) => {
		if (top && keyboard) {
			event.stopPropagation();
			onClose?.(event);
			return;
		}
	};
	import_react.useEffect(() => {
		if (visible) setAnimatedVisible(true);
	}, [visible]);
	if (!forceRender && destroyOnHidden && !animatedVisible) return null;
	return /*#__PURE__*/ import_react.createElement(RefContext.Provider, { value: refContext }, /*#__PURE__*/ import_react.createElement(es_default$1, {
		open: visible || forceRender || animatedVisible,
		onEsc,
		autoDestroy: false,
		getContainer,
		autoLock: scrollLock && (visible || animatedVisible)
	}, /*#__PURE__*/ import_react.createElement(Dialog, _extends({}, restProps, {
		destroyOnHidden,
		afterClose: () => {
			const { afterClose: closableAfterClose } = (closable && typeof closable === "object" ? closable : {}) || {};
			closableAfterClose?.();
			afterClose?.();
			setAnimatedVisible(false);
		}
	}))));
};
//#endregion
//#region node_modules/@rc-component/dialog/es/index.js
var es_default = DialogWrap;
//#endregion
export { CSSMotionList_default as a, es_default$2 as i, Panel as n, MotionProvider as o, es_default$1 as r, es_default as t };
