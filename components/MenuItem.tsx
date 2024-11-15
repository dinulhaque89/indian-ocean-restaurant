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
    <div className="bg-white border-b last:border-b-0 p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          <div className="flex gap-2 mt-2">
            {allergens?.map((allergen) => (
              <span key={allergen} className="text-xs text-gray-500">
                {allergen}
              </span>
            ))}
          </div>
          <p className="font-bold mt-2">£{price?.toFixed(2)}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleItemClick}
          className="shrink-0"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;