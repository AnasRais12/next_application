'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CustomSpinner from '@/components/Spinner'
function withAuth(WrappedComponent) {
    return  function ProtectedRoute(props)  {
        const { data, status } = useSession()
        const router = useRouter()
        const username = data?.user?.name || data?.user.email?.split('@')[0]
        useEffect(() => {
            if(status === 'unauthenticated'){
                router.push('/login')
            }
        }, [router,status])
        
            if(status === 'loading'){
              return <CustomSpinner/>   
            }
            if(status === 'authenticated'){
            return <WrappedComponent username={username}/>
            }
        
        return null

    }

}

export default withAuth