'use client';
import React, { useEffect, useState } from 'react';
import { getUser } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import Header from '@/components/LibaryComponent/FlowbiteComponent/Header';
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard';
import Navbar_ from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import useSession from '@/utils/UserExist/GetSession';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

function page() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const cart = useSelector((state => state?.cartItem?.cart) || "")
  const dispatch = useDispatch()
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
