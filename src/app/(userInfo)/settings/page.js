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
  const session = useSession();
  useFetchWishlist(session?.user?.id);
  useFetchCartlist(session?.user?.id);
  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);
  const { userAddressLoading, userAddressInfo } = useFetchAddress(
    session?.user?.id
  );
  const { userDetails } = UserQuery();

  if (
    (session?.user?.id && wishListLoading) ||
    cartListLoading ||
    userAddressLoading
  ) {
    return <CustomSpinner />;
  }

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
