"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf, Beef, Flame } from "lucide-react";
import { FilterOptions, DietaryType, MeatType, SpiceLevelType } from "@/types/menuTypes";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: [] as DietaryType[],
    meatType: [] as MeatType[],
    spiceLevel: [] as SpiceLevelType[],
  });

  const handleFilterChange = (
    category: keyof FilterOptions,
    value: DietaryType | MeatType | SpiceLevelType
  ) => {
    const updatedFilters = { ...filters };
    
    switch(category) {
      case 'dietary':
        if (updatedFilters.dietary.includes(value as DietaryType)) {
          updatedFilters.dietary = updatedFilters.dietary.filter(item => item !== value);
        } else {
          updatedFilters.dietary = [...updatedFilters.dietary, value as DietaryType];
        }
        break;
      case 'meatType':
        if (updatedFilters.meatType.includes(value as MeatType)) {
          updatedFilters.meatType = updatedFilters.meatType.filter(item => item !== value);
        } else {
          updatedFilters.meatType = [...updatedFilters.meatType, value as MeatType];
        }
        break;
      case 'spiceLevel':
        if (updatedFilters.spiceLevel.includes(value as SpiceLevelType)) {
          updatedFilters.spiceLevel = updatedFilters.spiceLevel.filter(item => item !== value);
        } else {
          updatedFilters.spiceLevel = [...updatedFilters.spiceLevel, value as SpiceLevelType];
        }
        break;
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const dietaryOptions: DietaryType[] = ['Vegetarian', 'Vegan', 'Gluten-Free'];
  const meatTypeOptions: MeatType[] = ['Chicken', 'Lamb', 'Fish', 'Prawn'];
  const spiceLevelOptions: SpiceLevelType[] = ['Mild', 'Medium', 'Hot'];

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        {/* Dietary Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={filters.dietary.length > 0 ? "bg-green-100" : ""}
            >
              <Leaf className="mr-2 h-4 w-4" />
              Dietary
              {filters.dietary.length > 0 && (
                <span className="ml-2 bg-green-200 text-green-700 rounded-full px-2 py-0.5 text-xs">
                  {filters.dietary.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dietaryOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={filters.dietary.includes(option)}
                onCheckedChange={() => handleFilterChange('dietary', option)}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Meat Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={filters.meatType.length > 0 ? "bg-orange-100" : ""}
            >
              <Beef className="mr-2 h-4 w-4" />
              Meat
              {filters.meatType.length > 0 && (
                <span className="ml-2 bg-orange-200 text-orange-700 rounded-full px-2 py-0.5 text-xs">
                  {filters.meatType.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {meatTypeOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={filters.meatType.includes(option)}
                onCheckedChange={() => handleFilterChange('meatType', option)}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Spice Level Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className={filters.spiceLevel.length > 0 ? "bg-red-100" : ""}
            >
              <Flame className="mr-2 h-4 w-4" />
              Spice
              {filters.spiceLevel.length > 0 && (
                <span className="ml-2 bg-red-200 text-red-700 rounded-full px-2 py-0.5 text-xs">
                  {filters.spiceLevel.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {spiceLevelOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={filters.spiceLevel.includes(option)}
                onCheckedChange={() => handleFilterChange('spiceLevel', option)}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}