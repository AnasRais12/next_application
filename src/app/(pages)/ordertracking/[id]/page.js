'use client'
import React, { useEffect, useState } from 'react'
import { useFetchTracking } from '@/customHooks/useFetchTracking'
import { useParams } from 'next/navigation'
import CustomSpinner from '@/components/Spinner'
import Map from '@/components/Map'
import { useRouter } from 'next/navigation'
function page() {
    const params = useParams()
    const router = useRouter()
    console.log(params, "--->>")
    const { shipingAddressLoading, trackingId } = useFetchTracking(params?.id)
    if (shipingAddressLoading) return <CustomSpinner />
    const Tracking = trackingId.reduce((acc, obj) => {
        console.log(acc, obj, "obj")
        return { ...acc, ...obj };
    }, {});

    console.log(trackingId, "___>>> kia hai ")

    return (
        <>
            {trackingId.length == 0 ? (
                <div className="text-center mt-20 text-gray-500 sm:text-xl text-md bg-white py-20 flex-col gap-3  flex justify-center items-center ">
                    You haven’t placed an order yet. Shop now and track your orders here!
                    <button
                        onClick={() => router.push('/home')}
                        className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                        Shop Now
                    </button>
                </div>


            ) : (
                <>
                    {Tracking?.tracking_status == "Delivered" ? (
                         <div className="text-center mt-20 text-gray-500 sm:text-xl text-md bg-white py-20 flex-col gap-3 flex justify-center items-center">
                         Your order has been successfully delivered. Thank you for shopping with us!
                         <button
                           onClick={() => router.push('/settings')}
                           className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                         >
                           View Orders
                         </button>
                       </div>
                       
                    ) : (
                        <div className="bg-gray-100 min-h-screen mt-20 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] ">
                            <h2 className="text-2xl font-semibold text-left border-b-2 pb-2 text-gray-800 mb-6">
                                Order Tracking
                            </h2>

                            <div className="space-y-4 custom:text-[16px] xs:text-[14px]  sm:text-[20px]">
                                {/* Order ID */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Order ID:</span>
                                    <span className="text-gray-800">#{Tracking?.order_id}</span>
                                </div>

                                {/* Tracking Number */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Tracking Number:</span>
                                    <span className="text-gray-800">{Tracking.tracking_number}</span>
                                </div>

                                {/* Order Status */}
                                <div className="flex   items-center justify-between">
                                    <span className="text-gray-700 font-medium">Order Status:</span>
                                    <span
                                        className={`font-semibold text-white rounded-full 
                            ${Tracking?.trackig_status === "Delivered"
                                                ? "text-green-500"
                                                : Tracking?.tracking_status === "Pending"
                                                    ? "text-yellow-500"
                                                    : "text-blue-500"
                                            }`}
                                    >
                                        {Tracking?.tracking_status}
                                    </span>
                                </div>
                                <div className='pt-6'>
                                    <Map heights={"h-[70vh"} lang={trackingId[0]?.latitude} long={trackingId[0]?.longitude} />
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </>


            )
            }

        </>
    )
}

export default page




// pages/order-tracking.js

// Static data for order



