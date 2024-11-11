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
      className={`bg-white shadow-sm rounded-lg p-5 transition-colors duration-200 hover:shadow-md ${
        isAdded ? 'bg-green-50' : 'hover:bg-gray-50'
      }`}
      onClick={handleItemClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {price !== undefined && (
          <p className="text-base font-bold text-gray-900">£{price.toFixed(2)}</p>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}
      {allergens && allergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
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