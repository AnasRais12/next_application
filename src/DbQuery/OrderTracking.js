import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useOrderTracking = (orderId, trackingId) => {
  const [trackingTime, setTrackingTime] = useState(null);
  console.log(trackingId, '___>> Tracking kia hai meri dost hai  ');
  console.log(orderId, 'ye rhai orderId');

  // ✅ Fetch Latest Tracking Time
  const fetchLatestTrackingTime = async () => {
    try {
      let { data, error } = await supabase
        .from('order_tracking')
        .select('tracking_time')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
      } else {
        console.log('Data:', data);
        setTrackingTime(data[0]?.tracking_time);
      }
    } catch (error) {
      console.log('Error! ', error);
    } finally {
    }
  };

  // ✅ Update Tables When trackingTime === 0

  useEffect(() => {
    if (trackingTime === 0) {
      return;
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
  };
};
