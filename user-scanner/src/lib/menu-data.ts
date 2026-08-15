export type Variant = { id: number | string; label?: string; name?: string; price: number };
export type VariantGroup = { title: string; subtitle: string; options: Variant[] }; // deprecated

export type MenuItem = {
  id: number | string;
  category_id?: number | string;
  name: string;
  price: number;
  mrp?: number;
  rating?: number;
  ratingCount?: number;
  veg?: boolean;
  type?: "veg" | "non-veg";
  bestseller?: boolean;
  image: string;
  customisable?: string;
  lockedOffer?: number;
  description?: string;
  variants?: Variant[];
};

export type Category = {
  id: number | string;
  name: string;
  code?: string;
  description?: string;
  image_path?: string | null;
  items: MenuItem[];
};