import { r as __toESM } from "../_runtime.mjs";
import { g as require_react } from "../_libs/@ant-design/cssinjs+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as Form, i as Input, n as staticMethods, t as Modal } from "../_libs/antd+[...].mjs";
import { a as RefIcon$4, d as RefIcon$5, h as RefIcon$6, i as RefIcon$2, l as RefIcon$7, m as RefIcon$1, n as RefIcon, p as RefIcon$3 } from "../_libs/@ant-design/icons+[...].mjs";
import { r as Route$1 } from "./router-BcHzLCfE.mjs";
import { a as useMenuData, n as placeOrderApi, r as useCart } from "./cart-context-Dcp_THMg.mjs";
import { n as VegMark, t as QtyStepper } from "./QtyStepper-CdYkjuIW.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-r_WTY1GO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { tableId } = Route$1.useParams();
	const { data } = useMenuData(tableId);
	const cart = useCart();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("Delivery Type");
	const [showBill, setShowBill] = (0, import_react.useState)(false);
	const [editingInstruction, setEditingInstruction] = (0, import_react.useState)(null);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const [showCheckout, setShowCheckout] = (0, import_react.useState)(false);
	const [form] = Form.useForm();
	const placeOrderMutation = useMutation({
		mutationFn: async (values) => {
			const items = cart.lines.map((l) => {
				const [id, variantId] = l.id.split("|");
				return {
					menu_item_id: parseInt(id),
					menu_item_variant_id: variantId ? parseInt(variantId) : null,
					variant_id: variantId ? parseInt(variantId) : null,
					quantity: l.qty,
					special_instructions: l.instruction
				};
			});
			const payload = {
				customer_name: values.customer_name,
				customer_phone: values.customer_phone,
				customer_email: values.customer_email,
				payment_method: "cash",
				coupon_code: cart.coupon?.code,
				items
			};
			return placeOrderApi(tableId, payload);
		},
		onSuccess: () => {
			setShowCheckout(false);
			cart.clear();
			staticMethods.success("Order submitted successfully!");
			navigate({
				to: "/$tableId",
				params: { tableId }
			});
		},
		onError: (err) => {
			staticMethods.error(err.message);
		}
	});
	(0, import_react.useEffect)(() => {
		if (celebrate) {
			const t = setTimeout(() => setCelebrate(null), 3e3);
			return () => clearTimeout(t);
		}
	}, [celebrate]);
	(0, import_react.useEffect)(() => {
		let raw = null;
		try {
			raw = sessionStorage.getItem("rominus-coupon-celebrate");
			if (raw) sessionStorage.removeItem("rominus-coupon-celebrate");
		} catch {}
		if (!raw) return;
		setCelebrate(JSON.parse(raw));
		confetti_module_default({
			particleCount: 120,
			spread: 80,
			origin: { y: .35 },
			scalar: .9
		});
	}, []);
	if (cart.count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold",
				children: "Your cart is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Add a few dishes to get started."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/$tableId",
				params: { tableId },
				className: "rounded-xl bg-brand-green px-5 py-3 font-bold text-primary-foreground",
				children: "Browse menu"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-page pb-28",
		children: [
			celebrate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-pop-in flex w-full max-w-[420px] items-center gap-3 rounded-2xl bg-brand-green px-4 py-3 text-primary-foreground shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 text-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[15px] font-extrabold",
								children: [
									"'",
									celebrate.code,
									"' applied!"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[13px] opacity-90",
								children: [
									"You saved ₹",
									celebrate.amount,
									" on this order"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, { className: "ml-auto text-lg" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bg-background px-4 pt-4 pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({
							to: "/$tableId",
							params: { tableId }
						}),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, { className: "text-xl" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-[17px] font-semibold text-muted-foreground",
							children: data?.business.name ?? "Restaurant"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-3 mt-3 rounded-2xl bg-card p-4",
				children: [
					cart.coupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pb-2 text-[15px] font-bold text-brand-green",
						children: [cart.coupon.code, " eligible items"]
					}),
					cart.lines.map((line) => {
						const { item, variant, price, mrp } = cart.lineInfo(line.id);
						if (!item) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/70 py-3 first:pt-0 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3",
									children: [
										item.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.image,
											alt: item.name,
											className: "h-14 w-14 rounded-lg object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex min-w-0 items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, { veg: item.veg }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate text-[16px] font-medium",
													children: item.name
												})]
											}), (variant || item.customisable) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													children: variant?.name ?? variant?.label ?? item.customisable
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: "text-[10px]" })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
											compact: true,
											qty: line.qty,
											onAdd: () => cart.add(line.id),
											onRemove: () => cart.remove(line.id)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [mrp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[13px] text-muted-foreground line-through",
												children: ["₹ ", mrp * line.qty]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[15px] font-semibold",
												children: ["₹ ", price * line.qty]
											})]
										})
									]
								}),
								editingInstruction === line.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 animate-in fade-in slide-in-from-top-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.TextArea, {
										autoFocus: true,
										placeholder: "E.g. Make it spicy, less oil...",
										value: line.instruction || "",
										onChange: (e) => cart.setInstruction(line.id, e.target.value),
										className: "!bg-muted !text-foreground",
										autoSize: {
											minRows: 2,
											maxRows: 4
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setEditingInstruction(null),
											className: "text-brand-green text-sm font-bold",
											children: "Done"
										})
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setEditingInstruction(line.id),
										className: "flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {}),
											" ",
											line.instruction ? "Edit request" : "Cooking requests"
										]
									})
								}),
								line.instruction && editingInstruction !== line.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[13px] text-muted-foreground bg-muted p-2 rounded-lg",
									children: [
										"\"",
										line.instruction,
										"\""
									]
								})
							]
						}, line.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/$tableId",
							params: { tableId },
							className: "flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 text-[14px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$5, {}), " Add Items"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-3 mt-3 overflow-hidden rounded-2xl bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "px-4 pt-4 pb-2 text-[13px] font-bold tracking-widest text-muted-foreground",
						children: "SAVINGS CORNER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/$tableId/coupons",
						params: { tableId },
						className: "flex items-center justify-between border-t border-border/70 px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-7 w-7 place-items-center rounded-md bg-brand-orange text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { className: "text-xs" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[16px] font-medium",
								children: cart.coupon ? `'${cart.coupon.code}' applied` : "Apply Coupon"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$6, { className: "text-muted-foreground" })]
					}),
					cart.coupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border/70 px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-7 w-7 place-items-center rounded-md bg-brand-orange text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { className: "text-xs" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[16px]",
								children: [
									"₹ ",
									cart.couponSavings,
									" saved with '",
									cart.coupon.code,
									"'"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => cart.removeCoupon(),
							className: "text-[15px] font-bold text-destructive",
							children: "REMOVE"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-3 mt-3 rounded-2xl bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowBill((v) => !v),
					className: "flex w-full items-center justify-between gap-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[oklch(0.94_0.05_165)] text-brand-green",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$7, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[16px] font-semibold",
								children: ["To Pay ₹ ", cart.payable]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: `transition-transform ${showBill ? "rotate-180" : ""}` })]
				}), showBill && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2 border-t border-border/70 pt-3 text-[14px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Item total",
							value: `₹ ${cart.itemTotal}`
						}),
						cart.couponSavings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: `Coupon '${cart.coupon?.code}'`,
							value: `-₹ ${cart.couponSavings}`,
							green: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-t border-border/70 pt-2 text-[15px] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "To pay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹ ", cart.payable] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] bg-background px-4 py-3 shadow-[0_-6px_24px_rgba(0,0,0,0.1)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowCheckout(true),
					className: "h-14 w-full rounded-xl bg-brand-green text-[17px] font-bold text-primary-foreground",
					children: ["Submit Order | ₹ ", cart.payable]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: showCheckout,
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[20px] font-extrabold",
					children: "Checkout details"
				}),
				footer: null,
				onCancel: () => setShowCheckout(false),
				centered: true,
				styles: { content: {
					borderRadius: 24,
					padding: 24
				} },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form,
					layout: "vertical",
					onFinish: (values) => placeOrderMutation.mutate(values),
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "customer_name",
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Name"
							}),
							rules: [{
								required: true,
								message: "Please enter your name"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								size: "large",
								className: "rounded-xl bg-muted",
								placeholder: "e.g. Akhil"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "customer_phone",
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Phone (Optional)"
							}),
							rules: [],
							extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Used for contact only"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								size: "large",
								type: "tel",
								className: "rounded-xl bg-muted",
								placeholder: "e.g. 9999999999"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "customer_email",
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Email (Optional)"
							}),
							rules: [{
								type: "email",
								message: "Please enter a valid email"
							}],
							extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "Used for bill and order tracking purpose only"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								size: "large",
								type: "email",
								className: "rounded-xl bg-muted",
								placeholder: "e.g. akhil@example.com"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: placeOrderMutation.isPending,
							className: "mt-6 h-12 w-full rounded-xl bg-brand-orange text-[16px] font-bold text-primary-foreground disabled:opacity-50",
							children: placeOrderMutation.isPending ? "Submitting..." : "Confirm & Pay (Cash)"
						})
					]
				})
			})
		]
	});
}
function Row({ label, value, green }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: green ? "font-semibold text-brand-green" : "font-semibold",
			children: value
		})]
	});
}
//#endregion
export { CartPage as component };
