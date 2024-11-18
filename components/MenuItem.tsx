"use client";

import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types/menuTypes';
import { useBasket } from './BasketContext';
import { MenuItemSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils"; 

interface MenuItemProps extends MenuItemType {}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description, allergens, options, category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addToBasket } = useBasket();
  const [isAdded, setIsAdded] = useState(false);
 
  React.useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <MenuItemSkeleton />;
  }
  const handleItemClick = () => {
    addToBasket({ name, price, description, allergens, category });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 500); // Reset after 500ms
  };

  return (
    <div 
      className={cn(
        "bg-white shadow-sm rounded-lg p-5 transition-colors duration-200 hover:shadow-md",
        "min-h-[120px] flex flex-col",
        isAdded ? 'bg-green-500/10' : 'hover:bg-gray-50'
      )}
      onClick={handleItemClick}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {price !== undefined && (
          <p className="text-base font-bold text-gray-900">£{price.toFixed(2)}</p>
        )}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">{description}</p>
        )}
        {allergens && allergens.length > 0 && (
          <div className="flex flex-nowrap gap-1 overflow-x-auto scrollbar-hide">
            {allergens.map((allergen) => (
              <span key={allergen} className="text-xs whitespace-nowrap bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                {allergen}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;