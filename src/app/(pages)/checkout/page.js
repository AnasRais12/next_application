'use client'
import React, { useEffect, useState } from 'react'
import { useFetchAddress } from '@/customHooks/useFetchAddress'
import AddressForm from '@/components/LibaryComponent/FlowbiteComponent/Addresses'
import useSession from '@/utils/UserExist/GetSession'
import CustomSpinner from '@/components/Spinner'
function page() {
  const session = useSession()
  const [userAddresssExist, setUserAddresssExist] = useState(false)
  const { userAddressInfo, userAddressLoading } = useFetchAddress(session?.user?.id)

  useEffect(() => {
    if (userAddressInfo.length === 0) {
      setUserAddresssExist(false)
    }
    else {
      setUserAddresssExist(true)
    }

  }, [userAddressInfo])

  if (userAddressLoading) {
    console.log(userAddressLoading, "______________>>")
    return <CustomSpinner />
  }
  return (
    <>
      {userAddresssExist ? (
        <>
          <div className='mt-20 bg-black text-white'>Checkout</div>
        </>

      ) : (
        <div className="mt-4 pt-10 sm:pt-20 mb-10 bg-gray-50">
          <div className=" w-full sm:w-[90%] md:w-[70%] mx-auto  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">

            <AddressForm setUserAddresssExist={setUserAddresssExist} />
          </div>
        </div>



      )}
    </>
  )
}

export default page