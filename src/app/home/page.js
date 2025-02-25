'use client';
import Header from '@/components/LibaryComponent/FlowbiteComponent/Header';
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard';
import useSession from '@/utils/UserExist/GetSession';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
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
      {/* <div className='px-3 py-3 mt-16 w-full bg-red-500 text-white'>{count}</div> */}
    <div className='w-full  '>
      {/* Header */}
       <Header/>   
       {/* Trending Prodcus */}
       {/* Ayaingeeee */}
        {/* Categoreis */}
        <E_commerceCard/>
         {/* Deals waley sectin */}
       {/* Ayaingeeee */}
         {/* New arival*/}
      
      
  </div>
    </>
  );
}

export default page ;
