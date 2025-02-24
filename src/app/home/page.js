'use client';
import Header from '@/components/LibaryComponent/FlowbiteComponent/Header';
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard';
import useSession from '@/utils/UserExist/GetSession';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';

function page() {
  const session = useSession()
  useFetchWishlist(session?.user?.id);

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
