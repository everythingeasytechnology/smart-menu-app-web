import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Drawer, Input } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  RightOutlined,
} from "@ant-design/icons";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { VegMark } from "@/components/VegMark";
import { QtyStepper } from "@/components/QtyStepper";
import { ItemDetailSheet, VariantSheet } from "@/components/ItemSheets";
import { useMenuData } from "@/lib/api";

export const Route = createFileRoute("/$tableId/")({
  head: () => ({
    meta: [
      { title: "Rominus Pizza And Burger — Menu" },
      {
        name: "description",
        content: "Browse the full Rominus menu: pizzas, garlic breads, burgers and desserts.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { tableId } = Route.useParams();
  const { data, isLoading, isError, error } = useMenuData(tableId);
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [openCats, setOpenCats] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (id: string | number) => {
    setOpenCats(false);
    setTimeout(() => {
      const el = sectionRefs.current[id.toString()];
      if (el) window.scrollTo({ top: el.offsetTop - 118, behavior: "smooth" });
    }, 220);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        Loading menu...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-red-500">
        Failed to load menu: {error?.message || "Unknown error"}
      </div>
    );
  }

  const { categories, business } = data;

  const categoriesWithResults = categories
    .map((cat) => ({
      ...cat,
      filteredItems: cat.items.filter((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.filteredItems.length > 0);

  const hasResults = categoriesWithResults.length > 0;

  return (
    <div className="relative min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-20 bg-background px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-2xl bg-muted px-3">
            <SearchOutlined className="shrink-0 text-lg" />
            <Input
              variant="borderless"
              placeholder={`Search in ${business.name} ...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 !bg-transparent !px-0 shadow-none !outline-none focus:!shadow-none focus:!outline-none hover:!bg-transparent text-[15px]"
            />
        
          </div>
        </div>
      </header>

      {!hasResults && (
        <div className="mt-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <SearchOutlined className="text-3xl text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">No items found</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            We couldn't find anything matching "{searchQuery}". Try searching for something else.
          </p>
        </div>
      )}

      {categoriesWithResults.map((cat) => {
        const items = cat.filteredItems;
        return (
          <div
            key={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id.toString()] = el;
            }}
            className="border-t border-border/70 pt-4"
          >
            <h2 className="px-4 text-[17px] font-bold">
              {cat.name} <span className="text-muted-foreground">({items.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 px-4 pt-4 pb-5">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Categories float button, bottom-right */}
      <button
        type="button"
        onClick={() => setOpenCats(true)}
        className={`fixed z-30 flex h-[68px] w-[68px] flex-col items-center justify-center gap-[3px] rounded-full bg-brand-green leading-none text-primary-foreground shadow-xl transition-all duration-300 ${
          cart.count > 0 ? "bottom-[90px]" : "bottom-6"
        }`}
        style={{ right: "max(14px, calc(50% - 201px))" }}
        aria-label="Browse menu categories"
      >
        <UnorderedListOutlined style={{ fontSize: 20, lineHeight: 1 }} />
        <span className="text-[10px] leading-none font-semibold tracking-[0.08em]">ITEMS</span>
      </button>

      {/* Invisible backdrop to close the menu */}
      {openCats && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenCats(false)} />
      )}

      {/* Floating categories menu */}
      <div 
        className={`fixed z-40 transition-all duration-300 ease-out ${
          openCats ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
        } ${cart.count > 0 ? "bottom-[168px]" : "bottom-[102px]"}`}
        style={{ right: "max(14px, calc(50% - 201px))", transformOrigin: "bottom right" }}
      >
        <div className="w-[240px] overflow-hidden rounded-3xl bg-card px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-border/50">
          {categories.filter(c => c.items.length > 0).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollTo(c.id)}
              className="flex w-full items-center justify-between border-b border-border/60 py-4 text-left last:border-0"
            >
              <span className="text-[17px] font-medium text-foreground">{c.name}</span>
              <span className="text-[17px] text-muted-foreground">{c.items.length}</span>
            </button>
          ))}
        </div>
      </div>

      {cart.count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] rounded-t-3xl bg-background p-3 shadow-[0_-6px_24px_rgba(0,0,0,0.12)]">
          <Link
            to="/$tableId/cart"
            params={{ tableId }}
            className="flex h-14 items-center justify-between rounded-2xl bg-brand-green px-5 text-primary-foreground"
          >
            <span className="text-[17px] font-bold">
              {cart.count} Item{cart.count > 1 ? "s" : ""} added
            </span>
            <span className="flex items-center gap-1 text-[17px] font-bold">
              View Cart <RightOutlined className="text-sm" />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const cart = useCart();
  const qty = cart.qtyOfItem(item.id.toString());
  const [showDetail, setShowDetail] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const hasVariants = item.variants && item.variants.length > 0;

  const handleAdd = () => {
    if (hasVariants) setShowVariants(true);
    else cart.add(item.id.toString());
  };

  const isVeg = item.type === "veg" || item.veg;

  return (
    <div className="flex flex-col">
      <button type="button" onClick={() => setShowDetail(true)} className="text-left">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={640}
          height={640}
          className="aspect-square w-full rounded-2xl object-cover"
        />
      </button>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <VegMark veg={isVeg} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowDetail(true)}
        className="mt-1 text-left text-[15px] leading-snug font-bold"
      >
        {item.name}
      </button>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="min-w-0">
          {item.mrp && (
            <div className="text-[13px] text-muted-foreground line-through">₹{item.mrp}</div>
          )}
          <div className="text-[15px] font-bold">₹{item.price}</div>
        </div>
        {qty === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className="h-11 w-[92px] rounded-lg border border-border bg-card text-[15px] font-bold text-brand-green"
          >
            ADD
          </button>
        ) : (
          <QtyStepper
            qty={qty}
            onAdd={handleAdd}
            onRemove={() => cart.removeItem(item.id.toString())}
          />
        )}
      </div>
      {hasVariants && (
        <div className="mt-1 text-[11px] text-muted-foreground">customisable</div>
      )}

      {showDetail && (
        <ItemDetailSheet
          item={item}
          onClose={() => setShowDetail(false)}
          onAdd={() => {
            if (hasVariants) {
              setShowVariants(true);
            } else {
              cart.add(item.id.toString());
            }
          }}
        />
      )}
      {showVariants && hasVariants && (
        <VariantSheet
          item={item}
          onClose={() => setShowVariants(false)}
          onAdded={() => setShowDetail(false)}
        />
      )}
    </div>
  );
}
