'use client';
import React, { useEffect, useState } from 'react';
import { useFetchAddress } from '@/customHooks/useFetchAddress';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import AddressForm from '@/components/LibaryComponent/FlowbiteComponent/Addresses';
import useSession from '@/utils/UserExist/GetSession';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CustomSpinner from '@/components/Spinner';
import Checkout from '@/components/LibaryComponent/MaterialUi Compomnent/Checkout';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { calculatedeliveryCharges } from '@/helper/ShippingHelper';
import Map from '@/components/Map';
import Navbar from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
function page() {
  const session = useSession();
  useFetchCartlist(session?.user?.id);
  const { userDetails } = UserQuery();
  const [userAddresssExist, setUserAddresssExist] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const { userAddressLoading, userAddressInfo } = useFetchAddress(session?.user?.id );
     const { deliveryCharges, setDeliveryCharges,setDistance,distance } = GlobalDetails();
  
     useEffect(() => {
        calculatedeliveryCharges(setDeliveryCharges,distance,);
      }, [distance]);
  
      console.log(deliveryCharges,"_____>> Delivery Charges")
      console.log(distance,"_____>> Distance")
      console.log(Number(userDetails?.long),"_____>> Detatance")

  useEffect(() => {
    if (!userDetails) {
      setUserAddresssExist(false);
      setAddressForm(true);
    } else {
      setUserAddresssExist(true);
    }
  }, [userDetails]);

  if (userAddressLoading) {
    return <CustomSpinner />;
  }
  return (
    <>
    <Navbar/>
      {userAddresssExist ? (
        <>
             <div className='hidden'>
        <Map 
   setDistance={setDistance}
   lang={userDetails?.lat}
   long={userDetails?.long}
   heights={'0px'}
/>
        </div>
          <Checkout userAddresssExist={userAddresssExist}  />
          
        
 
        </>
      ) : (
        <>
          {addressForm ? (
            <div className="mt-4 pt-10 sm:pt-20 mb-10 bg-gray-50">
              <div className=" w-full sm:w-[90%] md:max-w-7xl xl:max-w-4xl mx-auto  border sm:border-2 bg-white p-2 sm:p-6 shadow-md rounded-lg">
                <AddressForm setUserAddresssExist={setUserAddresssExist} />
              </div>
            </div>
          ) : (
            <CustomSpinner />
          )}
        </>
      )}
      <Footer/>
    </>
  );
}


export default page;
