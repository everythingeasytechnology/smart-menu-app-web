import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./config";
import type { Category, MenuItem } from "./menu-data";

type CategoriesResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
};

type MenuResponse = {
  success: boolean;
  message: string;
  business: {
    id: number;
    name: string;
    business_name: string;
  };
  data: MenuItem[];
};

export type APICoupon = {
  id: number;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  minimum_order: number;
  maximum_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  per_user_limit: number | null;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
};

type CouponsResponse = {
  success: boolean;
  message: string;
  data: {
    coupons: APICoupon[];
  };
};

export function useCoupons(tableId: string) {
  return useQuery({
    queryKey: ["coupons", tableId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/coupons`);
      if (!res.ok) throw new Error("Failed to fetch coupons");
      const data = (await res.json()) as CouponsResponse;
      if (!data.success) throw new Error(data.message);
      return data.data.coupons;
    },
    staleTime: 0,
  });
}

export async function validateCouponApi(tableId: string, code: string, subtotal: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, subtotal }),
  });
  const data = await res.json();
  if (!data.success) {
    const errorMsg = data.errors?.coupon_code?.[0] || data.message || "Invalid coupon";
    throw new Error(errorMsg);
  }
  return {
    coupon: data.data.coupon as APICoupon,
    discount: data.data.discount as number,
  };
}

export function useMenuData(tableId: string) {
  return useQuery({
    queryKey: ["menuData", tableId],
    queryFn: async () => {
      const [catRes, menuRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/categories`),
        fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/menu`),
      ]);

      if (!catRes.ok || !menuRes.ok) {
        throw new Error("Failed to fetch menu data");
      }

      const catData = (await catRes.json()) as CategoriesResponse;
      const menuData = (await menuRes.json()) as MenuResponse;

      if (!catData.success || !menuData.success) {
        throw new Error(catData.message || menuData.message || "Error fetching data");
      }

      const categories = catData.data.categories;
      const items = menuData.data;

      // Map items into their respective categories
      const categoriesWithItems = categories.map((cat) => ({
        ...cat,
        items: items.filter((item) => item.category_id === cat.id),
      }));

      return { categories: categoriesWithItems, allItems: items, business: menuData.business };
    },
    staleTime: 0, // Fetch every time page is revisited
  });
}

export type OrderItemPayload = {
  menu_item_id: number;
  menu_item_variant_id?: number | null;
  variant_id?: number | null;
  quantity: number;
  special_instructions?: string;
};

export type OrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  payment_method: string;
  coupon_code?: string;
  items: OrderItemPayload[];
};

export async function placeOrderApi(tableId: string, payload: OrderPayload) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer/scanner/${tableId}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) {
    const errorMsg = data.message || "Failed to place order";
    throw new Error(errorMsg);
  }
  return data;
}
