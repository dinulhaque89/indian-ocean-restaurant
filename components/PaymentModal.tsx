"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBasket } from './BasketContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { basket, total } = useBasket();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    promoCode: '',
    acceptTerms: false
  });
  
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isCardNumberValid = formData.cardNumber.replace(/\s/g, '').length === 16;
    const isExpiryValid = /^\d{2}\/\d{2}$/.test(formData.expiry);
    const isCvvValid = formData.cvv.length === 3;
    const areTermsAccepted = formData.acceptTerms;

    setIsValid(isCardNumberValid && isExpiryValid && isCvvValid && areTermsAccepted);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2');
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log('Processing payment...', formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Complete Your Payment</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
          {/* Payment Form */}
          <Card className="md:col-span-3">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">Security Code</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                  <Input
                    id="promoCode"
                    name="promoCode"
                    placeholder="Enter promo code"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I accept the terms and conditions
                  </Label>
                </div>
              </div>

              <Button 
                className="w-full h-14 text-lg font-medium"
                disabled={!isValid}
                variant={isValid ? "destructive" : "secondary"}
                onClick={handleSubmit}
              >
                Pay £{total.toFixed(2)}
              </Button>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {basket.map((item) => (
                  <div key={item.name} className="flex justify-between py-2">
                    <span className="text-sm">{item.quantity}x {item.name}</span>
                    <span className="text-sm font-medium">£{((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </ScrollArea>
              <Separator className="my-4" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;