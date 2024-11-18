"use client";

import React, { useState } from 'react';
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
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    if (category.name === "Traditional Dishes") {
      if (item.options) {
        const filteredOptions = item.options.filter(option => matchesFilters(option));
        if (filteredOptions.length === 0) return null;
  
        return (
          <div key={item.name} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {filteredOptions.map((option, index) => (
                <div 
  key={`${item.name}-${option.name}-${index}`}
  className={cn(
    "bg-white shadow-sm rounded-lg p-4 transition-colors duration-100",
    "h-[115px] w-full flex flex-col hover:shadow-md cursor-pointer",
    addedItems[`${option.name}-${item.name}`] ? 'bg-green-500/10' : 'hover:bg-gray-50'
                  )}
                  onClick={() => {
                    if (isTransitioning) return;
                    
                    setIsTransitioning(true);
                    setAddedItems(prev => ({ ...prev, [`${option.name}-${item.name}`]: true }));
                    
                    addToBasket({
                      name: `${option.name} - ${item.name}`,
                      price: option.price,
                      description: item.description,
                      allergens: option.allergens,
                      category: item.category
                    });
                  
                    setTimeout(() => {
                      setAddedItems(prev => ({ ...prev, [`${option.name}-${item.name}`]: false }));
                      setIsTransitioning(false);
                    }, 300); // Reduced from 500ms to 300ms
                  }}
                >
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900">
                      {option.name}
  </h4>
  <p className="text-base font-semibold text-gray-900">
    £{option.price.toFixed(2)}
  </p>
  {option.allergens && option.allergens.length > 0 && (
    <div className="flex flex-wrap gap-1 mt-1">
      {option.allergens.map((allergen) => (
        <span 
          key={allergen}
          className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full"
        >
          {allergen}
        </span>
      ))}
    </div>
  )}
</div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    
    return <MenuItem key={item.name} {...item} />;
  };

  const filteredItems = filterItems(category.items);

  return (
    <div className="w-full mx-auto px-2 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{category.name}</h2>
      <div className={cn(
        category.name !== "Traditional Dishes" 
          ? "grid grid-cols-1 lg:grid-cols-2 gap-4" 
          : "space-y-6"
      )}>
        {filteredItems.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default MenuItems;