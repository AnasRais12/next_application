import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import getRawBody from "raw-body";

const stripe = new Stripe("sk_test_51PbO7KDIVPFWPszsv2w8ELOstNQxHCAxistnKNGGqq5Kbd0tTgZRDhUD7B6dDYZK10ysgD76oW3X1X049KAPnDjT00ObGcQ5Xe", {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false, // ✅ Stripe ke raw request handle karne ke liye
  },
};

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const rawBody = await req.text() 
    event = stripe.webhooks.constructEvent(rawBody, sig, "whsec_H6IJW6nLXtYZOir8P00eHmFPShnpMc0P");
  } catch (error) {
    await logWebhookError("signature_verification_failed", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // ✅ Store Webhook Event in Database for Debugging
  await logWebhookEvent(event.type, event.data);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
        await logWebhookError("missing_order_id", "Order ID not found in session metadata");
        return NextResponse.json({ error: "Order ID not found" }, { status: 405 });
    }

    // ✅ Pehle Order Status Update Karo
    const { data: updateData, error: updateError } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("order_id", orderId)
        .select(); // ✅ Order ID aur Status le raha hai


    // ✅ Pehle yeh check karo ki orderId aur status properly aa raha hai
    console.log("Updated Order:", updateData);

    // ✅ Webhook Event ko Logs Table me Save Karo
    const { data: logData, error: logError } = await supabase
        .from("webhooks_logs")
        .insert([
            {
                order_id: orderId,  // ✅ Ensure order_id is included
                event_type: "checkout.session.completed",
                received_at: new Date().toISOString(),
                status: "completed",  // ✅ Ensure status is included
            }
        ])
        .select("*");

    if (logError) {
        await logWebhookError("webhook_log_failed", logError.message);
        return NextResponse.json({ error: "webhook_log_failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true, logs: logData });
}
}