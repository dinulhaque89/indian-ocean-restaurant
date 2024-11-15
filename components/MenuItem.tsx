"use client";

import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types/menuTypes';
import { useBasket } from './BasketContext';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface MenuItemProps extends MenuItemType {}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description, allergens, options, category }) => {
  const { addToBasket } = useBasket();
  const [isAdded, setIsAdded] = useState(false);

  const handleItemClick = () => {
    addToBasket({ name, price, description, allergens, category });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 500); // Reset after 500ms
  };

  return (
    <div className="border-b last:border-b-0 p-4 lg:p-5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-base lg:text-lg font-medium text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          <p className="font-bold mt-2">£{price?.toFixed(2)}</p>
          {allergens && allergens.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {allergens.map((allergen) => (
                <span key={allergen} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleItemClick}
          className="h-8 w-8 rounded-full shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;