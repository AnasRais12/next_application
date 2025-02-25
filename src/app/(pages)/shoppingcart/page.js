'use client'
import React from 'react'
import Shopping_Cart from '@/components/LibaryComponent/FlowbiteComponent/Shopping_Cart'
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import CustomSpinner from '@/components/Spinner';
function page() {
  const session = useSession()
  useFetchWishlist(session?.user?.id);
  useFetchCartlist(session?.user?.id);
 const  {cartListLoading} = useFetchCartlist(session?.user?.id)
  const {wishListLoading} = useFetchWishlist(session?.user?.id)
  if(wishListLoading || cartListLoading){
    return <CustomSpinner/>
  }
  return (
    <>
      <Shopping_Cart />
    </>
  )
}

export default page
