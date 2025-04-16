import React, { useEffect, useState } from 'react';
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import { FaCreditCard } from 'react-icons/fa';
import { useFetchOrderlist } from '@/customHooks/useFetchOrderHisotry';
import { handleCardPayment, handleDelievery } from '@/helper/PaymentHelper';
import { MdLocalShipping } from 'react-icons/md';
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
import { RxCross2 } from 'react-icons/rx';
import { GoArrowLeft } from 'react-icons/go';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { ConvertPrice } from '@/helper/CurrenyConver';
import Link from 'next/link';

const OrderSummary = () => {
  const session = useSession();
  const { userDetails } = UserQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = getCart();
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardLoading, setcardLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryLoading, setdeliveryLoading] = useState(false);
  const [showingCardLoading, setShowingCardLoading] = useState(false); // ye isliyay banaya taakey jab mai payment karta hu to mujhe emply wali condition nazar aati hai ussey bachne ke liyay
  const [darkMode, setdark] = useState(false);
  const { rates, from, symbol,deliveryCharges } = GlobalDetails()
  // const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // const tax = subTotal * 0.08;
  const Total = subTotal + deliveryCharges;
  useEffect(() => {
    setSubTotal(calculateTotalproduct_price(cart));
  }, [cart]);

  return (
    <div className={``}>
  <div className=" mx-auto w-full  md:max-w-7xl px-2  lg:px-4">
    {cart?.length > 0 ? (
      <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${darkMode ? 'dark:bg-gray-700' : 'bg-white'}`}>
        <div className="p-6 sm:p-8">
          {/* Header with back button */}
          <div className="sm:flex-row flex flex-col-reverse gap-2 justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl font-bold text-[#1f2937] dark:text-white">
              Order Summary
            </h1>
            <div className="flex items-center">
              <Link
                href="/shoppingcart"
                className="hidden sm:flex items-center text-sm text-[#047857] hover:underline"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Cart
              </Link>
              <button
                onClick={() => router.push('/shoppingcart')}
                className="sm:hidden text-[#047857]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-lg transition-all ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="w-[70%] sm:w-fit flex flex-col gap-1 text-start">
                  <h3 className="font-medium text-[#1f2937] dark:text-white sm:text-base text-sm">
                    {item?.product_name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-[#1f2937] dark:text-white">
                  {symbol}: {ConvertPrice(item?.product_price, rates, from)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`p-4 rounded-lg mb-8 ${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="text-[#1f2937] dark:text-white">
                  {symbol}: {ConvertPrice(subTotal, rates, from)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="text-[#1f2937] dark:text-white">
                  {symbol}: {ConvertPrice(deliveryCharges, rates, from)}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-3 border-t border-gray-300 dark:border-gray-500">
                <span className="text-[#1f2937] dark:text-white">Total</span>
                <span className="text-[#047857] dark:text-[#047857]">
                  {symbol}: {ConvertPrice(Total, rates, from)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#1f2937] dark:text-white mb-6">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'Credit Card',
                  icon: FaCreditCard,
                  label: 'Credit Card',
                  color: paymentMethod === 'Credit Card' ? 'bg-[#047857] text-white' : `${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`
                },
                {
                  id: 'Cash on Delivery',
                  icon: MdLocalShipping,
                  label: 'Cash on Delivery',
                  color: paymentMethod === 'Cash on Delivery' ? 'bg-[#047857] text-white' : `${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`
                }
              ].map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 border ${paymentMethod === method.id ? 'border-[#047857]' : 'border-transparent hover:border-[#047857]'} ${method.color}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <method.icon className={`text-2xl mr-3 ${paymentMethod === method.id ? 'text-white' : 'text-[#047857]'}`} />
                  <span className={paymentMethod === method.id ? 'text-white' : 'text-[#1f2937] dark:text-white'}>
                    {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <div className="flex items-center justify-between">
            {paymentMethod === 'Credit Card' ? (
              <button
                onClick={() =>
                  handleCardPayment(
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
                    loadStripe,
                    setShowingCardLoading,
                    deliveryCharges
                  )
                }
                disabled={cardLoading}
                className={`px-6 py-3 w-full rounded-lg bg-[#047857] text-white font-semibold hover:bg-[#03644a] transition-colors ${cardLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {cardLoading ? <CSpinner /> : 'Place Order'}
              </button>
            ) : (
              <button
                onClick={() =>
                  handleDelievery(
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
                    Swal,
                    setShowingCardLoading
                  )
                }
                disabled={deliveryLoading}
                className={`px-6 py-3 w-full rounded-lg bg-[#047857] text-white font-semibold hover:bg-[#03644a] transition-colors ${deliveryLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {deliveryLoading ? <CSpinner /> : 'Place Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      <>
        {showingCardLoading && (
          <div className={`w-full flex-col gap-4 h-fit pt-20 flex justify-center items-center text-center ${darkMode ? 'dark:text-white' : ''}`}>
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-lg text-[#1f2937] dark:text-white">
              Your cart is empty! Add some items to your order before checking out.
            </p>
            <button
              onClick={() => router.push('/home')}
              className="mt-4 px-6 py-2 rounded-lg border-2 border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </>
    )}
  </div>
</div>
  );
};

export default OrderSummary;
