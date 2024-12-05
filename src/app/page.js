'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UseAuth } from '@/context/userProvider/userProvider'
import CustomSpinner from '@/components/Spinner'

function page() {
  const { User } = UseAuth()
  const TokenItem = localStorage.getItem('User-Token')
  console.log(User)

  const router = useRouter()
  useEffect(() => {
    if (!TokenItem || User) {
      router.push('/login')
    } else {
      router.push('/dashboard')
    }

  }, [TokenItem, User])
  
 return <div><CustomSpinner/></div>


}

export default page
