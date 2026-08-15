import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { message, Input, Modal, Form } from "antd";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  RightOutlined,
  TagFilled,
} from "@ant-design/icons";
import { useMenuData, placeOrderApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/lib/cart-context";
import { VegMark } from "@/components/VegMark";
import { QtyStepper } from "@/components/QtyStepper";




export function CartPage() {
  const { tableId } = useParams<{ tableId: string }>();
  const { data } = useMenuData(tableId!);
  const cart = useCart();
  const navigate = useNavigate();
  const [showBill, setShowBill] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState<{ code: string; amount: number } | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form] = Form.useForm();

  const placeOrderMutation = useMutation({
    mutationFn: async (values: any) => {
      const items = cart.lines.map((l) => {
        const [id, variantId] = l.id.split("|");
        return {
          menu_item_id: parseInt(id),
          menu_item_variant_id: variantId ? parseInt(variantId) : null,
          variant_id: variantId ? parseInt(variantId) : null,
          quantity: l.qty,
          special_instructions: l.instruction,
        };
      });
      const payload = {
        customer_name: values.customer_name,
        customer_phone: values.customer_phone,
        customer_email: values.customer_email,
        payment_method: "cash",
        coupon_code: cart.coupon?.code,
        items,
      };
      return placeOrderApi(tableId!, payload);
    },
    onSuccess: () => {
      setShowCheckout(false);
      cart.clear();
      message.success("Order submitted successfully!");
      navigate(`/${tableId}`);
    },
    onError: (err: Error) => {
      message.error(err.message);
    },
  });

  useEffect(() => {
    if (celebrate) {
      const t = setTimeout(() => setCelebrate(null), 3000);
      return () => clearTimeout(t);
    }
  }, [celebrate]);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem("rominus-coupon-celebrate");
      if (raw) sessionStorage.removeItem("rominus-coupon-celebrate");
    } catch {
      /* ignore */
    }
    if (!raw) return;
    setCelebrate(JSON.parse(raw) as { code: string; amount: number });
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.35 }, scalar: 0.9 });
  }, []);

  if (cart.count === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-6 text-center">
        <h1 className="text-xl font-bold">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground">Add a few dishes to get started.</p>
        <Link to={`/${tableId}`} className="rounded-xl bg-brand-green px-5 py-3 font-bold text-primary-foreground">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page pb-28">
      {celebrate && (
        <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
          <div className="animate-pop-in flex w-full max-w-[420px] items-center gap-3 rounded-2xl bg-brand-green px-4 py-3 text-primary-foreground shadow-xl">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 text-lg">
              <TagFilled />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-extrabold">
                '{celebrate.code}' applied!
              </span>
              <span className="block text-[13px] opacity-90">
                You saved ₹{celebrate.amount} on this order
              </span>
            </span>
            <CheckOutlined className="ml-auto text-lg" />
          </div>
        </div>
      )}
      <header className="bg-background px-4 pt-4 pb-3">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
          <button type="button" onClick={() => navigate(`/${tableId}`)} aria-label="Go back">
            <ArrowLeftOutlined className="text-xl" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-semibold text-muted-foreground">
              {data?.business.name ?? "Restaurant"}
            </h1>
        
          </div>
       
        </div>

      
      </header>

      <section className="mx-3 mt-3 rounded-2xl bg-card p-4">
        {cart.coupon && (
          <div className="pb-2 text-[15px] font-bold text-brand-green">
            {cart.coupon.code} eligible items
          </div>
        )}
        {cart.lines.map((line) => {
          const { item, variant, price, mrp } = cart.lineInfo(line.id);
          if (!item) return null;
          return (
            <div
              key={line.id}
              className="border-b border-border/70 py-3 first:pt-0 flex flex-col gap-2"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <VegMark veg={item.veg} />
                    <span className="truncate text-[16px] font-medium">{item.name}</span>
                  </div>
                  {(variant || item.customisable) && (
                    <div className="mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground">
                      <span className="truncate">{variant?.name ?? variant?.label ?? item.customisable}</span>
                      <DownOutlined className="text-[10px]" />
                    </div>
                  )}
                </div>
                <QtyStepper
                  compact
                  qty={line.qty}
                  onAdd={() => cart.add(line.id)}
                  onRemove={() => cart.remove(line.id)}
                />
                <div className="text-right">
                  {mrp && (
                    <div className="text-[13px] text-muted-foreground line-through">
                      ₹ {mrp * line.qty}
                    </div>
                  )}
                  <div className="text-[15px] font-semibold">₹ {price * line.qty}</div>
                </div>
              </div>

              {editingInstruction === line.id ? (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                  <Input.TextArea
                    autoFocus
                    placeholder="E.g. Make it spicy, less oil..."
                    value={line.instruction || ""}
                    onChange={(e) => cart.setInstruction(line.id, e.target.value)}
                    className="!bg-muted !text-foreground"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingInstruction(null)}
                      className="text-brand-green text-sm font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => setEditingInstruction(line.id)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] text-muted-foreground"
                  >
                    <EditOutlined /> {line.instruction ? "Edit request" : "Cooking requests"}
                  </button>
                </div>
              )}
              {line.instruction && editingInstruction !== line.id && (
                <div className="text-[13px] text-muted-foreground bg-muted p-2 rounded-lg">
                  "{line.instruction}"
                </div>
              )}
            </div>
          );
        })}

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          <Link
            to={`/${tableId}`}
            className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 text-[14px]"
          >
            <PlusOutlined /> Add Items
          </Link>
        
          
        </div>
      </section>

     

      <section className="mx-3 mt-3 overflow-hidden rounded-2xl bg-card">
        <h2 className="px-4 pt-4 pb-2 text-[13px] font-bold tracking-widest text-muted-foreground">
          SAVINGS CORNER
        </h2>
        <Link
          to={`/${tableId}/coupons`}
          className="flex items-center justify-between border-t border-border/70 px-4 py-4"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-orange text-primary-foreground">
              <TagFilled className="text-xs" />
            </span>
            <span className="text-[16px] font-medium">
              {cart.coupon ? `'${cart.coupon.code}' applied` : "Apply Coupon"}
            </span>
          </span>
          <RightOutlined className="text-muted-foreground" />
        </Link>
        {cart.coupon && (
          <div className="flex items-center justify-between border-t border-border/70 px-4 py-4">
            <span className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-orange text-primary-foreground">
                <TagFilled className="text-xs" />
              </span>
              <span className="text-[16px]">
                ₹ {cart.couponSavings} saved with '{cart.coupon.code}'
              </span>
            </span>
            <button
              type="button"
              onClick={() => cart.removeCoupon()}
              className="text-[15px] font-bold text-destructive"
            >
              REMOVE
            </button>
          </div>
        )}
    
      </section>

      

      <section className="mx-3 mt-3 rounded-2xl bg-card p-4">
        <button
          type="button"
          onClick={() => setShowBill((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[oklch(0.94_0.05_165)] text-brand-green">
              <FileTextOutlined />
            </span>
            <span className="min-w-0">
              <span className="block text-[16px] font-semibold">
                To Pay 
                ₹ {cart.payable}
              </span>
           
            </span>
          </span>
          <DownOutlined className={`transition-transform ${showBill ? "rotate-180" : ""}`} />
        </button>
        {showBill && (
          <div className="mt-4 space-y-2 border-t border-border/70 pt-3 text-[14px]">
            <Row label="Item total" value={`₹ ${cart.itemTotal}`} />
            {cart.couponSavings > 0 && (
              <Row
                label={`Coupon '${cart.coupon?.code}'`}
                value={`-₹ ${cart.couponSavings}`}
                green
              />
            )}
          
            <div className="flex justify-between border-t border-border/70 pt-2 text-[15px] font-bold">
              <span>To pay</span>
              <span>₹ {cart.payable}</span>
            </div>
          </div>
        )}
      </section>


      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] bg-background px-4 py-3 shadow-[0_-6px_24px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={() => setShowCheckout(true)}
          className="h-14 w-full rounded-xl bg-brand-green text-[17px] font-bold text-primary-foreground"
        >
          Submit Order | ₹ {cart.payable}
        </button>
      </div>

      <Modal
        open={showCheckout}
        title={<span className="text-[20px] font-extrabold">Checkout details</span>}
        footer={null}
        onCancel={() => setShowCheckout(false)}
        centered
        styles={{ body: { borderRadius: 24, padding: 24 } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => placeOrderMutation.mutate(values)}
          className="mt-6"
        >
          <Form.Item
            name="customer_name"
            label={<span className="font-semibold text-foreground">Name</span>}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" className="rounded-xl bg-muted" placeholder="e.g. Akhil" />
          </Form.Item>
          
          <Form.Item
            name="customer_phone"
            label={<span className="font-semibold text-foreground">Phone (Optional)</span>}
            rules={[]}
            extra={<span className="text-xs text-muted-foreground">Used for contact only</span>}
          >
            <Input size="large" type="tel" className="rounded-xl bg-muted" placeholder="e.g. 9999999999" />
          </Form.Item>

          <Form.Item
            name="customer_email"
            label={<span className="font-semibold text-foreground">Email (Optional)</span>}
            rules={[{ type: "email", message: "Please enter a valid email" }]}
            extra={<span className="text-xs text-muted-foreground">Used for bill and order tracking purpose only</span>}
          >
            <Input size="large" type="email" className="rounded-xl bg-muted" placeholder="e.g. akhil@example.com" />
          </Form.Item>

          <button
            type="submit"
            disabled={placeOrderMutation.isPending}
            className="mt-6 h-12 w-full rounded-xl bg-brand-orange text-[16px] font-bold text-primary-foreground disabled:opacity-50"
          >
            {placeOrderMutation.isPending ? "Submitting..." : "Confirm & Pay (Cash)"}
          </button>
        </Form>
      </Modal>
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={green ? "font-semibold text-brand-green" : "font-semibold"}>{value}</span>
    </div>
  );
}