'use client'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSession from '@/utils/UserExist/GetSession'
import ProductCard from '@/components/LibaryComponent/FlowbiteComponent/ProductCard'
import { CardsData } from '@/utils/ProductsDetailPages/ProductData'
import { useParams } from 'next/navigation'
import { useFetchWishlist } from '@/customHooks/useFetchWishList'
import { useFetchCartlist } from '@/customHooks/useFetchCartList'
import CustomSpinner from '@/components/Spinner'
function page() {
 

  const params = useParams()
  const router = useRouter()
  const productId = Object.values(CardsData).flat().find((item) => item?.product_id === parseInt(params?.id))
  const product = { ...productId, quantity: 1 }
 
  useEffect(() => {
    if (!productId) {
      Swal.fire({
        icon: 'info',
        text: 'Endless Stock'
      })
      router.push('/home')
    }
  }, [productId])


  const session = useSession()
  useFetchWishlist(session?.user?.id);
  useFetchCartlist(session?.user?.id);
  const  {cartListLoading} = useFetchCartlist(session?.user?.id)
  const {wishListLoading} = useFetchWishlist(session?.user?.id)
  if(session?.user?.id && wishListLoading || cartListLoading ){
    return <CustomSpinner/>
  }


  return (
    <>

      <ProductCard data={product} />

    </>
  );
};

export default page







