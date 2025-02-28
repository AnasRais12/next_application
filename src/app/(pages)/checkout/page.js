'use client'
import React from 'react'
import { useFetchAddress } from '@/customHooks/useFetchAddress'
import AddressForm from '@/components/LibaryComponent/FlowbiteComponent/Addresses'
import useSession from '@/utils/UserExist/GetSession'
function page() {
    const session = useSession()
  const {userAddressInfo,userAddressLoading} = useFetchAddress(session?.user?.id)
  return (
    <>
    {userAddressInfo?.length === 0 ? (
      <AddressForm/>

    ) : (
        <>
          <div className='mt-20 bg-black text-white'>Checkout</div>
        </>
    )}
    </>
  )
}

export default page