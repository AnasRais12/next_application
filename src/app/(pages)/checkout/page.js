'use client';
import React, { useEffect, useState } from 'react';
import { useFetchAddress } from '@/customHooks/useFetchAddress';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import AddressForm from '@/components/LibaryComponent/FlowbiteComponent/Addresses';
import useSession from '@/utils/UserExist/GetSession';
import UserQuery from '@/DbQuery/UserDetailQuery';
import CustomSpinner from '@/components/Spinner';
import Checkout from '@/components/LibaryComponent/MaterialUi Compomnent/Checkout';
function page() {
  const session = useSession();
  const { userDetails } = UserQuery();
  const [userAddresssExist, setUserAddresssExist] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const { userAddressLoading, userAddressInfo } = useFetchAddress(
    session?.user?.id
  );
  useFetchCartlist(session?.user?.id);

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
      {userAddresssExist ? (
        <>
          <Checkout userAddresssExist={userAddresssExist} />
        </>
      ) : (
        <>
          {addressForm ? (
            <div className="mt-4 pt-10 sm:pt-20 mb-10 bg-gray-50">
              <div className=" w-full sm:w-[90%] md:w-[70%] mx-auto  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
                <AddressForm setUserAddresssExist={setUserAddresssExist} />
              </div>
            </div>
          ) : (
            <CustomSpinner />
          )}
        </>
      )}
    </>
  );
}

export default page;
