'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabase';
import {
  cartIncrement,
  cartDecrement,
  deleteCartItem,
} from '@/helper/cartHelpers';
import { toast } from 'react-toastify';
import useSession from '@/utils/UserExist/GetSession';
import { AddressForm } from './Addresses';
import { useRouter } from 'next/navigation';
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import { calculateTotalproduct_price } from '@/utils/CartCalculation';
import {
  IncrementQunatity,
  DecrementQuantity,
  RemoveFromCart,
} from '@/app/store/features/CartReducer/CartSlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CSpinner from '@/components/CSpinner';
import { ConvertPrice } from '@/helper/CurrenyConver';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import Link from 'next/link';
function Shopping_Cart({ deliveryCharges }) {
  const [RemoveCart, setRemoveCart] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [crossButtonLoading, setCrossButtonLoading] = useState({});
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const DeliveryCharges = isNaN(deliveryCharges) ? 100 : deliveryCharges;
  const cart = getCart();
  const Total = subTotal + DeliveryCharges;
  console.log(deliveryCharges,"Delivery Charges"); 
 const {rates,from,symbol} = GlobalDetails()
  useEffect(() => {
    setSubTotal(calculateTotalproduct_price(cart));
  }, [cart]);

  return (
    <>
      {cart?.length > 0 ? (
     <section className="bg-white mt-10 py-8 antialiased md:py-16">
     <div className="mx-auto w-full md:px-8 px-3">
     <h2 className="sm:text-3xl text-2xl font-bold text-[#1f2937] dark:text-white flex items-center">
        <svg className="w-8 h-8 mr-3 text-[#047857]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
      </h2>
   
       <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
         <div className="flex-none w-full lg:w-[60%]">
           {cart.map((item) => (
             <div key={item?.id} className="flex flex-col space-y-6">
               <div className="rounded-lg border hover:shadow-lg  border-gray-200 bg-white mb-4 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                 <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                   <a href="#" className="shrink-0 md:order-1">
                     <img
                       className="h-20 w-20 dark:hidden"
                       src={item?.product_image}
                       alt={item?.product_name}
                     />
                   </a>
   
                   <div className="flex items-center justify-between md:order-3 md:justify-end">
                     <div className="flex gap-3 items-center">
                       <button
                         onClick={() =>
                           cartDecrement(
                             item?.product_id,
                             cart,
                             dispatch,
                             supabase,
                             DecrementQuantity,
                             session?.user?.id
                           )
                         }
                         type="button"
                         className={`${
                           item.quantity <= 1
                             ? 'cursor-not-allowed hover:bg-gray-300 hover:text-black'
                             : 'cursor-pointer hover:text-white font-bold'
                         } flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-[#047857] transition duration-200 ease-in-out`}
                       >
                         <AiOutlineMinus />
                       </button>
                       <p className="text-[#1f2937] dark:text-white">{item?.quantity}</p>
                       <button
                         onClick={() =>
                           cartIncrement(
                             item?.product_id,
                             cart,
                             dispatch,
                             supabase,
                             IncrementQunatity,
                             session?.user?.id
                           )
                         }
                         type="button"
                         className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:text-white rounded-full hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-[#047857] transition duration-200 ease-in-out"
                       >
                         <AiOutlinePlus />
                       </button>
                     </div>
                     <div className="text-end md:order-4 md:w-32">
                       <p className="text-[18px] font-bold text-[#1f2937] dark:text-white">
                         {symbol}: {ConvertPrice(item?.product_price, rates, from)}
                       </p>
                     </div>
                   </div>
   
                   <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                     <a
                       href="#"
                       className="text-base font-normal text-[#1f2937] hover:underline dark:text-white"
                     >
                       {item?.product_name}
                     </a>
   
                     <div className="flex items-center gap-4">
                       <button
                         onClick={() => setRemoveCart(true)}
                         type="button"
                         className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                       >
                         <svg
                           className="me-1.5 h-5 w-5"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           fill="none"
                           viewBox="0 0 24 24"
                         >
                           <path
                             stroke="currentColor"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth="2"
                             d="M6 18 17.94 6M18 18 6.06 6"
                           />
                         </svg>
                         Remove
                       </button>
                     </div>
                     {RemoveCart && (
                       <div className="overflow-y-auto overflow-x-hidden fixed flex top-52 right-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                         <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                           <div className="relative p-4 text-center bg-gray-100 shadow-lg rounded-lg dark:bg-gray-800 sm:p-5">
                             <svg
                               className="text-red-600 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                               aria-hidden="true"
                               fill="currentColor"
                               viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg"
                             >
                               <path
                                 fillRule="evenodd"
                                 d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                 clipRule="evenodd"
                               ></path>
                             </svg>
                             <p className="mb-4 text-[#1f2937] dark:text-gray-300">
                               Are you sure you want to delete this item?
                             </p>
                             <div className="flex justify-center items-center space-x-4">
                               <button
                                 onClick={() => setRemoveCart(false)}
                                 className="py-2 border-gray-300 px-3 text-sm font-medium bg-gray-300 text-[#1f2937] rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                               >
                                 No, cancel
                               </button>
                               <button
                                 onClick={() =>
                                   deleteCartItem(
                                     item?.product_id,
                                     supabase,
                                     session,
                                     dispatch,
                                     RemoveFromCart,
                                     toast,
                                     setCrossButtonLoading,
                                     setRemoveCart
                                   )
                                 }
                                 className="py-2 px-3 text-sm font-medium text-center text-white bg-[#047857] rounded-lg hover:bg-[#03644a] focus:ring-4 focus:outline-none focus:ring-[#047857] dark:bg-[#047857] dark:hover:bg-[#03644a] dark:focus:ring-[#03644a]"
                               >
                                 {crossButtonLoading[item?.product_id] ? (
                                   <CSpinner />
                                 ) : (
                                   "Yes, I'm sure"
                                 )}
                               </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
   
         {/* Order Summary */}
         <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1f2937] mb-6 pb-2 border-b border-gray-200">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-[#1f2937]">
                    {symbol}: {ConvertPrice(subTotal, rates, from)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-[#1f2937]">
                    {symbol}: {ConvertPrice(DeliveryCharges, rates, from)}
                  </span>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between">
                  <span className="text-lg font-bold text-[#1f2937]">Total</span>
                  <span className="text-xl font-bold text-[#047857]">
                    {symbol}: {ConvertPrice(Total, rates, from)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#047857] hover:bg-[#03644a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#047857] transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center text-sm text-gray-500">
                or{' '}
                <Link href="/home" className="text-[#047857] hover:underline font-medium">
                  continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
       </div>
     </div>
   </section>
      ) : (
        <>
         <div className="w-full flex-col gap-3 h-screen flex justify-center items-center">
  <p>There are no items in this cart</p>
  <Link href="/home"
    className="py-3 px-6 bg-primary text-white rounded-md border-2 text-unique">
      Continue Shopping
  </Link>
</div>
        </>
      )}
    </>
  );
}

export default Shopping_Cart;
