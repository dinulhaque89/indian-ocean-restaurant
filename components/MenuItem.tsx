"use client";

import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types/menuTypes';
import { useBasket } from './BasketContext';

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
    <div 
      className={`bg-gray-100 p-4 rounded-lg mb-4 cursor-pointer transition-colors duration-200 ${
        isAdded ? 'bg-green-200' : 'hover:bg-gray-200'
      }`}
      onClick={handleItemClick}
    >
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      {price !== undefined && <p className="text-base font-bold mb-2">£{price.toFixed(2)}</p>}
      {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
      {allergens && allergens.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {allergens.map((allergen) => (
            <span key={allergen} className="text-xs bg-gray-200 px-2 py-1 rounded">
              {allergen}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;