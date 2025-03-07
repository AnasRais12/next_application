// import React, { useEffect, useState } from 'react'
// import { calculateTotalproduct_price } from '@/utils/CartCalculation';
// import { loadStripe } from '@stripe/stripe-js';
// import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
// import { supabase } from '@/lib/supabase';
// import { handleCardPayment,handleDelievery } from '@/helper/PaymentHelper';
// import useSession from '@/utils/UserExist/GetSession';
// import { useDispatch } from 'react-redux';
// import { RemoveAllFromCart } from '@/app/store/features/CartReducer/CartSlice';
// import { deleteAllCartItem } from '@/helper/cartHelpers';
// import UserQuery from '@/DbQuery/UserDetailQuery';
// import CSpinner from '@/components/CSpinner';
// import { useRouter } from 'next/navigation';
// import { FaCreditCard, FaTruck, FaWallet } from 'react-icons/fa6';
// import Swal from 'sweetalert2';

// function OrderSummary({ proceedToCheckout, heading }) {
//   const { userDetails } = UserQuery()
//   const dispatch = useDispatch()
//   const router = useRouter()
//   const cart = getCart()
//   const session = useSession()
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardLoading, setcardLoading] = useState(false);
//   const [subTotal, setSubTotal] = useState(0);
//   const [deliveryLoading, setdeliveryLoading] = useState(false);

//   useEffect(() => {
//   setSubTotal(calculateTotalproduct_price(cart));
//   }, [cart]);
//   const Total = subTotal + 99

//   return (
//     <div className="mx-auto mt-6 flex-1 space-y-6  lg:mt-0 lg:w-[50%]">
//       <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg  dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//         <p className="text-xl font-semibold text-gray-900 dark:text-white">{heading}</p>

//         <div className="space-y-4 border-b-2 pb-2">

//           <div className="space-y-2">
//             <dl className="flex items-center justify-between gap-4">
//               <dt className="text-base font-normal text-gray-500 dark:text-gray-400">SubTotal</dt>
//               <dd className="text-base font-medium text-gray-900 dark:text-white">{subTotal.toFixed(2)}</dd>
//             </dl>

//             {/* <dl className="flex items-center justify-between gap-4">
//                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
//                         <dd className="text-base font-medium text-green-600">-$299.00</dd>
//                       </dl> */}
//             {paymentMethod === 'delivery' && (
//               <dl className="flex items-center justify-between gap-4">
//                 <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
//                 <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
//               </dl>
//             )}

//             {/* <dl className="flex items-center justify-between gap-4">
//                         <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
//                         <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
//                       </dl> */}
//           </div>

//           <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2 dark:border-gray-700">
//             <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
//             <dd className="text-base font-bold text-gray-900 dark:text-white">{Total.toFixed(2)}</dd>
//           </dl>
//         </div>

//         {heading !== 'Payment Detail' ?
//           <button
//             onClick={proceedToCheckout} className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-unique focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
//             Proceed to Checkout
//           </button>

//           :
//           (
//             <>
//               <div className="flex flex-col gap-3">
//                 {/* Radio Buttons */}
//                 <div className="flex flex-wrap gap-4">
//                   {/* Pay with Card */}
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="card"
//                       checked={paymentMethod === "card"}
//                       onChange={() => setPaymentMethod("card")}
//                     />
//                     <FaCreditCard className="h-5 w-5 text-orange-500 " />
//                     Pay with Card
//                   </label>

//                   {/* Choose Delivery */}
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value="delivery"
//                       checked={paymentMethod === "delivery"}
//                       onChange={() => setPaymentMethod("delivery")}
//                     />
//                     <FaTruck className="h-5 w-5 text-orange-500" />
//                     Choose Delivery
//                   </label>
//                 </div>

//                 {/* Payment Buttons - Sirf Selected Button Show Hoga */}
//                 {paymentMethod === "card" && (
//                   <button onClick={() => handleCardPayment(
//                     supabase,
//                     session,
//                     cart,
//                     paymentMethod,
//                     userDetails,
//                     deleteAllCartItem,
//                     RemoveAllFromCart,
//                     dispatch,
//                     setcardLoading,
//                     Swal,
//                     loadStripe
//                   )} className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
//                     {cardLoading ? <CSpinner /> : 'Place Order '}
//                   </button>
//                 )}

//                 {paymentMethod === "delivery" && (
//                   <button onClick={()=> handleDelievery(
//                     supabase,
//                     session,
//                     cart,
//                     paymentMethod,
//                     userDetails,
//                     deleteAllCartItem,
//                     RemoveAllFromCart,
//                     dispatch,
//                     setdeliveryLoading,
//                     router,
//                     Swal

//                   )} className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
//                     {deliveryLoading ? <CSpinner /> : 'Place Order'}

//                   </button>
//                 )}


//               </div>
//             </>
//           )}
//         {heading !== 'Payment Detail' && (
//           <div className="flex items-center justify-center gap-2">
//             <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
//             <p onClick={() => router.push('/home')} className=" cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
//               Continue Shopping
//               <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
//               </svg>
//             </p>
//           </div>
//         )}

//       </div>

//       {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//                   <htmlForm className="space-y-4">
//                     <div>
//                       <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
//                       <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
//                     </div>
//                     <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
//                   </htmlForm>
//                 </div> */}
//     </div>
//   )
// }

// export default OrderSummary

