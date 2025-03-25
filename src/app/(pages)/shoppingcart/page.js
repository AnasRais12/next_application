'use client';
import React, { useState, useEffect } from 'react';
import Shopping_Cart from '@/components/LibaryComponent/FlowbiteComponent/Shopping_Cart';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import Map from '@/components/Map';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CustomSpinner from '@/components/Spinner';
import Login from '@/components/authCompoonent/Login';

function Page() {
  const { userDetails } = UserQuery();
  const { deliveryCharges, setDeliveryCharges } = GlobalDetails();
  const session = useSession();
  const [distance, setDistance] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);

  const basedeliveryCharges = 50; // Pehle 10 km ka deliveryCharges
  const additionaldeliveryCharges = 40; // Har extra 10 km ka deliveryCharges
  const calculatedeliveryCharges = () => {
    const roundedDistance = Math.ceil(distance); // Distance ko upar round karega
    const deliveryChargesSlabs = Math.ceil(roundedDistance / 10); // Har 10 km pe naye paise add honge
    setDeliveryCharges(deliveryChargesSlabs * additionaldeliveryCharges);
  };

  useEffect(() => {
    calculatedeliveryCharges();
  }, [distance]);
  useEffect(() => {
    if (!session?.user?.id) {
      setLoadingSession(false);
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

  if (loadingSession) return <CustomSpinner />;
  // Agar wishlist ya cart loading hai toh spinner dikhao
  if (wishListLoading || cartListLoading) return <CustomSpinner />;

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
