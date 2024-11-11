// Type definitions
export type DietaryType = 'Vegetarian' | 'Vegan' | 'Gluten-Free';
export type MeatType = 'Chicken' | 'Lamb' | 'Fish' | 'Prawn' | 'Vegetarian';
export type SpiceLevelType = 'Mild' | 'Medium' | 'Hot';

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

// Base interface with common properties except price
interface BaseItem {
  name: string;
  description?: string;
  allergens?: string[];
  spiceLevel?: SpiceLevelType;
  dietary?: DietaryType[];
  meatType?: MeatType;
}

// MenuItem interface for regular menu items and items with options
export interface MenuItem extends BaseItem {
  category: string;
  price?: number;  // Optional for items with options
  options?: MenuItemOption[];
}

// MenuItemOption interface for option items (must have price)
export interface MenuItemOption extends BaseItem {
  price: number;  // Required for options
}

export interface FilterOptions {
  dietary: DietaryType[];
  meatType: MeatType[];
  spiceLevel: SpiceLevelType[];
}