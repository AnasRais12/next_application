'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { BsCheckCircle } from 'react-icons/bs';
import UserQuery from '@/DbQuery/UserDetailQuery';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { supabase } from '@/lib/supabase';
import CustomSpinner from '@/components/Spinner';
import Link from 'next/link';

export default function ConfirmOrder() {
  const { userDetails } = UserQuery();
  const { setSettingModal } = GlobalDetails();
  const params = useParams();
  const router = useRouter();
  const [validOrder, setValidOrder] = useState(false);

  console.log(setSettingModal, '____>>');
  useEffect(() => {
    const checkOrder = async () => {
      const { data: lastOrder, error } = await supabase
        .from('orders')
        .select('order_id')
        .eq('user_id', userDetails?.user_id) // ✅
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (
        error ||
        !lastOrder ||
        lastOrder?.order_id.replace('#', '') !== params?.id
      ) {
        router.push('/home');
      } else {
        setValidOrder(true);
      }
    };

    if (userDetails?.user_id) {
      checkOrder();
    }
  }, [params?.id, userDetails?.user_id, router]);

  const TrackOrder = () => {
    router.push(`/ordertracking/${params?.id}`);
  };

  if (!validOrder) return <CustomSpinner />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[95%] sm:w-[70%] lg:w-[40%] p-6 sm:mx-0 mx-2 rounded-lg shadow-lg text-center">
        <BsCheckCircle className="w-16 h-16 text-orange-500 mx-auto" />
        <h1 className="text-2xl font-semibold mt-4">Order Confirmed</h1>
        <p className="mt-4 text-lg capitalize">
          Thank you,{' '}
          <span className="font-semibold text-gray-600">
            {userDetails?.full_name}
          </span>
          
        </p>
        <p className="text-gray-600">
          Your order <span className="font-bold">{params?.id}</span> has been
          successfully confirmed.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/home"
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Back to Home
          </Link>
          <button
            onClick={() => TrackOrder()}
            className=" px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Track Your Order
          </button>
        </div>
      </div>
    </div>
  );
}
