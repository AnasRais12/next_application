import React from 'react'
import { useSession } from 'next-auth/react'
export default function  UserExist() {
    const {data } = useSession()
    return data
    console.log(data,"A_____________>");
   
}


