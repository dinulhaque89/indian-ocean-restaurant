'use client';

import React, { useState } from 'react';
import MenuNavigation from './MenuNavigation';
import MenuItems from './MenuItems';
import Basket from './Basket';
import { SearchDialog } from './SearchDialog';
import { FilterBar } from './FilterBar';
import { MenuCategory, FilterOptions } from '../types/menuTypes';
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { menuCategories } from '@/data/menuData';

interface ClientMenuPageProps {
  currentCategory: MenuCategory | undefined;
}

export default function ClientMenuPage({ currentCategory }: ClientMenuPageProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: [],
    meatType: [],
    spiceLevel: [],
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)]">
      {/* Left sidebar - Menu Navigation */}
      <Card className="lg:w-1/5 p-4">
        <div className="mb-4 pt-4">
          <SearchDialog menuItems={menuCategories} />
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <MenuNavigation />
        </ScrollArea>
      </Card>

      {/* Main content - Menu Items */}
      <Card className="lg:w-1/2 p-4">
        <div className="flex flex-col gap-4">
          <FilterBar onFilterChange={handleFilterChange} />
          <ScrollArea className="h-[calc(100vh-14rem)]">
            {currentCategory ? (
              <MenuItems category={currentCategory} filters={filters} />
            ) : (
              <p className="text-muted-foreground">Category not found</p>
            )}
          </ScrollArea>
        </div>
      </Card>

      {/* Right sidebar - Basket */}
      <Card className="lg:w-1/3">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <Basket />
        </ScrollArea>
      </Card>
    </div>
  );
}