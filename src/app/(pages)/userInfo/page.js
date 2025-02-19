'use client'
import React from 'react'
import ProtectedRoute from '@/utils/ProtectedRoute'

function page({ username }) {
  return (
    <div className='bg-black text-white lg:text-[10vw] text-[20vw] h-screen flex flex-col gap-10 justify-center font-bold items-center '>
      <div className='w-full bg-blue-500 py-4 text-center text-[3vw] text-white'>
        <h1>Hello {username}</h1>
      </div>
      <h1>UserInfo</h1>
    </div>
  )
}

export default ProtectedRoute(page)
