'use client';
import CustomSpinner from '@/components/Spinner';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
function page() {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    else {
      router.push('/home')
    }
  }, [])

  return <CustomSpinner />
  // else{
  //   return (
  //     <div className='flex h-screen justify-center items-center text-[30px] text-blue-500'>
  //       <h1>Welcome,{session?.user?.name}</h1>
  //       <p>Email:,{session?.user?.email}</p>
  //       <LogoutButton/>
  //     </div>
  //   );
  // }
}

export default page;
