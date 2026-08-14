import { r as __toESM } from "../_runtime.mjs";
import { A as wrapperRaf, E as useComposeRef, F as require_react_dom, P as useEvent, p as pickAttrs } from "./@ant-design/cssinjs-utils+[...].mjs";
import { g as require_react } from "./@ant-design/cssinjs+[...].mjs";
import { C as clsx } from "./@ant-design/icons+[...].mjs";
import { a as CSSMotionList_default } from "./@rc-component/dialog+[...].mjs";
//#region node_modules/@rc-component/notification/es/hooks/useListPosition/useSizes.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Stores measured node sizes by key and exposes a ref callback to update them.
*/
function useSizes() {
	const [sizeMap, setSizeMap] = import_react.useState({});
	return [sizeMap, import_react.useCallback((key, node) => {
		if (!node) {
			setSizeMap((prevSizeMap) => {
				if (!(key in prevSizeMap)) return prevSizeMap;
				const nextSizeMap = { ...prevSizeMap };
				delete nextSizeMap[key];
				return nextSizeMap;
			});
			return;
		}
		const nextSize = {
			width: node.offsetWidth,
			height: node.offsetHeight
		};
		setSizeMap((prevSizeMap) => {
			const prevSize = prevSizeMap[key];
			if (prevSize && prevSize.width === nextSize.width && prevSize.height === nextSize.height) return prevSizeMap;
			return {
				...prevSizeMap,
				[key]: nextSize
			};
		});
	}, [])];
}
//#endregion
//#region node_modules/@rc-component/notification/es/hooks/useListPosition/index.js
/**
* Calculates each notification's position and the full list height.
*/
function useListPosition(configList, stack, gap = 0) {
	const [sizeMap, setNodeSize] = useSizes();
	const [notificationPosition, totalHeight, topNoticeHeight, topNoticeWidth] = import_react.useMemo(() => {
		let offsetY = 0;
		let nextTotalHeight = 0;
		const stackThreshold = stack?.threshold ?? 0;
		const nextNotificationPosition = /* @__PURE__ */ new Map();
		let nextTopNoticeHeight;
		let nextTopNoticeWidth;
		configList.slice().reverse().forEach((config, index) => {
			const key = String(config.key);
			const height = sizeMap[key]?.height ?? 0;
			const y = stack && index > 0 ? offsetY + (stack.offset ?? 0) - height : offsetY;
			nextNotificationPosition.set(key, y);
			if (index === 0) {
				nextTopNoticeHeight = height;
				nextTopNoticeWidth = sizeMap[key]?.width ?? 0;
			}
			if (!stack || index < stackThreshold) nextTotalHeight = Math.max(nextTotalHeight, y + height);
			if (stack) offsetY = y + height;
			else offsetY += height + gap;
		});
		return [
			nextNotificationPosition,
			nextTotalHeight,
			nextTopNoticeHeight,
			nextTopNoticeWidth
		];
	}, [
		configList,
		gap,
		sizeMap,
		stack
	]);
	return [
		notificationPosition,
		setNodeSize,
		totalHeight,
		topNoticeHeight,
		topNoticeWidth
	];
}
//#endregion
//#region node_modules/@rc-component/notification/es/hooks/useStack.js
var DEFAULT_OFFSET = 8;
var DEFAULT_THRESHOLD = 3;
/**
* Resolves the stack setting into an enabled flag and normalized stack params.
*/
var useStack = (config) => {
	const result = {
		offset: DEFAULT_OFFSET,
		threshold: DEFAULT_THRESHOLD
	};
	if (config && typeof config === "object") {
		result.offset = config.offset ?? DEFAULT_OFFSET;
		result.threshold = config.threshold ?? DEFAULT_THRESHOLD;
	}
	return [!!config, result];
};
//#endregion
//#region node_modules/@rc-component/notification/es/hooks/useNoticeTimer.js
/**
* Runs the notice auto-close timer and reports progress updates.
* Returns controls to pause and resume the timer.
*/
function useNoticeTimer(duration, onClose, onUpdate) {
	const durationMs = Math.max(typeof duration === "number" ? duration : 0, 0) * 1e3;
	const onEventClose = useEvent(onClose);
	const onEventUpdate = useEvent(onUpdate);
	const [walking, setWalking] = import_react.useState(durationMs > 0);
	const passTimeRef = import_react.useRef(0);
	const lastRafTimeRef = import_react.useRef(null);
	function syncPassTime() {
		const now = Date.now();
		const lastRafTime = lastRafTimeRef.current;
		if (lastRafTime !== null) passTimeRef.current += now - lastRafTime;
		lastRafTimeRef.current = now;
	}
	const onPause = import_react.useCallback(() => {
		syncPassTime();
		setWalking(false);
	}, []);
	const onResume = import_react.useCallback(() => {
		if (durationMs > 0) {
			lastRafTimeRef.current = Date.now();
			setWalking(true);
		} else onEventUpdate(0);
	}, [durationMs]);
	import_react.useEffect(() => {
		passTimeRef.current = 0;
		setWalking(durationMs > 0);
	}, [durationMs]);
	import_react.useEffect(() => {
		if (!walking) return;
		let rafId = null;
		function step() {
			syncPassTime();
			if (passTimeRef.current >= durationMs) {
				onEventUpdate(1);
				onEventClose();
			} else {
				onEventUpdate(Math.min(passTimeRef.current / durationMs, 1));
				rafId = wrapperRaf(step);
			}
		}
		step();
		return () => {
			wrapperRaf.cancel(rafId);
		};
	}, [durationMs, walking]);
	return [onResume, onPause];
}
//#endregion
//#region node_modules/@rc-component/notification/es/hooks/useClosable.js
/**
* Normalizes the closable option into a boolean flag, config, and aria props.
*/
function useClosable(closable) {
	const closableObj = import_react.useMemo(() => {
		if (closable === false) return {
			closeIcon: null,
			disabled: true
		};
		if (typeof closable === "object" && closable !== null) return closable;
		return {};
	}, [closable]);
	const closableConfig = import_react.useMemo(() => ({
		...closableObj,
		closeIcon: "closeIcon" in closableObj ? closableObj.closeIcon : "×",
		disabled: closableObj.disabled ?? false
	}), [closableObj]);
	const closableAriaProps = import_react.useMemo(() => pickAttrs(closableConfig, true), [closableConfig]);
	return [
		!!closable,
		closableConfig,
		closableAriaProps
	];
}
//#endregion
//#region node_modules/@rc-component/notification/es/Progress.js
var Progress = ({ className, style, percent }) => /*#__PURE__*/ import_react.createElement("progress", {
	className,
	max: "100",
	value: percent,
	style
});
//#endregion
//#region node_modules/@rc-component/notification/es/Notification.js
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
var Notification = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls, className, style, classNames, styles, components, title, description, icon, actions, role, closable, offset, notificationIndex, stackInThreshold, props: rootProps, duration = 4.5, showProgress, hovering: forcedHovering, pauseOnHover = true, onClick, onMouseEnter, onMouseLeave, onClose } = props;
	const [percent, setPercent] = import_react.useState(0);
	const noticePrefixCls = `${prefixCls}-notice`;
	const [mergedClosable, closableConfig, closeBtnAriaProps] = useClosable(closable);
	const onInternalClose = useEvent(() => {
		closableConfig.onClose?.();
		onClose?.();
	});
	const [hovering, setHovering] = import_react.useState(false);
	const [onResume, onPause] = useNoticeTimer(duration, onInternalClose, setPercent);
	const validPercent = 100 - Math.min(Math.max(percent * 100, 0), 100);
	const Progress$1 = components?.progress || Progress;
	import_react.useEffect(() => {
		if (!pauseOnHover) return;
		if (forcedHovering) onPause();
		else if (!hovering) onResume();
	}, [
		forcedHovering,
		hovering,
		onPause,
		onResume,
		pauseOnHover
	]);
	function onInternalMouseEnter(event) {
		setHovering(true);
		if (pauseOnHover) onPause();
		onMouseEnter?.(event);
	}
	function onInternalMouseLeave(event) {
		setHovering(false);
		if (pauseOnHover && !forcedHovering) onResume();
		onMouseLeave?.(event);
	}
	function onInternalCloseClick(event) {
		event.preventDefault();
		event.stopPropagation();
		onInternalClose();
	}
	const offsetRef = import_react.useRef(offset);
	if (offset !== void 0) offsetRef.current = offset;
	const notificationIndexRef = import_react.useRef(notificationIndex);
	if (notificationIndex !== void 0) notificationIndexRef.current = notificationIndex;
	const mergedOffset = offset ?? offsetRef.current;
	const mergedNotificationIndex = notificationIndex ?? notificationIndexRef.current ?? 0;
	const titleNode = title !== void 0 && title !== null ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-title`, classNames?.title),
		style: styles?.title
	}, title) : null;
	const descNode = description !== void 0 && description !== null ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-description`, classNames?.description),
		style: styles?.description
	}, description) : null;
	const hasTitle = titleNode !== null;
	const hasDescription = descNode !== null;
	let contentNode = null;
	if (hasTitle && hasDescription) contentNode = /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-section`, classNames?.section),
		style: styles?.section
	}, titleNode, descNode);
	else contentNode = titleNode || descNode;
	if (icon !== void 0 && icon !== null) contentNode = /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-wrapper`, classNames?.wrapper),
		style: styles?.wrapper
	}, /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-icon`, classNames?.icon),
		style: styles?.icon
	}, icon), contentNode);
	const actionsNode = actions ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-actions`, classNames?.actions),
		style: styles?.actions
	}, actions) : null;
	const mergedStyle = {
		"--notification-index": mergedNotificationIndex,
		...styles?.root,
		...style
	};
	if (mergedOffset !== void 0) mergedStyle["--notification-y"] = `${mergedOffset}px`;
	const mergedRole = role ?? rootProps?.role ?? "alert";
	return /*#__PURE__*/ import_react.createElement("div", _extends$2({}, rootProps, {
		ref,
		role: mergedRole,
		"data-notification-index": mergedNotificationIndex,
		className: clsx(noticePrefixCls, className, classNames?.root, {
			[`${noticePrefixCls}-closable`]: mergedClosable,
			[`${noticePrefixCls}-stack-in-threshold`]: stackInThreshold
		}),
		style: mergedStyle,
		onClick,
		onMouseEnter: onInternalMouseEnter,
		onMouseLeave: onInternalMouseLeave
	}), contentNode, actionsNode, mergedClosable && /*#__PURE__*/ import_react.createElement("button", _extends$2({
		className: clsx(`${noticePrefixCls}-close`, classNames?.close),
		"aria-label": "Close"
	}, closeBtnAriaProps, {
		style: styles?.close,
		onClick: onInternalCloseClick
	}), closableConfig.closeIcon), showProgress && typeof duration === "number" && duration > 0 && /*#__PURE__*/ import_react.createElement(Progress$1, {
		className: clsx(`${noticePrefixCls}-progress`, classNames?.progress),
		percent: validPercent,
		style: styles?.progress
	}));
});
//#endregion
//#region node_modules/@rc-component/notification/es/NotificationProvider.js
var NotificationContext = /*#__PURE__*/ import_react.createContext({});
var NotificationProvider = ({ children, classNames }) => {
	const context = import_react.useMemo(() => ({ classNames }), [classNames]);
	return /*#__PURE__*/ import_react.createElement(NotificationContext.Provider, { value: context }, children);
};
//#endregion
//#region node_modules/@rc-component/notification/es/NotificationList/Content.js
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
var Content = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { listPrefixCls, height, topNoticeHeight = 0, topNoticeWidth = 0, className, style, ...restProps } = props;
	const contentPrefixCls = `${listPrefixCls}-content`;
	const prevHeightRef = import_react.useRef(height);
	const heightStatus = height < prevHeightRef.current ? "decrease" : "increase";
	prevHeightRef.current = height;
	const contentStyle = {
		...style,
		height,
		"--top-notificiation-height": `${topNoticeHeight}px`,
		"--top-notificiation-width": `${topNoticeWidth}px`
	};
	return /*#__PURE__*/ import_react.createElement("div", _extends$1({}, restProps, {
		className: clsx(contentPrefixCls, `${contentPrefixCls}-${heightStatus}`, className),
		style: contentStyle,
		ref
	}));
});
//#endregion
//#region node_modules/@rc-component/notification/es/NotificationList/index.js
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
var noticeSlotKeys = [
	"wrapper",
	"root",
	"icon",
	"section",
	"title",
	"description",
	"actions",
	"close",
	"progress"
];
function fillClassNames(classNamesList) {
	return noticeSlotKeys.reduce((mergedClassNames, key) => {
		mergedClassNames[key] = clsx(...classNamesList.map((classNames) => classNames?.[key]));
		return mergedClassNames;
	}, {});
}
function fillStyles(stylesList) {
	return noticeSlotKeys.reduce((mergedStyles, key) => {
		mergedStyles[key] = Object.assign({}, ...stylesList.map((styles) => styles?.[key]));
		return mergedStyles;
	}, {});
}
function getIndex(keys, key) {
	const strKey = String(key);
	const index = keys.findIndex((item) => item.key === strKey);
	if (index === -1) return;
	return keys.length - index - 1;
}
var NotificationListItem = (props) => {
	const { config, components, contextClassNames, classNames, styles, className, style, nodeRef, listHovering, stackEnabled, pauseOnHover, setNodeSize, onNoticeClose, ...restProps } = props;
	const { key, placement: itemPlacement, ...notificationConfig } = config;
	const strKey = String(key);
	const setItemRef = import_react.useCallback((node) => {
		setNodeSize(strKey, node);
	}, [setNodeSize, strKey]);
	const ref = useComposeRef(nodeRef, setItemRef);
	return /*#__PURE__*/ import_react.createElement(Notification, _extends({}, notificationConfig, restProps, {
		ref,
		className: clsx(contextClassNames?.notice, config.className, className),
		style: {
			...style,
			...config.style
		},
		classNames: fillClassNames([classNames, config.classNames]),
		styles: fillStyles([styles, config.styles]),
		components: {
			...components,
			...config.components
		},
		hovering: stackEnabled && listHovering,
		pauseOnHover: config.pauseOnHover ?? pauseOnHover,
		onClose: () => {
			config.onClose?.();
			onNoticeClose?.(key);
		}
	}));
};
var NotificationList = (props) => {
	const { configList = [], prefixCls = "rc-notification", pauseOnHover, classNames, styles, components, stack: stackConfig, motion, placement, className, style, onNoticeClose, onAllRemoved } = props;
	const { classNames: contextClassNames } = import_react.useContext(NotificationContext);
	const keys = import_react.useMemo(() => configList.map((config) => ({
		config,
		key: String(config.key)
	})), [configList]);
	const placementMotion = typeof motion === "function" ? motion(placement) : motion;
	const [stackEnabled, { offset, threshold }] = useStack(stackConfig);
	const [listHovering, setListHovering] = import_react.useState(false);
	const expanded = stackEnabled && (listHovering || keys.length <= threshold);
	const stackPosition = import_react.useMemo(() => {
		if (!stackEnabled || expanded) return;
		return {
			offset,
			threshold
		};
	}, [
		expanded,
		offset,
		stackEnabled,
		threshold
	]);
	const [gap, setGap] = import_react.useState(0);
	const contentRef = import_react.useRef(null);
	const [notificationPosition, setNodeSize, totalHeight, topNoticeHeight, topNoticeWidth] = useListPosition(configList, stackPosition, gap);
	const hasConfigList = !!configList.length;
	import_react.useEffect(() => {
		const listNode = contentRef.current;
		if (!listNode) return;
		const { gap: cssGap, rowGap } = window.getComputedStyle(listNode);
		const nextGap = parseFloat(rowGap || cssGap) || 0;
		setGap((prevGap) => prevGap === nextGap ? prevGap : nextGap);
	}, [hasConfigList]);
	const listPrefixCls = `${prefixCls}-list`;
	return /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(prefixCls, listPrefixCls, `${prefixCls}-${placement}`, contextClassNames?.list, className, classNames?.list, {
			[`${prefixCls}-stack`]: stackEnabled,
			[`${prefixCls}-stack-expanded`]: expanded,
			[`${listPrefixCls}-hovered`]: listHovering
		}),
		onMouseEnter: () => {
			setListHovering(true);
		},
		onMouseLeave: () => {
			setListHovering(false);
		},
		style: {
			...styles?.list,
			...style
		}
	}, /*#__PURE__*/ import_react.createElement(Content, {
		listPrefixCls,
		height: totalHeight,
		topNoticeHeight,
		topNoticeWidth,
		className: classNames?.listContent,
		style: styles?.listContent,
		ref: contentRef
	}, /*#__PURE__*/ import_react.createElement(CSSMotionList_default, _extends({
		component: false,
		keys,
		motionAppear: true
	}, placementMotion, { onAllRemoved: () => {
		if (placement) onAllRemoved?.(placement);
	} }), ({ config, className: motionClassName, style: motionStyle }, nodeRef) => {
		const { key } = config;
		const strKey = String(key);
		const notificationIndex = getIndex(keys, key);
		const stackInThreshold = stackEnabled && notificationIndex !== void 0 && notificationIndex < threshold;
		return /*#__PURE__*/ import_react.createElement(NotificationListItem, {
			key,
			config,
			components,
			contextClassNames,
			classNames,
			styles,
			className: motionClassName,
			style: motionStyle,
			nodeRef,
			prefixCls,
			offset: notificationPosition.get(strKey),
			notificationIndex,
			stackInThreshold,
			listHovering,
			stackEnabled,
			pauseOnHover,
			setNodeSize,
			onNoticeClose
		});
	})));
};
//#endregion
//#region node_modules/@rc-component/notification/es/Notifications.js
var Notifications = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls = "rc-notification", container, motion, maxCount, pauseOnHover, classNames, styles, components, className, style, onAllRemoved, stack, renderNotifications } = props;
	const [configList, setConfigList] = import_react.useState([]);
	const [placements, setPlacements] = import_react.useState({});
	const emptyRef = import_react.useRef(false);
	import_react.useImperativeHandle(ref, () => ({
		open: (config) => {
			setConfigList((list) => {
				let clone = [...list];
				const index = clone.findIndex((item) => item.key === config.key);
				const innerConfig = { ...config };
				if (index >= 0) {
					innerConfig.times = (list[index]?.times ?? 0) + 1;
					clone[index] = innerConfig;
				} else {
					innerConfig.times = 0;
					clone.push(innerConfig);
				}
				if (maxCount && maxCount > 0 && clone.length > maxCount) clone = clone.slice(-maxCount);
				return clone;
			});
		},
		close: (key) => {
			setConfigList((list) => list.filter((item) => item.key !== key));
		},
		destroy: () => {
			setConfigList([]);
		}
	}));
	import_react.useEffect(() => {
		const nextPlacements = {};
		configList.forEach((config) => {
			const placement = config.placement ?? "topRight";
			nextPlacements[placement] = nextPlacements[placement] || [];
			nextPlacements[placement].push(config);
		});
		Object.keys(placements).forEach((placement) => {
			nextPlacements[placement] = nextPlacements[placement] || [];
		});
		setPlacements(nextPlacements);
	}, [configList]);
	const onAllNoticeRemoved = useEvent((placement) => {
		setPlacements((originPlacements) => {
			const clone = { ...originPlacements };
			if (!(clone[placement] || []).length) delete clone[placement];
			return clone;
		});
	});
	import_react.useEffect(() => {
		if (Object.keys(placements).length > 0) emptyRef.current = true;
		else if (emptyRef.current) {
			onAllRemoved?.();
			emptyRef.current = false;
		}
	}, [placements, onAllRemoved]);
	if (!container) return null;
	const placementList = Object.keys(placements);
	return /*#__PURE__*/ (0, import_react_dom.createPortal)(/*#__PURE__*/ import_react.createElement(import_react.Fragment, null, placementList.map((placement) => {
		const list = /*#__PURE__*/ import_react.createElement(NotificationList, {
			key: placement,
			configList: placements[placement],
			placement,
			prefixCls,
			pauseOnHover,
			classNames,
			styles,
			components,
			className: className?.(placement),
			style: style?.(placement),
			motion,
			stack,
			onNoticeClose: (key) => {
				setConfigList((oriList) => oriList.filter((item) => item.key !== key));
			},
			onAllRemoved: onAllNoticeRemoved
		});
		return renderNotifications ? /*#__PURE__*/ import_react.cloneElement(renderNotifications(list, {
			prefixCls,
			key: placement
		}), { key: placement }) : list;
	})), container);
});
//#endregion
//#region node_modules/@rc-component/notification/es/hooks/useNotification.js
var defaultGetContainer = () => document.body;
var uniqueKey = 0;
function mergeConfig(...objList) {
	const clone = {};
	objList.forEach((obj) => {
		if (obj) Object.keys(obj).forEach((key) => {
			const value = obj[key];
			if (value !== void 0) clone[key] = value;
		});
	});
	return clone;
}
/**
* Creates the notification API and the React holder element.
* Queueing is handled internally until the notification instance is ready.
*/
function useNotification(rootConfig = {}) {
	const { getContainer = defaultGetContainer, motion, prefixCls, placement, closable, duration, showProgress, pauseOnHover, classNames, styles, components, maxCount, className, style, onAllRemoved, stack, renderNotifications } = rootConfig;
	const shareConfig = {
		placement,
		closable,
		duration,
		showProgress
	};
	const [container, setContainer] = import_react.useState();
	const notificationsRef = import_react.useRef(null);
	const [taskQueue, setTaskQueue] = import_react.useState([]);
	const contextHolder = /*#__PURE__*/ import_react.createElement(Notifications, {
		container,
		ref: notificationsRef,
		prefixCls,
		motion,
		maxCount,
		pauseOnHover,
		classNames,
		styles,
		components,
		className,
		style,
		onAllRemoved,
		stack,
		renderNotifications
	});
	const open = useEvent((config) => {
		const mergedConfig = mergeConfig(shareConfig, config);
		if (mergedConfig.key === null || mergedConfig.key === void 0) {
			mergedConfig.key = `rc-notification-${uniqueKey}`;
			uniqueKey += 1;
		}
		setTaskQueue((queue) => [...queue, {
			type: "open",
			config: mergedConfig
		}]);
	});
	const api = import_react.useMemo(() => ({
		open,
		close: (key) => {
			setTaskQueue((queue) => [...queue, {
				type: "close",
				key
			}]);
		},
		destroy: () => {
			setTaskQueue((queue) => [...queue, { type: "destroy" }]);
		}
	}), []);
	import_react.useEffect(() => {
		setContainer(getContainer());
	});
	import_react.useEffect(() => {
		if (notificationsRef.current && taskQueue.length) {
			taskQueue.forEach((task) => {
				switch (task.type) {
					case "open":
						notificationsRef.current?.open(task.config);
						break;
					case "close":
						notificationsRef.current?.close(task.key);
						break;
					case "destroy": notificationsRef.current?.destroy();
				}
			});
			setTaskQueue((originQueue) => {
				const targetTaskQueue = originQueue.filter((task) => !taskQueue.includes(task));
				return targetTaskQueue.length === originQueue.length ? originQueue : targetTaskQueue;
			});
		}
	}, [taskQueue]);
	return [api, contextHolder];
}
//#endregion
export { Notification as i, NotificationList as n, NotificationProvider as r, useNotification as t };
