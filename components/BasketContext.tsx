"use client";

import * as React from 'react';
import { MenuItem } from '../types/menuTypes';

interface BasketItem extends MenuItem {
  quantity: number;
}

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (item: MenuItem) => void;
  removeFromBasket: (itemName: string) => void;
  total: number;
}

const BasketContext = React.createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const context = React.useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basket, setBasket] = React.useState<BasketItem[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  }, [basket, isLoaded]);

  const addToBasket = (item: MenuItem) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((basketItem) => basketItem.name === item.name);
      if (existingItem) {
        return prevBasket.map((basketItem) =>
          basketItem.name === item.name
            ? { ...basketItem, quantity: basketItem.quantity + 1 }
            : basketItem
        );
      }
      return [...prevBasket, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (itemName: string) => {
    setBasket((prevBasket) =>
      prevBasket.reduce((acc, item) => {
        if (item.name === itemName) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as BasketItem[])
    );
  };

  const total = basket.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, total }}>
      {children}
    </BasketContext.Provider>
  );
};