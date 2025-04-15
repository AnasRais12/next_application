'use client';
import {
  RemoveFromWishList,
  setWishlist,
} from '@/app/store/features/wishList/WishList';
import { addToCart } from '@/app/store/features/CartReducer/CartSlice';
import { motion } from 'framer-motion';
import useSession from '@/utils/UserExist/GetSession';
import { FiHeart } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-toastify';
import CSpinner from '@/components/CSpinner';
import { getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { useDispatch } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { ConvertPrice } from '@/helper/CurrenyConver';
export default function Wishlist({ setWishlistModal }) {

  
  const wishlistItems = getWishList();
  const session = useSession();
  const [loadingItems, setLoadingItems] = useState({});
  const [crossButtonLoading, setCrossButtonLoading] = useState({});
  const {rates,from,symbol} = GlobalDetails()

  const dispatch = useDispatch();

  const wishListToCart = async (cartToWishList) => {
    try {
      setLoadingItems((prev) => ({
        ...prev,
        [cartToWishList.product_id]: true,
      })); // S
      const wishListProduct = {
        product_id: cartToWishList?.product_id,
        image: cartToWishList?.product_image,
        product_name: cartToWishList?.product_name,
        product_price: cartToWishList?.product_price,
        desc: cartToWishList?.desc,
        quantity: 1,
      };
      const { data, error } = await supabase.from('cart').insert([
        {
          user_id: session?.user?.id || cartToWishList?.user_id,
          product_id: cartToWishList?.product_id,
          product_name: cartToWishList?.product_name,
          product_price: cartToWishList?.product_price,
          product_image: cartToWishList?.product_image,
          quantity: cartToWishList?.quantity || 1,
        },
      ]);

      if (error) {
        console.error('Error saving cart item to database:', error);
        toast.error('Failed to add item to cart');
        return;
      }
      const { deleteFromWishlist, errordeleteFromWishlist } = await supabase
        .from('wishlist')
        .delete()
        .eq('product_id', cartToWishList?.product_id)
        .eq('user_id', session?.user?.id || cartToWishList?.user_id);

      if (errordeleteFromWishlist) {
        console.error('Error deleting wishlist item:', error);
        toast.error('Failed to remove item from backend');
      } else {
        dispatch(RemoveFromWishList(cartToWishList?.product_id));
        dispatch(addToCart(wishListProduct));
        setWishlistModal(false);
        toast.success('Item added to Cart');
      }
    } catch (error) {
      toast.warning(error);
    } finally {
      setLoadingItems((prev) => ({
        ...prev,
        [cartToWishList.product_id]: false,
      }));
    }
  };
  const deleteWishListItem = async (id) => {
    if (!session?.user?.id) {
      toast.error('User not logged in');
      return;
    }
    try {
      // Delete from Supabase wishlist table
      setCrossButtonLoading((prev) => ({ ...prev, [id]: true })); // S
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('product_id', id)
        .eq('user_id', session?.user.id);

      if (error) {
        console.error('Error deleting wishlist item:', error);
        toast.error('Failed to remove item from backend');
      } else {
        // Update Redux state if backend deletion is successful
        dispatch(RemoveFromWishList(id));
        toast.success('Item removed from wishlist');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Error removing item');
    } finally {
      setCrossButtonLoading((prev) => ({ ...prev, [id]: false })); // S
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white w-80 h-fit  shadow-lg p-3 overflow-y-auto"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between items-center border-b pb-3 border-gray-200">
  <h2 className="text-xl font-semibold text-[#047857]">My Wishlist</h2>
  <button 
    onClick={() => setWishlistModal(false)}
    className="p-1 rounded-full hover:bg-gray-100 transition"
  >
    <RxCross2 size={22} className="text-gray-500 hover:text-red-500" />
  </button>
</div>

{/* Wishlist Items */}
<ul className="mt-4 divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
  {wishlistItems.length > 0 ? (
    wishlistItems.map((item) => (
      <li
        key={item.id}
        className="py-4 hover:bg-gray-50 transition duration-150"
      >
        <div className="flex items-start">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={`/${item.product_image}`}
              alt={item.product_name}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
          </div>

          {/* Product Info */}
          <div className="ml-4 flex-1">
            <h3 className="text-md font-medium text-gray-800 line-clamp-2">
              {item.product_name}
            </h3>
            <p className="text-[#047857] font-medium mt-1">
              {symbol}: {ConvertPrice(item.product_price, rates, from)}
            </p>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={() => deleteWishListItem(item?.product_id)}
                className="p-2 text-gray-400 hover:text-red-500 transition"
                title="Remove"
              >
                {crossButtonLoading[item?.product_id] ? (
                  <CSpinner size="sm" />
                ) : (
                  <RxCross2 size={18} />
                )}
              </button>
              
              <button
                onClick={() => wishListToCart(item)}
                className="flex items-center bg-[#047857] hover:bg-[#03684d] text-white text-sm font-medium px-3 py-2 rounded-md transition"
              >
                {loadingItems[item?.product_id] ? (
                  <CSpinner size="sm" color="white" />
                ) : (
                  <>
                    <FiShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </li>
    ))
  ) : (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        <FiHeart className="text-gray-400" size={24} />
      </div>
      <p className="text-gray-500">Your wishlist is empty</p>
      <button 
        className="mt-3 text-[#047857] hover:underline text-sm font-medium"
        onClick={() => setWishlistModal(false)}
      >
        Continue Shopping
      </button>
    </div>
  )}
</ul>

{/* Footer Actions */}
{wishlistItems.length > 0 && (
  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
    <span className="text-sm text-gray-500">
      {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
    </span>
    {/* <button
      onClick={clearWishlist}
      className="text-sm text-red-500 hover:text-red-600 font-medium"
    >
      Clear All
    </button> */}
  </div>
)}
      </motion.div>
    </div>
  );
}
