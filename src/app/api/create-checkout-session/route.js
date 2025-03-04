import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe('sk_test_51PbO7KDIVPFWPszsv2w8ELOstNQxHCAxistnKNGGqq5Kbd0tTgZRDhUD7B6dDYZK10ysgD76oW3X1X049KAPnDjT00ObGcQ5Xe', { apiVersion: "2022-11-15" });

export async function POST(request) {
  try {
    const { product_name, currency, amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: product_name },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Return JSON response using NextResponse
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}