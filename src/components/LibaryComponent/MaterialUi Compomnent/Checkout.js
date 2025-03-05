import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import OrderSummary from '../FlowbiteComponent/OrderSummary';
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import UserRoleQuery from '@/DbQuery/RoleQuery';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { useFetchAddress } from '@/customHooks/useFetchAddress';
import useSession from '@/utils/UserExist/GetSession';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';

const Checkout = ({userAddresssExist}) => {
  const session = useSession()
 useFetchCartlist(session?.user?.id)
  const {userDetails} = UserRoleQuery()
    const {  userAddressInfo } = useFetchAddress(session?.user?.id)
 const {user} = GlobalDetails()
 const cart = getCart()



  console.log(cart,"Cart is here ")

const [stripeLoading,setStripeLoading] = useState(false)
  const createSession = async () => {

  try {
    setStripeLoading(true)
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart.map(item => ({
            product_name: item.product_name,
            amount: item.product_price,  // Price in cents
            quantity: item.quantity || 1, // Default quantity 1
          })),
          currency: "usd",
          payment_method: "card",
          shipping_address: userAddressInfo?.address || "Not provided",
        }),
      });
      const data = await res.json();
      // Load Stripe using public key from .env.local
      const stripe = await loadStripe("pk_test_51PbO7KDIVPFWPszsl0WywZz2UUN8bZAQnj4JxkUSJ8uaE0dNAZg8FZlc8OW12qE9yt1BbkMw4rmDoNJieZrkDI7c00uhBpEefc");
      stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
     console.log(error)
  }
  finally{
    setStripeLoading(false)
  }
};


  return (
    <>
   
    <div className='mt-28 sm:px-[3rem] px-3 mb-16 ' style={{ textAlign: 'center',  }} >
      
      <OrderSummary heading={'Payment Detail'} createSession={createSession} stripeLoading={stripeLoading}  userAddresssExist={userAddresssExist}/>
     
    </div>
    </>
  );
};

export default Checkout;