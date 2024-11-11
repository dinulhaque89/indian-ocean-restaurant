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

  const renderMenuItem = (item: MenuItemType) => {
    if (item.options) {
      return (
        <div key={item.name} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
          {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
          <div className="space-y-2">
            {item.options.map((option, index) => (
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
    } else {
      return <MenuItem key={item.name} {...item} />;
    }
  };

  const filterItems = (items: MenuItemType[]) => {
    return items.filter(item => {
      // If item has options, check if any option matches the filters
      if (item.options) {
        return item.options.some(option => {
          const matchesDietary = filters.dietary.length === 0 || 
            (option.dietary && filters.dietary.some(diet => option.dietary?.includes(diet)));
  
          const matchesMeatType = filters.meatType.length === 0 ||
            (option.meatType && filters.meatType.includes(option.meatType));
  
          const matchesSpiceLevel = filters.spiceLevel.length === 0 ||
            (option.spiceLevel && filters.spiceLevel.includes(option.spiceLevel));
  
          return matchesDietary && matchesMeatType && matchesSpiceLevel;
        });
      }
  
      // For regular items without options
      const matchesDietary = filters.dietary.length === 0 || 
        (item.dietary && filters.dietary.some(diet => item.dietary?.includes(diet)));
  
      const matchesMeatType = filters.meatType.length === 0 ||
        (item.meatType && filters.meatType.includes(item.meatType));
  
      const matchesSpiceLevel = filters.spiceLevel.length === 0 ||
        (item.spiceLevel && filters.spiceLevel.includes(item.spiceLevel));
  
      return matchesDietary && matchesMeatType && matchesSpiceLevel;
    });
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