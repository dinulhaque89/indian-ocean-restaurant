"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

// Load Stripe outside of component render to avoid recreating the Stripe object
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function StripeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
} 