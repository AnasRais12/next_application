'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomSpinner from '@/components/Spinner';


function page() {
  const router = useRouter()
  const token = localStorage.getItem('User-Token')
  //tconst { data: session, status } = useSession();
  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    } else if (!token) {
      router.push('/login');
    }
  }, []);
  return <CustomSpinner/>
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
