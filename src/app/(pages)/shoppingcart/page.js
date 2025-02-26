'use client'
import React, { useState, useEffect } from 'react';
import Shopping_Cart from '@/components/LibaryComponent/FlowbiteComponent/Shopping_Cart';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import CustomSpinner from '@/components/Spinner';
import Login from '@/components/authCompoonent/Login';

function Page() {
  const session = useSession();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoadingSession(false);
    }
  }, [session]);

  useFetchWishlist(session?.user?.id);
  useFetchCartlist(session?.user?.id);

  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);

  // Agar session load ho raha hai toh spinner dikhao
  if (loadingSession) return <CustomSpinner />;

  // Agar user logged in nahi hai to Login component dikhao
  if (!session?.user?.id) return (
    <div className='mt-12 bg-gray-50 flex-col flex gap-4 py-10 w-full'>
         <Login />
    </div>
  );

  // Agar wishlist ya cart loading hai toh spinner dikhao
  if (wishListLoading || cartListLoading) return <CustomSpinner />;

  return (
    <>
      <Shopping_Cart />
    </>
  );
}

export default Page;
