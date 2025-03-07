import React, { useState } from 'react';
import OrderSummary from '../FlowbiteComponent/OrderSummary';
import useSession from '@/utils/UserExist/GetSession';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';

const Checkout = ({userAddresssExist}) => {
  const session = useSession()
 useFetchCartlist(session?.user?.id)
  return (
    <>
    <div className='mt-28 sm:px-[3rem] px-3 mb-16 ' style={{ textAlign: 'center',  }} >
      <OrderSummary heading={'Payment Detail'}  userAddresssExist={userAddresssExist}/>
     
    </div>
    </>
  );
};

export default Checkout;