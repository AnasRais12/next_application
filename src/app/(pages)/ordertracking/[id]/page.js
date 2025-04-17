'use client';
import React, { useEffect, useState } from 'react';
import { useFetchTracking } from '@/customHooks/useFetchTracking';
import { useParams } from 'next/navigation';
import { useOrderTracking } from '@/DbQuery/OrderTracking';
import CustomSpinner from '@/components/Spinner';
import { supabase } from '@/lib/supabase';
import Map from '@/components/Map';
import { useRouter } from 'next/navigation';
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
import Navbar from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import Link from 'next/link';
function page() {
  const params = useParams();
  const router = useRouter();
  const { shipingAddressLoading, trackingId } = useFetchTracking(params?.id);
  const [distance, setDistance] = useState();
  const initialTrackingTime = trackingId?.[0]?.tracking_time ?? null;
  const [trackingTime, setTrackingTime] = useState(initialTrackingTime);
    const session = useSession();
                  useFetchWishlist(session?.user?.id);
                  useFetchCartlist(session?.user?.id);
                  const { cartListLoading } = useFetchCartlist(session?.user?.id);
                  const { wishListLoading } = useFetchWishlist(session?.user?.id);
                
              
  

  useEffect(() => {
    if (initialTrackingTime === 0) {
      return;
    }

    // ✅ Realtime Subscription
    const channel = supabase
      .channel('tracking_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'order_tracking' },
        (payload) => {
          console.log('Realtime Update:', payload);
          setTrackingTime((prev) => ({
            ...prev,
            [payload.new.order_id]: payload.new.tracking_time,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [trackingTime]);

  const Tracking = trackingId.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});

  if (trackingTime && trackingTime[Tracking?.order_id] === 0) {
    window.location.reload();
  }
  if (shipingAddressLoading) return <CustomSpinner />;

  if ((session?.user?.id && wishListLoading) || cartListLoading) {
    return <CustomSpinner />;
  }

  return (
    <>
      <Navbar />
      {trackingId.length == 0 ? (
        <div className="text-center mt-20 text-gray-500 sm:text-xl text-md bg-white py-20 flex-col gap-3  flex justify-center items-center ">
          You haven’t placed an order yet. Shop now and track your orders here!
            <Link href="/home"
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {Tracking?.tracking_status == 'Delivered' || trackingTime === 0 ? (
            <div className="text-center mt-20 text-gray-500 sm:text-xl text-md bg-white py-20 flex-col gap-3 flex justify-center items-center">
              Your order has been successfully delivered. Thank you for shopping
              with us!
                <Link href="/settings"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                View Orders
                </Link>
            </div>
          ) : (
            <div className="bg-gray-100 min-h-screen mt-20 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg shadow-lg w-full  md:px-10 md:py-10 ">
                <h2 className="text-2xl font-semibold text-left border-b-2 pb-2 text-gray-800 mb-6">
                  Order Tracking
                </h2>

                <div className="space-y-4 custom:text-[16px] xs:text-[14px]  sm:text-[20px]">
                  {/* Order ID */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Order ID:</span>
                    <span className="text-gray-800">{Tracking?.order_id}</span>
                  </div>

                  {/* Tracking Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Tracking Number:
                    </span>
                    <span className="text-gray-800">
                      {Tracking.tracking_number}
                    </span>
                  </div>

                  {/* Order Status */}
                  <div className="flex   items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Order Status:
                    </span>
                    <span
                      className={`font-semibold text-white rounded-full 
                            ${
                              Tracking?.trackig_status === 'Delivered'
                                ? 'text-green-500'
                                : Tracking?.tracking_status === 'Pending'
                                  ? 'text-yellow-500'
                                  : 'text-blue-500'
                            }`}
                    >
                      {Tracking?.tracking_status}
                    </span>
                  </div>
                  {/* KM */}
                  {distance && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">KM:</span>
                      <span className="text-gray-800">{`${distance}km`}</span>
                    </div>
                  )}
                  {trackingTime && (
                    <h2>
                      Order Delivered In:{' '}
                      {trackingTime
                        ? `${trackingTime[Tracking?.order_id]} min `
                        : ''}
                    </h2>
                  )}

                  <div className="pt-6">
                    <Map
                      heights={'h-[70vh'}
                      lang={trackingId[0]?.latitude}
                      long={trackingId[0]?.longitude}
                      setDistance={setDistance}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
}

export default page;
