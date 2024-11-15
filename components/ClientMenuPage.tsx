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
import { Button } from './ui/button';
import { useBasket } from './BasketContext';
import PaymentModal from './PaymentModal';

interface ClientMenuPageProps {
  currentCategory: MenuCategory | undefined;
}

export default function ClientMenuPage({ currentCategory }: ClientMenuPageProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: [],
    meatType: [],
    spiceLevel: [],
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { basket, total } = useBasket();

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Fixed Navigation */}
        <div className="sticky top-0 z-50 bg-white border-b">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex p-4 gap-2 min-w-max">
              <MenuNavigation />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-4 pb-32">
          <FilterBar onFilterChange={handleFilterChange} />
          {currentCategory ? (
            <MenuItems category={currentCategory} filters={filters} />
          ) : (
            <p className="text-muted-foreground">Category not found</p>
          )}
        </div>

        {/* Fixed Basket Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <Button 
            className="w-full bg-primary text-primary-foreground"
            size="lg"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Total ({basket.length}) - £{total.toFixed(2)}
          </Button>
        </div>

        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>

      {/* Desktop View - Unchanged */}
      <div className="hidden lg:flex gap-6 p-6 min-h-[calc(100vh-4rem)]">
        <Card className="w-1/5 p-4">
          <div className="mb-4">
            <SearchDialog menuItems={menuCategories} />
          </div>
          <MenuNavigation />
        </Card>

        <Card className="w-1/2 p-4">
          <FilterBar onFilterChange={handleFilterChange} />
          <div className="mt-4">
            {currentCategory ? (
              <MenuItems category={currentCategory} filters={filters} />
            ) : (
              <p className="text-muted-foreground">Category not found</p>
            )}
          </div>
        </Card>

        <Card className="w-1/3">
          <Basket />
        </Card>
      </div>
    </>
  );
}