import React, { useEffect, useState } from 'react'
import { getCart } from "@/utils/reduxGlobalStates/ReduxStates";
import { FaCreditCard } from "react-icons/fa";
import { useFetchOrderlist } from '@/customHooks/useFetchOrderHisotry';
import { handleCardPayment, handleDelievery } from '@/helper/PaymentHelper';
import { MdLocalShipping } from "react-icons/md";
import { calculateTotalproduct_price } from '@/utils/CartCalculation';
import { loadStripe } from '@stripe/stripe-js';

import { supabase } from '@/lib/supabase';
import useSession from '@/utils/UserExist/GetSession';
import { useDispatch } from 'react-redux';
import { RemoveAllFromCart } from '@/app/store/features/CartReducer/CartSlice';
import { deleteAllCartItem } from '@/helper/cartHelpers';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CSpinner from '@/components/CSpinner';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const OrderSummary = () => {
  const session = useSession()
  const { userDetails } = UserQuery()
  const dispatch = useDispatch()
  const router = useRouter()
  const cart = getCart()
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const [cardLoading, setcardLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryLoading, setdeliveryLoading] = useState(false);
  const [darkMode, setdark] = useState(false);
  console.log("_________>.", cart)

  // const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 9.99;
  // const tax = subTotal * 0.08;
  const Total = subTotal + shipping
  useEffect(() => {
    setSubTotal(calculateTotalproduct_price(cart));
  }, [cart]);

  console.log('OrderHisotry',OrderHisotry)

  return (
    <div className={`min-h-screen  text-gray-900`}>
      <div className="container mx-auto ">
{cart?.length > 0 ? (
 <div className={` bg-white  rounded-xl sm:border-t-2  sm:shadow-lg overflow-hidden transition-all duration-300`}>
 <div className="p-2 sm:p-6 md:p-8">
   <h1 className="text-2xl font-bold mb-6 text-left">Order Summary</h1>

   <div className="space-y-4 mb-8">
     {cart.map((item, index) => (
       <div key={index} className={`flex justify-between items-center shadow-md sm:p-4 p-3 ${darkMode ? "bg-gray-700" : ""} rounded-lg`}>
         <div className=" sm:w-fit w-[70%]  flex justify-start flex-col gap-2 text-start items-start">
           <h3 className="font-medium sm:text-[16px] text-[14px]  ">{item?.product_name}</h3>
           <p className="text-sm text-left text-gray-500">Quantity: {item.quantity}</p>
         </div>
         <p className="font-semibold">${item?.product_price.toFixed(2)}</p>
       </div>
     ))}
   </div>

   <div className={`space-y-2 p-4 ${darkMode ? "bg-gray-700" : "bg-white"} rounded-lg mb-8`}>
     <div className="flex justify-between">
       <span>Subtotal</span>
       <span>${subTotal.toFixed(2)}</span>
     </div>
     <div className="flex justify-between">
       <span>Shipping</span>
       <span>${shipping.toFixed(2)}</span>
     </div>
     {/* <div className="flex justify-between">
       <span>Tax</span>
       <span>${tax.toFixed(2)}</span>
     </div> */}
     <div className="flex justify-between font-bold pt-2 border-t">
       <span>Total</span>
       <span>${Total.toFixed(2)}</span>
     </div>
   </div>

   <div className="mb-8">
     <h2 className="text-xl text-left font-semibold mb-6">Payment Method</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {[
         { id: "Credit Card", icon: FaCreditCard, label: "Credit Card" },
         { id: "Cash on Delivery", icon: MdLocalShipping, label: "Cash on Delivery" }
       ].map((method) => (
         <div
           key={method.id}
           className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${paymentMethod === method.id
             ? `${darkMode ? "bg-orange-600" : "bg-blue-50"} border-orange-500`
             : `${darkMode ? "bg-gray-700" : "bg-gray-50"} border-transparent`
             } border-2 hover:border-orange-500`}
           onClick={() => setPaymentMethod(method.id)}
         >
           <method.icon className="text-2xl mr-3" />
           <span>{method.label}</span>
         </div>
       ))}
     </div>
   </div>

   <div className="flex items-center justify-between">
     {paymentMethod === 'Credit Card' ? (
       <button onClick={() => handleCardPayment(
         supabase,
         session,
         cart,
         paymentMethod,
         userDetails,
         deleteAllCartItem,
         RemoveAllFromCart,
         dispatch,
         setcardLoading,
         Swal,
         loadStripe)}
         disabled={cardLoading}
         className={`px-6 py-3 w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
       >
         {cardLoading
           ? <CSpinner /> : 'Place Order'}
       </button>
     ) : (
       <button onClick={() => handleDelievery(
         supabase,
         session,
         cart,
         paymentMethod,
         userDetails,
         deleteAllCartItem,
         RemoveAllFromCart,
         dispatch,
         setdeliveryLoading,
         router,
         Swal

       )}
         disabled={deliveryLoading}
         className={`px-6 py-3 w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
       >
         {deliveryLoading ? <CSpinner /> : 'Place Order'}
       </button>
     )}

     {/* <button
onClick={handleClick}
className="relative flex items-center justify-center w-48 h-12 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden"
>
{loading ? (
<motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
 className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"
/>
) : success ? (
<motion.div
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ type: 'spring', stiffness: 300 }}
>
 <CiCircleCheck className="w-6 h-6 text-white" />
</motion.div>
) : (
'Pay Now'
)}
</button> */}
   </div>
 </div>
</div>
) : (

  <div className='w-full flex-col gap-3 h-fit pt-20 flex justify-center items-center'>
  <p>Your cart is empty! Add some items to your order before checking out.</p>
  <button onClick={() => router.push('/home')} className='py-3 px-6 border-unique border-2 text-unique'>Start Shopping</button>

</div>
)}
       
      </div>
    </div>
  );
};

export default OrderSummary;