import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useOrderTracking = (orderId) => {
  const [trackingTime, setTrackingTime] = useState(null);
  const [orderTrackingLoading, setorderTrackingLoading] = useState(false);

  // ✅ Fetch Latest Tracking Time
  const fetchLatestTrackingTime = async () => {
    try {
      setorderTrackingLoading(true);

      let { data, error } = await supabase
        .from('order_tracking')
        .select('tracking_time')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
      } else {
        setTrackingTime(data[0]?.tracking_time);
      }
    } catch (error) {
      console.log('Error! ', error);
    } finally {
      setorderTrackingLoading(false);
    }
  };

  // ✅ Update Tables When trackingTime === 0
  const updateTrackingStatus = async () => {
    if (trackingTime === 0) {
      // Update orders table (status: Completed, payment_method: Completed)
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'Completed', payment_status: 'Completed' })
        .eq('order_id', orderId); // ✅ Yahan sahi condition lagani hogi jo track kare

      if (orderError) console.error('Orders Table Update Error:', orderError);

      // Update tracking_status table (tracking_update: Delivered)
      const { error: trackingError } = await supabase
        .from('order_tracking')
        .update({ tracking_status: 'Delivered' })
        .eq('order_id', orderId); // ✅ Yahan bhi sahi condition lagani hogi

      if (trackingError)
        console.error('Tracking Table Update Error:', trackingError);
    }
  };

  useEffect(() => {
    if (trackingTime > 0) {
      fetchLatestTrackingTime();
    } else if (trackingTime === 0) {
      updateTrackingStatus(); // ✅ Agar 0 ho jaye to status update kare
    }

    // ✅ Realtime Subscription
    const channel = supabase
      .channel('tracking_updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'order_tracking' },
        fetchLatestTrackingTime
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [trackingTime]);

  return {
    trackingTime,
    fetchLatestTrackingTime,
    updateTrackingStatus,
    orderTrackingLoading,
  };
};
