import { r as __toESM } from "../_runtime.mjs";
import { g as require_react } from "../_libs/@ant-design/cssinjs+[...].mjs";
import { i as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-context-Dcp_THMg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE_URL = "https://smartmenu.everythingeasy.in";
function useCoupons(tableId) {
	return useQuery({
		queryKey: ["coupons", tableId],
		queryFn: async () => {
			const res = await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/coupons`);
			if (!res.ok) throw new Error("Failed to fetch coupons");
			const data = await res.json();
			if (!data.success) throw new Error(data.message);
			return data.data.coupons;
		},
		staleTime: 0
	});
}
async function validateCouponApi(tableId, code, subtotal) {
	const data = await (await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/coupons/validate`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			code,
			subtotal
		})
	})).json();
	if (!data.success) {
		const errorMsg = data.errors?.coupon_code?.[0] || data.message || "Invalid coupon";
		throw new Error(errorMsg);
	}
	return {
		coupon: data.data.coupon,
		discount: data.data.discount
	};
}
function useMenuData(tableId) {
	return useQuery({
		queryKey: ["menuData", tableId],
		queryFn: async () => {
			const [catRes, menuRes] = await Promise.all([fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/categories`), fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/menu`)]);
			if (!catRes.ok || !menuRes.ok) throw new Error("Failed to fetch menu data");
			const catData = await catRes.json();
			const menuData = await menuRes.json();
			if (!catData.success || !menuData.success) throw new Error(catData.message || menuData.message || "Error fetching data");
			const categories = catData.data.categories;
			const items = menuData.data;
			return {
				categories: categories.map((cat) => ({
					...cat,
					items: items.filter((item) => item.category_id === cat.id)
				})),
				allItems: items,
				business: menuData.business
			};
		},
		staleTime: 0
	});
}
async function placeOrderApi(tableId, payload) {
	const data = await (await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	})).json();
	if (!data.success) {
		const errorMsg = data.message || "Failed to place order";
		throw new Error(errorMsg);
	}
	return data;
}
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "rominus-cart-v1";
function CartProvider({ children, menuItems }) {
	const [lines, setLines] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return JSON.parse(raw).lines ?? [];
		} catch {}
		return [];
	});
	const [coupon, setCoupon] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return JSON.parse(raw).coupon ?? null;
		} catch {}
		return null;
	});
	const [deliveryType, setDeliveryType] = (0, import_react.useState)("standard");
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({
				lines,
				coupon
			}));
		} catch {}
	}, [lines, coupon]);
	const value = (0, import_react.useMemo)(() => {
		const lineInfo = (lineId) => {
			const [id, variantId] = lineId.split("|");
			const item = menuItems.find((i) => i.id.toString() === id);
			const variant = variantId ? item?.variants?.find((o) => o.id.toString() === variantId) : void 0;
			return {
				item,
				variant,
				price: variant?.price ?? item?.price ?? 0,
				mrp: item?.mrp ? item.mrp : void 0
			};
		};
		const qtyOf = (id) => lines.find((l) => l.id === id)?.qty ?? 0;
		const qtyOfItem = (baseId) => lines.filter((l) => l.id === baseId || l.id.startsWith(`${baseId}|`)).reduce((s, l) => s + l.qty, 0);
		const itemTotal = lines.reduce((s, l) => s + lineInfo(l.id).price * l.qty, 0);
		const mrpTotal = lines.reduce((s, l) => {
			const info = lineInfo(l.id);
			return s + (info.mrp ?? info.price) * l.qty;
		}, 0);
		const eligibleTotal = lines.reduce((s, l) => {
			const info = lineInfo(l.id);
			return s + (info.item && !info.mrp ? info.price * l.qty : 0);
		}, 0);
		let couponSavings = 0;
		if (coupon && eligibleTotal >= coupon.minimum_order) {
			if (coupon.type === "fixed") couponSavings = coupon.value;
			else if (coupon.type === "percentage") {
				couponSavings = Math.floor(eligibleTotal * coupon.value / 100);
				if (coupon.maximum_discount) couponSavings = Math.min(couponSavings, coupon.maximum_discount);
			}
		}
		const deliverySavings = lines.length ? 110 : 0;
		const expressFee = deliveryType === "express" ? 19 : 0;
		const payable = Math.max(0, itemTotal - couponSavings + expressFee);
		const totalSaved = mrpTotal - itemTotal + couponSavings + deliverySavings;
		return {
			lines,
			qtyOf,
			qtyOfItem,
			add: (id, qty = 1) => setLines((prev) => prev.some((l) => l.id === id) ? prev.map((l) => l.id === id ? {
				...l,
				qty: l.qty + qty
			} : l) : [...prev, {
				id,
				qty
			}]),
			remove: (id) => setLines((prev) => prev.map((l) => l.id === id ? {
				...l,
				qty: l.qty - 1
			} : l).filter((l) => l.qty > 0)),
			removeItem: (baseId) => setLines((prev) => {
				const idx = [...prev].map((l, i) => ({
					l,
					i
				})).filter(({ l }) => l.id === baseId || l.id.startsWith(`${baseId}|`)).pop()?.i;
				if (idx === void 0) return prev;
				return prev.map((l, i) => i === idx ? {
					...l,
					qty: l.qty - 1
				} : l).filter((l) => l.qty > 0);
			}),
			setInstruction: (id, instruction) => setLines((prev) => prev.map((l) => l.id === id ? {
				...l,
				instruction
			} : l)),
			clear: () => {
				setLines([]);
				setCoupon(null);
			},
			count: lines.reduce((s, l) => s + l.qty, 0),
			itemTotal,
			mrpTotal,
			coupon,
			applyCoupon: (c) => {
				setCoupon(c);
			},
			removeCoupon: () => setCoupon(null),
			couponSavings,
			deliveryType,
			setDeliveryType,
			deliverySavings,
			payable,
			totalSaved,
			lineInfo
		};
	}, [
		lines,
		coupon,
		deliveryType,
		menuItems
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
export { useMenuData as a, useCoupons as i, placeOrderApi as n, validateCouponApi as o, useCart as r, CartProvider as t };
