// types/menuTypes.ts

export interface MenuItem {
  name: string;
  price?: number;
  description?: string;
  allergens?: string[];
  options?: Array<{ name: string; price: number; allergens?: string[] }>;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}