'use client'
import React, { useEffect, useState } from "react";
import CustomSpinner from "@/components/Spinner";
import UserSetting from "@/components/LibaryComponent/FlowbiteComponent/UserSetting/UserSetting";
import { useFetchAddress } from "@/customHooks/useFetchAddress";
import { useFetchCartlist } from "@/customHooks/useFetchCartList";
import { useFetchWishlist } from "@/customHooks/useFetchWishList";
import { createAddress } from "@/helper/ShippingHelper";
import { supabase } from "@/lib/supabase";
import UserQuery from "@/DbQuery/UserDetailQuery";
import useSession from "@/utils/UserExist/GetSession";


const page = () => {
  const {userDetails} = UserQuery()
  const session = useSession()
  useEffect(() => {
     if(!userDetails?.id) return; 
     const handleCreateAddress = async () => {
      const shippingAddress = {
      // id get karna hai creteaddress mai 
        name: userDetails?.full_name,
        street1:userDetails?.address ,
        city: userDetails?.city,
        state: userDetails?.state,
        zip: userDetails?.zip_code,
        country: userDetails?.phone_code,
        phone: userDetails?.phone_number,
        email: session?.user?.email,
        is_residential: true,
        validate: true
      };
    await createAddress(shippingAddress,userDetails?.id)
    }
    handleCreateAddress()
  }, [userDetails])
  
  useFetchWishlist(session?.user?.id)
  const {userAddressLoading,userAddressInfo,isUserAddress} =useFetchAddress(session?.user?.id)
  useFetchCartlist(session?.user?.id)

  console.log(userDetails,"from setting page ")
  return (
    <>
      <UserSetting   userAddressLoading={userAddressLoading} userAddressInfo={userAddressInfo}  />
      
    </>

  );
};

export default page;


