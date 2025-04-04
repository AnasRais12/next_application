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
    <div className={` `}>
      <div className=" sm:mx-auto ">
        {cart?.length > 0 ? (
          <div
            className={`   rounded-xl sm:border-t-2  sm:shadow-lg overflow-hidden transition-all duration-300`}
          >
            <div className="p-2 sm:p-6 md:p-8">
              <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-1 justify-between items-start w-full pr-6 ">
                <h1 className="text-2xl font-bold mb-6 text-left">
                  Order Summary
                </h1>
                 <Link
                href="/shoppingcart"
                   className="text-[25px] hover:text-[red] hidden sm:block"
              >
              
                  <RxCross2 />
                </Link>
                {/* ⬅️ Arrow icon (sm screens par dikhega) */}
                <button
                  onClick={() => router.push('/shoppingcart')}
                  className="text-[25px] hover:text-[red] block sm:hidden"
                >
                  <GoArrowLeft />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center shadow-md sm:p-4 p-3 ${darkMode ? 'bg-gray-700' : ''} rounded-lg`}
                  >
                    <div className=" sm:w-fit w-[70%]  flex justify-start flex-col gap-2 text-start items-start">
                      <h3 className="font-medium sm:text-[16px] text-[14px]  ">
                        {item?.product_name}
                      </h3>
                      <p className="text-sm text-left text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {/* ${item?.product_price.toFixed(2)} */}
                      <p> {symbol}: {ConvertPrice(item?.product_price
                    , rates, from)}    </p>
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`space-y-2 p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg mb-8`}
              >
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  {/* <span>${subTotal.toFixed(2)}</span> */}
                  <p> {symbol}: {ConvertPrice(subTotal
                    , rates, from)}    </p>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {/* <span>${deliveryCharges}</span> */}
                  <p> {symbol}: {ConvertPrice(deliveryCharges
                    , rates, from)}    </p>
                </div>
                {/* <div className="flex justify-between">
       <span>Tax</span>
       <span>${tax.toFixed(2)}</span>
     </div> */}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  {/* <span>${Total.toFixed(2)}</span> */}
                  <p> {symbol}: {ConvertPrice(Total, rates, from)}    </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl text-left font-semibold mb-6">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'Credit Card',
                      icon: FaCreditCard,
                      label: 'Credit Card',
                    },
                    {
                      id: 'Cash on Delivery',
                      icon: MdLocalShipping,
                      label: 'Cash on Delivery',
                    },
                  ].map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${paymentMethod === method.id
                          ? `${darkMode ? 'bg-orange-600' : 'bg-blue-50'} border-orange-500`
                          : `${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-transparent`
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
                    className={`px-6 py-3 w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors ${cardLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                    className={`px-6 py-3 w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors ${deliveryLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
              <div className="w-full flex-col gap-3 h-fit pt-20 flex justify-center items-center">
                <p>
                  Your cart is empty! Add some items to your order before
                  checking out.
                </p>
                <button
                  onClick={() => router.push('/home')}
                  className="py-3 px-6 border-unique border-2 text-unique"
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
