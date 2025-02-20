'use client';
import CustomSpinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
function page() {
  const router = useRouter()
  useEffect(() => {
      router.push('/home')
  }, [])

  return <CustomSpinner />
}

export default page;
