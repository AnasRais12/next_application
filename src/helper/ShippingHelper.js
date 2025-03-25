// Delete Order
import { supabase } from '@/lib/supabase';
export const handleDeleteOrder = async (orderId, Swal, setorderLoading) => {
  try {
    setorderLoading(true);
    const { error } = await supabase
      .from('orders') // Table ka naam
      .update({ status: 'Cancelled', payment_status: 'Refunded' })
      .eq('order_id', `#${orderId}`); // Jis order ko delete karna hai

    if (error) {
      console.error('Error deleting order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message}`,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Order Canceled!',
        text: `Order ID: ${orderId} has been Canceled successfully!`,
      });
      window.location.reload();
    }
  } catch (error) {
    console.log('Erro!', error);
  } finally {
    setorderLoading(false);
  }
};

// Langtitute and longtitue in km mai nikalne ka function

export function calculateDistance(lat2, lon2) {
  let lat1 = 67.0723;
  let lon1 = 24.9263;
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2); // Distance in km
}
