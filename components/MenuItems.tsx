// components/MenuItems.tsx
import React from 'react';
import MenuItem from './MenuItem';
import { MenuCategory } from '../types/menuTypes';

interface MenuItemsProps {
  category: MenuCategory;
}

const MenuItems: React.FC<MenuItemsProps> = ({ category }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {category.items.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;