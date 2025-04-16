'use client';
import React, { useState, useEffect } from 'react';
import Shopping_Cart from '@/components/LibaryComponent/FlowbiteComponent/Shopping_Cart';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import { calculatedeliveryCharges } from '@/helper/ShippingHelper';
import useSession from '@/utils/UserExist/GetSession';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import Map from '@/components/Map';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CustomSpinner from '@/components/Spinner';
import Login from '@/components/authCompoonent/Login';

function Page() {
  const { userDetails } = UserQuery();
  const { deliveryCharges, setDeliveryCharges,setDistance,distance } = GlobalDetails();
  const session = useSession();
  const [loadingSession, setLoadingSession] = useState(false);
  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);


  useEffect(() => {
    calculatedeliveryCharges(setDeliveryCharges,distance);
  }, [distance]);
  useEffect(() => {
    if (!session?.user?.id) {
      setLoadingSession(true);
    }
  }, [session]);

  // Agar session load ho raha hai toh spinner dikhao

  // Agar user logged in nahi hai to Login component dikhao
  if (!session?.user?.id) {
    return (
      <>
        <div className="mt-12 bg-gray-50 flex-col flex gap-4 py-10 w-full">
          {loadingSession ? <Login /> : <CustomSpinner />}
        </div>
      </>
    );
  }



  // Agar wishlist ya cart loading hai toh spinner dikhao
  if (wishListLoading || cartListLoading) return <CustomSpinner />;

  console.log(session,"Session is here ")

  return (
    <div>
      <Shopping_Cart deliveryCharges={deliveryCharges} />
      <div className="hidden">
        <Map
          setDistance={setDistance}
          lang={userDetails?.lat}
          long={userDetails?.long}
          heights={'0px'}
        />
      </div>
    </div>
  );
}

export default Page;
