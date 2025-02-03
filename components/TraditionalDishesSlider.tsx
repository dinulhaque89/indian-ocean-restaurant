"use client";

import React from 'react';
import { MenuItem, MenuItemOption } from '@/types/menuTypes';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface TraditionalDishesSliderProps {
  item: MenuItem;
  onOptionClick: (option: MenuItemOption, itemName: string) => void;
  addedItems: Record<string, boolean>;
}

export const TraditionalDishesSlider = ({ 
  item, 
  onOptionClick, 
  addedItems 
}: TraditionalDishesSliderProps) => {
  if (!item.options) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
      {item.description && (
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
      )}
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-2">
          {item.options.map((option, index) => (
            <div
              key={`${item.name}-${option.name}-${index}`}
              className={cn(
                "inline-block w-[280px] shrink-0",
                "bg-white shadow-sm rounded-lg p-4 transition-colors duration-100",
                "hover:shadow-md cursor-pointer",
                addedItems[`${option.name}-${item.name}`] ? 'bg-green-500/10' : 'hover:bg-gray-50'
              )}
              onClick={() => onOptionClick(option, item.name)}
            >
              <div className="flex flex-col h-full">
                <h4 className="text-lg font-semibold text-gray-900">
                  {option.name}
                </h4>
                <p className="text-base font-medium text-gray-900 mt-1">
                  £{option.price.toFixed(2)}
                </p>
                {option.allergens && option.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
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
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
};
