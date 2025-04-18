'use client';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSession from '@/utils/UserExist/GetSession';
import { calculatedeliveryCharges } from '@/helper/ShippingHelper';
import ProductCard from '@/components/LibaryComponent/FlowbiteComponent/ProductCard';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import { useParams } from 'next/navigation';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import { useFetchAddress } from '@/customHooks/useFetchAddress';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import Map from '@/components/Map';
import CustomSpinner from '@/components/Spinner';
import UserQuery from '@/DbQuery/UserDetailQuery';
function page() {
  const session = useSession();
 
  const params = useParams();
  const router = useRouter();
  const {userDetails} = UserQuery()
  const [distance, setdistance] = useState(null)
  const [delievery, setDeliveryCharges] = useState(null)
  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);
  const productId = Object.values(CardsData).flat().find((item) => item?.product_id === parseInt(params?.id));
  const product = { ...productId, quantity: 1 };

  useEffect(() => {
    if (!productId) {
      Swal.fire({
        icon: 'info',
        text: 'Endless Stock',
      });
      router.push('/home');
    }
  }, [productId]);
  useEffect(() => {
    calculatedeliveryCharges(setDeliveryCharges,distance);
  
  }, [distance])

  console.log(userDetails, 'userDetails');
  console.log(distance,"distancee!")
  console.log(delievery, "delievery")

  if ((session?.user?.id && wishListLoading) || cartListLoading) {
    return <CustomSpinner />;
  }
   
  return (
    <>
      <ProductCard data={product} />
    <div className='hidden'>
      <Map setDistance={setdistance} lang={Number(userDetails?.lat)} long={Number(userDetails?.long)}/>
      </div>
    </>
  );
}

export default page;
