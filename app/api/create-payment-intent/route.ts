import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, items, customerEmail } = body;
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'gbp',
      // Save order details in the metadata
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))),
        customerEmail
      },
      receipt_email: customerEmail,
    });

    // Return the client secret to the client
    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
} 