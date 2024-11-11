"use client";

import React from 'react';
import { useBasket } from './BasketContext';
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Plus, Minus, CreditCard, ShoppingBasket } from "lucide-react"; // Changed to ShoppingBasket
import PaymentModal from './PaymentModal';
import { useState } from 'react';

const Basket: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { basket, addToBasket, removeFromBasket, total } = useBasket();

  const handlePayment = () => {
    // TODO: Implement payment logic
    console.log('Processing payment...');
  };

  // Group items by category
  const groupedItems = basket.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof basket>);

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          
          <h2 className="text-2xl font-bold">Basket</h2>
          <ShoppingBasket className="w-8 h-8" />
        </div>
      </CardHeader>
      <CardContent>
        {basket.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-lg">
            Your basket is empty
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-3">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-base font-medium leading-none">{item.name}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromBasket(item.name)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToBasket(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="w-20 text-right font-bold text-primary">
                          £{((item.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {basket.length > 0 && (
  <>
    <Separator />
    <CardFooter className="flex flex-col gap-4 pt-6">
      <div className="flex justify-between w-full">
        <div className="text-2xl font-bold">Total</div>
        <div className="text-2xl font-bold">£{total.toFixed(2)}</div>
      </div>
      <Button 
        className="w-full py-8 font-semibold text-xl bg-[linear-gradient(95.6deg,rgba(71,107,234,0.74)_-7.65%,#2854F3_-7.63%,rgba(71,107,234,0.74)_98.72%)] hover:opacity-90 transition-opacity shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
        size="lg"
        onClick={() => setIsPaymentModalOpen(true)}
        >
        <CreditCard className="mr-3 h-7 w-7" />
        Pay Now
            </Button>
          
          </CardFooter>
          <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    
  </>
)}
    </Card>
  );
};

export default Basket;