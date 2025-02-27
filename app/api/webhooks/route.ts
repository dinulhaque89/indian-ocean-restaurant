import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

// Replace this deprecated config:
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// With this new route segment config:
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getBodyAsString(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  
  const chunks: Uint8Array[] = [];
  let done = false;
  
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) chunks.push(value);
  }
  
  const allChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  let position = 0;
  for (const chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }
  
  return new TextDecoder('utf-8').decode(allChunks);
}

export async function POST(request: Request) {
  try {
    const body = await getBodyAsString(request);
    const signature = headers().get('stripe-signature') as string;
    
    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Handle specific events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment succeeded: ${paymentIntent.id}`);
        
        // Here you would:
        // 1. Create an order in your database
        // 2. Send confirmation email
        // 3. Update inventory, etc.
        
        // For now, we'll just log the success
        console.log('Order details:', paymentIntent.metadata);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment failed: ${failedPaymentIntent.id}`);
        break;
        
      // Add other event types as needed
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
} 