'use client';
import { useEffect } from 'react';
import Header from '@/components/LibaryComponent/FlowbiteComponent/Header';
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard';
import useSession from '@/utils/UserExist/GetSession';
import Categories from '@/components/LibaryComponent/FlowbiteComponent/Categories';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import CustomSpinner from '@/components/Spinner';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { calculatedeliveryCharges } from '@/helper/ShippingHelper';

function page() {
  const session = useSession();
  useFetchWishlist(session?.user?.id);
  useFetchCartlist(session?.user?.id);
  const { cartListLoading } = useFetchCartlist(session?.user?.id);
  const { wishListLoading } = useFetchWishlist(session?.user?.id);

  if ((session?.user?.id && wishListLoading) || cartListLoading) {
    return <CustomSpinner />;
  }
  return (
    <>
      {/* <div className='px-3 py-3 mt-16 w-full bg-red-500 text-white'>{count}</div> */}
      <div className="w-full  ">
        {/* Header */}
        <Header />
        {/* Trending Prodcus */}
        {/* Ayaingeeee */}
        {/* Categoreis */}
        <Categories />
        <E_commerceCard />
        {/* Deals waley sectin */}
        {/* Ayaingeeee */}
        {/* New arival*/}
      </div>
    </>
  );
}

export default page;
