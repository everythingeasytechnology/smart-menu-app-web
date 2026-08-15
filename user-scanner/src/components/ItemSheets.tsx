import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { VegMark } from "./VegMark";
import { QtyStepper } from "./QtyStepper";

/** Full-bleed item detail popup (image + description + ADD). */
export function ItemDetailSheet({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: () => void;
}) {
  const cart = useCart();
  const qty = cart.qtyOfItem(item.id.toString());
  const hasVariants = item.variants && item.variants.length > 0;
  const isVeg = item.type === "veg" || item.veg;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/55" onClick={onClose}>
      <div
        className="mx-auto w-full max-w-[440px] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-11 w-11 place-items-center rounded-full bg-[oklch(0.35_0.01_260)] text-primary-foreground"
          >
            <CloseOutlined />
          </button>
        </div>
        <img
          src={item.image}
          alt={item.name}
          width={880}
          height={660}
          className="h-[280px] w-full object-cover"
        />
        <div className="bg-card px-4 pt-4 pb-8">
          <VegMark veg={isVeg} size={16} />
          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <h2 className="text-[22px] leading-tight font-bold">{item.name}</h2>
              <div className="mt-2 flex items-center gap-2 text-[17px]">
                <span className="font-bold">₹{item.price}</span>
                {item.mrp && (
                  <span className="text-muted-foreground line-through">₹{item.mrp}</span>
                )}
              </div>
            </div>
            <div className="text-center">
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={onAdd}
                  className="h-12 w-[124px] rounded-lg border border-border bg-card text-[17px] font-bold text-brand-green"
                >
                  ADD
                </button>
              ) : (
                <QtyStepper
                  qty={qty}
                  onAdd={onAdd}
                  onRemove={() => cart.removeItem(item.id.toString())}
                />
              )}
              {hasVariants && (
                <div className="mt-1 text-[13px] text-muted-foreground">Customisable</div>
              )}
            </div>
          </div>

          {item.description && (
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Variant / customisation bottom sheet. */
export function VariantSheet({
  item,
  onClose,
  onAdded,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdded?: () => void;
}) {
  const cart = useCart();
  const options = item.variants ?? [];
  const [selected, setSelected] = useState(options[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const selectedVariant = options.find((o) => o.id === selected);
  const total = (selectedVariant?.price ?? item.price) * qty;
  const isVeg = item.type === "veg" || item.veg;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/55" onClick={onClose}>
      <div
        className="mx-auto w-full max-w-[440px] animate-slide-up overflow-hidden rounded-t-3xl bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="h-11 w-11 rounded-lg object-cover"
          />
          <h2 className="min-w-0 flex-1 truncate text-[19px] font-bold">{item.name}</h2>
          <button type="button" onClick={onClose} aria-label="Close variants">
            <CloseOutlined className="text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto bg-muted/70 px-4 pt-4 pb-5">
          <h3 className="mt-5 text-[19px] font-bold">Choose Size / Variant</h3>

          <div className="mt-3 overflow-hidden rounded-2xl bg-card">
            {options.map((opt) => {
              const active = opt.id === selected;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border/70 px-4 py-4 text-left last:border-0"
                >
                  <VegMark veg={isVeg} />
                  <span className={`truncate text-[16px] ${active ? "font-bold" : ""}`}>
                    {opt.name ?? opt.label}
                  </span>
                  <span className="text-[15px] text-muted-foreground">
                    ₹{opt.price}
                  </span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                      active ? "border-brand-orange" : "border-border"
                    }`}
                  >
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <QtyStepper
            qty={qty}
            onAdd={() => setQty((q) => q + 1)}
            onRemove={() => setQty((q) => Math.max(1, q - 1))}
          />
          <button
            type="button"
            onClick={() => {
              cart.add(`${item.id}|${selected}`, qty);
              onClose();
              onAdded?.();
            }}
            className="h-14 min-w-0 flex-1 rounded-xl bg-brand-green text-[17px] font-bold text-primary-foreground"
          >
            Add Item | ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}
