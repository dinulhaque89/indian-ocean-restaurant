"use client";

import React from 'react';
import { 
  MenuCategory, 
  MenuItem as MenuItemType, 
  FilterOptions,
  DietaryType 
} from '@/types/menuTypes';import { useBasket } from '@/components/BasketContext';
import MenuItem from './MenuItem';


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
      // Filter the options based on current filters
      const filteredOptions = item.options.filter(option => matchesFilters(option));
      
      // Only render if there are matching options
      if (filteredOptions.length === 0) return null;

      return (
        <div key={item.name} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
          {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
          <div className="space-y-2">
            {filteredOptions.map((option, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                onClick={() => addToBasket({
                  name: `${item.name} - ${option.name}`,
                  price: option.price,
                  description: item.description,
                  allergens: option.allergens,
                  category: item.category
                })}
              >
                <span>{option.name}</span>
                <span className="font-bold">£{option.price.toFixed(2)}</span>
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
    <div className="w-full mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(renderMenuItem)}
      </div>
    </div>
  );
};
export default MenuItems;