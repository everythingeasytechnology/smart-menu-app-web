import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type MenuItem, type Variant } from "./menu-data";
import type { APICoupon } from "./api";

type CartLine = { id: string; qty: number; instruction?: string };

export type LineInfoResult = {
  item?: MenuItem;
  variant?: Variant;
  price: number;
  mrp?: number;
};

type CartValue = {
  lines: CartLine[];
  qtyOf: (id: string) => number;
  qtyOfItem: (baseId: string) => number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  removeItem: (baseId: string) => void;
  setInstruction: (id: string, instruction: string) => void;
  clear: () => void;
  count: number;
  itemTotal: number;
  mrpTotal: number;
  coupon: APICoupon | null;
  applyCoupon: (coupon: APICoupon) => void;
  removeCoupon: () => void;
  couponSavings: number;
  deliveryType: string;
  setDeliveryType: (v: string) => void;
  deliverySavings: number;
  payable: number;
  totalSaved: number;
  lineInfo: (lineId: string) => LineInfoResult;
};

const CartContext = createContext<CartValue | null>(null);

const STORAGE_KEY = "rominus-cart-v1";

export function CartProvider({ children, menuItems }: { children: ReactNode; menuItems: MenuItem[] }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw).lines ?? [];
    } catch {}
    return [];
  });
  const [coupon, setCoupon] = useState<APICoupon | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw).coupon ?? null;
    } catch {}
    return null;
  });
  const [deliveryType, setDeliveryType] = useState("standard");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, coupon }));
    } catch {
      /* ignore */
    }
  }, [lines, coupon]);

  const value = useMemo<CartValue>(() => {
    const lineInfo = (lineId: string): LineInfoResult => {
      const [id, variantId] = lineId.split("|");
      const item = menuItems.find((i) => i.id.toString() === id);
      const variant = variantId
        ? item?.variants?.find((o) => o.id.toString() === variantId)
        : undefined;
      const price = variant?.price ?? item?.price ?? 0;
      return {
        item,
        variant,
        price,
        mrp: item?.mrp ? item.mrp : undefined, // mrp doesn't seem to apply variant price diff in new API yet, keeping simple
      };
    };

    const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qty ?? 0;
    const qtyOfItem = (baseId: string) =>
      lines
        .filter((l) => l.id === baseId || l.id.startsWith(`${baseId}|`))
        .reduce((s, l) => s + l.qty, 0);
    const itemTotal = lines.reduce((s, l) => s + lineInfo(l.id).price * l.qty, 0);
    const mrpTotal = lines.reduce((s, l) => {
      const info = lineInfo(l.id);
      return s + (info.mrp ?? info.price) * l.qty;
    }, 0);
    // Discounted items are not eligible for coupons (like the reference app).
    const eligibleTotal = lines.reduce((s, l) => {
      const info = lineInfo(l.id);
      return s + (info.item && !info.mrp ? info.price * l.qty : 0);
    }, 0);
    let couponSavings = 0;
    if (coupon && eligibleTotal >= coupon.minimum_order) {
      if (coupon.type === "fixed") {
        couponSavings = coupon.value;
      } else if (coupon.type === "percentage") {
        couponSavings = Math.floor((eligibleTotal * coupon.value) / 100);
        if (coupon.maximum_discount) {
          couponSavings = Math.min(couponSavings, coupon.maximum_discount);
        }
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
      add: (id, qty = 1) =>
        setLines((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, qty }],
        ),
      remove: (id) =>
        setLines((prev) =>
          prev
            .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0),
        ),
      removeItem: (baseId) =>
        setLines((prev) => {
          const idx = [...prev]
            .map((l, i) => ({ l, i }))
            .filter(({ l }) => l.id === baseId || l.id.startsWith(`${baseId}|`))
            .pop()?.i;
          if (idx === undefined) return prev;
          return prev
            .map((l, i) => (i === idx ? { ...l, qty: l.qty - 1 } : l))
            .filter((l) => l.qty > 0);
        }),
      setInstruction: (id, instruction) =>
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, instruction } : l))
        ),
      clear: () => {
        setLines([]);
        setCoupon(null);
      },
      count: lines.reduce((s, l) => s + l.qty, 0),
      itemTotal,
      mrpTotal,
      coupon,
      applyCoupon: (c: APICoupon) => {
        setCoupon(c);
      },
      removeCoupon: () => setCoupon(null),
      couponSavings,
      deliveryType,
      setDeliveryType,
      deliverySavings,
      payable,
      totalSaved,
      lineInfo,
    };
  }, [lines, coupon, deliveryType, menuItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}