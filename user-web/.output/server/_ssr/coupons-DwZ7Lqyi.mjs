import { r as __toESM } from "../_runtime.mjs";
import { g as require_react } from "../_libs/@ant-design/cssinjs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { r as Spin, t as Modal } from "../_libs/antd+[...].mjs";
import { _ as RefIcon$2, g as RefIcon$1, i as RefIcon, p as RefIcon$4, r as RefIcon$3 } from "../_libs/@ant-design/icons+[...].mjs";
import { n as Route } from "./router-BcHzLCfE.mjs";
import { i as useCoupons, o as validateCouponApi, r as useCart } from "./cart-context-Dcp_THMg.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coupons-DwZ7Lqyi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CouponSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-3 flex overflow-hidden rounded-2xl bg-card shadow-sm animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[90px] shrink-0 bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-24 rounded bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-16 rounded bg-muted" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-5 w-3/4 rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-dashed border-border/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-4 w-5/6 rounded bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-4 w-16 rounded bg-muted" })
			]
		})]
	});
}
function getDiscount(coupon, eligibleTotal) {
	if (eligibleTotal < coupon.minimum_order) return 0;
	let savings = 0;
	if (coupon.type === "fixed") savings = coupon.value;
	else if (coupon.type === "percentage") {
		savings = Math.floor(eligibleTotal * coupon.value / 100);
		if (coupon.maximum_discount) savings = Math.min(savings, coupon.maximum_discount);
	}
	return savings;
}
function CouponPage() {
	const { tableId } = Route.useParams();
	const cart = useCart();
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("");
	const [applied, setApplied] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const { data: coupons = [], isLoading: isFetching } = useCoupons(tableId);
	(0, import_react.useEffect)(() => {
		if (applied) {
			const t = setTimeout(() => {
				setApplied(null);
				navigate({
					to: "/$tableId/cart",
					params: { tableId }
				});
			}, 500);
			return () => clearTimeout(t);
		}
	}, [
		applied,
		navigate,
		tableId
	]);
	const eligibleTotal = cart.lines.reduce((s, l) => {
		const item = cart.lineInfo(l.id).item;
		return s + (item && !item.mrp ? item.price * l.qty : 0);
	}, 0);
	const discountedCount = cart.lines.filter((l) => cart.lineInfo(l.id).item?.mrp).length;
	const discountedWorth = cart.lines.reduce((s, l) => {
		const item = cart.lineInfo(l.id).item;
		return s + (item?.mrp ? item.price * l.qty : 0);
	}, 0);
	const fire = () => {
		const end = Date.now() + 900;
		const colors = [
			"#ff5200",
			"#1ba672",
			"#ffb800",
			"#7c3aed",
			"#38bdf8"
		];
		(function frame() {
			confetti_module_default({
				particleCount: 5,
				angle: 60,
				spread: 70,
				origin: { x: 0 },
				colors
			});
			confetti_module_default({
				particleCount: 5,
				angle: 120,
				spread: 70,
				origin: { x: 1 },
				colors
			});
			if (Date.now() < end) requestAnimationFrame(frame);
		})();
	};
	const applyMutation = useMutation({
		mutationFn: async (couponCode) => {
			return validateCouponApi(tableId, couponCode, eligibleTotal);
		},
		onSuccess: ({ coupon, discount }) => {
			cart.applyCoupon(coupon);
			setApplied({
				code: coupon.code,
				amount: discount
			});
			try {
				sessionStorage.setItem("rominus-coupon-celebrate", JSON.stringify({
					code: coupon.code,
					amount: discount
				}));
			} catch {}
			fire();
		},
		onError: (err) => {
			setError(err.message);
		}
	});
	const applyCode = (codeToApply) => {
		setError("");
		if (!codeToApply.trim()) return;
		const localMatch = coupons.find((c) => c.code.toUpperCase() === codeToApply.trim().toUpperCase());
		if (localMatch) {
			if (getDiscount(localMatch, eligibleTotal) === 0) {
				setError(`Add ₹${localMatch.minimum_order - eligibleTotal} more to use ${localMatch.code}`);
				return;
			}
		}
		applyMutation.mutate(codeToApply.trim());
	};
	const activeCode = cart.coupon?.code ?? null;
	const sorted = [...coupons].sort((a, b) => getDiscount(b, eligibleTotal) - getDiscount(a, eligibleTotal));
	const activeCoupon = sorted.find((c) => c.code === activeCode) ?? null;
	const others = sorted.filter((c) => c.code !== activeCode);
	const best = others[0] ?? null;
	const rest = others.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-page pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "rounded-b-3xl bg-background px-4 pt-4 pb-5 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/$tableId/cart",
								params: { tableId }
							}),
							"aria-label": "Go back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { className: "text-xl" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[22px] leading-tight font-extrabold tracking-wide",
							children: "APPLY COUPON"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[15px] text-muted-foreground",
							children: ["Your cart: ₹", cart.itemTotal]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex h-14 items-center gap-2 rounded-xl border border-border px-4 transition-colors focus-within:border-brand-green",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: code,
							onChange: (e) => {
								setCode(e.target.value.toUpperCase());
								setError("");
							},
							placeholder: "Enter Coupon Code",
							className: "min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground/60 uppercase",
							disabled: applyMutation.isPending
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => applyCode(code),
							disabled: applyMutation.isPending || !code.trim(),
							className: `flex items-center gap-2 text-[16px] font-bold ${code.trim() && !applyMutation.isPending ? "text-brand-orange" : "text-muted-foreground"}`,
							children: applyMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { indicator: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {
								style: { fontSize: 18 },
								spin: true
							}) }) : "APPLY"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[13px] text-destructive animate-in slide-in-from-top-1",
						children: error
					})
				]
			}),
			discountedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mt-4 flex items-start gap-3 rounded-2xl bg-card px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, { className: "mt-0.5 text-[oklch(0.7_0.16_75)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[15px] leading-snug",
					children: [
						discountedCount,
						" discounted item",
						discountedCount > 1 ? "s" : "",
						" worth ₹",
						discountedWorth,
						" is not eligible for any coupons"
					]
				})]
			}),
			isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-5",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponSkeleton, {}, i))
			}),
			!isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				activeCoupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-6 pb-3 text-[17px] font-bold",
					children: "Applied coupon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponCard, {
					coupon: activeCoupon,
					eligibleTotal,
					onApply: (c) => applyCode(c.code),
					applied: true,
					onRemove: () => cart.removeCoupon(),
					isApplying: applyMutation.isPending && applyMutation.variables === activeCoupon.code
				})] }),
				best && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-6 pb-3 text-[17px] font-bold",
					children: activeCoupon ? "Other coupons" : "Best coupon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponCard, {
					coupon: best,
					eligibleTotal,
					onApply: (c) => applyCode(c.code),
					highlight: true,
					isApplying: applyMutation.isPending && applyMutation.variables === best.code
				})] }),
				rest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-7 pb-3 text-[17px] font-bold",
					children: "Great deal you're missing out on!"
				}),
				rest.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponCard, {
						coupon: c,
						eligibleTotal,
						onApply: (c) => applyCode(c.code),
						isApplying: applyMutation.isPending && applyMutation.variables === c.code
					})
				}, c.code))
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: !!applied,
				footer: null,
				closable: false,
				centered: true,
				width: 340,
				onCancel: () => setApplied(null),
				styles: { container: {
					borderRadius: 24,
					padding: 0,
					overflow: "visible"
				} },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-pop-in relative px-6 pt-12 pb-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-4 border-card bg-brand-green text-xl text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[15px] text-muted-foreground",
							children: [
								"'",
								applied?.code,
								"' applied"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mt-2 text-[26px] leading-tight font-extrabold",
							children: [
								"₹",
								applied?.amount,
								" savings with this coupon."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setApplied(null);
								navigate({
									to: "/$tableId/cart",
									params: { tableId }
								});
							},
							className: "mt-6 h-14 w-full rounded-xl bg-brand-orange text-[17px] font-bold text-primary-foreground",
							children: "YAY!"
						})
					]
				})
			})
		]
	});
}
function CouponCard({ coupon, eligibleTotal, onApply, highlight, applied, onRemove, isApplying }) {
	const [more, setMore] = (0, import_react.useState)(false);
	const amount = getDiscount(coupon, eligibleTotal);
	const usable = amount > 0;
	const badgeText = coupon.type === "percentage" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`;
	const description = `Use code ${coupon.code} & get ${badgeText} on orders above ₹${coupon.minimum_order}.${coupon.maximum_discount ? ` Maximum discount: ₹${coupon.maximum_discount}.` : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-3 flex overflow-hidden rounded-2xl bg-card shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid w-[90px] shrink-0 place-items-center",
			style: { background: applied ? "var(--brand-green)" : usable ? "var(--brand-orange)" : "oklch(0.75 0.01 260)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[20px] font-extrabold tracking-wide text-primary-foreground",
				style: {
					writingMode: "vertical-rl",
					transform: "rotate(180deg)"
				},
				children: badgeText
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-6 -left-1.5 flex flex-col gap-2",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-2.5 w-2.5 rounded-full bg-page" }, i))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate text-[20px] font-extrabold tracking-wide",
						children: coupon.code
					}), applied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onRemove,
						className: "shrink-0 text-[15px] font-bold text-destructive",
						children: "REMOVE"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onApply(coupon),
						disabled: !usable || isApplying,
						className: `flex items-center gap-1.5 shrink-0 text-[15px] font-bold ${usable ? "text-brand-orange" : "text-muted-foreground"}`,
						children: isApplying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { indicator: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {
							style: { fontSize: 16 },
							spin: true
						}) }) : "APPLY"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[16px] font-semibold text-brand-green",
					children: applied ? `₹${amount} saved with this coupon` : usable ? `Save ₹${amount} on this order!` : `Add ₹${Math.max(0, coupon.minimum_order - eligibleTotal)} more to get ${coupon.type === "fixed" ? `Flat ₹${coupon.value}` : `${coupon.value}%`} off`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-dashed border-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-[15px] text-muted-foreground ${more ? "" : "line-clamp-2"}`,
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMore((v) => !v),
					className: "mt-3 text-[15px] font-bold",
					children: [
						more ? "- LESS" : "+ MORE",
						" ",
						highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, { className: "hidden" })
					]
				})
			]
		})]
	});
}
//#endregion
export { CouponPage as component };
