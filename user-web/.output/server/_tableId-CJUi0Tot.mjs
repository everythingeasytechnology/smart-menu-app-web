import { d as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as Route$3 } from "./_ssr/router-BcHzLCfE.mjs";
import { a as useMenuData, t as CartProvider } from "./_ssr/cart-context-Dcp_THMg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tableId-CJUi0Tot.js
var import_jsx_runtime = require_jsx_runtime();
function MenuItemSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-4 border-b border-border/70 p-4 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-3/4 rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-4 w-1/4 rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-3 w-full rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-3 w-5/6 rounded bg-muted" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative h-[110px] w-[110px] shrink-0 rounded-xl bg-muted" })]
	});
}
function TableLayout() {
	const { tableId } = Route$3.useParams();
	const { data, isLoading, isError, error } = useMenuData(tableId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-20 bg-background px-4 pt-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-full rounded-2xl bg-muted animate-pulse" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 px-4 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-32 rounded bg-muted animate-pulse" })
			}),
			Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemSkeleton, {}, i))
		]
	});
	if (isError || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center bg-background text-red-500",
		children: ["Failed to load menu: ", error?.message || "Unknown error"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, {
		menuItems: data.allItems,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { TableLayout as component };
