'use client'
import React, {  useEffect, useState } from 'react'
import useSession from '@/utils/UserExist/GetSession'
import { useFetchTracking } from '@/customHooks/useFetchTracking'
import { useFetchOrderlist } from '@/customHooks/useFetchOrderHisotry'
import CustomSpinner from '@/components/Spinner'
function page() {
    const session = useSession()
    const { orderHistoryDetail, orderHistoryLoading } = useFetchOrderlist(session?.user?.id)
    const [orderId, setOrderId] = useState(null);
    
    useEffect(() => {
        if (orderHistoryDetail) {
            setOrderId(orderHistoryDetail[11]?.order_id);
            console.log(orderHistoryDetail[11]?.order_id,"ye rahi id ")
        }
    }, [orderHistoryDetail]);

 console.log(orderId,"___________________________-")
    const { shipingAddressLoading, trackingId } = useFetchTracking(orderId)
    if (orderHistoryLoading || shipingAddressLoading) {
        return <CustomSpinner />
    }
    console.log(trackingId,"mai huu tackindId")

  return (
    <div>page</div>
  )
}

export default page