import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe('sk_test_51PbO7KDIVPFWPszsv2w8ELOstNQxHCAxistnKNGGqq5Kbd0tTgZRDhUD7B6dDYZK10ysgD76oW3X1X049KAPnDjT00ObGcQ5Xe', { apiVersion: "2022-11-15" });

export async function POST(request) {
  try {
  
    // Extract Data from Request
    const { products, currency,  userEmail, } = await request.json();

    // Create Stripe Checkout Session
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: products.map(item => ({
        price_data: {
          currency,
          product_data: { name: item.product_name },
          unit_amount: item?.amount * 100,
        },
        quantity: item.quantity || 1,

      })),
      customer_email:userEmail,
      
      success_url: `http://localhost:3000/home`,
      cancel_url: `http://localhost:3000/checkout`,
    });

    // Return JSON response using NextResponse
    return NextResponse.json({ id: session.id }, { status: 200 });

  } catch (error) {
    console.error("Stripe Error:", error); 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
