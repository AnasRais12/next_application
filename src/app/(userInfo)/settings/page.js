'use client'
import UserSetting from "@/components/LibaryComponent/FlowbiteComponent/UserSetting";
import { useFetchAddress } from "@/customHooks/useFetchAddress";
import { useFetchCartlist } from "@/customHooks/useFetchCartList";
import { useFetchWishlist } from "@/customHooks/useFetchWishList";
import useSession from "@/utils/UserExist/GetSession";
import React from "react";


const SettingsPage = () => {

  useSession
  const session = useSession()
  useFetchWishlist(session?.user?.id)
  useFetchCartlist(session?.user?.id)

  return (
    <>
      <UserSetting />
    </>

  );
};

export default SettingsPage;


