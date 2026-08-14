import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Modal, Spin } from "antd";
import { ArrowLeftOutlined, DownOutlined, InfoCircleFilled, PercentageOutlined, LoadingOutlined } from "@ant-design/icons";
import { useCart } from "@/lib/cart-context";
import { useCoupons, validateCouponApi, type APICoupon } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { CouponSkeleton } from "@/components/CouponSkeleton";

export const Route = createFileRoute("/$tableId/coupons")({
  head: () => ({
    meta: [
      { title: "Apply Coupon — Rominus Pizza And Burger" },
      {
        name: "description",
        content: "Pick the best coupon for your Rominus order and save instantly at checkout.",
      },
      { property: "og:title", content: "Apply Coupon — Rominus Pizza And Burger" },
      {
        property: "og:description",
        content: "Pick the best coupon for your order and save instantly.",
      },
    ],
  }),
  component: CouponPage,
});

function getDiscount(coupon: APICoupon, eligibleTotal: number) {
  if (eligibleTotal < coupon.minimum_order) return 0;
  let savings = 0;
  if (coupon.type === "fixed") {
    savings = coupon.value;
  } else if (coupon.type === "percentage") {
    savings = Math.floor((eligibleTotal * coupon.value) / 100);
    if (coupon.maximum_discount) {
      savings = Math.min(savings, coupon.maximum_discount);
    }
  }
  return savings;
}

function CouponPage() {
  const { tableId } = Route.useParams();
  const cart = useCart();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; amount: number } | null>(null);
  const [error, setError] = useState("");

  const { data: coupons = [], isLoading: isFetching } = useCoupons(tableId);

  useEffect(() => {
    if (applied) {
      const t = setTimeout(() => {
        setApplied(null);
        navigate({ to: "/$tableId/cart", params: { tableId } });
      }, 500);
      return () => clearTimeout(t);
    }
  }, [applied, navigate, tableId]);

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
    const colors = ["#ff5200", "#1ba672", "#ffb800", "#7c3aed", "#38bdf8"];
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const applyMutation = useMutation({
    mutationFn: async (couponCode: string) => {
      return validateCouponApi(tableId, couponCode, eligibleTotal);
    },
    onSuccess: ({ coupon, discount }) => {
      cart.applyCoupon(coupon);
      setApplied({ code: coupon.code, amount: discount });
      try {
        sessionStorage.setItem("rominus-coupon-celebrate", JSON.stringify({ code: coupon.code, amount: discount }));
      } catch {
        /* ignore */
      }
      fire();
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const applyCode = (codeToApply: string) => {
    setError("");
    if (!codeToApply.trim()) return;
    
    // Quick local check for existing fetched coupons (optional, but good for UX)
    const localMatch = coupons.find(c => c.code.toUpperCase() === codeToApply.trim().toUpperCase());
    if (localMatch) {
        const potentialDiscount = getDiscount(localMatch, eligibleTotal);
        if (potentialDiscount === 0) {
           setError(`Add ₹${localMatch.minimum_order - eligibleTotal} more to use ${localMatch.code}`);
           return;
        }
    }
    
    applyMutation.mutate(codeToApply.trim());
  };

  const activeCode = cart.coupon?.code ?? null;
  const sorted = [...coupons].sort(
    (a, b) => getDiscount(b, eligibleTotal) - getDiscount(a, eligibleTotal),
  );
  
  const activeCoupon = sorted.find((c) => c.code === activeCode) ?? null;
  const others = sorted.filter((c) => c.code !== activeCode);
  const best = others[0] ?? null;
  const rest = others.slice(1);

  return (
    <div className="min-h-screen bg-page pb-24">
      <header className="rounded-b-3xl bg-background px-4 pt-4 pb-5 shadow-sm">
        <div className="flex items-start gap-4">
          <button type="button" onClick={() => navigate({ to: "/$tableId/cart", params: { tableId } })} aria-label="Go back">
            <ArrowLeftOutlined className="text-xl" />
          </button>
          <div>
            <h1 className="text-[22px] leading-tight font-extrabold tracking-wide">APPLY COUPON</h1>
            <p className="text-[15px] text-muted-foreground">Your cart: ₹{cart.itemTotal}</p>
          </div>
        </div>
        <div className="mt-5 flex h-14 items-center gap-2 rounded-xl border border-border px-4 transition-colors focus-within:border-brand-green">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="Enter Coupon Code"
            className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground/60 uppercase"
            disabled={applyMutation.isPending}
          />
          <button
            type="button"
            onClick={() => applyCode(code)}
            disabled={applyMutation.isPending || !code.trim()}
            className={`flex items-center gap-2 text-[16px] font-bold ${
              code.trim() && !applyMutation.isPending ? "text-brand-orange" : "text-muted-foreground"
            }`}
          >
            {applyMutation.isPending ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> : "APPLY"}
          </button>
        </div>
        {error && <p className="mt-2 text-[13px] text-destructive animate-in slide-in-from-top-1">{error}</p>}
      </header>

      {discountedCount > 0 && (
        <div className="mx-3 mt-4 flex items-start gap-3 rounded-2xl bg-card px-4 py-4">
          <InfoCircleFilled className="mt-0.5 text-[oklch(0.7_0.16_75)]" />
          <p className="text-[15px] leading-snug">
            {discountedCount} discounted item{discountedCount > 1 ? "s" : ""} worth ₹
            {discountedWorth} is not eligible for any coupons
          </p>
        </div>
      )}

      {isFetching && (
        <div className="mt-6 flex flex-col gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <CouponSkeleton key={i} />
          ))}
        </div>
      )}

      {!isFetching && (
        <>
          {activeCoupon && (
            <>
              <h2 className="px-4 pt-6 pb-3 text-[17px] font-bold">Applied coupon</h2>
              <CouponCard
                coupon={activeCoupon}
                eligibleTotal={eligibleTotal}
                onApply={(c) => applyCode(c.code)}
                applied
                onRemove={() => cart.removeCoupon()}
                isApplying={applyMutation.isPending && applyMutation.variables === activeCoupon.code}
              />
            </>
          )}

          {best && (
            <>
              <h2 className="px-4 pt-6 pb-3 text-[17px] font-bold">
                {activeCoupon ? "Other coupons" : "Best coupon"}
              </h2>
              <CouponCard 
                coupon={best} 
                eligibleTotal={eligibleTotal} 
                onApply={(c) => applyCode(c.code)} 
                highlight 
                isApplying={applyMutation.isPending && applyMutation.variables === best.code}
              />
            </>
          )}

          {rest.length > 0 && (
            <h2 className="px-4 pt-7 pb-3 text-[17px] font-bold">Great deal you're missing out on!</h2>
          )}
          {rest.map((c) => (
            <div key={c.code} className="pb-5">
              <CouponCard 
                coupon={c} 
                eligibleTotal={eligibleTotal} 
                onApply={(c) => applyCode(c.code)} 
                isApplying={applyMutation.isPending && applyMutation.variables === c.code}
              />
            </div>
          ))}
        </>
      )}

      <Modal
        open={!!applied}
        footer={null}
        closable={false}
        centered
        width={340}
        onCancel={() => setApplied(null)}
        styles={{ container: { borderRadius: 24, padding: 0, overflow: "visible" } }}
      >
        <div className="animate-pop-in relative px-6 pt-12 pb-6 text-center">
          <div className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-4 border-card bg-brand-green text-xl text-primary-foreground">
            <PercentageOutlined />
          </div>
          <p className="text-[15px] text-muted-foreground">'{applied?.code}' applied</p>
          <h3 className="mt-2 text-[26px] leading-tight font-extrabold">
            ₹{applied?.amount} savings with this coupon.
          </h3>
          <button
            type="button"
            onClick={() => {
              setApplied(null);
              navigate({ to: "/$tableId/cart", params: { tableId } });
            }}
            className="mt-6 h-14 w-full rounded-xl bg-brand-orange text-[17px] font-bold text-primary-foreground"
          >
            YAY!
          </button>
        </div>
      </Modal>
    </div>
  );
}

