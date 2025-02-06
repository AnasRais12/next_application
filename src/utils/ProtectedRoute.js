'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import CustomSpinner from '@/components/Spinner'

function ProtectedRoute(WrappedComponent) {
    return function ProtectedRoute(props) {
        const router = useRouter()
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true); // Add loading state
        useEffect(() => {
            const accessToken = Cookies.get('sb-access-token');
            console.log(accessToken);
            const UserInfo = localStorage.getItem('sb-user');
            console.log(UserInfo)

            if (!accessToken || !UserInfo) {
                router.push('/login');
            } else {
                setUser(JSON.parse(UserInfo));
                setLoading(false);
            }
        }, []);


        if (loading) {
            return <CustomSpinner />;
        }
        return <WrappedComponent username={user?.email} {...props} />;


    }
}

export default ProtectedRoute;
