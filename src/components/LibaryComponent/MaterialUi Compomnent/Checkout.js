import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import OrderSummary from '../FlowbiteComponent/OrderSummary';

const Checkout = ({userAddresssExist}) => {
  const createSession = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: "My Product",
        currency: "usd",
        amount: 2000, // in cents ($20.00)
      }),
    });
    console.log(res,"Response!!!!!!!!!!!!!!!!!!!!")
    const data = await res.json();
    console.log("Dataaaaaaaaaaaaaaaaaaaa is Jsonnnnnnnnnnnnnnnnnnnnnnnnnnn",data)
    // Load Stripe using public key from .env.local
    const stripe = await loadStripe("pk_test_51PbO7KDIVPFWPszsl0WywZz2UUN8bZAQnj4JxkUSJ8uaE0dNAZg8FZlc8OW12qE9yt1BbkMw4rmDoNJieZrkDI7c00uhBpEefc");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='mt-20' style={{ textAlign: 'center', padding: '2rem' }}>
      <OrderSummary createSession={createSession} userAddresssExist={userAddresssExist}/>
      
      <button onClick={createSession} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;