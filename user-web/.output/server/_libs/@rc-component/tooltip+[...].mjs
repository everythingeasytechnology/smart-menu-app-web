import { r as __toESM } from "../../_runtime.mjs";
import { C as getNodeRef, E as useComposeRef, F as require_react_dom, N as useLayoutEffect, O as useId_default, P as useEvent, S as composeRef, b as getDOM, g as getShadowRoot, j as useControlledState, x as isDOM, y as isVisible_default } from "../@ant-design/cssinjs-utils+[...].mjs";
import { g as require_react } from "../@ant-design/cssinjs+[...].mjs";
import { i as useResizeObserver, r as RefResizeObserver } from "./input+[...].mjs";
import { C as clsx } from "../@ant-design/icons+[...].mjs";
import { i as es_default$2, r as es_default$3 } from "./dialog+[...].mjs";
//#region node_modules/@rc-component/trigger/es/Popup/Arrow.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function Arrow(props) {
	const { prefixCls, align, arrow, arrowPos } = props;
	const { className, content, style } = arrow || {};
	const { x = 0, y = 0 } = arrowPos;
	const arrowRef = import_react.useRef(null);
	if (!align || !align.points) return null;
	const alignStyle = { position: "absolute" };
	if (align.autoArrow !== false) {
		const popupPoints = align.points[0];
		const targetPoints = align.points[1];
		const popupTB = popupPoints[0];
		const popupLR = popupPoints[1];
		const targetTB = targetPoints[0];
		const targetLR = targetPoints[1];
		if (popupTB === targetTB || !["t", "b"].includes(popupTB)) alignStyle.top = y;
		else if (popupTB === "t") alignStyle.top = 0;
		else alignStyle.bottom = 0;
		if (popupLR === targetLR || !["l", "r"].includes(popupLR)) alignStyle.left = x;
		else if (popupLR === "l") alignStyle.left = 0;
		else alignStyle.right = 0;
	}
	return /*#__PURE__*/ import_react.createElement("div", {
		ref: arrowRef,
		className: clsx(`${prefixCls}-arrow`, className),
		style: {
			...alignStyle,
			...style
		}
	}, content);
}
//#endregion
//#region node_modules/@rc-component/trigger/es/Popup/Mask.js
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
function Mask(props) {
	const { prefixCls, open, zIndex, mask, motion, mobile } = props;
	if (!mask) return null;
	return /*#__PURE__*/ import_react.createElement(es_default$2, _extends$3({}, motion, {
		motionAppear: true,
		visible: open,
		removeOnLeave: true
	}), ({ className }) => /*#__PURE__*/ import_react.createElement("div", {
		style: { zIndex },
		className: clsx(`${prefixCls}-mask`, mobile && `${prefixCls}-mobile-mask`, className)
	}));
}
//#endregion
//#region node_modules/@rc-component/trigger/es/Popup/PopupContent.js
var PopupContent = /*#__PURE__*/ import_react.memo(({ children }) => children, (_, next) => next.cache);
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useOffsetStyle.js
function useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY) {
	const AUTO = "auto";
	const offsetStyle = isMobile ? {} : {
		left: "-1000vw",
		top: "-1000vh",
		right: AUTO,
		bottom: AUTO
	};
	if (!isMobile && (ready || !open)) {
		const { points } = align;
		const dynamicInset = align.dynamicInset || align._experimental?.dynamicInset;
		const alignRight = dynamicInset && points[0][1] === "r";
		const alignBottom = dynamicInset && points[0][0] === "b";
		if (alignRight) {
			offsetStyle.right = offsetR;
			offsetStyle.left = AUTO;
		} else {
			offsetStyle.left = offsetX;
			offsetStyle.right = AUTO;
		}
		if (alignBottom) {
			offsetStyle.bottom = offsetB;
			offsetStyle.top = AUTO;
		} else {
			offsetStyle.top = offsetY;
			offsetStyle.bottom = AUTO;
		}
	}
	return offsetStyle;
}
//#endregion
//#region node_modules/@rc-component/trigger/es/Popup/index.js
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
var Popup$1 = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { onEsc, popup, className, prefixCls, style, target, onVisibleChanged, open, keepDom, fresh, onClick, mask, arrow, arrowPos, align, motion, maskMotion, mobile, forceRender, getPopupContainer, autoDestroy, portal: Portal, children, zIndex, onMouseEnter, onMouseLeave, onPointerEnter, onPointerDownCapture, ready, offsetX, offsetY, offsetR, offsetB, onAlign, onPrepare, onResize, stretch, targetWidth, targetHeight } = props;
	const popupContent = typeof popup === "function" ? popup() : popup;
	const isNodeVisible = open || keepDom;
	const isMobile = !!mobile;
	const [mergedMask, mergedMaskMotion, mergedPopupMotion] = import_react.useMemo(() => {
		if (mobile) return [
			mobile.mask,
			mobile.maskMotion,
			mobile.motion
		];
		return [
			mask,
			maskMotion,
			motion
		];
	}, [
		mobile,
		mask,
		maskMotion,
		motion
	]);
	const getPopupContainerNeedParams = getPopupContainer?.length > 0;
	const [show, setShow] = import_react.useState(!getPopupContainer || !getPopupContainerNeedParams);
	useLayoutEffect(() => {
		if (!show && getPopupContainerNeedParams && target) setShow(true);
	}, [
		show,
		getPopupContainerNeedParams,
		target
	]);
	const onInternalResize = useEvent((size, ele) => {
		onResize?.(size, ele);
		onAlign();
	});
	const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
	if (!show) return null;
	const miscStyle = {};
	if (stretch) {
		if (stretch.includes("height") && targetHeight) miscStyle.height = targetHeight;
		else if (stretch.includes("minHeight") && targetHeight) miscStyle.minHeight = targetHeight;
		if (stretch.includes("width") && targetWidth) miscStyle.width = targetWidth;
		else if (stretch.includes("minWidth") && targetWidth) miscStyle.minWidth = targetWidth;
	}
	if (!open) miscStyle.pointerEvents = "none";
	return /*#__PURE__*/ import_react.createElement(Portal, {
		open: forceRender || isNodeVisible,
		getContainer: getPopupContainer && (() => getPopupContainer(target)),
		autoDestroy,
		onEsc
	}, /*#__PURE__*/ import_react.createElement(Mask, {
		prefixCls,
		open,
		zIndex,
		mask: mergedMask,
		motion: mergedMaskMotion,
		mobile: isMobile
	}), /*#__PURE__*/ import_react.createElement(RefResizeObserver, {
		onResize: onInternalResize,
		disabled: !open
	}, (resizeObserverRef) => {
		return /*#__PURE__*/ import_react.createElement(es_default$2, _extends$2({
			motionAppear: true,
			motionEnter: true,
			motionLeave: true,
			removeOnLeave: false,
			forceRender,
			leavedClassName: `${prefixCls}-hidden`
		}, mergedPopupMotion, {
			onAppearPrepare: onPrepare,
			onEnterPrepare: onPrepare,
			visible: open,
			onVisibleChanged: (nextVisible) => {
				motion?.onVisibleChanged?.(nextVisible);
				onVisibleChanged(nextVisible);
			}
		}), ({ className: motionClassName, style: motionStyle }, motionRef) => {
			const cls = clsx(prefixCls, motionClassName, className, { [`${prefixCls}-mobile`]: isMobile });
			return /*#__PURE__*/ import_react.createElement("div", {
				ref: composeRef(resizeObserverRef, ref, motionRef),
				className: cls,
				style: {
					"--arrow-x": `${arrowPos.x || 0}px`,
					"--arrow-y": `${arrowPos.y || 0}px`,
					...offsetStyle,
					...miscStyle,
					...motionStyle,
					boxSizing: "border-box",
					zIndex,
					...style
				},
				onMouseEnter,
				onMouseLeave,
				onPointerEnter,
				onClick,
				onPointerDownCapture
			}, arrow && /*#__PURE__*/ import_react.createElement(Arrow, {
				prefixCls,
				arrow,
				arrowPos,
				align
			}), /*#__PURE__*/ import_react.createElement(PopupContent, { cache: !open && !fresh }, popupContent));
		});
	}), children);
});
//#endregion
//#region node_modules/@rc-component/trigger/es/context.js
var TriggerContext = /*#__PURE__*/ import_react.createContext(null);
var UniqueContext = /*#__PURE__*/ import_react.createContext(null);
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useAction.js
function toArray(val) {
	return val ? Array.isArray(val) ? val : [val] : [];
}
function useAction(action, showAction, hideAction) {
	return import_react.useMemo(() => {
		const mergedShowAction = toArray(showAction ?? action);
		const mergedHideAction = toArray(hideAction ?? action);
		const showActionSet = new Set(mergedShowAction);
		const hideActionSet = new Set(mergedHideAction);
		if (showActionSet.has("hover") && !showActionSet.has("click")) showActionSet.add("touch");
		if (hideActionSet.has("hover") && !hideActionSet.has("click")) hideActionSet.add("touch");
		return [showActionSet, hideActionSet];
	}, [
		action,
		showAction,
		hideAction
	]);
}
//#endregion
//#region node_modules/@rc-component/trigger/es/util.js
function isPointsEq(a1 = [], a2 = [], isAlignPoint) {
	const getVal = (a, index) => a[index] || "";
	if (isAlignPoint) return getVal(a1, 0) === getVal(a2, 0);
	return getVal(a1, 0) === getVal(a2, 0) && getVal(a1, 1) === getVal(a2, 1);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
	const { points } = align;
	const placements = Object.keys(builtinPlacements);
	for (let i = 0; i < placements.length; i += 1) {
		const placement = placements[i];
		if (isPointsEq(builtinPlacements[placement]?.points, points, isAlignPoint)) return `${prefixCls}-placement-${placement}`;
	}
	return "";
}
function getWin(ele) {
	return ele.ownerDocument.defaultView;
}
/**
* Get all the scrollable parent elements of the element
* @param ele       The element to be detected
* @param areaOnly  Only return the parent which will cut visible area
*/
function collectScroller(ele) {
	const scrollerList = [];
	let current = ele?.parentElement;
	const scrollStyle = [
		"hidden",
		"scroll",
		"clip",
		"auto"
	];
	while (current) {
		const { overflowX, overflowY, overflow } = getWin(current).getComputedStyle(current);
		if ([
			overflowX,
			overflowY,
			overflow
		].some((o) => scrollStyle.includes(o))) scrollerList.push(current);
		current = current.parentElement;
	}
	return scrollerList;
}
function toNum(num, defaultValue = 1) {
	return Number.isNaN(num) ? defaultValue : num;
}
function getPxValue(val) {
	return toNum(parseFloat(val), 0);
}
/**
*
*
*  **************************************
*  *              Border                *
*  *     **************************     *
*  *     *                  *     *     *
*  *  B  *                  *  S  *  B  *
*  *  o  *                  *  c  *  o  *
*  *  r  *      Content     *  r  *  r  *
*  *  d  *                  *  o  *  d  *
*  *  e  *                  *  l  *  e  *
*  *  r  ********************  l  *  r  *
*  *     *        Scroll          *     *
*  *     **************************     *
*  *              Border                *
*  **************************************
*
*/
/**
* Get visible area of element
*/
function getVisibleArea(initArea, scrollerList) {
	const visibleArea = { ...initArea };
	(scrollerList || []).forEach((ele) => {
		if (ele instanceof HTMLBodyElement || ele instanceof HTMLHtmlElement) return;
		const { overflow, overflowClipMargin, borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth } = getWin(ele).getComputedStyle(ele);
		const eleRect = ele.getBoundingClientRect();
		const { offsetHeight: eleOutHeight, clientHeight: eleInnerHeight, offsetWidth: eleOutWidth, clientWidth: eleInnerWidth } = ele;
		const borderTopNum = getPxValue(borderTopWidth);
		const borderBottomNum = getPxValue(borderBottomWidth);
		const borderLeftNum = getPxValue(borderLeftWidth);
		const borderRightNum = getPxValue(borderRightWidth);
		const scaleX = toNum(Math.round(eleRect.width / eleOutWidth * 1e3) / 1e3);
		const scaleY = toNum(Math.round(eleRect.height / eleOutHeight * 1e3) / 1e3);
		const eleScrollWidth = (eleOutWidth - eleInnerWidth - borderLeftNum - borderRightNum) * scaleX;
		const eleScrollHeight = (eleOutHeight - eleInnerHeight - borderTopNum - borderBottomNum) * scaleY;
		const scaledBorderTopWidth = borderTopNum * scaleY;
		const scaledBorderBottomWidth = borderBottomNum * scaleY;
		const scaledBorderLeftWidth = borderLeftNum * scaleX;
		const scaledBorderRightWidth = borderRightNum * scaleX;
		let clipMarginWidth = 0;
		let clipMarginHeight = 0;
		if (overflow === "clip") {
			const clipNum = getPxValue(overflowClipMargin);
			clipMarginWidth = clipNum * scaleX;
			clipMarginHeight = clipNum * scaleY;
		}
		const eleLeft = eleRect.x + scaledBorderLeftWidth - clipMarginWidth;
		const eleTop = eleRect.y + scaledBorderTopWidth - clipMarginHeight;
		const eleRight = eleLeft + eleRect.width + 2 * clipMarginWidth - scaledBorderLeftWidth - scaledBorderRightWidth - eleScrollWidth;
		const eleBottom = eleTop + eleRect.height + 2 * clipMarginHeight - scaledBorderTopWidth - scaledBorderBottomWidth - eleScrollHeight;
		visibleArea.left = Math.max(visibleArea.left, eleLeft);
		visibleArea.top = Math.max(visibleArea.top, eleTop);
		visibleArea.right = Math.min(visibleArea.right, eleRight);
		visibleArea.bottom = Math.min(visibleArea.bottom, eleBottom);
	});
	return visibleArea;
}
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useAlign.js
function getUnitOffset(size, offset = 0) {
	const offsetStr = `${offset}`;
	const cells = offsetStr.match(/^(.*)\%$/);
	if (cells) return size * (parseFloat(cells[1]) / 100);
	return parseFloat(offsetStr);
}
function getNumberOffset(rect, offset) {
	const [offsetX, offsetY] = offset || [];
	return [getUnitOffset(rect.width, offsetX), getUnitOffset(rect.height, offsetY)];
}
function splitPoints(points = "") {
	return [points[0], points[1]];
}
function getAlignPoint(rect, points) {
	const topBottom = points[0];
	const leftRight = points[1];
	let x;
	let y;
	if (topBottom === "t") y = rect.y;
	else if (topBottom === "b") y = rect.y + rect.height;
	else y = rect.y + rect.height / 2;
	if (leftRight === "l") x = rect.x;
	else if (leftRight === "r") x = rect.x + rect.width;
	else x = rect.x + rect.width / 2;
	return {
		x,
		y
	};
}
function reversePoints(points, index) {
	const reverseMap = {
		t: "b",
		b: "t",
		l: "r",
		r: "l"
	};
	const clone = [...points];
	clone[index] = reverseMap[points[index]] || "c";
	return clone;
}
function flatPoints(points) {
	return points.join("");
}
function useAlign(open, popupEle, target, placement, builtinPlacements, popupAlign, onPopupAlign, mobile) {
	const [offsetInfo, setOffsetInfo] = import_react.useState({
		ready: false,
		offsetX: 0,
		offsetY: 0,
		offsetR: 0,
		offsetB: 0,
		arrowX: 0,
		arrowY: 0,
		scaleX: 1,
		scaleY: 1,
		align: builtinPlacements[placement] || {}
	});
	const alignCountRef = import_react.useRef(0);
	const scrollerList = import_react.useMemo(() => {
		if (!popupEle || mobile) return [];
		return collectScroller(popupEle);
	}, [popupEle]);
	const prevFlipRef = import_react.useRef({});
	const resetFlipCache = () => {
		prevFlipRef.current = {};
	};
	if (!open) resetFlipCache();
	const onAlign = useEvent(() => {
		if (popupEle && target && open && !mobile) {
			const popupElement = popupEle;
			const doc = popupElement.ownerDocument;
			const win = getWin(popupElement);
			const { position: popupPosition } = win.getComputedStyle(popupElement);
			const originLeft = popupElement.style.left;
			const originTop = popupElement.style.top;
			const originRight = popupElement.style.right;
			const originBottom = popupElement.style.bottom;
			const originOverflow = popupElement.style.overflow;
			const originOverflowX = popupElement.style.overflowX;
			const originOverflowY = popupElement.style.overflowY;
			const placementInfo = {
				...builtinPlacements[placement],
				...popupAlign
			};
			const placeholderElement = doc.createElement("div");
			popupElement.parentElement?.appendChild(placeholderElement);
			placeholderElement.style.left = `${popupElement.offsetLeft}px`;
			placeholderElement.style.top = `${popupElement.offsetTop}px`;
			placeholderElement.style.position = popupPosition;
			placeholderElement.style.height = `${popupElement.offsetHeight}px`;
			placeholderElement.style.width = `${popupElement.offsetWidth}px`;
			popupElement.style.left = "0";
			popupElement.style.top = "0";
			popupElement.style.right = "auto";
			popupElement.style.bottom = "auto";
			popupElement.style.overflow = "hidden";
			let targetRect;
			if (Array.isArray(target)) targetRect = {
				x: target[0],
				y: target[1],
				width: 0,
				height: 0
			};
			else {
				const rect = target.getBoundingClientRect();
				rect.x = rect.x ?? rect.left;
				rect.y = rect.y ?? rect.top;
				targetRect = {
					x: rect.x,
					y: rect.y,
					width: rect.width,
					height: rect.height
				};
			}
			const popupRect = popupElement.getBoundingClientRect();
			const { height, width } = win.getComputedStyle(popupElement);
			popupRect.x = popupRect.x ?? popupRect.left;
			popupRect.y = popupRect.y ?? popupRect.top;
			const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft } = doc.documentElement;
			const popupHeight = popupRect.height;
			const popupWidth = popupRect.width;
			const targetHeight = targetRect.height;
			const targetWidth = targetRect.width;
			const visibleRegion = {
				left: 0,
				top: 0,
				right: clientWidth,
				bottom: clientHeight
			};
			const scrollRegion = {
				left: -scrollLeft,
				top: -scrollTop,
				right: scrollWidth - scrollLeft,
				bottom: scrollHeight - scrollTop
			};
			let { htmlRegion } = placementInfo;
			const VISIBLE = "visible";
			const VISIBLE_FIRST = "visibleFirst";
			if (htmlRegion !== "scroll" && htmlRegion !== VISIBLE_FIRST) htmlRegion = VISIBLE;
			const isVisibleFirst = htmlRegion === VISIBLE_FIRST;
			const scrollRegionArea = getVisibleArea(scrollRegion, scrollerList);
			const visibleRegionArea = getVisibleArea(visibleRegion, scrollerList);
			const visibleArea = htmlRegion === VISIBLE ? visibleRegionArea : scrollRegionArea;
			const adjustCheckVisibleArea = isVisibleFirst ? visibleRegionArea : visibleArea;
			popupElement.style.left = "auto";
			popupElement.style.top = "auto";
			popupElement.style.right = "0";
			popupElement.style.bottom = "0";
			const popupMirrorRect = popupElement.getBoundingClientRect();
			popupElement.style.left = originLeft;
			popupElement.style.top = originTop;
			popupElement.style.right = originRight;
			popupElement.style.bottom = originBottom;
			popupElement.style.overflow = originOverflow;
			popupElement.style.overflowX = originOverflowX;
			popupElement.style.overflowY = originOverflowY;
			popupElement.parentElement?.removeChild(placeholderElement);
			const scaleX = toNum(Math.round(popupWidth / parseFloat(width) * 1e3) / 1e3);
			const scaleY = toNum(Math.round(popupHeight / parseFloat(height) * 1e3) / 1e3);
			if (scaleX === 0 || scaleY === 0 || isDOM(target) && !isVisible_default(target)) return;
			const { offset, targetOffset } = placementInfo;
			let [popupOffsetX, popupOffsetY] = getNumberOffset(popupRect, offset);
			const [targetOffsetX, targetOffsetY] = getNumberOffset(targetRect, targetOffset);
			targetRect.x -= targetOffsetX;
			targetRect.y -= targetOffsetY;
			const [popupPoint, targetPoint] = placementInfo.points || [];
			const targetPoints = splitPoints(targetPoint);
			const popupPoints = splitPoints(popupPoint);
			const targetAlignPoint = getAlignPoint(targetRect, targetPoints);
			const popupAlignPoint = getAlignPoint(popupRect, popupPoints);
			const nextAlignInfo = { ...placementInfo };
			let nextPoints = [popupPoints, targetPoints];
			let nextOffsetX = targetAlignPoint.x - popupAlignPoint.x + popupOffsetX;
			let nextOffsetY = targetAlignPoint.y - popupAlignPoint.y + popupOffsetY;
			function getIntersectionVisibleArea(offsetX, offsetY, area = visibleArea) {
				const l = popupRect.x + offsetX;
				const t = popupRect.y + offsetY;
				const r = l + popupWidth;
				const b = t + popupHeight;
				const visibleL = Math.max(l, area.left);
				const visibleT = Math.max(t, area.top);
				const visibleR = Math.min(r, area.right);
				const visibleB = Math.min(b, area.bottom);
				return Math.max(0, (visibleR - visibleL) * (visibleB - visibleT));
			}
			const originIntersectionVisibleArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY);
			const originIntersectionRecommendArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY, visibleRegionArea);
			const targetAlignPointTL = getAlignPoint(targetRect, ["t", "l"]);
			const popupAlignPointTL = getAlignPoint(popupRect, ["t", "l"]);
			const targetAlignPointBR = getAlignPoint(targetRect, ["b", "r"]);
			const popupAlignPointBR = getAlignPoint(popupRect, ["b", "r"]);
			const { adjustX, adjustY, shiftX, shiftY } = placementInfo.overflow || {};
			const supportAdjust = (val) => {
				if (typeof val === "boolean") return val;
				return val >= 0;
			};
			let nextPopupY;
			let nextPopupBottom;
			let nextPopupX;
			let nextPopupRight;
			function syncNextPopupPosition() {
				nextPopupY = popupRect.y + nextOffsetY;
				nextPopupBottom = nextPopupY + popupHeight;
				nextPopupX = popupRect.x + nextOffsetX;
				nextPopupRight = nextPopupX + popupWidth;
			}
			syncNextPopupPosition();
			const needAdjustY = supportAdjust(adjustY);
			const sameTB = popupPoints[0] === targetPoints[0];
			if (needAdjustY && popupPoints[0] === "t" && (nextPopupBottom > adjustCheckVisibleArea.bottom || prevFlipRef.current.bt)) {
				let tmpNextOffsetY = nextOffsetY;
				if (sameTB) tmpNextOffsetY -= popupHeight - targetHeight;
				else tmpNextOffsetY = targetAlignPointTL.y - popupAlignPointBR.y - popupOffsetY;
				const newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
				const newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
				if (newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.bt = true;
					nextOffsetY = tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
				} else prevFlipRef.current.bt = false;
			}
			if (needAdjustY && popupPoints[0] === "b" && (nextPopupY < adjustCheckVisibleArea.top || prevFlipRef.current.tb)) {
				let tmpNextOffsetY = nextOffsetY;
				if (sameTB) tmpNextOffsetY += popupHeight - targetHeight;
				else tmpNextOffsetY = targetAlignPointBR.y - popupAlignPointTL.y - popupOffsetY;
				const newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
				const newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
				if (newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.tb = true;
					nextOffsetY = tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
				} else prevFlipRef.current.tb = false;
			}
			const needAdjustX = supportAdjust(adjustX);
			const sameLR = popupPoints[1] === targetPoints[1];
			if (needAdjustX && popupPoints[1] === "l" && (nextPopupRight > adjustCheckVisibleArea.right || prevFlipRef.current.rl)) {
				let tmpNextOffsetX = nextOffsetX;
				if (sameLR) tmpNextOffsetX -= popupWidth - targetWidth;
				else tmpNextOffsetX = targetAlignPointTL.x - popupAlignPointBR.x - popupOffsetX;
				const newVisibleArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
				const newVisibleRecommendArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
				if (newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.rl = true;
					nextOffsetX = tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
				} else prevFlipRef.current.rl = false;
			}
			if (needAdjustX && popupPoints[1] === "r" && (nextPopupX < adjustCheckVisibleArea.left || prevFlipRef.current.lr)) {
				let tmpNextOffsetX = nextOffsetX;
				if (sameLR) tmpNextOffsetX += popupWidth - targetWidth;
				else tmpNextOffsetX = targetAlignPointBR.x - popupAlignPointTL.x - popupOffsetX;
				const newVisibleArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
				const newVisibleRecommendArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
				if (newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.lr = true;
					nextOffsetX = tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
				} else prevFlipRef.current.lr = false;
			}
			nextAlignInfo.points = [flatPoints(nextPoints[0]), flatPoints(nextPoints[1])];
			syncNextPopupPosition();
			const numShiftX = shiftX === true ? 0 : shiftX;
			if (typeof numShiftX === "number") {
				if (nextPopupX < visibleRegionArea.left) {
					nextOffsetX -= nextPopupX - visibleRegionArea.left - popupOffsetX;
					if (targetRect.x + targetWidth < visibleRegionArea.left + numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.left + targetWidth - numShiftX;
				}
				if (nextPopupRight > visibleRegionArea.right) {
					nextOffsetX -= nextPopupRight - visibleRegionArea.right - popupOffsetX;
					if (targetRect.x > visibleRegionArea.right - numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.right + numShiftX;
				}
			}
			const numShiftY = shiftY === true ? 0 : shiftY;
			if (typeof numShiftY === "number") {
				if (nextPopupY < visibleRegionArea.top) {
					nextOffsetY -= nextPopupY - visibleRegionArea.top - popupOffsetY;
					if (targetRect.y + targetHeight < visibleRegionArea.top + numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.top + targetHeight - numShiftY;
				}
				if (nextPopupBottom > visibleRegionArea.bottom) {
					nextOffsetY -= nextPopupBottom - visibleRegionArea.bottom - popupOffsetY;
					if (targetRect.y > visibleRegionArea.bottom - numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.bottom + numShiftY;
				}
			}
			const popupLeft = popupRect.x + nextOffsetX;
			const popupRight = popupLeft + popupWidth;
			const popupTop = popupRect.y + nextOffsetY;
			const popupBottom = popupTop + popupHeight;
			const targetLeft = targetRect.x;
			const targetRight = targetLeft + targetWidth;
			const targetTop = targetRect.y;
			const targetBottom = targetTop + targetHeight;
			/** Arrow X of popup offset */
			const nextArrowX = (Math.max(popupLeft, targetLeft) + Math.min(popupRight, targetRight)) / 2 - popupLeft;
			const nextArrowY = (Math.max(popupTop, targetTop) + Math.min(popupBottom, targetBottom)) / 2 - popupTop;
			onPopupAlign?.(popupEle, nextAlignInfo);
			let offsetX4Right = popupMirrorRect.right - popupRect.x - (nextOffsetX + popupRect.width);
			let offsetY4Bottom = popupMirrorRect.bottom - popupRect.y - (nextOffsetY + popupRect.height);
			if (scaleX === 1) {
				nextOffsetX = Math.floor(nextOffsetX);
				offsetX4Right = Math.floor(offsetX4Right);
			}
			if (scaleY === 1) {
				nextOffsetY = Math.floor(nextOffsetY);
				offsetY4Bottom = Math.floor(offsetY4Bottom);
			}
			const nextOffsetInfo = {
				ready: true,
				offsetX: nextOffsetX / scaleX,
				offsetY: nextOffsetY / scaleY,
				offsetR: offsetX4Right / scaleX,
				offsetB: offsetY4Bottom / scaleY,
				arrowX: nextArrowX / scaleX,
				arrowY: nextArrowY / scaleY,
				scaleX,
				scaleY,
				align: nextAlignInfo
			};
			setOffsetInfo(nextOffsetInfo);
		}
	});
	const triggerAlign = () => {
		alignCountRef.current += 1;
		const id = alignCountRef.current;
		Promise.resolve().then(() => {
			if (alignCountRef.current === id) onAlign();
		});
	};
	const resetReady = () => {
		setOffsetInfo((ori) => ({
			...ori,
			ready: false
		}));
	};
	useLayoutEffect(resetReady, [placement]);
	useLayoutEffect(() => {
		if (!open) resetReady();
	}, [open]);
	return [
		offsetInfo.ready,
		offsetInfo.offsetX,
		offsetInfo.offsetY,
		offsetInfo.offsetR,
		offsetInfo.offsetB,
		offsetInfo.arrowX,
		offsetInfo.arrowY,
		offsetInfo.scaleX,
		offsetInfo.scaleY,
		offsetInfo.align,
		triggerAlign
	];
}
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useDelay.js
function useDelay() {
	const delayRef = import_react.useRef(null);
	const clearDelay = () => {
		if (delayRef.current) {
			clearTimeout(delayRef.current);
			delayRef.current = null;
		}
	};
	const delayInvoke = (callback, delay) => {
		clearDelay();
		if (delay === 0) callback();
		else delayRef.current = setTimeout(() => {
			callback();
		}, delay * 1e3);
	};
	import_react.useEffect(() => {
		return () => {
			clearDelay();
		};
	}, []);
	return delayInvoke;
}
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useWatch.js
function useWatch(open, target, popup, onAlign, onScroll) {
	useLayoutEffect(() => {
		if (open && target && popup) {
			const targetElement = target;
			const popupElement = popup;
			const targetScrollList = collectScroller(targetElement);
			const popupScrollList = collectScroller(popupElement);
			const win = getWin(popupElement);
			const mergedList = /* @__PURE__ */ new Set([
				win,
				...targetScrollList,
				...popupScrollList
			]);
			function notifyScroll() {
				onAlign();
				onScroll();
			}
			mergedList.forEach((scroller) => {
				scroller.addEventListener("scroll", notifyScroll, { passive: true });
			});
			win.addEventListener("resize", notifyScroll, { passive: true });
			onAlign();
			return () => {
				mergedList.forEach((scroller) => {
					scroller.removeEventListener("scroll", notifyScroll);
					win.removeEventListener("resize", notifyScroll);
				});
			};
		}
	}, [
		open,
		target,
		popup
	]);
}
//#endregion
//#region node_modules/@rc-component/trigger/es/hooks/useWinClick.js
/**
* Close if click on the window.
* Return the function that click on the Popup element.
*/
function useWinClick(open, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen) {
	const openRef = import_react.useRef(open);
	openRef.current = open;
	const popupPointerDownRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (clickToHide && popupEle && (!mask || maskClosable)) {
			const onPointerDown = () => {
				popupPointerDownRef.current = false;
			};
			const onTriggerClose = (e) => {
				if (openRef.current && !inPopupOrChild(e.composedPath?.()?.[0] || e.target) && !popupPointerDownRef.current) triggerOpen(false);
			};
			const win = getWin(popupEle);
			win.addEventListener("pointerdown", onPointerDown, true);
			win.addEventListener("mousedown", onTriggerClose, true);
			win.addEventListener("contextmenu", onTriggerClose, true);
			const targetShadowRoot = getShadowRoot(targetEle);
			if (targetShadowRoot) {
				targetShadowRoot.addEventListener("mousedown", onTriggerClose, true);
				targetShadowRoot.addEventListener("contextmenu", onTriggerClose, true);
			}
			return () => {
				win.removeEventListener("pointerdown", onPointerDown, true);
				win.removeEventListener("mousedown", onTriggerClose, true);
				win.removeEventListener("contextmenu", onTriggerClose, true);
				if (targetShadowRoot) {
					targetShadowRoot.removeEventListener("mousedown", onTriggerClose, true);
					targetShadowRoot.removeEventListener("contextmenu", onTriggerClose, true);
				}
			};
		}
	}, [
		clickToHide,
		targetEle,
		popupEle,
		mask,
		maskClosable
	]);
	function onPopupPointerDown() {
		popupPointerDownRef.current = true;
	}
	return onPopupPointerDown;
}
//#endregion
//#region node_modules/@rc-component/trigger/es/UniqueProvider/useTargetState.js
/**
* Control the state of popup bind target:
* 1. When set `target`. Do show the popup.
* 2. When `target` is removed. Do hide the popup.
* 3. When `target` change to another one:
*  a. We wait motion finish of previous popup.
*  b. Then we set new target and show the popup.
* 4. During appear/enter animation, cache new options and apply after animation completes.
*/
function useTargetState() {
	const [options, setOptions] = import_react.useState(null);
	const [open, setOpen] = import_react.useState(false);
	const [isAnimating, setIsAnimating] = import_react.useState(false);
	const pendingOptionsRef = import_react.useRef(null);
	return [
		useEvent((nextOptions) => {
			if (nextOptions === false) {
				pendingOptionsRef.current = null;
				setOpen(false);
			} else if (isAnimating && open) pendingOptionsRef.current = nextOptions;
			else {
				setOpen(true);
				setOptions(nextOptions);
				pendingOptionsRef.current = null;
				if (!open) setIsAnimating(true);
			}
		}),
		open,
		options,
		useEvent((visible) => {
			if (visible) {
				setIsAnimating(false);
				if (pendingOptionsRef.current) {
					setOptions(pendingOptionsRef.current);
					pendingOptionsRef.current = null;
				}
			} else {
				setIsAnimating(false);
				pendingOptionsRef.current = null;
			}
		})
	];
}
//#endregion
//#region node_modules/@rc-component/trigger/es/UniqueProvider/UniqueContainer.js
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
var UniqueContainer = (props) => {
	const { prefixCls, isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY, arrowPos, popupSize, motion, uniqueContainerClassName, uniqueContainerStyle } = props;
	const containerCls = `${prefixCls}-unique-container`;
	const [motionVisible, setMotionVisible] = import_react.useState(false);
	const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
	const cachedOffsetStyleRef = import_react.useRef(offsetStyle);
	if (ready) cachedOffsetStyleRef.current = offsetStyle;
	const sizeStyle = {};
	if (popupSize) {
		sizeStyle.width = popupSize.width;
		sizeStyle.height = popupSize.height;
	}
	return /*#__PURE__*/ import_react.createElement(es_default$2, _extends$1({
		motionAppear: true,
		motionEnter: true,
		motionLeave: true,
		removeOnLeave: false,
		leavedClassName: `${containerCls}-hidden`
	}, motion, {
		visible: open,
		onVisibleChanged: (nextVisible) => {
			setMotionVisible(nextVisible);
		}
	}), ({ className: motionClassName, style: motionStyle }) => {
		const cls = clsx(containerCls, motionClassName, uniqueContainerClassName, { [`${containerCls}-visible`]: motionVisible });
		return /*#__PURE__*/ import_react.createElement("div", {
			className: cls,
			style: {
				"--arrow-x": `${arrowPos?.x || 0}px`,
				"--arrow-y": `${arrowPos?.y || 0}px`,
				...cachedOffsetStyleRef.current,
				...sizeStyle,
				...motionStyle,
				...uniqueContainerStyle
			}
		});
	});
};
//#endregion
//#region node_modules/@rc-component/trigger/es/UniqueProvider/index.js
var UniqueProvider = ({ children, postTriggerProps }) => {
	const [trigger, open, options, onTargetVisibleChanged] = useTargetState();
	const mergedOptions = import_react.useMemo(() => {
		if (!options || !postTriggerProps) return options;
		return postTriggerProps(options);
	}, [options, postTriggerProps]);
	const [popupEle, setPopupEle] = import_react.useState(null);
	const [popupSize, setPopupSize] = import_react.useState(null);
	const externalPopupRef = import_react.useRef(null);
	const setPopupRef = useEvent((node) => {
		externalPopupRef.current = node;
		if (isDOM(node) && popupEle !== node) setPopupEle(node);
	});
	const isOpenRef = import_react.useRef(null);
	const delayInvoke = useDelay();
	const show = useEvent((showOptions, isOpen) => {
		isOpenRef.current = isOpen;
		delayInvoke(() => {
			trigger(showOptions);
		}, showOptions.delay);
	});
	const hide = (delay) => {
		delayInvoke(() => {
			if (isOpenRef.current?.()) return;
			trigger(false);
		}, delay);
	};
	const onVisibleChanged = useEvent((visible) => {
		onTargetVisibleChanged(visible);
	});
	const [ready, offsetX, offsetY, offsetR, offsetB, arrowX, arrowY, , , alignInfo, onAlign] = useAlign(open, popupEle, mergedOptions?.target, mergedOptions?.popupPlacement, mergedOptions?.builtinPlacements || {}, mergedOptions?.popupAlign, void 0, false);
	const alignedClassName = import_react.useMemo(() => {
		if (!mergedOptions) return "";
		const baseClassName = getAlignPopupClassName(mergedOptions.builtinPlacements || {}, mergedOptions.prefixCls || "", alignInfo, false);
		return clsx(baseClassName, mergedOptions.getPopupClassNameFromAlign?.(alignInfo));
	}, [
		alignInfo,
		mergedOptions?.getPopupClassNameFromAlign,
		mergedOptions?.builtinPlacements,
		mergedOptions?.prefixCls
	]);
	const contextValue = import_react.useMemo(() => ({
		show,
		hide
	}), []);
	import_react.useEffect(() => {
		onAlign();
	}, [mergedOptions?.target]);
	const onPrepare = useEvent(() => {
		onAlign();
		return Promise.resolve();
	});
	const subPopupElements = import_react.useRef({});
	const parentContext = import_react.useContext(TriggerContext);
	const triggerContextValue = import_react.useMemo(() => ({ registerSubPopup: (id, subPopupEle) => {
		subPopupElements.current[id] = subPopupEle;
		parentContext?.registerSubPopup(id, subPopupEle);
	} }), [parentContext]);
	const prefixCls = mergedOptions?.prefixCls;
	return /*#__PURE__*/ import_react.createElement(UniqueContext.Provider, { value: contextValue }, children, mergedOptions && /*#__PURE__*/ import_react.createElement(TriggerContext.Provider, { value: triggerContextValue }, /*#__PURE__*/ import_react.createElement(Popup$1, {
		ref: setPopupRef,
		portal: es_default$3,
		onEsc: mergedOptions.onEsc,
		prefixCls,
		popup: mergedOptions.popup,
		className: clsx(mergedOptions.popupClassName, alignedClassName, `${prefixCls}-unique-controlled`),
		style: mergedOptions.popupStyle,
		target: mergedOptions.target,
		open,
		keepDom: true,
		fresh: true,
		autoDestroy: false,
		onVisibleChanged,
		ready,
		offsetX,
		offsetY,
		offsetR,
		offsetB,
		onAlign,
		onPrepare,
		onResize: (size) => setPopupSize({
			width: size.offsetWidth,
			height: size.offsetHeight
		}),
		arrowPos: {
			x: arrowX,
			y: arrowY
		},
		align: alignInfo,
		zIndex: mergedOptions.zIndex,
		mask: mergedOptions.mask,
		arrow: mergedOptions.arrow,
		motion: mergedOptions.popupMotion,
		maskMotion: mergedOptions.maskMotion,
		getPopupContainer: mergedOptions.getPopupContainer
	}, /*#__PURE__*/ import_react.createElement(UniqueContainer, {
		prefixCls,
		isMobile: false,
		ready,
		open,
		align: alignInfo,
		offsetR,
		offsetB,
		offsetX,
		offsetY,
		arrowPos: {
			x: arrowX,
			y: arrowY
		},
		popupSize,
		motion: mergedOptions.popupMotion,
		uniqueContainerClassName: clsx(mergedOptions.uniqueContainerClassName, alignedClassName),
		uniqueContainerStyle: mergedOptions.uniqueContainerStyle
	}))));
};
//#endregion
//#region node_modules/@rc-component/trigger/es/index.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function generateTrigger(PortalComponent = es_default$3) {
	return /* @__PURE__ */ import_react.forwardRef((props, ref) => {
		const { prefixCls = "rc-trigger-popup", children, action = "hover", showAction, hideAction, disabled = false, popupVisible, defaultPopupVisible, onOpenChange, afterOpenChange, onPopupVisibleChange, afterPopupVisibleChange, mouseEnterDelay, mouseLeaveDelay = .1, focusDelay, blurDelay, mask, maskClosable = true, getPopupContainer, forceRender, autoDestroy, popup, popupClassName, uniqueContainerClassName, uniqueContainerStyle, popupStyle, popupPlacement, builtinPlacements = {}, popupAlign, zIndex, stretch, getPopupClassNameFromAlign, fresh, unique, alignPoint, onPopupClick, onPopupAlign, arrow, popupMotion, maskMotion, mobile, ...restProps } = props;
		const mergedAutoDestroy = autoDestroy || false;
		const openUncontrolled = popupVisible === void 0;
		const isMobile = !!mobile;
		const subPopupElements = import_react.useRef({});
		const parentContext = import_react.useContext(TriggerContext);
		const context = import_react.useMemo(() => {
			return { registerSubPopup: (id, subPopupEle) => {
				subPopupElements.current[id] = subPopupEle;
				parentContext?.registerSubPopup(id, subPopupEle);
			} };
		}, [parentContext]);
		const uniqueContext = import_react.useContext(UniqueContext);
		const id = useId_default();
		const [popupEle, setPopupEle] = import_react.useState(null);
		const externalPopupRef = import_react.useRef(null);
		const setPopupRef = useEvent((node) => {
			externalPopupRef.current = node;
			if (isDOM(node) && popupEle !== node) setPopupEle(node);
			parentContext?.registerSubPopup(id, node);
		});
		const [targetEle, setTargetEle] = import_react.useState(null);
		const externalForwardRef = import_react.useRef(null);
		const setTargetRef = useEvent((node) => {
			const domNode = getDOM(node);
			if (isDOM(domNode) && targetEle !== domNode) {
				setTargetEle(domNode);
				externalForwardRef.current = domNode;
			}
		});
		const cloneProps = {};
		const inPopupOrChild = useEvent((ele) => {
			const childDOM = targetEle;
			return childDOM?.contains(ele) || getShadowRoot(childDOM)?.host === ele || ele === childDOM || popupEle?.contains(ele) || getShadowRoot(popupEle)?.host === ele || ele === popupEle || Object.values(subPopupElements.current).some((subPopupEle) => subPopupEle?.contains(ele) || ele === subPopupEle);
		});
		const innerArrow = arrow ? { ...arrow !== true ? arrow : {} } : null;
		const [internalOpen, setInternalOpen] = useControlledState(defaultPopupVisible || false, popupVisible);
		const rawOpen = internalOpen || false;
		const mergedOpen = rawOpen && !disabled;
		const child = import_react.useMemo(() => {
			const nextChild = typeof children === "function" ? children({ open: mergedOpen }) : children;
			return import_react.Children.only(nextChild);
		}, [children, mergedOpen]);
		const originChildProps = child?.props || {};
		const isOpen = useEvent(() => mergedOpen);
		const getUniqueOptions = useEvent((delay = 0) => ({
			popup,
			target: targetEle,
			delay,
			prefixCls,
			popupClassName,
			uniqueContainerClassName,
			uniqueContainerStyle,
			popupStyle,
			popupPlacement,
			builtinPlacements,
			popupAlign,
			zIndex,
			mask,
			maskClosable,
			popupMotion,
			maskMotion,
			arrow: innerArrow,
			getPopupContainer,
			getPopupClassNameFromAlign,
			id,
			onEsc
		}));
		useLayoutEffect(() => {
			if (uniqueContext && unique && targetEle && !openUncontrolled && !parentContext) {
				if (mergedOpen) uniqueContext.show(getUniqueOptions(mouseEnterDelay), isOpen);
				else uniqueContext.hide(mouseLeaveDelay);
			}
		}, [mergedOpen, targetEle]);
		const openRef = import_react.useRef(mergedOpen);
		openRef.current = mergedOpen;
		const internalTriggerOpen = useEvent((nextOpen) => {
			(0, import_react_dom.flushSync)(() => {
				if (rawOpen !== nextOpen) {
					setInternalOpen(nextOpen);
					onOpenChange?.(nextOpen);
					onPopupVisibleChange?.(nextOpen);
				}
			});
		});
		const delayInvoke = useDelay();
		const triggerOpen = (nextOpen, delay = 0) => {
			if (popupVisible !== void 0) {
				delayInvoke(() => {
					internalTriggerOpen(nextOpen);
				}, delay);
				return;
			}
			if (uniqueContext && unique && openUncontrolled && !parentContext) {
				if (nextOpen) uniqueContext.show(getUniqueOptions(delay), isOpen);
				else uniqueContext.hide(delay);
				return;
			}
			delayInvoke(() => {
				internalTriggerOpen(nextOpen);
			}, delay);
		};
		function onEsc({ top }) {
			if (top) triggerOpen(false);
		}
		const [inMotion, setInMotion] = import_react.useState(false);
		useLayoutEffect((firstMount) => {
			if (!firstMount || mergedOpen) setInMotion(true);
		}, [mergedOpen]);
		const [motionPrepareResolve, setMotionPrepareResolve] = import_react.useState(null);
		const [mousePos, setMousePos] = import_react.useState(null);
		const setMousePosByEvent = (event) => {
			setMousePos([event.clientX, event.clientY]);
		};
		const [ready, offsetX, offsetY, offsetR, offsetB, arrowX, arrowY, scaleX, scaleY, alignInfo, onAlign] = useAlign(mergedOpen, popupEle, alignPoint && mousePos !== null ? mousePos : targetEle, popupPlacement, builtinPlacements, popupAlign, onPopupAlign, isMobile);
		const [showActions, hideActions] = useAction(action, showAction, hideAction);
		const clickToShow = showActions.has("click");
		const clickToHide = hideActions.has("click") || hideActions.has("contextMenu");
		const triggerAlign = useEvent(() => {
			if (!inMotion) onAlign();
		});
		const onScroll = () => {
			if (openRef.current && alignPoint && clickToHide) triggerOpen(false);
		};
		useWatch(mergedOpen, targetEle, popupEle, triggerAlign, onScroll);
		useLayoutEffect(() => {
			triggerAlign();
		}, [mousePos, popupPlacement]);
		useLayoutEffect(() => {
			if (mergedOpen && !builtinPlacements?.[popupPlacement]) triggerAlign();
		}, [JSON.stringify(popupAlign)]);
		const alignedClassName = import_react.useMemo(() => {
			const baseClassName = getAlignPopupClassName(builtinPlacements, prefixCls, alignInfo, alignPoint);
			return clsx(baseClassName, getPopupClassNameFromAlign?.(alignInfo));
		}, [
			alignInfo,
			getPopupClassNameFromAlign,
			builtinPlacements,
			prefixCls,
			alignPoint
		]);
		import_react.useImperativeHandle(ref, () => ({
			nativeElement: externalForwardRef.current,
			popupElement: externalPopupRef.current,
			forceAlign: triggerAlign
		}));
		const [targetWidth, setTargetWidth] = import_react.useState(0);
		const [targetHeight, setTargetHeight] = import_react.useState(0);
		const syncTargetSize = () => {
			if (stretch && targetEle) {
				const rect = targetEle.getBoundingClientRect();
				setTargetWidth(rect.width);
				setTargetHeight(rect.height);
			}
		};
		const onTargetResize = () => {
			syncTargetSize();
			triggerAlign();
		};
		const onVisibleChanged = (visible) => {
			setInMotion(false);
			onAlign();
			afterOpenChange?.(visible);
			afterPopupVisibleChange?.(visible);
		};
		const onPrepare = () => new Promise((resolve) => {
			syncTargetSize();
			setMotionPrepareResolve(() => resolve);
		});
		useLayoutEffect(() => {
			if (motionPrepareResolve) {
				onAlign();
				motionPrepareResolve();
				setMotionPrepareResolve(null);
			}
		}, [motionPrepareResolve]);
		/**
		* Util wrapper for trigger action
		* @param eventName  Listen event name
		* @param nextOpen  Next open state after trigger
		* @param delay Delay to trigger open change
		* @param callback Callback if current event need additional action
		* @param ignoreCheck  Ignore current event if check return true
		*/
		function wrapperAction(eventName, nextOpen, delay, callback, ignoreCheck) {
			cloneProps[eventName] = (event, ...args) => {
				if (!ignoreCheck || !ignoreCheck()) {
					callback?.(event);
					triggerOpen(nextOpen, delay);
				}
				originChildProps[eventName]?.(event, ...args);
			};
		}
		const touchToShow = showActions.has("touch");
		const touchToHide = hideActions.has("touch");
		/** Used for prevent `hover` event conflict with mobile env */
		const touchedRef = import_react.useRef(false);
		if (touchToShow || touchToHide) cloneProps.onTouchStart = (...args) => {
			touchedRef.current = true;
			if (openRef.current && touchToHide) triggerOpen(false);
			else if (!openRef.current && touchToShow) triggerOpen(true);
			originChildProps.onTouchStart?.(...args);
		};
		if (clickToShow || clickToHide) cloneProps.onClick = (event, ...args) => {
			if (openRef.current && clickToHide) triggerOpen(false);
			else if (!openRef.current && clickToShow) {
				setMousePosByEvent(event);
				triggerOpen(true);
			}
			originChildProps.onClick?.(event, ...args);
			touchedRef.current = false;
		};
		const onPopupPointerDown = useWinClick(mergedOpen, clickToHide || touchToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen);
		const hoverToShow = showActions.has("hover");
		const hoverToHide = hideActions.has("hover");
		let onPopupMouseEnter;
		let onPopupMouseLeave;
		const ignoreMouseTrigger = () => {
			return touchedRef.current;
		};
		if (hoverToShow) {
			const onMouseEnterCallback = (event) => {
				setMousePosByEvent(event);
			};
			wrapperAction("onMouseEnter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
			wrapperAction("onPointerEnter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
			onPopupMouseEnter = (event) => {
				if ((mergedOpen || inMotion) && popupEle?.contains(event.target)) triggerOpen(true, mouseEnterDelay);
			};
			if (alignPoint) cloneProps.onMouseMove = (event) => {
				originChildProps.onMouseMove?.(event);
			};
		}
		if (hoverToHide) {
			wrapperAction("onMouseLeave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
			wrapperAction("onPointerLeave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
			onPopupMouseLeave = () => {
				triggerOpen(false, mouseLeaveDelay);
			};
		}
		if (showActions.has("focus")) wrapperAction("onFocus", true, focusDelay);
		if (hideActions.has("focus")) wrapperAction("onBlur", false, blurDelay);
		if (showActions.has("contextMenu")) cloneProps.onContextMenu = (event, ...args) => {
			if (openRef.current && hideActions.has("contextMenu")) triggerOpen(false);
			else {
				setMousePosByEvent(event);
				triggerOpen(true);
			}
			event.preventDefault();
			originChildProps.onContextMenu?.(event, ...args);
		};
		const rendedRef = import_react.useRef(false);
		rendedRef.current ||= forceRender || mergedOpen || inMotion;
		const mergedChildrenProps = {
			...originChildProps,
			...cloneProps
		};
		const passedProps = {};
		[
			"onContextMenu",
			"onClick",
			"onMouseDown",
			"onTouchStart",
			"onMouseEnter",
			"onMouseLeave",
			"onFocus",
			"onBlur"
		].forEach((eventName) => {
			if (restProps[eventName]) passedProps[eventName] = (...args) => {
				mergedChildrenProps[eventName]?.(...args);
				restProps[eventName](...args);
			};
		});
		const arrowPos = {
			x: arrowX,
			y: arrowY
		};
		useResizeObserver(mergedOpen, targetEle, onTargetResize);
		const mergedRef = useComposeRef(setTargetRef, getNodeRef(child));
		const triggerNode = /*#__PURE__*/ import_react.cloneElement(child, {
			...mergedChildrenProps,
			...passedProps,
			ref: mergedRef
		});
		return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, triggerNode, rendedRef.current && (!uniqueContext || !unique) && /*#__PURE__*/ import_react.createElement(TriggerContext.Provider, { value: context }, /*#__PURE__*/ import_react.createElement(Popup$1, {
			portal: PortalComponent,
			ref: setPopupRef,
			prefixCls,
			popup,
			className: clsx(popupClassName, !isMobile && alignedClassName),
			style: popupStyle,
			target: targetEle,
			onMouseEnter: onPopupMouseEnter,
			onMouseLeave: onPopupMouseLeave,
			onPointerEnter: onPopupMouseEnter,
			zIndex,
			open: mergedOpen,
			keepDom: inMotion,
			fresh,
			onClick: onPopupClick,
			onPointerDownCapture: onPopupPointerDown,
			mask,
			motion: popupMotion,
			maskMotion,
			onVisibleChanged,
			onPrepare,
			forceRender,
			autoDestroy: mergedAutoDestroy,
			getPopupContainer,
			onEsc,
			align: alignInfo,
			arrow: innerArrow,
			arrowPos,
			ready,
			offsetX,
			offsetY,
			offsetR,
			offsetB,
			onAlign: triggerAlign,
			stretch,
			targetWidth: targetWidth / scaleX,
			targetHeight: targetHeight / scaleY,
			mobile
		})));
	});
}
var es_default$1 = generateTrigger(es_default$3);
//#endregion
//#region node_modules/@rc-component/tooltip/es/Popup.js
var Popup = (props) => {
	const { children, prefixCls, id, classNames, styles, className, style } = props;
	return /*#__PURE__*/ import_react.createElement("div", {
		id,
		className: clsx(`${prefixCls}-container`, classNames?.container, className),
		style: {
			...styles?.container,
			...style
		},
		role: "tooltip"
	}, typeof children === "function" ? children() : children);
};
//#endregion
//#region node_modules/@rc-component/tooltip/es/placements.js
var autoAdjustOverflowTopBottom = {
	shiftX: 64,
	adjustY: 1
};
var autoAdjustOverflowLeftRight = {
	adjustX: 1,
	shiftY: true
};
var targetOffset = [0, 0];
var placements = {
	left: {
		points: ["cr", "cl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	},
	right: {
		points: ["cl", "cr"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	top: {
		points: ["bc", "tc"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	bottom: {
		points: ["tc", "bc"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	topLeft: {
		points: ["bl", "tl"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	leftTop: {
		points: ["tr", "tl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	},
	topRight: {
		points: ["br", "tr"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, -4],
		targetOffset
	},
	rightTop: {
		points: ["tl", "tr"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	bottomRight: {
		points: ["tr", "br"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	rightBottom: {
		points: ["bl", "br"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [4, 0],
		targetOffset
	},
	bottomLeft: {
		points: ["tl", "bl"],
		overflow: autoAdjustOverflowTopBottom,
		offset: [0, 4],
		targetOffset
	},
	leftBottom: {
		points: ["br", "bl"],
		overflow: autoAdjustOverflowLeftRight,
		offset: [-4, 0],
		targetOffset
	}
};
//#endregion
//#region node_modules/@rc-component/tooltip/es/Tooltip.js
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
//#endregion
//#region node_modules/@rc-component/tooltip/es/index.js
var es_default = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { trigger = ["hover"], mouseEnterDelay = 0, mouseLeaveDelay = .1, prefixCls = "rc-tooltip", children, onVisibleChange, afterVisibleChange, motion, placement = "right", align = {}, destroyOnHidden = false, defaultVisible, getTooltipContainer, arrowContent, overlay, id, showArrow = true, classNames, styles, ...restProps } = props;
	const mergedId = useId_default(id);
	const triggerRef = (0, import_react.useRef)(null);
	(0, import_react.useImperativeHandle)(ref, () => triggerRef.current);
	const extraProps = { ...restProps };
	if ("visible" in props) extraProps.popupVisible = props.visible;
	const mergedArrow = import_react.useMemo(() => {
		if (!showArrow) return false;
		const arrowConfig = showArrow === true ? {} : showArrow;
		return {
			...arrowConfig,
			className: clsx(arrowConfig.className, classNames?.arrow),
			style: {
				...arrowConfig.style,
				...styles?.arrow
			},
			content: arrowConfig.content ?? arrowContent
		};
	}, [
		showArrow,
		classNames?.arrow,
		styles?.arrow,
		arrowContent
	]);
	const getChildren = ({ open }) => {
		const child = import_react.Children.only(children);
		const ariaProps = { "aria-describedby": overlay && open ? mergedId : void 0 };
		return /*#__PURE__*/ import_react.cloneElement(child, ariaProps);
	};
	return /*#__PURE__*/ import_react.createElement(es_default$1, _extends({
		popupClassName: classNames?.root,
		prefixCls,
		popup: /*#__PURE__*/ import_react.createElement(Popup, {
			key: "content",
			prefixCls,
			id: mergedId,
			classNames,
			styles
		}, overlay),
		action: trigger,
		builtinPlacements: placements,
		popupPlacement: placement,
		ref: triggerRef,
		popupAlign: align,
		getPopupContainer: getTooltipContainer,
		onOpenChange: onVisibleChange,
		afterOpenChange: afterVisibleChange,
		popupMotion: motion,
		defaultPopupVisible: defaultVisible,
		autoDestroy: destroyOnHidden,
		mouseLeaveDelay,
		popupStyle: styles?.root,
		mouseEnterDelay,
		arrow: mergedArrow,
		uniqueContainerClassName: classNames?.uniqueContainer,
		uniqueContainerStyle: styles?.uniqueContainer
	}, extraProps), getChildren);
});
//#endregion
export { Popup as n, UniqueProvider as r, es_default as t };
