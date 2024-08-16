// components/MenuItem.tsx
import React from 'react';
import { MenuItem as MenuItemType } from '../types/menuTypes';

interface MenuItemProps extends MenuItemType {
  options?: Array<{ name: string; price: number; allergens?: string[] }>;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description, allergens, options }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        {price !== undefined && <span className="font-bold">£{price.toFixed(2)}</span>}
      </div>
      {description && <p className="text-gray-600 text-sm mb-2">{description}</p>}
      {options && (
        <div className="mt-2">
          {options.map((option, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <span>{option.name}</span>
              <span className="font-bold">£{option.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
      {allergens && allergens.length > 0 && (
        <div className="flex space-x-2 mt-2">
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