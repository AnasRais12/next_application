'use client';
import React, { useState, useEffect } from 'react';
import useSession from '@/utils/UserExist/GetSession';
import { supabase } from '@/lib/supabase';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import Swal from 'sweetalert2';
import { addtoWishList } from '@/app/store/features/wishList/WishList';
import { getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ConvertPrice } from '@/helper/CurrenyConver';
import { FaHeart } from 'react-icons/fa';
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import CSpinner from '@/components/CSpinner';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';

function E_commerceCard() {
  const session = useSession();
  const dispatch = useDispatch();
  
  const { rates,from,symbol,setSymbol} = GlobalDetails();
  const [productLoading, setProductLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState({}); // Individual loading state
  const wishlistItems = getWishList();
  const allProducts = Object.values(CardsData).flat();
  const router = useRouter();
  const handleShopNow = (id) => {
    setProductLoading(true);
    try {
      router.push(`/product/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setProductLoading(false);
    }
  };
  console.log('session!', session);
  const handleAddToWishlist = async (wishListProduct) => {
    if (!session?.user?.id) {
      Swal.fire({
        text: 'Please login to add items to wishlist',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }
    try {
      const userId = session?.user?.id;
      setLoadingItems((prev) => ({
        ...prev,
        [wishListProduct.product_id]: true,
      })); // S
      const { data, error } = await supabase.from('wishlist').insert([
        {
          user_id: userId, // Ensure user is logged in
          product_id: wishListProduct?.product_id,
          product_name: wishListProduct?.product_name,
          product_price: wishListProduct?.product_price,
          product_image: wishListProduct?.image,
          // Optionally, include description or quantity if needed
        },
      ]);

      if (error) {
        console.error('Error saving wishlist item to database:', error);
        toast.error('Failed to save wishlist item');
      } else {
        const productWishlist = {
          product_id: wishListProduct?.product_id,
          image: wishListProduct?.image,
          product_name: wishListProduct?.product_name,
          desc: wishListProduct?.desc,
          product_price: wishListProduct?.product_price,
        };
        dispatch(addtoWishList(productWishlist));
        toast.success('Added to Wishlist');
      }
    } catch (error) {
      toast.warning(error.toString());
    } finally {
      setLoadingItems((prev) => ({
        ...prev,
        [wishListProduct.product_id]: false,
      }));
    }
  };

  return (
    <div className="w-full py-8 ">
    <div className=" px-4 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((items) => {
          const isInWishlist = wishlistItems.some(
            (wishlist) => wishlist?.product_id === items?.product_id
          );
          
          return (
            <div
              key={items.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-[#047857]/30"
            >
              {/* Product Image */}
              <div className="relative h-60 w-full bg-white flex items-center justify-center p-4">
                <img
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  src={items?.product_image}
                  alt={items.product_name}
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => handleAddToWishlist(items)}
                  disabled={isInWishlist}
                  className={`absolute top-3  right-3 p-2 rounded-full ${
                    isInWishlist
                      ? 'text-primary bg-gray-50 shadow-sm'
                      : 'text-gray-300 bg-white hover:text-primary'
                  }`}
                >
                  {loadingItems[items.product_id] ? (
                    <CSpinner size="sm" />
                  ) : (
                    <FaHeart className="text-[25px]" />
                  )}
                </button>
              </div>
  
              {/* Product Info */}
              <div className="p-4">
                <h3
                  onClick={() => handleShopNow(items.product_id)}
                  className="text-lg font-medium border-b-2 pb-2  text-[#1f2937] mb-2 cursor-pointer hover:text-[#047857] transition-colors line-clamp-2"
                  title={items.product_name}
                >
                  {items.product_name.length > 20
                    ? items.product_name.slice(0, 20) + '...'
                    : items.product_name}
                </h3>
  
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-[#047857]">
                    {symbol}: {ConvertPrice(items.product_price, rates, from)}
                  </span>
                  
                  <button
                    onClick={() => handleShopNow(items.product_id)}
                    className="px-4 py-2 bg-[#047857] text-white rounded-lg font-medium hover:bg-[#03684a] transition-colors text-sm"
                  >
                    {productLoading ? <CSpinner size="sm" /> : 'Shop Now'}
                  </button>
                </div>
              </div>
  
              {/* Accent Border Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
}

export default E_commerceCard;

// useEffect(() => {
//     async function compressImages() {
//         let compressedData = {};
//         for (let item of allProducts) {
//             try {
//                 const response = await fetch(item?.image); // Fetch image from backend
//                 const blob = await response.blob();
//                 const compressedBlob = await imageCompression(blob, {
//                     maxSizeMB: 0.1,  // Maximum size 100KB
//                     maxWidthOrHeight: 300, // Max height or width
//                     useWebWorker: true
//                 });
//                 compressedData[item.id] = URL.createObjectURL(compressedBlob);
//             } catch (error) {
//                 console.error("Error compressing image:", error);
//                 compressedData[item.id] = item.image; // If error, use original image
//             }
//         }
//         setCompressedImages(compressedData);
//     }

//     compressImages();
// }, [allProducts]);
