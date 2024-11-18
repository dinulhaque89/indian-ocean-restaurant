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
        "min-h-[180px] flex flex-col justify-between",
        isAdded ? 'bg-green-500/10' : 'hover:bg-gray-50'
      )}
      onClick={handleItemClick}
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {price !== undefined && (
            <p className="text-base font-bold text-gray-900">£{price.toFixed(2)}</p>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        )}
      </div>
      {allergens && allergens.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {allergens.map((allergen) => (
            <span key={allergen} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {allergen}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;