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
  const [userDetailLoading,setUserDetailLoading] = useState(false)
const {userDetails} = UserQuery()
  const session = useSession()
  useFetchWishlist(session?.user?.id)
  const {userAddressLoading,userAddressInfo} =useFetchAddress(session?.user?.id)
  console.log(userAddressLoading,"__________>>>>>")
  useFetchCartlist(session?.user?.id)
  return (
    <>
      <UserSetting userDetailLoading={userDetailLoading} userAddressLoading={userAddressLoading} userAddressInfo={userAddressInfo} />
      
     
      <h1>Hello World</h1>
    </>

  );
};

export default page;


