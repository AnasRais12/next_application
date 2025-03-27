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
  const basedeliveryCharges = 50; // Pehle 10 km ka deliveryCharges
  const additionaldeliveryCharges = 40; // Har extra 10 km ka deliveryCharges
  export const  calculatedeliveryCharges = (setDeliveryCharges,distance) => {
    const roundedDistance = Math.ceil(distance); // Distance ko upar round karega
    const deliveryChargesSlabs = Math.ceil(roundedDistance / 10); // Har 10 km pe naye paise add honge
    setDeliveryCharges(deliveryChargesSlabs * additionaldeliveryCharges);
  };
