import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAddress } from '@/app/store/features/userAddress/UserAddress';
import { supabase } from '@/lib/supabase';
import { getAddress } from '@/utils/reduxGlobalStates/ReduxStates';
export const useFetchAddress = (userId) => {
  const dispatch = useDispatch();
  const userAddressInfo = getAddress();
  const [userAddressLoading, SetuserAddressLoading] = useState(false);
  const [isUserAddress, setIsUserAddress] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchWishlist = async () => {
      try {
        SetuserAddressLoading(true);
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', userId);
        if (error) {
          console.error('Error fetching wishlist', error);
        } else {
          if (data.length > 0) {
            dispatch(setUserAddress(data));
          }

          console.log('CArt data from backend:', data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        SetuserAddressLoading(false);
      }
    };
    fetchWishlist();
  }, [userId, dispatch]);

  return { userAddressLoading, userAddressInfo };
};
