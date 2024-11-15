'use client';

import React, { useState, useEffect } from 'react';
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
  const [showFixedButton, setShowFixedButton] = useState(true);
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

  useEffect(() => {
    const handleScroll = () => {
      const basketElement = document.getElementById('basket-section');
      if (basketElement) {
        const rect = basketElement.getBoundingClientRect();
        const isBasketVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setShowFixedButton(!isBasketVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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

      {/* Scrollable Content Area */}
      <div className="flex-1 px-4 pb-24">
          <FilterBar onFilterChange={handleFilterChange} />
          {currentCategory ? (
            <MenuItems category={currentCategory} filters={filters} />
          ) : (
            <p className="text-muted-foreground">Category not found</p>
          )}
          
          {/* Basket section with ID for scroll detection */}
          <div id="basket-section" className="mt-8 mb-20">
            <Basket onPaymentClick={() => setIsPaymentModalOpen(true)} />
          </div>
        </div>

        {/* Fixed Basket Summary - conditionally rendered */}
        {showFixedButton && basket.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <Button 
              className="w-full bg-primary text-primary-foreground"
              size="lg"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Total ({basket.length}) - £{total.toFixed(2)}
            </Button>
          </div>
        )}

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
          <Basket onPaymentClick={() => setIsPaymentModalOpen(true)} />
        </Card>
      </div>
    </>
  );
}