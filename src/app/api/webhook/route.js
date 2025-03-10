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
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // ✅ Event Received
    console.log('🔔 Event Received:', event.type);
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // 🎯 Supabase Database Update Here
      const orderId = session.metadata.orderId;
      if (!orderId) return res.status(400).json({ error: "Order ID not found" });

      // 🟢 Supabase me Order Status Update
      const { error } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("order_id", orderId);
  
      if (error) return res.status(400).json({ error: error.message });
  
      console.log(`✅ Order ${orderId} marked as completed`);
    }
  
    res.json({ received: true });
  }
