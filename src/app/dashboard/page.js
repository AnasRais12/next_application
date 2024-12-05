'use client'
import React, { useEffect, useState } from 'react'
import { UseAuth } from "@/context/userProvider/userProvider";
import { useRouter } from 'next/navigation';
import CustomSpinner from '@/components/Spinner';
function page() {
const router = useRouter()
const { UserToken,LogoutUser,User  } = UseAuth()
const [loading, setloading] = useState(false)
 useEffect(() => {
   if(!User || UserToken){
    router.push('/login')
    setloading(true)
   }
 
 }, [User,UserToken])
 
  
if(loading){
   return <CustomSpinner/>
}
  return (
    <div className='flex justify-center h-screen relative items-center py-30 w-full text-center text-[40px]'>
        <div className='absolute top-8 right-9 border-4 border-black bg-green-700 text-white rounded-[20px] px-10'> 
            <button onClick={LogoutUser}>Logout</button>
        </div>
        <div className='w-[30%] flex justify-center py-20 border-2 border-black items-center shadow-xl rounded-[20px]'>
      <h1>Hello {JSON.parse(User)?.username} </h1>
      </div>
    </div>
  )
}

export default page
