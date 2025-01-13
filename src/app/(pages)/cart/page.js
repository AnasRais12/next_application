'use client'
import withAuth from '@/utils/withAuth'
import React from 'react'
function page({username}) {
  return (
    <div className='bg-black text-white lg:text-[10vw] text-[20vw] h-screen flex flex-col gap-10 justify-center font-bold items-center '>
    <div className='w-full bg-blue-500 py-4 text-center text-[3vw] text-white'>
      <h1>Hello {username}</h1>
    </div>
    <h1>Cart</h1>
  </div>
  )
}

export default withAuth(page)
