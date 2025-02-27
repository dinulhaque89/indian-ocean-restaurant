"use client";

import { Dialog, DialogContent } from "./ui/dialog";
import { useBasket } from "./BasketContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Checkbox } from "./ui/checkbox";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { basket, total, clearBasket } = useBasket();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      toast({
        title: "Payment system not ready",
        description: "Please try again in a moment",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          items: basket,
          customerEmail: email,
          customerName: fullName,
          promoCode: promoCode || undefined
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment with the card element
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      });

      if (result.error) {
        toast({
          title: "Payment failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast({
            title: "Payment successful!",
            description: "Thank you for your order.",
          });
          setPaymentComplete(true);
          clearBasket();
          setTimeout(() => {
            onClose();
            setPaymentComplete(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Payment form */}
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Complete Your Payment</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {paymentComplete ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600">
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="w-full p-3 border border-gray-300 rounded-md">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter promo code"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions
                  </label>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!stripe || isProcessing || !fullName || !email}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay £${total.toFixed(2)}`
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right side - Order summary */}
          <div className="bg-gray-50 p-6 md:w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {basket.map((item) => (
                <div key={item.name} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>£{((item.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 font-bold flex justify-between">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;