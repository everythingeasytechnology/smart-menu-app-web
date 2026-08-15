import { Outlet, useParams } from "react-router-dom";
import { useMenuData } from "@/lib/api";
import { CartProvider } from "@/lib/cart-context";
import { MenuItemSkeleton } from "@/components/MenuItemSkeleton";

export function TableLayout() {
  const { tableId } = useParams<{ tableId: string }>();
  const { data, isLoading, isError, error } = useMenuData(tableId!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-20 bg-background px-4 pt-3 pb-2">
          <div className="h-12 w-full rounded-2xl bg-muted animate-pulse"></div>
        </div>
        <div className="mt-4 px-4 pb-2">
           <div className="h-6 w-32 rounded bg-muted animate-pulse"></div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
           <MenuItemSkeleton key={i} />
        ))}
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

  return (
    <CartProvider menuItems={data.allItems}>
      <Outlet />
    </CartProvider>
  );
}
