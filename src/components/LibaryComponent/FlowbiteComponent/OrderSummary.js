import React, { useEffect, useState } from 'react'
import { calculateTotalproduct_price } from '@/utils/CartCalculation';
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import CSpinner from '@/components/CSpinner';
import { FaCreditCard, FaTruck, FaWallet } from 'react-icons/fa6';


function OrderSummary({ proceedToCheckout, createSession, stripeLoading, heading }) {

  const cart = getCart()
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    setSubTotal(calculateTotalproduct_price(cart));
  }, [cart]);
  const Total = subTotal + 99


  const Pay = () => {
    if (!createSession) {
      proceedToCheckout()
    }
    else {
      createSession()
    }
  }

  console.log("cartITemssdads", cart)
  return (
    <div className="mx-auto mt-6 flex-1 space-y-6  lg:mt-0 lg:w-[50%]">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg  dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">{heading}</p>

        <div className="space-y-4 border-b-2 pb-2">

          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">SubTotal</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">{subTotal.toFixed(2)}</dd>
            </dl>

            {/* <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                        <dd className="text-base font-medium text-green-600">-$299.00</dd>
                      </dl> */}
            {paymentMethod === 'delivery' && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
              </dl>
            )}

            {/* <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                      </dl> */}
          </div>

          <dl className="flex items-center justify-between gap-4 border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">{Total.toFixed(2)}</dd>
          </dl>
        </div>

        {!createSession ?
          <button
            onClick={Pay} className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-unique focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Proceed to Checkout
          </button> :
          (
            <>
              <div className="flex flex-col gap-3">
                {/* Radio Buttons */}
                <div className="flex flex-wrap gap-4">
      {/* Pay with Card */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="card"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        <FaCreditCard className="h-5 w-5 text-green-500" />
        Pay with Card
      </label>

      {/* Choose Delivery */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="delivery"
          checked={paymentMethod === "delivery"}
          onChange={() => setPaymentMethod("delivery")}
        />
        <FaTruck className="h-5 w-5 text-blue-500" />
        Choose Delivery
      </label>

      {/* Pay with EasyPaisa */}
      {/* <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="easypaisa"
          checked={paymentMethod === "easypaisa"}
          onChange={() => setPaymentMethod("easypaisa")}
        />
        <FaWallet className="h-5 w-5 text-orange-500" />
        Pay with EasyPaisa
      </label> */}
    </div>

                {/* Payment Buttons - Sirf Selected Button Show Hoga */}
                {paymentMethod === "card" && (
                  <button onClick={createSession} className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                   {stripeLoading ? <CSpinner/>: 'Pay with Card'} 
                  </button>
                )}

                {paymentMethod === "delivery" && (
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    Choose Delivery
                  </button>
                )}

                {paymentMethod === "easypaisa" && (
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
                    Pay with EasyPaisa
                  </button>
                )}
              </div>
            </>
          )}
        {!createSession && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <p onClick={() => router.push('/home')} className=" cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </p>
          </div>
        )}

      </div>

      {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <htmlForm className="space-y-4">
                    <div>
                      <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                      <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                    </div>
                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                  </htmlForm>
                </div> */}
    </div>
  )
}

export default OrderSummary