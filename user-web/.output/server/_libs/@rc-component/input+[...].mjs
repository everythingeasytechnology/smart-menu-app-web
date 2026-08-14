import { r as __toESM } from "../../_runtime.mjs";
import { A as wrapperRaf, C as getNodeRef, E as useComposeRef, N as useLayoutEffect, P as useEvent, T as supportRef, _ as triggerFocus, b as getDOM, f as toArray, j as useControlledState, m as omit } from "../@ant-design/cssinjs-utils+[...].mjs";
import { g as require_react } from "../@ant-design/cssinjs+[...].mjs";
import { C as clsx } from "../@ant-design/icons+[...].mjs";
//#region node_modules/@rc-component/resize-observer/es/Collection.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CollectionContext = /*#__PURE__*/ import_react.createContext(null);
/**
* Collect all the resize event from children ResizeObserver
*/
function Collection({ children, onBatchResize }) {
	const resizeIdRef = import_react.useRef(0);
	const resizeInfosRef = import_react.useRef([]);
	const onCollectionResize = import_react.useContext(CollectionContext);
	const onResize = import_react.useCallback((size, element, data) => {
		resizeIdRef.current += 1;
		const currentId = resizeIdRef.current;
		resizeInfosRef.current.push({
			size,
			element,
			data
		});
		Promise.resolve().then(() => {
			if (currentId === resizeIdRef.current) {
				onBatchResize?.(resizeInfosRef.current);
				resizeInfosRef.current = [];
			}
		});
		onCollectionResize?.(size, element, data);
	}, [onBatchResize, onCollectionResize]);
	return /*#__PURE__*/ import_react.createElement(CollectionContext.Provider, { value: onResize }, children);
}
//#endregion
//#region node_modules/@rc-component/resize-observer/es/utils/observerUtil.js
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
	entities.forEach((entity) => {
		const { target } = entity;
		elementListeners.get(target)?.forEach((listener) => listener(target));
	});
}
var observer;
function ensureResizeObserver() {
	if (!observer) observer = new ResizeObserver(onResize);
	return observer;
}
function observe(element, callback) {
	if (!elementListeners.has(element)) {
		elementListeners.set(element, /* @__PURE__ */ new Set());
		ensureResizeObserver().observe(element);
	}
	elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
	if (elementListeners.has(element)) {
		elementListeners.get(element).delete(callback);
		if (!elementListeners.get(element).size) {
			ensureResizeObserver().unobserve(element);
			elementListeners.delete(element);
		}
	}
}
//#endregion
//#region node_modules/@rc-component/resize-observer/es/useResizeObserver.js
function useResizeObserver(enabled, getTarget, onDelayResize, onSyncResize) {
	const sizeRef = import_react.useRef({
		width: -1,
		height: -1,
		offsetWidth: -1,
		offsetHeight: -1
	});
	const onInternalResize = useEvent((target) => {
		const { width, height } = target.getBoundingClientRect();
		const { offsetWidth, offsetHeight } = target;
		/**
		* Resize observer trigger when content size changed.
		* In most case we just care about element size,
		* let's use `boundary` instead of `contentRect` here to avoid shaking.
		*/
		const fixedWidth = Math.floor(width);
		const fixedHeight = Math.floor(height);
		if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
			const size = {
				width: fixedWidth,
				height: fixedHeight,
				offsetWidth,
				offsetHeight
			};
			sizeRef.current = size;
			const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
			const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
			const sizeInfo = {
				...size,
				offsetWidth: mergedOffsetWidth,
				offsetHeight: mergedOffsetHeight
			};
			onSyncResize?.(sizeInfo, target);
			Promise.resolve().then(() => {
				onDelayResize?.(sizeInfo, target);
			});
		}
	});
	const isFuncTarget = typeof getTarget === "function";
	const funcTargetIdRef = import_react.useRef(0);
	import_react.useEffect(() => {
		const target = isFuncTarget ? getTarget() : getTarget;
		if (target && enabled) observe(target, onInternalResize);
		else if (enabled && isFuncTarget) funcTargetIdRef.current += 1;
		return () => {
			if (target) unobserve(target, onInternalResize);
		};
	}, [enabled, isFuncTarget ? funcTargetIdRef.current : getTarget]);
}
//#endregion
//#region node_modules/@rc-component/resize-observer/es/SingleObserver/index.js
function SingleObserver(props, ref) {
	const { children, disabled, onResize, data } = props;
	const elementRef = import_react.useRef(null);
	const onCollectionResize = import_react.useContext(CollectionContext);
	const isRenderProps = typeof children === "function";
	const mergedChildren = isRenderProps ? children(elementRef) : children;
	const canRef = !isRenderProps && /*#__PURE__*/ import_react.isValidElement(mergedChildren) && supportRef(mergedChildren);
	const originRef = canRef ? getNodeRef(mergedChildren) : null;
	const mergedRef = useComposeRef(originRef, elementRef);
	const getDomElement = () => {
		return getDOM(elementRef.current);
	};
	import_react.useImperativeHandle(ref, () => getDomElement());
	useResizeObserver(!disabled, getDomElement, onResize, (sizeInfo, target) => {
		onCollectionResize?.(sizeInfo, target, data);
	});
	return canRef ? /*#__PURE__*/ import_react.cloneElement(mergedChildren, { ref: mergedRef }) : mergedChildren;
}
var RefSingleObserver = /*#__PURE__*/ import_react.forwardRef(SingleObserver);
//#endregion
//#region node_modules/@rc-component/resize-observer/es/index.js
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
var INTERNAL_PREFIX_KEY = "rc-observer-key";
function ResizeObserver$1(props, ref) {
	const { children } = props;
	return (typeof children === "function" ? [children] : toArray(children)).map((child, index) => {
		const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
		return /*#__PURE__*/ import_react.createElement(RefSingleObserver, _extends$4({}, props, {
			key,
			ref: index === 0 ? ref : void 0
		}), child);
	});
}
var RefResizeObserver = /*#__PURE__*/ import_react.forwardRef(ResizeObserver$1);
RefResizeObserver.Collection = Collection;
//#endregion
//#region node_modules/@rc-component/input/es/utils/commonUtils.js
function hasAddon(props) {
	return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
	return !!(props.prefix || props.suffix || props.allowClear);
}
function cloneEvent(event, target, value) {
	const currentTarget = target.cloneNode(true);
	const newEvent = Object.create(event, {
		target: { value: currentTarget },
		currentTarget: { value: currentTarget }
	});
	currentTarget.value = value;
	if (typeof target.selectionStart === "number" && typeof target.selectionEnd === "number") {
		currentTarget.selectionStart = target.selectionStart;
		currentTarget.selectionEnd = target.selectionEnd;
	}
	currentTarget.setSelectionRange = (...args) => {
		target.setSelectionRange(...args);
	};
	return newEvent;
}
function resolveOnChange(target, e, onChange, targetValue) {
	if (!onChange) return;
	let event = e;
	if (e.type === "click") {
		event = cloneEvent(e, target, "");
		onChange(event);
		return;
	}
	if (target.type !== "file" && targetValue !== void 0) {
		event = cloneEvent(e, target, targetValue);
		onChange(event);
		return;
	}
	onChange(event);
}
//#endregion
//#region node_modules/@rc-component/input/es/BaseInput.js
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
var BaseInput = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { inputElement: inputEl, children, prefixCls, prefix, suffix, addonBefore, addonAfter, className, style, disabled, readOnly, focused, triggerFocus, allowClear, value, handleReset, hidden, classes, classNames, dataAttrs, styles, components, onClear } = props;
	const inputElement = children ?? inputEl;
	const AffixWrapperComponent = components?.affixWrapper || "span";
	const GroupWrapperComponent = components?.groupWrapper || "span";
	const WrapperComponent = components?.wrapper || "span";
	const GroupAddonComponent = components?.groupAddon || "span";
	const containerRef = (0, import_react.useRef)(null);
	const onInputClick = (e) => {
		if (containerRef.current?.contains(e.target)) triggerFocus?.();
	};
	const hasAffix = hasPrefixSuffix(props);
	let element = /*#__PURE__*/ (0, import_react.cloneElement)(inputElement, {
		value,
		className: clsx(inputElement.props?.className, !hasAffix && classNames?.variant) || null
	});
	const groupRef = (0, import_react.useRef)(null);
	import_react.useImperativeHandle(ref, () => ({ nativeElement: groupRef.current || containerRef.current }));
	if (hasAffix) {
		let clearIcon = null;
		if (allowClear) {
			const needClear = !disabled && !readOnly && value && !(typeof allowClear === "object" && allowClear.disabled);
			const clearIconCls = `${prefixCls}-clear-icon`;
			const iconNode = typeof allowClear === "object" && allowClear?.clearIcon ? allowClear.clearIcon : "✖";
			clearIcon = /*#__PURE__*/ import_react.createElement("button", {
				type: "button",
				onClick: (event) => {
					handleReset?.(event);
					onClear?.();
				},
				onMouseDown: (e) => e.preventDefault(),
				className: clsx(clearIconCls, {
					[`${clearIconCls}-hidden`]: !needClear,
					[`${clearIconCls}-has-suffix`]: !!suffix
				}, classNames?.clear),
				style: styles?.clear
			}, iconNode);
		}
		const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
		const affixWrapperCls = clsx(affixWrapperPrefixCls, {
			[`${prefixCls}-disabled`]: disabled,
			[`${affixWrapperPrefixCls}-disabled`]: disabled,
			[`${affixWrapperPrefixCls}-focused`]: focused,
			[`${affixWrapperPrefixCls}-readonly`]: readOnly,
			[`${affixWrapperPrefixCls}-input-with-clear-btn`]: suffix && allowClear && value
		}, classes?.affixWrapper, classNames?.affixWrapper, classNames?.variant);
		const suffixNode = (suffix || allowClear) && /*#__PURE__*/ import_react.createElement("span", {
			className: clsx(`${prefixCls}-suffix`, classNames?.suffix),
			style: styles?.suffix
		}, clearIcon, suffix);
		element = /*#__PURE__*/ import_react.createElement(AffixWrapperComponent, _extends$3({
			className: affixWrapperCls,
			style: styles?.affixWrapper,
			onClick: onInputClick
		}, dataAttrs?.affixWrapper, { ref: containerRef }), prefix && /*#__PURE__*/ import_react.createElement("span", {
			className: clsx(`${prefixCls}-prefix`, classNames?.prefix),
			style: styles?.prefix
		}, prefix), element, suffixNode);
	}
	if (hasAddon(props)) {
		const wrapperCls = `${prefixCls}-group`;
		const addonCls = `${wrapperCls}-addon`;
		const groupWrapperCls = `${wrapperCls}-wrapper`;
		const mergedWrapperClassName = clsx(`${prefixCls}-wrapper`, wrapperCls, classes?.wrapper, classNames?.wrapper);
		const mergedGroupClassName = clsx(groupWrapperCls, { [`${groupWrapperCls}-disabled`]: disabled }, classes?.group, classNames?.groupWrapper);
		element = /*#__PURE__*/ import_react.createElement(GroupWrapperComponent, {
			className: mergedGroupClassName,
			ref: groupRef
		}, /*#__PURE__*/ import_react.createElement(WrapperComponent, { className: mergedWrapperClassName }, addonBefore && /*#__PURE__*/ import_react.createElement(GroupAddonComponent, { className: addonCls }, addonBefore), element, addonAfter && /*#__PURE__*/ import_react.createElement(GroupAddonComponent, { className: addonCls }, addonAfter)));
	}
	return /*#__PURE__*/ import_react.cloneElement(element, {
		className: clsx(element.props?.className, className) || null,
		style: {
			...element.props?.style,
			...style
		},
		hidden
	});
});
//#endregion
//#region node_modules/@rc-component/input/es/hooks/useCount.js
function useCount(count, showCount) {
	return import_react.useMemo(() => {
		let mergedConfig = {};
		if (showCount) mergedConfig.show = typeof showCount === "object" && showCount.formatter ? showCount.formatter : !!showCount;
		mergedConfig = {
			...mergedConfig,
			...count
		};
		const { show, ...rest } = mergedConfig;
		return {
			...rest,
			show: !!show,
			showFormatter: typeof show === "function" ? show : void 0,
			strategy: rest.strategy || ((value) => value.length)
		};
	}, [count, showCount]);
}
//#endregion
//#region node_modules/@rc-component/input/es/hooks/useCountDisplay.js
function useCountDisplay({ countConfig, value, maxLength }) {
	return import_react.useMemo(() => {
		const mergedMax = countConfig.max ?? maxLength;
		const valueLength = countConfig.strategy(value);
		const isOutOfRange = !!mergedMax && valueLength > mergedMax;
		const hasMaxLength = Number(mergedMax) > 0;
		return {
			mergedMax,
			isOutOfRange,
			dataCount: countConfig.show ? countConfig.showFormatter ? countConfig.showFormatter({
				value,
				count: valueLength,
				maxLength: mergedMax
			}) : `${valueLength}${hasMaxLength ? ` / ${mergedMax}` : ""}` : void 0
		};
	}, [
		countConfig,
		maxLength,
		value
	]);
}
//#endregion
//#region node_modules/@rc-component/input/es/hooks/useCountExceed.js
function useCountExceed({ countConfig, getTarget }) {
	const [selection, setSelection] = import_react.useState(null);
	const getTargetRef = import_react.useRef(getTarget);
	import_react.useEffect(() => {
		getTargetRef.current = getTarget;
	}, [getTarget]);
	import_react.useEffect(() => {
		if (selection) {
			getTargetRef.current()?.setSelectionRange(...selection);
			setSelection(null);
		}
	}, [selection]);
	return import_react.useCallback((currentValue, isComposing) => {
		let nextValue = currentValue;
		if (!isComposing && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
			nextValue = countConfig.exceedFormatter(currentValue, { max: countConfig.max });
			if (currentValue !== nextValue) setSelection([getTargetRef.current()?.selectionStart || 0, getTargetRef.current()?.selectionEnd || 0]);
		}
		return nextValue;
	}, [countConfig]);
}
//#endregion
//#region node_modules/@rc-component/input/es/hooks/useMergedValue.js
function useMergedValue(defaultValue, controlledValue) {
	const [value, setValue] = useControlledState(defaultValue, controlledValue);
	return {
		value,
		setValue,
		formatValue: value === void 0 || value === null ? "" : String(value)
	};
}
//#endregion
//#region node_modules/@rc-component/input/es/Input.js
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
var Input = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	const { autoComplete, onChange, onFocus, onBlur, onPressEnter, onKeyDown, onKeyUp, prefixCls = "rc-input", disabled, htmlSize, className, maxLength, suffix, showCount, count, type = "text", classes, classNames, styles, onCompositionStart, onCompositionEnd, ...rest } = props;
	const [focused, setFocused] = (0, import_react.useState)(false);
	const compositionRef = (0, import_react.useRef)(false);
	const keyLockRef = (0, import_react.useRef)(false);
	const inputRef = (0, import_react.useRef)(null);
	const holderRef = (0, import_react.useRef)(null);
	const focus = (option) => {
		if (inputRef.current) triggerFocus(inputRef.current, option);
	};
	const { setValue, formatValue } = useMergedValue(props.defaultValue, props.value);
	const countConfig = useCount(count, showCount);
	const { isOutOfRange, dataCount } = useCountDisplay({
		countConfig,
		value: formatValue,
		maxLength
	});
	const getExceedValue = useCountExceed({
		countConfig,
		getTarget: () => inputRef.current
	});
	(0, import_react.useImperativeHandle)(ref, () => ({
		focus,
		blur: () => {
			inputRef.current?.blur();
		},
		setSelectionRange: (start, end, direction) => {
			inputRef.current?.setSelectionRange(start, end, direction);
		},
		select: () => {
			inputRef.current?.select();
		},
		input: inputRef.current,
		nativeElement: holderRef.current?.nativeElement || inputRef.current
	}));
	(0, import_react.useEffect)(() => {
		if (keyLockRef.current) keyLockRef.current = false;
		setFocused((prev) => prev && disabled ? false : prev);
	}, [disabled]);
	const triggerChange = (e, currentValue, info) => {
		const cutValue = getExceedValue(currentValue, compositionRef.current);
		if (info.source === "compositionEnd" && currentValue === cutValue) return;
		setValue(cutValue);
		if (inputRef.current) resolveOnChange(inputRef.current, e, onChange, cutValue);
	};
	const onInternalChange = (e) => {
		triggerChange(e, e.target.value, { source: "change" });
	};
	const onInternalCompositionEnd = (e) => {
		compositionRef.current = false;
		triggerChange(e, e.currentTarget.value, { source: "compositionEnd" });
		onCompositionEnd?.(e);
	};
	const handleKeyDown = (e) => {
		if (onPressEnter && e.key === "Enter" && !keyLockRef.current && !e.nativeEvent.isComposing) {
			keyLockRef.current = true;
			onPressEnter(e);
		}
		onKeyDown?.(e);
	};
	const handleKeyUp = (e) => {
		if (e.key === "Enter") keyLockRef.current = false;
		onKeyUp?.(e);
	};
	const handleFocus = (e) => {
		setFocused(true);
		onFocus?.(e);
	};
	const handleBlur = (e) => {
		if (keyLockRef.current) keyLockRef.current = false;
		setFocused(false);
		onBlur?.(e);
	};
	const handleReset = (e) => {
		setValue("");
		focus();
		if (inputRef.current) resolveOnChange(inputRef.current, e, onChange);
	};
	const outOfRangeCls = isOutOfRange && `${prefixCls}-out-of-range`;
	const getInputElement = () => {
		const otherProps = omit(props, [
			"prefixCls",
			"onPressEnter",
			"addonBefore",
			"addonAfter",
			"prefix",
			"suffix",
			"allowClear",
			"defaultValue",
			"showCount",
			"count",
			"classes",
			"htmlSize",
			"styles",
			"classNames",
			"onClear"
		]);
		return /*#__PURE__*/ import_react.createElement("input", _extends$2({ autoComplete }, otherProps, {
			onChange: onInternalChange,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onKeyDown: handleKeyDown,
			onKeyUp: handleKeyUp,
			className: clsx(prefixCls, { [`${prefixCls}-disabled`]: disabled }, classNames?.input),
			style: styles?.input,
			ref: inputRef,
			size: htmlSize,
			type,
			onCompositionStart: (e) => {
				compositionRef.current = true;
				onCompositionStart?.(e);
			},
			onCompositionEnd: onInternalCompositionEnd
		}));
	};
	const getSuffix = () => {
		if (suffix || countConfig.show) return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, countConfig.show && /*#__PURE__*/ import_react.createElement("span", {
			className: clsx(`${prefixCls}-show-count-suffix`, { [`${prefixCls}-show-count-has-suffix`]: !!suffix }, classNames?.count),
			style: { ...styles?.count }
		}, dataCount), suffix);
		return null;
	};
	return /*#__PURE__*/ import_react.createElement(BaseInput, _extends$2({}, rest, {
		prefixCls,
		className: clsx(className, outOfRangeCls),
		handleReset,
		value: formatValue,
		focused,
		triggerFocus: focus,
		suffix: getSuffix(),
		disabled,
		classes,
		classNames,
		styles,
		ref: holderRef
	}), getInputElement());
});
//#endregion
//#region node_modules/@rc-component/input/es/calculateNodeHeight.js
/**
* calculateNodeHeight(uiTextNode, useCache = false)
*/
var HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`;
var SIZING_STYLE = [
	"letter-spacing",
	"line-height",
	"padding-top",
	"padding-bottom",
	"font-family",
	"font-weight",
	"font-size",
	"font-variant",
	"text-rendering",
	"text-transform",
	"width",
	"text-indent",
	"padding-left",
	"padding-right",
	"border-width",
	"box-sizing",
	"word-break",
	"white-space"
];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node, useCache = false) {
	const nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
	if (useCache && computedStyleCache[nodeRef]) return computedStyleCache[nodeRef];
	const style = window.getComputedStyle(node);
	const boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
	const paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
	const borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
	const nodeInfo = {
		sizingStyle: SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";"),
		paddingSize,
		borderSize,
		boxSizing
	};
	if (useCache && nodeRef) computedStyleCache[nodeRef] = nodeInfo;
	return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode, useCache = false, minRows = null, maxRows = null) {
	if (!hiddenTextarea) {
		hiddenTextarea = document.createElement("textarea");
		hiddenTextarea.setAttribute("tab-index", "-1");
		hiddenTextarea.setAttribute("aria-hidden", "true");
		hiddenTextarea.setAttribute("name", "hiddenTextarea");
		document.body.appendChild(hiddenTextarea);
	}
	if (uiTextNode.getAttribute("wrap")) hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
	else hiddenTextarea.removeAttribute("wrap");
	const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateNodeStyling(uiTextNode, useCache);
	hiddenTextarea.setAttribute("style", `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
	hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
	let minHeight;
	let maxHeight;
	let overflowY;
	let height = hiddenTextarea.scrollHeight;
	if (boxSizing === "border-box") height += borderSize;
	else if (boxSizing === "content-box") height -= paddingSize;
	if (minRows !== null || maxRows !== null) {
		hiddenTextarea.value = " ";
		const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
		if (minRows !== null) {
			minHeight = singleRowHeight * minRows;
			if (boxSizing === "border-box") minHeight = minHeight + paddingSize + borderSize;
			height = Math.max(minHeight, height);
		}
		if (maxRows !== null) {
			maxHeight = singleRowHeight * maxRows;
			if (boxSizing === "border-box") maxHeight = maxHeight + paddingSize + borderSize;
			overflowY = height > maxHeight ? void 0 : "hidden";
			height = Math.min(maxHeight, height);
		}
	}
	const style = {
		height,
		overflowY,
		resize: "none"
	};
	if (minHeight) style.minHeight = minHeight;
	if (maxHeight) style.maxHeight = maxHeight;
	return style;
}
//#endregion
//#region node_modules/@rc-component/input/es/ResizableTextArea.js
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
var RESIZE_START = 0;
var RESIZE_MEASURING = 1;
var RESIZE_STABLE = 2;
var ResizableTextArea = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls, defaultValue, value, autoSize, onResize, className, style, disabled, onChange, onInternalAutoSize, ...restProps } = props;
	const [internalValue, setMergedValue] = useControlledState(defaultValue, value);
	const mergedValue = internalValue ?? "";
	const onInternalChange = (event) => {
		setMergedValue(event.target.value);
		onChange?.(event);
	};
	const textareaRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({ textArea: textareaRef.current }));
	const [minRows, maxRows] = import_react.useMemo(() => {
		if (autoSize && typeof autoSize === "object") return [autoSize.minRows, autoSize.maxRows];
		return [];
	}, [autoSize]);
	const needAutoSize = !!autoSize;
	const [resizeState, setResizeState] = import_react.useState(RESIZE_STABLE);
	const [autoSizeStyle, setAutoSizeStyle] = import_react.useState();
	const startResize = () => {
		setResizeState(RESIZE_START);
	};
	useLayoutEffect(() => {
		if (needAutoSize) startResize();
	}, [
		value,
		minRows,
		maxRows,
		needAutoSize
	]);
	useLayoutEffect(() => {
		if (resizeState === RESIZE_START) setResizeState(RESIZE_MEASURING);
		else if (resizeState === RESIZE_MEASURING) {
			const textareaStyles = calculateAutoSizeStyle(textareaRef.current, false, minRows, maxRows);
			setResizeState(RESIZE_STABLE);
			setAutoSizeStyle(textareaStyles);
		}
	}, [resizeState]);
	const resizeRafRef = import_react.useRef(void 0);
	const cleanRaf = () => {
		if (resizeRafRef.current !== void 0) wrapperRaf.cancel(resizeRafRef.current);
	};
	const onInternalResize = (size) => {
		if (resizeState === RESIZE_STABLE) {
			onResize?.(size);
			if (autoSize) {
				cleanRaf();
				resizeRafRef.current = wrapperRaf(() => {
					startResize();
				});
			}
		}
	};
	import_react.useEffect(() => cleanRaf, []);
	const mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
	const mergedStyle = {
		...style,
		...mergedAutoSizeStyle
	};
	if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
		mergedStyle.overflowY = "hidden";
		mergedStyle.overflowX = "hidden";
	}
	return /*#__PURE__*/ import_react.createElement(RefResizeObserver, {
		onResize: onInternalResize,
		disabled: !(autoSize || onResize)
	}, /*#__PURE__*/ import_react.createElement("textarea", _extends$1({}, restProps, {
		ref: textareaRef,
		style: mergedStyle,
		className: clsx(prefixCls, className, { [`${prefixCls}-disabled`]: disabled }),
		disabled,
		value: mergedValue,
		onChange: onInternalChange
	})));
});
//#endregion
//#region node_modules/@rc-component/input/es/TextArea.js
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
var TextArea = /*#__PURE__*/ import_react.forwardRef(({ defaultValue, value: customValue, onFocus, onBlur, onChange, allowClear, maxLength, onCompositionStart, onCompositionEnd, suffix, prefixCls = "rc-textarea", showCount, count, className, style, disabled, hidden, classNames, styles, onResize, onClear, onPressEnter, readOnly, autoSize, onKeyDown, ...rest }, ref) => {
	const [focused, setFocused] = import_react.useState(false);
	const compositionRef = import_react.useRef(false);
	const [textareaResized, setTextareaResized] = import_react.useState(null);
	const holderRef = (0, import_react.useRef)(null);
	const resizableTextAreaRef = (0, import_react.useRef)(null);
	const getTextArea = () => resizableTextAreaRef.current?.textArea || null;
	const { setValue, formatValue } = useMergedValue(defaultValue, customValue);
	const countConfig = useCount(count, showCount);
	const { isOutOfRange, dataCount } = useCountDisplay({
		countConfig,
		value: formatValue,
		maxLength
	});
	const getExceedValue = useCountExceed({
		countConfig,
		getTarget: () => resizableTextAreaRef.current?.textArea || null
	});
	const focus = () => {
		getTextArea()?.focus();
	};
	(0, import_react.useImperativeHandle)(ref, () => ({
		resizableTextArea: resizableTextAreaRef.current,
		focus,
		blur: () => {
			getTextArea()?.blur();
		},
		nativeElement: holderRef.current?.nativeElement || getTextArea()
	}));
	(0, import_react.useEffect)(() => {
		setFocused((prev) => !disabled && prev);
	}, [disabled]);
	const triggerChange = (e, currentValue) => {
		const cutValue = getExceedValue(currentValue, compositionRef.current);
		setValue(cutValue);
		resolveOnChange(e.currentTarget, e, onChange, cutValue);
	};
	const onInternalCompositionStart = (e) => {
		compositionRef.current = true;
		onCompositionStart?.(e);
	};
	const onInternalCompositionEnd = (e) => {
		compositionRef.current = false;
		triggerChange(e, e.currentTarget.value);
		onCompositionEnd?.(e);
	};
	const onInternalChange = (e) => {
		triggerChange(e, e.target.value);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && onPressEnter && !e.nativeEvent.isComposing) onPressEnter(e);
		onKeyDown?.(e);
	};
	const handleFocus = (e) => {
		setFocused(true);
		onFocus?.(e);
	};
	const handleBlur = (e) => {
		setFocused(false);
		onBlur?.(e);
	};
	const handleReset = (e) => {
		setValue("");
		focus();
		const textarea = getTextArea();
		if (textarea) resolveOnChange(textarea, e, onChange);
	};
	let suffixNode = suffix;
	if (countConfig.show) suffixNode = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, suffixNode, /*#__PURE__*/ import_react.createElement("span", {
		className: clsx(`${prefixCls}-data-count`, classNames?.count),
		style: styles?.count
	}, dataCount));
	const handleResize = (size) => {
		onResize?.(size);
		if (getTextArea()?.style.height) setTextareaResized(true);
	};
	const isPureTextArea = !autoSize && !showCount && !allowClear;
	return /*#__PURE__*/ import_react.createElement(BaseInput, {
		ref: holderRef,
		value: formatValue,
		allowClear,
		handleReset,
		suffix: suffixNode,
		prefixCls,
		classNames: {
			...classNames,
			affixWrapper: clsx(classNames?.affixWrapper, {
				[`${prefixCls}-show-count`]: showCount,
				[`${prefixCls}-textarea-allow-clear`]: allowClear
			})
		},
		disabled,
		focused,
		className: clsx(className, isOutOfRange && `${prefixCls}-out-of-range`),
		style: {
			...style,
			...textareaResized && !isPureTextArea ? { height: "auto" } : {}
		},
		dataAttrs: typeof dataCount === "string" ? { affixWrapper: { "data-count": dataCount } } : void 0,
		styles,
		hidden,
		readOnly,
		onClear
	}, /*#__PURE__*/ import_react.createElement(ResizableTextArea, _extends({}, rest, {
		autoSize,
		maxLength,
		onKeyDown: handleKeyDown,
		onChange: onInternalChange,
		onFocus: handleFocus,
		onBlur: handleBlur,
		onCompositionStart: onInternalCompositionStart,
		onCompositionEnd: onInternalCompositionEnd,
		className: clsx(classNames?.textarea),
		style: {
			resize: style?.resize,
			...styles?.textarea
		},
		disabled,
		prefixCls,
		onResize: handleResize,
		ref: resizableTextAreaRef,
		readOnly
	})));
});
//#endregion
//#region node_modules/@rc-component/input/es/index.js
var es_default = Input;
//#endregion
export { useResizeObserver as i, TextArea as n, RefResizeObserver as r, es_default as t };
