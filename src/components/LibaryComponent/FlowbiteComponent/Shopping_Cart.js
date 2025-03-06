
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '@/lib/supabase'
import { cartIncrement, cartDecrement, deleteCartItem } from '@/helper/cartHelpers'
import { toast } from 'react-toastify'
import useSession from '@/utils/UserExist/GetSession'
import { AddressForm } from './Addresses'
import { useRouter } from 'next/navigation'
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import { calculateTotalproduct_price } from '@/utils/CartCalculation';
import { IncrementQunatity, DecrementQuantity, RemoveFromCart } from '@/app/store/features/CartReducer/CartSlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CSpinner from '@/components/CSpinner'
import OrderSummary from './OrderSummary'
function Shopping_Cart() {
  const [RemoveCart, setRemoveCart] = useState(false)
  const session = useSession()
  const router = useRouter()
  const [crossButtonLoading, setCrossButtonLoading] = useState({});
  const dispatch = useDispatch()
  const cart = getCart()
 
 
  const proceedToCheckout = () => {
    router.push('/checkout')
  }


  return (
    
    <>
      {cart?.length > 0 ? (
        <section className="bg-[white] mt-10 py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto w-full  md:px-8 px-3  ">
            <h2 className="xl:text-[2vw] lg:text-[2.1vw] text-[25px] sm:text-[30px] font-semibold text-gray-900 dark:text-white ">Shopping Cart</h2>

            <div className="mt-6 sm:mt-8  md:gap-6  lg:flex lg:items-start xl:gap-8">
              <div className=" flex-none w-full lg:w-[60%] ">
                {cart.map((item) => (
                  <div key={item?.id} className=" flex flex-col   space-y-6">

                    <div className="rounded-lg border bg-white border-gray-200 mb-4  p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img className="h-20 w-20 dark:hidden" src={item?.product_image} alt="imac image" />
                        </a>

                        <div className="flex  items-center justify-between md:order-3 md:justify-end">
                          <div className="flex gap-3 items-center">
                            <button
                              onClick={() => cartDecrement(item?.product_id, cart, dispatch, supabase, DecrementQuantity, session?.user?.id)}
                              type='button'
                               className={` ${item.quantity <= 1? 'cursor-not-allowed hover:bg-gray-300 hover:text-black' : 'cursor-pointer hover:text-white '} flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full hover:bg-orange-600  transition duration-200 ease-in-out`}
                            > 
                              <AiOutlineMinus />
                            </button>
                            <p>{item?.quantity}</p>
                            <button
                              onClick={() => cartIncrement(item?.product_id, cart, dispatch, supabase, IncrementQunatity, session?.user?.id)}
                              type="button"
                              className="flex items-center justify-center w-8 h-8 bg-gray-300 hover:text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-[18px] font-bold text-gray-900 dark:text-white">${item?.product_price || 0}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a href="#" className="text-base font-normal text-gray-900 hover:underline dark:text-white">{item?.product_name}</a>

                          <div className="flex items-center gap-4">


                            <button
                              onClick={() => setRemoveCart(true)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                              </svg>
                              Remove
                            </button>
                          </div>
                          {RemoveCart ? (
                            <div className="  overflow-y-auto overflow-x-hidden fixed flex   top-52 right-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative p-4 text-center bg-gray-100 shadow-lg rounded-lg  dark:bg-gray-800 sm:p-5">

                                  <svg className="text-[red] dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                  <p className="mb-4  dark:text-gray-300">Are you sure you want to delete this item?</p>
                                  <div className="flex justify-center items-center space-x-4">
                                    <button onClick={() => setRemoveCart(false)} className="py-2 border-[#ccc]  px-3 text-sm font-medium  bg-gray-300 text-black rounded-lg    focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                      No cancel
                                    </button>
                                    <button onClick={() => deleteCartItem(item?.product_id, supabase, session, dispatch, RemoveFromCart, toast, setCrossButtonLoading, setRemoveCart)} className="py-2 px-3 text-sm font-medium text-center text-black bg-gray-300 rounded-lg hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                      {crossButtonLoading[item?.product_id] ? <CSpinner /> : 'Yes I`m sure'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : ''}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}


              </div>
                         {/* Order Summary!  */}
                   <OrderSummary heading={'Order Summary'} proceedToCheckout={proceedToCheckout}/>
              {/* <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">SubTotal</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">{subTotal.toFixed(2)}</dd>
                      </dl>

                     

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                      </dl>

                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">{Total.toFixed(2)}</dd>
                    </dl>
                  </div>

                  <button
                    onClick={proceedToCheckout} className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-unique focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                   Proceed to Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <p onClick={() => router.push('/home')} className=" cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Continue Shopping
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      ) : (
        <>

          <div className='w-full flex-col gap-3 h-screen flex justify-center items-center'>
            <p>There are no items in this cart</p>
            <button onClick={() => router.push('/home')} className='py-3 px-6 border-unique border-2 text-unique'>Continue Shopping</button>

          </div>
        </>
      )}

    </>
  )
}


export default Shopping_Cart