function CouponCard({
  coupon,
  eligibleTotal,
  onApply,
  highlight,
  applied,
  onRemove,
  isApplying,
}: {
  coupon: APICoupon;
  eligibleTotal: number;
  onApply: (c: APICoupon) => void;
  highlight?: boolean;
  applied?: boolean;
  onRemove?: () => void;
  isApplying?: boolean;
}) {
  const [more, setMore] = useState(false);
  const amount = getDiscount(coupon, eligibleTotal);
  const usable = amount > 0;
  
  const badgeText = coupon.type === "percentage" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`;
  const description = `Use code ${coupon.code} & get ${badgeText} on orders above ₹${coupon.minimum_order}.${coupon.maximum_discount ? ` Maximum discount: ₹${coupon.maximum_discount}.` : ''}`;

  return (
    <div className="mx-3 flex overflow-hidden rounded-2xl bg-card shadow-sm">
      <div
        className="relative grid w-[90px] shrink-0 place-items-center"
        style={{
          background: applied
            ? "var(--brand-green)"
            : usable
              ? "var(--brand-orange)"
              : "oklch(0.75 0.01 260)",
        }}
      >
        <span
          className="text-[20px] font-extrabold tracking-wide text-primary-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {badgeText}
        </span>
        <span className="absolute top-6 -left-1.5 flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block h-2.5 w-2.5 rounded-full bg-page" />
          ))}
        </span>
      </div>
      <div className="min-w-0 flex-1 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-[20px] font-extrabold tracking-wide">{coupon.code}</h3>
          {applied ? (
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 text-[15px] font-bold text-destructive"
            >
              REMOVE
            </button>
          ) : (
          <button
            type="button"
            onClick={() => onApply(coupon)}
            disabled={!usable || isApplying}
            className={`flex items-center gap-1.5 shrink-0 text-[15px] font-bold ${
              usable ? "text-brand-orange" : "text-muted-foreground"
            }`}
          >
            {isApplying ? <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} /> : "APPLY"}
          </button>
          )}
        </div>
        <p className="mt-1 text-[16px] font-semibold text-brand-green">
          {applied
            ? `₹${amount} saved with this coupon`
            : usable
            ? `Save ₹${amount} on this order!`
            : `Add ₹${Math.max(0, coupon.minimum_order - eligibleTotal)} more to get ${
                coupon.type === "fixed" ? `Flat ₹${coupon.value}` : `${coupon.value}%`
              } off`}
        </p>
        <div className="my-3 border-t border-dashed border-border" />
        <p className={`text-[15px] text-muted-foreground ${more ? "" : "line-clamp-2"}`}>
          {description}
        </p>
        <button
          type="button"
          onClick={() => setMore((v) => !v)}
          className="mt-3 text-[15px] font-bold"
        >
          {more ? "- LESS" : "+ MORE"} {highlight && <DownOutlined className="hidden" />}
        </button>
      </div>
    </div>
  );
}