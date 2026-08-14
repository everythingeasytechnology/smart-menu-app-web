import { r as __toESM } from "../_runtime.mjs";
import { g as require_react } from "../_libs/@ant-design/cssinjs+[...].mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { o as ConfigProvider } from "../_libs/antd+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BcHzLCfE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-CH1PkEFR.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const parts = window.location.pathname.split("/").filter(Boolean);
		if (parts.length > 0) router.navigate({ to: `/${parts[0]}` });
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold text-foreground",
				children: "Menu not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Please scan the QR code on your table to view the menu."
			})]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1"
			},
			{ title: "Rominus Pizza And Burger — Order Online" },
			{
				name: "description",
				content: "Order pizzas, burgers and desserts from Rominus with instant coupon savings."
			},
			{
				property: "og:title",
				content: "Rominus Pizza And Burger — Order Online"
			},
			{
				property: "og:description",
				content: "Order pizzas, burgers and desserts from Rominus with instant coupon savings."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigProvider, {
			theme: { token: {
				colorPrimary: "#1ba672",
				fontFamily: "\"Plus Jakarta Sans\", system-ui, sans-serif",
				borderRadius: 12
			} },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-shell min-h-screen bg-page shadow-[0_0_40px_rgba(0,0,0,0.12)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})
	});
}
var $$splitComponentImporter$3 = () => import("../_tableId-CJUi0Tot.mjs");
var Route$3 = createFileRoute("/$tableId")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_tableId-CNrUTVaG.mjs");
var Route$2 = createFileRoute("/$tableId/")({
	head: () => ({ meta: [{ title: "Rominus Pizza And Burger — Menu" }, {
		name: "description",
		content: "Browse the full Rominus menu: pizzas, garlic breads, burgers and desserts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./cart-r_WTY1GO.mjs");
var Route$1 = createFileRoute("/$tableId/cart")({
	head: () => ({ meta: [
		{ title: "Your Cart — Rominus Pizza And Burger" },
		{
			name: "description",
			content: "Review your Rominus order, apply coupons and choose a delivery type before you pay."
		},
		{
			property: "og:title",
			content: "Your Cart — Rominus Pizza And Burger"
		},
		{
			property: "og:description",
			content: "Review your order, apply coupons and pick a delivery type."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./coupons-DwZ7Lqyi.mjs");
var Route = createFileRoute("/$tableId/coupons")({
	head: () => ({ meta: [
		{ title: "Apply Coupon — Rominus Pizza And Burger" },
		{
			name: "description",
			content: "Pick the best coupon for your Rominus order and save instantly at checkout."
		},
		{
			property: "og:title",
			content: "Apply Coupon — Rominus Pizza And Burger"
		},
		{
			property: "og:description",
			content: "Pick the best coupon for your order and save instantly."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TableIdRoute = Route$3.update({
	id: "/$tableId",
	path: "/$tableId",
	getParentRoute: () => Route$4
});
var TableIdIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => TableIdRoute
});
var TableIdRouteChildren = {
	TableIdCartRoute: Route$1.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => TableIdRoute
	}),
	TableIdCouponsRoute: Route.update({
		id: "/coupons",
		path: "/coupons",
		getParentRoute: () => TableIdRoute
	}),
	TableIdIndexRoute
};
var rootRouteChildren = { TableIdRoute: TableIdRoute._addFileChildren(TableIdRouteChildren) };
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$3 as a, Route$2 as i, Route as n, Route$1 as r, router_exports as t };
