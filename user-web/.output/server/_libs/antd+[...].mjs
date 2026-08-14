import { r as __toESM } from "../_runtime.mjs";
import { A as wrapperRaf, C as getNodeRef, E as useComposeRef, M as useSafeState, N as useLayoutEffect, P as useEvent, S as composeRef, T as supportRef, _ as triggerFocus, a as _toConsumableArray, b as getDOM, c as merge, d as mergeProps, f as toArray$1, i as _classCallCheck, j as useControlledState, k as useDelayState, l as set, m as omit, n as merge$1, o as render, p as pickAttrs, r as _createClass, s as unmount, t as genStyleUtils, u as get, y as isVisible_default } from "./@ant-design/cssinjs-utils+[...].mjs";
import { c as StyleContext, g as require_react, h as canUseDom, i as useCacheToken, l as isEqual, m as useMemo$7, o as unit, r as useStyleRegister, s as createTheme, t as Keyframe, u as warningOnce } from "./@ant-design/cssinjs+[...].mjs";
import { n as TextArea$1, t as es_default } from "./@rc-component/input+[...].mjs";
import { C as clsx, S as IconContext, _ as RefIcon$2, b as RefIcon, c as RefIcon$6, f as RefIcon$9, g as RefIcon$5, o as RefIcon$7, s as RefIcon$8, v as RefIcon$4, x as RefIcon$3, y as RefIcon$1 } from "./@ant-design/icons+[...].mjs";
import { i as FastColor, n as presetPrimaryColors, r as generate, t as presetPalettes } from "./@ant-design/colors+[...].mjs";
import { a as CSSMotionList_default, i as es_default$1, n as Panel, o as MotionProvider, t as es_default$2 } from "./@rc-component/dialog+[...].mjs";
import { t as locale$2 } from "./rc-component__pagination.mjs";
import { t as locale$3 } from "./rc-component__picker.mjs";
import { n as Popup, r as UniqueProvider$1, t as es_default$3 } from "./@rc-component/tooltip+[...].mjs";
import { i as Notification, n as NotificationList, r as NotificationProvider, t as useNotification } from "./rc-component__notification.mjs";
import { t as Color } from "./rc-component__color-picker.mjs";
import { a as List, c as Context, i as useForm$1, n as useWatch, o as WrapperField, r as FormProvider$1, s as ListContext, t as RefForm } from "./rc-component__form.mjs";
//#region node_modules/antd/es/_util/warning.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function noop() {}
var { resetWarned: rcResetWarned } = warningOnce;
var WarningContext = /*#__PURE__*/ import_react.createContext({});
/**
* This is a hook only used in development.
* We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition.
*/
var useDevWarning = () => {
	const noopWarning = () => {};
	noopWarning.deprecated = noop;
	return noopWarning;
};
var devUseWarning = useDevWarning;
var defaultIconPrefixCls = "anticon";
var Variants = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
];
var defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `ant-${suffixCls}` : "ant";
};
var ConfigContext = /*#__PURE__*/ import_react.createContext({
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls
});
var { Consumer: ConfigConsumer } = ConfigContext;
var EMPTY_OBJECT = {};
/**
* Get ConfigProvider configured component props.
* This help to reduce bundle size for saving `?.` operator.
* Do not use as `useMemo` deps since we do not cache the object here.
*
* NOTE: not refactor this with `useMemo` since memo will cost another memory space,
* which will waste both compare calculation & memory.
*/
function useComponentConfig(propName) {
	const context = import_react.useContext(ConfigContext);
	const { getPrefixCls, direction, getPopupContainer, renderEmpty } = context;
	return {
		classNames: EMPTY_OBJECT,
		styles: EMPTY_OBJECT,
		...context[propName],
		getPrefixCls,
		direction,
		getPopupContainer,
		renderEmpty
	};
}
//#endregion
//#region node_modules/antd/es/theme/interface/presetColors.js
var PresetColors = [
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"lime",
	"gold"
];
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genFontSizes.js
function getLineHeight(fontSize) {
	return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
	const fontSizes = Array.from({ length: 10 }).map((_, index) => {
		const i = index - 1;
		const baseSize = base * Math.E ** (i / 5);
		return Math.floor((index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize)) / 2) * 2;
	});
	fontSizes[1] = base;
	return fontSizes.map((size) => ({
		size,
		lineHeight: getLineHeight(size)
	}));
}
//#endregion
//#region node_modules/antd/es/version/index.js
var version_default = "6.6.0";
//#endregion
//#region node_modules/antd/es/theme/themes/seed.js
var defaultPresetColors = {
	blue: "#1677FF",
	purple: "#722ED1",
	cyan: "#13C2C2",
	green: "#52C41A",
	magenta: "#EB2F96",
	/**
	* @deprecated Use magenta instead
	*/
	pink: "#EB2F96",
	red: "#F5222D",
	orange: "#FA8C16",
	yellow: "#FADB14",
	volcano: "#FA541C",
	geekblue: "#2F54EB",
	gold: "#FAAD14",
	lime: "#A0D911"
};
var seedToken = {
	...defaultPresetColors,
	colorPrimary: "#1677ff",
	colorSuccess: "#52c41a",
	colorWarning: "#faad14",
	colorError: "#ff4d4f",
	colorInfo: "#1677ff",
	colorLink: "",
	colorTextBase: "",
	colorBgBase: "",
	fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
	fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
	fontSize: 14,
	lineWidth: 1,
	lineType: "solid",
	motionUnit: .1,
	motionBase: 0,
	motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
	motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
	motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
	motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
	motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
	motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
	borderRadius: 6,
	sizeUnit: 4,
	sizeStep: 4,
	sizePopupArrow: 16,
	controlHeight: 32,
	zIndexBase: 0,
	zIndexPopupBase: 1e3,
	opacityImage: 1,
	wireframe: false,
	focusOutline: true,
	motion: true
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genColorMapToken.js
function genColorMapToken(seed, { generateColorPalettes, generateNeutralColorPalettes }) {
	const { colorSuccess: colorSuccessBase, colorWarning: colorWarningBase, colorError: colorErrorBase, colorInfo: colorInfoBase, colorPrimary: colorPrimaryBase, colorBgBase, colorTextBase } = seed;
	const primaryColors = generateColorPalettes(colorPrimaryBase);
	const successColors = generateColorPalettes(colorSuccessBase);
	const warningColors = generateColorPalettes(colorWarningBase);
	const errorColors = generateColorPalettes(colorErrorBase);
	const infoColors = generateColorPalettes(colorInfoBase);
	const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);
	const linkColors = generateColorPalettes(seed.colorLink || seed.colorInfo);
	const colorErrorBgFilledHover = new FastColor(errorColors[1]).mix(new FastColor(errorColors[3]), 50).toHexString();
	const presetColorTokens = {};
	PresetColors.forEach((colorKey) => {
		const colorBase = seed[colorKey];
		if (colorBase) {
			const colorPalette = generateColorPalettes(colorBase);
			presetColorTokens[`${colorKey}Hover`] = colorPalette[5];
			presetColorTokens[`${colorKey}Active`] = colorPalette[7];
		}
	});
	return {
		...neutralColors,
		colorPrimaryBg: primaryColors[1],
		colorPrimaryBgHover: primaryColors[2],
		colorPrimaryBorder: primaryColors[3],
		colorPrimaryBorderHover: primaryColors[4],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],
		colorPrimaryTextHover: primaryColors[8],
		colorPrimaryText: primaryColors[9],
		colorPrimaryTextActive: primaryColors[10],
		colorSuccessBg: successColors[1],
		colorSuccessBgHover: successColors[2],
		colorSuccessBorder: successColors[3],
		colorSuccessBorderHover: successColors[4],
		colorSuccessHover: successColors[4],
		colorSuccess: successColors[6],
		colorSuccessActive: successColors[7],
		colorSuccessTextHover: successColors[8],
		colorSuccessText: successColors[9],
		colorSuccessTextActive: successColors[10],
		colorErrorBg: errorColors[1],
		colorErrorBgHover: errorColors[2],
		colorErrorBgFilledHover,
		colorErrorBgActive: errorColors[3],
		colorErrorBorder: errorColors[3],
		colorErrorBorderHover: errorColors[4],
		colorErrorHover: errorColors[5],
		colorError: errorColors[6],
		colorErrorActive: errorColors[7],
		colorErrorTextHover: errorColors[8],
		colorErrorText: errorColors[9],
		colorErrorTextActive: errorColors[10],
		colorWarningBg: warningColors[1],
		colorWarningBgHover: warningColors[2],
		colorWarningBorder: warningColors[3],
		colorWarningBorderHover: warningColors[4],
		colorWarningHover: warningColors[4],
		colorWarning: warningColors[6],
		colorWarningActive: warningColors[7],
		colorWarningTextHover: warningColors[8],
		colorWarningText: warningColors[9],
		colorWarningTextActive: warningColors[10],
		colorInfoBg: infoColors[1],
		colorInfoBgHover: infoColors[2],
		colorInfoBorder: infoColors[3],
		colorInfoBorderHover: infoColors[4],
		colorInfoHover: infoColors[4],
		colorInfo: infoColors[6],
		colorInfoActive: infoColors[7],
		colorInfoTextHover: infoColors[8],
		colorInfoText: infoColors[9],
		colorInfoTextActive: infoColors[10],
		colorLinkHover: linkColors[4],
		colorLink: linkColors[6],
		colorLinkActive: linkColors[7],
		...presetColorTokens,
		colorBgMask: new FastColor("#000").setA(.45).toRgbString(),
		colorWhite: "#fff"
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genRadius.js
var genRadius = (radiusBase) => {
	let radiusLG = radiusBase;
	let radiusSM = radiusBase;
	let radiusXS = radiusBase;
	let radiusOuter = radiusBase;
	if (radiusBase < 6 && radiusBase >= 5) radiusLG = radiusBase + 1;
	else if (radiusBase < 16 && radiusBase >= 6) radiusLG = radiusBase + 2;
	else if (radiusBase >= 16) radiusLG = 16;
	if (radiusBase < 7 && radiusBase >= 5) radiusSM = 4;
	else if (radiusBase < 8 && radiusBase >= 7) radiusSM = 5;
	else if (radiusBase < 14 && radiusBase >= 8) radiusSM = 6;
	else if (radiusBase < 16 && radiusBase >= 14) radiusSM = 7;
	else if (radiusBase >= 16) radiusSM = 8;
	if (radiusBase < 6 && radiusBase >= 2) radiusXS = 1;
	else if (radiusBase >= 6) radiusXS = 2;
	if (radiusBase > 4 && radiusBase < 8) radiusOuter = 4;
	else if (radiusBase >= 8) radiusOuter = 6;
	return {
		borderRadius: radiusBase,
		borderRadiusXS: radiusXS,
		borderRadiusSM: radiusSM,
		borderRadiusLG: radiusLG,
		borderRadiusOuter: radiusOuter
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genCommonMapToken.js
function genCommonMapToken(token) {
	const { motionUnit, motionBase, borderRadius, lineWidth } = token;
	return {
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
		lineWidthBold: lineWidth + 1,
		...genRadius(borderRadius)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genControlHeight.js
var genControlHeight = (token) => {
	const { controlHeight } = token;
	return {
		controlHeightSM: controlHeight * .75,
		controlHeightXS: controlHeight * .5,
		controlHeightLG: controlHeight * 1.25
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genFontMapToken.js
var genFontMapToken = (fontSize) => {
	const fontSizePairs = getFontSizes(fontSize);
	const fontSizes = fontSizePairs.map((pair) => pair.size);
	const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
	const fontSizeMD = fontSizes[1];
	const fontSizeSM = fontSizes[0];
	const fontSizeLG = fontSizes[2];
	const lineHeight = lineHeights[1];
	const lineHeightSM = lineHeights[0];
	const lineHeightLG = lineHeights[2];
	return {
		fontSizeSM,
		fontSize: fontSizeMD,
		fontSizeLG,
		fontSizeXL: fontSizes[3],
		fontSizeHeading1: fontSizes[6],
		fontSizeHeading2: fontSizes[5],
		fontSizeHeading3: fontSizes[4],
		fontSizeHeading4: fontSizes[3],
		fontSizeHeading5: fontSizes[2],
		lineHeight,
		lineHeightLG,
		lineHeightSM,
		fontHeight: Math.round(lineHeight * fontSizeMD),
		fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
		fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
		lineHeightHeading1: lineHeights[6],
		lineHeightHeading2: lineHeights[5],
		lineHeightHeading3: lineHeights[4],
		lineHeightHeading4: lineHeights[3],
		lineHeightHeading5: lineHeights[2]
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/shared/genSizeMapToken.js
function genSizeMapToken(token) {
	const { sizeUnit, sizeStep } = token;
	return {
		sizeXXL: sizeUnit * (sizeStep + 8),
		sizeXL: sizeUnit * (sizeStep + 4),
		sizeLG: sizeUnit * (sizeStep + 2),
		sizeMD: sizeUnit * (sizeStep + 1),
		sizeMS: sizeUnit * sizeStep,
		size: sizeUnit * sizeStep,
		sizeSM: sizeUnit * (sizeStep - 1),
		sizeXS: sizeUnit * (sizeStep - 2),
		sizeXXS: sizeUnit * (sizeStep - 3)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/default/colorAlgorithm.js
var getAlphaColor$1 = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
var getSolidColor = (baseColor, brightness) => {
	return new FastColor(baseColor).darken(brightness).toHexString();
};
//#endregion
//#region node_modules/antd/es/theme/themes/default/colors.js
var generateColorPalettes = (baseColor) => {
	const colors = generate(baseColor);
	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[4],
		9: colors[5],
		10: colors[6]
	};
};
var generateNeutralColorPalettes = (bgBaseColor, textBaseColor, shadowColor) => {
	const colorBgBase = bgBaseColor || "#fff";
	const colorTextBase = textBaseColor || "#000";
	return {
		colorBgBase,
		colorTextBase,
		colorShadow: shadowColor || "#000",
		colorText: getAlphaColor$1(colorTextBase, .88),
		colorTextSecondary: getAlphaColor$1(colorTextBase, .65),
		colorTextTertiary: getAlphaColor$1(colorTextBase, .45),
		colorTextQuaternary: getAlphaColor$1(colorTextBase, .25),
		colorFill: getAlphaColor$1(colorTextBase, .15),
		colorFillSecondary: getAlphaColor$1(colorTextBase, .06),
		colorFillTertiary: getAlphaColor$1(colorTextBase, .04),
		colorFillQuaternary: getAlphaColor$1(colorTextBase, .02),
		colorBgSolid: getAlphaColor$1(colorTextBase, 1),
		colorBgSolidHover: getAlphaColor$1(colorTextBase, .75),
		colorBgSolidActive: getAlphaColor$1(colorTextBase, .95),
		colorBgLayout: getSolidColor(colorBgBase, 4),
		colorBgContainer: getSolidColor(colorBgBase, 0),
		colorBgElevated: getSolidColor(colorBgBase, 0),
		colorBgSpotlight: getAlphaColor$1(colorTextBase, .85),
		colorBgBlur: "transparent",
		colorBorder: getSolidColor(colorBgBase, 15),
		colorBorderDisabled: getSolidColor(colorBgBase, 15),
		colorBorderSecondary: getSolidColor(colorBgBase, 6)
	};
};
//#endregion
//#region node_modules/antd/es/theme/themes/default/index.js
function derivative(token) {
	presetPrimaryColors.pink = presetPrimaryColors.magenta;
	presetPalettes.pink = presetPalettes.magenta;
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = token[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token[colorKey]);
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i) => {
			prev[`${colorKey}-${i + 1}`] = colors[i];
			prev[`${colorKey}${i + 1}`] = colors[i];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = {
			...prev,
			...cur
		};
		return prev;
	}, {});
	return {
		...token,
		...colorPalettes,
		...genColorMapToken(token, {
			generateColorPalettes,
			generateNeutralColorPalettes
		}),
		...genFontMapToken(token.fontSize),
		...genSizeMapToken(token),
		...genControlHeight(token),
		...genCommonMapToken(token)
	};
}
//#endregion
//#region node_modules/antd/es/theme/themes/default/theme.js
var defaultTheme = createTheme(derivative);
//#endregion
//#region node_modules/antd/es/theme/context.js
var defaultConfig = {
	token: seedToken,
	override: { override: seedToken },
	hashed: true
};
var DesignTokenContext = /*#__PURE__*/ import_react.createContext(defaultConfig);
//#endregion
//#region node_modules/antd/es/theme/util/getAlphaColor.js
function isStableColor(color) {
	return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
	const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb();
	if (originAlpha < 1) return frontColor;
	const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb();
	for (let fA = .01; fA <= 1; fA += .01) {
		const r = Math.round((fR - bR * (1 - fA)) / fA);
		const g = Math.round((fG - bG * (1 - fA)) / fA);
		const b = Math.round((fB - bB * (1 - fA)) / fA);
		if (isStableColor(r) && isStableColor(g) && isStableColor(b)) return new FastColor({
			r,
			g,
			b,
			a: Math.round(fA * 100) / 100
		}).toRgbString();
	}
	/* istanbul ignore next */
	return new FastColor({
		r: fR,
		g: fG,
		b: fB,
		a: 1
	}).toRgbString();
}
//#endregion
//#region node_modules/antd/es/theme/util/alias.js
/**
* Seed (designer) > Derivative (designer) > Alias (developer).
*
* Merge seed & derivative & override token and generate alias token for developer.
*/
function formatToken(derivativeToken) {
	const { override, ...restToken } = derivativeToken;
	const overrideTokens = { ...override };
	Object.keys(seedToken).forEach((token) => {
		delete overrideTokens[token];
	});
	const mergedToken = {
		...restToken,
		...overrideTokens
	};
	const shadowBaseColor = new FastColor(mergedToken.colorShadow);
	const shadowBaseAlpha = shadowBaseColor.a;
	const getShadowColor = (alpha) => shadowBaseColor.clone().setA(shadowBaseAlpha * alpha).toRgbString();
	const screenXS = 480;
	const screenSM = 576;
	const screenMD = 768;
	const screenLG = 992;
	const screenXL = 1200;
	const screenXXL = 1600;
	const screenXXXL = 1920;
	if (mergedToken.motion === false) {
		const fastDuration = "0s";
		mergedToken.motionDurationFast = fastDuration;
		mergedToken.motionDurationMid = fastDuration;
		mergedToken.motionDurationSlow = fastDuration;
	}
	return {
		...mergedToken,
		colorFillContent: mergedToken.colorFillSecondary,
		colorFillContentHover: mergedToken.colorFill,
		colorFillAlter: mergedToken.colorFillQuaternary,
		colorBgContainerDisabled: mergedToken.colorFillTertiary,
		colorBorderBg: mergedToken.colorBgContainer,
		colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
		colorTextPlaceholder: mergedToken.colorTextQuaternary,
		colorTextDisabled: mergedToken.colorTextQuaternary,
		colorTextHeading: mergedToken.colorText,
		colorTextLabel: mergedToken.colorTextSecondary,
		colorTextDescription: mergedToken.colorTextTertiary,
		colorTextLightSolid: mergedToken.colorWhite,
		colorHighlight: mergedToken.colorError,
		colorBgTextHover: mergedToken.colorFillSecondary,
		colorBgTextActive: mergedToken.colorFill,
		colorIcon: mergedToken.colorTextTertiary,
		colorIconHover: mergedToken.colorText,
		colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
		colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
		colorErrorAffix: mergedToken.colorError,
		colorWarningAffix: mergedToken.colorWarning,
		fontSizeIcon: mergedToken.fontSizeSM,
		lineWidthFocus: mergedToken.focusOutline === false ? 0 : mergedToken.lineWidth * 3,
		lineWidth: mergedToken.lineWidth,
		controlOutlineWidth: mergedToken.lineWidth * 2,
		controlInteractiveSize: mergedToken.controlHeight / 2,
		controlItemBgHover: mergedToken.colorFillTertiary,
		controlItemBgActive: mergedToken.colorPrimaryBg,
		controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
		controlItemBgActiveDisabled: mergedToken.colorFill,
		controlTmpOutline: mergedToken.colorFillQuaternary,
		controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
		lineType: mergedToken.lineType,
		borderRadius: mergedToken.borderRadius,
		borderRadiusXS: mergedToken.borderRadiusXS,
		borderRadiusSM: mergedToken.borderRadiusSM,
		borderRadiusLG: mergedToken.borderRadiusLG,
		fontWeightStrong: 600,
		opacityLoading: .65,
		linkDecoration: "none",
		linkHoverDecoration: "none",
		linkFocusDecoration: "none",
		controlPaddingHorizontal: 12,
		controlPaddingHorizontalSM: 8,
		paddingXXS: mergedToken.sizeXXS,
		paddingXS: mergedToken.sizeXS,
		paddingSM: mergedToken.sizeSM,
		padding: mergedToken.size,
		paddingMD: mergedToken.sizeMD,
		paddingLG: mergedToken.sizeLG,
		paddingXL: mergedToken.sizeXL,
		paddingContentHorizontalLG: mergedToken.sizeLG,
		paddingContentVerticalLG: mergedToken.sizeMS,
		paddingContentHorizontal: mergedToken.sizeMS,
		paddingContentVertical: mergedToken.sizeSM,
		paddingContentHorizontalSM: mergedToken.size,
		paddingContentVerticalSM: mergedToken.sizeXS,
		marginXXS: mergedToken.sizeXXS,
		marginXS: mergedToken.sizeXS,
		marginSM: mergedToken.sizeSM,
		margin: mergedToken.size,
		marginMD: mergedToken.sizeMD,
		marginLG: mergedToken.sizeLG,
		marginXL: mergedToken.sizeXL,
		marginXXL: mergedToken.sizeXXL,
		boxShadow: `
      0 6px 16px 0 ${getShadowColor(.08)},
      0 3px 6px -4px ${getShadowColor(.12)},
      0 9px 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowSecondary: `
      0 6px 16px 0 ${getShadowColor(.08)},
      0 3px 6px -4px ${getShadowColor(.12)},
      0 9px 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowTertiary: `
      0 1px 2px 0 ${getShadowColor(.05)},
      0 1px 6px -1px ${getShadowColor(.03)},
      0 2px 4px 0 ${getShadowColor(.03)}
    `,
		screenXS,
		screenXSMin: screenXS,
		screenXSMax: 575,
		screenSM,
		screenSMMin: screenSM,
		screenSMMax: 767,
		screenMD,
		screenMDMin: screenMD,
		screenMDMax: 991,
		screenLG,
		screenLGMin: screenLG,
		screenLGMax: 1199,
		screenXL,
		screenXLMin: screenXL,
		screenXLMax: 1599,
		screenXXL,
		screenXXLMin: screenXXL,
		screenXXLMax: 1919,
		screenXXXL,
		screenXXXLMin: screenXXXL,
		boxShadowPopoverArrow: `2px 2px 5px ${getShadowColor(.05)}`,
		dropShadowPopover: `drop-shadow(0 6px 16px ${getShadowColor(.08)}) drop-shadow(0 3px 6px ${getShadowColor(.12)}) drop-shadow(0 9px 28px ${getShadowColor(.05)})`,
		boxShadowCard: `
      0 1px 2px -2px ${getShadowColor(.16)},
      0 3px 6px 0 ${getShadowColor(.12)},
      0 5px 12px 4px ${getShadowColor(.09)}
    `,
		boxShadowDrawerRight: `
      -6px 0 16px 0 ${getShadowColor(.08)},
      -3px 0 6px -4px ${getShadowColor(.12)},
      -9px 0 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowDrawerLeft: `
      6px 0 16px 0 ${getShadowColor(.08)},
      3px 0 6px -4px ${getShadowColor(.12)},
      9px 0 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowDrawerUp: `
      0 6px 16px 0 ${getShadowColor(.08)},
      0 3px 6px -4px ${getShadowColor(.12)},
      0 9px 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowDrawerDown: `
      0 -6px 16px 0 ${getShadowColor(.08)},
      0 -3px 6px -4px ${getShadowColor(.12)},
      0 -9px 28px 8px ${getShadowColor(.05)}
    `,
		boxShadowTabsOverflowLeft: `inset 10px 0 8px -8px ${getShadowColor(.08)}`,
		boxShadowTabsOverflowRight: `inset -10px 0 8px -8px ${getShadowColor(.08)}`,
		boxShadowTabsOverflowTop: `inset 0 10px 8px -8px ${getShadowColor(.08)}`,
		boxShadowTabsOverflowBottom: `inset 0 -10px 8px -8px ${getShadowColor(.08)}`,
		...overrideTokens
	};
}
//#endregion
//#region node_modules/antd/es/theme/useToken.js
var unitless = {
	lineHeight: true,
	lineHeightSM: true,
	lineHeightLG: true,
	lineHeightHeading1: true,
	lineHeightHeading2: true,
	lineHeightHeading3: true,
	lineHeightHeading4: true,
	lineHeightHeading5: true,
	opacityLoading: true,
	fontWeightStrong: true,
	zIndexPopupBase: true,
	zIndexBase: true,
	opacityImage: true
};
var ignore = {
	motionBase: true,
	motionUnit: true
};
var preserve = {
	screenXS: true,
	screenXSMin: true,
	screenXSMax: true,
	screenSM: true,
	screenSMMin: true,
	screenSMMax: true,
	screenMD: true,
	screenMDMin: true,
	screenMDMax: true,
	screenLG: true,
	screenLGMin: true,
	screenLGMax: true,
	screenXL: true,
	screenXLMin: true,
	screenXLMax: true,
	screenXXL: true,
	screenXXLMin: true,
	screenXXLMax: true,
	screenXXXL: true,
	screenXXXLMin: true
};
var getComputedToken = (originToken, overrideToken, theme) => {
	const derivativeToken = theme.getDerivativeToken(originToken);
	const { override, ...components } = overrideToken;
	let mergedDerivativeToken = {
		...derivativeToken,
		override
	};
	mergedDerivativeToken = formatToken(mergedDerivativeToken);
	if (components) Object.entries(components).forEach(([key, value]) => {
		const { theme: componentTheme, ...componentTokens } = value;
		let mergedComponentToken = componentTokens;
		if (componentTheme) mergedComponentToken = getComputedToken({
			...mergedDerivativeToken,
			...componentTokens
		}, { override: componentTokens }, componentTheme);
		mergedDerivativeToken[key] = mergedComponentToken;
	});
	return mergedDerivativeToken;
};
function useToken() {
	const { token: rootDesignToken, hashed, theme, override, cssVar: ctxCssVar, zeroRuntime } = import_react.useContext(DesignTokenContext);
	const { csp, getPrefixCls } = import_react.useContext(ConfigContext);
	const cssVar = {
		prefix: ctxCssVar?.prefix ?? getPrefixCls(),
		key: ctxCssVar?.key ?? "css-var-root"
	};
	const salt = `${version_default}-${hashed || ""}`;
	const mergedTheme = theme || defaultTheme;
	const [token, hashId, realToken] = useCacheToken(mergedTheme, [seedToken, rootDesignToken], {
		salt,
		override,
		getComputedToken,
		cssVar: {
			...cssVar,
			unitless,
			ignore,
			preserve
		},
		nonce: csp?.nonce
	});
	return [
		mergedTheme,
		realToken,
		hashed ? hashId : "",
		token,
		cssVar,
		!!zeroRuntime
	];
}
//#endregion
//#region node_modules/antd/es/style/index.js
var resetComponent = (token, needInheritFontFamily = false) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: token.colorText,
	fontSize: token.fontSize,
	lineHeight: token.lineHeight,
	listStyle: "none",
	fontFamily: needInheritFontFamily ? "inherit" : token.fontFamily
});
var resetIcon = () => ({
	display: "inline-flex",
	alignItems: "center",
	color: "inherit",
	fontStyle: "normal",
	lineHeight: 0,
	textAlign: "center",
	textTransform: "none",
	verticalAlign: "-0.125em",
	textRendering: "optimizeLegibility",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",
	"> *": { lineHeight: 1 },
	svg: {
		display: "inline-block",
		verticalAlign: "inherit"
	}
});
var loadingCircle = new Keyframe("loadingCircle", { "100%": { transform: "rotate(360deg)" } });
var clearFix = () => ({
	"&::before": {
		display: "table",
		content: "\"\""
	},
	"&::after": {
		display: "table",
		clear: "both",
		content: "\"\""
	}
});
var genFocusOutline = (token, offset) => ({
	outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
	outlineOffset: offset ?? 1,
	transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(", ")
});
var genFocusStyle = (token, offset) => ({ "&:focus-visible": genFocusOutline(token, offset) });
var genLinkStyle = (token) => ({ a: {
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${token.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: token.colorLinkHover },
	"&:active": { color: token.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: token.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: token.linkFocusDecoration,
		outline: 0
	},
	...genFocusStyle(token),
	"&[disabled]": {
		color: token.colorTextDisabled,
		cursor: "not-allowed"
	}
} });
var genCommonStyle = (token, componentPrefixCls, rootCls, resetFont) => {
	const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
	const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
	const resetStyle = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	};
	let resetFontStyle = {};
	if (resetFont !== false) resetFontStyle = {
		fontFamily: token.fontFamily,
		fontSize: token.fontSize
	};
	return { [rootPrefixSelector]: {
		...resetFontStyle,
		...resetStyle,
		[prefixSelector]: resetStyle
	} };
};
var genIconStyle = (iconPrefixCls) => ({
	[`.${iconPrefixCls}`]: {
		...resetIcon(),
		"&::before": { display: "none" },
		"&[tabindex]": { cursor: "pointer" }
	},
	[`.${iconPrefixCls} .${iconPrefixCls}-icon`]: { display: "block" },
	[`.${iconPrefixCls}-spin`]: {
		animationName: loadingCircle,
		animationDuration: "1s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear"
	}
});
//#endregion
//#region node_modules/antd/es/theme/util/genStyleUtils.js
var { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils({
	usePrefix: () => {
		const { getPrefixCls, iconPrefixCls } = (0, import_react.useContext)(ConfigContext);
		return {
			rootPrefixCls: getPrefixCls(),
			iconPrefixCls
		};
	},
	useToken: () => {
		const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useToken();
		return {
			theme,
			realToken,
			hashId,
			token,
			cssVar,
			zeroRuntime
		};
	},
	useCSP: () => {
		const { csp } = (0, import_react.useContext)(ConfigContext);
		return csp ?? {};
	},
	getResetStyles: (token, config) => {
		const linkStyle = genLinkStyle(token);
		return [
			linkStyle,
			{ "&": linkStyle },
			genIconStyle(config?.prefix.iconPrefixCls ?? "anticon")
		];
	},
	getCommonStyle: genCommonStyle,
	getCompUnitless: () => unitless
});
var genCssVar = (antCls, component) => {
	const cssPrefix = `--${antCls.replace(/\./g, "")}-${component}-`;
	const varName = (name) => {
		return `${cssPrefix}${name}`;
	};
	const varRef = (name, fallback) => {
		return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
	};
	return [varName, varRef];
};
//#endregion
//#region node_modules/antd/es/theme/util/genPresetColor.js
function genPresetColor(token, genCss) {
	return PresetColors.reduce((prev, colorKey) => {
		const lightColor = token[`${colorKey}1`];
		const lightBorderColor = token[`${colorKey}3`];
		const darkColor = token[`${colorKey}6`];
		const textColor = token[`${colorKey}7`];
		return {
			...prev,
			...genCss(colorKey, {
				lightColor,
				lightBorderColor,
				darkColor,
				textColor
			})
		};
	}, {});
}
//#endregion
//#region node_modules/antd/es/theme/util/useResetIconStyle.js
var useResetIconStyle = (iconPrefixCls, csp) => {
	const [theme, token] = useToken();
	return useStyleRegister({
		theme,
		token,
		hashId: "",
		path: ["ant-design-icons", iconPrefixCls],
		nonce: () => csp?.nonce,
		layer: { name: "antd" }
	}, () => genIconStyle(iconPrefixCls));
};
//#endregion
//#region node_modules/antd/es/_util/is.js
var isNonNullable = (val) => {
	return val !== void 0 && val !== null;
};
var isReactRenderable = (val) => {
	return isNonNullable(val) && val !== false && val !== "";
};
var isNumber = (val) => {
	return typeof val === "number" && !Number.isNaN(val);
};
var isString = (val) => {
	return typeof val === "string";
};
var isPlainObject = (val) => {
	return val !== null && typeof val === "object";
};
var isFunction = (val) => {
	return typeof val === "function";
};
var isThenable = (val) => {
	return isNonNullable(val) && isFunction(val.then);
};
var isTransitionEvent = (event) => {
	return isPlainObject(event) && "propertyName" in event && isString(event.propertyName);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useMergeSemantic/utils.js
/**
* Fill object structure by schema, initialize empty objects for keys with `_default` property.
*/
var fillObjectBySchema = (obj, schema) => {
	const newObj = { ...obj };
	Object.keys(schema).forEach((key) => {
		if (schema[key]._default) newObj[key] || (newObj[key] = {});
		else newObj[key] = fillObjectBySchema(newObj[key], schema[key]);
	});
	return newObj;
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useMergeSemantic/index.js
var mergeClassNames = (schema = {}, ...classNames) => {
	return classNames.filter((item) => Boolean(item)).reduce((acc, cur) => {
		Object.keys(cur).forEach((key) => {
			const keySchema = schema[key];
			const curVal = cur[key];
			if (keySchema) {
				if (isPlainObject(curVal)) acc[key] = mergeClassNames(keySchema, acc[key], curVal);
				else {
					const { _default: defaultField } = keySchema;
					if (defaultField) {
						acc[key] = acc[key] || {};
						acc[key][defaultField] = clsx(acc[key][defaultField], curVal);
					}
				}
			} else acc[key] = clsx(acc[key], curVal);
		});
		return acc;
	}, {});
};
var useSemanticClassNames = (schema, ...classNames) => {
	return import_react.useMemo(() => mergeClassNames.apply(void 0, [schema].concat(classNames)), [schema].concat(classNames));
};
var mergeStyles = (...styles) => {
	return styles.filter((item) => Boolean(item)).reduce((acc, cur = {}) => {
		Object.keys(cur).forEach((key) => {
			acc[key] = {
				...acc[key],
				...cur[key]
			};
		});
		return acc;
	}, {});
};
var useSemanticStyles = (...styles) => {
	return import_react.useMemo(() => mergeStyles.apply(void 0, styles), [].concat(styles));
};
var useSemanticRootStyle = (style, key = "root") => {
	return import_react.useMemo(() => style ? { [key]: style } : void 0, [style, key]);
};
var resolveStyleOrClass = (value, info) => {
	return isFunction(value) ? value(info) : value;
};
/**
* @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
* @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
*/
var useMergeSemantic = (classNamesList, stylesList, info, schema) => {
	const resolvedClassNamesList = classNamesList.map((classNames) => classNames ? resolveStyleOrClass(classNames, info) : void 0);
	const resolvedStylesList = stylesList.map((styles) => styles ? resolveStyleOrClass(styles, info) : void 0);
	const mergedClassNames = useSemanticClassNames.apply(void 0, [schema].concat(_toConsumableArray(resolvedClassNamesList)));
	const mergedStyles = useSemanticStyles.apply(void 0, _toConsumableArray(resolvedStylesList));
	return import_react.useMemo(() => {
		if (!schema) return [mergedClassNames, mergedStyles];
		return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
	}, [
		mergedClassNames,
		mergedStyles,
		schema
	]);
};
//#endregion
//#region node_modules/compute-scroll-into-view/dist/index.js
var t = (t) => "object" == typeof t && null != t && 1 === t.nodeType;
var e$1 = (t, e) => (!e || "hidden" !== t) && "visible" !== t && "clip" !== t;
var n = (t, n) => {
	if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
		const o = getComputedStyle(t, null);
		return e$1(o.overflowY, n) || e$1(o.overflowX, n) || ((t) => {
			const e = ((t) => {
				if (!t.ownerDocument || !t.ownerDocument.defaultView) return null;
				try {
					return t.ownerDocument.defaultView.frameElement;
				} catch (t) {
					return null;
				}
			})(t);
			return !!e && (e.clientHeight < t.scrollHeight || e.clientWidth < t.scrollWidth);
		})(t);
	}
	return !1;
};
var o$1 = (t, e, n, o, l, r, i, s) => r < t && i > e || r > t && i < e ? 0 : r <= t && s <= n || i >= e && s >= n ? r - t - o : i > e && s < n || r < t && s > n ? i - e + l : 0;
var l = (t) => {
	const e = t.parentElement;
	return null == e ? t.getRootNode().host || null : e;
};
var r = (e, r) => {
	var i, s, d, h;
	if ("undefined" == typeof document) return [];
	const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r, p = "function" == typeof a ? a : (t) => t !== a;
	if (!t(e)) throw new TypeError("Invalid target");
	const m = document.scrollingElement || document.documentElement, w = [];
	let W = e;
	for (; t(W) && p(W);) {
		if (W = l(W), W === m) {
			w.push(W);
			break;
		}
		null != W && W === document.body && n(W) && !n(document.documentElement) || null != W && n(W, g) && w.push(W);
	}
	const b = null != (s = null == (i = window.visualViewport) ? void 0 : i.width) ? s : innerWidth, H = null != (h = null == (d = window.visualViewport) ? void 0 : d.height) ? h : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t) => {
		const e = window.getComputedStyle(t);
		return {
			top: parseFloat(e.scrollMarginTop) || 0,
			right: parseFloat(e.scrollMarginRight) || 0,
			bottom: parseFloat(e.scrollMarginBottom) || 0,
			left: parseFloat(e.scrollMarginLeft) || 0
		};
	})(e);
	let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
	const L = [];
	for (let t = 0; t < w.length; t++) {
		const e = w[t], { height: l, width: r, top: i, right: s, bottom: d, left: h } = e.getBoundingClientRect();
		if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && (e === m && !n(e) || x >= i && I <= d && R >= h && C <= s)) return L;
		const a = getComputedStyle(e), g = parseInt(a.borderLeftWidth, 10), p = parseInt(a.borderTopWidth, 10), W = parseInt(a.borderRightWidth, 10), T = parseInt(a.borderBottomWidth, 10);
		let B = 0, F = 0;
		const V = "offsetWidth" in e ? e.offsetWidth - e.clientWidth - g - W : 0, S = "offsetHeight" in e ? e.offsetHeight - e.clientHeight - p - T : 0, X = "offsetWidth" in e ? 0 === e.offsetWidth ? 0 : r / e.offsetWidth : 0, Y = "offsetHeight" in e ? 0 === e.offsetHeight ? 0 : l / e.offsetHeight : 0;
		if (m === e) B = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? o$1(M, M + H, H, p, T, M + k, M + k + v, v) : k - H / 2, F = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : o$1(y, y + b, b, g, W, y + D, y + D + E, E), B = Math.max(0, B + M), F = Math.max(0, F + y);
		else {
			B = "start" === f ? k - i - p : "end" === f ? k - d + T + S : "nearest" === f ? o$1(i, d, l, p, T + S, k, k + v, v) : k - (i + l / 2) + S / 2, F = "start" === u ? D - h - g : "center" === u ? D - (h + r / 2) + V / 2 : "end" === u ? D - s + W + V : o$1(h, s, r, g, W + V, D, D + E, E);
			const { scrollLeft: t, scrollTop: n } = e;
			B = 0 === Y ? 0 : Math.max(0, Math.min(n + B / Y, e.scrollHeight - l / Y + S)), F = 0 === X ? 0 : Math.max(0, Math.min(t + F / X, e.scrollWidth - r / X + V)), k += n - B, D += t - F;
		}
		L.push({
			el: e,
			top: B,
			left: F
		});
	}
	return L;
};
//#endregion
//#region node_modules/scroll-into-view-if-needed/dist/index.js
var o = (t) => !1 === t ? {
	block: "end",
	inline: "nearest"
} : ((t) => t === Object(t) && 0 !== Object.keys(t).length)(t) ? t : {
	block: "start",
	inline: "nearest"
};
function e(e, r$1) {
	if (!e.isConnected || !((t) => {
		let o = t;
		for (; o && o.parentNode;) {
			if (o.parentNode === document) return !0;
			o = o.parentNode instanceof ShadowRoot ? o.parentNode.host : o.parentNode;
		}
		return !1;
	})(e)) return;
	const n = ((t) => {
		const o = window.getComputedStyle(t);
		return {
			top: parseFloat(o.scrollMarginTop) || 0,
			right: parseFloat(o.scrollMarginRight) || 0,
			bottom: parseFloat(o.scrollMarginBottom) || 0,
			left: parseFloat(o.scrollMarginLeft) || 0
		};
	})(e);
	if (((t) => "object" == typeof t && "function" == typeof t.behavior)(r$1)) return r$1.behavior(r(e, r$1));
	const l = "boolean" == typeof r$1 || null == r$1 ? void 0 : r$1.behavior;
	for (const { el: a, top: i, left: s } of r(e, o(r$1))) {
		const t = i - n.top + n.bottom, o = s - n.left + n.right;
		a.scroll({
			top: t,
			left: o,
			behavior: l
		});
	}
}
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useCSSVarCls.js
/**
* This hook is only for cssVar to add root className for components.
* If root ClassName is needed, this hook could be refactored with `-root`
* @param prefixCls
*/
var useCSSVarCls = (prefixCls) => `${prefixCls}-css-var`;
//#endregion
//#region node_modules/antd/es/form/validateMessagesContext.js
var validateMessagesContext_default = /*#__PURE__*/ (0, import_react.createContext)(void 0);
//#endregion
//#region node_modules/antd/es/time-picker/locale/en_US.js
var locale$1 = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
};
//#endregion
//#region node_modules/antd/es/date-picker/locale/en_US.js
var locale = {
	lang: {
		placeholder: "Select date",
		yearPlaceholder: "Select year",
		quarterPlaceholder: "Select quarter",
		monthPlaceholder: "Select month",
		weekPlaceholder: "Select week",
		rangePlaceholder: ["Start date", "End date"],
		rangeYearPlaceholder: ["Start year", "End year"],
		rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
		rangeMonthPlaceholder: ["Start month", "End month"],
		rangeWeekPlaceholder: ["Start week", "End week"],
		...locale$3
	},
	timePickerLocale: { ...locale$1 }
};
//#endregion
//#region node_modules/antd/es/calendar/locale/en_US.js
var en_US_default = locale;
//#endregion
//#region node_modules/antd/es/locale/en_US.js
var typeTemplate = "${label} is not a valid ${type}";
var localeValues = {
	locale: "en",
	Pagination: locale$2,
	DatePicker: locale,
	TimePicker: locale$1,
	Calendar: en_US_default,
	global: {
		placeholder: "Please select",
		close: "Close",
		sortable: "sortable",
		show: "Show",
		hide: "Hide"
	},
	Table: {
		filterTitle: "Filter menu",
		filterConfirm: "OK",
		filterReset: "Reset",
		filterEmptyText: "No filters",
		filterCheckAll: "Select all items",
		filterSearchPlaceholder: "Search in filters",
		emptyText: "No data",
		selectAll: "Select current page",
		selectInvert: "Invert current page",
		selectNone: "Clear all data",
		selectionAll: "Select all data",
		sortTitle: "Sort",
		expand: "Expand row",
		collapse: "Collapse row",
		triggerDesc: "Click to sort descending",
		triggerAsc: "Click to sort ascending",
		cancelSort: "Click to cancel sorting"
	},
	Tour: {
		Next: "Next",
		Previous: "Previous",
		Finish: "Finish"
	},
	Modal: {
		okText: "OK",
		cancelText: "Cancel",
		justOkText: "OK"
	},
	Popconfirm: {
		okText: "OK",
		cancelText: "Cancel"
	},
	Transfer: {
		titles: ["", ""],
		searchPlaceholder: "Search here",
		itemUnit: "item",
		itemsUnit: "items",
		remove: "Remove",
		selectCurrent: "Select current page",
		removeCurrent: "Remove current page",
		selectAll: "Select all data",
		deselectAll: "Deselect all data",
		removeAll: "Remove all data",
		selectInvert: "Invert current page"
	},
	Upload: {
		uploading: "Uploading...",
		removeFile: "Remove file",
		uploadError: "Upload error",
		previewFile: "Preview file",
		downloadFile: "Download file"
	},
	Empty: { description: "No data" },
	Icon: { icon: "icon" },
	Text: {
		edit: "Edit",
		copy: "Copy",
		copied: "Copied",
		expand: "Expand",
		collapse: "Collapse"
	},
	Form: {
		optional: "(optional)",
		defaultValidateMessages: {
			default: "Field validation error for ${label}",
			required: "Please enter ${label}",
			enum: "${label} must be one of [${enum}]",
			whitespace: "${label} cannot be a blank character",
			date: {
				format: "${label} date format is invalid",
				parse: "${label} cannot be converted to a date",
				invalid: "${label} is an invalid date"
			},
			types: {
				string: typeTemplate,
				method: typeTemplate,
				array: typeTemplate,
				object: typeTemplate,
				number: typeTemplate,
				date: typeTemplate,
				boolean: typeTemplate,
				integer: typeTemplate,
				float: typeTemplate,
				regexp: typeTemplate,
				email: typeTemplate,
				url: typeTemplate,
				hex: typeTemplate
			},
			string: {
				len: "${label} must be ${len} characters",
				min: "${label} must be at least ${min} characters",
				max: "${label} must be up to ${max} characters",
				range: "${label} must be between ${min}-${max} characters"
			},
			number: {
				len: "${label} must be equal to ${len}",
				min: "${label} must be minimum ${min}",
				max: "${label} must be maximum ${max}",
				range: "${label} must be between ${min}-${max}"
			},
			array: {
				len: "Must be ${len} ${label}",
				min: "At least ${min} ${label}",
				max: "At most ${max} ${label}",
				range: "The amount of ${label} must be between ${min}-${max}"
			},
			pattern: { mismatch: "${label} does not match the pattern ${pattern}" }
		}
	},
	QRCode: {
		expired: "QR code expired",
		refresh: "Refresh",
		scanned: "Scanned"
	},
	ColorPicker: {
		presetEmpty: "Empty",
		transparent: "Transparent",
		singleColor: "Single",
		gradientColor: "Gradient"
	}
};
//#endregion
//#region node_modules/antd/es/modal/locale.js
var runtimeLocale = { ...localeValues.Modal };
var localeList = [];
var generateLocale = () => localeList.reduce((merged, locale) => ({
	...merged,
	...locale
}), localeValues.Modal);
function changeConfirmLocale(newLocale) {
	if (newLocale) {
		const cloneLocale = { ...newLocale };
		localeList.push(cloneLocale);
		runtimeLocale = generateLocale();
		return () => {
			localeList = localeList.filter((locale) => locale !== cloneLocale);
			runtimeLocale = generateLocale();
		};
	}
	runtimeLocale = { ...localeValues.Modal };
}
function getConfirmLocale() {
	return runtimeLocale;
}
//#endregion
//#region node_modules/antd/es/locale/context.js
var LocaleContext = /*#__PURE__*/ (0, import_react.createContext)(void 0);
//#endregion
//#region node_modules/antd/es/locale/useLocale.js
var useLocale = (componentName, defaultLocale) => {
	const fullLocale = import_react.useContext(LocaleContext);
	return [import_react.useMemo(() => {
		const locale = defaultLocale || localeValues[componentName];
		const localeFromContext = fullLocale?.[componentName] ?? {};
		return {
			...isFunction(locale) ? locale() : locale,
			...localeFromContext || {}
		};
	}, [
		componentName,
		defaultLocale,
		fullLocale
	]), import_react.useMemo(() => {
		const localeCode = fullLocale?.locale;
		if (fullLocale?.exist && !localeCode) return localeValues.locale;
		return localeCode;
	}, [fullLocale])];
};
//#endregion
//#region node_modules/antd/es/locale/index.js
var ANT_MARK = "internalMark";
var LocaleProvider = (props) => {
	const { locale = {}, children, _ANT_MARK__ } = props;
	import_react.useEffect(() => {
		return changeConfirmLocale(locale?.Modal);
	}, [locale]);
	const getMemoizedContextValue = import_react.useMemo(() => ({
		...locale,
		exist: true
	}), [locale]);
	return /*#__PURE__*/ import_react.createElement(LocaleContext.Provider, { value: getMemoizedContextValue }, children);
};
//#endregion
//#region node_modules/antd/es/_util/reactNode.js
function isFragment(child) {
	return child && /*#__PURE__*/ import_react.isValidElement(child) && child.type === import_react.Fragment;
}
var replaceElement = (element, replacement, props) => {
	if (!/*#__PURE__*/ import_react.isValidElement(element)) return replacement;
	return /*#__PURE__*/ import_react.cloneElement(element, isFunction(props) ? props(element.props || {}) : props);
};
function cloneElement(element, props) {
	return replaceElement(element, element, props);
}
//#endregion
//#region node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var MotionContent = ({ children }) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const rootPrefixCls = getPrefixCls();
	/* istanbul ignore next */
	if (!/*#__PURE__*/ import_react.isValidElement(children)) return children;
	return /*#__PURE__*/ import_react.createElement(es_default$1, {
		visible: true,
		motionName: `${rootPrefixCls}-fade`,
		motionAppear: true,
		motionEnter: true,
		motionLeave: false,
		removeOnLeave: false
	}, ({ style: motionStyle, className: motionClassName }) => {
		return cloneElement(children, (oriProps) => ({
			className: clsx(oriProps.className, motionClassName),
			style: {
				...oriProps.style,
				...motionStyle
			}
		}));
	});
};
//#endregion
//#region node_modules/antd/es/tooltip/UniqueProvider/index.js
var cachedPlacements = [null, null];
function uniqueBuiltinPlacements(ori) {
	if (cachedPlacements[0] !== ori) {
		const target = {};
		Object.keys(ori).forEach((placement) => {
			target[placement] = {
				...ori[placement],
				dynamicInset: false
			};
		});
		cachedPlacements[0] = ori;
		cachedPlacements[1] = target;
	}
	return cachedPlacements[1];
}
var UniqueProvider = ({ children }) => {
	const renderPopup = (options) => {
		const { id, builtinPlacements, popup } = options;
		const popupEle = isFunction(popup) ? popup() : popup;
		const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements);
		return {
			...options,
			getPopupContainer: null,
			arrow: false,
			popup: /*#__PURE__*/ import_react.createElement(MotionContent, { key: id }, popupEle),
			builtinPlacements: parsedPlacements
		};
	};
	return /*#__PURE__*/ import_react.createElement(UniqueProvider$1, { postTriggerProps: renderPopup }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/DisabledContext.js
var DisabledContext = /*#__PURE__*/ import_react.createContext(false);
var DisabledContextProvider = ({ children, disabled }) => {
	const originDisabled = import_react.useContext(DisabledContext);
	return /*#__PURE__*/ import_react.createElement(DisabledContext.Provider, { value: disabled ?? originDisabled }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/SizeContext.js
var SizeContext = /*#__PURE__*/ import_react.createContext(void 0);
var SizeContextProvider = ({ children, size }) => {
	const originSize = import_react.useContext(SizeContext);
	return /*#__PURE__*/ import_react.createElement(SizeContext.Provider, { value: size || originSize }, children);
};
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useConfig.js
function useConfig() {
	return {
		componentDisabled: (0, import_react.useContext)(DisabledContext),
		componentSize: (0, import_react.useContext)(SizeContext)
	};
}
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useTheme.js
function useTheme(theme, parentTheme, config) {
	devUseWarning("ConfigProvider");
	const themeConfig = theme || {};
	const parentThemeConfig = themeConfig.inherit === false || !parentTheme ? {
		...defaultConfig,
		hashed: parentTheme?.hashed ?? defaultConfig.hashed,
		cssVar: parentTheme?.cssVar
	} : parentTheme;
	const themeKey = (0, import_react.useId)();
	return useMemo$7(() => {
		if (!theme) return parentTheme;
		const mergedComponents = { ...parentThemeConfig.components };
		Object.keys(theme.components || {}).forEach((componentName) => {
			mergedComponents[componentName] = {
				...mergedComponents[componentName],
				...theme.components[componentName]
			};
		});
		const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
		const mergedCssVar = {
			prefix: config?.prefixCls,
			...parentThemeConfig.cssVar,
			...themeConfig.cssVar,
			key: themeConfig.cssVar?.key || cssVarKey
		};
		return {
			...parentThemeConfig,
			...themeConfig,
			token: {
				...parentThemeConfig.token,
				...themeConfig.token
			},
			components: mergedComponents,
			cssVar: mergedCssVar
		};
	}, [
		themeConfig,
		parentThemeConfig,
		config?.prefixCls,
		themeKey
	], (prev, next) => prev.some((prevTheme, index) => {
		const nextTheme = next[index];
		return !isEqual(prevTheme, nextTheme, true);
	}));
}
//#endregion
//#region node_modules/antd/es/config-provider/MotionWrapper.js
var MotionCacheContext = /*#__PURE__*/ import_react.createContext(true);
function MotionWrapper(props) {
	const parentMotion = import_react.useContext(MotionCacheContext);
	const { children } = props;
	const [, token] = useToken();
	const { motion } = token;
	const needWrapMotionProviderRef = import_react.useRef(false);
	needWrapMotionProviderRef.current || (needWrapMotionProviderRef.current = parentMotion !== motion);
	if (needWrapMotionProviderRef.current) return /*#__PURE__*/ import_react.createElement(MotionCacheContext.Provider, { value: motion }, /*#__PURE__*/ import_react.createElement(MotionProvider, { motion }, children));
	return children;
}
//#endregion
//#region node_modules/antd/es/config-provider/PropWarning.js
var PropWarning_default = () => null;
//#endregion
//#region node_modules/antd/es/config-provider/index.js
/**
* This component registers icon styles inside the DesignTokenContext.Provider
* so that CSS variables use the correct cssVar key from the theme config.
*/
var IconStyle = ({ iconPrefixCls, csp }) => {
	useResetIconStyle(iconPrefixCls, csp);
	return null;
};
var PASSED_PROPS = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
];
var globalPrefixCls;
var globalIconPrefixCls;
var globalTheme;
var globalHolderRender;
function getGlobalPrefixCls() {
	return globalPrefixCls || "ant";
}
function getGlobalIconPrefixCls() {
	return globalIconPrefixCls || "anticon";
}
var setGlobalConfig = (props) => {
	const { prefixCls, iconPrefixCls, theme, holderRender } = props;
	if (prefixCls !== void 0) globalPrefixCls = prefixCls;
	if (iconPrefixCls !== void 0) globalIconPrefixCls = iconPrefixCls;
	if ("holderRender" in props) globalHolderRender = holderRender;
	if (theme) globalTheme = theme;
};
var globalConfig = () => ({
	getPrefixCls: (suffixCls, customizePrefixCls) => {
		if (customizePrefixCls) return customizePrefixCls;
		return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
	},
	getIconPrefixCls: getGlobalIconPrefixCls,
	getRootPrefixCls: () => {
		if (globalPrefixCls) return globalPrefixCls;
		return getGlobalPrefixCls();
	},
	getTheme: () => globalTheme,
	holderRender: globalHolderRender
});
var ProviderChildren = (props) => {
	const { children, csp: customCsp, autoInsertSpaceInButton, alert, affix, anchor, app, form, locale: rawLocale, componentSize, direction, space, splitter, virtual, dropdownMatchSelectWidth, popupMatchSelectWidth, popupOverflow, legacyLocale, parentContext, iconPrefixCls: customIconPrefixCls, theme, componentDisabled, segmented, statistic, spin, calendar, carousel, cascader, collapse, typography, checkbox, descriptions, divider, drawer, skeleton, steps, image, layout, list, listy, mentions, modal, progress, result, slider, breadcrumb, masonry, menu, pagination, input, inputPassword, inputSearch, textArea, otp, empty, badge, borderBeam, radio, rate, ribbon, switch: SWITCH, transfer, avatar, message, tag, table, card, cardMeta, tabs, timeline, timePicker, upload, notification, tree, colorPicker, datePicker, rangePicker, flex, wave, dropdown, warning: warningConfig, tour, tooltip, popover, popconfirm, qrcode, floatButton, floatButtonGroup, variant, inputNumber, treeSelect, watermark } = props;
	const locale = import_react.useMemo(() => {
		if (isPlainObject(rawLocale) && Object.prototype.hasOwnProperty.call(rawLocale, "default") && rawLocale.default?.locale) return rawLocale.default;
		return rawLocale;
	}, [rawLocale]);
	const getPrefixCls = import_react.useCallback((suffixCls, customizePrefixCls) => {
		const { prefixCls } = props;
		if (customizePrefixCls) return customizePrefixCls;
		const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
		return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
	}, [parentContext.getPrefixCls, props.prefixCls]);
	const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || "anticon";
	const csp = customCsp || parentContext.csp;
	const mergedTheme = useTheme(theme, parentContext.theme, { prefixCls: getPrefixCls("") });
	const baseConfig = {
		csp,
		autoInsertSpaceInButton,
		alert,
		affix,
		anchor,
		app,
		locale: locale || legacyLocale,
		direction,
		space,
		splitter,
		virtual,
		popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
		popupOverflow,
		getPrefixCls,
		iconPrefixCls,
		theme: mergedTheme,
		segmented,
		statistic,
		spin,
		calendar,
		carousel,
		cascader,
		collapse,
		typography,
		checkbox,
		descriptions,
		divider,
		drawer,
		skeleton,
		steps,
		image,
		input,
		inputPassword,
		inputSearch,
		textArea,
		otp,
		layout,
		list,
		listy,
		mentions,
		modal,
		progress,
		result,
		slider,
		breadcrumb,
		masonry,
		menu,
		pagination,
		empty,
		badge,
		borderBeam,
		radio,
		rate,
		ribbon,
		switch: SWITCH,
		transfer,
		avatar,
		message,
		tag,
		table,
		card,
		cardMeta,
		tabs,
		timeline,
		timePicker,
		upload,
		notification,
		tree,
		colorPicker,
		datePicker,
		rangePicker,
		flex,
		wave,
		dropdown,
		warning: warningConfig,
		tour,
		tooltip,
		popover,
		popconfirm,
		qrcode,
		floatButton,
		floatButtonGroup,
		variant,
		inputNumber,
		treeSelect,
		watermark
	};
	const config = { ...parentContext };
	Object.keys(baseConfig).forEach((key) => {
		if (baseConfig[key] !== void 0) config[key] = baseConfig[key];
	});
	PASSED_PROPS.forEach((propName) => {
		const propValue = props[propName];
		if (propValue) config[propName] = propValue;
	});
	if (typeof autoInsertSpaceInButton !== "undefined") config.button = {
		autoInsertSpace: autoInsertSpaceInButton,
		...config.button
	};
	const memoedConfig = useMemo$7(() => config, config, (prevConfig, currentConfig) => {
		const prevKeys = Object.keys(prevConfig);
		const currentKeys = Object.keys(currentConfig);
		return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
	});
	const { layer } = import_react.useContext(StyleContext);
	const memoIconContextValue = import_react.useMemo(() => ({
		prefixCls: iconPrefixCls,
		csp,
		layer: layer ? "antd" : void 0,
		zeroRuntime: !!layer || mergedTheme?.zeroRuntime
	}), [
		iconPrefixCls,
		csp,
		layer,
		mergedTheme?.zeroRuntime
	]);
	let childNode = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(IconStyle, {
		iconPrefixCls,
		csp
	}), /*#__PURE__*/ import_react.createElement(PropWarning_default, { dropdownMatchSelectWidth }), children);
	const validateMessages = import_react.useMemo(() => merge(localeValues.Form?.defaultValidateMessages || {}, memoedConfig.locale?.Form?.defaultValidateMessages || {}, memoedConfig.form?.validateMessages || {}, form?.validateMessages || {}), [memoedConfig, form?.validateMessages]);
	if (Object.keys(validateMessages).length > 0) childNode = /*#__PURE__*/ import_react.createElement(validateMessagesContext_default.Provider, { value: validateMessages }, childNode);
	if (locale) childNode = /*#__PURE__*/ import_react.createElement(LocaleProvider, {
		locale,
		_ANT_MARK__: ANT_MARK
	}, childNode);
	if (iconPrefixCls || csp) childNode = /*#__PURE__*/ import_react.createElement(IconContext.Provider, { value: memoIconContextValue }, childNode);
	if (componentSize) childNode = /*#__PURE__*/ import_react.createElement(SizeContextProvider, { size: componentSize }, childNode);
	childNode = /*#__PURE__*/ import_react.createElement(MotionWrapper, null, childNode);
	if (tooltip?.unique) childNode = /*#__PURE__*/ import_react.createElement(UniqueProvider, null, childNode);
	const memoTheme = import_react.useMemo(() => {
		const { algorithm, token, components, cssVar, ...rest } = mergedTheme || {};
		const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : defaultTheme;
		const parsedComponents = {};
		Object.entries(components || {}).forEach(([componentName, componentToken]) => {
			const parsedToken = { ...componentToken };
			if ("algorithm" in parsedToken) {
				if (parsedToken.algorithm === true) parsedToken.theme = themeObj;
				else if (Array.isArray(parsedToken.algorithm) || isFunction(parsedToken.algorithm)) parsedToken.theme = createTheme(parsedToken.algorithm);
				delete parsedToken.algorithm;
			}
			parsedComponents[componentName] = parsedToken;
		});
		const mergedToken = {
			...seedToken,
			...token
		};
		return {
			...rest,
			theme: themeObj,
			token: mergedToken,
			components: parsedComponents,
			override: {
				override: mergedToken,
				...parsedComponents
			},
			cssVar
		};
	}, [mergedTheme]);
	if (theme) childNode = /*#__PURE__*/ import_react.createElement(DesignTokenContext.Provider, { value: memoTheme }, childNode);
	if (memoedConfig.warning) childNode = /*#__PURE__*/ import_react.createElement(WarningContext.Provider, { value: memoedConfig.warning }, childNode);
	if (componentDisabled !== void 0) childNode = /*#__PURE__*/ import_react.createElement(DisabledContextProvider, { disabled: componentDisabled }, childNode);
	return /*#__PURE__*/ import_react.createElement(ConfigContext.Provider, { value: memoedConfig }, childNode);
};
var ConfigProvider = (props) => {
	const context = import_react.useContext(ConfigContext);
	const antLocale = import_react.useContext(LocaleContext);
	return /*#__PURE__*/ import_react.createElement(ProviderChildren, {
		parentContext: context,
		legacyLocale: antLocale,
		...props
	});
};
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;
Object.defineProperty(ConfigProvider, "SizeContext", { get: () => {
	return SizeContext;
} });
//#endregion
//#region node_modules/antd/es/notification/hooks/useStackConfig.js
var useStackConfig = (stackConfig, defaultStackConfig) => import_react.useMemo(() => {
	const mergedStackConfig = stackConfig ?? defaultStackConfig;
	if (!mergedStackConfig) return false;
	return {
		...isPlainObject(defaultStackConfig) ? defaultStackConfig : {},
		...isPlainObject(mergedStackConfig) ? mergedStackConfig : {}
	};
}, [stackConfig, defaultStackConfig]);
//#endregion
//#region node_modules/antd/es/notification/util.js
function getPlacementOffsetStyle(top, bottom) {
	return {
		...isNonNullable(top) && { "--notification-top": unit(top) },
		...isNonNullable(bottom) && { "--notification-bottom": unit(bottom) }
	};
}
//#endregion
//#region node_modules/antd/es/_util/fallbackProp.js
/**
* Search for the first non-undefined value in the arguments and return it.
*
* ```js
* const mergedIcon = fallbackProp(propIcon, contextIcon, defaultIcon);
* ```
*
* Note: it is different from `??` operator which skips null
*/
function fallbackProp(...args) {
	return args.find((arg) => arg !== void 0);
}
//#endregion
//#region node_modules/antd/es/_util/hooks/useAllowClear.js
var useAllowClear = (options) => {
	const { allowClear, clearIcon, contextAllowClear, contextClearIcon, defaultAllowClear, componentName } = options;
	return (0, import_react.useMemo)(() => {
		if (!(allowClear ?? contextAllowClear ?? defaultAllowClear)) return false;
		return {
			clearIcon: fallbackProp(isPlainObject(allowClear) ? allowClear?.clearIcon : clearIcon, isPlainObject(contextAllowClear) ? contextAllowClear?.clearIcon : contextClearIcon, /*#__PURE__*/ import_react.createElement(RefIcon, null)),
			disabled: (isPlainObject(allowClear) ? allowClear?.disabled : void 0) ?? (isPlainObject(contextAllowClear) ? contextAllowClear?.disabled : void 0)
		};
	}, [
		allowClear,
		clearIcon,
		contextAllowClear,
		contextClearIcon,
		defaultAllowClear
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useClosable.js
var pickClosable = (context) => {
	if (!context) return;
	const { closable, closeIcon } = context;
	return {
		closable,
		closeIcon
	};
};
var EmptyFallbackCloseCollection = {};
var computeClosableConfig = (closable, closeIcon) => {
	if (!closable && (closable === false || closeIcon === false || closeIcon === null)) return false;
	if (!isNonNullable(closable) && !isNonNullable(closeIcon)) return null;
	let closableConfig = { closeIcon: typeof closeIcon !== "boolean" && isNonNullable(closeIcon) ? closeIcon : void 0 };
	if (isPlainObject(closable)) closableConfig = {
		...closableConfig,
		...closable
	};
	return closableConfig;
};
var mergeClosableConfigs = (propConfig, contextConfig, fallbackConfig) => {
	if (propConfig === false) return false;
	if (propConfig) return mergeProps(fallbackConfig, contextConfig, propConfig);
	if (contextConfig === false) return false;
	if (contextConfig) return mergeProps(fallbackConfig, contextConfig);
	return fallbackConfig.closable ? fallbackConfig : false;
};
var computeCloseIcon = (mergedConfig, fallbackCloseCollection, closeLabel) => {
	const { closeIconRender } = fallbackCloseCollection;
	const { closeIcon, ...restConfig } = mergedConfig;
	let finalCloseIcon = closeIcon;
	const ariaOrDataProps = pickAttrs(restConfig, true);
	if (isNonNullable(finalCloseIcon)) {
		if (closeIconRender) finalCloseIcon = closeIconRender(finalCloseIcon);
		finalCloseIcon = /*#__PURE__*/ import_react.isValidElement(finalCloseIcon) ? /*#__PURE__*/ import_react.cloneElement(finalCloseIcon, {
			"aria-label": closeLabel,
			...finalCloseIcon.props,
			...ariaOrDataProps
		}) : /*#__PURE__*/ import_react.createElement("span", {
			"aria-label": closeLabel,
			...ariaOrDataProps
		}, finalCloseIcon);
	}
	return [finalCloseIcon, ariaOrDataProps];
};
var computeClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection, closeLabel = "Close") => {
	const propConfig = computeClosableConfig(propCloseCollection?.closable, propCloseCollection?.closeIcon);
	const contextConfig = computeClosableConfig(contextCloseCollection?.closable, contextCloseCollection?.closeIcon);
	const mergedFallback = {
		closeIcon: /*#__PURE__*/ import_react.createElement(RefIcon$1, null),
		...fallbackCloseCollection
	};
	const mergedConfig = mergeClosableConfigs(propConfig, contextConfig, mergedFallback);
	const closeBtnIsDisabled = typeof mergedConfig !== "boolean" ? !!mergedConfig?.disabled : false;
	if (mergedConfig === false) return [
		false,
		null,
		closeBtnIsDisabled,
		{}
	];
	const [closeIcon, ariaProps] = computeCloseIcon(mergedConfig, mergedFallback, closeLabel);
	return [
		true,
		closeIcon,
		closeBtnIsDisabled,
		ariaProps
	];
};
var useClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection) => {
	const [contextLocale] = useLocale("global", localeValues.global);
	return import_react.useMemo(() => {
		return computeClosable(propCloseCollection, contextCloseCollection, {
			closeIcon: /*#__PURE__*/ import_react.createElement(RefIcon$1, null),
			...fallbackCloseCollection
		}, contextLocale.close);
	}, [
		propCloseCollection,
		contextCloseCollection,
		fallbackCloseCollection,
		contextLocale.close
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useForceUpdate.js
var useForceUpdate = () => {
	return import_react.useReducer((ori) => ori + 1, 0);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useMergedMask.js
var normalizeMaskConfig = (mask, maskClosable) => {
	let maskConfig = {};
	if (isPlainObject(mask)) maskConfig = mask;
	if (typeof mask === "boolean") maskConfig = { enabled: mask };
	if (maskConfig.closable === void 0 && maskClosable !== void 0) maskConfig.closable = maskClosable;
	return maskConfig;
};
var useMergedMask = (mask, contextMask, prefixCls, maskClosable) => {
	return (0, import_react.useMemo)(() => {
		const maskConfig = normalizeMaskConfig(mask, maskClosable);
		const contextMaskConfig = normalizeMaskConfig(contextMask);
		const mergedConfig = {
			blur: false,
			...contextMaskConfig,
			...maskConfig,
			closable: maskConfig.closable ?? maskClosable ?? contextMaskConfig.closable ?? true
		};
		const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : void 0;
		return [
			mergedConfig.enabled !== false,
			{ mask: className },
			!!mergedConfig.closable
		];
	}, [
		mask,
		contextMask,
		prefixCls,
		maskClosable
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/useOrientation.js
var isValidOrientation = (orientation) => {
	return orientation === "horizontal" || orientation === "vertical";
};
var useOrientation = (orientation, vertical, legacyDirection) => {
	return (0, import_react.useMemo)(() => {
		const validOrientation = isValidOrientation(orientation);
		let mergedOrientation;
		if (validOrientation) mergedOrientation = orientation;
		else if (typeof vertical === "boolean") mergedOrientation = vertical ? "vertical" : "horizontal";
		else mergedOrientation = isValidOrientation(legacyDirection) ? legacyDirection : "horizontal";
		return [mergedOrientation, mergedOrientation === "vertical"];
	}, [
		legacyDirection,
		orientation,
		vertical
	]);
};
//#endregion
//#region node_modules/antd/es/_util/hooks/usePatchElement.js
var usePatchElement = () => {
	const [elements, setElements] = import_react.useState([]);
	return [elements, import_react.useCallback((element) => {
		setElements((originElements) => [].concat(_toConsumableArray(originElements), [element]));
		return () => {
			setElements((originElements) => originElements.filter((ele) => ele !== element));
		};
	}, [])];
};
//#endregion
//#region node_modules/antd/es/_util/zindexContext.js
var ZIndexContext = /*#__PURE__*/ import_react.createContext(void 0);
//#endregion
//#region node_modules/antd/es/_util/hooks/useZIndex.js
var CONTAINER_OFFSET = 100;
var CONTAINER_MAX_OFFSET = 1e3;
var containerBaseZIndexOffset = {
	Modal: CONTAINER_OFFSET,
	Drawer: CONTAINER_OFFSET,
	Popover: CONTAINER_OFFSET,
	Popconfirm: CONTAINER_OFFSET,
	Tooltip: CONTAINER_OFFSET,
	Tour: CONTAINER_OFFSET,
	FloatButton: CONTAINER_OFFSET
};
var consumerBaseZIndexOffset = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
};
var isContainerType = (type) => {
	return type in containerBaseZIndexOffset;
};
var useZIndex = (componentType, customZIndex) => {
	const [, token] = useToken();
	const parentZIndex = import_react.useContext(ZIndexContext);
	const isContainer = isContainerType(componentType);
	let result;
	if (customZIndex !== void 0) result = [customZIndex, customZIndex];
	else {
		let zIndex = parentZIndex ?? 0;
		if (isContainer) zIndex += (parentZIndex ? 0 : token.zIndexPopupBase) + containerBaseZIndexOffset[componentType];
		else zIndex += consumerBaseZIndexOffset[componentType];
		result = [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
	}
	return result;
};
//#endregion
//#region node_modules/antd/es/notification/style/notification.js
/** Generate motion transitions shared by notification-like notice cards. */
var genNotificationItemMotionStyle = (token) => {
	const { motionDurationMid, motionEaseInOut } = token;
	const transition = `${motionDurationMid} ${motionEaseInOut}`;
	return {
		transform: "scale(var(--notification-scale, 1))",
		transition: [
			"transform",
			"inset",
			"clip-path",
			"opacity"
		].map((property) => `${property} ${transition}`).join(", ")
	};
};
/** Generate item styles shared by Notification and Message notice cards. */
var genListItemSharedStyle = (token, config) => {
	const { componentCls, antCls, colorSuccess, colorInfo, colorWarning, colorError, colorTextHeading, colorText, boxShadow, borderRadiusLG, fontSize, lineHeight, notificationBg, notificationPadding, notificationMarginEdge, margin, calc } = token;
	const noticeCls = `${componentCls}-notice`;
	const [varName, varRef] = genCssVar(antCls, "notification");
	return {
		[noticeCls]: {
			position: "absolute",
			width: config.width,
			maxWidth: `calc(100vw - ${unit(calc(notificationMarginEdge).mul(2).equal())})`,
			padding: notificationPadding,
			pointerEvents: "auto",
			[varName("icon-font-size")]: config.iconFontSize,
			[varName("title-font-size")]: config.titleFontSize,
			[varName("title-line-height")]: config.titleLineHeight,
			boxSizing: "border-box",
			color: colorText,
			background: notificationBg,
			borderRadius: borderRadiusLG,
			boxShadow,
			fontSize,
			lineHeight,
			wordWrap: "break-word",
			overflow: "visible",
			...genNotificationItemMotionStyle(token),
			...config.noticeStyle,
			"&::after": {
				position: "absolute",
				insetInline: 0,
				top: calc(margin).mul(-1).equal(),
				height: margin,
				content: "\"\""
			},
			...config.typeStyle && {
				"&-success": { background: varRef("color-success-bg", notificationBg) },
				"&-error": { background: varRef("color-error-bg", notificationBg) },
				"&-info": { background: varRef("color-info-bg", notificationBg) },
				"&-warning": { background: varRef("color-warning-bg", notificationBg) }
			}
		},
		[`${noticeCls}-wrapper`]: {
			display: "flex",
			...config.contentStyle
		},
		[`${noticeCls}-title`]: {
			color: colorTextHeading,
			fontSize: varRef("title-font-size"),
			lineHeight: varRef("title-line-height")
		},
		[`${noticeCls}-icon`]: {
			flex: "none",
			fontSize: varRef("icon-font-size"),
			lineHeight: 1,
			[`&${noticeCls}-icon-success`]: { color: colorSuccess },
			[`&${noticeCls}-icon-info, &${noticeCls}-icon-loading`]: { color: colorInfo },
			[`&${noticeCls}-icon-warning`]: { color: colorWarning },
			[`&${noticeCls}-icon-error`]: { color: colorError }
		}
	};
};
/** Generate the complete notice item styles for Notification. */
var genNotificationItemStyle = (token) => {
	const { componentCls, progressBg, notificationProgressHeight, fontSize, borderRadiusLG, width, notificationIconSize, colorText, motionDurationMid, fontSizeLG, lineHeightLG, marginSM, marginXS, paddingLG, notificationPaddingVertical, notificationPaddingHorizontal, notificationCloseButtonSize, colorIcon, borderRadiusSM, colorIconHover, colorBgTextHover, colorBgTextActive } = token;
	const noticeCls = `${componentCls}-notice`;
	return {
		...genListItemSharedStyle(token, {
			width,
			iconFontSize: notificationIconSize,
			titleFontSize: fontSizeLG,
			titleLineHeight: lineHeightLG,
			contentStyle: {
				alignItems: "flex-start",
				gap: marginSM
			},
			typeStyle: true
		}),
		[`${noticeCls}-section`]: {
			display: "flex",
			flexDirection: "column",
			flex: "auto",
			gap: marginXS,
			minWidth: 0
		},
		[`${noticeCls}-description`]: {
			color: colorText,
			fontSize
		},
		[`${noticeCls}-closable`]: {
			[`${noticeCls}-title, ${noticeCls}-description`]: { paddingInlineEnd: paddingLG },
			[`${noticeCls}-title + ${noticeCls}-description`]: { paddingInlineEnd: 0 }
		},
		[`${noticeCls}-close`]: {
			position: "absolute",
			top: notificationPaddingVertical,
			insetInlineEnd: notificationPaddingHorizontal,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: notificationCloseButtonSize,
			height: notificationCloseButtonSize,
			color: colorIcon,
			background: "none",
			border: "none",
			borderRadius: borderRadiusSM,
			outline: "none",
			transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
			"&:hover": {
				color: colorIconHover,
				backgroundColor: colorBgTextHover
			},
			"&:active": { backgroundColor: colorBgTextActive },
			...genFocusStyle(token)
		},
		[`${noticeCls}-progress`]: {
			position: "absolute",
			bottom: 0,
			display: "block",
			appearance: "none",
			inlineSize: `calc(100% - ${unit(borderRadiusLG)} * 2)`,
			blockSize: notificationProgressHeight,
			border: 0,
			left: {
				_skip_check_: true,
				value: borderRadiusLG
			},
			right: {
				_skip_check_: true,
				value: borderRadiusLG
			},
			"&, &::-webkit-progress-bar": {
				borderRadius: borderRadiusLG,
				backgroundColor: "rgba(0, 0, 0, 0.04)"
			},
			"&::-moz-progress-bar": { background: progressBg },
			"&::-webkit-progress-value": {
				borderRadius: borderRadiusLG,
				background: progressBg
			}
		},
		[`${noticeCls}-actions`]: {
			float: "right",
			marginTop: marginSM
		}
	};
};
/** Generate standalone PurePanel styles for Notification. */
var genPurePanelStyle = (token) => {
	const { componentCls, width } = token;
	const noticeCls = `${componentCls}-notice`;
	const actionsCls = `${noticeCls}-actions`;
	const notificationItemStyle = genNotificationItemStyle(token);
	return { [`${noticeCls}-pure-panel`]: {
		width,
		maxWidth: "100%",
		...notificationItemStyle,
		[noticeCls]: {
			...notificationItemStyle[noticeCls],
			position: "relative",
			width: "100%",
			maxWidth: "100%"
		},
		[actionsCls]: {
			...notificationItemStyle[actionsCls],
			float: "none",
			textAlign: "end"
		}
	} };
};
/** Wrap Notification item styles under the component root selector. */
var genNotificationStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: genNotificationItemStyle(token) };
};
//#endregion
//#region node_modules/antd/es/notification/interface.js
var NotificationPlacements = [
	"top",
	"topLeft",
	"topRight",
	"bottom",
	"bottomLeft",
	"bottomRight"
];
//#endregion
//#region node_modules/antd/es/notification/style/placement.js
var notificationMarginEdgeVar = "--notification-margin-edge";
/** Resolve the opposite block and inline edges for a placement. */
var getPlacementOffset = (vertical, horizontal) => ({
	blockEnd: vertical === "top" ? "bottom" : "top",
	inlineEnd: horizontal === "left" ? "right" : "left"
});
/** Convert placement offsets into the transform used by notice motion. */
var getMotionTransform = (motionOffset) => {
	return `translate3d(${motionOffset?.x ?? "0"}, ${motionOffset?.y ?? "0"}, 0) scale(var(--notification-scale, 1))`;
};
/** Build the placement metadata used by position and motion styles. */
var getPlacementStyleConfig = (placement, motionOffset) => {
	const vertical = placement.startsWith("bottom") ? "bottom" : "top";
	const horizontal = placement.endsWith("Right") ? "right" : "left";
	const { blockEnd, inlineEnd } = getPlacementOffset(vertical, horizontal);
	const isCenterPlacement = placement === "top" || placement === "bottom";
	const offset = placement === "top" || placement.endsWith("Left") ? `-${motionOffset}` : motionOffset;
	return {
		placement,
		vertical,
		blockEnd,
		horizontal,
		inlineEnd,
		motionOffset: isCenterPlacement ? {
			x: "-50%",
			y: offset
		} : { x: offset },
		baseMotionOffset: isCenterPlacement ? { x: "-50%" } : void 0,
		isCenterPlacement
	};
};
/** Get the list direction for a vertical placement. */
var getPlacementFlexDirection = (vertical) => vertical === "bottom" ? "column-reverse" : "column";
/** Keep configured top/bottom as the visible notice edge while list padding preserves shadows. */
var getPlacementInset = (vertical) => {
	const marginEdge = `var(${notificationMarginEdgeVar}, 0px)`;
	return `calc(var(--notification-${vertical}, ${marginEdge}) - ${marginEdge})`;
};
/** Get the transform origin used by stacked notice scaling. */
var getPlacementTransformOrigin = (vertical) => vertical === "bottom" ? "center top" : "center bottom";
/** Calculate the clip offset that preserves stack shadows. */
var getStackShadowClipOffset = (token) => unit(token.calc(token.marginXXL).mul(-1).equal());
/** Build the default stack clip-path for a visible notice. */
var getStackNoticeClipPath$1 = (token) => {
	const offset = getStackShadowClipOffset(token);
	return `inset(${offset} ${offset} ${offset} ${offset})`;
};
/** Build the collapsed stack clip-path for a placement. */
var getPlacementStackClipPath = (token, vertical) => {
	const offset = getStackShadowClipOffset(token);
	return vertical === "bottom" ? `inset(${offset} ${offset} 50% ${offset})` : `inset(50% ${offset} ${offset} ${offset})`;
};
/** Generate styles for a single notification placement. */
var genPlacementStyle = (token, config) => {
	const { componentCls } = token;
	const { placement, vertical, blockEnd, horizontal, inlineEnd, isCenterPlacement } = config;
	const noticeCls = `${componentCls}-notice`;
	const noticeMotionCls = `${noticeCls}${componentCls}-fade`;
	const enterTransform = getMotionTransform(config.motionOffset);
	const baseTransform = getMotionTransform(config.baseMotionOffset);
	const transformOrigin = getPlacementTransformOrigin(vertical);
	return { [`&${componentCls}-${placement}`]: {
		[vertical]: getPlacementInset(vertical),
		[blockEnd]: "auto",
		display: "flex",
		flexDirection: getPlacementFlexDirection(vertical),
		...isCenterPlacement ? {
			marginInline: 0,
			left: "50%",
			right: "auto",
			transform: "translateX(-50%)"
		} : {
			[horizontal]: 0,
			[inlineEnd]: "auto"
		},
		[noticeCls]: {
			[vertical]: "var(--notification-y, 0)",
			...isCenterPlacement ? {
				left: "50%",
				transform: baseTransform
			} : { [horizontal]: "var(--notification-x, 0)" },
			transformOrigin
		},
		[`${noticeMotionCls}-appear-prepare, ${noticeMotionCls}-enter-prepare`]: {
			opacity: 0,
			transform: enterTransform,
			transition: "none"
		},
		[`${noticeMotionCls}-appear-start, ${noticeMotionCls}-enter-start`]: {
			opacity: 0,
			transform: enterTransform
		},
		[`${noticeMotionCls}-appear-active, ${noticeMotionCls}-enter-active`]: {
			opacity: 1,
			transform: baseTransform
		},
		[`${noticeMotionCls}-leave-start`]: {
			opacity: 1,
			transform: baseTransform
		},
		[`${noticeMotionCls}-leave-active`]: {
			opacity: 0,
			transform: enterTransform
		},
		[`&${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
			[noticeCls]: { clipPath: getPlacementStackClipPath(token, vertical) },
			[`${noticeCls}[data-notification-index='0']`]: { clipPath: getStackNoticeClipPath$1(token) }
		}
	} };
};
/** Generate placement styles for all enabled notification placements. */
var genNotificationPlacementRootStyle = (token, placements = NotificationPlacements) => {
	const { notificationMotionOffset } = token;
	const motionOffset = unit(notificationMotionOffset);
	return { ...placements.reduce((styles, placement) => ({
		...styles,
		...genPlacementStyle(token, getPlacementStyleConfig(placement, motionOffset))
	}), {}) };
};
/** Wrap placement styles under the component root selector. */
var genNotificationPlacementStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: genNotificationPlacementRootStyle(token) };
};
//#endregion
//#region node_modules/antd/es/notification/style/index.js
var DEFAULT_COLLAPSED_STACK_VISIBLE_COUNT = 3;
/** Provide default public ComponentToken values for Notification. */
var prepareComponentToken$7 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 50,
	width: 384,
	progressBg: `linear-gradient(90deg, ${token.colorPrimaryBorderHover}, ${token.colorPrimary})`,
	colorSuccessBg: void 0,
	colorErrorBg: void 0,
	colorInfoBg: void 0,
	colorWarningBg: void 0
});
/** Derive internal Notification style tokens from alias and component tokens. */
var prepareNotificationToken = (token) => {
	const notificationPaddingVertical = token.paddingMD;
	const notificationPaddingHorizontal = token.paddingLG;
	return merge$1(token, {
		notificationBg: token.colorBgElevated,
		notificationPaddingVertical,
		notificationPaddingHorizontal,
		notificationIconSize: token.calc(token.fontSizeLG).mul(token.lineHeightLG).equal(),
		notificationCloseButtonSize: token.calc(token.controlHeightLG).mul(.55).equal(),
		notificationMarginBottom: token.margin,
		notificationPadding: `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
		notificationMarginEdge: token.marginLG,
		notificationProgressHeight: 2,
		notificationMotionOffset: 64
	});
};
/** Build a clip-path inset that keeps stack shadows visible. */
var getStackNoticeClipPath = (offset) => `inset(${offset} ${offset} ${offset} ${offset})`;
/** Generate shared list content and motion base styles. */
var genNotificationListContentStyle = (token) => {
	const { componentCls, motionDurationMid, motionDurationSlow, motionEaseInOut } = token;
	const listContentCls = `${`${componentCls}-list`}-content`;
	return {
		[listContentCls]: {
			position: "relative",
			display: "flex",
			flexShrink: 0,
			flexDirection: "column",
			gap: token.notificationMarginBottom,
			width: "100%",
			willChange: "height, transform",
			transition: "none",
			[`&${listContentCls}-decrease`]: { transition: `height calc(${motionDurationSlow} * 2) ${motionEaseInOut} ${motionDurationMid}` }
		},
		[`${componentCls}-fade`]: {
			backfaceVisibility: "hidden",
			willChange: "transform, opacity"
		}
	};
};
/** Generate the root holder, list, stack, and RTL styles for notifications. */
var genNotificationListStyle = (token, config) => {
	const { componentCls, notificationMarginEdge } = token;
	const notificationMarginEdgeVar = "--notification-margin-edge";
	const noticeCls = `${componentCls}-notice`;
	const listCls = `${componentCls}-list`;
	const listWidth = config.listWidthKey ? token.calc(token[config.listWidthKey]).add(token.calc(notificationMarginEdge).mul(2)).equal() : "100%";
	const noticeBeyondStackVisibleCountCls = `${noticeCls}:nth-last-child(n + ${(config.stackVisibleCount ?? DEFAULT_COLLAPSED_STACK_VISIBLE_COUNT) + 1})`;
	const stackNoticeClipPath = getStackNoticeClipPath(unit(token.calc(token.marginXXL).mul(-1).equal()));
	return { [componentCls]: {
		...resetComponent(token),
		[notificationMarginEdgeVar]: unit(notificationMarginEdge),
		position: "fixed",
		zIndex: token.zIndexPopup,
		width: listWidth,
		maxWidth: "100vw",
		height: "100vh",
		overflow: "hidden",
		overscrollBehavior: "contain",
		[`${componentCls}-hook-holder`]: { position: "relative" },
		[`&${listCls}`]: {
			maxHeight: "100vh",
			padding: `var(${notificationMarginEdgeVar})`,
			overflowX: "hidden",
			overflowY: "auto",
			overscrollBehavior: "contain",
			scrollbarWidth: "none",
			msOverflowStyle: "none",
			pointerEvents: "none",
			"&::-webkit-scrollbar": {
				display: "none",
				width: 0,
				height: 0
			}
		},
		...genNotificationListContentStyle(token),
		[`&${componentCls}-stack`]: {
			[noticeCls]: { clipPath: stackNoticeClipPath },
			[`&:not(${componentCls}-stack-expanded)`]: {
				[noticeCls]: { "--notification-scale": "calc(1 - min(var(--notification-index, 0), 2) * 0.06)" },
				[`${noticeCls}:not(${noticeCls}-stack-in-threshold)`]: {
					opacity: 0,
					pointerEvents: "none"
				},
				[noticeBeyondStackVisibleCountCls]: {
					opacity: 0,
					pointerEvents: "none"
				}
			}
		},
		"&-rtl": {
			direction: "rtl",
			[`${noticeCls}-actions`]: { float: "left" }
		}
	} };
};
genSubStyleComponent(["Notification", "PurePanel"], (token) => genPurePanelStyle(prepareNotificationToken(token)), prepareComponentToken$7);
/** Compose the shared list, item, and placement styles. */
var sharedGenerateStyle = (token, config) => {
	const itemStyle = config.itemStyle ?? genNotificationStyle;
	return [
		genNotificationListStyle(token, config),
		itemStyle(token),
		genNotificationPlacementStyle(token)
	];
};
genStyleHooks("Notification", (token) => {
	return sharedGenerateStyle(prepareNotificationToken(token), { listWidthKey: "width" });
}, prepareComponentToken$7);
//#endregion
//#region node_modules/antd/es/message/style/index.js
/** Map Message component tokens onto the shared Notification token shape. */
var prepareMessageToken = (token) => {
	const messagePaddingVertical = token.calc(token.controlHeightLG).sub(token.calc(token.fontSize).mul(token.lineHeight)).div(2).equal();
	const messagePaddingHorizontal = token.paddingSM;
	return merge$1(prepareNotificationToken(token), {
		notificationBg: token.contentBg,
		notificationPadding: token.contentPadding,
		notificationPaddingVertical: messagePaddingVertical,
		notificationPaddingHorizontal: messagePaddingHorizontal
	});
};
/** Provide default public ComponentToken values for Message. */
var prepareComponentToken$6 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
	contentBg: token.colorBgElevated,
	contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${token.paddingSM}px`
});
/** Generate the shared item card styles for Message notices. */
var genMessageItemStyle = (token) => {
	const { fontSize, fontSizeLG, lineHeight } = token;
	return genListItemSharedStyle(token, {
		width: "max-content",
		iconFontSize: fontSizeLG,
		titleFontSize: fontSize,
		titleLineHeight: lineHeight,
		contentStyle: {
			alignItems: "center",
			gap: token.marginXS
		},
		noticeStyle: { zIndex: 1 }
	});
};
/** Generate the collapsed stack placeholder styles for Message notices. */
var generateMessageStackStyle = (token) => {
	const { componentCls } = token;
	const noticeCls = `${componentCls}-notice`;
	const listContentCls = `${componentCls}-list-content`;
	const { "&::after": _hoverAfterStyle, ...messageNoticeStyle } = genMessageItemStyle(token)[noticeCls];
	const placeholderStyle = {
		...messageNoticeStyle,
		position: "absolute",
		zIndex: -1,
		left: "50%",
		height: token.calc(token.marginXS).mul(2).equal(),
		padding: 0,
		boxShadow: token.boxShadowTertiary,
		opacity: 0,
		pointerEvents: "none",
		transform: "translateX(-50%) translateY(100%)",
		transition: [
			`opacity ${token.motionDurationFast} ${token.motionEaseInOut}`,
			`transform ${token.motionDurationFast} ${token.motionEaseInOut}`,
			`width ${token.motionDurationSlow} ${token.motionEaseInOut}`
		].join(", "),
		content: "\"\""
	};
	return { [componentCls]: { [`&${componentCls}-stack`]: {
		[listContentCls]: {
			isolation: "isolate",
			"&::before": {
				...placeholderStyle,
				top: `calc(var(--top-notificiation-height) - ${unit(token.marginXS)})`,
				width: `calc(var(--top-notificiation-width) - ${unit(token.margin)})`
			},
			"&::after": {
				...placeholderStyle,
				zIndex: -2,
				top: "var(--top-notificiation-height)",
				width: `calc(var(--top-notificiation-width) - ${unit(token.calc(token.margin).mul(2).equal())})`
			}
		},
		[`&:not(${componentCls}-stack-expanded)`]: { [listContentCls]: { "&::before, &::after": {
			opacity: 1,
			transform: "translateX(-50%) translateY(0)"
		} } }
	} } };
};
/** Generate standalone PurePanel styles for Message. */
var generateMessagePurePanelStyle = (token) => {
	const { componentCls } = token;
	const noticeCls = `${componentCls}-notice`;
	const messageItemStyle = genMessageItemStyle(token);
	return { [`${noticeCls}-pure-panel`]: {
		width: "max-content",
		maxWidth: "100%",
		...messageItemStyle,
		[noticeCls]: {
			...messageItemStyle[noticeCls],
			position: "relative",
			width: "max-content",
			maxWidth: "100%"
		}
	} };
};
/** Register the PurePanel sub-style component for Message. */
var PurePanelStyle = genSubStyleComponent(["Message", "PurePanel"], (token) => generateMessagePurePanelStyle(prepareMessageToken(token)), prepareComponentToken$6);
/** Wrap Message item styles under the component root selector. */
var generateMessageStyle = (token) => ({ [token.componentCls]: genMessageItemStyle(token) });
/** Register the main style hook for Message. */
var style_default$9 = genStyleHooks("Message", (token) => {
	const messageToken = prepareMessageToken(token);
	return [sharedGenerateStyle(messageToken, {
		stackVisibleCount: 1,
		itemStyle: generateMessageStyle
	}), generateMessageStackStyle(messageToken)];
}, prepareComponentToken$6);
//#endregion
//#region node_modules/antd/es/message/PurePanel.js
var TypeIcon = {
	info: /*#__PURE__*/ import_react.createElement(RefIcon$2, null),
	success: /*#__PURE__*/ import_react.createElement(RefIcon$3, null),
	error: /*#__PURE__*/ import_react.createElement(RefIcon, null),
	warning: /*#__PURE__*/ import_react.createElement(RefIcon$4, null),
	loading: /*#__PURE__*/ import_react.createElement(RefIcon$5, null)
};
var getMessageIcon = (type, icon) => icon || type && TypeIcon[type] || null;
/** @private Internal Component. Do not use in your production. */
var PurePanel$2 = (props) => {
	const { prefixCls: staticPrefixCls, className, style, type, icon, content, classNames: messageClassNames, styles, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("message");
	const prefixCls = staticPrefixCls || getPrefixCls("message");
	const noticePrefixCls = `${prefixCls}-notice`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$9(prefixCls, rootCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, messageClassNames], [contextStyles, styles], { props });
	const iconNode = getMessageIcon(type, icon);
	const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : void 0;
	const rcClassNames = {
		wrapper: clsx(type && `${prefixCls}-${type}`, mergedClassNames.wrapper),
		icon: clsx(typeIconCls, mergedClassNames.icon),
		title: mergedClassNames.title
	};
	const rcStyles = {
		wrapper: mergedStyles.wrapper,
		icon: mergedStyles.icon,
		title: mergedStyles.title
	};
	return /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${noticePrefixCls}-pure-panel`, hashId, className, cssVarCls, rootCls, mergedClassNames.root),
		style: mergedStyles.root
	}, /*#__PURE__*/ import_react.createElement(PurePanelStyle, { prefixCls }), /*#__PURE__*/ import_react.createElement(Notification, {
		...restProps,
		prefixCls,
		className: contextClassName,
		style: {
			...contextStyle,
			...style
		},
		duration: null,
		icon: iconNode,
		title: content,
		classNames: rcClassNames,
		styles: rcStyles
	}));
};
//#endregion
//#region node_modules/antd/es/message/util.js
function getMotion(prefixCls, transitionName) {
	return { motionName: transitionName ?? `${prefixCls}-fade` };
}
/** Wrap message open with promise like function */
function wrapPromiseFn(openFn) {
	let closeFn;
	const closePromise = new Promise((resolve) => {
		closeFn = openFn(() => {
			resolve(true);
		});
	});
	const result = () => {
		closeFn?.();
	};
	result.then = (filled, rejected) => closePromise.then(filled, rejected);
	result.promise = closePromise;
	return result;
}
//#endregion
//#region node_modules/antd/es/message/useMessage.js
var DEFAULT_OFFSET = 8;
var DEFAULT_DURATION = 3;
var DEFAULT_STACK_CONFIG = false;
var Wrapper = ({ children, prefixCls }) => {
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$9(prefixCls, rootCls);
	return /*#__PURE__*/ import_react.createElement(NotificationProvider, { classNames: { list: clsx(hashId, cssVarCls, rootCls) } }, children);
};
var renderNotifications = (node, { prefixCls, key }) => /*#__PURE__*/ import_react.createElement(Wrapper, {
	prefixCls,
	key
}, node);
var Holder = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { top, prefixCls: staticPrefixCls, getContainer: staticGetContainer, maxCount, duration = DEFAULT_DURATION, rtl, classNames, styles, transitionName, pauseOnHover = true, stack, onAllRemoved } = props;
	const { getPrefixCls, direction, getPopupContainer } = useComponentConfig("message");
	const { message } = import_react.useContext(ConfigContext);
	const prefixCls = staticPrefixCls || getPrefixCls("message");
	const contextStyleRoot = useSemanticRootStyle(message?.style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([message?.classNames, classNames], [
		message?.styles,
		contextStyleRoot,
		styles
	], { props });
	const getStyle = () => getPlacementOffsetStyle(top ?? DEFAULT_OFFSET);
	const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === "rtl" });
	const getNotificationMotion = () => getMotion(prefixCls, transitionName);
	const stackConfig = useStackConfig(stack, DEFAULT_STACK_CONFIG);
	const [api, holder] = useNotification({
		prefixCls,
		style: getStyle,
		className: getClassName,
		motion: getNotificationMotion,
		closable: false,
		duration,
		getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
		maxCount,
		onAllRemoved,
		classNames: mergedClassNames,
		styles: mergedStyles,
		renderNotifications,
		pauseOnHover,
		stack: stackConfig
	});
	import_react.useImperativeHandle(ref, () => ({
		...api,
		prefixCls,
		message
	}));
	return holder;
});
var keyIndex = 0;
function useInternalMessage(messageConfig) {
	const holderRef = import_react.useRef(null);
	devUseWarning("Message");
	return [import_react.useMemo(() => {
		const close = (key) => {
			holderRef.current?.close(key);
		};
		const open = (config) => {
			if (!holderRef.current) {
				const fakeResult = () => {};
				fakeResult.then = () => {};
				return fakeResult;
			}
			const { open: originOpen, prefixCls, message } = holderRef.current;
			const contextClassName = message?.className || {};
			const noticePrefixCls = `${prefixCls}-notice`;
			const { content, icon, type, key, className, style, onClose, classNames: configClassNames = {}, styles = {}, ...restConfig } = config;
			let mergedKey = key;
			if (!isNonNullable(mergedKey)) {
				keyIndex += 1;
				mergedKey = `antd-message-${keyIndex}`;
			}
			const contextConfig = {
				...messageConfig,
				...config
			};
			const semanticClassNames = resolveStyleOrClass(configClassNames, { props: contextConfig });
			const semanticStyles = resolveStyleOrClass(styles, { props: contextConfig });
			const iconNode = getMessageIcon(type, icon);
			const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : void 0;
			return wrapPromiseFn((resolve) => {
				originOpen({
					...restConfig,
					key: mergedKey,
					icon: iconNode,
					title: content,
					classNames: {
						...semanticClassNames,
						wrapper: clsx(type && `${prefixCls}-${type}`, semanticClassNames?.wrapper),
						icon: clsx(typeIconCls, semanticClassNames?.icon)
					},
					styles: semanticStyles,
					placement: "top",
					className: clsx({ [`${noticePrefixCls}-${type}`]: type }, className, contextClassName),
					style,
					onClose: () => {
						onClose?.();
						resolve();
					}
				});
				return () => {
					close(mergedKey);
				};
			});
		};
		const destroy = (key) => {
			if (key !== void 0) close(key);
			else holderRef.current?.destroy();
		};
		const clone = {
			open,
			destroy
		};
		[
			"info",
			"success",
			"warning",
			"error",
			"loading"
		].forEach((type) => {
			const typeOpen = (jointContent, duration, onClose) => {
				let config;
				if (isPlainObject(jointContent) && "content" in jointContent) config = jointContent;
				else config = { content: jointContent };
				let mergedDuration;
				let mergedOnClose;
				if (isFunction(duration)) mergedOnClose = duration;
				else {
					mergedDuration = duration;
					mergedOnClose = onClose;
				}
				const mergedConfig = {
					onClose: mergedOnClose,
					duration: mergedDuration,
					...config,
					type
				};
				return open(mergedConfig);
			};
			clone[type] = typeOpen;
		});
		return clone;
	}, []), /*#__PURE__*/ import_react.createElement(Holder, {
		key: "message-holder",
		...messageConfig,
		ref: holderRef
	})];
}
function useMessage(messageConfig) {
	return useInternalMessage(messageConfig);
}
//#endregion
//#region node_modules/antd/es/_util/motion.js
var getCollapsedHeight = () => ({
	height: 0,
	opacity: 0
});
var getRealHeight = (node) => ({
	height: node?.scrollHeight ?? 0,
	opacity: node ? 1 : 0
});
var getCurrentHeight = (node) => ({ height: node?.offsetHeight ?? 0 });
var skipOpacityTransition = (_, event) => {
	return event?.deadline === true || isTransitionEvent(event) && event.propertyName === "height";
};
var initCollapseMotion = (rootCls = "ant") => ({
	motionName: `${rootCls}-motion-collapse`,
	onAppearStart: getCollapsedHeight,
	onEnterStart: getCollapsedHeight,
	onAppearActive: getRealHeight,
	onEnterActive: getRealHeight,
	onLeaveStart: getCurrentHeight,
	onLeaveActive: getCollapsedHeight,
	onAppearEnd: skipOpacityTransition,
	onEnterEnd: skipOpacityTransition,
	onLeaveEnd: skipOpacityTransition,
	motionDeadline: 500
});
var getTransitionName = (rootPrefixCls, motion, transitionName) => {
	if (transitionName !== void 0) return transitionName;
	return `${rootPrefixCls}-${motion}`;
};
//#endregion
//#region node_modules/antd/es/_util/wave/style.js
var genWaveStyle = (token) => {
	const { componentCls, colorPrimary, motionDurationSlow, motionEaseInOut, motionEaseOutCirc, antCls } = token;
	const [, varRef] = genCssVar(antCls, "wave");
	return { [componentCls]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: varRef("color", colorPrimary),
		boxShadow: `0 0 0 0 currentcolor`,
		opacity: .2,
		"&.wave-motion-appear": {
			transition: [`box-shadow 0.4s`, `opacity 2s`].map((prop) => `${prop} ${motionEaseOutCirc}`).join(","),
			"&-active": {
				boxShadow: `0 0 0 6px currentcolor`,
				opacity: 0
			},
			"&.wave-quick": { transition: [`box-shadow`, `opacity`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") }
		}
	} };
};
var style_default$8 = genComponentStyleHook("Wave", genWaveStyle);
//#endregion
//#region node_modules/antd/es/_util/wave/interface.js
var TARGET_CLS = `ant-wave-target`;
//#endregion
//#region node_modules/antd/es/_util/wave/util.js
var isValidWaveColor = (color) => {
	if (!color) return false;
	return isString(color) && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/i.test(color) && !/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i.test(color) && color !== "transparent" && color !== "canvastext";
};
function getTargetWaveColor(node, colorSource = null) {
	const style = getComputedStyle(node);
	const { borderTopColor, borderColor, backgroundColor } = style;
	if (colorSource && isValidWaveColor(style[colorSource])) return style[colorSource];
	return [
		borderTopColor,
		borderColor,
		backgroundColor
	].find(isValidWaveColor) ?? null;
}
//#endregion
//#region node_modules/antd/es/_util/wave/WaveEffect.js
function validateNum(value) {
	return Number.isNaN(value) ? 0 : value;
}
var WaveEffect = (props) => {
	const { className, target, component, colorSource } = props;
	const divRef = import_react.useRef(null);
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const [varName] = genCssVar(getPrefixCls(), "wave");
	const [waveColor, setWaveColor] = import_react.useState(null);
	const [borderRadius, setBorderRadius] = import_react.useState([]);
	const [left, setLeft] = import_react.useState(0);
	const [top, setTop] = import_react.useState(0);
	const [width, setWidth] = import_react.useState(0);
	const [height, setHeight] = import_react.useState(0);
	const [enabled, setEnabled] = import_react.useState(false);
	const waveStyle = {
		left,
		top,
		width,
		height,
		borderRadius: borderRadius.map((radius) => `${radius}px`).join(" ")
	};
	if (waveColor) waveStyle[varName("color")] = waveColor;
	function syncPos() {
		const nodeStyle = getComputedStyle(target);
		setWaveColor(getTargetWaveColor(target, colorSource));
		const isStatic = nodeStyle.position === "static";
		const { borderLeftWidth, borderTopWidth } = nodeStyle;
		setLeft(isStatic ? target.offsetLeft : validateNum(-Number.parseFloat(borderLeftWidth)));
		setTop(isStatic ? target.offsetTop : validateNum(-Number.parseFloat(borderTopWidth)));
		setWidth(target.offsetWidth);
		setHeight(target.offsetHeight);
		const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } = nodeStyle;
		setBorderRadius([
			borderTopLeftRadius,
			borderTopRightRadius,
			borderBottomRightRadius,
			borderBottomLeftRadius
		].map((radius) => validateNum(Number.parseFloat(radius))));
	}
	import_react.useEffect(() => {
		if (target) {
			const id = wrapperRaf(() => {
				syncPos();
				setEnabled(true);
			});
			let resizeObserver;
			if (typeof ResizeObserver !== "undefined") {
				resizeObserver = new ResizeObserver(syncPos);
				resizeObserver.observe(target);
			}
			return () => {
				wrapperRaf.cancel(id);
				resizeObserver?.disconnect();
			};
		}
	}, [target]);
	if (!enabled) return null;
	const isSmallComponent = (component === "Checkbox" || component === "Radio") && target?.classList.contains(TARGET_CLS);
	return /*#__PURE__*/ import_react.createElement(es_default$1, {
		visible: true,
		motionAppear: true,
		motionName: "wave-motion",
		motionDeadline: 5e3,
		onAppearEnd: (_, event) => {
			if (event.deadline || isTransitionEvent(event) && event.propertyName === "opacity") {
				const holder = divRef.current?.parentElement;
				unmount(holder).then(() => {
					holder?.remove();
				});
			}
			return false;
		}
	}, ({ className: motionClassName }, ref) => /*#__PURE__*/ import_react.createElement("div", {
		ref: composeRef(divRef, ref),
		className: clsx(className, motionClassName, { "wave-quick": isSmallComponent }),
		style: waveStyle
	}));
};
var showWaveEffect = (target, info) => {
	const { component } = info;
	if (component === "Checkbox" && !target.querySelector("input")?.checked) return;
	const holder = document.createElement("div");
	holder.style.position = "absolute";
	holder.style.left = "0px";
	holder.style.top = "0px";
	target?.insertBefore(holder, target?.firstChild);
	render(/*#__PURE__*/ import_react.createElement(WaveEffect, {
		...info,
		target
	}), holder);
};
//#endregion
//#region node_modules/antd/es/_util/wave/useWave.js
var useWave = (nodeRef, className, component, colorSource) => {
	const { wave } = import_react.useContext(ConfigContext);
	const [, token, hashId] = useToken();
	const showWave = useEvent((event) => {
		const node = nodeRef.current;
		if (wave?.disabled || !node) return;
		const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;
		const { showEffect } = wave || {};
		(showEffect || showWaveEffect)(targetNode, {
			className,
			token,
			component,
			event,
			hashId,
			colorSource
		});
	});
	const rafIdRef = import_react.useRef(null);
	import_react.useEffect(() => () => {
		wrapperRaf.cancel(rafIdRef.current);
	}, []);
	const showDebounceWave = (event) => {
		wrapperRaf.cancel(rafIdRef.current);
		rafIdRef.current = wrapperRaf(() => {
			showWave(event);
		});
	};
	return showDebounceWave;
};
//#endregion
//#region node_modules/antd/es/_util/wave/index.js
var TRIGGER_TYPE_TO_EVENT_MAP = {
	click: "click",
	mousedown: "mousedown",
	mouseup: "mouseup",
	pointerdown: "pointerdown",
	pointerup: "pointerup"
};
var Wave = (props) => {
	const { children, disabled, component, colorSource } = props;
	const { getPrefixCls, wave } = (0, import_react.useContext)(ConfigContext);
	const containerRef = (0, import_react.useRef)(null);
	const prefixCls = getPrefixCls("wave");
	const hashId = style_default$8(prefixCls);
	const showWave = useWave(containerRef, clsx(prefixCls, hashId), component, colorSource);
	import_react.useEffect(() => {
		const node = containerRef.current;
		if (!node || node.nodeType !== window.Node.ELEMENT_NODE || disabled) return;
		const onClick = (e) => {
			if (!isVisible_default(e.target) || !node.getAttribute || node.getAttribute("disabled") || node.disabled || node.className.includes("disabled") && !node.className.includes("disabled:") || node.getAttribute("aria-disabled") === "true" || node.className.includes("-leave")) return;
			showWave(e);
		};
		const triggerType = wave?.triggerType;
		const eventName = triggerType && triggerType in TRIGGER_TYPE_TO_EVENT_MAP ? TRIGGER_TYPE_TO_EVENT_MAP[triggerType] : "click";
		node.addEventListener(eventName, onClick, true);
		return () => {
			node.removeEventListener(eventName, onClick, true);
		};
	}, [disabled, wave?.triggerType]);
	if (!/*#__PURE__*/ import_react.isValidElement(children)) return children ?? null;
	return cloneElement(children, { ref: supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef });
};
//#endregion
//#region node_modules/antd/es/config-provider/hooks/useSize.js
var useSize = (customSize) => {
	const size = import_react.useContext(SizeContext);
	return import_react.useMemo(() => {
		if (!customSize) return size;
		if (isString(customSize)) return customSize ?? size;
		if (isFunction(customSize)) return customSize(size);
		return size;
	}, [customSize, size]);
};
//#endregion
//#region node_modules/antd/es/space/style/compact.js
var genSpaceCompactStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-block": {
			display: "flex",
			width: "100%"
		},
		"&-vertical": { flexDirection: "column" },
		"&-rtl": { direction: "rtl" }
	} };
};
var compact_default$1 = genStyleHooks(["Space", "Compact"], genSpaceCompactStyle, () => ({}), { resetStyle: false });
//#endregion
//#region node_modules/antd/es/space/Compact.js
var SpaceCompactItemContext = /*#__PURE__*/ import_react.createContext(null);
var useCompactItemContext = (prefixCls, direction) => {
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const compactItemClassnames = import_react.useMemo(() => {
		if (!compactItemContext) return "";
		const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
		const separator = compactDirection === "vertical" ? "-vertical-" : "-";
		return clsx(`${prefixCls}-compact${separator}item`, {
			[`${prefixCls}-compact${separator}first-item`]: isFirstItem,
			[`${prefixCls}-compact${separator}last-item`]: isLastItem,
			[`${prefixCls}-compact${separator}item-rtl`]: direction === "rtl"
		});
	}, [
		prefixCls,
		direction,
		compactItemContext
	]);
	return {
		compactSize: compactItemContext?.compactSize,
		compactDirection: compactItemContext?.compactDirection,
		compactItemClassnames
	};
};
var NoCompactStyle = (props) => {
	const { children } = props;
	return /*#__PURE__*/ import_react.createElement(SpaceCompactItemContext.Provider, { value: null }, children);
};
var CompactItem = (props) => {
	const { children, ...others } = props;
	return /*#__PURE__*/ import_react.createElement(SpaceCompactItemContext.Provider, { value: import_react.useMemo(() => others, [others]) }, children);
};
var Compact = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction: directionConfig } = import_react.useContext(ConfigContext);
	const { size, direction, orientation, block, prefixCls: customizePrefixCls, className, rootClassName, children, vertical, ...restProps } = props;
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	const mergedSize = useSize((ctx) => size ?? ctx);
	const prefixCls = getPrefixCls("space-compact", customizePrefixCls);
	const [hashId] = compact_default$1(prefixCls);
	const clx = clsx(prefixCls, hashId, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-vertical`]: mergedVertical
	}, className, rootClassName);
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const nativeElementRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({ nativeElement: nativeElementRef.current }));
	const childNodes = toArray$1(children);
	const nodes = import_react.useMemo(() => childNodes.map((child, i) => {
		const key = child?.key || `${prefixCls}-item-${i}`;
		return /*#__PURE__*/ import_react.createElement(CompactItem, {
			key,
			compactSize: mergedSize,
			compactDirection: mergedOrientation,
			isFirstItem: i === 0 && (!compactItemContext || compactItemContext?.isFirstItem),
			isLastItem: i === childNodes.length - 1 && (!compactItemContext || compactItemContext?.isLastItem)
		}, child);
	}), [
		childNodes,
		compactItemContext,
		mergedOrientation,
		mergedSize,
		prefixCls
	]);
	if (childNodes.length === 0) return null;
	return /*#__PURE__*/ import_react.createElement("div", {
		ref: nativeElementRef,
		className: clx,
		...restProps
	}, nodes);
});
//#endregion
//#region node_modules/antd/es/button/ButtonGroup.js
var GroupSizeContext = /*#__PURE__*/ import_react.createContext(void 0);
var ButtonGroup = (props) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, size, className, ...others } = props;
	const prefixCls = getPrefixCls("btn-group", customizePrefixCls);
	const [, , hashId] = useToken();
	const sizeCls = import_react.useMemo(() => {
		switch (size) {
			case "large": return "lg";
			case "small": return "sm";
			default: return "";
		}
	}, [size]);
	const classes = clsx(prefixCls, {
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId);
	return /*#__PURE__*/ import_react.createElement(GroupSizeContext.Provider, { value: size }, /*#__PURE__*/ import_react.createElement("div", {
		...others,
		className: classes
	}));
};
//#endregion
//#region node_modules/antd/es/button/buttonHelpers.js
var rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function convertLegacyProps(type) {
	if (type === "danger") return { danger: true };
	return { type };
}
function isUnBorderedButtonVariant(type) {
	return type === "text" || type === "link";
}
function splitCNCharsBySpace(child, needInserted, style, className) {
	if (!isReactRenderable(child)) return;
	const SPACE = needInserted ? " " : "";
	if (!isString(child) && !isNumber(child) && isString(child.type) && isTwoCNChar(child.props.children)) return cloneElement(child, (oriProps) => {
		const mergedCls = clsx(oriProps.className, className) || void 0;
		const mergedStyle = {
			...style,
			...oriProps.style
		};
		return {
			...oriProps,
			children: oriProps.children.split("").join(SPACE),
			className: mergedCls,
			style: mergedStyle
		};
	});
	if (isString(child)) return /*#__PURE__*/ import_react.createElement("span", {
		className,
		style
	}, isTwoCNChar(child) ? child.split("").join(SPACE) : child);
	if (isFragment(child)) return /*#__PURE__*/ import_react.createElement("span", {
		className,
		style
	}, child);
	return cloneElement(child, (oriProps) => ({
		...oriProps,
		className: clsx(oriProps.className, className) || void 0,
		style: {
			...oriProps.style,
			...style
		}
	}));
}
function spaceChildren(children, needInserted, style, className) {
	let isPrevChildPure = false;
	const childList = [];
	import_react.Children.forEach(children, (child) => {
		const isCurrentChildPure = isString(child) || isNumber(child);
		if (isPrevChildPure && isCurrentChildPure) {
			const lastIndex = childList.length - 1;
			const lastChild = childList[lastIndex];
			childList[lastIndex] = `${lastChild}${child}`;
		} else childList.push(child);
		isPrevChildPure = isCurrentChildPure;
	});
	return import_react.Children.map(childList, (child) => splitCNCharsBySpace(child, needInserted, style, className));
}
[
	"default",
	"primary",
	"danger"
].concat(_toConsumableArray(PresetColors));
//#endregion
//#region node_modules/antd/es/button/IconWrapper.js
var IconWrapper = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	const { className, style, children, prefixCls } = props;
	const iconWrapperCls = clsx(`${prefixCls}-icon`, className);
	return /*#__PURE__*/ import_react.createElement("span", {
		ref,
		className: iconWrapperCls,
		style
	}, children);
});
//#endregion
//#region node_modules/antd/es/button/DefaultLoadingIcon.js
var InnerLoadingIcon = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls, className, style, iconClassName } = props;
	const mergedIconCls = clsx(`${prefixCls}-loading-icon`, className);
	return /*#__PURE__*/ import_react.createElement(IconWrapper, {
		prefixCls,
		className: mergedIconCls,
		style,
		ref
	}, /*#__PURE__*/ import_react.createElement(RefIcon$5, { className: iconClassName }));
});
var getCollapsedWidth = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
});
var getRealWidth = (node) => ({
	width: node.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
});
var DefaultLoadingIcon = (props) => {
	const { prefixCls, loading, existIcon, className, style, mount } = props;
	const visible = !!loading;
	if (existIcon) return /*#__PURE__*/ import_react.createElement(InnerLoadingIcon, {
		prefixCls,
		className,
		style
	});
	return /*#__PURE__*/ import_react.createElement(es_default$1, {
		visible,
		motionName: `${prefixCls}-loading-icon-motion`,
		motionAppear: !mount,
		motionEnter: !mount,
		motionLeave: !mount,
		removeOnLeave: true,
		onAppearStart: getCollapsedWidth,
		onAppearActive: getRealWidth,
		onEnterStart: getCollapsedWidth,
		onEnterActive: getRealWidth,
		onLeaveStart: getRealWidth,
		onLeaveActive: getCollapsedWidth
	}, ({ className: motionCls, style: motionStyle }, ref) => {
		const mergedStyle = {
			...style,
			...motionStyle
		};
		return /*#__PURE__*/ import_react.createElement(InnerLoadingIcon, {
			prefixCls,
			className: clsx(className, motionCls),
			style: mergedStyle,
			ref
		});
	});
};
//#endregion
//#region node_modules/antd/es/style/motion/collapse.js
var genCollapseMotion = (token) => {
	const { componentCls, antCls, motionDurationMid, motionEaseInOut } = token;
	return { [componentCls]: {
		[`${antCls}-motion-collapse-legacy`]: {
			overflow: "hidden",
			"&-active": { transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important` }
		},
		[`${antCls}-motion-collapse`]: {
			overflow: "hidden",
			transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important`
		}
	} };
};
//#endregion
//#region node_modules/antd/es/style/motion/motion.js
var initMotionCommon = (duration) => ({
	animationDuration: duration,
	animationFillMode: "both"
});
var initMotion = (motionCls, inKeyframes, outKeyframes, duration, sameLevel = false) => {
	const sameLevelPrefix = sameLevel ? "&" : "";
	return {
		[`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
			animationName: inKeyframes,
			animationPlayState: "running"
		},
		[`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
			animationName: outKeyframes,
			animationPlayState: "running",
			pointerEvents: "none"
		}
	};
};
//#endregion
//#region node_modules/antd/es/style/motion/fade.js
var fadeIn = new Keyframe("antFadeIn", {
	"0%": { opacity: 0 },
	"100%": { opacity: 1 }
});
var fadeOut = new Keyframe("antFadeOut", {
	"0%": { opacity: 1 },
	"100%": { opacity: 0 }
});
/**
* Initialize fade motion styles
*
* Generates CSS styles for fade in/out transition animations when elements are shown/hidden.
* Supports enter, appear, and leave animation states.
*
* @param token - Object containing design tokens and CSS class prefix
* @param sameLevel - Controls CSS selector nesting behavior:
*   - `false` (default): Generates descendant selectors like `.ant-fade-enter`, `.ant-fade-appear`
*   - `true`: Generates same-level selectors with `&` prefix like `&.ant-fade-enter`, `&.ant-fade-appear`
*   Use `true` when the motion classes are applied to the same element as the parent selector,
*   Use `false` when the motion classes are applied to child elements
* @returns CSS interpolation object containing fade motion styles
*
* @example
* ```ts
* // For child elements (default behavior)
* const fadeStyles = initFadeMotion(token);
* // Generates: .parent .ant-fade-enter { ... }
*
* // For same element
* const sameLevelFadeStyles = initFadeMotion(token, true);
* // Generates: .parent.ant-fade-enter { ... }
* ```
*/
var initFadeMotion = (token, sameLevel = false) => {
	const { antCls } = token;
	const motionCls = `${antCls}-fade`;
	const sameLevelPrefix = sameLevel ? "&" : "";
	return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel), {
		[`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: "linear"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: { animationTimingFunction: "linear" }
	}];
};
//#endregion
//#region node_modules/antd/es/style/motion/util.js
var genNoMotionStyle = () => {
	return { "@media (prefers-reduced-motion: reduce)": { "&, &::before, &::after": {
		transition: "none",
		animation: "none"
	} } };
};
//#endregion
//#region node_modules/antd/es/style/motion/zoom.js
var zoomIn = new Keyframe("antZoomIn", {
	"0%": {
		transform: "scale(0.2)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
var zoomOut = new Keyframe("antZoomOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.2)",
		opacity: 0
	}
});
var zoomBigIn = new Keyframe("antZoomBigIn", {
	"0%": {
		transform: "scale(0.8)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
var zoomBigOut = new Keyframe("antZoomBigOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.8)",
		opacity: 0
	}
});
var zoomUpIn = new Keyframe("antZoomUpIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	}
});
var zoomUpOut = new Keyframe("antZoomUpOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	}
});
var zoomLeftIn = new Keyframe("antZoomLeftIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	}
});
var zoomLeftOut = new Keyframe("antZoomLeftOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	}
});
var zoomRightIn = new Keyframe("antZoomRightIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	}
});
var zoomRightOut = new Keyframe("antZoomRightOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	}
});
var zoomDownIn = new Keyframe("antZoomDownIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	}
});
var zoomDownOut = new Keyframe("antZoomDownOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	}
});
var zoomMotion = {
	zoom: {
		inKeyframes: zoomIn,
		outKeyframes: zoomOut
	},
	"zoom-big": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-big-fast": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-left": {
		inKeyframes: zoomLeftIn,
		outKeyframes: zoomLeftOut
	},
	"zoom-right": {
		inKeyframes: zoomRightIn,
		outKeyframes: zoomRightOut
	},
	"zoom-up": {
		inKeyframes: zoomUpIn,
		outKeyframes: zoomUpOut
	},
	"zoom-down": {
		inKeyframes: zoomDownIn,
		outKeyframes: zoomDownOut
	}
};
var initZoomMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = zoomMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			transform: "scale(0)",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc,
			"&-prepare": { transform: "none" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
};
//#endregion
//#region node_modules/antd/es/button/style/group.js
var genButtonBorderStyle = (buttonTypeCls, borderColor) => ({ [`> span, > ${buttonTypeCls}`]: {
	"&:not(:last-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineEndColor: borderColor } } },
	"&:not(:first-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineStartColor: borderColor } } }
} });
var genGroupStyle$1 = (token) => {
	const { componentCls, fontSize, lineWidth, groupBorderColor, colorErrorHover } = token;
	return { [`${componentCls}-group`]: [
		{
			position: "relative",
			display: "inline-flex",
			[`> span, > ${componentCls}`]: {
				"&:not(:last-child)": { [`&, & > ${componentCls}`]: {
					borderStartEndRadius: 0,
					borderEndEndRadius: 0
				} },
				"&:not(:first-child)": {
					marginInlineStart: token.calc(lineWidth).mul(-1).equal(),
					[`&, & > ${componentCls}`]: {
						borderStartStartRadius: 0,
						borderEndStartRadius: 0
					}
				}
			},
			[componentCls]: {
				position: "relative",
				zIndex: 1,
				"&:hover, &:focus, &:active": { zIndex: 2 },
				"&[disabled]": { zIndex: 0 }
			},
			[`${componentCls}-icon-only`]: { fontSize }
		},
		genButtonBorderStyle(`${componentCls}-primary`, groupBorderColor),
		genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
	] };
};
//#endregion
//#region node_modules/antd/es/color-picker/color.js
var toHexFormat = (value, alpha) => value?.replace(/[^0-9a-f]/gi, "").slice(0, alpha ? 8 : 6) || "";
var getHex = (value, alpha) => value ? toHexFormat(value, alpha) : "";
var AggregationColor = /*#__PURE__*/ function() {
	function AggregationColor(color) {
		_classCallCheck(this, AggregationColor);
		this.cleared = false;
		if (color instanceof AggregationColor) {
			this.metaColor = color.metaColor.clone();
			this.colors = color.colors?.map((info) => ({
				color: new AggregationColor(info.color),
				percent: info.percent
			}));
			this.cleared = color.cleared;
			return;
		}
		const isArray = Array.isArray(color);
		if (isArray && color.length) {
			this.colors = color.map(({ color: c, percent }) => ({
				color: new AggregationColor(c),
				percent
			}));
			this.metaColor = new Color(this.colors[0].color.metaColor);
		} else this.metaColor = new Color(isArray ? "" : color);
		if (!color || isArray && !this.colors) {
			this.metaColor = this.metaColor.setA(0);
			this.cleared = true;
		}
	}
	return _createClass(AggregationColor, [
		{
			key: "toHsb",
			value: function toHsb() {
				return this.metaColor.toHsb();
			}
		},
		{
			key: "toHsbString",
			value: function toHsbString() {
				return this.metaColor.toHsbString();
			}
		},
		{
			key: "toHex",
			value: function toHex() {
				return getHex(this.toHexString(), this.metaColor.a < 1);
			}
		},
		{
			key: "toHexString",
			value: function toHexString() {
				return this.metaColor.toHexString();
			}
		},
		{
			key: "toRgb",
			value: function toRgb() {
				return this.metaColor.toRgb();
			}
		},
		{
			key: "toRgbString",
			value: function toRgbString() {
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "isGradient",
			value: function isGradient() {
				return !!this.colors && !this.cleared;
			}
		},
		{
			key: "getColors",
			value: function getColors() {
				return this.colors || [{
					color: this,
					percent: 0
				}];
			}
		},
		{
			key: "toCssString",
			value: function toCssString() {
				const { colors } = this;
				if (colors) return `linear-gradient(90deg, ${colors.map((c) => `${c.color.toRgbString()} ${c.percent}%`).join(", ")})`;
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "equals",
			value: function equals(color) {
				if (!color || this.isGradient() !== color.isGradient()) return false;
				if (!this.isGradient()) return this.toHexString() === color.toHexString();
				return this.colors.length === color.colors.length && this.colors.every((c, i) => {
					const target = color.colors[i];
					return c.percent === target.percent && c.color.equals(target.color);
				});
			}
		}
	]);
}();
//#endregion
//#region node_modules/antd/es/color-picker/util.js
var generateColor = (color) => {
	if (color instanceof AggregationColor) return color;
	return new AggregationColor(color);
};
//#endregion
//#region node_modules/antd/es/color-picker/components/ColorPresets.js
var isBright = (value, bgColorToken) => {
	const { r, g, b, a } = value.toRgb();
	const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
	if (a <= .5) return hsv.v > .5;
	return r * .299 + g * .587 + b * .114 > 192;
};
//#endregion
//#region node_modules/antd/es/button/style/token.js
var prepareToken$2 = (token) => {
	const { paddingInline, onlyIconSize, borderColorDisabled } = token;
	return merge$1(token, {
		buttonPaddingHorizontal: paddingInline,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: onlyIconSize,
		colorBorderDisabled: borderColorDisabled
	});
};
var prepareComponentToken$5 = (token) => {
	const contentFontSize = token.contentFontSize ?? token.fontSize;
	const contentFontSizeSM = token.contentFontSizeSM ?? token.fontSize;
	const contentFontSizeLG = token.contentFontSizeLG ?? token.fontSizeLG;
	const contentLineHeight = token.contentLineHeight ?? getLineHeight(contentFontSize);
	const contentLineHeightSM = token.contentLineHeightSM ?? getLineHeight(contentFontSizeSM);
	const contentLineHeightLG = token.contentLineHeightLG ?? getLineHeight(contentFontSizeLG);
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	const shadowColorTokens = PresetColors.reduce((prev, colorKey) => ({
		...prev,
		[`${colorKey}ShadowColor`]: `0 ${unit(token.controlOutlineWidth)} 0 ${getAlphaColor(token[`${colorKey}1`], token.colorBgContainer)}`
	}), {});
	const defaultBgDisabled = token.colorBgContainerDisabled;
	const dashedBgDisabled = token.colorBgContainerDisabled;
	return {
		...shadowColorTokens,
		fontWeight: 400,
		iconGap: token.marginXS,
		defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
		primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
		dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
		primaryColor: token.colorTextLightSolid,
		dangerColor: token.colorTextLightSolid,
		borderColorDisabled: token.colorBorderDisabled,
		defaultGhostColor: token.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: token.colorBgContainer,
		paddingInline: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineSM: 8 - token.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: token.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: token.colorText,
		textTextHoverColor: token.colorText,
		textTextActiveColor: token.colorText,
		textHoverBg: token.colorFillTertiary,
		defaultColor: token.colorText,
		defaultBg: token.colorBgContainer,
		defaultBorderColor: token.colorBorder,
		defaultBorderColorDisabled: token.colorBorder,
		defaultHoverBg: token.colorBgContainer,
		defaultHoverColor: token.colorPrimaryHover,
		defaultHoverBorderColor: token.colorPrimaryHover,
		defaultActiveBg: token.colorBgContainer,
		defaultActiveColor: token.colorPrimaryActive,
		defaultActiveBorderColor: token.colorPrimaryActive,
		solidTextColor,
		contentFontSize,
		contentFontSizeSM,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightSM,
		contentLineHeightLG,
		paddingBlock: Math.max((token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth, 0),
		paddingBlockSM: Math.max((token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth, 0),
		paddingBlockLG: Math.max((token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth, 0),
		defaultBgDisabled,
		dashedBgDisabled
	};
};
//#endregion
//#region node_modules/antd/es/button/style/variant.js
var genVariantStyle = (token) => {
	const { componentCls, antCls, lineWidth, lineType } = token;
	const [varName, varRef] = genCssVar(antCls, "btn");
	return { [componentCls]: [
		{
			[varName("border-width")]: lineWidth,
			[varName("border-color")]: "#000",
			[varName("border-color-hover")]: varRef("border-color"),
			[varName("border-color-active")]: varRef("border-color"),
			[varName("border-color-disabled")]: varRef("border-color"),
			[varName("border-style")]: lineType,
			[varName("text-color")]: "#000",
			[varName("text-color-hover")]: varRef("text-color"),
			[varName("text-color-active")]: varRef("text-color"),
			[varName("text-color-disabled")]: varRef("text-color"),
			[varName("bg-color")]: "#ddd",
			[varName("bg-color-hover")]: varRef("bg-color"),
			[varName("bg-color-active")]: varRef("bg-color"),
			[varName("bg-color-disabled")]: token.colorBgContainerDisabled,
			[varName("bg-color-container")]: token.colorBgContainer,
			[varName("shadow")]: "none"
		},
		{
			border: [
				varRef("border-width"),
				varRef("border-style"),
				varRef("border-color")
			].join(" "),
			color: varRef("text-color"),
			backgroundColor: varRef("bg-color"),
			[`&:not(:disabled):not(${componentCls}-disabled)`]: {
				"&:hover": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-hover")
					].join(" "),
					color: varRef("text-color-hover"),
					backgroundColor: varRef("bg-color-hover")
				},
				"&:active": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-active")
					].join(" "),
					color: varRef("text-color-active"),
					backgroundColor: varRef("bg-color-active")
				}
			}
		},
		{
			[`&${componentCls}-variant-solid`]: {
				[varName("solid-bg-color")]: varRef("color-base"),
				[varName("solid-bg-color-hover")]: varRef("color-hover"),
				[varName("solid-bg-color-active")]: varRef("color-active"),
				[varName("border-color")]: "transparent",
				[varName("text-color")]: token.colorTextLightSolid,
				[varName("bg-color")]: varRef("solid-bg-color"),
				[varName("bg-color-hover")]: varRef("solid-bg-color-hover"),
				[varName("bg-color-active")]: varRef("solid-bg-color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("border-color")]: varRef("color-base"),
				[varName("border-color-hover")]: varRef("color-hover"),
				[varName("border-color-active")]: varRef("color-active"),
				[varName("bg-color")]: varRef("bg-color-container"),
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-dashed`]: {
				[varName("border-style")]: "dashed",
				[varName("bg-color-disabled")]: token.dashedBgDisabled
			},
			[`&${componentCls}-variant-filled`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("bg-color")]: varRef("color-light"),
				[varName("bg-color-hover")]: varRef("color-light-hover"),
				[varName("bg-color-active")]: varRef("color-light-active")
			},
			[`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				[varName("bg-color")]: "transparent",
				[varName("bg-color-hover")]: "transparent",
				[varName("bg-color-active")]: "transparent",
				[`&:disabled, &${token.componentCls}-disabled`]: {
					background: "transparent",
					borderColor: "transparent"
				}
			},
			[`&${componentCls}-variant-text`]: {
				[varName("bg-color-hover")]: varRef("color-light"),
				[varName("bg-color-active")]: varRef("color-light-active")
			}
		},
		{
			[`&${componentCls}-variant-link`]: {
				[varName("color-base")]: token.colorLink,
				[varName("color-hover")]: token.colorLinkHover,
				[varName("color-active")]: token.colorLinkActive,
				[varName("bg-color-hover")]: token.linkHoverBg
			},
			[`&${componentCls}-color-primary`]: {
				[varName("color-base")]: token.colorPrimary,
				[varName("color-hover")]: token.colorPrimaryHover,
				[varName("color-active")]: token.colorPrimaryActive,
				[varName("color-light")]: token.colorPrimaryBg,
				[varName("color-light-hover")]: token.colorPrimaryBgHover,
				[varName("color-light-active")]: token.colorPrimaryBorder,
				[varName("shadow")]: token.primaryShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.primaryColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-dangerous`]: {
				[varName("color-base")]: token.colorError,
				[varName("color-hover")]: token.colorErrorHover,
				[varName("color-active")]: token.colorErrorActive,
				[varName("color-light")]: token.colorErrorBg,
				[varName("color-light-hover")]: token.colorErrorBgFilledHover,
				[varName("color-light-active")]: token.colorErrorBgActive,
				[varName("shadow")]: token.dangerShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.dangerColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-default`]: {
				[varName("solid-bg-color")]: token.colorBgSolid,
				[varName("solid-bg-color-hover")]: token.colorBgSolidHover,
				[varName("solid-bg-color-active")]: token.colorBgSolidActive,
				[varName("color-base")]: token.defaultBorderColor,
				[varName("color-hover")]: token.defaultHoverBorderColor,
				[varName("color-active")]: token.defaultActiveBorderColor,
				[varName("color-light")]: token.colorFillTertiary,
				[varName("color-light-hover")]: token.colorFillSecondary,
				[varName("color-light-active")]: token.colorFill,
				[varName("text-color")]: token.defaultColor,
				[varName("text-color-hover")]: token.defaultHoverColor,
				[varName("text-color-active")]: token.defaultActiveColor,
				[varName("shadow")]: token.defaultShadow,
				[`&${componentCls}-variant-outlined`]: { [varName("bg-color-disabled")]: token.defaultBgDisabled },
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.solidTextColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultColor,
					[varName("text-color-hover")]: token.defaultHoverColor,
					[varName("text-color-active")]: token.defaultActiveColor,
					[varName("bg-color-container")]: token.defaultBg,
					[varName("bg-color-hover")]: token.defaultHoverBg,
					[varName("bg-color-active")]: token.defaultActiveBg
				},
				[`&${componentCls}-variant-text`]: {
					[varName("text-color")]: token.textTextColor,
					[varName("text-color-hover")]: token.textTextHoverColor,
					[varName("text-color-active")]: token.textTextActiveColor,
					[varName("bg-color-hover")]: token.textHoverBg
				},
				[`&${componentCls}-background-ghost`]: { [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultGhostColor,
					[varName("border-color")]: token.defaultGhostBorderColor
				} }
			}
		},
		PresetColors.map((colorKey) => {
			const darkColor = token[`${colorKey}6`];
			const lightColor = token[`${colorKey}1`];
			const hoverColor = token[`${colorKey}Hover`];
			const lightHoverColor = token[`${colorKey}2`];
			const lightActiveColor = token[`${colorKey}3`];
			const activeColor = token[`${colorKey}Active`];
			const shadowColor = token[`${colorKey}ShadowColor`];
			return { [`&${componentCls}-color-${colorKey}`]: {
				[varName("color-base")]: darkColor,
				[varName("color-hover")]: hoverColor,
				[varName("color-active")]: activeColor,
				[varName("color-light")]: lightColor,
				[varName("color-light-hover")]: lightHoverColor,
				[varName("color-light-active")]: lightActiveColor,
				[varName("shadow")]: shadowColor
			} };
		}),
		{ [`&:disabled, &${token.componentCls}-disabled`]: {
			cursor: "not-allowed",
			borderColor: token.colorBorderDisabled,
			background: varRef("bg-color-disabled"),
			color: token.colorTextDisabled,
			boxShadow: "none"
		} },
		{ [`&${componentCls}-background-ghost`]: {
			[varName("bg-color")]: token.ghostBg,
			[varName("bg-color-hover")]: token.ghostBg,
			[varName("bg-color-active")]: token.ghostBg,
			[varName("shadow")]: "none",
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("bg-color-hover")]: token.ghostBg,
				[varName("bg-color-active")]: token.ghostBg
			}
		} }
	] };
};
//#endregion
//#region node_modules/antd/es/button/style/index.js
var genSharedButtonStyle = (token) => {
	const { componentCls, iconCls, fontWeight, opacityLoading, motionDurationSlow, motionEaseInOut, iconGap, calc } = token;
	return { [componentCls]: {
		outline: "none",
		position: "relative",
		display: "inline-flex",
		gap: iconGap,
		alignItems: "center",
		justifyContent: "center",
		fontWeight,
		whiteSpace: "nowrap",
		textAlign: "center",
		backgroundImage: "none",
		cursor: "pointer",
		transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		...genNoMotionStyle(),
		"&:disabled > *": { pointerEvents: "none" },
		[`${componentCls}-icon > svg`]: resetIcon(),
		[`${componentCls}-icon`]: {
			display: "inline-flex",
			alignItems: "center",
			[iconCls]: {
				verticalAlign: "middle",
				"&:before": {
					content: "\"\\a0\"",
					display: "inline-block",
					width: 0
				}
			}
		},
		"> a": { color: "currentColor" },
		"&:not(:disabled)": genFocusStyle(token),
		[`&${componentCls}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
		[`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
			marginInlineEnd: "-0.34em",
			letterSpacing: "0.34em"
		},
		[`&${componentCls}-icon-only`]: {
			paddingInline: 0,
			[`&${componentCls}-compact-item`]: { flex: "none" }
		},
		[`&${componentCls}-loading`]: {
			opacity: opacityLoading,
			cursor: "default"
		},
		[`${componentCls}-loading-icon`]: { transition: [
			"width",
			"opacity",
			"margin"
		].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") },
		[`&:not(${componentCls}-icon-end)`]: { [`${componentCls}-loading-icon-motion`]: {
			"&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
				marginInlineEnd: calc(iconGap).mul(-1).equal(),
				opacity: 0
			},
			"&-appear-active, &-enter-active": { marginInlineEnd: 0 },
			"&-leave-start": { marginInlineEnd: 0 },
			"&-leave-active": { marginInlineEnd: calc(iconGap).mul(-1).equal() }
		} },
		"&-icon-end": {
			flexDirection: "row-reverse",
			[`${componentCls}-loading-icon-motion`]: {
				"&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
					marginInlineStart: calc(iconGap).mul(-1).equal(),
					opacity: 0
				},
				"&-appear-active, &-enter-active": { marginInlineStart: 0 },
				"&-leave-start": { marginInlineStart: 0 },
				"&-leave-active": { marginInlineStart: calc(iconGap).mul(-1).equal() }
			}
		}
	} };
};
var genCircleButtonStyle = (token) => ({
	minWidth: token.controlHeight,
	paddingInline: 0,
	borderRadius: "50%"
});
var genButtonStyle = (token, prefixCls = "") => {
	const { componentCls, controlHeight, fontSize, borderRadius, buttonPaddingHorizontal, iconCls, buttonPaddingVertical, buttonIconOnlyFontSize } = token;
	return [
		{ [prefixCls]: {
			fontSize,
			height: controlHeight,
			padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
			borderRadius,
			[`&${componentCls}-icon-only`]: {
				width: controlHeight,
				[iconCls]: { fontSize: buttonIconOnlyFontSize }
			}
		} },
		{ [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token) },
		{ [`${componentCls}${componentCls}-round${prefixCls}`]: {
			borderRadius: token.controlHeight,
			[`&:not(${componentCls}-icon-only)`]: { paddingInline: token.buttonPaddingHorizontal }
		} }
	];
};
var genSizeBaseButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, { fontSize: token.contentFontSize }), token.componentCls);
};
var genSizeSmallButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, {
		controlHeight: token.controlHeightSM,
		fontSize: token.contentFontSizeSM,
		padding: token.paddingXS,
		buttonPaddingHorizontal: token.paddingInlineSM,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusSM,
		buttonIconOnlyFontSize: token.onlyIconSizeSM
	}), `${token.componentCls}-sm`);
};
var genSizeLargeButtonStyle = (token) => {
	return genButtonStyle(merge$1(token, {
		controlHeight: token.controlHeightLG,
		fontSize: token.contentFontSizeLG,
		buttonPaddingHorizontal: token.paddingInlineLG,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusLG,
		buttonIconOnlyFontSize: token.onlyIconSizeLG
	}), `${token.componentCls}-lg`);
};
var genBlockButtonStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: { [`&${componentCls}-block`]: { width: "100%" } } };
};
var style_default$7 = genStyleHooks("Button", (token) => {
	const buttonToken = prepareToken$2(token);
	return [
		genSharedButtonStyle(buttonToken),
		genSizeBaseButtonStyle(buttonToken),
		genSizeSmallButtonStyle(buttonToken),
		genSizeLargeButtonStyle(buttonToken),
		genBlockButtonStyle(buttonToken),
		genVariantStyle(buttonToken),
		genGroupStyle$1(buttonToken)
	];
}, prepareComponentToken$5, { unitless: {
	fontWeight: true,
	contentLineHeight: true,
	contentLineHeightSM: true,
	contentLineHeightLG: true
} });
//#endregion
//#region node_modules/antd/es/style/compact-item.js
function compactItemBorder(token, parentCls, options, prefixCls) {
	const { focusElCls, focus, borderElCls } = options;
	const childCombinator = borderElCls ? "> *" : "";
	const suffix = childCombinator ? ` ${childCombinator}` : "";
	const genEffects = (effects) => effects.filter(Boolean).map((n) => `&:${n}${suffix}`).join(",");
	const hoverEffects = genEffects(["hover", focusElCls ? `hover${focusElCls}` : null]);
	const focusEffects = genEffects([focus ? "focus" : null, "active"]);
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": {
			[focusEffects]: { zIndex: 3 },
			[hoverEffects]: { zIndex: 4 },
			...focusElCls ? { [`&${focusElCls}`]: { zIndex: 3 } } : {},
			[`&[disabled] ${childCombinator}`]: { zIndex: 0 }
		}
	};
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
	const { borderElCls } = options;
	const childCombinator = borderElCls ? `> ${borderElCls}` : "";
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: { borderRadius: 0 },
		[`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0
		} },
		[`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0
		} }
	};
}
function genCompactItemStyle(token, options = { focus: true }) {
	const { componentCls } = token;
	const { componentCls: customizePrefixCls } = options;
	const mergedComponentCls = customizePrefixCls || componentCls;
	const compactCls = `${mergedComponentCls}-compact`;
	return { [compactCls]: {
		...compactItemBorder(token, compactCls, options, mergedComponentCls),
		...compactItemBorderRadius(mergedComponentCls, compactCls, options)
	} };
}
//#endregion
//#region node_modules/antd/es/style/compact-item-vertical.js
function compactItemVerticalBorder(token, parentCls, prefixCls) {
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginBottom: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": {
			"&:focus,&:active": { zIndex: 3 },
			"&:hover": { zIndex: 4 },
			"&[disabled]": { zIndex: 0 }
		}
	};
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: { borderRadius: 0 },
		[`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderEndEndRadius: 0,
			borderEndStartRadius: 0
		} },
		[`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0
		} }
	};
}
function genCompactItemVerticalStyle(token) {
	const compactCls = `${token.componentCls}-compact-vertical`;
	return { [compactCls]: {
		...compactItemVerticalBorder(token, compactCls, token.componentCls),
		...compactItemBorderVerticalRadius(token.componentCls, compactCls)
	} };
}
//#endregion
//#region node_modules/antd/es/button/style/compact.js
var genButtonCompactStyle = (token) => {
	const { antCls, componentCls, lineWidth, calc, colorBgContainer } = token;
	const solidSelector = `${componentCls}-variant-solid:not([disabled])`;
	const insetOffset = calc(lineWidth).mul(-1).equal();
	const [varName, varRef] = genCssVar(antCls, "btn");
	const getCompactBorderStyle = (vertical) => {
		return { [`${componentCls}-compact${vertical ? "-vertical" : ""}-item`]: {
			[varName("compact-connect-border-color")]: varRef("bg-color-hover"),
			[`&${solidSelector}`]: {
				transition: `none`,
				[`& + ${solidSelector}:before`]: [{
					position: "absolute",
					backgroundColor: varRef("compact-connect-border-color"),
					content: "\"\""
				}, vertical ? {
					top: insetOffset,
					insetInline: insetOffset,
					height: lineWidth
				} : {
					insetBlock: insetOffset,
					insetInlineStart: insetOffset,
					width: lineWidth
				}],
				"&:hover:before": { display: "none" }
			}
		} };
	};
	return [
		getCompactBorderStyle(),
		getCompactBorderStyle(true),
		{ [`${solidSelector}${componentCls}-color-default`]: { [varName("compact-connect-border-color")]: `color-mix(in srgb, ${varRef("bg-color-hover")} 75%, ${colorBgContainer})` } }
	];
};
var compact_default = genSubStyleComponent(["Button", "compact"], (token) => {
	const buttonToken = prepareToken$2(token);
	return [
		genCompactItemStyle(buttonToken),
		genCompactItemVerticalStyle(buttonToken),
		genButtonCompactStyle(buttonToken)
	];
}, prepareComponentToken$5);
//#endregion
//#region node_modules/antd/es/button/Button.js
function getLoadingConfig(loading) {
	if (isPlainObject(loading)) {
		let delay = loading?.delay;
		delay = isNumber(delay) ? delay : 0;
		return {
			loading: delay <= 0,
			delay
		};
	}
	return {
		loading: !!loading,
		delay: 0
	};
}
var ButtonTypeMap = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
};
var Button = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { _skipSemantic, loading = false, prefixCls: customizePrefixCls, color, variant, type, danger = false, shape: customizeShape, size: customizeSize, disabled: customDisabled, className, rootClassName, children, icon, iconPosition, iconPlacement, ghost = false, block = false, htmlType = "button", classNames, styles, style, autoInsertSpace, autoFocus, ...rest } = props;
	const childNodes = toArray$1(children);
	const mergedType = type || "default";
	const { getPrefixCls, direction, autoInsertSpace: contextAutoInsertSpace, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, loadingIcon: contextLoadingIcon, shape: contextShape, color: contextColor, variant: contextVariant } = useComponentConfig("button");
	const mergedShape = customizeShape || contextShape || "default";
	const [parsedColor, parsedVariant] = (0, import_react.useMemo)(() => {
		if (color && variant) return [color, variant];
		if (type || danger) {
			const colorVariantPair = ButtonTypeMap[mergedType] || [];
			if (danger) return ["danger", colorVariantPair[1]];
			return colorVariantPair;
		}
		if (variant === "solid") return ["primary", variant];
		if (contextColor && contextVariant) return [contextColor, contextVariant];
		if (contextVariant === "solid") return ["primary", contextVariant];
		return ["default", "outlined"];
	}, [
		color,
		variant,
		type,
		danger,
		contextColor,
		contextVariant,
		mergedType
	]);
	const [mergedColor, mergedVariant] = (0, import_react.useMemo)(() => {
		if (ghost && parsedVariant === "solid") return [parsedColor, "outlined"];
		return [parsedColor, parsedVariant];
	}, [
		parsedColor,
		parsedVariant,
		ghost
	]);
	const isDanger = mergedColor === "danger";
	const mergedColorText = isDanger ? "dangerous" : mergedColor;
	const mergedInsertSpace = autoInsertSpace ?? contextAutoInsertSpace ?? true;
	const prefixCls = getPrefixCls("btn", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$7(prefixCls);
	const disabled = (0, import_react.useContext)(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const groupSize = (0, import_react.useContext)(GroupSizeContext);
	const loadingOrDelay = (0, import_react.useMemo)(() => getLoadingConfig(loading), [loading]);
	const [innerLoading, setInnerLoading] = useDelayState(loadingOrDelay.loading);
	const [hasTwoCNChar, setHasTwoCNChar] = (0, import_react.useState)(false);
	const buttonRef = (0, import_react.useRef)(null);
	const mergedRef = useComposeRef(ref, buttonRef);
	const needInserted = childNodes.length === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);
	const isMountRef = (0, import_react.useRef)(true);
	import_react.useEffect(() => {
		isMountRef.current = false;
		return () => {
			isMountRef.current = true;
		};
	}, []);
	useLayoutEffect(() => {
		if (loadingOrDelay.delay > 0) setInnerLoading(true, { ms: loadingOrDelay.delay });
		else setInnerLoading(loadingOrDelay.loading, true);
	}, [loadingOrDelay.delay, loadingOrDelay.loading]);
	(0, import_react.useEffect)(() => {
		if (!buttonRef.current || !mergedInsertSpace) return;
		const buttonText = buttonRef.current.textContent || "";
		if (needInserted && isTwoCNChar(buttonText)) {
			if (!hasTwoCNChar) setHasTwoCNChar(true);
		} else if (hasTwoCNChar) setHasTwoCNChar(false);
	});
	(0, import_react.useEffect)(() => {
		if (autoFocus) buttonRef.current?.focus();
	}, []);
	const handleClick = import_react.useCallback((e) => {
		if (innerLoading || mergedDisabled) {
			e.preventDefault();
			return;
		}
		props.onClick?.("href" in props ? e : e);
	}, [
		props.onClick,
		innerLoading,
		mergedDisabled
	]);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const sizeFullName = useSize((ctxSize) => customizeSize ?? compactSize ?? groupSize ?? ctxSize);
	const iconType = innerLoading ? "loading" : icon;
	const mergedIconPlacement = iconPlacement ?? iconPosition ?? "start";
	const linkButtonRestProps = omit(rest, ["navigate"]);
	const mergedProps = {
		...props,
		type: mergedType,
		color: mergedColor,
		variant: mergedVariant,
		danger: isDanger,
		shape: mergedShape,
		size: sizeFullName,
		disabled: mergedDisabled,
		loading: innerLoading,
		iconPlacement: mergedIconPlacement
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([_skipSemantic ? void 0 : contextClassNames, classNames], [
		_skipSemantic ? void 0 : contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const classes = clsx(prefixCls, hashId, cssVarCls, {
		[`${prefixCls}-${mergedShape}`]: mergedShape !== "default" && mergedShape !== "square" && mergedShape,
		[`${prefixCls}-${mergedType}`]: mergedType,
		[`${prefixCls}-dangerous`]: danger,
		[`${prefixCls}-color-${mergedColorText}`]: mergedColorText,
		[`${prefixCls}-variant-${mergedVariant}`]: mergedVariant,
		[`${prefixCls}-lg`]: sizeFullName === "large",
		[`${prefixCls}-sm`]: sizeFullName === "small",
		[`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
		[`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(mergedVariant),
		[`${prefixCls}-loading`]: innerLoading,
		[`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && mergedInsertSpace && !innerLoading,
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-icon-end`]: mergedIconPlacement === "end"
	}, compactItemClassnames, className, rootClassName, contextClassName, mergedClassNames.root);
	const iconSharedProps = {
		className: mergedClassNames.icon,
		style: mergedStyles.icon
	};
	/**
	* Extract icon node
	* If there is a custom icon and not in loading state: show custom icon
	*/
	const iconWrapperElement = (child) => /*#__PURE__*/ import_react.createElement(IconWrapper, {
		prefixCls,
		...iconSharedProps
	}, child);
	const defaultLoadingIconElement = /*#__PURE__*/ import_react.createElement(DefaultLoadingIcon, {
		existIcon: !!icon,
		prefixCls,
		loading: innerLoading,
		mount: isMountRef.current,
		...iconSharedProps
	});
	const mergedLoadingIcon = isPlainObject(loading) ? loading.icon || contextLoadingIcon : contextLoadingIcon;
	/**
	* Using if-else statements can improve code readability without affecting future expansion.
	*/
	let iconNode;
	if (icon && !innerLoading) iconNode = iconWrapperElement(icon);
	else if (loading && mergedLoadingIcon) iconNode = iconWrapperElement(mergedLoadingIcon);
	else iconNode = defaultLoadingIconElement;
	const contentNode = isReactRenderable(children) ? spaceChildren(children, needInserted && mergedInsertSpace, mergedStyles.content, mergedClassNames.content) : null;
	if (linkButtonRestProps.href !== void 0) return /*#__PURE__*/ import_react.createElement("a", {
		...linkButtonRestProps,
		className: clsx(classes, { [`${prefixCls}-disabled`]: mergedDisabled }),
		href: mergedDisabled ? void 0 : linkButtonRestProps.href,
		style: mergedStyles.root,
		onClick: handleClick,
		ref: mergedRef,
		tabIndex: mergedDisabled ? -1 : 0,
		"aria-disabled": mergedDisabled
	}, iconNode, contentNode);
	let buttonNode = /*#__PURE__*/ import_react.createElement("button", {
		...rest,
		type: htmlType,
		className: classes,
		style: mergedStyles.root,
		onClick: handleClick,
		disabled: mergedDisabled,
		ref: mergedRef
	}, iconNode, contentNode, compactItemClassnames && /*#__PURE__*/ import_react.createElement(compact_default, { prefixCls }));
	if (!isUnBorderedButtonVariant(mergedVariant)) buttonNode = /*#__PURE__*/ import_react.createElement(Wave, {
		component: "Button",
		disabled: innerLoading
	}, buttonNode);
	return buttonNode;
});
Button.Group = ButtonGroup;
Button.__ANT_BUTTON = true;
//#endregion
//#region node_modules/antd/es/_util/ActionButton.js
var ActionButton = (props) => {
	const { type, children, prefixCls, buttonProps, close, autoFocus, emitEvent, isSilent, quitOnNullishReturnValue, actionFn } = props;
	const clickedRef = import_react.useRef(false);
	const buttonRef = import_react.useRef(null);
	const [loading, setLoading] = useSafeState(false);
	const onInternalClose = (...args) => {
		close?.(...args);
	};
	import_react.useEffect(() => {
		let timeoutId = null;
		if (autoFocus) timeoutId = setTimeout(() => {
			buttonRef.current?.focus({ preventScroll: true });
		});
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [autoFocus]);
	const handlePromiseOnOk = (returnValueOfOnOk) => {
		if (!isThenable(returnValueOfOnOk)) return;
		setLoading(true);
		returnValueOfOnOk.then((...args) => {
			setLoading(false, true);
			onInternalClose.apply(void 0, args);
			clickedRef.current = false;
		}, (e) => {
			setLoading(false, true);
			clickedRef.current = false;
			if (isSilent?.()) return;
			return Promise.reject(e);
		});
	};
	const onClick = (e) => {
		if (clickedRef.current) return;
		clickedRef.current = true;
		if (!actionFn) {
			onInternalClose();
			return;
		}
		let returnValueOfOnOk;
		if (emitEvent) {
			returnValueOfOnOk = actionFn(e);
			if (quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
				clickedRef.current = false;
				onInternalClose(e);
				return;
			}
		} else if (actionFn.length) {
			returnValueOfOnOk = actionFn(close);
			clickedRef.current = false;
		} else {
			returnValueOfOnOk = actionFn();
			if (!isThenable(returnValueOfOnOk)) {
				onInternalClose();
				return;
			}
		}
		handlePromiseOnOk(returnValueOfOnOk);
	};
	return /*#__PURE__*/ import_react.createElement(Button, {
		...convertLegacyProps(type),
		onClick,
		loading,
		prefixCls,
		...buttonProps,
		ref: buttonRef
	}, children);
};
//#endregion
//#region node_modules/antd/es/modal/context.js
var ModalContext = /*#__PURE__*/ import_react.createContext({});
var { Provider: ModalContextProvider } = ModalContext;
//#endregion
//#region node_modules/antd/es/modal/components/ConfirmCancelBtn.js
var ConfirmCancelBtn = () => {
	const { autoFocusButton, cancelButtonProps, cancelTextLocale, isSilent, mergedOkCancel, rootPrefixCls, close, onCancel, onConfirm, onClose } = (0, import_react.useContext)(ModalContext);
	return mergedOkCancel ? /*#__PURE__*/ import_react.createElement(ActionButton, {
		isSilent,
		actionFn: onCancel,
		close: (...args) => {
			close?.(...args);
			onConfirm?.(false);
			onClose?.();
		},
		autoFocus: autoFocusButton === "cancel",
		buttonProps: cancelButtonProps,
		prefixCls: `${rootPrefixCls}-btn`
	}, cancelTextLocale) : null;
};
//#endregion
//#region node_modules/antd/es/modal/components/ConfirmOkBtn.js
var ConfirmOkBtn = () => {
	const { autoFocusButton, close, isSilent, okButtonProps, rootPrefixCls, okTextLocale, okType, onConfirm, onOk, onClose } = (0, import_react.useContext)(ModalContext);
	return /*#__PURE__*/ import_react.createElement(ActionButton, {
		isSilent,
		type: okType || "primary",
		actionFn: onOk,
		close: (...args) => {
			close?.(...args);
			onConfirm?.(true);
			onClose?.();
		},
		autoFocus: autoFocusButton === "ok",
		buttonProps: okButtonProps,
		prefixCls: `${rootPrefixCls}-btn`
	}, okTextLocale);
};
//#endregion
//#region node_modules/antd/es/form/context.js
var FormContext = /*#__PURE__*/ import_react.createContext({
	labelAlign: "right",
	layout: "horizontal",
	itemRef: () => {}
});
var NoStyleItemContext = /*#__PURE__*/ import_react.createContext(null);
var FormProvider = (props) => {
	const providerProps = omit(props, ["prefixCls"]);
	return /*#__PURE__*/ import_react.createElement(FormProvider$1, { ...providerProps });
};
var FormItemPrefixContext = /*#__PURE__*/ import_react.createContext({ prefixCls: "" });
var FormItemInputContext = /*#__PURE__*/ import_react.createContext({});
var NoFormStyle = ({ children, status, override }) => {
	const formItemInputContext = import_react.useContext(FormItemInputContext);
	const newFormItemInputContext = import_react.useMemo(() => {
		const newContext = { ...formItemInputContext };
		if (override) delete newContext.isFormItemInput;
		if (status) {
			delete newContext.status;
			delete newContext.hasFeedback;
			delete newContext.feedbackIcon;
		}
		return newContext;
	}, [
		status,
		override,
		formItemInputContext
	]);
	return /*#__PURE__*/ import_react.createElement(FormItemInputContext.Provider, { value: newFormItemInputContext }, children);
};
var VariantContext = /*#__PURE__*/ import_react.createContext(void 0);
//#endregion
//#region node_modules/antd/es/_util/ContextIsolator.js
var ContextIsolator = (props) => {
	const { space, form, children } = props;
	if (!isReactRenderable(children)) return null;
	let result = children;
	if (form) result = /*#__PURE__*/ import_react.createElement(NoFormStyle, {
		override: true,
		status: true
	}, result);
	if (space) result = /*#__PURE__*/ import_react.createElement(NoCompactStyle, null, result);
	return result;
};
//#endregion
//#region node_modules/antd/es/_util/styleChecker.js
var canUseDocElement = () => canUseDom() && window.document.documentElement;
//#endregion
//#region node_modules/antd/es/drawer/useFocusable.js
function useFocusable(focusable, defaultTrap, legacyFocusTriggerAfterClose) {
	return (0, import_react.useMemo)(() => {
		return {
			trap: defaultTrap ?? true,
			focusTriggerAfterClose: legacyFocusTriggerAfterClose ?? true,
			...focusable
		};
	}, [
		focusable,
		defaultTrap,
		legacyFocusTriggerAfterClose
	]);
}
//#endregion
//#region node_modules/antd/es/skeleton/Element.js
var Element = (props) => {
	const { prefixCls, className, style, size, shape } = props;
	const sizeCls = clsx({
		[`${prefixCls}-lg`]: size === "large",
		[`${prefixCls}-sm`]: size === "small"
	});
	const shapeCls = clsx({
		[`${prefixCls}-circle`]: shape === "circle",
		[`${prefixCls}-square`]: shape === "square",
		[`${prefixCls}-round`]: shape === "round"
	});
	const sizeStyle = import_react.useMemo(() => isNumber(size) ? {
		width: size,
		height: size,
		lineHeight: `${size}px`
	} : {}, [size]);
	return /*#__PURE__*/ import_react.createElement("span", {
		className: clsx(prefixCls, sizeCls, shapeCls, className),
		style: {
			...sizeStyle,
			...style
		}
	});
};
//#endregion
//#region node_modules/antd/es/skeleton/style/index.js
var skeletonClsLoading = new Keyframe(`ant-skeleton-loading`, {
	"0%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0 50%" }
});
var genSkeletonElementCommonSize = (size) => ({
	height: size,
	lineHeight: unit(size)
});
var genSkeletonElementSize = (size) => ({
	width: size,
	...genSkeletonElementCommonSize(size)
});
var genSkeletonColor = (token) => ({
	background: token.skeletonLoadingBackground,
	backgroundSize: "400% 100%",
	animationName: skeletonClsLoading,
	animationDuration: token.skeletonLoadingMotionDuration,
	animationTimingFunction: "ease",
	animationIterationCount: "infinite"
});
var genSkeletonElementInputSize = (size, calc) => ({
	width: calc(size).mul(5).equal(),
	minWidth: calc(size).mul(5).equal(),
	...genSkeletonElementCommonSize(size)
});
var genSkeletonElementAvatar = (token) => {
	const { skeletonAvatarCls, gradientFromColor, controlHeight, controlHeightLG, controlHeightSM } = token;
	return {
		[skeletonAvatarCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			...genSkeletonElementSize(controlHeight)
		},
		[`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
	};
};
var genSkeletonElementInput = (token) => {
	const { controlHeight, borderRadiusSM, skeletonInputCls, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonInputCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			...genSkeletonElementInputSize(controlHeight, calc)
		},
		[`${skeletonInputCls}-lg`]: { ...genSkeletonElementInputSize(controlHeightLG, calc) },
		[`${skeletonInputCls}-sm`]: { ...genSkeletonElementInputSize(controlHeightSM, calc) }
	};
};
var genSkeletonElementShape = (token) => {
	const { gradientFromColor, borderRadiusSM, imageSizeBase, calc } = token;
	return {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		background: gradientFromColor,
		borderRadius: borderRadiusSM,
		...genSkeletonElementSize(calc(imageSizeBase).mul(2).equal())
	};
};
var genSkeletonElementNode = (token) => {
	return { [token.skeletonNodeCls]: { ...genSkeletonElementShape(token) } };
};
var genSkeletonElementImage = (token) => {
	const { skeletonImageCls, imageSizeBase, calc } = token;
	return {
		[skeletonImageCls]: {
			...genSkeletonElementShape(token),
			[`${skeletonImageCls}-path`]: { fill: "#bfbfbf" },
			[`${skeletonImageCls}-svg`]: {
				...genSkeletonElementSize(imageSizeBase),
				maxWidth: calc(imageSizeBase).mul(4).equal(),
				maxHeight: calc(imageSizeBase).mul(4).equal()
			},
			[`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: { borderRadius: "50%" }
		},
		[`${skeletonImageCls}${skeletonImageCls}-circle`]: { borderRadius: "50%" }
	};
};
var genSkeletonElementButtonShape = (token, size, buttonCls) => {
	const { skeletonButtonCls } = token;
	return {
		[`${buttonCls}${skeletonButtonCls}-circle`]: {
			width: size,
			minWidth: size,
			borderRadius: "50%"
		},
		[`${buttonCls}${skeletonButtonCls}-round`]: { borderRadius: size }
	};
};
var genSkeletonElementButtonSize = (size, calc) => ({
	width: calc(size).mul(2).equal(),
	minWidth: calc(size).mul(2).equal(),
	...genSkeletonElementCommonSize(size)
});
var genSkeletonElementButton = (token) => {
	const { borderRadiusSM, skeletonButtonCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonButtonCls]: {
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM,
			width: calc(controlHeight).mul(2).equal(),
			minWidth: calc(controlHeight).mul(2).equal(),
			...genSkeletonElementButtonSize(controlHeight, calc)
		},
		...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),
		[`${skeletonButtonCls}-lg`]: { ...genSkeletonElementButtonSize(controlHeightLG, calc) },
		...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),
		[`${skeletonButtonCls}-sm`]: { ...genSkeletonElementButtonSize(controlHeightSM, calc) },
		...genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`)
	};
};
var genBaseStyle = (token) => {
	const { componentCls, skeletonAvatarCls, skeletonTitleCls, skeletonParagraphCls, skeletonButtonCls, skeletonInputCls, skeletonNodeCls, skeletonImageCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, padding, marginSM, borderRadius, titleHeight, blockRadius, paragraphLiHeight, controlHeightXS, paragraphMarginTop } = token;
	return {
		[componentCls]: {
			display: "table",
			width: "100%",
			[`${componentCls}-header`]: {
				display: "table-cell",
				paddingInlineEnd: padding,
				verticalAlign: "top",
				[skeletonAvatarCls]: {
					display: "inline-block",
					verticalAlign: "top",
					background: gradientFromColor,
					...genSkeletonElementSize(controlHeight)
				},
				[`${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
				[`${skeletonAvatarCls}-lg`]: { ...genSkeletonElementSize(controlHeightLG) },
				[`${skeletonAvatarCls}-sm`]: { ...genSkeletonElementSize(controlHeightSM) }
			},
			[`${componentCls}-section`]: {
				display: "table-cell",
				width: "100%",
				verticalAlign: "top",
				[skeletonTitleCls]: {
					width: "100%",
					height: titleHeight,
					background: gradientFromColor,
					borderRadius: blockRadius,
					[`+ ${skeletonParagraphCls}`]: { marginBlockStart: controlHeightSM }
				},
				[skeletonParagraphCls]: {
					padding: 0,
					"> li": {
						width: "100%",
						height: paragraphLiHeight,
						listStyle: "none",
						background: gradientFromColor,
						borderRadius: blockRadius,
						"+ li": { marginBlockStart: controlHeightXS }
					}
				},
				[`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" }
			},
			[`&-round ${componentCls}-section`]: { [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: { borderRadius } }
		},
		[`${componentCls}-with-avatar ${componentCls}-section`]: { [skeletonTitleCls]: {
			marginBlockStart: marginSM,
			[`+ ${skeletonParagraphCls}`]: { marginBlockStart: paragraphMarginTop }
		} },
		[`${componentCls}${componentCls}-element`]: {
			display: "inline-block",
			width: "auto",
			...genSkeletonElementButton(token),
			...genSkeletonElementAvatar(token),
			...genSkeletonElementInput(token),
			...genSkeletonElementNode(token),
			...genSkeletonElementImage(token)
		},
		[`${componentCls}${componentCls}-block`]: {
			width: "100%",
			[skeletonButtonCls]: { width: "100%" },
			[skeletonInputCls]: { width: "100%" }
		},
		[`${componentCls}${componentCls}-active`]: { [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonNodeCls},
        ${skeletonImageCls}
      `]: { ...genSkeletonColor(token) } }
	};
};
var prepareComponentToken$4 = (token) => {
	const { colorFillContent, colorFill } = token;
	const gradientFromColor = colorFillContent;
	const gradientToColor = colorFill;
	return {
		color: gradientFromColor,
		colorGradientEnd: gradientToColor,
		gradientFromColor,
		gradientToColor,
		titleHeight: token.controlHeight / 2,
		blockRadius: token.borderRadiusSM,
		paragraphMarginTop: token.marginLG + token.marginXXS,
		paragraphLiHeight: token.controlHeight / 2
	};
};
var style_default$6 = genStyleHooks("Skeleton", (token) => {
	const { componentCls, calc } = token;
	return genBaseStyle(merge$1(token, {
		skeletonAvatarCls: `${componentCls}-avatar`,
		skeletonTitleCls: `${componentCls}-title`,
		skeletonParagraphCls: `${componentCls}-paragraph`,
		skeletonButtonCls: `${componentCls}-button`,
		skeletonInputCls: `${componentCls}-input`,
		skeletonNodeCls: `${componentCls}-node`,
		skeletonImageCls: `${componentCls}-image`,
		imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
		borderRadius: 100,
		skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
		skeletonLoadingMotionDuration: "1.4s"
	}));
}, prepareComponentToken$4, { deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]] });
//#endregion
//#region node_modules/antd/es/skeleton/Avatar.js
var SkeletonAvatar = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, active, style, styles, shape = "circle", size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$6(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /*#__PURE__*/ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /*#__PURE__*/ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-avatar`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		shape,
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Button.js
var SkeletonButton = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, classNames, active, style, styles, block = false, size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$6(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /*#__PURE__*/ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /*#__PURE__*/ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-button`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Node.js
var SkeletonNode = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, internalClassName, style, styles, active, children } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$6(prefixCls);
	const cls = clsx(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, hashId, classNames?.root, className, rootClassName, cssVarCls);
	return /*#__PURE__*/ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(classNames?.content, internalClassName || `${prefixCls}-node`),
		style: {
			...styles?.content,
			...style
		}
	}, children));
};
//#endregion
//#region node_modules/antd/es/skeleton/Image.js
var SkeletonImage = (props) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", props.prefixCls);
	return /*#__PURE__*/ import_react.createElement(SkeletonNode, {
		...props,
		internalClassName: `${prefixCls}-image`
	}, /*#__PURE__*/ import_react.createElement("svg", {
		viewBox: "0 0 1098 1024",
		xmlns: "http://www.w3.org/2000/svg",
		className: `${prefixCls}-image-svg`
	}, /*#__PURE__*/ import_react.createElement("title", null, "Image placeholder"), /*#__PURE__*/ import_react.createElement("path", {
		d: "M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",
		className: `${prefixCls}-image-path`
	})));
};
//#endregion
//#region node_modules/antd/es/skeleton/Input.js
var SkeletonInput = (props) => {
	const { prefixCls: customizePrefixCls, className, classNames, rootClassName, active, block, style, styles, size: customSize, ...rest } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$6(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const cls = clsx(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, classNames?.root, className, rootClassName, hashId, cssVarCls);
	return /*#__PURE__*/ import_react.createElement("div", {
		className: cls,
		style: styles?.root
	}, /*#__PURE__*/ import_react.createElement(Element, {
		prefixCls: `${prefixCls}-input`,
		className: classNames?.content,
		style: {
			...styles?.content,
			...style
		},
		size: mergedSize,
		...rest
	}));
};
//#endregion
//#region node_modules/antd/es/skeleton/Paragraph.js
var getWidth = (index, props) => {
	const { width, rows = 2 } = props;
	if (Array.isArray(width)) return width[index];
	if (rows - 1 === index) return width;
};
var Paragraph = (props) => {
	const { prefixCls, className, style, rows = 0 } = props;
	const rowList = Array.from({ length: rows }).map((_, index) => /*#__PURE__*/ import_react.createElement("li", {
		key: index,
		style: { width: getWidth(index, props) }
	}));
	return /*#__PURE__*/ import_react.createElement("ul", {
		className: clsx(prefixCls, className),
		style
	}, rowList);
};
//#endregion
//#region node_modules/antd/es/skeleton/Title.js
var Title = ({ prefixCls, className, width, style }) => /*#__PURE__*/ import_react.createElement("h3", {
	className: clsx(prefixCls, className),
	style: {
		width,
		...style
	}
});
//#endregion
//#region node_modules/antd/es/skeleton/Skeleton.js
function getComponentProps(prop) {
	if (isPlainObject(prop)) return prop;
	return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
	if (hasTitle && !hasParagraph) return {
		size: "large",
		shape: "square"
	};
	return {
		size: "large",
		shape: "circle"
	};
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
	if (!hasAvatar && hasParagraph) return { width: "38%" };
	if (hasAvatar && hasParagraph) return { width: "50%" };
	return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
	const basicProps = {};
	if (!hasAvatar || !hasTitle) basicProps.width = "61%";
	if (!hasAvatar && hasTitle) basicProps.rows = 3;
	else basicProps.rows = 2;
	return basicProps;
}
var Skeleton = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, loading, className, rootClassName, classNames, style, styles, children, avatar = false, title = true, paragraph = true, active, round } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("skeleton");
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$6(prefixCls);
	const mergedProps = {
		...props,
		avatar,
		title,
		paragraph
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const nativeElementRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({ nativeElement: nativeElementRef.current }));
	if (loading || !("loading" in props)) {
		const hasAvatar = !!avatar;
		const hasTitle = !!title;
		const hasParagraph = !!paragraph;
		let avatarNode;
		if (hasAvatar) {
			const avatarProps = {
				className: mergedClassNames.avatar,
				prefixCls: `${prefixCls}-avatar`,
				...getAvatarBasicProps(hasTitle, hasParagraph),
				...getComponentProps(avatar),
				style: mergedStyles.avatar
			};
			avatarNode = /*#__PURE__*/ import_react.createElement("div", {
				className: clsx(mergedClassNames.header, `${prefixCls}-header`),
				style: mergedStyles.header
			}, /*#__PURE__*/ import_react.createElement(Element, { ...avatarProps }));
		}
		let contentNode;
		if (hasTitle || hasParagraph) {
			let $title;
			if (hasTitle) {
				const titleProps = {
					className: mergedClassNames.title,
					prefixCls: `${prefixCls}-title`,
					...getTitleBasicProps(hasAvatar, hasParagraph),
					...getComponentProps(title),
					style: mergedStyles.title
				};
				$title = /*#__PURE__*/ import_react.createElement(Title, { ...titleProps });
			}
			let paragraphNode;
			if (hasParagraph) {
				const paragraphProps = {
					className: mergedClassNames.paragraph,
					prefixCls: `${prefixCls}-paragraph`,
					...getParagraphBasicProps(hasAvatar, hasTitle),
					...getComponentProps(paragraph),
					style: mergedStyles.paragraph
				};
				paragraphNode = /*#__PURE__*/ import_react.createElement(Paragraph, { ...paragraphProps });
			}
			contentNode = /*#__PURE__*/ import_react.createElement("div", {
				className: clsx(mergedClassNames.section, `${prefixCls}-section`),
				style: mergedStyles.section
			}, $title, paragraphNode);
		}
		const cls = clsx(prefixCls, {
			[`${prefixCls}-with-avatar`]: hasAvatar,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-round`]: round
		}, mergedClassNames.root, contextClassName, className, rootClassName, hashId, cssVarCls);
		return /*#__PURE__*/ import_react.createElement("div", {
			ref: nativeElementRef,
			className: cls,
			style: mergedStyles.root
		}, avatarNode, contentNode);
	}
	return children ?? null;
});
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
//#endregion
//#region node_modules/antd/es/skeleton/index.js
var skeleton_default = Skeleton;
//#endregion
//#region node_modules/antd/es/watermark/context.js
function voidFunc() {}
var WatermarkContext = /*#__PURE__*/ import_react.createContext({
	add: voidFunc,
	remove: voidFunc
});
function usePanelRef(panelSelector) {
	const watermark = import_react.useContext(WatermarkContext);
	const panelEleRef = import_react.useRef(null);
	return useEvent((ele) => {
		if (ele) {
			const innerContentEle = panelSelector ? ele.querySelector(panelSelector) : ele;
			if (innerContentEle) {
				watermark.add(innerContentEle);
				panelEleRef.current = innerContentEle;
			}
		} else watermark.remove(panelEleRef.current);
	});
}
//#endregion
//#region node_modules/antd/es/modal/components/NormalCancelBtn.js
var NormalCancelBtn = () => {
	const { cancelButtonProps, cancelTextLocale, onCancel } = (0, import_react.useContext)(ModalContext);
	return /*#__PURE__*/ import_react.createElement(Button, {
		onClick: onCancel,
		...cancelButtonProps
	}, cancelTextLocale);
};
//#endregion
//#region node_modules/antd/es/modal/components/NormalOkBtn.js
var NormalOkBtn = () => {
	const { confirmLoading, okButtonProps, okType, okTextLocale, onOk } = (0, import_react.useContext)(ModalContext);
	return /*#__PURE__*/ import_react.createElement(Button, {
		...convertLegacyProps(okType),
		loading: confirmLoading,
		onClick: onOk,
		...okButtonProps
	}, okTextLocale);
};
//#endregion
//#region node_modules/antd/es/modal/shared.js
function renderCloseIcon(prefixCls, closeIcon) {
	return /*#__PURE__*/ import_react.createElement("span", { className: `${prefixCls}-close-x` }, closeIcon || /*#__PURE__*/ import_react.createElement(RefIcon$1, { className: `${prefixCls}-close-icon` }));
}
var Footer = (props) => {
	const { okText, okType = "primary", cancelText, confirmLoading, onOk, onCancel, okButtonProps, cancelButtonProps, footer } = props;
	const [locale] = useLocale("Modal", getConfirmLocale());
	const okTextLocale = okText || locale?.okText;
	const cancelTextLocale = cancelText || locale?.cancelText;
	const memoizedValue = import_react.useMemo(() => {
		return {
			confirmLoading,
			okButtonProps,
			cancelButtonProps,
			okTextLocale,
			cancelTextLocale,
			okType,
			onOk,
			onCancel
		};
	}, [
		confirmLoading,
		okButtonProps,
		cancelButtonProps,
		okTextLocale,
		cancelTextLocale,
		okType,
		onOk,
		onCancel
	]);
	let footerNode;
	if (isFunction(footer) || typeof footer === "undefined") {
		footerNode = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(NormalCancelBtn, null), /*#__PURE__*/ import_react.createElement(NormalOkBtn, null));
		if (isFunction(footer)) footerNode = footer(footerNode, {
			OkBtn: NormalOkBtn,
			CancelBtn: NormalCancelBtn
		});
		footerNode = /*#__PURE__*/ import_react.createElement(ModalContextProvider, { value: memoizedValue }, footerNode);
	} else footerNode = footer;
	return /*#__PURE__*/ import_react.createElement(DisabledContextProvider, { disabled: false }, footerNode);
};
//#endregion
//#region node_modules/antd/es/grid/style/index.js
var genGridRowStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "flex",
		flexFlow: "row wrap",
		minWidth: 0,
		"&::before, &::after": { display: "flex" },
		"&-no-wrap": { flexWrap: "nowrap" },
		"&-start": { justifyContent: "flex-start" },
		"&-center": { justifyContent: "center" },
		"&-end": { justifyContent: "flex-end" },
		"&-space-between": { justifyContent: "space-between" },
		"&-space-around": { justifyContent: "space-around" },
		"&-space-evenly": { justifyContent: "space-evenly" },
		"&-top": { alignItems: "flex-start" },
		"&-middle": { alignItems: "center" },
		"&-bottom": { alignItems: "flex-end" }
	} };
};
var genGridColStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "relative",
		maxWidth: "100%",
		minHeight: 1
	} };
};
var genLoopGridColumnsStyle = (token, sizeCls) => {
	const { componentCls, gridColumns, antCls } = token;
	const [gridVarName, gridVarRef] = genCssVar(antCls, "grid");
	const [, colVarRef] = genCssVar(antCls, "col");
	const gridColumnsStyle = {};
	for (let i = gridColumns; i >= 0; i--) if (i === 0) {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = { display: "none" };
		gridColumnsStyle[`${componentCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: 0 };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: 0 };
	} else {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [{
			[gridVarName("display")]: "block",
			display: "block"
		}, {
			display: gridVarRef("display"),
			flex: `0 0 ${i / gridColumns * 100}%`,
			maxWidth: `${i / gridColumns * 100}%`
		}];
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = { insetInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = { insetInlineEnd: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = { marginInlineStart: `${i / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = { order: i };
	}
	gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = { flex: colVarRef(`${sizeCls.replace(/-/, "")}-flex`) };
	return gridColumnsStyle;
};
var genGridStyle = (token, sizeCls) => genLoopGridColumnsStyle(token, sizeCls);
var genGridMediaStyle = (token, screenSize, sizeCls) => ({ [`@media (min-width: ${unit(screenSize)})`]: { ...genGridStyle(token, sizeCls) } });
var prepareRowComponentToken = () => ({});
var prepareColComponentToken = () => ({});
var useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
var getMediaSize = (token) => {
	return {
		xs: token.screenXSMin,
		sm: token.screenSMMin,
		md: token.screenMDMin,
		lg: token.screenLGMin,
		xl: token.screenXLMin,
		xxl: token.screenXXLMin,
		xxxl: token.screenXXXLMin
	};
};
var useColStyle = genStyleHooks("Grid", (token) => {
	const gridToken = merge$1(token, { gridColumns: 24 });
	const gridMediaSizesMap = getMediaSize(gridToken);
	delete gridMediaSizesMap.xs;
	return [
		genGridColStyle(gridToken),
		genGridStyle(gridToken, ""),
		genGridStyle(gridToken, "-xs"),
		Object.keys(gridMediaSizesMap).map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`)).reduce((pre, cur) => ({
			...pre,
			...cur
		}), {})
	];
}, prepareColComponentToken);
//#endregion
//#region node_modules/antd/es/modal/style/index.js
function box(position) {
	return {
		position,
		inset: 0
	};
}
var genModalMaskStyle = (token) => {
	const { componentCls, antCls } = token;
	return [{ [`${componentCls}-root`]: {
		[`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
			transform: "none",
			opacity: 0,
			animationDuration: token.motionDurationSlow,
			userSelect: "none"
		},
		[`${componentCls}${antCls}-zoom-leave ${componentCls}-container`]: { pointerEvents: "none" },
		[`${componentCls}-mask`]: {
			...box("fixed"),
			zIndex: token.zIndexPopupBase,
			height: "100%",
			backgroundColor: token.colorBgMask,
			pointerEvents: "none",
			[`&${componentCls}-mask-blur`]: { backdropFilter: "blur(4px)" },
			[`${componentCls}-hidden`]: { display: "none" }
		},
		[`${componentCls}-wrap`]: {
			...box("fixed"),
			zIndex: token.zIndexPopupBase,
			overflow: "auto",
			outline: 0,
			WebkitOverflowScrolling: "touch"
		}
	} }, { [`${componentCls}-root`]: initFadeMotion(token) }];
};
var genModalStyle = (token) => {
	const { componentCls, motionDurationMid } = token;
	return [
		{ [`${componentCls}-root`]: {
			[`${componentCls}-wrap-rtl`]: { direction: "rtl" },
			[`${componentCls}-centered`]: {
				textAlign: "center",
				"&::before": {
					display: "inline-block",
					width: 0,
					height: "100%",
					verticalAlign: "middle",
					content: "\"\""
				},
				[componentCls]: {
					top: 0,
					display: "inline-block",
					paddingBottom: 0,
					textAlign: "start",
					verticalAlign: "middle"
				}
			},
			[`@media (max-width: ${token.screenSMMax}px)`]: {
				[componentCls]: {
					maxWidth: "calc(100vw - 16px)",
					margin: `${unit(token.marginXS)} auto`
				},
				[`${componentCls}-centered`]: { [componentCls]: { flex: 1 } }
			}
		} },
		{ [componentCls]: {
			...resetComponent(token),
			pointerEvents: "none",
			position: "relative",
			top: 100,
			width: "auto",
			maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
			margin: "0 auto",
			"&:focus-visible": {
				borderRadius: token.borderRadiusLG,
				...genFocusOutline(token)
			},
			[`${componentCls}-title`]: {
				margin: 0,
				color: token.titleColor,
				fontWeight: token.fontWeightStrong,
				fontSize: token.titleFontSize,
				lineHeight: token.titleLineHeight,
				wordWrap: "break-word"
			},
			[`${componentCls}-container`]: {
				position: "relative",
				backgroundColor: token.contentBg,
				backgroundClip: "padding-box",
				border: 0,
				borderRadius: token.borderRadiusLG,
				boxShadow: token.boxShadow,
				pointerEvents: "auto",
				padding: token.contentPadding
			},
			[`${componentCls}-close`]: {
				position: "absolute",
				top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				insetInlineEnd: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
				padding: 0,
				color: token.modalCloseIconColor,
				fontWeight: token.fontWeightStrong,
				lineHeight: 1,
				textDecoration: "none",
				background: "transparent",
				borderRadius: token.borderRadiusSM,
				width: token.modalCloseBtnSize,
				height: token.modalCloseBtnSize,
				border: 0,
				outline: 0,
				cursor: "pointer",
				transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
				"&-x": {
					display: "flex",
					fontSize: token.fontSizeLG,
					fontStyle: "normal",
					lineHeight: unit(token.modalCloseBtnSize),
					justifyContent: "center",
					textTransform: "none",
					textRendering: "auto"
				},
				"&:disabled": { pointerEvents: "none" },
				"&:hover": {
					color: token.modalCloseIconHoverColor,
					backgroundColor: token.colorBgTextHover,
					textDecoration: "none"
				},
				"&:active": { backgroundColor: token.colorBgTextActive },
				...genFocusStyle(token)
			},
			[`${componentCls}-header`]: {
				color: token.colorText,
				background: token.headerBg,
				borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
				marginBottom: token.headerMarginBottom,
				padding: token.headerPadding,
				borderBottom: token.headerBorderBottom
			},
			[`${componentCls}-body`]: {
				fontSize: token.fontSize,
				lineHeight: token.lineHeight,
				wordWrap: "break-word",
				padding: token.bodyPadding,
				[`${componentCls}-body-skeleton`]: {
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: `${unit(token.margin)} auto`
				}
			},
			[`${componentCls}-footer`]: {
				textAlign: "end",
				background: token.footerBg,
				marginTop: token.footerMarginTop,
				padding: token.footerPadding,
				borderTop: token.footerBorderTop,
				borderRadius: token.footerBorderRadius,
				[`> ${token.antCls}-btn + ${token.antCls}-btn`]: { marginInlineStart: token.marginXS }
			},
			[`${componentCls}-open`]: { overflow: "hidden" }
		} },
		{ [`${componentCls}-pure-panel`]: {
			top: "auto",
			padding: 0,
			display: "flex",
			flexDirection: "column",
			[`${componentCls}-container,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto"
			},
			[`${componentCls}-confirm-body`]: { marginBottom: "auto" }
		} }
	];
};
var genRTLStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-root`]: { [`${componentCls}-wrap-rtl`]: {
		direction: "rtl",
		[`${componentCls}-confirm-body`]: { direction: "rtl" }
	} } };
};
var genResponsiveWidthStyle = (token) => {
	const { componentCls } = token;
	const oriGridMediaSizesMap = getMediaSize(token);
	const gridMediaSizesMap = { ...oriGridMediaSizesMap };
	delete gridMediaSizesMap.xs;
	const cssVarPrefix = `--${componentCls.replace(".", "")}-`;
	const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({ [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: { width: `var(${cssVarPrefix}${key}-width)` } }));
	return { [`${componentCls}-root`]: { [componentCls]: [].concat(_toConsumableArray(Object.keys(oriGridMediaSizesMap).map((currentKey, index) => {
		const previousKey = Object.keys(oriGridMediaSizesMap)[index - 1];
		return previousKey ? { [`${cssVarPrefix}${currentKey}-width`]: `var(${cssVarPrefix}${previousKey}-width)` } : null;
	})), [{ width: `var(${cssVarPrefix}xs-width)` }], _toConsumableArray(responsiveStyles)) } };
};
var prepareToken$1 = (token) => {
	const headerPaddingVertical = token.padding;
	const headerFontSize = token.fontSizeHeading5;
	const headerLineHeight = token.lineHeightHeading5;
	return merge$1(token, {
		modalHeaderHeight: token.calc(token.calc(headerLineHeight).mul(headerFontSize).equal()).add(token.calc(headerPaddingVertical).mul(2).equal()).equal(),
		modalFooterBorderColorSplit: token.colorSplit,
		modalFooterBorderStyle: token.lineType,
		modalFooterBorderWidth: token.lineWidth,
		modalCloseIconColor: token.colorIcon,
		modalCloseIconHoverColor: token.colorIconHover,
		modalCloseBtnSize: token.controlHeight,
		modalConfirmIconSize: token.fontHeight,
		modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal()
	});
};
var prepareComponentToken$3 = (token) => ({
	footerBg: "transparent",
	headerBg: "transparent",
	titleLineHeight: token.lineHeightHeading5,
	titleFontSize: token.fontSizeHeading5,
	contentBg: token.colorBgElevated,
	titleColor: token.colorTextHeading,
	contentPadding: token.wireframe ? 0 : `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
	headerPadding: token.wireframe ? `${unit(token.padding)} ${unit(token.paddingLG)}` : 0,
	headerBorderBottom: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	headerMarginBottom: token.wireframe ? 0 : token.marginXS,
	bodyPadding: token.wireframe ? token.paddingLG : 0,
	footerPadding: token.wireframe ? `${unit(token.paddingXS)} ${unit(token.padding)}` : 0,
	footerBorderTop: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	footerBorderRadius: token.wireframe ? `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` : 0,
	footerMarginTop: token.wireframe ? 0 : token.marginSM,
	confirmBodyPadding: token.wireframe ? `${unit(token.padding * 2)} ${unit(token.padding * 2)} ${unit(token.paddingLG)}` : 0,
	confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
	confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM,
	mask: true
});
var style_default$5 = genStyleHooks("Modal", (token) => {
	const modalToken = prepareToken$1(token);
	return [
		genModalStyle(modalToken),
		genRTLStyle(modalToken),
		genModalMaskStyle(modalToken),
		initZoomMotion(modalToken, "zoom"),
		genResponsiveWidthStyle(modalToken)
	];
}, prepareComponentToken$3, { unitless: { titleLineHeight: true } });
//#endregion
//#region node_modules/antd/es/modal/Modal.js
var mousePosition;
var getClickPosition = (e) => {
	mousePosition = {
		x: e.pageX,
		y: e.pageY
	};
	setTimeout(() => {
		mousePosition = null;
	}, 100);
};
if (canUseDocElement()) document.documentElement.addEventListener("click", getClickPosition, true);
var Modal$1 = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, open, wrapClassName, centered, getContainer, style, width = 520, footer, classNames, styles, children, loading, confirmLoading, zIndex: customizeZIndex, mousePosition: customizeMousePosition, onOk, onCancel, okButtonProps, cancelButtonProps, destroyOnHidden, destroyOnClose, panelRef = null, closable, mask: modalMask, modalRender, maskClosable, _semanticOmit, scrollLock, focusTriggerAfterClose, focusable, _renderSemanticContent, ...restProps } = props;
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, centered: contextCentered, cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps, mask: contextMask, focusable: contextFocusable } = useComponentConfig("modal");
	const { modal: modalContext } = import_react.useContext(ConfigContext);
	const [closableAfterClose, onClose] = import_react.useMemo(() => {
		if (typeof closable === "boolean") return [void 0, void 0];
		return [closable?.afterClose, closable?.onClose];
	}, [closable]);
	const prefixCls = getPrefixCls("modal", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [mergedMask, maskBlurClassName, mergeMaskClosable] = useMergedMask(modalMask, contextMask, prefixCls, maskClosable);
	const mergedFocusable = useFocusable({
		...contextFocusable,
		...focusable
	}, mergedMask, focusTriggerAfterClose);
	const handleCancel = (e) => {
		if (confirmLoading) return;
		onCancel?.(e);
		onClose?.();
	};
	const handleOk = (e) => {
		onOk?.(e);
		onClose?.();
	};
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$5(prefixCls, rootCls);
	const wrapClassNameExtended = clsx(wrapClassName, {
		[`${prefixCls}-centered`]: centered ?? contextCentered,
		[`${prefixCls}-wrap-rtl`]: direction === "rtl"
	});
	const dialogFooter = footer !== null && !loading ? /*#__PURE__*/ import_react.createElement(Footer, {
		...props,
		okButtonProps: {
			...contextOkButtonProps,
			...okButtonProps
		},
		onOk: handleOk,
		cancelButtonProps: {
			...contextCancelButtonProps,
			...cancelButtonProps
		},
		onCancel: handleCancel
	}) : null;
	const [rawClosable, mergedCloseIcon, closeBtnIsDisabled, ariaProps] = useClosable(pickClosable(props), pickClosable(modalContext), {
		closable: true,
		closeIcon: /*#__PURE__*/ import_react.createElement(RefIcon$1, { className: `${prefixCls}-close-icon` }),
		closeIconRender: (icon) => renderCloseIcon(prefixCls, icon)
	});
	const mergedClosable = rawClosable ? {
		disabled: closeBtnIsDisabled,
		closeIcon: mergedCloseIcon,
		afterClose: closableAfterClose,
		...ariaProps
	} : false;
	const mergedModalRender = modalRender ? (node) => /*#__PURE__*/ import_react.createElement("div", { className: `${prefixCls}-render` }, modalRender(node)) : void 0;
	const innerPanelRef = usePanelRef(`.${prefixCls}-${modalRender ? "render" : "container"}`);
	const mergedPanelRef = composeRef(panelRef, innerPanelRef);
	const [zIndex, contextZIndex] = useZIndex("Modal", customizeZIndex);
	const mergedProps = {
		...props,
		width,
		panelRef,
		focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
		focusable: mergedFocusable,
		mask: mergedMask,
		maskClosable: mergeMaskClosable,
		zIndex
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([
		contextClassNames,
		classNames,
		maskBlurClassName
	], [contextStyles, styles], { props: mergedProps });
	const dialogClassNames = _semanticOmit ? omit(mergedClassNames, _semanticOmit) : mergedClassNames;
	const dialogStyles = _semanticOmit ? omit(mergedStyles, _semanticOmit) : mergedStyles;
	const semanticContent = _renderSemanticContent ? _renderSemanticContent({
		classNames: mergedClassNames,
		styles: mergedStyles
	}) : children;
	const [numWidth, responsiveWidth] = import_react.useMemo(() => {
		if (isPlainObject(width)) return [void 0, width];
		return [width, void 0];
	}, [width]);
	const responsiveWidthVars = import_react.useMemo(() => {
		const vars = {};
		if (responsiveWidth) Object.keys(responsiveWidth).forEach((breakpoint) => {
			const breakpointWidth = responsiveWidth[breakpoint];
			if (isNonNullable(breakpointWidth)) vars[`--${prefixCls}-${breakpoint}-width`] = isNumber(breakpointWidth) ? `${breakpointWidth}px` : breakpointWidth;
		});
		return vars;
	}, [prefixCls, responsiveWidth]);
	return /*#__PURE__*/ import_react.createElement(ContextIsolator, {
		form: true,
		space: true
	}, /*#__PURE__*/ import_react.createElement(ZIndexContext.Provider, { value: contextZIndex }, /*#__PURE__*/ import_react.createElement(es_default$2, {
		width: numWidth,
		...restProps,
		zIndex,
		getContainer: getContainer === void 0 ? getContextPopupContainer : getContainer,
		prefixCls,
		rootClassName: clsx(hashId, rootClassName, cssVarCls, rootCls, dialogClassNames.root),
		rootStyle: dialogStyles.root,
		footer: dialogFooter,
		visible: open,
		mousePosition: customizeMousePosition ?? mousePosition,
		onClose: handleCancel,
		closable: mergedClosable,
		closeIcon: mergedCloseIcon,
		transitionName: getTransitionName(rootPrefixCls, "zoom", props.transitionName),
		maskTransitionName: getTransitionName(rootPrefixCls, "fade", props.maskTransitionName),
		mask: mergedMask,
		maskClosable: mergeMaskClosable,
		scrollLock,
		className: clsx(hashId, className, contextClassName),
		style: {
			...contextStyle,
			...style,
			...responsiveWidthVars
		},
		classNames: {
			...dialogClassNames,
			wrapper: clsx(dialogClassNames.wrapper, wrapClassNameExtended)
		},
		styles: dialogStyles,
		panelRef: mergedPanelRef,
		destroyOnHidden: destroyOnHidden ?? destroyOnClose,
		modalRender: mergedModalRender,
		focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
		focusTrap: mergedFocusable.trap
	}, loading ? /*#__PURE__*/ import_react.createElement(skeleton_default, {
		active: true,
		title: false,
		paragraph: { rows: 4 },
		className: `${prefixCls}-body-skeleton`
	}) : semanticContent)));
};
//#endregion
//#region node_modules/antd/es/modal/style/confirm.js
var genModalConfirmStyle = (token) => {
	const { componentCls, titleFontSize, titleLineHeight, modalConfirmIconSize, fontSize, lineHeight, modalTitleHeight, fontHeight, confirmBodyPadding } = token;
	const confirmComponentCls = `${componentCls}-confirm`;
	return {
		[confirmComponentCls]: {
			"&-rtl": { direction: "rtl" },
			[`${token.antCls}-modal-header`]: { display: "none" },
			[`${confirmComponentCls}-body-wrapper`]: { ...clearFix() },
			[`&${componentCls} ${componentCls}-body`]: { padding: confirmBodyPadding },
			[`${confirmComponentCls}-body`]: {
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "start",
				[`> ${token.iconCls}`]: {
					flex: "none",
					fontSize: modalConfirmIconSize,
					marginInlineEnd: token.confirmIconMarginInlineEnd,
					marginTop: token.calc(token.calc(fontHeight).sub(modalConfirmIconSize).equal()).div(2).equal()
				},
				[`&-has-title > ${token.iconCls}`]: { marginTop: token.calc(token.calc(modalTitleHeight).sub(modalConfirmIconSize).equal()).div(2).equal() }
			},
			[`${confirmComponentCls}-paragraph`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto",
				rowGap: token.marginXS,
				maxWidth: `calc(100% - ${unit(token.marginSM)})`
			},
			[`${confirmComponentCls}-body-no-icon ${confirmComponentCls}-paragraph`]: { maxWidth: "100%" },
			[`${token.iconCls} + ${confirmComponentCls}-paragraph`]: { maxWidth: `calc(100% - ${unit(token.calc(token.modalConfirmIconSize).add(token.marginSM).equal())})` },
			[`${confirmComponentCls}-title`]: {
				color: token.colorTextHeading,
				fontWeight: token.fontWeightStrong,
				fontSize: titleFontSize,
				lineHeight: titleLineHeight
			},
			[`${confirmComponentCls}-container`]: {
				color: token.colorText,
				fontSize,
				lineHeight
			},
			[`${confirmComponentCls}-btns`]: {
				textAlign: "end",
				marginTop: token.confirmBtnsMarginTop,
				[`${token.antCls}-btn + ${token.antCls}-btn`]: {
					marginBottom: 0,
					marginInlineStart: token.marginXS
				}
			}
		},
		[`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorError },
		[`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorWarning },
		[`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorInfo },
		[`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorSuccess }
	};
};
var confirm_default = genSubStyleComponent(["Modal", "confirm"], (token) => {
	return genModalConfirmStyle(prepareToken$1(token));
}, prepareComponentToken$3, { order: -1e3 });
//#endregion
//#region node_modules/antd/es/modal/ConfirmDialog.js
var CONFIRM_OMIT_SEMANTIC_NAMES = ["body"];
var ConfirmContent = (props) => {
	const { prefixCls, icon, okText, cancelText, confirmPrefixCls, type, okCancel, footer, locale: staticLocale, autoFocusButton, focusable, contentClassName, contentStyle, ...restProps } = props;
	const { infoIcon, successIcon, errorIcon, warningIcon } = useComponentConfig("modal");
	let mergedIcon = icon;
	if (icon === void 0) switch (type) {
		case "info":
			mergedIcon = fallbackProp(infoIcon, /*#__PURE__*/ import_react.createElement(RefIcon$2, null));
			break;
		case "success":
			mergedIcon = fallbackProp(successIcon, /*#__PURE__*/ import_react.createElement(RefIcon$3, null));
			break;
		case "error":
			mergedIcon = fallbackProp(errorIcon, /*#__PURE__*/ import_react.createElement(RefIcon, null));
			break;
		default: mergedIcon = fallbackProp(warningIcon, /*#__PURE__*/ import_react.createElement(RefIcon$4, null));
	}
	const mergedOkCancel = okCancel ?? type === "confirm";
	const mergedAutoFocusButton = import_react.useMemo(() => {
		const base = focusable?.autoFocusButton || autoFocusButton;
		return base || base === null ? base : "ok";
	}, [autoFocusButton, focusable?.autoFocusButton]);
	const [locale] = useLocale("Modal");
	const mergedLocale = staticLocale || locale;
	const okTextLocale = okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText);
	const cancelTextLocale = cancelText || mergedLocale?.cancelText;
	const { closable } = restProps;
	const { onClose } = isPlainObject(closable) ? closable : {};
	const memoizedValue = import_react.useMemo(() => {
		return {
			autoFocusButton: mergedAutoFocusButton,
			cancelTextLocale,
			okTextLocale,
			mergedOkCancel,
			onClose,
			...restProps
		};
	}, [
		mergedAutoFocusButton,
		cancelTextLocale,
		okTextLocale,
		mergedOkCancel,
		onClose,
		restProps
	]);
	const footerOriginNode = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(ConfirmCancelBtn, null), /*#__PURE__*/ import_react.createElement(ConfirmOkBtn, null));
	const hasTitle = isReactRenderable(props.title);
	const hasIcon = isReactRenderable(mergedIcon);
	const bodyCls = `${confirmPrefixCls}-body`;
	return /*#__PURE__*/ import_react.createElement("div", { className: `${confirmPrefixCls}-body-wrapper` }, /*#__PURE__*/ import_react.createElement("div", { className: clsx(bodyCls, {
		[`${bodyCls}-has-title`]: hasTitle,
		[`${bodyCls}-no-icon`]: !hasIcon
	}) }, mergedIcon, /*#__PURE__*/ import_react.createElement("div", { className: `${confirmPrefixCls}-paragraph` }, hasTitle && /*#__PURE__*/ import_react.createElement("span", { className: `${confirmPrefixCls}-title` }, props.title), /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${confirmPrefixCls}-content`, contentClassName),
		style: contentStyle
	}, props.content))), footer === void 0 || isFunction(footer) ? /*#__PURE__*/ import_react.createElement(ModalContextProvider, { value: memoizedValue }, /*#__PURE__*/ import_react.createElement("div", { className: `${confirmPrefixCls}-btns` }, isFunction(footer) ? footer(footerOriginNode, {
		OkBtn: ConfirmOkBtn,
		CancelBtn: ConfirmCancelBtn
	}) : footerOriginNode)) : footer, /*#__PURE__*/ import_react.createElement(confirm_default, { prefixCls }));
};
var ConfirmDialog = (props) => {
	const { close, zIndex, maskStyle, direction, prefixCls, wrapClassName, rootPrefixCls, bodyStyle, closable = false, onConfirm, styles, title, mask, maskClosable, okButtonProps, cancelButtonProps } = props;
	const { cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps } = useComponentConfig("modal");
	const confirmPrefixCls = `${prefixCls}-confirm`;
	const width = props.width || 416;
	const style = props.style || {};
	const semanticStyles = isFunction(styles) ? (info) => ({
		body: bodyStyle,
		mask: maskStyle,
		...styles(info)
	}) : {
		body: bodyStyle,
		mask: maskStyle,
		...styles
	};
	const modalProps = omit(props, ["bodyStyle", "maskStyle"]);
	const classString = clsx(confirmPrefixCls, `${confirmPrefixCls}-${props.type}`, { [`${confirmPrefixCls}-rtl`]: direction === "rtl" }, props.className);
	const mergedMask = import_react.useMemo(() => {
		const nextMaskConfig = normalizeMaskConfig(mask, maskClosable);
		nextMaskConfig.closable ?? (nextMaskConfig.closable = false);
		return nextMaskConfig;
	}, [mask, maskClosable]);
	const [, token] = useToken();
	const mergedZIndex = import_react.useMemo(() => {
		if (zIndex !== void 0) return zIndex;
		return token.zIndexPopupBase + CONTAINER_MAX_OFFSET;
	}, [zIndex, token]);
	return /*#__PURE__*/ import_react.createElement(Modal$1, {
		...modalProps,
		className: classString,
		wrapClassName: clsx({ [`${confirmPrefixCls}-centered`]: !!props.centered }, wrapClassName),
		onCancel: () => {
			close?.({ triggerCancel: true });
			onConfirm?.(false);
		},
		title,
		footer: null,
		transitionName: getTransitionName(rootPrefixCls || "", "zoom", props.transitionName),
		maskTransitionName: getTransitionName(rootPrefixCls || "", "fade", props.maskTransitionName),
		mask: mergedMask,
		style,
		styles: semanticStyles,
		width,
		zIndex: mergedZIndex,
		closable,
		_semanticOmit: CONFIRM_OMIT_SEMANTIC_NAMES,
		_renderSemanticContent: ({ classNames: mergedClassNames, styles: mergedStyles }) => /*#__PURE__*/ import_react.createElement(ConfirmContent, {
			...props,
			confirmPrefixCls,
			okButtonProps: {
				...contextOkButtonProps,
				...okButtonProps
			},
			cancelButtonProps: {
				...contextCancelButtonProps,
				...cancelButtonProps
			},
			contentClassName: mergedClassNames.body,
			contentStyle: mergedStyles.body
		})
	});
};
var ConfirmDialogWrapper$1 = (props) => {
	const { rootPrefixCls, iconPrefixCls, direction, theme } = props;
	return /*#__PURE__*/ import_react.createElement(ConfigProvider, {
		prefixCls: rootPrefixCls,
		iconPrefixCls,
		direction,
		theme
	}, /*#__PURE__*/ import_react.createElement(ConfirmDialog, { ...props }));
};
//#endregion
//#region node_modules/antd/es/modal/destroyFns.js
var destroyFns = [];
//#endregion
//#region node_modules/antd/es/modal/confirm.js
var defaultRootPrefixCls = "";
function getRootPrefixCls() {
	return defaultRootPrefixCls;
}
var ConfirmDialogWrapper = (props) => {
	const { prefixCls: customizePrefixCls, getContainer, direction } = props;
	const runtimeLocale = getConfirmLocale();
	const config = (0, import_react.useContext)(ConfigContext);
	const rootPrefixCls = getRootPrefixCls() || config.getPrefixCls();
	const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
	let mergedGetContainer = getContainer;
	if (mergedGetContainer === false) mergedGetContainer = void 0;
	return /*#__PURE__*/ import_react.createElement(ConfirmDialogWrapper$1, {
		...props,
		rootPrefixCls,
		prefixCls,
		iconPrefixCls: config.iconPrefixCls,
		theme: config.theme,
		direction: direction ?? config.direction,
		locale: config.locale?.Modal ?? runtimeLocale,
		getContainer: mergedGetContainer
	});
};
function confirm(config) {
	const global = globalConfig();
	const container = document.createDocumentFragment();
	let currentConfig = {
		...config,
		close,
		open: true
	};
	let timeoutId;
	function destroy(...args) {
		if (args.some((param) => param?.triggerCancel)) config.onCancel?.(() => {}, ...args.slice(1));
		for (let i = 0; i < destroyFns.length; i++) if (destroyFns[i] === close) {
			destroyFns.splice(i, 1);
			break;
		}
		unmount(container).then(() => {});
	}
	const scheduleRender = (props) => {
		clearTimeout(timeoutId);
		/**
		* https://github.com/ant-design/ant-design/issues/23623
		*
		* Sync render blocks React event. Let's make this async.
		*/
		timeoutId = setTimeout(() => {
			const rootPrefixCls = global.getPrefixCls(void 0, getRootPrefixCls());
			const iconPrefixCls = global.getIconPrefixCls();
			const theme = global.getTheme();
			const dom = /*#__PURE__*/ import_react.createElement(ConfirmDialogWrapper, { ...props });
			render(/*#__PURE__*/ import_react.createElement(ConfigProvider, {
				prefixCls: rootPrefixCls,
				iconPrefixCls,
				theme
			}, isFunction(global.holderRender) ? global.holderRender(dom) : dom), container);
		});
	};
	function close(...args) {
		currentConfig = {
			...currentConfig,
			open: false,
			afterClose: () => {
				if (isFunction(config.afterClose)) config.afterClose();
				destroy.apply(this, args);
			}
		};
		scheduleRender(currentConfig);
	}
	function update(configUpdate) {
		if (isFunction(configUpdate)) currentConfig = configUpdate(currentConfig);
		else currentConfig = {
			...currentConfig,
			...configUpdate
		};
		scheduleRender(currentConfig);
	}
	scheduleRender(currentConfig);
	destroyFns.push(close);
	return {
		destroy: close,
		update
	};
}
function withWarn(props) {
	return {
		...props,
		type: "warning"
	};
}
function withInfo(props) {
	return {
		...props,
		type: "info"
	};
}
function withSuccess(props) {
	return {
		...props,
		type: "success"
	};
}
function withError(props) {
	return {
		...props,
		type: "error"
	};
}
function withConfirm(props) {
	return {
		...props,
		type: "confirm"
	};
}
function modalGlobalConfig({ rootPrefixCls }) {
	defaultRootPrefixCls = rootPrefixCls;
}
//#endregion
//#region node_modules/antd/es/modal/useModal/HookModal.js
var HookModal = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { afterClose: hookAfterClose, config, ...restProps } = props;
	const [open, setOpen] = import_react.useState(true);
	const [innerConfig, setInnerConfig] = import_react.useState(config);
	const { direction, getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("modal");
	const rootPrefixCls = getPrefixCls();
	const afterClose = () => {
		hookAfterClose();
		innerConfig.afterClose?.();
	};
	const close = (...args) => {
		setOpen(false);
		if (args.some((param) => param?.triggerCancel)) innerConfig.onCancel?.(() => {}, ...args.slice(1));
	};
	import_react.useImperativeHandle(ref, () => ({
		destroy: close,
		update: (newConfig) => {
			setInnerConfig((originConfig) => {
				const nextConfig = isFunction(newConfig) ? newConfig(originConfig) : newConfig;
				return {
					...originConfig,
					...nextConfig
				};
			});
		}
	}));
	const mergedOkCancel = innerConfig.okCancel ?? innerConfig.type === "confirm";
	const [contextLocale] = useLocale("Modal", localeValues.Modal);
	return /*#__PURE__*/ import_react.createElement(ConfirmDialogWrapper$1, {
		prefixCls,
		rootPrefixCls,
		...innerConfig,
		close,
		open,
		afterClose,
		okText: innerConfig.okText || (mergedOkCancel ? contextLocale?.okText : contextLocale?.justOkText),
		direction: innerConfig.direction || direction,
		cancelText: innerConfig.cancelText || contextLocale?.cancelText,
		...restProps
	});
});
//#endregion
//#region node_modules/antd/es/modal/useModal/index.js
var uuid = 0;
var ElementsHolder = /*#__PURE__*/ import_react.memo(/*#__PURE__*/ import_react.forwardRef((_props, ref) => {
	const [elements, patchElement] = usePatchElement();
	import_react.useImperativeHandle(ref, () => ({ patchElement }), [patchElement]);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, elements);
}));
function useModal() {
	const holderRef = import_react.useRef(null);
	const [actionQueue, setActionQueue] = import_react.useState([]);
	import_react.useEffect(() => {
		if (actionQueue.length) {
			_toConsumableArray(actionQueue).forEach((action) => {
				action();
			});
			setActionQueue([]);
		}
	}, [actionQueue]);
	const getConfirmFunc = import_react.useCallback((withFunc) => function hookConfirm(config) {
		uuid += 1;
		const modalRef = /*#__PURE__*/ import_react.createRef();
		let resolvePromise;
		const promise = new Promise((resolve) => {
			resolvePromise = resolve;
		});
		let silent = false;
		let closeFunc;
		const modal = /*#__PURE__*/ import_react.createElement(HookModal, {
			key: `modal-${uuid}`,
			config: withFunc(config),
			ref: modalRef,
			afterClose: () => {
				closeFunc?.();
			},
			isSilent: () => silent,
			onConfirm: (confirmed) => {
				resolvePromise(confirmed);
			}
		});
		closeFunc = holderRef.current?.patchElement(modal);
		if (closeFunc) destroyFns.push(closeFunc);
		return {
			destroy: () => {
				function destroyAction() {
					modalRef.current?.destroy();
				}
				if (modalRef.current) destroyAction();
				else setActionQueue((prev) => [].concat(_toConsumableArray(prev), [destroyAction]));
			},
			update: (newConfig) => {
				function updateAction() {
					modalRef.current?.update(newConfig);
				}
				if (modalRef.current) updateAction();
				else setActionQueue((prev) => [].concat(_toConsumableArray(prev), [updateAction]));
			},
			then: (resolve) => {
				silent = true;
				return promise.then(resolve);
			}
		};
	}, []);
	return [import_react.useMemo(() => ({
		info: getConfirmFunc(withInfo),
		success: getConfirmFunc(withSuccess),
		error: getConfirmFunc(withError),
		warning: getConfirmFunc(withWarn),
		confirm: getConfirmFunc(withConfirm)
	}), [getConfirmFunc]), /*#__PURE__*/ import_react.createElement(ElementsHolder, {
		key: "modal-holder",
		ref: holderRef
	})];
}
//#endregion
//#region node_modules/antd/es/app/context.js
var AppConfigContext = /*#__PURE__*/ import_react.createContext({});
//#endregion
//#region node_modules/antd/es/_util/PurePanel.js
function withPureRenderTheme(Component) {
	return (props) => /*#__PURE__*/ import_react.createElement(ConfigProvider, { theme: { token: {
		motion: false,
		zIndexPopupBase: 0
	} } }, /*#__PURE__*/ import_react.createElement(Component, { ...props }));
}
//#endregion
//#region node_modules/antd/es/_util/statusUtils.js
var getStatusClassNames = (prefixCls, status, hasFeedback) => {
	return clsx({
		[`${prefixCls}-status-success`]: status === "success",
		[`${prefixCls}-status-warning`]: status === "warning",
		[`${prefixCls}-status-error`]: status === "error",
		[`${prefixCls}-status-validating`]: status === "validating",
		[`${prefixCls}-has-feedback`]: hasFeedback
	});
};
var getMergedStatus = (contextStatus, customStatus) => customStatus || contextStatus;
//#endregion
//#region node_modules/antd/es/form/hooks/useVariants.js
/**
* Compatible for legacy `bordered` prop.
*/
var useVariant = (component, variant, legacyBordered, fallbackComponent) => {
	const config = import_react.useContext(ConfigContext);
	const { variant: configVariant, [component]: componentConfig } = config;
	const ctxVariant = import_react.useContext(VariantContext);
	const fallbackComponentConfig = fallbackComponent ? config[fallbackComponent] : void 0;
	const configComponentVariant = componentConfig?.variant ?? fallbackComponentConfig?.variant;
	const isVariantConfigured = typeof variant !== "undefined" || legacyBordered === false || typeof ctxVariant !== "undefined" || typeof configComponentVariant !== "undefined" || typeof configVariant !== "undefined";
	let mergedVariant;
	if (typeof variant !== "undefined") mergedVariant = variant;
	else if (legacyBordered === false) mergedVariant = "borderless";
	else mergedVariant = ctxVariant ?? configComponentVariant ?? configVariant ?? "outlined";
	const enableVariantCls = Variants.includes(mergedVariant);
	return [
		mergedVariant,
		enableVariantCls,
		isVariantConfigured
	];
};
//#endregion
//#region node_modules/antd/es/_util/responsiveObserver.js
var responsiveArray = [
	"xxxl",
	"xxl",
	"xl",
	"lg",
	"md",
	"sm",
	"xs"
];
var responsiveArrayReversed = [].concat(responsiveArray).reverse();
var getResponsiveMap = (token) => ({
	xs: `(max-width: ${token.screenXSMax}px)`,
	sm: `(min-width: ${token.screenSM}px)`,
	md: `(min-width: ${token.screenMD}px)`,
	lg: `(min-width: ${token.screenLG}px)`,
	xl: `(min-width: ${token.screenXL}px)`,
	xxl: `(min-width: ${token.screenXXL}px)`,
	xxxl: `(min-width: ${token.screenXXXL}px)`
});
/**
* Ensures that the breakpoints token are valid, in good order
* For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
*/
var validateBreakpoints = (token) => {
	const indexableToken = token;
	const revBreakpoints = [].concat(responsiveArray).reverse();
	revBreakpoints.forEach((breakpoint, i) => {
		const breakpointUpper = breakpoint.toUpperCase();
		const screenMin = `screen${breakpointUpper}Min`;
		const screen = `screen${breakpointUpper}`;
		if (!(indexableToken[screenMin] <= indexableToken[screen])) throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
		if (i < revBreakpoints.length - 1) {
			const screenMax = `screen${breakpointUpper}Max`;
			if (!(indexableToken[screen] <= indexableToken[screenMax])) throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
			const nextScreenMin = `screen${revBreakpoints[i + 1].toUpperCase()}Min`;
			if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
		}
	});
	return token;
};
var useResponsiveObserver = () => {
	const [, token] = useToken();
	const responsiveMap = getResponsiveMap(validateBreakpoints(token));
	return import_react.useMemo(() => {
		const subscribers = /* @__PURE__ */ new Map();
		let subUid = -1;
		let screens = {};
		return {
			responsiveMap,
			matchHandlers: {},
			dispatch(pointMap) {
				screens = pointMap;
				subscribers.forEach((func) => {
					func(screens);
				});
				return subscribers.size >= 1;
			},
			subscribe(func) {
				if (!subscribers.size) this.register();
				subUid += 1;
				subscribers.set(subUid, func);
				func(screens);
				return subUid;
			},
			unsubscribe(paramToken) {
				subscribers.delete(paramToken);
				if (!subscribers.size) this.unregister();
			},
			register() {
				Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
					const listener = ({ matches }) => {
						this.dispatch({
							...screens,
							[screen]: matches
						});
					};
					const mql = window.matchMedia(mediaQuery);
					if (isFunction(mql.addEventListener)) mql.addEventListener("change", listener);
					this.matchHandlers[mediaQuery] = {
						mql,
						listener
					};
					listener(mql);
				});
			},
			unregister() {
				Object.values(responsiveMap).forEach((mediaQuery) => {
					const handler = this.matchHandlers[mediaQuery];
					if (isFunction(handler?.mql.removeEventListener)) handler.mql.removeEventListener("change", handler?.listener);
				});
				subscribers.clear();
			}
		};
	}, [responsiveMap]);
};
//#endregion
//#region node_modules/antd/es/grid/hooks/useBreakpoint.js
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
	const screensRef = (0, import_react.useRef)(defaultScreens);
	const [, forceUpdate] = useForceUpdate();
	const responsiveObserver = useResponsiveObserver();
	useLayoutEffect(() => {
		const token = responsiveObserver.subscribe((supportScreens) => {
			screensRef.current = supportScreens;
			if (refreshOnChange) forceUpdate();
		});
		return () => responsiveObserver.unsubscribe(token);
	}, [refreshOnChange]);
	return screensRef.current;
}
//#endregion
//#region node_modules/antd/es/style/roundedArrow.js
function getArrowToken(token) {
	const { sizePopupArrow, borderRadiusXS, borderRadiusOuter } = token;
	const unitWidth = sizePopupArrow / 2;
	const ax = 0;
	const ay = unitWidth;
	const bx = borderRadiusOuter * 1 / Math.sqrt(2);
	const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
	const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
	const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
	const dx = 2 * unitWidth - cx;
	const dy = cy;
	const ex = 2 * unitWidth - bx;
	const ey = by;
	const fx = 2 * unitWidth - ax;
	const fy = ay;
	const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
	const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
	const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
	return {
		arrowShadowWidth: shadowWidth,
		arrowPath: `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`,
		arrowPolygon
	};
}
var genRoundedArrow = (token, bgColor, boxShadow) => {
	const { sizePopupArrow, arrowPolygon, arrowPath, arrowShadowWidth, borderRadiusXS, calc } = token;
	const afterStyle = {
		content: "\"\"",
		position: "absolute",
		width: arrowShadowWidth,
		height: arrowShadowWidth,
		bottom: 0,
		insetInline: 0,
		margin: "auto",
		borderRadius: {
			_skip_check_: true,
			value: `0 0 ${unit(borderRadiusXS)} 0`
		},
		transform: "translateY(50%) rotate(-135deg)",
		zIndex: 0,
		background: "transparent"
	};
	if (boxShadow) afterStyle.boxShadow = boxShadow;
	return {
		pointerEvents: "none",
		width: sizePopupArrow,
		height: sizePopupArrow,
		overflow: "hidden",
		"&::before": {
			position: "absolute",
			bottom: 0,
			insetInlineStart: 0,
			width: sizePopupArrow,
			height: calc(sizePopupArrow).div(2).equal(),
			background: bgColor,
			clipPath: {
				_multi_value_: true,
				value: [arrowPolygon, arrowPath]
			},
			content: "\"\""
		},
		"&::after": afterStyle
	};
};
function getArrowOffsetToken(options) {
	const { contentRadius, limitVerticalRadius } = options;
	const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
	return {
		arrowOffsetHorizontal: arrowOffset,
		arrowOffsetVertical: limitVerticalRadius ? 8 : arrowOffset
	};
}
var getArrowStyle = (token, colorBg, options) => {
	const { componentCls, boxShadowPopoverArrow, arrowOffsetVertical, arrowOffsetHorizontal, antCls } = token;
	const [varName] = genCssVar(antCls, "tooltip");
	const { arrowDistance = 0, arrowShadow = true } = options || {};
	return { [componentCls]: {
		[`${componentCls}-arrow`]: [{
			position: "absolute",
			zIndex: 1,
			display: "block",
			...genRoundedArrow(token, colorBg, arrowShadow ? boxShadowPopoverArrow : false),
			"&:before": { background: colorBg }
		}],
		[[
			`&-placement-top > ${componentCls}-arrow`,
			`&-placement-topLeft > ${componentCls}-arrow`,
			`&-placement-topRight > ${componentCls}-arrow`
		].join(",")]: {
			bottom: arrowDistance,
			transform: "translateY(100%) rotate(180deg)"
		},
		[`&-placement-top > ${componentCls}-arrow`]: {
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateX(-50%) translateY(100%) rotate(180deg)"
		},
		"&-placement-topLeft": {
			[varName("arrow-offset-x")]: arrowOffsetHorizontal,
			[`> ${componentCls}-arrow`]: { left: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		"&-placement-topRight": {
			[varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
			[`> ${componentCls}-arrow`]: { right: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		[[
			`&-placement-bottom > ${componentCls}-arrow`,
			`&-placement-bottomLeft > ${componentCls}-arrow`,
			`&-placement-bottomRight > ${componentCls}-arrow`
		].join(",")]: {
			top: arrowDistance,
			transform: `translateY(-100%)`
		},
		[`&-placement-bottom > ${componentCls}-arrow`]: {
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: `translateX(-50%) translateY(-100%)`
		},
		"&-placement-bottomLeft": {
			[varName("arrow-offset-x")]: arrowOffsetHorizontal,
			[`> ${componentCls}-arrow`]: { left: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		"&-placement-bottomRight": {
			[varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
			[`> ${componentCls}-arrow`]: { right: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		[[
			`&-placement-left > ${componentCls}-arrow`,
			`&-placement-leftTop > ${componentCls}-arrow`,
			`&-placement-leftBottom > ${componentCls}-arrow`
		].join(",")]: {
			right: {
				_skip_check_: true,
				value: arrowDistance
			},
			transform: "translateX(100%) rotate(90deg)"
		},
		[`&-placement-left > ${componentCls}-arrow`]: {
			top: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateY(-50%) translateX(100%) rotate(90deg)"
		},
		[`&-placement-leftTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
		[`&-placement-leftBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical },
		[[
			`&-placement-right > ${componentCls}-arrow`,
			`&-placement-rightTop > ${componentCls}-arrow`,
			`&-placement-rightBottom > ${componentCls}-arrow`
		].join(",")]: {
			left: {
				_skip_check_: true,
				value: arrowDistance
			},
			transform: "translateX(-100%) rotate(-90deg)"
		},
		[`&-placement-right > ${componentCls}-arrow`]: {
			top: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
		},
		[`&-placement-rightTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
		[`&-placement-rightBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical }
	} };
};
//#endregion
//#region node_modules/antd/es/_util/placements.js
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
	if (autoAdjustOverflow === false) return {
		adjustX: false,
		adjustY: false
	};
	const overflow = isPlainObject(autoAdjustOverflow) ? autoAdjustOverflow : {};
	const baseOverflow = {};
	switch (placement) {
		case "top":
		case "bottom":
			baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
			baseOverflow.shiftY = true;
			baseOverflow.adjustY = true;
			break;
		case "left":
		case "right":
			baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
			baseOverflow.shiftX = true;
			baseOverflow.adjustX = true;
	}
	const mergedOverflow = {
		...baseOverflow,
		...overflow
	};
	if (!mergedOverflow.shiftX) mergedOverflow.adjustX = true;
	if (!mergedOverflow.shiftY) mergedOverflow.adjustY = true;
	return mergedOverflow;
}
var PlacementAlignMap = {
	left: { points: ["cr", "cl"] },
	right: { points: ["cl", "cr"] },
	top: { points: ["bc", "tc"] },
	bottom: { points: ["tc", "bc"] },
	topLeft: { points: ["bl", "tl"] },
	leftTop: { points: ["tr", "tl"] },
	topRight: { points: ["br", "tr"] },
	rightTop: { points: ["tl", "tr"] },
	bottomRight: { points: ["tr", "br"] },
	rightBottom: { points: ["bl", "br"] },
	bottomLeft: { points: ["tl", "bl"] },
	leftBottom: { points: ["br", "bl"] }
};
var ArrowCenterPlacementAlignMap = {
	topLeft: { points: ["bl", "tc"] },
	leftTop: { points: ["tr", "cl"] },
	topRight: { points: ["br", "tc"] },
	rightTop: { points: ["tl", "cr"] },
	bottomRight: { points: ["tr", "bc"] },
	rightBottom: { points: ["bl", "cr"] },
	bottomLeft: { points: ["tl", "bc"] },
	leftBottom: { points: ["br", "cl"] }
};
var DisableAutoArrowList = /* @__PURE__ */ new Set([
	"topLeft",
	"topRight",
	"bottomLeft",
	"bottomRight",
	"leftTop",
	"leftBottom",
	"rightTop",
	"rightBottom"
]);
function getPlacements(config) {
	const { arrowWidth, autoAdjustOverflow, arrowPointAtCenter, offset, borderRadius, visibleFirst } = config;
	const halfArrowWidth = arrowWidth / 2;
	const placementMap = {};
	const arrowOffset = getArrowOffsetToken({
		contentRadius: borderRadius,
		limitVerticalRadius: true
	});
	Object.keys(PlacementAlignMap).forEach((key) => {
		const placementInfo = {
			...arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key],
			offset: [0, 0],
			dynamicInset: true
		};
		placementMap[key] = placementInfo;
		if (DisableAutoArrowList.has(key)) placementInfo.autoArrow = false;
		switch (key) {
			case "top":
			case "topLeft":
			case "topRight":
				placementInfo.offset[1] = -halfArrowWidth - offset;
				break;
			case "bottom":
			case "bottomLeft":
			case "bottomRight":
				placementInfo.offset[1] = halfArrowWidth + offset;
				break;
			case "left":
			case "leftTop":
			case "leftBottom":
				placementInfo.offset[0] = -halfArrowWidth - offset;
				break;
			case "right":
			case "rightTop":
			case "rightBottom": placementInfo.offset[0] = halfArrowWidth + offset;
		}
		if (arrowPointAtCenter) switch (key) {
			case "topLeft":
			case "bottomLeft":
				placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
				break;
			case "topRight":
			case "bottomRight":
				placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
				break;
			case "leftTop":
			case "rightTop":
				placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal * 2 + halfArrowWidth;
				break;
			case "leftBottom":
			case "rightBottom": placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal * 2 - halfArrowWidth;
		}
		placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
		if (visibleFirst) placementInfo.htmlRegion = "visibleFirst";
	});
	return placementMap;
}
//#endregion
//#region node_modules/antd/es/table/TableMeasureRowContext.js
var TableMeasureRowContext = /*#__PURE__*/ import_react.createContext(false);
//#endregion
//#region node_modules/antd/es/tooltip/hook/useMergedArrow.js
var useMergedArrow = (providedArrow, providedContextArrow) => {
	const toConfig = (arrow) => typeof arrow === "boolean" ? { show: arrow } : arrow || {};
	return import_react.useMemo(() => {
		const arrowConfig = toConfig(providedArrow);
		const contextArrowConfig = toConfig(providedContextArrow);
		return {
			...contextArrowConfig,
			...arrowConfig,
			show: arrowConfig.show ?? contextArrowConfig.show ?? true
		};
	}, [providedArrow, providedContextArrow]);
};
//#endregion
//#region node_modules/antd/es/tooltip/style/index.js
var FALL_BACK_ORIGIN = "50%";
var genTooltipStyle = (token) => {
	const { calc, componentCls, tooltipMaxWidth, tooltipColor, tooltipBg, tooltipBorderRadius, zIndexPopup, controlHeight, dropShadowPopover, paddingSM, paddingXS, arrowOffsetHorizontal, sizePopupArrow, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
	const sharedBodyStyle = {
		minWidth: calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal(),
		minHeight: controlHeight,
		padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
		color: varRef("overlay-color", tooltipColor),
		textAlign: "start",
		textDecoration: "none",
		wordWrap: "break-word",
		backgroundColor: tooltipBg,
		borderRadius: tooltipBorderRadius,
		boxSizing: "border-box"
	};
	const sharedTransformOrigin = {
		[varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
		transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN), `var(--arrow-y, ${FALL_BACK_ORIGIN})`].join(" ")
	};
	return [
		{ [componentCls]: {
			...resetComponent(token),
			position: "absolute",
			zIndex: zIndexPopup,
			display: "block",
			width: "max-content",
			maxWidth: tooltipMaxWidth,
			visibility: "visible",
			filter: dropShadowPopover,
			...sharedTransformOrigin,
			"&-hidden": { display: "none" },
			[varName("arrow-background-color")]: tooltipBg,
			[`${componentCls}-container`]: [sharedBodyStyle, initFadeMotion(token, true)],
			[`&:has(~ ${componentCls}-unique-container)`]: { [`${componentCls}-container`]: {
				border: "none",
				background: "transparent"
			} },
			[[
				`&-placement-topLeft`,
				`&-placement-topRight`,
				`&-placement-bottomLeft`,
				`&-placement-bottomRight`
			].join(",")]: { minWidth: edgeAlignMinWidth },
			[[
				`&-placement-left`,
				`&-placement-leftTop`,
				`&-placement-leftBottom`,
				`&-placement-right`,
				`&-placement-rightTop`,
				`&-placement-rightBottom`
			].join(",")]: { [`${componentCls}-inner`]: { borderRadius: token.min(tooltipBorderRadius, 8) } },
			[`${componentCls}-content`]: { position: "relative" },
			...genPresetColor(token, (colorKey, { darkColor }) => ({ [`&${componentCls}-${colorKey}`]: {
				[`${componentCls}-container`]: { backgroundColor: darkColor },
				[`${componentCls}-arrow`]: { [varName("arrow-background-color")]: darkColor }
			} })),
			"&-rtl": { direction: "rtl" }
		} },
		getArrowStyle(token, varRef("arrow-background-color"), { arrowShadow: false }),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow
		} },
		{ [`${componentCls}-unique-container`]: {
			...sharedBodyStyle,
			...sharedTransformOrigin,
			position: "absolute",
			zIndex: calc(zIndexPopup).sub(1).equal(),
			filter: dropShadowPopover,
			"&-hidden": { display: "none" },
			"&-visible": { transition: `all ${token.motionDurationSlow}` }
		} }
	];
};
var prepareComponentToken$2 = (token) => ({
	zIndexPopup: token.zIndexPopupBase + 70,
	maxWidth: 250,
	...getArrowOffsetToken({
		contentRadius: token.borderRadius,
		limitVerticalRadius: true
	}),
	...getArrowToken(merge$1(token, { borderRadiusOuter: Math.min(token.borderRadiusOuter, 4) }))
});
var style_default$4 = (prefixCls, rootCls, injectStyle = true) => {
	return genStyleHooks("Tooltip", (token) => {
		const { borderRadius, colorTextLightSolid, colorBgSpotlight, maxWidth } = token;
		return [genTooltipStyle(merge$1(token, {
			tooltipMaxWidth: maxWidth,
			tooltipColor: colorTextLightSolid,
			tooltipBorderRadius: borderRadius,
			tooltipBg: colorBgSpotlight
		})), initZoomMotion(token, "zoom-big-fast")];
	}, prepareComponentToken$2, {
		resetStyle: false,
		injectStyle
	})(prefixCls, rootCls);
};
//#endregion
//#region node_modules/antd/es/_util/colors.js
var inverseColors = PresetColors.map((color) => `${color}-inverse`);
/**
* determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
* @param color color to be judged
* @param includeInverse whether to include reversed colors
*/
function isPresetColor(color, includeInverse = true) {
	if (includeInverse) return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color);
	return PresetColors.includes(color);
}
//#endregion
//#region node_modules/antd/es/tooltip/util.js
var parseColor = (rootPrefixCls, prefixCls, color) => {
	const isInternalColor = isPresetColor(color);
	const [varName] = genCssVar(rootPrefixCls, "tooltip");
	const className = clsx({ [`${prefixCls}-${color}`]: color && isInternalColor });
	const overlayStyle = {};
	const arrowStyle = {};
	const rgb = generateColor(color).toRgb();
	const textColor = (.299 * rgb.r + .587 * rgb.g + .114 * rgb.b) / 255 < .5 ? "#FFF" : "#000";
	if (color && !isInternalColor) {
		overlayStyle.background = color;
		overlayStyle[varName("overlay-color")] = textColor;
		arrowStyle[varName("arrow-background-color")] = color;
	}
	return {
		className,
		overlayStyle,
		arrowStyle
	};
};
//#endregion
//#region node_modules/antd/es/tooltip/PurePanel.js
/** @private Internal Component. Do not use in your production. */
var PurePanel$1 = (props) => {
	const { prefixCls: customizePrefixCls, className, placement = "top", title, color, overlayInnerStyle, classNames, styles } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$4(prefixCls, rootCls);
	const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
	const arrowContentStyle = colorInfo.arrowStyle;
	const innerStyles = import_react.useMemo(() => {
		return { container: {
			...overlayInnerStyle,
			...colorInfo.overlayStyle
		} };
	}, [overlayInnerStyle, colorInfo.overlayStyle]);
	const mergedProps = {
		...props,
		placement
	};
	const [mergedClassNames, mergedStyles] = useMergeSemantic([classNames], [innerStyles, styles], { props: mergedProps });
	const rootClassName = clsx(rootCls, hashId, cssVarCls, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
	return /*#__PURE__*/ import_react.createElement("div", {
		className: rootClassName,
		style: arrowContentStyle
	}, /*#__PURE__*/ import_react.createElement("div", { className: `${prefixCls}-arrow` }), /*#__PURE__*/ import_react.createElement(Popup, {
		...props,
		className: hashId,
		prefixCls,
		classNames: mergedClassNames,
		styles: mergedStyles
	}, title));
};
//#endregion
//#region node_modules/antd/es/tooltip/index.js
var Tooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, openClassName, getTooltipContainer, color, children, afterOpenChange, arrow: tooltipArrow, destroyTooltipOnHide, destroyOnHidden, title, overlay, trigger, builtinPlacements, autoAdjustOverflow = true, motion, getPopupContainer, placement = "top", mouseEnterDelay, mouseLeaveDelay, rootClassName, styles, classNames, onOpenChange, overlayInnerStyle, overlayStyle, overlayClassName, ...restProps } = props;
	const [, token] = useToken();
	const injectFromPopover = props["data-popover-inject"];
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, ...semanticConfig } = useComponentConfig("tooltip");
	const { className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger, mouseEnterDelay: contextMouseEnterDelay, mouseLeaveDelay: contextMouseLeaveDelay } = injectFromPopover ? {} : semanticConfig;
	const mergedMouseEnterDelay = mouseEnterDelay ?? contextMouseEnterDelay ?? .1;
	const mergedMouseLeaveDelay = mouseLeaveDelay ?? contextMouseLeaveDelay ?? .1;
	const mergedArrow = useMergedArrow(tooltipArrow, contextArrow);
	const mergedShowArrow = mergedArrow.show;
	const mergedTrigger = trigger || contextTrigger || "hover";
	const mergedGetPopupContainer = getPopupContainer || getContextPopupContainer;
	const mergedDestroyOnHidden = destroyOnHidden ?? !!destroyTooltipOnHide;
	const inTableMeasureRow = import_react.useContext(TableMeasureRowContext);
	devUseWarning("Tooltip");
	const tooltipRef = import_react.useRef(null);
	const forceAlign = () => {
		tooltipRef.current?.forceAlign();
	};
	import_react.useImperativeHandle(ref, () => ({
		forceAlign,
		nativeElement: tooltipRef.current?.nativeElement,
		popupElement: tooltipRef.current?.popupElement
	}));
	const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
	const noTitle = !title && !overlay && title !== 0;
	const onInternalOpenChange = (vis) => {
		setOpen(noTitle ? false : vis);
		if (!noTitle && onOpenChange) onOpenChange(vis);
	};
	const tooltipPlacements = import_react.useMemo(() => {
		return builtinPlacements || getPlacements({
			arrowPointAtCenter: mergedArrow?.pointAtCenter ?? false,
			autoAdjustOverflow,
			arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
			borderRadius: token.borderRadius,
			offset: token.marginXXS,
			visibleFirst: true
		});
	}, [
		mergedArrow,
		builtinPlacements,
		token,
		mergedShowArrow,
		autoAdjustOverflow
	]);
	const memoOverlay = import_react.useMemo(() => {
		if (title === 0) return title;
		return overlay || title || "";
	}, [overlay, title]);
	const memoOverlayWrapper = /*#__PURE__*/ import_react.createElement(ContextIsolator, {
		space: true,
		form: true
	}, isFunction(memoOverlay) ? memoOverlay() : memoOverlay);
	const mergedProps = {
		...props,
		trigger: mergedTrigger,
		builtinPlacements: tooltipPlacements,
		getPopupContainer: mergedGetPopupContainer,
		destroyOnHidden: mergedDestroyOnHidden,
		mouseEnterDelay: mergedMouseEnterDelay,
		mouseLeaveDelay: mergedMouseLeaveDelay
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const overlayStyleRoot = useSemanticRootStyle(overlayStyle);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		overlayStyleRoot
	], { props: mergedProps });
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	let tempOpen = open;
	if (!("open" in props) && noTitle || inTableMeasureRow) tempOpen = false;
	const child = /*#__PURE__*/ import_react.isValidElement(children) && !isFragment(children) ? children : /*#__PURE__*/ import_react.createElement("span", null, children);
	const childProps = child.props;
	const childCls = !childProps.className || typeof childProps.className === "string" ? clsx(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$4(prefixCls, rootCls, !injectFromPopover);
	const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
	const arrowContentStyle = colorInfo.arrowStyle;
	const themeCls = clsx(rootCls, hashId, cssVarCls);
	const rootClassNames = clsx(overlayClassName, { [`${prefixCls}-rtl`]: direction === "rtl" }, colorInfo.className, rootClassName, themeCls, contextClassName, mergedClassNames.root);
	const [zIndex, contextZIndex] = useZIndex("Tooltip", restProps.zIndex);
	const containerStyle = {
		...mergedStyles.container,
		...overlayInnerStyle,
		...colorInfo.overlayStyle
	};
	const content = /*#__PURE__*/ import_react.createElement(es_default$3, {
		unique: true,
		...restProps,
		zIndex,
		showArrow: mergedShowArrow,
		placement,
		mouseEnterDelay: mergedMouseEnterDelay,
		mouseLeaveDelay: mergedMouseLeaveDelay,
		prefixCls,
		classNames: {
			root: rootClassNames,
			container: mergedClassNames.container,
			arrow: mergedClassNames.arrow,
			uniqueContainer: clsx(themeCls, mergedClassNames.container)
		},
		styles: {
			root: {
				...arrowContentStyle,
				...mergedStyles.root
			},
			container: containerStyle,
			uniqueContainer: containerStyle,
			arrow: mergedStyles.arrow
		},
		ref: tooltipRef,
		overlay: memoOverlayWrapper,
		visible: tempOpen,
		onVisibleChange: onInternalOpenChange,
		afterVisibleChange: afterOpenChange,
		arrowContent: /*#__PURE__*/ import_react.createElement("span", { className: `${prefixCls}-arrow-content` }),
		motion: {
			motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", typeof motion?.motionName === "string" ? motion?.motionName : void 0),
			motionDeadline: 1e3
		},
		trigger: mergedTrigger,
		builtinPlacements: tooltipPlacements,
		getTooltipContainer: mergedGetPopupContainer,
		destroyOnHidden: mergedDestroyOnHidden
	}, tempOpen && !restProps.disabled ? cloneElement(child, { className: childCls }) : child);
	return /*#__PURE__*/ import_react.createElement(ZIndexContext.Provider, { value: contextZIndex }, content);
});
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
Tooltip.UniqueProvider = UniqueProvider;
//#endregion
//#region node_modules/antd/es/form/util.js
var formItemNameBlackList = ["parentNode"];
var defaultItemNamePrefixCls = "form_item";
function toArray(candidate) {
	if (candidate === void 0 || candidate === false) return [];
	return Array.isArray(candidate) ? candidate : [candidate];
}
function getFieldId(namePath, formName) {
	if (!namePath.length) return;
	const mergedId = namePath.join("_");
	if (formName) return `${formName}_${mergedId}`;
	return formItemNameBlackList.includes(mergedId) ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId;
}
/**
* Get merged status by meta or passed `validateStatus`.
*/
function getStatus(errors, warnings, meta, defaultValidateStatus, hasFeedback, validateStatus) {
	let status = defaultValidateStatus;
	if (validateStatus !== void 0) status = validateStatus;
	else if (meta.validating) status = "validating";
	else if (errors.length) status = "error";
	else if (warnings.length) status = "warning";
	else if (meta.touched || hasFeedback && meta.validated) status = "success";
	return status;
}
//#endregion
//#region node_modules/antd/es/form/hooks/useForm.js
function toNamePathStr(name) {
	return toArray(name).join("_");
}
function getFieldDOMNode(name, wrapForm) {
	const field = wrapForm.getFieldInstance(name);
	const fieldDom = getDOM(field);
	if (fieldDom) return fieldDom;
	const fieldId = getFieldId(toArray(name), wrapForm.__INTERNAL__.name);
	if (fieldId) return document.getElementById(fieldId);
}
function useForm(form) {
	const [rcForm] = useForm$1();
	const itemsRef = import_react.useRef({});
	const wrapForm = import_react.useMemo(() => form ?? {
		...rcForm,
		__INTERNAL__: { itemRef: (name) => (node) => {
			const namePathStr = toNamePathStr(name);
			if (node) itemsRef.current[namePathStr] = node;
			else delete itemsRef.current[namePathStr];
		} },
		scrollToField: (name, options = {}) => {
			const { focus, ...restOpt } = options;
			const node = getFieldDOMNode(name, wrapForm);
			if (node) {
				e(node, {
					scrollMode: "if-needed",
					block: "nearest",
					...restOpt
				});
				if (focus) wrapForm.focusField(name);
			}
		},
		focusField: (name) => {
			const itemRef = wrapForm.getFieldInstance(name);
			if (isFunction(itemRef?.focus)) itemRef.focus();
			else getFieldDOMNode(name, wrapForm)?.focus?.();
		},
		getFieldInstance: (name) => {
			const namePathStr = toNamePathStr(name);
			return itemsRef.current[namePathStr];
		}
	}, [form, rcForm]);
	return [wrapForm];
}
//#endregion
//#region node_modules/antd/es/input/style/token.js
function initInputToken(token) {
	return merge$1(token, { inputAffixPadding: token.paddingXXS });
}
var initComponentToken = (token) => {
	const { controlHeight, fontSize, lineHeight, lineWidth, lineWidthFocus, controlHeightSM, controlHeightLG, fontSizeLG, lineHeightLG, paddingSM, controlPaddingHorizontalSM, controlPaddingHorizontal, colorFillAlter, colorPrimaryHover, colorPrimary, controlOutlineWidth, controlOutline, colorErrorOutline, colorWarningOutline, colorBgContainer, inputFontSize, inputFontSizeLG, inputFontSizeSM } = token;
	const mergedFontSize = inputFontSize || fontSize;
	const mergedFontSizeSM = inputFontSizeSM || mergedFontSize;
	const mergedFontSizeLG = inputFontSizeLG || fontSizeLG;
	const paddingBlock = Math.round((controlHeight - mergedFontSize * lineHeight) / 2 * 10) / 10 - lineWidth;
	const paddingBlockSM = Math.round((controlHeightSM - mergedFontSizeSM * lineHeight) / 2 * 10) / 10 - lineWidth;
	const paddingBlockLG = Math.ceil((controlHeightLG - mergedFontSizeLG * lineHeightLG) / 2 * 10) / 10 - lineWidth;
	return {
		lineWidthFocus: lineWidthFocus === 0 ? 0 : lineWidth,
		paddingBlock: Math.max(paddingBlock, 0),
		paddingBlockSM: Math.max(paddingBlockSM, 0),
		paddingBlockLG: Math.max(paddingBlockLG, 0),
		paddingInline: paddingSM - lineWidth,
		paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
		paddingInlineLG: controlPaddingHorizontal - lineWidth,
		addonBg: colorFillAlter,
		activeBorderColor: colorPrimary,
		hoverBorderColor: colorPrimaryHover,
		activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
		errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
		warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
		hoverBg: colorBgContainer,
		activeBg: colorBgContainer,
		inputFontSize: mergedFontSize,
		inputFontSizeLG: mergedFontSizeLG,
		inputFontSizeSM: mergedFontSizeSM
	};
};
//#endregion
//#region node_modules/antd/es/input/style/variants.js
var genHoverStyle = (token) => ({
	borderColor: token.hoverBorderColor,
	backgroundColor: token.hoverBg
});
var genDisabledStyle = (token) => ({
	color: token.colorTextDisabled,
	backgroundColor: token.colorBgContainerDisabled,
	borderColor: token.colorBorderDisabled,
	boxShadow: "none",
	cursor: "not-allowed",
	opacity: 1,
	"input[disabled], textarea[disabled]": { cursor: "not-allowed" },
	"&:hover:not([disabled])": { ...genHoverStyle(merge$1(token, {
		hoverBorderColor: token.colorBorderDisabled,
		hoverBg: token.colorBgContainerDisabled
	})) }
});
var genBaseOutlinedStyle = (token, options) => ({
	background: token.colorBgContainer,
	borderWidth: token.lineWidth,
	borderStyle: token.lineType,
	borderColor: options.borderColor,
	"&:hover": {
		borderColor: options.hoverBorderColor,
		backgroundColor: token.hoverBg
	},
	"&:focus, &:focus-within": {
		borderColor: options.activeBorderColor,
		boxShadow: options.activeShadow,
		outline: 0,
		backgroundColor: token.activeBg
	}
});
var genOutlinedStatusStyle = (token, options) => ({
	[`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
		...genBaseOutlinedStyle(token, options),
		[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
	},
	[`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: { borderColor: options.borderColor }
});
var genOutlinedStyle = (token, extraStyles) => ({ "&-outlined": {
	...genBaseOutlinedStyle(token, {
		borderColor: token.colorBorder,
		hoverBorderColor: token.hoverBorderColor,
		activeBorderColor: token.activeBorderColor,
		activeShadow: token.activeShadow
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: { ...genDisabledStyle(token) },
	...genOutlinedStatusStyle(token, {
		status: "error",
		borderColor: token.colorError,
		hoverBorderColor: token.colorErrorBorderHover,
		activeBorderColor: token.colorError,
		activeShadow: token.errorActiveShadow,
		affixColor: token.colorErrorAffix
	}),
	...genOutlinedStatusStyle(token, {
		status: "warning",
		borderColor: token.colorWarning,
		hoverBorderColor: token.colorWarningBorderHover,
		activeBorderColor: token.colorWarning,
		activeShadow: token.warningActiveShadow,
		affixColor: token.colorWarningAffix
	}),
	...extraStyles
} });
var genOutlinedGroupStatusStyle = (token, options) => ({ [`&${token.componentCls}-group-wrapper-status-${options.status}`]: { [`${token.componentCls}-group-addon`]: {
	borderColor: options.addonBorderColor,
	color: options.addonColor
} } });
var genOutlinedGroupStyle = (token) => ({ "&-outlined": {
	[`${token.componentCls}-group`]: {
		"&-addon": {
			background: token.addonBg,
			border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		},
		"&-addon:first-child": { borderInlineEnd: 0 },
		"&-addon:last-child": { borderInlineStart: 0 }
	},
	...genOutlinedGroupStatusStyle(token, {
		status: "error",
		addonBorderColor: token.colorError,
		addonColor: token.colorErrorText
	}),
	...genOutlinedGroupStatusStyle(token, {
		status: "warning",
		addonBorderColor: token.colorWarning,
		addonColor: token.colorWarningText
	}),
	[`&${token.componentCls}-group-wrapper-disabled`]: { [`${token.componentCls}-group-addon`]: { ...genDisabledStyle(token) } }
} });
var borderlessFocusVisibleSelector = "&:focus-visible, &:has(input:focus-visible), &:has(textarea:focus-visible)";
var genBorderlessFocusVisibleStyle = (token, outlineColor) => ({
	outline: `${unit(token.lineWidthFocus)} ${token.lineType} ${outlineColor}`,
	outlineOffset: unit(token.calc(token.lineWidth).mul(-1).equal()),
	transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(", ")
});
var genBorderlessStatusStyle = (token, options) => ({
	"&, & input, & textarea": { color: options.color },
	[borderlessFocusVisibleSelector]: genBorderlessFocusVisibleStyle(token, options.color),
	[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
});
var genBorderlessStyle = (token, extraStyles) => {
	const { componentCls } = token;
	return { "&-borderless": {
		background: "transparent",
		border: "none",
		paddingBlock: token.calc(token.paddingBlock).add(token.lineWidth).equal(),
		[`&${componentCls}-sm, &${componentCls}-affix-wrapper-sm`]: { paddingBlock: token.calc(token.paddingBlockSM).add(token.lineWidth).equal() },
		[`&${componentCls}-lg, &${componentCls}-affix-wrapper-lg`]: { paddingBlock: token.calc(token.paddingBlockLG).add(token.lineWidth).equal() },
		"&:focus, &:focus-within": { outline: "none" },
		[borderlessFocusVisibleSelector]: genBorderlessFocusVisibleStyle(token, token.activeBorderColor),
		[`&${componentCls}-disabled, &[disabled]`]: {
			color: token.colorTextDisabled,
			cursor: "not-allowed"
		},
		[`&${componentCls}-status-error`]: genBorderlessStatusStyle(token, {
			color: token.colorError,
			affixColor: token.colorErrorAffix
		}),
		[`&${componentCls}-status-warning`]: genBorderlessStatusStyle(token, {
			color: token.colorWarning,
			affixColor: token.colorWarningAffix
		}),
		...extraStyles
	} };
};
var genBaseFilledStyle = (token, options) => ({
	background: options.bg,
	borderWidth: token.lineWidth,
	borderStyle: token.lineType,
	borderColor: "transparent",
	"input&, & input, textarea&, & textarea": { color: options?.inputColor ?? "unset" },
	"&:hover": { background: options.hoverBg },
	"&:focus, &:focus-within": {
		outline: 0,
		borderColor: options.activeBorderColor,
		backgroundColor: token.activeBg
	}
});
var genFilledStatusStyle = (token, options) => ({ [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
	...genBaseFilledStyle(token, options),
	[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
} });
var genFilledStyle = (token, extraStyles) => ({ "&-filled": {
	...genBaseFilledStyle(token, {
		bg: token.colorFillTertiary,
		hoverBg: token.colorFillSecondary,
		activeBorderColor: token.activeBorderColor,
		inputColor: token.colorText
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: { ...genDisabledStyle(token) },
	...genFilledStatusStyle(token, {
		status: "error",
		bg: token.colorErrorBg,
		hoverBg: token.colorErrorBgHover,
		activeBorderColor: token.colorError,
		inputColor: token.colorErrorText,
		affixColor: token.colorErrorAffix
	}),
	...genFilledStatusStyle(token, {
		status: "warning",
		bg: token.colorWarningBg,
		hoverBg: token.colorWarningBgHover,
		activeBorderColor: token.colorWarning,
		inputColor: token.colorWarningText,
		affixColor: token.colorWarningAffix
	}),
	...extraStyles
} });
var genFilledGroupStatusStyle = (token, options) => ({ [`&${token.componentCls}-group-wrapper-status-${options.status}`]: { [`${token.componentCls}-group-addon`]: {
	background: options.addonBg,
	color: options.addonColor
} } });
var genFilledGroupStyle = (token) => ({ "&-filled": {
	[`${token.componentCls}-group-addon`]: {
		background: token.colorFillTertiary,
		"&:last-child": { position: "static" }
	},
	...genFilledGroupStatusStyle(token, {
		status: "error",
		addonBg: token.colorErrorBg,
		addonColor: token.colorErrorText
	}),
	...genFilledGroupStatusStyle(token, {
		status: "warning",
		addonBg: token.colorWarningBg,
		addonColor: token.colorWarningText
	}),
	[`&${token.componentCls}-group-wrapper-disabled`]: { [`${token.componentCls}-group`]: {
		"&-addon": {
			background: token.colorFillTertiary,
			color: token.colorTextDisabled
		},
		"&-addon:first-child": {
			borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		},
		"&-addon:last-child": {
			borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
			borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
		}
	} }
} });
var genBaseUnderlinedStyle = (token, options) => ({
	background: token.colorBgContainer,
	borderWidth: `${unit(token.lineWidth)} 0`,
	borderStyle: `${token.lineType} none`,
	borderColor: `transparent transparent ${options.borderColor} transparent`,
	borderRadius: 0,
	"&:hover": {
		borderColor: `transparent transparent ${options.hoverBorderColor} transparent`,
		backgroundColor: token.hoverBg
	},
	"&:focus, &:focus-within": {
		borderColor: `transparent transparent ${options.activeBorderColor} transparent`,
		outline: 0,
		backgroundColor: token.activeBg
	}
});
var genUnderlinedStatusStyle = (token, options) => ({
	[`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
		...genBaseUnderlinedStyle(token, options),
		[`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: { color: options.affixColor }
	},
	[`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: { borderColor: `transparent transparent ${options.borderColor} transparent` }
});
var genUnderlinedStyle = (token, extraStyles) => ({ "&-underlined": {
	...genBaseUnderlinedStyle(token, {
		borderColor: token.colorBorder,
		hoverBorderColor: token.hoverBorderColor,
		activeBorderColor: token.activeBorderColor,
		activeShadow: token.activeShadow
	}),
	[`&${token.componentCls}-disabled, &[disabled]`]: {
		color: token.colorTextDisabled,
		boxShadow: "none",
		cursor: "not-allowed",
		"&:hover": { borderColor: `transparent transparent ${token.colorBorder} transparent` }
	},
	"input[disabled], textarea[disabled]": { cursor: "not-allowed" },
	...genUnderlinedStatusStyle(token, {
		status: "error",
		borderColor: token.colorError,
		hoverBorderColor: token.colorErrorBorderHover,
		activeBorderColor: token.colorError,
		activeShadow: token.errorActiveShadow,
		affixColor: token.colorErrorAffix
	}),
	...genUnderlinedStatusStyle(token, {
		status: "warning",
		borderColor: token.colorWarning,
		hoverBorderColor: token.colorWarningBorderHover,
		activeBorderColor: token.colorWarning,
		activeShadow: token.warningActiveShadow,
		affixColor: token.colorWarningAffix
	}),
	...extraStyles
} });
//#endregion
//#region node_modules/antd/es/input/style/index.js
var genPlaceholderStyle = (color) => ({
	"&::-moz-placeholder": { opacity: 1 },
	"&::placeholder": {
		color,
		userSelect: "none"
	},
	"&:placeholder-shown": { textOverflow: "ellipsis" }
});
var genInputLargeStyle = (token) => {
	const { paddingBlockLG, lineHeightLG, borderRadiusLG, paddingInlineLG } = token;
	return {
		padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
		fontSize: token.inputFontSizeLG,
		lineHeight: lineHeightLG,
		borderRadius: borderRadiusLG
	};
};
var genInputSmallStyle = (token) => ({
	padding: `${unit(token.paddingBlockSM)} ${unit(token.paddingInlineSM)}`,
	fontSize: token.inputFontSizeSM,
	borderRadius: token.borderRadiusSM
});
var genBasicInputStyle = (token, option = {}) => ({
	position: "relative",
	display: "inline-block",
	width: "100%",
	minWidth: 0,
	padding: `${unit(token.paddingBlock)} ${unit(token.paddingInline)}`,
	color: token.colorText,
	fontSize: token.inputFontSize,
	lineHeight: token.lineHeight,
	borderRadius: token.borderRadius,
	transition: `all ${token.motionDurationMid}`,
	...genPlaceholderStyle(token.colorTextPlaceholder),
	"&-lg": {
		...genInputLargeStyle(token),
		...option.largeStyle
	},
	"&-sm": {
		...genInputSmallStyle(token),
		...option.smallStyle
	},
	"&-rtl, &-textarea-rtl": { direction: "rtl" }
});
var genInputGroupStyle = (token) => {
	const { componentCls, antCls } = token;
	return {
		position: "relative",
		display: "table",
		width: "100%",
		borderCollapse: "separate",
		borderSpacing: 0,
		"&[class*='col-']": {
			paddingInlineEnd: token.paddingXS,
			"&:last-child": { paddingInlineEnd: 0 }
		},
		[`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: { ...genInputLargeStyle(token) },
		[`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: { ...genInputSmallStyle(token) },
		[`&-lg ${antCls}-select-single`]: { height: token.controlHeightLG },
		[`&-sm ${antCls}-select-single`]: { height: token.controlHeightSM },
		[`> ${componentCls}`]: {
			display: "table-cell",
			"&:not(:first-child):not(:last-child)": { borderRadius: 0 }
		},
		[`${componentCls}-group`]: {
			"&-addon, &-wrap": {
				display: "table-cell",
				width: 1,
				whiteSpace: "nowrap",
				verticalAlign: "middle",
				"&:not(:first-child):not(:last-child)": { borderRadius: 0 }
			},
			"&-wrap > *": { display: "block !important" },
			"&-addon": {
				position: "relative",
				padding: `0 ${unit(token.paddingInline)}`,
				color: token.colorText,
				fontWeight: "normal",
				fontSize: token.inputFontSize,
				textAlign: "center",
				borderRadius: token.borderRadius,
				transition: `all ${token.motionDurationSlow}`,
				lineHeight: 1,
				[`${antCls}-select`]: {
					margin: `${unit(token.calc(token.paddingBlock).add(1).mul(-1).equal())} ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
					[`&${antCls}-select-single:not(${antCls}-select-customize-input):not(${antCls}-pagination-size-changer)`]: {
						backgroundColor: "inherit",
						border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
						boxShadow: "none"
					}
				},
				[`${antCls}-cascader-picker`]: {
					margin: `-9px ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
					backgroundColor: "transparent",
					[`${antCls}-cascader-input`]: {
						textAlign: "start",
						border: 0,
						boxShadow: "none"
					}
				}
			}
		},
		[componentCls]: {
			width: "100%",
			marginBottom: 0,
			textAlign: "inherit",
			"&:focus": {
				zIndex: 1,
				borderInlineEndWidth: 1
			},
			"&:hover": {
				zIndex: 1,
				borderInlineEndWidth: 1
			}
		},
		[`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0,
			[`${antCls}-select`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			}
		},
		[`> ${componentCls}-affix-wrapper`]: {
			[`&:not(:first-child) ${componentCls}`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			},
			[`&:not(:last-child) ${componentCls}`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			}
		},
		[`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0,
			[`${antCls}-select`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			}
		},
		[`${componentCls}-affix-wrapper`]: {
			"&:not(:last-child)": {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			},
			"&:not(:first-child)": {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			}
		},
		[`&${componentCls}-group-compact`]: {
			display: "block",
			...clearFix(),
			[`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: { "&:not(:first-child):not(:last-child)": {
				borderInlineEndWidth: token.lineWidth,
				"&:hover, &:focus": { zIndex: 1 }
			} },
			"& > *": {
				display: "inline-flex",
				float: "none",
				verticalAlign: "top",
				borderRadius: 0
			},
			[`
        & > ${componentCls}-affix-wrapper,
        & > ${componentCls}-number-affix-wrapper,
        & > ${antCls}-picker-range
      `]: { display: "inline-flex" },
			"& > *:not(:last-child)": {
				marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
				borderInlineEndWidth: token.lineWidth
			},
			[componentCls]: { float: "none" },
			[`& > ${antCls}-select,
      & > ${antCls}-select-auto-complete ${componentCls},
      & > ${antCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
				borderInlineEndWidth: token.lineWidth,
				borderRadius: 0,
				"&:hover, &:focus": { zIndex: 1 }
			},
			[`& > ${antCls}-select-focused`]: { zIndex: 1 },
			[`& > ${antCls}-select > ${antCls}-select-arrow`]: { zIndex: 1 },
			[`& > *:first-child,
      & > ${antCls}-select:first-child,
      & > ${antCls}-select-auto-complete:first-child ${componentCls},
      & > ${antCls}-cascader-picker:first-child ${componentCls}`]: {
				borderStartStartRadius: token.borderRadius,
				borderEndStartRadius: token.borderRadius
			},
			[`& > *:last-child,
      & > ${antCls}-select:last-child,
      & > ${antCls}-cascader-picker:last-child ${componentCls},
      & > ${antCls}-cascader-picker-focused:last-child ${componentCls}`]: {
				borderInlineEndWidth: token.lineWidth,
				borderStartEndRadius: token.borderRadius,
				borderEndEndRadius: token.borderRadius
			},
			[`& > ${antCls}-select-auto-complete ${componentCls}`]: { verticalAlign: "top" },
			[`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
				marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
				[`${componentCls}-affix-wrapper`]: {}
			}
		}
	};
};
var genInputStyle = (token) => {
	const { componentCls, controlHeightSM, lineWidth, calc } = token;
	const colorSmallPadding = calc(controlHeightSM).sub(calc(lineWidth).mul(2)).sub(16).div(2).equal();
	return { [componentCls]: {
		...resetComponent(token),
		...genBasicInputStyle(token),
		...genOutlinedStyle(token),
		...genFilledStyle(token),
		...genBorderlessStyle(token),
		...genUnderlinedStyle(token),
		"&[type=\"color\"]": {
			height: token.controlHeight,
			[`&${componentCls}-lg`]: { height: token.controlHeightLG },
			[`&${componentCls}-sm`]: {
				height: controlHeightSM,
				paddingTop: colorSmallPadding,
				paddingBottom: colorSmallPadding
			}
		},
		"&[type=\"search\"]::-webkit-search-cancel-button, &[type=\"search\"]::-webkit-search-decoration": { appearance: "none" }
	} };
};
var genAllowClearStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-clear-icon`]: {
		margin: 0,
		padding: 0,
		lineHeight: 0,
		color: token.colorTextQuaternary,
		fontSize: token.fontSizeIcon,
		verticalAlign: -1,
		cursor: "pointer",
		transition: `color ${token.motionDurationSlow}`,
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		"&:hover": { color: token.colorIcon },
		"&:focus-visible": {
			color: token.colorIcon,
			borderRadius: token.borderRadiusSM,
			...genFocusOutline(token)
		},
		"&:active": { color: token.colorText },
		"&-hidden": { visibility: "hidden" },
		"&-has-suffix": { margin: `0 ${unit(token.inputAffixPadding)}` }
	} };
};
var genAffixStyle = (token) => {
	const { componentCls, inputAffixPadding, colorTextDescription, motionDurationSlow, colorIcon, colorIconHover } = token;
	const affixCls = `${componentCls}-affix-wrapper`;
	const affixClsDisabled = `${componentCls}-affix-wrapper-disabled`;
	return {
		[affixCls]: {
			...genBasicInputStyle(token),
			display: "inline-flex",
			"&-focused, &:focus": { zIndex: 1 },
			[`> input${componentCls}`]: { padding: 0 },
			[`> input${componentCls}, > textarea${componentCls}`]: {
				fontSize: "inherit",
				border: "none",
				borderRadius: 0,
				outline: "none",
				background: "transparent",
				color: "inherit",
				"&::-ms-reveal": { display: "none" },
				"&:focus": { boxShadow: "none !important" }
			},
			"&::before": {
				display: "inline-block",
				width: 0,
				visibility: "hidden",
				content: "\"\\a0\""
			},
			[componentCls]: {
				"&-prefix, &-suffix": {
					display: "flex",
					flex: "none",
					alignItems: "center",
					"> *:not(:last-child)": { marginInlineEnd: token.paddingXS }
				},
				"&-show-count-suffix": {
					color: colorTextDescription,
					direction: "ltr"
				},
				"&-show-count-has-suffix": { marginInlineEnd: token.paddingXXS },
				"&-prefix": { marginInlineEnd: inputAffixPadding },
				"&-suffix": { marginInlineStart: inputAffixPadding },
				"&-password-icon": {
					display: "inline-flex",
					color: colorIcon,
					cursor: "pointer",
					transition: `all ${motionDurationSlow}`,
					"&:hover": { color: colorIconHover }
				}
			},
			...genAllowClearStyle(token)
		},
		[`${componentCls}-underlined`]: { borderRadius: 0 },
		[affixClsDisabled]: { [`${componentCls}-password-icon`]: {
			color: colorIcon,
			cursor: "not-allowed",
			"&:hover": { color: colorIcon }
		} }
	};
};
var genGroupStyle = (token) => {
	const { componentCls, borderRadiusLG, borderRadiusSM } = token;
	return { [`${componentCls}-group`]: {
		...resetComponent(token),
		...genInputGroupStyle(token),
		"&-rtl": { direction: "rtl" },
		"&-wrapper": {
			display: "inline-block",
			width: "100%",
			textAlign: "start",
			verticalAlign: "top",
			"&-rtl": { direction: "rtl" },
			"&-lg": { [`${componentCls}-group-addon`]: {
				borderRadius: borderRadiusLG,
				fontSize: token.inputFontSizeLG
			} },
			"&-sm": { [`${componentCls}-group-addon`]: { borderRadius: borderRadiusSM } },
			...genOutlinedGroupStyle(token),
			...genFilledGroupStyle(token),
			[`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: { borderRadius: 0 } },
			[`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			} },
			[`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: { [`${componentCls}, ${componentCls}-group-addon`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			} },
			[`&:not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: { [`${componentCls}-affix-wrapper`]: {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			} },
			[`&:not(${componentCls}-compact-first-item)${componentCls}-compact-item`]: { [`${componentCls}-affix-wrapper`]: {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			} }
		}
	} };
};
var genRangeStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-out-of-range`]: { [`&, & input, & textarea, ${componentCls}-show-count-suffix, ${componentCls}-data-count`]: { color: token.colorError } } };
};
var useSharedStyle = genStyleHooks(["Input", "Shared"], (token) => {
	const inputToken = merge$1(token, initInputToken(token));
	return [genInputStyle(inputToken), genAffixStyle(inputToken)];
}, initComponentToken, { resetFont: false });
var style_default$3 = genStyleHooks(["Input", "Component"], (token) => {
	const inputToken = merge$1(token, initInputToken(token));
	return [
		genGroupStyle(inputToken),
		genRangeStyle(inputToken),
		genCompactItemStyle(inputToken, {
			focus: true,
			focusElCls: `${inputToken.componentCls}-affix-wrapper-focused`
		})
	];
}, initComponentToken, { resetFont: false });
//#endregion
//#region node_modules/throttle-debounce/esm/index.js
/**
* Throttle execution of a function. Especially useful for rate limiting
* execution of handlers on events like resize and scroll.
*
* @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
*                                            are most useful.
* @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
*                                            as-is, to `callback` when the throttled-function is executed.
* @param {object} [options] -              An object to configure options.
* @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
*                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
*                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
*                                            `delay` milliseconds, the internal counter is reset).
* @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
*                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
*                                            callback will never executed if both noLeading = true and noTrailing = true.
* @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
*                                            false (at end), schedule `callback` to execute after `delay` ms.
*
* @returns {Function} A new, throttled, function.
*/
function throttle(delay, callback, options) {
	var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
	var timeoutID;
	var cancelled = false;
	var lastExec = 0;
	function clearExistingTimeout() {
		if (timeoutID) clearTimeout(timeoutID);
	}
	function cancel(options) {
		var _ref2$upcomingOnly = (options || {}).upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
		clearExistingTimeout();
		cancelled = !upcomingOnly;
	}
	function wrapper() {
		for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) arguments_[_key] = arguments[_key];
		var self = this;
		var elapsed = Date.now() - lastExec;
		if (cancelled) return;
		function exec() {
			lastExec = Date.now();
			callback.apply(self, arguments_);
		}
		function clear() {
			timeoutID = void 0;
		}
		if (!noLeading && debounceMode && !timeoutID) exec();
		clearExistingTimeout();
		if (debounceMode === void 0 && elapsed > delay) {
			if (noLeading) {
				lastExec = Date.now();
				if (!noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, delay);
			} else exec();
		} else if (noTrailing !== true) timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
	}
	wrapper.cancel = cancel;
	return wrapper;
}
/**
* Debounce execution of a function. Debouncing, unlike throttling,
* guarantees that a function is only executed a single time, either at the
* very beginning of a series of calls, or at the very end.
*
* @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
* @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
*                                        to `callback` when the debounced-function is executed.
* @param {object} [options] -           An object to configure options.
* @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
*                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
*                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
*
* @returns {Function} A new, debounced function.
*/
function debounce(delay, callback, options) {
	var _ref$atBegin = (options || {}).atBegin;
	return throttle(delay, callback, { debounceMode: (_ref$atBegin === void 0 ? false : _ref$atBegin) !== false });
}
//#endregion
//#region node_modules/antd/es/grid/RowContext.js
var RowContext = /*#__PURE__*/ (0, import_react.createContext)({});
//#endregion
//#region node_modules/antd/es/grid/col.js
function parseFlex(flex) {
	if (flex === "auto") return "1 1 auto";
	if (isNumber(flex)) return `${flex} ${flex} auto`;
	if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;
	return flex;
}
var Col = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { gutter, wrap } = import_react.useContext(RowContext);
	const { prefixCls: customizePrefixCls, span, order, offset, push, pull, className, children, flex, style, ...others } = props;
	const prefixCls = getPrefixCls("col", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [hashId, cssVarCls] = useColStyle(prefixCls);
	const [varName] = genCssVar(rootPrefixCls, "col");
	const sizeStyle = {};
	let sizeClassObj = {};
	responsiveArrayReversed.forEach((size) => {
		let sizeProps = {};
		const propSize = props[size];
		if (isNumber(propSize)) sizeProps.span = propSize;
		else if (isPlainObject(propSize)) sizeProps = propSize || {};
		delete others[size];
		sizeClassObj = {
			...sizeClassObj,
			[`${prefixCls}-${size}-${sizeProps.span}`]: isNonNullable(sizeProps.span),
			[`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
			[`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
			[`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
			[`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
			[`${prefixCls}-rtl`]: direction === "rtl"
		};
		if (sizeProps.flex || sizeProps.flex === 0) {
			sizeClassObj[`${prefixCls}-${size}-flex`] = true;
			sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
		}
	});
	const classes = clsx(prefixCls, {
		[`${prefixCls}-${span}`]: span !== void 0,
		[`${prefixCls}-order-${order}`]: order,
		[`${prefixCls}-offset-${offset}`]: offset,
		[`${prefixCls}-push-${push}`]: push,
		[`${prefixCls}-pull-${pull}`]: pull
	}, className, sizeClassObj, hashId, cssVarCls);
	const mergedStyle = {};
	if (gutter?.[0]) mergedStyle.paddingInline = isNumber(gutter[0]) ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;
	if (flex || flex === 0) {
		mergedStyle.flex = parseFlex(flex);
		if (wrap === false && !mergedStyle.minWidth) mergedStyle.minWidth = 0;
	}
	return /*#__PURE__*/ import_react.createElement("div", {
		...others,
		style: {
			...mergedStyle,
			...style,
			...sizeStyle
		},
		className: classes,
		ref
	}, children);
});
//#endregion
//#region node_modules/antd/es/grid/hooks/useGutter.js
function useGutter(gutter, screens) {
	const results = [void 0, void 0];
	const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, void 0];
	const mergedScreens = screens || {
		xs: true,
		sm: true,
		md: true,
		lg: true,
		xl: true,
		xxl: true,
		xxxl: true
	};
	normalizedGutter.forEach((g, index) => {
		if (isPlainObject(g)) for (let i = 0; i < responsiveArray.length; i++) {
			const breakpoint = responsiveArray[i];
			if (mergedScreens[breakpoint] && g[breakpoint] !== void 0) {
				results[index] = g[breakpoint];
				break;
			}
		}
		else results[index] = g;
	});
	return results;
}
//#endregion
//#region node_modules/antd/es/grid/row.js
var useMergedPropByScreen = (oriProp, screen) => {
	const [prop, setProp] = import_react.useState(() => isString(oriProp) ? oriProp : "");
	const calcMergedAlignOrJustify = () => {
		if (isString(oriProp)) setProp(oriProp);
		if (!isPlainObject(oriProp)) return;
		for (let i = 0; i < responsiveArray.length; i++) {
			const breakpoint = responsiveArray[i];
			if (!screen || !screen[breakpoint]) continue;
			const curVal = oriProp[breakpoint];
			if (curVal !== void 0) {
				setProp(curVal);
				return;
			}
		}
	};
	import_react.useEffect(() => {
		calcMergedAlignOrJustify();
	}, [JSON.stringify(oriProp), screen]);
	return prop;
};
var Row = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, justify, align, className, style, children, gutter = 0, wrap, ...others } = props;
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const screens = useBreakpoint(true, null);
	const mergedAlign = useMergedPropByScreen(align, screens);
	const mergedJustify = useMergedPropByScreen(justify, screens);
	const prefixCls = getPrefixCls("row", customizePrefixCls);
	const [hashId, cssVarCls] = useRowStyle(prefixCls);
	const gutters = useGutter(gutter, screens);
	const classes = clsx(prefixCls, {
		[`${prefixCls}-no-wrap`]: wrap === false,
		[`${prefixCls}-${mergedJustify}`]: mergedJustify,
		[`${prefixCls}-${mergedAlign}`]: mergedAlign,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId, cssVarCls);
	const rowStyle = {};
	if (gutters?.[0]) rowStyle.marginInline = isNumber(gutters[0]) ? `${gutters[0] / -2}px` : `calc(${gutters[0]} / -2)`;
	const [gutterH, gutterV] = gutters;
	rowStyle.rowGap = gutterV;
	const rowContext = import_react.useMemo(() => ({
		gutter: [gutterH, gutterV],
		wrap
	}), [
		gutterH,
		gutterV,
		wrap
	]);
	return /*#__PURE__*/ import_react.createElement(RowContext.Provider, { value: rowContext }, /*#__PURE__*/ import_react.createElement("div", {
		...others,
		className: classes,
		style: {
			...rowStyle,
			...style
		},
		ref
	}, children));
});
//#endregion
//#region node_modules/antd/es/space/style/addon.js
var genSpaceAddonStyle = (token) => {
	const { componentCls, borderRadius, paddingSM, colorBorder, paddingXS, fontSizeLG, fontSizeSM, borderRadiusLG, borderRadiusSM, colorBgContainerDisabled, lineWidth, lineType, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "space-addon");
	return { [componentCls]: [
		{
			...resetComponent(token),
			display: "inline-flex",
			alignItems: "center",
			gap: 0,
			whiteSpace: "nowrap",
			paddingInline: paddingSM,
			margin: 0,
			borderWidth: lineWidth,
			borderStyle: lineType,
			borderRadius,
			"&:hover": { zIndex: 0 },
			[`&${componentCls}-disabled`]: { color: token.colorTextDisabled },
			"&-large": {
				fontSize: fontSizeLG,
				borderRadius: borderRadiusLG
			},
			"&-small": {
				paddingInline: paddingXS,
				borderRadius: borderRadiusSM,
				fontSize: fontSizeSM
			},
			"&-compact-last-item": {
				borderEndStartRadius: 0,
				borderStartStartRadius: 0
			},
			"&-compact-first-item": {
				borderEndEndRadius: 0,
				borderStartEndRadius: 0
			},
			"&-compact-item:not(:first-child):not(:last-child)": { borderRadius: 0 },
			"&-compact-item:not(:last-child)": { borderInlineEndWidth: 0 },
			"&-compact-item:not(:first-child)": { borderInlineStartWidth: 0 }
		},
		{
			[varName("addon-border-color")]: colorBorder,
			[varName("addon-background")]: colorBgContainerDisabled,
			[varName("addon-border-color-outlined")]: colorBorder,
			[varName("addon-background-filled")]: colorBgContainerDisabled,
			borderColor: varRef("addon-border-color"),
			background: varRef("addon-background"),
			"&-variant-outlined": { [varName("addon-border-color")]: varRef("addon-border-color-outlined") },
			"&-variant-filled": {
				[varName("addon-border-color")]: "transparent",
				[varName("addon-background")]: varRef("addon-background-filled"),
				[`&${componentCls}-disabled`]: {
					[varName("addon-border-color")]: colorBorder,
					[varName("addon-background")]: colorBgContainerDisabled
				}
			},
			"&-variant-borderless": {
				border: "none",
				background: "transparent"
			},
			"&-variant-underlined": {
				border: "none",
				background: "transparent"
			}
		},
		{
			"&-status-error": {
				[varName("addon-border-color-outlined")]: token.colorError,
				[varName("addon-background-filled")]: token.colorErrorBg,
				color: token.colorError
			},
			"&-status-warning": {
				[varName("addon-border-color-outlined")]: token.colorWarning,
				[varName("addon-background-filled")]: token.colorWarningBg,
				color: token.colorWarning
			}
		}
	] };
};
var addon_default = genStyleHooks("Addon", (token) => [genSpaceAddonStyle(token), genCompactItemStyle(token, { focus: false })]);
//#endregion
//#region node_modules/antd/es/space/Addon.js
var SpaceAddon = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { className, children, style, prefixCls: customizePrefixCls, variant = "outlined", disabled, status, ...restProps } = props;
	const { getPrefixCls, direction: directionConfig } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("space-addon", customizePrefixCls);
	const [hashId, cssVarCls] = addon_default(prefixCls);
	const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);
	const statusCls = getStatusClassNames(prefixCls, status);
	const classes = clsx(prefixCls, hashId, compactItemClassnames, cssVarCls, `${prefixCls}-variant-${variant}`, statusCls, {
		[`${prefixCls}-${compactSize}`]: compactSize,
		[`${prefixCls}-disabled`]: disabled
	}, className);
	return /*#__PURE__*/ import_react.createElement("div", {
		ref,
		className: classes,
		style,
		...restProps
	}, children);
});
//#endregion
//#region node_modules/antd/es/input/hooks/useRemovePasswordTimeout.js
function useRemovePasswordTimeout(inputRef, triggerOnMount) {
	const removePasswordTimeoutRef = (0, import_react.useRef)([]);
	const removePasswordTimeout = () => {
		removePasswordTimeoutRef.current.push(setTimeout(() => {
			if (inputRef.current?.input && inputRef.current?.input.getAttribute("type") === "password" && inputRef.current?.input.hasAttribute("value")) inputRef.current?.input.removeAttribute("value");
		}));
	};
	(0, import_react.useEffect)(() => {
		if (triggerOnMount) removePasswordTimeout();
		return () => removePasswordTimeoutRef.current.forEach((timer) => {
			if (timer) clearTimeout(timer);
		});
	}, [triggerOnMount]);
	return removePasswordTimeout;
}
//#endregion
//#region node_modules/antd/es/input/utils.js
function hasPrefixSuffix(props) {
	return !!(props.prefix || props.suffix || props.allowClear || props.showCount);
}
//#endregion
//#region node_modules/antd/es/input/Input.js
var Input$1 = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls: customizePrefixCls, bordered = true, status: customStatus, size: customSize, disabled: customDisabled, onBlur, onFocus, suffix, allowClear, addonAfter, addonBefore, className, style, styles, rootClassName, onChange, classNames, variant: customVariant, ...rest } = props;
	const { getPrefixCls, direction, allowClear: contextAllowClear, autoComplete: contextAutoComplete, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("input");
	const prefixCls = getPrefixCls("input", customizePrefixCls);
	const inputRef = (0, import_react.useRef)(null);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
	style_default$3(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customSize ?? compactSize ?? ctx);
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled: mergedDisabled
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const { status: contextStatus, hasFeedback, feedbackIcon } = (0, import_react.useContext)(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
	(0, import_react.useRef)(inputHasPrefixSuffix);
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
	const handleBlur = (e) => {
		removePasswordTimeout();
		onBlur?.(e);
	};
	const handleFocus = (e) => {
		removePasswordTimeout();
		onFocus?.(e);
	};
	const handleChange = (e) => {
		removePasswordTimeout();
		onChange?.(e);
	};
	const suffixNode = (hasFeedback || suffix) && /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, suffix, hasFeedback && feedbackIcon);
	const mergedAllowClear = useAllowClear({
		allowClear,
		contextAllowClear,
		componentName: "Input"
	});
	const [variant, enableVariantCls] = useVariant("input", customVariant, bordered);
	return /*#__PURE__*/ import_react.createElement(es_default, {
		ref: composeRef(ref, inputRef),
		prefixCls,
		autoComplete: contextAutoComplete,
		...rest,
		disabled: mergedDisabled,
		onBlur: handleBlur,
		onFocus: handleFocus,
		style: mergedStyles.root,
		styles: mergedStyles,
		suffix: suffixNode,
		allowClear: mergedAllowClear,
		className: clsx(className, rootClassName, cssVarCls, rootCls, compactItemClassnames, contextClassName, mergedClassNames.root),
		onChange: handleChange,
		addonBefore: addonBefore && /*#__PURE__*/ import_react.createElement(ContextIsolator, {
			form: true,
			space: true
		}, addonBefore),
		addonAfter: addonAfter && /*#__PURE__*/ import_react.createElement(ContextIsolator, {
			form: true,
			space: true
		}, addonAfter),
		classNames: {
			...mergedClassNames,
			input: clsx({
				[`${prefixCls}-sm`]: mergedSize === "small",
				[`${prefixCls}-lg`]: mergedSize === "large",
				[`${prefixCls}-rtl`]: direction === "rtl"
			}, mergedClassNames.input, hashId),
			variant: clsx({ [`${prefixCls}-${variant}`]: enableVariantCls }, getStatusClassNames(prefixCls, mergedStatus)),
			affixWrapper: clsx({
				[`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl"
			}, hashId),
			wrapper: clsx({ [`${prefixCls}-group-rtl`]: direction === "rtl" }, hashId),
			groupWrapper: clsx({
				[`${prefixCls}-group-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-group-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-group-wrapper-rtl`]: direction === "rtl",
				[`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls
			}, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId)
		}
	});
});
//#endregion
//#region node_modules/antd/es/_util/gapSize.js
function isPresetSize(size) {
	return [
		"small",
		"middle",
		"medium",
		"large"
	].includes(size);
}
function isValidGapNumber(size) {
	if (!size) return false;
	return isNumber(size);
}
//#endregion
//#region node_modules/antd/es/space/context.js
var SpaceContext = /*#__PURE__*/ import_react.createContext({ latestIndex: 0 });
var SpaceContextProvider = SpaceContext.Provider;
//#endregion
//#region node_modules/antd/es/space/Item.js
var Item = (props) => {
	const { className, prefix, index, children, separator, style, classNames, styles } = props;
	const { latestIndex } = import_react.useContext(SpaceContext);
	if (!isReactRenderable(children)) return null;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement("div", {
		className,
		style
	}, children), index < latestIndex && separator && /*#__PURE__*/ import_react.createElement("span", {
		className: clsx(`${prefix}-item-separator`, classNames?.separator),
		style: styles?.separator
	}, separator));
};
//#endregion
//#region node_modules/antd/es/space/style/index.js
var genSpaceStyle = (token) => {
	const { componentCls, antCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-rtl": { direction: "rtl" },
		"&-vertical": { flexDirection: "column" },
		"&-align": {
			flexDirection: "column",
			"&-center": { alignItems: "center" },
			"&-start": { alignItems: "flex-start" },
			"&-end": { alignItems: "flex-end" },
			"&-baseline": { alignItems: "baseline" }
		},
		[`${componentCls}-item:empty`]: { display: "none" },
		[`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: { display: "block" }
	} };
};
var genSpaceGapStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-gap-row-small": { rowGap: token.spaceGapSmallSize },
		"&-gap-row-medium, &-gap-row-middle": { rowGap: token.spaceGapMiddleSize },
		"&-gap-row-large": { rowGap: token.spaceGapLargeSize },
		"&-gap-col-small": { columnGap: token.spaceGapSmallSize },
		"&-gap-col-medium, &-gap-col-middle": { columnGap: token.spaceGapMiddleSize },
		"&-gap-col-large": { columnGap: token.spaceGapLargeSize }
	} };
};
var style_default$2 = genStyleHooks("Space", (token) => {
	const spaceToken = merge$1(token, {
		spaceGapSmallSize: token.paddingXS,
		spaceGapMiddleSize: token.padding,
		spaceGapLargeSize: token.paddingLG
	});
	return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken)];
}, () => ({}), { resetStyle: false });
//#endregion
//#region node_modules/antd/es/space/index.js
var Space = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction: directionConfig, size: contextSize, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("space");
	const { size = contextSize ?? "small", align, className, rootClassName, children, direction, orientation, prefixCls: customizePrefixCls, split, separator, style, vertical, wrap = false, classNames, styles, ...restProps } = props;
	const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];
	const isPresetVerticalSize = isPresetSize(verticalSize);
	const isPresetHorizontalSize = isPresetSize(horizontalSize);
	const isValidVerticalSize = isValidGapNumber(verticalSize);
	const isValidHorizontalSize = isValidGapNumber(horizontalSize);
	const childNodes = toArray$1(children, { keepEmpty: true });
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	const mergedAlign = align === void 0 && !mergedVertical ? "center" : align;
	const mergedSeparator = separator ?? split;
	const prefixCls = getPrefixCls("space", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$2(prefixCls);
	const mergedProps = {
		...props,
		size,
		orientation: mergedOrientation,
		align: mergedAlign
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const rootClassNames = clsx(prefixCls, contextClassName, hashId, `${prefixCls}-${mergedOrientation}`, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
		[`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
		[`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize
	}, className, rootClassName, cssVarCls, mergedClassNames.root);
	const itemClassName = clsx(`${prefixCls}-item`, mergedClassNames.item);
	const renderedItems = childNodes.map((child, i) => {
		const key = child?.key || `${itemClassName}-${i}`;
		return /*#__PURE__*/ import_react.createElement(Item, {
			prefix: prefixCls,
			classNames: mergedClassNames,
			styles: mergedStyles,
			className: itemClassName,
			key,
			index: i,
			separator: mergedSeparator,
			style: mergedStyles.item
		}, child);
	});
	const memoizedSpaceContext = import_react.useMemo(() => {
		return { latestIndex: childNodes.reduce((latest, child, i) => isReactRenderable(child) ? i : latest, 0) };
	}, [childNodes]);
	if (childNodes.length === 0) return null;
	const gapStyle = {};
	if (wrap) gapStyle.flexWrap = "wrap";
	if (!isPresetHorizontalSize && isValidHorizontalSize) gapStyle.columnGap = horizontalSize;
	if (!isPresetVerticalSize && isValidVerticalSize) gapStyle.rowGap = verticalSize;
	return /*#__PURE__*/ import_react.createElement("div", {
		ref,
		className: rootClassNames,
		style: {
			...gapStyle,
			...mergedStyles.root
		},
		...restProps
	}, /*#__PURE__*/ import_react.createElement(SpaceContextProvider, { value: memoizedSpaceContext }, renderedItems));
});
Space.Compact = Compact;
Space.Addon = SpaceAddon;
//#endregion
//#region node_modules/antd/es/_util/convertToTooltipProps.js
var convertToTooltipProps = (tooltip, context) => {
	if (!isReactRenderable(tooltip)) return null;
	if (isPlainObject(tooltip) && !/*#__PURE__*/ (0, import_react.isValidElement)(tooltip)) return {
		...context,
		...tooltip
	};
	return {
		...context,
		title: tooltip
	};
};
//#endregion
//#region node_modules/antd/es/form/hooks/useDebounce.js
function useDebounce(value) {
	const [cacheValue, setCacheValue] = useDelayState(value);
	import_react.useEffect(() => {
		setCacheValue(value, { ms: value.length ? 0 : 10 });
	}, [value]);
	return cacheValue;
}
//#endregion
//#region node_modules/antd/es/form/style/explain.js
var genFormValidateMotionStyle = (token) => {
	const { componentCls, motionDurationFast, motionEaseInOut } = token;
	const helpCls = `${componentCls}-show-help`;
	const helpItemCls = `${componentCls}-show-help-item`;
	return { [helpCls]: {
		transition: `opacity ${motionDurationFast} ${motionEaseInOut}`,
		"&-appear, &-enter": {
			opacity: 0,
			"&-active": { opacity: 1 }
		},
		"&-leave": {
			opacity: 1,
			"&-active": { opacity: 0 }
		},
		[helpItemCls]: {
			overflow: "hidden",
			transition: `${[
				"height",
				"opacity",
				"transform"
			].map((prop) => `${prop} ${motionDurationFast} ${motionEaseInOut}`).join(", ")} !important`,
			[`&${helpItemCls}-appear, &${helpItemCls}-enter`]: {
				transform: `translateY(-5px)`,
				opacity: 0,
				"&-active": {
					transform: "translateY(0)",
					opacity: 1
				}
			},
			[`&${helpItemCls}-leave-active`]: { transform: `translateY(-5px)` }
		}
	} };
};
//#endregion
//#region node_modules/antd/es/form/style/index.js
var resetForm = (token) => ({
	legend: {
		display: "block",
		width: "100%",
		marginBottom: token.marginLG,
		padding: 0,
		color: token.colorTextDescription,
		fontSize: token.fontSizeLG,
		lineHeight: "inherit",
		border: 0,
		borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
	},
	"input[type=\"search\"]": { boxSizing: "border-box" },
	"input[type=\"radio\"], input[type=\"checkbox\"]": { lineHeight: "normal" },
	"input[type=\"file\"]": { display: "block" },
	"input[type=\"range\"]": {
		display: "block",
		width: "100%"
	},
	"select[multiple], select[size]": { height: "auto" },
	"input[type='file']:focus, input[type='radio']:focus, input[type='checkbox']:focus": {
		outline: 0,
		boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
	},
	output: {
		display: "block",
		paddingTop: 15,
		color: token.colorText,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight
	}
});
var genFormSize = (token, height) => {
	const { formItemCls } = token;
	return { [formItemCls]: {
		[`${formItemCls}-label > label`]: { height },
		[`${formItemCls}-control-input`]: { minHeight: height }
	} };
};
var genFormStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		...resetComponent(token),
		...resetForm(token),
		[`${componentCls}-text`]: {
			display: "inline-block",
			paddingInlineEnd: token.paddingSM
		},
		"&-small": { ...genFormSize(token, token.controlHeightSM) },
		"&-large": { ...genFormSize(token, token.controlHeightLG) }
	} };
};
var genFormItemStyle = (token) => {
	const { formItemCls, iconCls, rootPrefixCls, antCls, labelRequiredMarkColor, labelColor, labelFontSize, labelHeight, labelColonMarginInlineStart, labelColonMarginInlineEnd, itemMarginBottom } = token;
	const [varName] = genCssVar(antCls, "grid");
	return { [formItemCls]: {
		...resetComponent(token),
		marginBottom: itemMarginBottom,
		verticalAlign: "top",
		"&-with-help": { transition: "none" },
		[`&-hidden,
        &-hidden${antCls}-row`]: { display: "none" },
		[`${formItemCls}-label`]: {
			flexGrow: 0,
			overflow: "hidden",
			whiteSpace: "nowrap",
			textAlign: "end",
			verticalAlign: "middle",
			"&-left": { textAlign: "start" },
			"&-wrap": {
				overflow: "unset",
				lineHeight: token.lineHeight,
				whiteSpace: "unset",
				"> label": {
					verticalAlign: "middle",
					textWrap: "balance"
				}
			},
			"> label": {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				maxWidth: "100%",
				height: labelHeight,
				color: labelColor,
				fontSize: labelFontSize,
				[`> ${iconCls}`]: {
					fontSize: token.fontSize,
					verticalAlign: "top"
				},
				[`&${formItemCls}-required`]: {
					"&::before": {
						display: "inline-block",
						marginInlineEnd: token.marginXXS,
						color: labelRequiredMarkColor,
						fontSize: token.fontSize,
						fontFamily: "sans-serif",
						lineHeight: 1,
						content: "\"*\""
					},
					[`&${formItemCls}-required-mark-hidden, &${formItemCls}-required-mark-optional`]: { "&::before": { display: "none" } }
				},
				[`${formItemCls}-optional`]: {
					display: "inline-block",
					marginInlineStart: token.marginXXS,
					color: token.colorTextDescription,
					[`&${formItemCls}-required-mark-hidden`]: { display: "none" }
				},
				[`${formItemCls}-tooltip`]: {
					color: token.colorTextDescription,
					cursor: "help",
					writingMode: "horizontal-tb",
					marginInlineStart: token.marginXXS
				},
				"&::after": {
					content: "\":\"",
					position: "relative",
					marginBlock: 0,
					marginInlineStart: labelColonMarginInlineStart,
					marginInlineEnd: labelColonMarginInlineEnd
				},
				[`&${formItemCls}-no-colon::after`]: { content: "\"\\a0\"" }
			}
		},
		[`${formItemCls}-control`]: {
			[varName("display")]: "flex",
			flexDirection: "column",
			flexGrow: 1,
			[`&:first-child:not([class^="'${rootPrefixCls}-col-'"]):not([class*="' ${rootPrefixCls}-col-'"])`]: { width: "100%" },
			"&-input": {
				position: "relative",
				display: "flex",
				alignItems: "center",
				minHeight: token.controlHeight,
				"&-content": {
					flex: "auto",
					maxWidth: "100%",
					[`&:has(> ${antCls}-switch:only-child, > ${antCls}-rate:only-child)`]: {
						display: "flex",
						alignItems: "center"
					}
				}
			}
		},
		[formItemCls]: {
			"&-additional": {
				display: "flex",
				flexDirection: "column"
			},
			"&-explain, &-extra": {
				clear: "both",
				color: token.colorTextDescription,
				fontSize: token.fontSize,
				lineHeight: token.lineHeight
			},
			"&-explain-connected": { width: "100%" },
			"&-extra": {
				minHeight: token.controlHeightSM,
				transition: `color ${token.motionDurationMid} ${token.motionEaseOut}`
			},
			"&-explain": {
				"&-error": { color: token.colorError },
				"&-warning": { color: token.colorWarning }
			}
		},
		[`&-with-help ${formItemCls}-explain`]: {
			height: "auto",
			opacity: 1
		},
		[`${formItemCls}-feedback-icon`]: {
			fontSize: token.fontSize,
			textAlign: "center",
			visibility: "visible",
			animationName: zoomIn,
			animationDuration: token.motionDurationMid,
			animationTimingFunction: token.motionEaseOutBack,
			pointerEvents: "none",
			"&-success": { color: token.colorSuccess },
			"&-error": { color: token.colorError },
			"&-warning": { color: token.colorWarning },
			"&-validating": { color: token.colorPrimary }
		}
	} };
};
var makeVerticalLayoutLabel = (token) => ({
	padding: token.verticalLabelPadding,
	margin: token.verticalLabelMargin,
	whiteSpace: "initial",
	textAlign: "start",
	"> label": {
		margin: 0,
		"&::after": { visibility: "hidden" }
	}
});
var genHorizontalStyle = (token) => {
	const { antCls, formItemCls } = token;
	return { [`${formItemCls}-horizontal`]: {
		[`${formItemCls}-label`]: { flexGrow: 0 },
		[`${formItemCls}-control`]: {
			flex: "1 1 0",
			minWidth: 0
		},
		[`${formItemCls}-label[class$='-24'], ${formItemCls}-label[class*='-24 ']`]: { [`& + ${formItemCls}-control`]: { minWidth: "unset" } },
		[`${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
	} };
};
var genInlineStyle = (token) => {
	const { componentCls, formItemCls, inlineItemMarginBottom } = token;
	return { [`${componentCls}-inline`]: {
		display: "flex",
		flexWrap: "wrap",
		[`${formItemCls}-inline`]: {
			flex: "none",
			marginInlineEnd: token.margin,
			marginBottom: inlineItemMarginBottom,
			"&-row": { flexWrap: "nowrap" },
			[`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
				display: "inline-block",
				verticalAlign: "top"
			},
			[`> ${formItemCls}-label`]: { flex: "none" },
			[`${componentCls}-text`]: { display: "inline-block" },
			[`${formItemCls}-has-feedback`]: { display: "inline-block" }
		}
	} };
};
var makeVerticalLayout = (token) => {
	const { componentCls, formItemCls, rootPrefixCls } = token;
	return {
		[`${formItemCls} ${formItemCls}-label`]: makeVerticalLayoutLabel(token),
		[`${componentCls}:not(${componentCls}-inline)`]: { [formItemCls]: {
			flexWrap: "wrap",
			[`${formItemCls}-label, ${formItemCls}-control`]: { [`&:not([class*=" ${rootPrefixCls}-col-xs"])`]: {
				flex: "0 0 100%",
				maxWidth: "100%"
			} }
		} }
	};
};
var genVerticalStyle = (token) => {
	const { componentCls, formItemCls, antCls, verticalLabelHeight } = token;
	return {
		[`${formItemCls}-vertical`]: {
			[`${formItemCls}-row`]: { flexDirection: "column" },
			[`${formItemCls}-label > label`]: { height: verticalLabelHeight },
			[`${formItemCls}-control`]: { width: "100%" },
			[`${formItemCls}-label,
        ${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
		},
		[`@media (max-width: ${unit(token.screenXSMax)})`]: [makeVerticalLayout(token), { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-xs-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }],
		[`@media (max-width: ${unit(token.screenSMMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-sm-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenMDMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-md-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenLGMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-lg-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }
	};
};
var prepareComponentToken$1 = (token) => ({
	labelRequiredMarkColor: token.colorError,
	labelColor: token.colorTextHeading,
	labelFontSize: token.fontSize,
	labelHeight: token.controlHeight,
	verticalLabelHeight: token.labelHeight ?? "auto",
	labelColonMarginInlineStart: token.marginXXS / 2,
	labelColonMarginInlineEnd: token.marginXS,
	itemMarginBottom: token.marginLG,
	verticalLabelPadding: `0 0 ${token.paddingXS}px`,
	verticalLabelMargin: 0,
	inlineItemMarginBottom: 0
});
var prepareToken = (token, rootPrefixCls) => {
	return merge$1(token, {
		formItemCls: `${token.componentCls}-item`,
		rootPrefixCls
	});
};
var style_default$1 = genStyleHooks("Form", (token, { rootPrefixCls }) => {
	const formToken = prepareToken(token, rootPrefixCls);
	return [
		genFormStyle(formToken),
		genFormItemStyle(formToken),
		genFormValidateMotionStyle(formToken),
		genHorizontalStyle(formToken),
		genInlineStyle(formToken),
		genVerticalStyle(formToken),
		genCollapseMotion(formToken),
		zoomIn
	];
}, prepareComponentToken$1, { order: -1e3 });
//#endregion
//#region node_modules/antd/es/form/ErrorList.js
var EMPTY_LIST = [];
function toErrorEntity(error, prefix, errorStatus, index = 0) {
	return {
		key: typeof error === "string" ? error : `${prefix}-${index}`,
		error,
		errorStatus
	};
}
var ErrorList = ({ help, helpStatus, errors = EMPTY_LIST, warnings = EMPTY_LIST, className: rootClassName, fieldId, onVisibleChanged }) => {
	const { prefixCls } = import_react.useContext(FormItemPrefixContext);
	const { classNames: contextClassNames, styles: contextStyles } = import_react.useContext(FormContext);
	const baseClassName = `${prefixCls}-item-explain`;
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$1(prefixCls, rootCls);
	const collapseMotion = import_react.useMemo(() => initCollapseMotion(prefixCls), [prefixCls]);
	const debounceErrors = useDebounce(errors);
	const debounceWarnings = useDebounce(warnings);
	const hasHelp = isNonNullable(help);
	const fullKeyList = import_react.useMemo(() => {
		if (hasHelp) return [toErrorEntity(help, "help", helpStatus)];
		return [].concat(_toConsumableArray(debounceErrors.map((error, index) => toErrorEntity(error, "error", "error", index))), _toConsumableArray(debounceWarnings.map((warning, index) => toErrorEntity(warning, "warning", "warning", index))));
	}, [
		help,
		helpStatus,
		hasHelp,
		debounceErrors,
		debounceWarnings
	]);
	const filledKeyFullKeyList = import_react.useMemo(() => {
		const keysCount = {};
		fullKeyList.forEach(({ key }) => {
			keysCount[key] = (keysCount[key] || 0) + 1;
		});
		return fullKeyList.map((entity, index) => ({
			...entity,
			key: keysCount[entity.key] > 1 ? `${entity.key}-fallback-${index}` : entity.key
		}));
	}, [fullKeyList]);
	const helpProps = {};
	if (fieldId) helpProps.id = `${fieldId}_help`;
	return /*#__PURE__*/ import_react.createElement(es_default$1, {
		motionDeadline: collapseMotion.motionDeadline,
		motionName: `${prefixCls}-show-help`,
		visible: !!filledKeyFullKeyList.length,
		onVisibleChanged
	}, (holderProps) => {
		const { className: holderClassName, style: holderStyle } = holderProps;
		return /*#__PURE__*/ import_react.createElement("div", {
			...helpProps,
			className: clsx(baseClassName, holderClassName, contextClassNames?.help, cssVarCls, rootCls, rootClassName, hashId),
			style: {
				...contextStyles?.help,
				...holderStyle
			}
		}, /*#__PURE__*/ import_react.createElement(CSSMotionList_default, {
			keys: filledKeyFullKeyList,
			...initCollapseMotion(prefixCls),
			motionName: `${prefixCls}-show-help-item`,
			component: false
		}, (itemProps) => {
			const { key, error, errorStatus, className: itemClassName, style: itemStyle } = itemProps;
			return /*#__PURE__*/ import_react.createElement("div", {
				key,
				className: clsx(itemClassName, contextClassNames?.helpItem, { [`${baseClassName}-${errorStatus}`]: errorStatus }),
				style: {
					...contextStyles?.helpItem,
					...itemStyle
				}
			}, error);
		}));
	});
};
//#endregion
//#region node_modules/antd/es/form/Form.js
var InternalForm = (props, ref) => {
	const contextDisabled = import_react.useContext(DisabledContext);
	const { getPrefixCls, direction, requiredMark: contextRequiredMark, colon: contextColon, scrollToFirstError: contextScrollToFirstError, className: contextClassName, style: contextStyle, styles: contextStyles, classNames: contextClassNames, tooltip: contextTooltip, labelAlign: contextLabelAlign, labelWrap: contextLabelWrap } = useComponentConfig("form");
	const { prefixCls: customizePrefixCls, className, rootClassName, size, disabled = contextDisabled, form, colon, labelAlign, labelWrap, labelCol, wrapperCol, layout = "horizontal", scrollToFirstError, requiredMark, onFinishFailed, name, style, feedbackIcons, variant, classNames, styles, tooltip, ...restFormProps } = props;
	const mergedSize = useSize(size);
	const contextValidateMessages = import_react.useContext(validateMessagesContext_default);
	const mergedRequiredMark = import_react.useMemo(() => {
		if (requiredMark !== void 0) return requiredMark;
		if (contextRequiredMark !== void 0) return contextRequiredMark;
		return true;
	}, [requiredMark, contextRequiredMark]);
	const mergedColon = colon ?? contextColon;
	const mergedLabelAlign = labelAlign ?? contextLabelAlign;
	const mergedLabelWrap = labelWrap ?? contextLabelWrap;
	const mergedTooltip = {
		...contextTooltip,
		...tooltip
	};
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$1(prefixCls, rootCls);
	const mergedProps = {
		...props,
		size: mergedSize,
		disabled,
		layout,
		colon: mergedColon,
		requiredMark: mergedRequiredMark,
		labelAlign: mergedLabelAlign,
		labelWrap: mergedLabelWrap
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const formClassName = clsx(prefixCls, `${prefixCls}-${layout}`, {
		[`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-large`]: mergedSize === "large",
		[`${prefixCls}-small`]: mergedSize === "small"
	}, cssVarCls, rootCls, hashId, contextClassName, className, rootClassName, mergedClassNames.root);
	const [wrapForm] = useForm(form);
	const { __INTERNAL__ } = wrapForm;
	__INTERNAL__.name = name;
	const formContextValue = import_react.useMemo(() => ({
		name,
		labelAlign: mergedLabelAlign,
		labelCol,
		labelWrap: mergedLabelWrap,
		wrapperCol,
		layout,
		colon: mergedColon,
		requiredMark: mergedRequiredMark,
		itemRef: __INTERNAL__.itemRef,
		form: wrapForm,
		feedbackIcons,
		tooltip: mergedTooltip,
		classNames: mergedClassNames,
		styles: mergedStyles
	}), [
		name,
		mergedLabelAlign,
		mergedLabelWrap,
		labelCol,
		wrapperCol,
		layout,
		mergedColon,
		mergedRequiredMark,
		wrapForm,
		feedbackIcons,
		mergedClassNames,
		mergedStyles,
		mergedTooltip
	]);
	const nativeElementRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({
		...wrapForm,
		nativeElement: nativeElementRef.current?.nativeElement
	}));
	const scrollToField = (options, fieldName) => {
		if (options) {
			let defaultScrollToFirstError = { block: "nearest" };
			if (isPlainObject(options)) defaultScrollToFirstError = {
				...defaultScrollToFirstError,
				...options
			};
			wrapForm.scrollToField(fieldName, defaultScrollToFirstError);
		}
	};
	const onInternalFinishFailed = (errorInfo) => {
		onFinishFailed?.(errorInfo);
		if (errorInfo.errorFields.length) {
			const fieldName = errorInfo.errorFields[0].name;
			if (scrollToFirstError !== void 0) {
				scrollToField(scrollToFirstError, fieldName);
				return;
			}
			if (contextScrollToFirstError !== void 0) scrollToField(contextScrollToFirstError, fieldName);
		}
	};
	return /*#__PURE__*/ import_react.createElement(VariantContext.Provider, { value: variant }, /*#__PURE__*/ import_react.createElement(DisabledContextProvider, { disabled }, /*#__PURE__*/ import_react.createElement(SizeContext.Provider, { value: mergedSize }, /*#__PURE__*/ import_react.createElement(FormProvider, { validateMessages: contextValidateMessages }, /*#__PURE__*/ import_react.createElement(FormContext.Provider, { value: formContextValue }, /*#__PURE__*/ import_react.createElement(NoFormStyle, { status: true }, /*#__PURE__*/ import_react.createElement(RefForm, {
		id: name,
		...restFormProps,
		name,
		onFinishFailed: onInternalFinishFailed,
		form: wrapForm,
		ref: nativeElementRef,
		style: mergedStyles?.root,
		className: formClassName
	})))))));
};
var Form$1 = /*#__PURE__*/ import_react.forwardRef(InternalForm);
//#endregion
//#region node_modules/antd/es/form/hooks/useChildren.js
var useChildren = (children) => {
	if (isFunction(children)) return children;
	const childList = toArray$1(children);
	return childList.length <= 1 ? childList[0] : childList;
};
//#endregion
//#region node_modules/antd/es/form/hooks/useFormItemStatus.js
var useFormItemStatus = () => {
	const { status, errors = [], warnings = [] } = import_react.useContext(FormItemInputContext);
	return {
		status,
		errors,
		warnings
	};
};
useFormItemStatus.Context = FormItemInputContext;
//#endregion
//#region node_modules/antd/es/form/hooks/useFrameState.js
function useFrameState(defaultValue) {
	const [value, setValue] = import_react.useState(defaultValue);
	const frameRef = import_react.useRef(null);
	const batchRef = import_react.useRef([]);
	const destroyRef = import_react.useRef(false);
	import_react.useEffect(() => {
		destroyRef.current = false;
		return () => {
			destroyRef.current = true;
			wrapperRaf.cancel(frameRef.current);
			frameRef.current = null;
		};
	}, []);
	function setFrameValue(updater) {
		if (destroyRef.current) return;
		if (frameRef.current === null) {
			batchRef.current = [];
			frameRef.current = wrapperRaf(() => {
				frameRef.current = null;
				setValue((prevValue) => {
					let current = prevValue;
					batchRef.current.forEach((func) => {
						current = func(current);
					});
					return current;
				});
			});
		}
		batchRef.current.push(updater);
	}
	return [value, setFrameValue];
}
//#endregion
//#region node_modules/antd/es/form/hooks/useItemRef.js
var useItemRef = () => {
	const { itemRef } = import_react.useContext(FormContext);
	const cacheRef = import_react.useRef({});
	const getRef = (name, children) => {
		const childrenRef = children && isPlainObject(children) && getNodeRef(children);
		const nameStr = name.join("_");
		if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
			cacheRef.current.name = nameStr;
			cacheRef.current.originRef = childrenRef;
			cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
		}
		return cacheRef.current.ref;
	};
	return getRef;
};
//#endregion
//#region node_modules/antd/es/form/style/fallbackCmp.js
/**
* Fallback of IE.
* Safe to remove.
*/
var genFallbackStyle = (token) => {
	const { formItemCls } = token;
	return { "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)": { [`${formItemCls}-control`]: { display: "flex" } } };
};
var fallbackCmp_default = genSubStyleComponent(["Form", "item-item"], (token, { rootPrefixCls }) => {
	return genFallbackStyle(prepareToken(token, rootPrefixCls));
});
//#endregion
//#region node_modules/antd/es/form/FormItemInput.js
var GRID_MAX = 24;
var FormItemInput = (props) => {
	const { prefixCls, status, labelCol, wrapperCol, children, errors, warnings, _internalItemRender: formItemRender, extra, help, fieldId, marginBottom, onErrorVisibleChanged, label } = props;
	const baseClassName = `${prefixCls}-item`;
	const formContext = import_react.useContext(FormContext);
	const { classNames: contextClassNames, styles: contextStyles } = formContext;
	const mergedWrapperCol = import_react.useMemo(() => {
		let mergedWrapper = { ...wrapperCol || formContext.wrapperCol || {} };
		if (label === null && !labelCol && !wrapperCol && formContext.labelCol) [void 0].concat(_toConsumableArray(responsiveArrayReversed)).forEach((size) => {
			const _size = size ? [size] : [];
			const formLabel = get(formContext.labelCol, _size);
			const formLabelObj = isPlainObject(formLabel) ? formLabel : {};
			const wrapper = get(mergedWrapper, _size);
			const wrapperObj = isPlainObject(wrapper) ? wrapper : {};
			if ("span" in formLabelObj && !("offset" in wrapperObj) && formLabelObj.span < GRID_MAX) mergedWrapper = set(mergedWrapper, [].concat(_size, ["offset"]), formLabelObj.span);
		});
		return mergedWrapper;
	}, [
		wrapperCol,
		formContext.wrapperCol,
		formContext.labelCol,
		label,
		labelCol
	]);
	const className = clsx(`${baseClassName}-control`, mergedWrapperCol.className);
	const subFormContext = import_react.useMemo(() => {
		const { labelCol: _labelCol, wrapperCol: _wrapperCol, ...rest } = formContext;
		return rest;
	}, [formContext]);
	const extraRef = import_react.useRef(null);
	const [extraHeight, setExtraHeight] = import_react.useState(0);
	useLayoutEffect(() => {
		if (extra && extraRef.current) setExtraHeight(extraRef.current.clientHeight);
		else setExtraHeight(0);
	}, [extra]);
	const inputDom = /*#__PURE__*/ import_react.createElement("div", { className: `${baseClassName}-control-input` }, /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${baseClassName}-control-input-content`, contextClassNames?.content),
		style: contextStyles?.content
	}, children));
	const formItemContext = import_react.useMemo(() => ({
		prefixCls,
		status
	}), [prefixCls, status]);
	const errorListDom = marginBottom !== null || errors.length || warnings.length ? /*#__PURE__*/ import_react.createElement(FormItemPrefixContext.Provider, { value: formItemContext }, /*#__PURE__*/ import_react.createElement(ErrorList, {
		fieldId,
		errors,
		warnings,
		help,
		helpStatus: status,
		className: `${baseClassName}-explain-connected`,
		onVisibleChanged: onErrorVisibleChanged
	})) : null;
	const extraProps = {};
	if (fieldId) extraProps.id = `${fieldId}_extra`;
	const extraDom = extra ? /*#__PURE__*/ import_react.createElement("div", {
		...extraProps,
		className: clsx(`${baseClassName}-extra`, contextClassNames?.extra),
		style: contextStyles?.extra,
		ref: extraRef
	}, extra) : null;
	const additionalDom = errorListDom || extraDom ? /*#__PURE__*/ import_react.createElement("div", {
		className: `${baseClassName}-additional`,
		style: marginBottom ? { minHeight: marginBottom + extraHeight } : {}
	}, errorListDom, extraDom) : null;
	const dom = formItemRender && formItemRender.mark === "pro_table_render" && formItemRender.render ? formItemRender.render(props, {
		input: inputDom,
		errorList: errorListDom,
		extra: extraDom
	}) : /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, inputDom, additionalDom);
	return /*#__PURE__*/ import_react.createElement(FormContext.Provider, { value: subFormContext }, /*#__PURE__*/ import_react.createElement(Col, {
		...mergedWrapperCol,
		className
	}, dom), /*#__PURE__*/ import_react.createElement(fallbackCmp_default, { prefixCls }));
};
//#endregion
//#region node_modules/antd/es/form/FormItemLabel.js
var FormItemLabel = ({ prefixCls, label, htmlFor, labelCol, labelAlign, colon, required, requiredMark, tooltip, vertical }) => {
	const [formLocale] = useLocale("Form");
	const { labelAlign: contextLabelAlign, labelCol: contextLabelCol, labelWrap, colon: contextColon, classNames: contextClassNames, styles: contextStyles, tooltip: contextTooltip } = import_react.useContext(FormContext);
	if (!label) return null;
	const mergedLabelCol = labelCol || contextLabelCol || {};
	const mergedLabelAlign = labelAlign || contextLabelAlign;
	const labelClsBasic = `${prefixCls}-item-label`;
	const labelColClassName = clsx(labelClsBasic, mergedLabelAlign === "left" && `${labelClsBasic}-left`, mergedLabelCol.className, { [`${labelClsBasic}-wrap`]: !!labelWrap });
	let labelChildren = label;
	const computedColon = colon === true || contextColon !== false && colon !== false;
	if (computedColon && !vertical && typeof label === "string" && label.trim()) labelChildren = label.replace(/[:|：]\s*$/, "");
	const tooltipProps = convertToTooltipProps(tooltip, contextTooltip);
	if (tooltipProps) {
		const tooltipNode = /*#__PURE__*/ import_react.createElement(Tooltip, { ...tooltipProps }, /*#__PURE__*/ import_react.createElement("span", {
			className: `${prefixCls}-item-tooltip`,
			onClick: (e) => {
				e.preventDefault();
			},
			tabIndex: -1
		}, tooltipProps.icon || tooltipProps.children || /*#__PURE__*/ import_react.createElement(RefIcon$6, null)));
		labelChildren = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, labelChildren, tooltipNode);
	}
	const isOptionalMark = requiredMark === "optional";
	const isRenderMark = isFunction(requiredMark);
	const hideRequiredMark = requiredMark === false;
	if (isRenderMark) labelChildren = requiredMark(labelChildren, { required: !!required });
	else if (isOptionalMark && !required) labelChildren = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, labelChildren, /*#__PURE__*/ import_react.createElement("span", { className: `${prefixCls}-item-optional` }, formLocale?.optional || localeValues.Form?.optional));
	let markType;
	if (hideRequiredMark) markType = "hidden";
	else if (isOptionalMark || isRenderMark) markType = "optional";
	const labelClassName = clsx(contextClassNames?.label, {
		[`${prefixCls}-item-required`]: required,
		[`${prefixCls}-item-required-mark-${markType}`]: markType,
		[`${prefixCls}-item-no-colon`]: !computedColon
	});
	return /*#__PURE__*/ import_react.createElement(Col, {
		...mergedLabelCol,
		className: labelColClassName
	}, /*#__PURE__*/ import_react.createElement("label", {
		htmlFor,
		className: labelClassName,
		style: contextStyles?.label,
		title: typeof label === "string" ? label : void 0
	}, labelChildren));
};
//#endregion
//#region node_modules/antd/es/form/FormItem/StatusProvider.js
var iconMap = {
	success: RefIcon$3,
	warning: RefIcon$4,
	error: RefIcon,
	validating: RefIcon$5
};
function StatusProvider({ children, errors, warnings, hasFeedback, validateStatus, prefixCls, meta, noStyle, name }) {
	const itemPrefixCls = `${prefixCls}-item`;
	const { feedbackIcons } = import_react.useContext(FormContext);
	const mergedValidateStatus = getStatus(errors, warnings, meta, null, !!hasFeedback, validateStatus);
	const { isFormItemInput: parentIsFormItemInput, status: parentStatus, hasFeedback: parentHasFeedback, feedbackIcon: parentFeedbackIcon, name: parentName } = import_react.useContext(FormItemInputContext);
	const formItemStatusContext = import_react.useMemo(() => {
		let feedbackIcon;
		if (hasFeedback) {
			const customIcons = hasFeedback !== true && hasFeedback.icons || feedbackIcons;
			const customIconNode = mergedValidateStatus && customIcons?.({
				status: mergedValidateStatus,
				errors,
				warnings
			})?.[mergedValidateStatus];
			const IconNode = mergedValidateStatus ? iconMap[mergedValidateStatus] : null;
			feedbackIcon = customIconNode !== false && IconNode ? /*#__PURE__*/ import_react.createElement("span", { className: clsx(`${itemPrefixCls}-feedback-icon`, `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`) }, customIconNode || /*#__PURE__*/ import_react.createElement(IconNode, null)) : null;
		}
		const context = {
			status: mergedValidateStatus || "",
			errors,
			warnings,
			hasFeedback: !!hasFeedback,
			feedbackIcon,
			isFormItemInput: true,
			name
		};
		if (noStyle) {
			context.status = (mergedValidateStatus ?? parentStatus) || "";
			context.isFormItemInput = parentIsFormItemInput;
			context.hasFeedback = !!(hasFeedback ?? parentHasFeedback);
			context.feedbackIcon = hasFeedback !== void 0 ? context.feedbackIcon : parentFeedbackIcon;
			context.name = name ?? parentName;
		}
		return context;
	}, [
		mergedValidateStatus,
		errors,
		warnings,
		hasFeedback,
		feedbackIcons,
		noStyle,
		name,
		parentIsFormItemInput,
		parentStatus,
		itemPrefixCls,
		parentHasFeedback,
		parentFeedbackIcon,
		parentName
	]);
	return /*#__PURE__*/ import_react.createElement(FormItemInputContext.Provider, { value: formItemStatusContext }, children);
}
//#endregion
//#region node_modules/antd/es/form/FormItem/ItemHolder.js
function ItemHolder(props) {
	const { prefixCls, className, rootClassName, style, help, errors, warnings, validateStatus, meta, hasFeedback, hidden, children, fieldId, required, isRequired, onSubItemMetaChange, layout: propsLayout, name, ...restProps } = props;
	const itemPrefixCls = `${prefixCls}-item`;
	const { requiredMark, layout: formLayout } = import_react.useContext(FormContext);
	const layout = propsLayout || formLayout;
	const vertical = layout === "vertical";
	const itemRef = import_react.useRef(null);
	const debounceErrors = useDebounce(errors);
	const debounceWarnings = useDebounce(warnings);
	const hasHelp = isNonNullable(help);
	const hasError = !!(hasHelp || errors.length || warnings.length);
	const isOnScreen = !!itemRef.current && isVisible_default(itemRef.current);
	const [marginBottom, setMarginBottom] = import_react.useState(null);
	useLayoutEffect(() => {
		if (hasError && itemRef.current) {
			const itemStyle = getComputedStyle(itemRef.current);
			setMarginBottom(Number.parseInt(itemStyle.marginBottom, 10));
		}
	}, [hasError, isOnScreen]);
	const onErrorVisibleChanged = (nextVisible) => {
		if (!nextVisible) setMarginBottom(null);
	};
	const getValidateState = (isDebounce = false) => {
		return getStatus(isDebounce ? debounceErrors : meta.errors, isDebounce ? debounceWarnings : meta.warnings, meta, "", !!hasFeedback, validateStatus);
	};
	const mergedValidateStatus = getValidateState();
	const itemClassName = clsx(itemPrefixCls, className, rootClassName, {
		[`${itemPrefixCls}-with-help`]: hasHelp || debounceErrors.length || debounceWarnings.length,
		[`${itemPrefixCls}-has-feedback`]: mergedValidateStatus && hasFeedback,
		[`${itemPrefixCls}-has-success`]: mergedValidateStatus === "success",
		[`${itemPrefixCls}-has-warning`]: mergedValidateStatus === "warning",
		[`${itemPrefixCls}-has-error`]: mergedValidateStatus === "error",
		[`${itemPrefixCls}-is-validating`]: mergedValidateStatus === "validating",
		[`${itemPrefixCls}-hidden`]: hidden,
		[`${itemPrefixCls}-${layout}`]: layout
	});
	return /*#__PURE__*/ import_react.createElement("div", {
		className: itemClassName,
		style,
		ref: itemRef
	}, /*#__PURE__*/ import_react.createElement(Row, {
		className: `${itemPrefixCls}-row`,
		...omit(restProps, [
			"_internalItemRender",
			"colon",
			"dependencies",
			"extra",
			"fieldKey",
			"getValueFromEvent",
			"getValueProps",
			"htmlFor",
			"id",
			"initialValue",
			"isListField",
			"label",
			"labelAlign",
			"labelCol",
			"labelWrap",
			"messageVariables",
			"name",
			"normalize",
			"noStyle",
			"preserve",
			"requiredMark",
			"rules",
			"shouldUpdate",
			"trigger",
			"tooltip",
			"validateFirst",
			"validateTrigger",
			"valuePropName",
			"wrapperCol",
			"validateDebounce"
		])
	}, /*#__PURE__*/ import_react.createElement(FormItemLabel, {
		htmlFor: fieldId,
		...props,
		requiredMark,
		required: required ?? isRequired,
		prefixCls,
		vertical
	}), /*#__PURE__*/ import_react.createElement(FormItemInput, {
		...props,
		...meta,
		errors: debounceErrors,
		warnings: debounceWarnings,
		prefixCls,
		status: mergedValidateStatus,
		help,
		marginBottom,
		onErrorVisibleChanged
	}, /*#__PURE__*/ import_react.createElement(NoStyleItemContext.Provider, { value: onSubItemMetaChange }, /*#__PURE__*/ import_react.createElement(StatusProvider, {
		prefixCls,
		meta,
		errors: meta.errors,
		warnings: meta.warnings,
		hasFeedback,
		validateStatus: mergedValidateStatus,
		name
	}, children)))), !!marginBottom && /*#__PURE__*/ import_react.createElement("div", {
		className: `${itemPrefixCls}-margin-offset`,
		style: { marginBottom: -marginBottom }
	}));
}
//#endregion
//#region node_modules/antd/es/form/FormItem/index.js
var NAME_SPLIT = "__SPLIT__";
function isSimilarControl(a, b) {
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	return keysA.length === keysB.length && keysA.every((key) => {
		const propValueA = a[key];
		const propValueB = b[key];
		return propValueA === propValueB || isFunction(propValueA) || isFunction(propValueB);
	});
}
var MemoInput = /*#__PURE__*/ import_react.memo((props) => props.children, (prev, next) => isSimilarControl(prev.control, next.control) && prev.update === next.update && prev.childProps.length === next.childProps.length && prev.childProps.every((value, index) => value === next.childProps[index]));
function genEmptyMeta() {
	return {
		errors: [],
		warnings: [],
		touched: false,
		validating: false,
		name: [],
		validated: false
	};
}
function InternalFormItem(props) {
	const { name, noStyle, className, dependencies, prefixCls: customizePrefixCls, shouldUpdate, rules, children, required, label, messageVariables, trigger = "onChange", validateTrigger, hidden, help, layout } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { name: formName } = import_react.useContext(FormContext);
	const mergedChildren = useChildren(children);
	const isRenderProps = isFunction(mergedChildren);
	const notifyParentMetaChange = import_react.useContext(NoStyleItemContext);
	const { validateTrigger: contextValidateTrigger } = import_react.useContext(Context);
	const mergedValidateTrigger = isNonNullable(validateTrigger) ? validateTrigger : contextValidateTrigger;
	const hasName = isNonNullable(name);
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$1(prefixCls, rootCls);
	useDevWarning("Form.Item");
	const listContext = import_react.useContext(ListContext);
	const fieldKeyPathRef = import_react.useRef(null);
	const [subFieldErrors, setSubFieldErrors] = useFrameState({});
	const [meta, setMeta] = useSafeState(() => genEmptyMeta());
	const onMetaChange = (nextMeta) => {
		const keyInfo = listContext?.getKey(nextMeta.name);
		setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);
		if (noStyle && help !== false && notifyParentMetaChange) {
			let namePath = nextMeta.name;
			if (!nextMeta.destroy) {
				if (keyInfo !== void 0) {
					const [fieldKey, restPath] = keyInfo;
					namePath = [fieldKey].concat(_toConsumableArray(restPath));
					fieldKeyPathRef.current = namePath;
				}
			} else namePath = fieldKeyPathRef.current || namePath;
			notifyParentMetaChange(nextMeta, namePath);
		}
	};
	const onSubItemMetaChange = (subMeta, uniqueKeys) => {
		setSubFieldErrors((prevSubFieldErrors) => {
			const clone = { ...prevSubFieldErrors };
			const mergedNameKey = [].concat(_toConsumableArray(subMeta.name.slice(0, -1)), _toConsumableArray(uniqueKeys)).join(NAME_SPLIT);
			if (subMeta.destroy) delete clone[mergedNameKey];
			else clone[mergedNameKey] = subMeta;
			return clone;
		});
	};
	const [mergedErrors, mergedWarnings] = import_react.useMemo(() => {
		const errorList = _toConsumableArray(meta.errors);
		const warningList = _toConsumableArray(meta.warnings);
		Object.values(subFieldErrors).forEach((subFieldError) => {
			errorList.push.apply(errorList, _toConsumableArray(subFieldError.errors || []));
			warningList.push.apply(warningList, _toConsumableArray(subFieldError.warnings || []));
		});
		return [errorList, warningList];
	}, [
		subFieldErrors,
		meta.errors,
		meta.warnings
	]);
	const getItemRef = useItemRef();
	function renderLayout(baseChildren, fieldId, isRequired) {
		if (noStyle && !hidden) return /*#__PURE__*/ import_react.createElement(StatusProvider, {
			prefixCls,
			hasFeedback: props.hasFeedback,
			validateStatus: props.validateStatus,
			meta,
			errors: mergedErrors,
			warnings: mergedWarnings,
			noStyle: true,
			name
		}, baseChildren);
		return /*#__PURE__*/ import_react.createElement(ItemHolder, {
			key: "row",
			...props,
			className: clsx(className, cssVarCls, rootCls, hashId),
			prefixCls,
			fieldId,
			isRequired,
			errors: mergedErrors,
			warnings: mergedWarnings,
			meta,
			onSubItemMetaChange,
			layout,
			name
		}, baseChildren);
	}
	if (!hasName && !isRenderProps && !dependencies) return renderLayout(mergedChildren);
	let variables = {};
	if (typeof label === "string") variables.label = label;
	else if (name) variables.label = String(name);
	if (messageVariables) variables = {
		...variables,
		...messageVariables
	};
	return /*#__PURE__*/ import_react.createElement(WrapperField, {
		...props,
		messageVariables: variables,
		trigger,
		validateTrigger: mergedValidateTrigger,
		onMetaChange
	}, (control, renderMeta, context) => {
		const mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
		const fieldId = getFieldId(mergedName, formName);
		const isRequired = required !== void 0 ? required : rules?.some((rule) => {
			if (isPlainObject(rule) && rule.required && !rule.warningOnly) return true;
			if (isFunction(rule)) {
				const ruleEntity = rule(context);
				return ruleEntity?.required && !ruleEntity?.warningOnly;
			}
			return false;
		});
		const mergedControl = { ...control };
		let childNode = null;
		if (Array.isArray(mergedChildren) && hasName) childNode = mergedChildren;
		else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {} else if (dependencies && !isRenderProps && !hasName) {} else if (/*#__PURE__*/ import_react.isValidElement(mergedChildren)) {
			const childProps = {
				...mergedChildren.props,
				...mergedControl
			};
			if (!childProps.id) childProps.id = fieldId;
			if (help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
				const describedbyArr = [];
				if (help || mergedErrors.length > 0) describedbyArr.push(`${fieldId}_help`);
				if (props.extra) describedbyArr.push(`${fieldId}_extra`);
				childProps["aria-describedby"] = describedbyArr.join(" ");
			}
			if (mergedErrors.length > 0) childProps["aria-invalid"] = "true";
			if (isRequired) childProps["aria-required"] = "true";
			if (supportRef(mergedChildren)) childProps.ref = getItemRef(mergedName, mergedChildren);
			new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(mergedValidateTrigger)))).forEach((eventName) => {
				childProps[eventName] = (...args) => {
					mergedControl[eventName]?.(...args);
					mergedChildren.props[eventName]?.(...args);
				};
			});
			const watchingChildProps = [
				childProps["aria-required"],
				childProps["aria-invalid"],
				childProps["aria-describedby"]
			];
			childNode = /*#__PURE__*/ import_react.createElement(MemoInput, {
				control: mergedControl,
				update: mergedChildren,
				childProps: watchingChildProps
			}, cloneElement(mergedChildren, childProps));
		} else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) childNode = mergedChildren(context);
		else childNode = mergedChildren;
		return renderLayout(childNode, fieldId, isRequired);
	});
}
var FormItem = InternalFormItem;
FormItem.useStatus = useFormItemStatus;
//#endregion
//#region node_modules/antd/es/form/FormList.js
var FormList = ({ prefixCls: customizePrefixCls, children, ...props }) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("form", customizePrefixCls);
	const contextValue = import_react.useMemo(() => ({
		prefixCls,
		status: "error"
	}), [prefixCls]);
	return /*#__PURE__*/ import_react.createElement(List, { ...props }, (fields, operation, meta) => /*#__PURE__*/ import_react.createElement(FormItemPrefixContext.Provider, { value: contextValue }, children(fields.map((field) => ({
		...field,
		fieldKey: field.key
	})), operation, {
		errors: meta.errors,
		warnings: meta.warnings
	})));
};
//#endregion
//#region node_modules/antd/es/form/hooks/useFormInstance.js
function useFormInstance() {
	const { form } = import_react.useContext(FormContext);
	return form;
}
//#endregion
//#region node_modules/antd/es/form/index.js
var Form = Form$1;
Form.Item = FormItem;
Form.List = FormList;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Provider = FormProvider;
//#endregion
//#region node_modules/antd/es/input/Group.js
/** @deprecated Please use `Space.Compact` */
var Group = (props) => {
	const { getPrefixCls, direction } = (0, import_react.useContext)(ConfigContext);
	const { prefixCls: customizePrefixCls, className } = props;
	const prefixCls = getPrefixCls("input-group", customizePrefixCls);
	const [hashId, cssVarCls] = style_default$3(getPrefixCls("input"));
	const cls = clsx(prefixCls, cssVarCls, {
		[`${prefixCls}-lg`]: props.size === "large",
		[`${prefixCls}-sm`]: props.size === "small",
		[`${prefixCls}-compact`]: props.compact,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, hashId, className);
	const formItemContext = (0, import_react.useContext)(FormItemInputContext);
	const groupFormItemContext = (0, import_react.useMemo)(() => ({
		...formItemContext,
		isFormItemInput: false
	}), [formItemContext]);
	return /*#__PURE__*/ import_react.createElement(FormItemInputContext.Provider, { value: groupFormItemContext }, /*#__PURE__*/ import_react.createElement(Space.Compact, {
		className: cls,
		style: props.style,
		onMouseEnter: props.onMouseEnter,
		onMouseLeave: props.onMouseLeave,
		onFocus: props.onFocus,
		onBlur: props.onBlur
	}, props.children));
};
//#endregion
//#region node_modules/antd/es/input/style/otp.js
var genOTPStyle = (token) => {
	const { componentCls, paddingXS } = token;
	return { [componentCls]: {
		display: "inline-flex",
		alignItems: "center",
		flexWrap: "nowrap",
		columnGap: paddingXS,
		[`${componentCls}-input-wrapper`]: {
			position: "relative",
			[`${componentCls}-mask-icon`]: {
				position: "absolute",
				zIndex: "1",
				top: "50%",
				right: "50%",
				transform: "translate(50%, -50%)",
				pointerEvents: "none"
			},
			[`${componentCls}-mask-input`]: {
				color: "transparent",
				caretColor: token.colorText,
				"&::selection": { color: "transparent" }
			},
			[`${componentCls}-mask-input[type=number]::-webkit-inner-spin-button`]: {
				"-webkit-appearance": "none",
				margin: 0
			},
			[`${componentCls}-mask-input[type=number]`]: { "-moz-appearance": "textfield" }
		},
		"&-rtl": { direction: "rtl" },
		[`${componentCls}-input`]: {
			textAlign: "center",
			paddingInline: token.paddingXXS
		},
		[`&${componentCls}-sm ${componentCls}-input`]: { paddingInline: token.calc(token.paddingXXS).div(2).equal() },
		[`&${componentCls}-lg ${componentCls}-input`]: { paddingInline: token.paddingXS }
	} };
};
var otp_default = genStyleHooks(["Input", "OTP"], (token) => {
	return genOTPStyle(merge$1(token, initInputToken(token)));
}, initComponentToken);
//#endregion
//#region node_modules/antd/es/input/OTP/OTPInput.js
var DEFAULT_MASK_VALUE = "•";
var OTPInput = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { className, value, onChange, onActiveChange, index, mask, onFocus, type, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("otp");
	const maskValue = typeof mask === "string" ? mask : DEFAULT_MASK_VALUE;
	const inputRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => inputRef.current);
	const onInternalChange = (e) => {
		onChange(index, e.target.value);
	};
	const syncSelection = () => {
		wrapperRaf(() => {
			const inputEle = inputRef.current?.input;
			if (document.activeElement === inputEle && inputEle) inputEle.select();
		});
	};
	const onInternalFocus = (e) => {
		onFocus?.(e);
		syncSelection();
	};
	const onInternalKeyDown = (event) => {
		const { key, ctrlKey, metaKey } = event;
		if (key === "ArrowLeft") onActiveChange(index - 1);
		else if (key === "ArrowRight") onActiveChange(index + 1);
		else if (key === "z" && (ctrlKey || metaKey)) event.preventDefault();
		else if (key === "Backspace" && !value) onActiveChange(index - 1);
		syncSelection();
	};
	return /*#__PURE__*/ import_react.createElement("span", {
		className: `${prefixCls}-input-wrapper`,
		role: "presentation"
	}, mask && value !== "" && value !== void 0 && /*#__PURE__*/ import_react.createElement("span", {
		className: `${prefixCls}-mask-icon`,
		"aria-hidden": "true"
	}, maskValue), /*#__PURE__*/ import_react.createElement(Input$1, {
		"aria-label": `OTP Input ${index + 1}`,
		...restProps,
		type: type ?? (mask ? "password" : "text"),
		ref: inputRef,
		value,
		onInput: onInternalChange,
		onFocus: onInternalFocus,
		onKeyDown: onInternalKeyDown,
		onMouseDown: syncSelection,
		onMouseUp: syncSelection,
		className: clsx(className, { [`${prefixCls}-mask-input`]: mask })
	}));
});
//#endregion
//#region node_modules/antd/es/input/OTP/index.js
function strToArr(str) {
	return (str || "").split("");
}
var Separator = (props) => {
	const { index, prefixCls, separator, className: semanticClassName, style: semanticStyle } = props;
	const separatorNode = isFunction(separator) ? separator(index) : separator;
	if (!separatorNode) return null;
	return /*#__PURE__*/ import_react.createElement("span", {
		className: clsx(`${prefixCls}-separator`, semanticClassName),
		style: semanticStyle
	}, separatorNode);
};
var OTP = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, length = 6, size: customSize, defaultValue, value, onChange, formatter, separator, variant: customizeVariant, disabled, status: customStatus, autoFocus, mask, type, autoComplete, onInput, onFocus, inputMode, classNames, styles, className, style, ...restProps } = props;
	const { classNames: contextClassNames, styles: contextStyles, getPrefixCls, direction, style: contextStyle, className: contextClassName } = useComponentConfig("otp");
	const prefixCls = getPrefixCls("otp", customizePrefixCls);
	const [variant] = useVariant("otp", customizeVariant, void 0, "input");
	const mergedProps = {
		...props,
		length,
		variant
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const domAttrs = pickAttrs(restProps, {
		aria: true,
		data: true,
		attr: true
	});
	const [hashId, cssVarCls] = otp_default(prefixCls);
	const mergedSize = useSize((ctx) => customSize ?? ctx);
	const formContext = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(formContext.status, customStatus);
	const proxyFormContext = import_react.useMemo(() => ({
		...formContext,
		status: mergedStatus,
		hasFeedback: false,
		feedbackIcon: null
	}), [formContext, mergedStatus]);
	const containerRef = import_react.useRef(null);
	const inputsRef = import_react.useRef({});
	import_react.useImperativeHandle(ref, () => ({
		focus: () => {
			inputsRef.current[0]?.focus();
		},
		blur: () => {
			for (let i = 0; i < length; i += 1) inputsRef.current[i]?.blur();
		},
		nativeElement: containerRef.current
	}));
	const internalFormatter = (txt) => formatter ? formatter(txt) : txt;
	const [valueCells, setValueCells] = import_react.useState(() => strToArr(internalFormatter(defaultValue || "")));
	import_react.useEffect(() => {
		if (value !== void 0) setValueCells(strToArr(value));
	}, [value]);
	const triggerValueCellsChange = useEvent((nextValueCells) => {
		setValueCells(nextValueCells);
		if (onInput) onInput(nextValueCells);
		if (onChange && nextValueCells.length === length && nextValueCells.every((c) => c) && nextValueCells.some((c, index) => valueCells[index] !== c)) onChange(nextValueCells.join(""));
	});
	const patchValue = useEvent((index, txt) => {
		let nextCells = _toConsumableArray(valueCells);
		for (let i = 0; i < index; i += 1) if (!nextCells[i]) nextCells[i] = "";
		if (txt.length <= 1) nextCells[index] = txt;
		else nextCells = nextCells.slice(0, index).concat(strToArr(txt));
		nextCells = nextCells.slice(0, length);
		for (let i = nextCells.length - 1; i >= 0; i -= 1) {
			if (nextCells[i]) break;
			nextCells.pop();
		}
		nextCells = strToArr(internalFormatter(nextCells.map((c) => c || " ").join(""))).map((c, i) => {
			if (c === " " && !nextCells[i]) return nextCells[i];
			return c;
		});
		return nextCells;
	});
	const onInputChange = (index, txt) => {
		const nextCells = patchValue(index, txt);
		const nextIndex = Math.min(index + txt.length, length - 1);
		if (nextIndex !== index && nextCells[index] !== void 0) inputsRef.current[nextIndex]?.focus();
		triggerValueCellsChange(nextCells);
	};
	const onInputActiveChange = (nextIndex) => {
		inputsRef.current[nextIndex]?.focus();
	};
	const onInputFocus = (event, index) => {
		for (let i = 0; i < index; i += 1) if (!inputsRef.current[i]?.input?.value) {
			inputsRef.current[i]?.focus();
			break;
		}
		onFocus?.(event);
	};
	const inputSharedProps = {
		variant,
		disabled,
		status: mergedStatus,
		mask,
		type,
		inputMode,
		autoComplete
	};
	return /*#__PURE__*/ import_react.createElement("div", {
		...domAttrs,
		ref: containerRef,
		className: clsx(className, prefixCls, {
			[`${prefixCls}-sm`]: mergedSize === "small",
			[`${prefixCls}-lg`]: mergedSize === "large",
			[`${prefixCls}-rtl`]: direction === "rtl"
		}, cssVarCls, hashId, contextClassName, mergedClassNames.root),
		style: mergedStyles.root,
		role: "group"
	}, /*#__PURE__*/ import_react.createElement(FormItemInputContext.Provider, { value: proxyFormContext }, Array.from({ length }).map((_, index) => {
		const key = `otp-${index}`;
		const singleValue = valueCells[index] || "";
		return /*#__PURE__*/ import_react.createElement(import_react.Fragment, { key }, /*#__PURE__*/ import_react.createElement(OTPInput, {
			ref: (inputEle) => {
				inputsRef.current[index] = inputEle;
			},
			index,
			size: mergedSize,
			htmlSize: 1,
			className: clsx(mergedClassNames.input, `${prefixCls}-input`),
			style: mergedStyles.input,
			onChange: onInputChange,
			value: singleValue,
			onActiveChange: onInputActiveChange,
			autoFocus: index === 0 && autoFocus,
			onFocus: (event) => onInputFocus(event, index),
			...inputSharedProps
		}), index < length - 1 && /*#__PURE__*/ import_react.createElement(Separator, {
			separator,
			index,
			prefixCls,
			className: clsx(mergedClassNames.separator),
			style: mergedStyles.separator
		}));
	})));
});
//#endregion
//#region node_modules/antd/es/input/Password.js
var defaultIconRender = (visible) => visible ? /*#__PURE__*/ import_react.createElement(RefIcon$7, null) : /*#__PURE__*/ import_react.createElement(RefIcon$8, null);
var actionMap = {
	click: "onClick",
	hover: "onMouseOver"
};
var Password = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { disabled: customDisabled, action = "click", visibilityToggle = true, iconRender, prefixCls: customizePrefixCls, inputPrefixCls: customizeInputPrefixCls, suffix, className, style, classNames, styles, variant: customizeVariant, ...restProps } = props;
	const { getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, iconRender: contextIconRender } = useComponentConfig("inputPassword");
	const [variant] = useVariant("inputPassword", customizeVariant, props.bordered, "input");
	const [locale] = useLocale("global");
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const mergedProps = {
		...props,
		disabled: mergedDisabled,
		variant
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps });
	const visibilityControlled = isPlainObject(visibilityToggle) && visibilityToggle.visible !== void 0;
	const [visible, setVisible] = (0, import_react.useState)(() => visibilityControlled ? visibilityToggle.visible : false);
	const inputRef = (0, import_react.useRef)(null);
	import_react.useEffect(() => {
		if (visibilityControlled) setVisible(visibilityToggle.visible);
	}, [visibilityControlled, visibilityToggle]);
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef);
	const onVisibleChange = () => {
		if (mergedDisabled) return;
		if (visible) removePasswordTimeout();
		const nextVisible = !visible;
		setVisible(nextVisible);
		if (isPlainObject(visibilityToggle)) visibilityToggle.onVisibleChange?.(nextVisible);
	};
	const getIcon = (prefixCls) => {
		const iconTrigger = actionMap[action] || "";
		const icon = (iconRender || contextIconRender || defaultIconRender)(visible);
		const iconTabIndex = isPlainObject(visibilityToggle) ? visibilityToggle.tabIndex : void 0;
		return /*#__PURE__*/ import_react.createElement("span", {
			key: "passwordIcon",
			role: "button",
			tabIndex: mergedDisabled ? -1 : iconTabIndex ?? 0,
			className: `${prefixCls}-icon`,
			"aria-disabled": mergedDisabled,
			"aria-pressed": visible,
			"aria-label": visible ? locale.hide : locale.show,
			onMouseDown: (e) => {
				e.preventDefault();
			},
			onMouseUp: (e) => {
				e.preventDefault();
			},
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onVisibleChange();
				}
			},
			[iconTrigger]: onVisibleChange
		}, icon);
	};
	const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
	const prefixCls = getPrefixCls("input-password", customizePrefixCls);
	const suffixIcon = visibilityToggle && getIcon(prefixCls);
	const inputClassName = clsx(prefixCls, contextClassName, className, { [`${prefixCls}-${props.size}`]: !!props.size });
	const inputProps = {
		...restProps,
		type: visible ? "text" : "password",
		prefixCls: inputPrefixCls,
		suffix: /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, suffixIcon, suffix),
		disabled: mergedDisabled,
		className: inputClassName,
		classNames: mergedClassNames,
		styles: mergedStyles,
		variant
	};
	return /*#__PURE__*/ import_react.createElement(Input$1, {
		ref: composeRef(ref, inputRef),
		...inputProps
	});
});
//#endregion
//#region node_modules/antd/es/input/style/search.js
var genSearchStyle = (token) => {
	const { componentCls, antCls, calc, max } = token;
	const btnCls = `${componentCls}-btn`;
	const [varName, varRef] = genCssVar(antCls, "input-search");
	const inputFontSizeSM = token.inputFontSizeSM ?? token.fontSize;
	const smallButtonHeight = max(token.controlHeightSM, calc(inputFontSizeSM).mul(token.lineHeight).add(calc(token.paddingBlockSM).mul(2)).add(calc(token.lineWidth).mul(2)).equal());
	return { [componentCls]: {
		[varName("btn-height")]: unit(token.controlHeight),
		width: "100%",
		[btnCls]: {
			height: varRef("btn-height"),
			"&:focus-visible": { zIndex: 5 },
			[`&${antCls}-btn-icon-only`]: { width: varRef("btn-height") },
			"&-filled": {
				background: token.colorFillTertiary,
				"&:not(:disabled)": {
					"&:hover": { background: token.colorFillSecondary },
					"&:active": { background: token.colorFill }
				}
			}
		},
		[`&${componentCls}-large`]: { [varName("btn-height")]: unit(token.controlHeightLG) },
		[`&${componentCls}-small`]: { [varName("btn-height")]: unit(token.controlHeightSM) },
		[`&${componentCls}-small ${btnCls}`]: {
			minHeight: smallButtonHeight,
			[`&${token.antCls}-btn-icon-only`]: { minWidth: smallButtonHeight }
		}
	} };
};
var search_default = genStyleHooks(["Input", "Search"], (token) => {
	return genSearchStyle(merge$1(token, initInputToken(token)));
}, initComponentToken);
//#endregion
//#region node_modules/antd/es/input/Search.js
var Search = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, inputPrefixCls: customizeInputPrefixCls, className, size: customizeSize, style, enterButton = false, searchIcon: customizeSearchIcon, addonAfter, loading, disabled, onSearch: customOnSearch, onChange: customOnChange, onCompositionStart, onCompositionEnd, variant: customizeVariant, onPressEnter: customOnPressEnter, classNames, styles, hidden, ...restProps } = props;
	const { direction, getPrefixCls, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles, searchIcon: contextSearchIcon } = useComponentConfig("inputSearch");
	const contextDisabled = import_react.useContext(DisabledContext);
	const mergedDisabled = disabled ?? contextDisabled;
	const [mergedVariant, , isVariantConfigured] = useVariant("inputSearch", customizeVariant, props.bordered);
	const variant = isVariantConfigured ? mergedVariant : void 0;
	const [inputVariant] = useVariant("inputSearch", customizeVariant, props.bordered, "input");
	const mergedProps = {
		...props,
		enterButton,
		variant
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props: mergedProps }, { button: { _default: "root" } });
	const composedRef = import_react.useRef(false);
	const prefixCls = getPrefixCls("input-search", customizePrefixCls);
	const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
	const [hashId, cssVarCls] = search_default(prefixCls);
	const { compactSize } = useCompactItemContext(prefixCls, direction);
	const size = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const inputRef = import_react.useRef(null);
	const onChange = (e) => {
		if (e?.target && e.type === "click" && customOnSearch) customOnSearch(e.target.value, e, { source: "clear" });
		customOnChange?.(e);
	};
	const onMouseDown = (e) => {
		if (document.activeElement === inputRef.current?.input) e.preventDefault();
	};
	const onSearch = (e) => {
		if (customOnSearch) customOnSearch(inputRef.current?.input?.value, e, { source: "input" });
	};
	const onPressEnter = (e) => {
		if (composedRef.current || loading) return;
		customOnPressEnter?.(e);
		onSearch(e);
	};
	const searchIcon = typeof enterButton === "boolean" ? fallbackProp(customizeSearchIcon, contextSearchIcon, /*#__PURE__*/ import_react.createElement(RefIcon$9, null)) : null;
	const btnPrefixCls = `${prefixCls}-btn`;
	const btnClassName = clsx(btnPrefixCls, { [`${btnPrefixCls}-${variant}`]: variant });
	let button;
	const enterButtonAsElement = enterButton || {};
	const isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
	if (isAntdButton || enterButtonAsElement.type === "button") {
		const enterButtonProps = enterButtonAsElement.props;
		button = cloneElement(enterButtonAsElement, {
			disabled: mergedDisabled || enterButtonProps.disabled || !isAntdButton && loading,
			onMouseDown,
			onClick: (e) => {
				enterButtonAsElement?.props?.onClick?.(e);
				onSearch(e);
			},
			key: "enterButton",
			...isAntdButton ? {
				className: clsx(btnClassName, enterButtonProps.className),
				loading: loading || enterButtonProps.loading,
				size
			} : {}
		});
	} else button = /*#__PURE__*/ import_react.createElement(Button, {
		classNames: mergedClassNames.button,
		styles: mergedStyles.button,
		className: btnClassName,
		color: enterButton ? "primary" : "default",
		size,
		disabled,
		key: "enterButton",
		onMouseDown,
		onClick: onSearch,
		loading,
		icon: searchIcon,
		variant: variant === "borderless" || variant === "filled" || variant === "underlined" ? "text" : enterButton ? "solid" : void 0
	}, enterButton);
	if (addonAfter) button = [button, cloneElement(addonAfter, { key: "addonAfter" })];
	const mergedClassName = clsx(prefixCls, cssVarCls, {
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-${size}`]: !!size,
		[`${prefixCls}-with-button`]: !!enterButton
	}, className, contextClassName, hashId, mergedClassNames.root);
	const handleOnCompositionStart = (e) => {
		composedRef.current = true;
		onCompositionStart?.(e);
	};
	const handleOnCompositionEnd = (e) => {
		composedRef.current = false;
		onCompositionEnd?.(e);
	};
	const rootProps = pickAttrs(restProps, { data: true });
	const inputProps = omit({
		...restProps,
		classNames: omit(mergedClassNames, ["button", "root"]),
		styles: omit(mergedStyles, ["button", "root"]),
		prefixCls: inputPrefixCls,
		type: "search",
		size,
		variant: inputVariant,
		onPressEnter,
		onCompositionStart: handleOnCompositionStart,
		onCompositionEnd: handleOnCompositionEnd,
		onChange,
		disabled
	}, Object.keys(rootProps));
	return /*#__PURE__*/ import_react.createElement(Compact, {
		className: mergedClassName,
		style: mergedStyles.root,
		...rootProps,
		hidden
	}, /*#__PURE__*/ import_react.createElement(Input$1, {
		ref: composeRef(inputRef, ref),
		...inputProps
	}), button);
});
//#endregion
//#region node_modules/antd/es/input/style/textarea.js
var genTextAreaStyle = (token) => {
	const { componentCls, paddingLG } = token;
	const textareaPrefixCls = `${componentCls}-textarea`;
	return {
		[`textarea${componentCls}`]: {
			maxWidth: "100%",
			height: "auto",
			minHeight: token.controlHeight,
			lineHeight: token.lineHeight,
			verticalAlign: "bottom",
			transition: `all ${token.motionDurationSlow}`,
			resize: "vertical",
			"@media (hover: none) and (pointer: coarse)": { resize: "none" },
			[`&${componentCls}-mouse-active`]: { transition: `all ${token.motionDurationSlow}, height 0s, width 0s` }
		},
		[`${componentCls}-textarea-affix-wrapper-resize-dirty`]: { width: "auto" },
		[textareaPrefixCls]: {
			position: "relative",
			"&-show-count": { [`${componentCls}-data-count`]: {
				position: "absolute",
				bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
				insetInlineEnd: 0,
				color: token.colorTextDescription,
				whiteSpace: "nowrap",
				pointerEvents: "none"
			} },
			[`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: { paddingInlineEnd: paddingLG },
			[`&-affix-wrapper${componentCls}-affix-wrapper`]: {
				padding: 0,
				[`> textarea${componentCls}`]: {
					fontSize: "inherit",
					border: "none",
					outline: "none",
					background: "transparent",
					minHeight: token.calc(token.controlHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
					"&:focus": { boxShadow: "none !important" }
				},
				[`${componentCls}-suffix`]: {
					margin: 0,
					"> *:not(:last-child)": { marginInline: 0 },
					[`${componentCls}-clear-icon`]: {
						position: "absolute",
						insetInlineEnd: token.paddingInline,
						insetBlockStart: token.paddingXS
					},
					[`${textareaPrefixCls}-suffix`]: {
						position: "absolute",
						top: 0,
						insetInlineEnd: token.paddingInline,
						bottom: 0,
						zIndex: 1,
						display: "inline-flex",
						alignItems: "center",
						margin: "auto",
						pointerEvents: "none"
					}
				}
			},
			[`&-affix-wrapper${componentCls}-affix-wrapper-rtl`]: { [`${componentCls}-suffix`]: { [`${componentCls}-data-count`]: {
				direction: "ltr",
				insetInlineStart: 0
			} } },
			[`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: { [`${componentCls}-suffix`]: { [`${componentCls}-clear-icon`]: { insetInlineEnd: token.paddingInlineSM } } }
		}
	};
};
var textarea_default = genStyleHooks(["Input", "TextArea"], (token) => {
	return genTextAreaStyle(merge$1(token, initInputToken(token)));
}, initComponentToken, { resetFont: false });
//#endregion
//#region node_modules/antd/es/input/TextArea.js
var TextArea = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls: customizePrefixCls, bordered = true, size: customizeSize, disabled: customDisabled, status: customStatus, allowClear, classNames, rootClassName, className, style, styles, variant: customVariant, showCount, onMouseDown, onResize, ...rest } = props;
	const { getPrefixCls, direction, allowClear: contextAllowClear, autoComplete: contextAutoComplete, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("textArea");
	const disabled = import_react.useContext(DisabledContext);
	const mergedDisabled = customDisabled ?? disabled;
	const { status: contextStatus, hasFeedback, feedbackIcon } = import_react.useContext(FormItemInputContext);
	const mergedStatus = getMergedStatus(contextStatus, customStatus);
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props });
	const innerRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({
		resizableTextArea: innerRef.current?.resizableTextArea,
		focus: (option) => {
			triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
		},
		blur: () => innerRef.current?.blur(),
		nativeElement: innerRef.current?.nativeElement || null
	}));
	const prefixCls = getPrefixCls("input", customizePrefixCls);
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
	textarea_default(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
	const [variant, enableVariantCls] = useVariant("textArea", customVariant, bordered);
	const mergedAllowClear = useAllowClear({
		allowClear,
		contextAllowClear,
		componentName: "TextArea"
	});
	const [isMouseDown, setIsMouseDown] = import_react.useState(false);
	const [resizeDirty, setResizeDirty] = import_react.useState(false);
	const onInternalMouseDown = (e) => {
		setIsMouseDown(true);
		onMouseDown?.(e);
		const onMouseUp = () => {
			setIsMouseDown(false);
			document.removeEventListener("mouseup", onMouseUp);
		};
		document.addEventListener("mouseup", onMouseUp);
	};
	const onInternalResize = (size) => {
		onResize?.(size);
		if (isMouseDown && isFunction(getComputedStyle)) {
			const ele = innerRef.current?.nativeElement?.querySelector("textarea");
			if (ele && getComputedStyle(ele).resize === "both") setResizeDirty(true);
		}
	};
	return /*#__PURE__*/ import_react.createElement(TextArea$1, {
		autoComplete: contextAutoComplete,
		...rest,
		style: mergedStyles.root,
		styles: mergedStyles,
		disabled: mergedDisabled,
		allowClear: mergedAllowClear,
		className: clsx(cssVarCls, rootCls, className, rootClassName, compactItemClassnames, contextClassName, mergedClassNames.root, { [`${prefixCls}-textarea-affix-wrapper-resize-dirty`]: resizeDirty }),
		classNames: {
			...mergedClassNames,
			textarea: clsx({
				[`${prefixCls}-sm`]: mergedSize === "small",
				[`${prefixCls}-lg`]: mergedSize === "large"
			}, hashId, mergedClassNames.textarea, isMouseDown && `${prefixCls}-mouse-active`),
			variant: clsx({ [`${prefixCls}-${variant}`]: enableVariantCls }, getStatusClassNames(prefixCls, mergedStatus)),
			affixWrapper: clsx(`${prefixCls}-textarea-affix-wrapper`, {
				[`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
				[`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
				[`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
				[`${prefixCls}-textarea-show-count`]: showCount || props.count?.show
			}, hashId)
		},
		prefixCls,
		suffix: hasFeedback && /*#__PURE__*/ import_react.createElement("span", { className: `${prefixCls}-textarea-suffix` }, feedbackIcon),
		showCount,
		ref: innerRef,
		onResize: onInternalResize,
		onMouseDown: onInternalMouseDown
	});
});
//#endregion
//#region node_modules/antd/es/input/index.js
var Input = Input$1;
Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.OTP = OTP;
//#endregion
//#region node_modules/antd/es/spin/Indicator/Progress.js
var viewSize = 100;
var borderWidth = viewSize / 5;
var radius = viewSize / 2 - borderWidth / 2;
var circumference = 80 * Math.PI;
var position = 50;
var CustomCircle = (props) => {
	const { dotClassName, style, hasCircleCls } = props;
	return /*#__PURE__*/ import_react.createElement("circle", {
		className: clsx(`${dotClassName}-circle`, { [`${dotClassName}-circle-bg`]: hasCircleCls }),
		r: radius,
		cx: position,
		cy: position,
		strokeWidth: borderWidth,
		style
	});
};
var Progress = ({ percent, prefixCls }) => {
	const dotClassName = `${prefixCls}-dot`;
	const holderClassName = `${dotClassName}-holder`;
	const hideClassName = `${holderClassName}-hidden`;
	const [render, setRender] = import_react.useState(false);
	useLayoutEffect(() => {
		if (percent !== 0) setRender(true);
	}, [percent]);
	const safePtg = Math.max(Math.min(percent, 100), 0);
	if (!render) return null;
	const circleStyle = {
		strokeDashoffset: `${circumference / 4}`,
		strokeDasharray: `${circumference * safePtg / 100} ${circumference * (100 - safePtg) / 100}`
	};
	return /*#__PURE__*/ import_react.createElement("span", { className: clsx(holderClassName, `${dotClassName}-progress`, { [hideClassName]: safePtg <= 0 }) }, /*#__PURE__*/ import_react.createElement("svg", {
		viewBox: `0 0 ${viewSize} ${viewSize}`,
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": safePtg
	}, /*#__PURE__*/ import_react.createElement(CustomCircle, {
		dotClassName,
		hasCircleCls: true
	}), /*#__PURE__*/ import_react.createElement(CustomCircle, {
		dotClassName,
		style: circleStyle
	})));
};
//#endregion
//#region node_modules/antd/es/spin/Indicator/Looper.js
function Looper(props) {
	const { prefixCls, percent = 0, className, style } = props;
	const dotClassName = `${prefixCls}-dot`;
	const holderClassName = `${dotClassName}-holder`;
	const hideClassName = `${holderClassName}-hidden`;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement("span", {
		className: clsx(holderClassName, className, percent > 0 && hideClassName),
		style
	}, /*#__PURE__*/ import_react.createElement("span", { className: clsx(dotClassName, `${prefixCls}-dot-spin`) }, [
		1,
		2,
		3,
		4
	].map((i) => /*#__PURE__*/ import_react.createElement("i", {
		className: `${prefixCls}-dot-item`,
		key: i
	})))), /*#__PURE__*/ import_react.createElement(Progress, {
		prefixCls,
		percent
	}));
}
//#endregion
//#region node_modules/antd/es/spin/Indicator/index.js
function Indicator(props) {
	const { prefixCls, indicator, percent, className, style } = props;
	const dotClassName = `${prefixCls}-dot`;
	if (indicator && /*#__PURE__*/ import_react.isValidElement(indicator)) return cloneElement(indicator, (currentProps) => ({
		className: clsx(currentProps.className, dotClassName, className),
		style: {
			...currentProps.style,
			...style
		},
		percent
	}));
	return /*#__PURE__*/ import_react.createElement(Looper, {
		prefixCls,
		percent,
		className,
		style
	});
}
//#endregion
//#region node_modules/antd/es/spin/style/index.js
var antSpinMove = new Keyframe("antSpinMove", { to: { opacity: 1 } });
var antRotate = new Keyframe("antRotate", { to: { transform: "rotate(405deg)" } });
var genSpinStyle = (token) => {
	const { componentCls } = token;
	const sectionCls = `${componentCls}-section`;
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		"&-rtl": { direction: "rtl" },
		[`&${sectionCls}, > ${sectionCls}`]: {
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			gap: token.paddingSM,
			color: token.colorPrimary
		},
		[`&${sectionCls}`]: { display: "inline-flex" },
		[`> ${sectionCls}`]: {
			position: "absolute",
			top: "50%",
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translate(-50%, -50%)",
			zIndex: 1
		},
		[`${componentCls}-description`]: {
			fontSize: token.fontSize,
			lineHeight: 1
		},
		[`${componentCls}-container`]: {
			position: "relative",
			transition: `opacity ${token.motionDurationSlow}`,
			"&::after": {
				position: "absolute",
				top: 0,
				insetInlineEnd: 0,
				bottom: 0,
				insetInlineStart: 0,
				zIndex: 10,
				width: "100%",
				height: "100%",
				background: token.colorBgContainer,
				opacity: 0,
				transition: `all ${token.motionDurationSlow}`,
				content: "\"\"",
				pointerEvents: "none"
			}
		},
		"&-spinning": {
			[`${componentCls}-description`]: { textShadow: `0 0px 5px ${token.colorBgContainer}` },
			[`${componentCls}-container`]: {
				clear: "both",
				opacity: .5,
				userSelect: "none",
				pointerEvents: "none",
				"&::after": {
					opacity: .4,
					pointerEvents: "auto"
				}
			}
		},
		"&-fullscreen": {
			position: "fixed",
			inset: 0,
			backgroundColor: token.colorBgMask,
			zIndex: token.zIndexPopupBase,
			opacity: 0,
			pointerEvents: "none",
			transition: `all ${token.motionDurationMid}`,
			[`&${componentCls}-spinning`]: {
				opacity: 1,
				pointerEvents: "auto"
			},
			[`> ${sectionCls}`]: {
				color: token.colorWhite,
				[`${componentCls}-description`]: { color: token.colorTextLightSolid }
			}
		}
	} };
};
var genIndicatorStyle = (token) => {
	const { componentCls, antCls, motionDurationSlow } = token;
	const [varName, varRef] = genCssVar(antCls, "spin");
	return { [componentCls]: {
		[varName("dot-holder-size")]: token.dotSize,
		[varName("dot-item-size")]: `calc((${varRef("dot-holder-size")} - ${token.marginXXS} / 2) / 2)`,
		[`${componentCls}-dot`]: {
			"&-holder": {
				width: "1em",
				height: "1em",
				fontSize: varRef("dot-holder-size"),
				display: "inline-block",
				transition: ["transform", "opacity"].map((prop) => `${prop} ${motionDurationSlow} ease`).join(", "),
				transformOrigin: "50% 50%",
				lineHeight: 1,
				"&-hidden": {
					transform: "scale(0.3)",
					opacity: 0
				}
			},
			position: "relative",
			display: "inline-block",
			fontSize: varRef("dot-holder-size"),
			width: "1em",
			height: "1em",
			"&-spin": {
				transform: "rotate(45deg)",
				animationName: antRotate,
				animationDuration: "1.2s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear"
			},
			"&-item": {
				position: "absolute",
				display: "block",
				width: varRef("dot-item-size"),
				height: varRef("dot-item-size"),
				background: "currentColor",
				borderRadius: "100%",
				transform: "scale(0.75)",
				transformOrigin: "50% 50%",
				opacity: .3,
				animationName: antSpinMove,
				animationDuration: "1s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear",
				animationDirection: "alternate",
				"&:nth-child(1)": {
					top: 0,
					insetInlineStart: 0,
					animationDelay: "0s"
				},
				"&:nth-child(2)": {
					top: 0,
					insetInlineEnd: 0,
					animationDelay: "0.4s"
				},
				"&:nth-child(3)": {
					insetInlineEnd: 0,
					bottom: 0,
					animationDelay: "0.8s"
				},
				"&:nth-child(4)": {
					bottom: 0,
					insetInlineStart: 0,
					animationDelay: "1.2s"
				}
			},
			"&-progress": {
				position: "absolute",
				left: "50%",
				top: 0,
				transform: "translateX(-50%)"
			},
			"&-circle": {
				strokeLinecap: "round",
				transition: [
					"stroke-dashoffset",
					"stroke-dasharray",
					"stroke",
					"stroke-width",
					"opacity"
				].map((item) => `${item} ${motionDurationSlow} ease`).join(","),
				fillOpacity: 0,
				stroke: "currentcolor"
			},
			"&-circle-bg": { stroke: token.colorFillSecondary }
		}
	} };
};
var genSizeStyle = (token) => {
	const { componentCls } = token;
	const [varName] = genCssVar(token.antCls, "spin");
	return { [componentCls]: {
		"&-sm": { [varName("dot-holder-size")]: token.dotSizeSM },
		"&-lg": { [varName("dot-holder-size")]: token.dotSizeLG }
	} };
};
var prepareComponentToken = (token) => {
	const { controlHeightLG, controlHeight } = token;
	return {
		contentHeight: 400,
		dotSize: controlHeightLG / 2,
		dotSizeSM: controlHeightLG * .35,
		dotSizeLG: controlHeight
	};
};
var style_default = genStyleHooks("Spin", (token) => {
	const spinToken = merge$1(token, { spinDotDefault: token.colorTextDescription });
	return [
		genSpinStyle(spinToken),
		genIndicatorStyle(spinToken),
		genSizeStyle(spinToken)
	];
}, prepareComponentToken);
//#endregion
//#region node_modules/antd/es/spin/usePercent.js
var AUTO_INTERVAL = 200;
var STEP_BUCKETS = [
	[30, .05],
	[70, .03],
	[96, .01]
];
function usePercent(spinning, percent) {
	const [mockPercent, setMockPercent] = import_react.useState(0);
	const mockIntervalRef = import_react.useRef(null);
	const isAuto = percent === "auto";
	import_react.useEffect(() => {
		if (isAuto && spinning) {
			setMockPercent(0);
			mockIntervalRef.current = setInterval(() => {
				setMockPercent((prev) => {
					const restPTG = 100 - prev;
					for (let i = 0; i < STEP_BUCKETS.length; i += 1) {
						const [limit, stepPtg] = STEP_BUCKETS[i];
						if (prev <= limit) return prev + restPTG * stepPtg;
					}
					return prev;
				});
			}, AUTO_INTERVAL);
		}
		return () => {
			if (mockIntervalRef.current) {
				clearInterval(mockIntervalRef.current);
				mockIntervalRef.current = null;
			}
		};
	}, [isAuto, spinning]);
	return isAuto ? mockPercent : percent;
}
//#endregion
//#region node_modules/antd/es/spin/index.js
var defaultIndicator;
function shouldDelay(spinning, delay) {
	return !!spinning && !!delay && !Number.isNaN(Number(delay));
}
var Spin = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { prefixCls: customizePrefixCls, spinning: customSpinning = true, delay = 0, className, rootClassName, size, tip, description, wrapperClassName, style, children, fullscreen = false, indicator, percent, classNames, styles, ...restProps } = props;
	const { getPrefixCls, direction, indicator: contextIndicator, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("spin");
	const prefixCls = getPrefixCls("spin", customizePrefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [spinning, setSpinning] = import_react.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
	const mergedPercent = usePercent(spinning, percent);
	import_react.useEffect(() => {
		if (customSpinning) {
			const showSpinning = debounce(delay, () => {
				setSpinning(true);
			});
			showSpinning();
			return () => {
				showSpinning?.cancel?.();
			};
		}
		setSpinning(false);
	}, [delay, customSpinning]);
	const mergedSize = useSize((ctx) => size ?? ctx);
	const mergedDescription = description ?? tip;
	const mergedProps = {
		...props,
		size: mergedSize,
		spinning,
		tip: mergedDescription,
		description: mergedDescription,
		fullscreen,
		children,
		percent: mergedPercent
	};
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles
	], { props: mergedProps });
	const mergedIndicator = indicator ?? contextIndicator ?? defaultIndicator;
	const hasChildren = typeof children !== "undefined";
	const isNested = hasChildren || fullscreen;
	const indicatorNode = /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(Indicator, {
		className: clsx(mergedClassNames.indicator),
		style: mergedStyles.indicator,
		prefixCls,
		indicator: mergedIndicator,
		percent: mergedPercent
	}), mergedDescription && /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-description`, mergedClassNames.tip, mergedClassNames.description),
		style: {
			...mergedStyles.tip,
			...mergedStyles.description
		}
	}, mergedDescription));
	const nativeElementRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => ({ nativeElement: nativeElementRef.current }));
	return /*#__PURE__*/ import_react.createElement("div", {
		ref: nativeElementRef,
		className: clsx(prefixCls, {
			[`${prefixCls}-sm`]: mergedSize === "small",
			[`${prefixCls}-lg`]: mergedSize === "large",
			[`${prefixCls}-spinning`]: spinning,
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-fullscreen`]: fullscreen
		}, rootClassName, mergedClassNames.root, fullscreen && mergedClassNames.mask, isNested ? wrapperClassName : [`${prefixCls}-section`, mergedClassNames.section], contextClassName, className, hashId, cssVarCls),
		style: {
			...mergedStyles.root,
			...!isNested ? mergedStyles.section : {},
			...fullscreen ? mergedStyles.mask : {},
			...style
		},
		"aria-live": "polite",
		"aria-busy": spinning,
		...restProps
	}, spinning && (isNested ? /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-section`, mergedClassNames.section),
		style: mergedStyles.section
	}, indicatorNode) : indicatorNode), hasChildren && /*#__PURE__*/ import_react.createElement("div", {
		className: clsx(`${prefixCls}-container`, mergedClassNames.container),
		style: mergedStyles.container
	}, children));
});
Spin.setDefaultIndicator = (indicator) => {
	defaultIndicator = indicator;
};
//#endregion
//#region node_modules/antd/es/message/PureList.js
/** @private Internal Component. Do not use in your production. */
var PureList = (props) => {
	const { items, classNames, style } = props;
	const { getPrefixCls } = useComponentConfig("message");
	const prefixCls = getPrefixCls("message");
	const rootCls = useCSSVarCls(prefixCls);
	const [hashId, cssVarCls] = style_default$9(prefixCls, rootCls);
	const noticePrefixCls = `${prefixCls}-notice`;
	const configList = items.map((item) => {
		const { content, duration, key, type } = item;
		const typeIconCls = type ? `${noticePrefixCls}-icon-${type}` : void 0;
		return {
			key,
			duration,
			icon: getMessageIcon(type),
			title: content,
			className: `${noticePrefixCls}-${type}`,
			classNames: {
				wrapper: `${prefixCls}-${type}`,
				icon: typeIconCls
			}
		};
	});
	return /*#__PURE__*/ import_react.createElement(NotificationList, {
		prefixCls,
		placement: "top",
		configList,
		className: clsx(hashId, cssVarCls, rootCls),
		classNames: {
			...classNames,
			wrapper: classNames?.wrapper,
			title: classNames?.title
		},
		style,
		stack: false
	});
};
//#endregion
//#region node_modules/antd/es/message/index.js
var message = null;
var act = (callback) => callback();
var taskQueue = [];
var defaultGlobalConfig = {};
function getGlobalContext() {
	const { getContainer, duration, rtl, maxCount, top, stack } = defaultGlobalConfig;
	const mergedContainer = getContainer?.() || document.body;
	return {
		getContainer: () => mergedContainer,
		duration,
		rtl,
		maxCount,
		top,
		stack
	};
}
var GlobalHolder = /*#__PURE__*/ import_react.forwardRef((props, ref) => {
	const { messageConfig, sync } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls("message");
	const appConfig = (0, import_react.useContext)(AppConfigContext);
	const [api, holder] = useInternalMessage({
		...messageConfig,
		prefixCls,
		...appConfig.message
	});
	import_react.useImperativeHandle(ref, () => {
		const instance = { ...api };
		Object.keys(instance).forEach((method) => {
			instance[method] = (...args) => {
				sync();
				return api[method].apply(api, args);
			};
		});
		return {
			instance,
			sync
		};
	});
	return holder;
});
var GlobalHolderWrapper = /*#__PURE__*/ import_react.forwardRef((_, ref) => {
	const [messageConfig, setMessageConfig] = import_react.useState(getGlobalContext);
	const sync = () => {
		setMessageConfig(getGlobalContext);
	};
	import_react.useEffect(sync, []);
	const global = globalConfig();
	const rootPrefixCls = global.getRootPrefixCls();
	const rootIconPrefixCls = global.getIconPrefixCls();
	const theme = global.getTheme();
	const dom = /*#__PURE__*/ import_react.createElement(GlobalHolder, {
		ref,
		sync,
		messageConfig
	});
	return /*#__PURE__*/ import_react.createElement(ConfigProvider, {
		prefixCls: rootPrefixCls,
		iconPrefixCls: rootIconPrefixCls,
		theme
	}, global.holderRender ? global.holderRender(dom) : dom);
});
var flushMessageQueue = () => {
	if (!message) {
		const holderFragment = document.createDocumentFragment();
		const newMessage = { fragment: holderFragment };
		message = newMessage;
		act(() => {
			render(/*#__PURE__*/ import_react.createElement(GlobalHolderWrapper, { ref: (node) => {
				const { instance, sync } = node || {};
				Promise.resolve().then(() => {
					if (!newMessage.instance && instance) {
						newMessage.instance = instance;
						newMessage.sync = sync;
						flushMessageQueue();
					}
				});
			} }), holderFragment);
		});
		return;
	}
	if (!message.instance) return;
	taskQueue.forEach((task) => {
		const { type, skipped } = task;
		if (!skipped) switch (type) {
			case "open":
				act(() => {
					const closeFn = message.instance.open({
						...defaultGlobalConfig,
						...task.config
					});
					closeFn?.then(task.resolve);
					task.setCloseFn(closeFn);
				});
				break;
			case "destroy":
				act(() => {
					message?.instance.destroy(task.key);
				});
				break;
			default: act(() => {
				var _message$instance;
				const closeFn = (_message$instance = message.instance)[type].apply(_message$instance, _toConsumableArray(task.args));
				closeFn?.then(task.resolve);
				task.setCloseFn(closeFn);
			});
		}
	});
	taskQueue = [];
};
function setMessageGlobalConfig(config) {
	defaultGlobalConfig = {
		...defaultGlobalConfig,
		...config
	};
	act(() => {
		message?.sync?.();
	});
}
function open(config) {
	const result = wrapPromiseFn((resolve) => {
		let closeFn;
		const task = {
			type: "open",
			config,
			resolve,
			setCloseFn: (fn) => {
				closeFn = fn;
			}
		};
		taskQueue.push(task);
		return () => {
			if (closeFn) act(() => {
				closeFn();
			});
			else task.skipped = true;
		};
	});
	flushMessageQueue();
	return result;
}
function typeOpen(type, args) {
	const result = wrapPromiseFn((resolve) => {
		let closeFn;
		const task = {
			type,
			args,
			resolve,
			setCloseFn: (fn) => {
				closeFn = fn;
			}
		};
		taskQueue.push(task);
		return () => {
			if (closeFn) act(() => {
				closeFn();
			});
			else task.skipped = true;
		};
	});
	flushMessageQueue();
	return result;
}
var destroy = (key) => {
	taskQueue.push({
		type: "destroy",
		key
	});
	flushMessageQueue();
};
var methods = [
	"success",
	"info",
	"warning",
	"error",
	"loading"
];
var staticMethods = {
	open,
	destroy,
	config: setMessageGlobalConfig,
	useMessage,
	_InternalPanelDoNotUseOrYouWillBeFired: PurePanel$2,
	_InternalListDoNotUseOrYouWillBeFired: PureList
};
methods.forEach((type) => {
	staticMethods[type] = (...args) => typeOpen(type, args);
});
//#endregion
//#region node_modules/antd/es/modal/PurePanel.js
var PurePanel = (props) => {
	const { prefixCls: customizePrefixCls, className, closeIcon, closable, type, title, children, footer, style, classNames, styles, ...restProps } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("modal");
	const rootPrefixCls = getPrefixCls();
	const prefixCls = customizePrefixCls || getPrefixCls("modal");
	const rootCls = useCSSVarCls(rootPrefixCls);
	const [hashId, cssVarCls] = style_default$5(prefixCls, rootCls);
	const contextStyleRoot = useSemanticRootStyle(contextStyle);
	const styleRoot = useSemanticRootStyle(style);
	const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [
		contextStyles,
		contextStyleRoot,
		styles,
		styleRoot
	], { props });
	const confirmPrefixCls = `${prefixCls}-confirm`;
	let additionalProps = {};
	if (type) additionalProps = {
		closable: closable ?? false,
		title: "",
		footer: "",
		children: /*#__PURE__*/ import_react.createElement(ConfirmContent, {
			...props,
			prefixCls,
			confirmPrefixCls,
			rootPrefixCls,
			content: children
		})
	};
	else additionalProps = {
		closable: closable ?? true,
		title,
		footer: footer !== null && /*#__PURE__*/ import_react.createElement(Footer, { ...props }),
		children
	};
	return /*#__PURE__*/ import_react.createElement(Panel, {
		prefixCls,
		className: clsx(hashId, `${prefixCls}-pure-panel`, type && confirmPrefixCls, type && `${confirmPrefixCls}-${type}`, className, contextClassName, cssVarCls, rootCls, mergedClassNames.root),
		style: mergedStyles.root,
		...restProps,
		closeIcon: renderCloseIcon(prefixCls, closeIcon),
		closable,
		classNames: mergedClassNames,
		styles: mergedStyles,
		...additionalProps
	});
};
var PurePanel_default = withPureRenderTheme(PurePanel);
//#endregion
//#region node_modules/antd/es/modal/index.js
function modalWarn(props) {
	return confirm(withWarn(props));
}
var Modal = Modal$1;
Modal.useModal = useModal;
Modal.info = function infoFn(props) {
	return confirm(withInfo(props));
};
Modal.success = function successFn(props) {
	return confirm(withSuccess(props));
};
Modal.error = function errorFn(props) {
	return confirm(withError(props));
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
	return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
	while (destroyFns.length) {
		const close = destroyFns.pop();
		if (close) close();
	}
};
Modal.config = modalGlobalConfig;
Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
//#endregion
export { Form as a, Input as i, staticMethods as n, ConfigProvider as o, Spin as r, Modal as t };
