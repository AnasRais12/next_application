'use client'
import React, { useEffect, useState } from "react";
import CustomSpinner from "@/components/Spinner";
import UserSetting from "@/components/LibaryComponent/FlowbiteComponent/UserSetting/UserSetting";
import { useFetchAddress } from "@/customHooks/useFetchAddress";
import { useFetchCartlist } from "@/customHooks/useFetchCartList";
import { useFetchWishlist } from "@/customHooks/useFetchWishList";
import UserQuery from "@/DbQuery/UserDetailQuery";
import useSession from "@/utils/UserExist/GetSession";


const page = () => {
  const session = useSession()
  useFetchWishlist(session?.user?.id)
  const {userAddressLoading,userAddressInfo,isUserAddress} =useFetchAddress(session?.user?.id)
  useFetchCartlist(session?.user?.id)
  return (
    <>
      <UserSetting   userAddressLoading={userAddressLoading} userAddressInfo={userAddressInfo}  />
      
    </>

  );
};

export default page;


