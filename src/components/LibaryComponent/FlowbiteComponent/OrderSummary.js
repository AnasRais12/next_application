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
import { useOrderTracking } from '@/DbQuery/OrderTracking';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CSpinner from '@/components/CSpinner';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
  const [darkMode, setdark] = useState(false);
  console.log('_________>.', cart);
  // const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 9.99;
  // const tax = subTotal * 0.08;
  const Total = subTotal + shipping;
  useEffect(() => {
    setSubTotal(calculateTotalproduct_price(cart));
  }, [cart]);

  return (
    <div className={`min-h-screen  text-gray-900`}>
      <div className=" sm:mx-auto ">
        {cart?.length > 0 ? (
          <div
            className={`   rounded-xl sm:border-t-2  sm:shadow-lg overflow-hidden transition-all duration-300`}
          >
            <div className="p-2 sm:p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6 text-left">
                Order Summary
              </h1>

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
                      ${item?.product_price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`space-y-2 p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg mb-8`}
              >
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
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        paymentMethod === method.id
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
                        loadStripe
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
                        Swal
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
          <div className="w-full flex-col gap-3 h-fit pt-20 flex justify-center items-center">
            <p>
              Your cart is empty! Add some items to your order before checking
              out.
            </p>
            <button
              onClick={() => router.push('/home')}
              className="py-3 px-6 border-unique border-2 text-unique"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
