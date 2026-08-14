import "../_runtime.mjs";
import "./@ant-design/cssinjs-utils+[...].mjs";
import { g as require_react } from "./@ant-design/cssinjs+[...].mjs";
import { i as FastColor } from "./@ant-design/colors+[...].mjs";
require_react();
var getRoundNumber = (value) => Math.round(Number(value || 0));
var convertHsb2Hsv = (color) => {
	if (color instanceof FastColor) return color;
	if (color && typeof color === "object" && "h" in color && "b" in color) {
		const { b, ...resets } = color;
		return {
			...resets,
			v: b
		};
	}
	if (typeof color === "string" && /hsb/.test(color)) return color.replace(/hsb/, "hsv");
	return color;
};
var Color = class extends FastColor {
	constructor(color) {
		super(convertHsb2Hsv(color));
	}
	toHsbString() {
		const hsb = this.toHsb();
		const saturation = getRoundNumber(hsb.s * 100);
		const lightness = getRoundNumber(hsb.b * 100);
		const hue = getRoundNumber(hsb.h);
		const alpha = hsb.a;
		const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`;
		const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${alpha.toFixed(alpha === 0 ? 0 : 2)})`;
		return alpha === 1 ? hsbString : hsbaString;
	}
	toHsb() {
		const { v, ...resets } = this.toHsv();
		return {
			...resets,
			b: v,
			a: this.a
		};
	}
};
//#endregion
//#region node_modules/@rc-component/color-picker/es/util.js
var generateColor = (color) => {
	if (color instanceof Color) return color;
	return new Color(color);
};
generateColor("#1677ff");
//#endregion
export { Color as t };
