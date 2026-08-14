import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as RefIcon$1, u as RefIcon } from "../_libs/@ant-design/icons+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QtyStepper-CdYkjuIW.js
var import_jsx_runtime = require_jsx_runtime();
function VegMark({ veg = true, size = 14 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex shrink-0 items-center justify-center rounded-[3px] border",
		style: {
			width: size,
			height: size,
			borderColor: veg ? "var(--veg)" : "var(--nonveg)"
		},
		"aria-label": veg ? "Vegetarian" : "Non vegetarian",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-full",
			style: {
				width: size / 2.4,
				height: size / 2.4,
				background: veg ? "var(--veg)" : "var(--nonveg)"
			}
		})
	});
}
function QtyStepper({ qty, onAdd, onRemove, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid grid-cols-3 items-center rounded-lg border border-border bg-card ${compact ? "h-8 w-[86px]" : "h-11 w-[110px]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				"aria-label": "Decrease quantity",
				className: "flex h-full w-full items-center justify-center text-brand-green",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { style: { fontSize: compact ? 11 : 13 } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex h-full w-full items-center justify-center font-bold text-brand-green ${compact ? "text-sm" : "text-base"}`,
				children: qty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onAdd,
				"aria-label": "Increase quantity",
				className: "flex h-full w-full items-center justify-center text-brand-green",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, { style: { fontSize: compact ? 11 : 13 } })
			})
		]
	});
}
//#endregion
export { VegMark as n, QtyStepper as t };
