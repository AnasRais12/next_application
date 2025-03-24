'use client';
import React, { useEffect, useState } from 'react';
import CustomSpinner from '@/components/Spinner';
import UserSetting from '@/components/LibaryComponent/FlowbiteComponent/UserSetting/UserSetting';
import { useFetchAddress } from '@/customHooks/useFetchAddress';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import { createAddress, purchaseLabel } from '@/helper/ShippingHelper';
import { supabase } from '@/lib/supabase';
import UserQuery from '@/DbQuery/UserDetailQuery';
import useSession from '@/utils/UserExist/GetSession';

const page = () => {
  const { userDetails } = UserQuery();
  const session = useSession();
  // useEffect(() => {
  //   if (!userDetails?.id) return;
  //   const handleCreateAddress = async () => {

  //     const shippingAddress = {
  //       name: userDetails?.full_name,
  //       street1: userDetails?.address,
  //       city: userDetails?.city,
  //       state: userDetails?.state,
  //       zip: userDetails?.zip_code,
  //       country: userDetails?.phone_code,
  //       phone: userDetails?.phone_number,
  //       email: session?.user?.email,
  //       is_residential: false,
  //     };
  //     const parcelData = {
  //       length: "10",
  //       width: "5",
  //       height: "5",
  //       weight: "2",
  //       distance_unit: "in",
  //       mass_unit: "lb"
  //     };

  //     const senderAddress = {
  //       "name": "John Doe",
  //       "street1": "123 Main Street",
  //       "city": "New York",
  //       "state": "NY",
  //       "zip": "10001",
  //       "country": "US",
  //       "phone": "+1 555 555 5555",
  //       "email": "sender@example.com"
  //     };
  //     const addressFrom ={
  //       "name": "Alice Johnson",
  //       "street1": "456 Elm Street",
  //       "city": "Los Angeles",
  //       "state": "CA",
  //       "zip": "90001",
  //       "country": "US",
  //       "phone": "+1 310-555-5678",
  //       "email": "alice.johnson@example.com"
  //     }

  //    const shipment = await createAddress(shippingAddress, parcelData,addressFrom,senderAddress)
  //    if (shipment && shipment.rates.length > 0) {
  //     console.log("Shipments agaya wahan pe dekhp",shipment)
  //     console.log( typeof"Shipments Mai kIA AYAA",shipment?.rates[0]?.object_id)

  //     const labelUrl = await purchaseLabel(shipment?.rates[0]?.object_id);
  //     console.log("📌 Download Label from:", labelUrl);
  //   } else {
  //     console.error("❌ Shipment rates not found!");
  //   }
  //    console.log(shipment,"itemsd shipment is used adad?????")
  //   }
  //   handleCreateAddress()
  // }, [userDetails])

  useFetchWishlist(session?.user?.id);
  const { userAddressLoading, userAddressInfo, isUserAddress } =
    useFetchAddress(session?.user?.id);
  useFetchCartlist(session?.user?.id);

  console.log(userDetails, 'from setting page ');
  return (
    <>
      <UserSetting
        userAddressLoading={userAddressLoading}
        userAddressInfo={userAddressInfo}
      />
    </>
  );
};

export default page;
