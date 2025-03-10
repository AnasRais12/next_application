import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import getRawBody from "raw-body";
const stripe = new Stripe('sk_test_51PbO7KDIVPFWPszsv2w8ELOstNQxHCAxistnKNGGqq5Kbd0tTgZRDhUD7B6dDYZK10ysgD76oW3X1X049KAPnDjT00ObGcQ5Xe');

export const config = {
  api: {
    bodyParser: false, // Stripe raw request handle karega
  },
};

export async function POST(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      const rawBody = await getRawBody(req); 
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    // ✅ Event Received
    console.log('🔔 Event Received:', event.type);
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // 🎯 Supabase Database Update Here
      const orderId = session.metadata.orderId;
     
      if (!orderId) return  NextResponse.json({ error: "Order ID not found"  }, { status: 400 });

      // 🟢 Supabase me Order Status Update
      const { error } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("order_id", orderId);
  
      if (error) return  NextResponse.json({ error: error.message }, { status: 400 });
  
      console.log(`✅ Order ${orderId} marked as completed`);
    }
  
    NextResponse.json({ received: true });
  }
