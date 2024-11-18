"use client";

import React from 'react';
import { 
  MenuCategory, 
  MenuItem as MenuItemType, 
  FilterOptions,
  DietaryType,
  MenuItemOption
} from '@/types/menuTypes';
import { useBasket } from '@/components/BasketContext';
import MenuItem from './MenuItem';
import { cn } from '@/lib/utils';


interface MenuItemsProps {
  category: MenuCategory;
  filters: FilterOptions;
}

const MenuItems: React.FC<MenuItemsProps> = ({ category, filters }) => {
  const { addToBasket } = useBasket();

  const matchesFilters = (item: MenuItemType | MenuItemOption) => {
    const matchesDietary = filters.dietary.length === 0 || 
      (item.dietary && filters.dietary.some(diet => item.dietary?.includes(diet)));

    const matchesMeatType = filters.meatType.length === 0 ||
      (item.meatType && filters.meatType.includes(item.meatType));

    const matchesSpiceLevel = filters.spiceLevel.length === 0 ||
      (item.spiceLevel && filters.spiceLevel.includes(item.spiceLevel));

    return matchesDietary && matchesMeatType && matchesSpiceLevel;
  };

  const filterItems = (items: MenuItemType[]) => {
    return items.filter(item => {
      // For items with options
      if (item.options) {
        // Show the item if any of its options match the filters
        return item.options.some(option => matchesFilters(option));
      }
      
      // For regular items
      return matchesFilters(item);
    });
  };

  const renderMenuItem = (item: MenuItemType) => {
    if (item.options) {
      const filteredOptions = item.options.filter(option => matchesFilters(option));
      
      if (filteredOptions.length === 0) return null;
  
      return (
        <div key={item.name} className="bg-white shadow-sm rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          )}
          <div className="space-y-3">
            {filteredOptions.map((option, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-100"
                onClick={() => addToBasket({
                  name: `${item.name} - ${option.name}`,
                  price: option.price,
                  description: item.description,
                  allergens: option.allergens,
                  category: item.category
                })}
              >
                <span className="text-gray-900">{option.name}</span>
                <span className="font-bold text-gray-900">£{option.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return <MenuItem key={item.name} {...item} />;
  };

  const filteredItems = filterItems(category.items);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
    <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.name}</h2>
    <div className={cn(
      "grid gap-6",
      "grid-cols-1 md:grid-cols-1",
      category.name === "Traditional Dishes" 
        ? "lg:grid-cols-1" 
        : "lg:grid-cols-2"
    )}>
      {filteredItems.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default MenuItems;