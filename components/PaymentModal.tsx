"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useBasket } from "./BasketContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { basket, total } = useBasket();
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    promoCode: '',
    acceptTerms: false
  });

  const isFormValid = formData.fullName &&
                     formData.cardNumber && 
                     formData.expiryDate && 
                     formData.securityCode && 
                     formData.acceptTerms;

  const onSubmit = async () => {
    if (!isFormValid) return;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[900px]",
        "w-[100vw] h-[100vh] sm:h-auto rounded-none sm:rounded-lg p-0",
        "sm:max-h-[85vh] overflow-y-auto"
      )}>
        <div className="flex flex-col sm:flex-row h-full sm:h-auto">
          {/* Payment Section */}
          <div className="flex-1 p-4 sm:p-6">
            <DialogHeader className="text-left mb-6">
              <DialogTitle>Complete Your Payment</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="h-12 sm:h-10 bg-[#F8F9FB]"
                  placeholder="John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="h-12 sm:h-10 bg-[#F8F9FB]"
                  placeholder="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="h-12 sm:h-10 bg-[#F8F9FB]"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="security">Security Code</Label>
                  <Input 
                    id="security"
                    value={formData.securityCode}
                    onChange={(e) => setFormData({...formData, securityCode: e.target.value})}
                    className="h-12 sm:h-10 bg-[#F8F9FB]"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promo">Promo Code (Optional)</Label>
                <Input 
                  id="promo"
                  value={formData.promoCode}
                  onChange={(e) => setFormData({...formData, promoCode: e.target.value})}
                  className="h-12 sm:h-10 bg-[#F8F9FB]"
                  placeholder="Enter promo code"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, acceptTerms: checked as boolean})}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I accept the terms and conditions
                  </Label>
                </div>

                <div className="hidden sm:block">
                  <Button 
                    onClick={onSubmit}
                    disabled={!isFormValid}
                    className="w-full h-10 bg-[#E54D2E] hover:bg-[#E54D2E]/90 text-white font-medium"
                  >
                    Pay £{total.toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="border-t sm:border-l sm:border-t-0 sm:w-[400px] bg-white">
            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                {basket.map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>£{((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Mobile-only payment button */}
            <div className="block sm:hidden p-4 border-t">
              <Button 
                onClick={onSubmit}
                disabled={!isFormValid}
                className="w-full h-12 bg-[#E54D2E] hover:bg-[#E54D2E]/90 text-white font-medium"
              >
                Pay £{total.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;