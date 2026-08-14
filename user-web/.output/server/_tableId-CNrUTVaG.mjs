import { r as __toESM } from "./_runtime.mjs";
import { g as require_react } from "./_libs/@ant-design/cssinjs+[...].mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { i as Input } from "./_libs/antd+[...].mjs";
import { f as RefIcon$1, h as RefIcon$3, t as RefIcon$2, y as RefIcon } from "./_libs/@ant-design/icons+[...].mjs";
import { i as Route$2 } from "./_ssr/router-BcHzLCfE.mjs";
import { a as useMenuData, r as useCart } from "./_ssr/cart-context-Dcp_THMg.mjs";
import { n as VegMark, t as QtyStepper } from "./_ssr/QtyStepper-CdYkjuIW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tableId-CNrUTVaG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Full-bleed item detail popup (image + description + ADD). */
function ItemDetailSheet({ item, onClose, onAdd }) {
	const cart = useCart();
	const qty = cart.qtyOfItem(item.id.toString());
	const hasVariants = item.variants && item.variants.length > 0;
	const isVeg = item.type === "veg" || item.veg;
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex flex-col justify-end bg-black/55",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[440px] animate-slide-up",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close",
						className: "grid h-11 w-11 place-items-center rounded-full bg-[oklch(0.35_0.01_260)] text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image,
					alt: item.name,
					width: 880,
					height: 660,
					className: "h-[280px] w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card px-4 pt-4 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, {
							veg: isVeg,
							size: 16
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[22px] leading-tight font-bold",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2 text-[17px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: ["₹", item.price]
									}), item.mrp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground line-through",
										children: ["₹", item.mrp]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [qty === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onAdd,
									className: "h-12 w-[124px] rounded-lg border border-border bg-card text-[17px] font-bold text-brand-green",
									children: "ADD"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
									qty,
									onAdd,
									onRemove: () => cart.removeItem(item.id.toString())
								}), hasVariants && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[13px] text-muted-foreground",
									children: "Customisable"
								})]
							})]
						}),
						item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[16px] leading-relaxed text-muted-foreground",
							children: item.description
						})
					]
				})
			]
		})
	});
}
/** Variant / customisation bottom sheet. */
function VariantSheet({ item, onClose, onAdded }) {
	const cart = useCart();
	const options = item.variants ?? [];
	const [selected, setSelected] = (0, import_react.useState)(options[0]?.id ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	const total = (options.find((o) => o.id === selected)?.price ?? item.price) * qty;
	const isVeg = item.type === "veg" || item.veg;
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex flex-col justify-end bg-black/55",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[440px] animate-slide-up overflow-hidden rounded-t-3xl bg-card",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.name,
							width: 120,
							height: 120,
							className: "h-11 w-11 rounded-lg object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "min-w-0 flex-1 truncate text-[19px] font-bold",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							"aria-label": "Close variants",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { className: "text-muted-foreground" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[52vh] overflow-y-auto bg-muted/70 px-4 pt-4 pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 text-[19px] font-bold",
						children: "Choose Size / Variant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 overflow-hidden rounded-2xl bg-card",
						children: options.map((opt) => {
							const active = opt.id === selected;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(opt.id),
								className: "grid w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border/70 px-4 py-4 text-left last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, { veg: isVeg }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `truncate text-[16px] ${active ? "font-bold" : ""}`,
										children: opt.name ?? opt.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[15px] text-muted-foreground",
										children: ["₹", opt.price]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid h-5 w-5 place-items-center rounded-full border-2 ${active ? "border-brand-orange" : "border-border"}`,
										children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-brand-orange" })
									})
								]
							}, opt.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
						qty,
						onAdd: () => setQty((q) => q + 1),
						onRemove: () => setQty((q) => Math.max(1, q - 1))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							cart.add(`${item.id}|${selected}`, qty);
							onClose();
							onAdded?.();
						},
						className: "h-14 min-w-0 flex-1 rounded-xl bg-brand-green text-[17px] font-bold text-primary-foreground",
						children: ["Add Item | ₹", total]
					})]
				})
			]
		})
	});
}
function MenuPage() {
	const { tableId } = Route$2.useParams();
	const { data, isLoading, isError, error } = useMenuData(tableId);
	const cart = useCart();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [openCats, setOpenCats] = (0, import_react.useState)(false);
	const sectionRefs = (0, import_react.useRef)({});
	const scrollTo = (id) => {
		setOpenCats(false);
		setTimeout(() => {
			const el = sectionRefs.current[id.toString()];
			if (el) window.scrollTo({
				top: el.offsetTop - 118,
				behavior: "smooth"
			});
		}, 220);
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: "Loading menu..."
	});
	if (isError || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen items-center justify-center bg-background text-red-500",
		children: ["Failed to load menu: ", error?.message || "Unknown error"]
	});
	const { categories, business } = data;
	const categoriesWithResults = categories.map((cat) => ({
		...cat,
		filteredItems: cat.items.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
	})).filter((cat) => cat.filteredItems.length > 0);
	const hasResults = categoriesWithResults.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 bg-background px-4 pt-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-12 min-w-0 flex-1 items-center gap-2 rounded-2xl bg-muted px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, { className: "shrink-0 text-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							variant: "borderless",
							placeholder: `Search in ${business.name} ...`,
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "min-w-0 flex-1 !bg-transparent !px-0 shadow-none !outline-none focus:!shadow-none focus:!outline-none hover:!bg-transparent text-[15px]"
						})]
					})
				})
			}),
			!hasResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 flex flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, { className: "text-3xl text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "No items found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[15px] text-muted-foreground",
						children: [
							"We couldn't find anything matching \"",
							searchQuery,
							"\". Try searching for something else."
						]
					})
				]
			}),
			categoriesWithResults.map((cat) => {
				const items = cat.filteredItems;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: (el) => {
						sectionRefs.current[cat.id.toString()] = el;
					},
					className: "border-t border-border/70 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "px-4 text-[17px] font-bold",
						children: [
							cat.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"(",
									items.length,
									")"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-x-4 gap-y-7 px-4 pt-4 pb-5",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCard, { item }, item.id))
					})]
				}, cat.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpenCats(true),
				className: `fixed z-30 flex h-[68px] w-[68px] flex-col items-center justify-center gap-[3px] rounded-full bg-brand-green leading-none text-primary-foreground shadow-xl transition-all duration-300 ${cart.count > 0 ? "bottom-[90px]" : "bottom-6"}`,
				style: { right: "max(14px, calc(50% - 201px))" },
				"aria-label": "Browse menu categories",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, { style: {
					fontSize: 20,
					lineHeight: 1
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] leading-none font-semibold tracking-[0.08em]",
					children: "ITEMS"
				})]
			}),
			openCats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30",
				onClick: () => setOpenCats(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `fixed z-40 transition-all duration-300 ease-out ${openCats ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"} ${cart.count > 0 ? "bottom-[168px]" : "bottom-[102px]"}`,
				style: {
					right: "max(14px, calc(50% - 201px))",
					transformOrigin: "bottom right"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[240px] overflow-hidden rounded-3xl bg-card px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-border/50",
					children: categories.filter((c) => c.items.length > 0).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => scrollTo(c.id),
						className: "flex w-full items-center justify-between border-b border-border/60 py-4 text-left last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[17px] font-medium text-foreground",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[17px] text-muted-foreground",
							children: c.items.length
						})]
					}, c.id))
				})
			}),
			cart.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] rounded-t-3xl bg-background p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.12)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/$tableId/cart",
					params: { tableId },
					className: "flex h-14 items-center justify-between rounded-2xl bg-brand-green px-5 text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[17px] font-bold",
						children: [
							cart.count,
							" Item",
							cart.count > 1 ? "s" : "",
							" added"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-[17px] font-bold",
						children: ["View Cart ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: "text-sm" })]
					})]
				})
			})
		]
	});
}
function MenuCard({ item }) {
	const cart = useCart();
	const qty = cart.qtyOfItem(item.id.toString());
	const [showDetail, setShowDetail] = (0, import_react.useState)(false);
	const [showVariants, setShowVariants] = (0, import_react.useState)(false);
	const hasVariants = item.variants && item.variants.length > 0;
	const handleAdd = () => {
		if (hasVariants) setShowVariants(true);
		else cart.add(item.id.toString());
	};
	const isVeg = item.type === "veg" || item.veg;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setShowDetail(true),
				className: "text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image,
					alt: item.name,
					loading: "lazy",
					width: 640,
					height: 640,
					className: "aspect-square w-full rounded-2xl object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex items-center justify-between gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, { veg: isVeg })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setShowDetail(true),
				className: "mt-1 text-left text-[15px] leading-snug font-bold",
				children: item.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex items-end justify-between gap-2 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [item.mrp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[13px] text-muted-foreground line-through",
						children: ["₹", item.mrp]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[15px] font-bold",
						children: ["₹", item.price]
					})]
				}), qty === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleAdd,
					className: "h-11 w-[92px] rounded-lg border border-border bg-card text-[15px] font-bold text-brand-green",
					children: "ADD"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
					qty,
					onAdd: handleAdd,
					onRemove: () => cart.removeItem(item.id.toString())
				})]
			}),
			hasVariants && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: "customisable"
			}),
			showDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDetailSheet, {
				item,
				onClose: () => setShowDetail(false),
				onAdd: () => {
					if (hasVariants) setShowVariants(true);
					else cart.add(item.id.toString());
				}
			}),
			showVariants && hasVariants && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantSheet, {
				item,
				onClose: () => setShowVariants(false),
				onAdded: () => setShowDetail(false)
			})
		]
	});
}
//#endregion
export { MenuPage as component };
