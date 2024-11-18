"use client";

import React from 'react';
import { useBasket } from './BasketContext';
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Plus, Minus, CreditCard, ShoppingBasket } from "lucide-react";

interface BasketProps {
  onPaymentClick?: () => void;
}

const Basket: React.FC<BasketProps> = ({ onPaymentClick }) => {
  const { basket, addToBasket, removeFromBasket, total } = useBasket();

  const groupedItems = basket.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof basket>);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Basket</h2>
          <ShoppingBasket className="w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {basket.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-lg">
            Your basket is empty
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-base font-semibold text-gray-600 mb-2">
                  {category}
                </h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div 
                      key={item.name} 
                      className="group flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-medium leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-md border border-input bg-background">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-r-none"
                            onClick={() => removeFromBasket(item.name)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="w-7 text-center text-sm font-medium">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-l-none"
                            onClick={() => addToBasket(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="w-16 text-right text-sm font-semibold">
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
          <CardFooter className="flex flex-col gap-4 pt-2">
            <div className="flex justify-between w-full">
              <div className="text-xl font-bold">Total</div>
              <div className="text-xl font-bold">£{total.toFixed(2)}</div>
            </div>
            <Button 
              className="w-full py-8 font-semibold text-xl bg-[linear-gradient(95.6deg,rgba(71,107,234,0.74)_-7.65%,#2854F3_-7.63%,rgba(71,107,234,0.74)_98.72%)] hover:opacity-90 transition-opacity shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[4px]"
              size="lg"
              onClick={onPaymentClick}
            >
              <CreditCard className="mr-3 h-7 w-7" />
              Pay Now
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default Basket;