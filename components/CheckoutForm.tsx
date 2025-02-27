"use client";

import { useState } from "react";
import { useBasket } from "./BasketContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const { basket, total } = useBasket();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);

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
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment with the card element
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
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
          onSuccess();
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
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-700">
            Card details
          </label>
          <div className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm">
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
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay £${total.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
} 