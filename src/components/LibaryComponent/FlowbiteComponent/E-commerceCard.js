'use client'
import React, { useState, useEffect } from 'react';
import useSession from '@/utils/UserExist/GetSession';
import { supabase } from '@/lib/supabase';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import Swal from 'sweetalert2';
import { addtoWishList } from "@/app/store/features/wishList/WishList";
import { getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import CSpinner from '@/components/CSpinner';

function E_commerceCard() {
    const session = useSession()
    const dispatch = useDispatch()
    const [productLoading, setProductLoading] = useState(false)
    const [loadingItems, setLoadingItems] = useState({}); // Individual loading state
    const wishlistItems = getWishList()
    const allProducts = Object.values(CardsData).flat();
    const router = useRouter()
    const handleShopNow = (id) => {
        setProductLoading(true)
        try {
            router.push(`/product/${id}`)
        } catch (error) {
            console.log(error)
        }
        finally {
            setProductLoading(false)

        }
    }
    console.log("session!", session)
    const handleAddToWishlist = async (wishListProduct) => {
        if (!session?.user?.id) {
            Swal.fire({
                text: 'Please login to add items to wishlist',
                icon: 'info',
                confirmButtonText: 'Ok'
            })
            return;
        }
        try {
            const userId = session?.user?.id;
            setLoadingItems((prev) => ({ ...prev, [wishListProduct.product_id]: true })); // S
            const { data, error } = await supabase
                .from('wishlist')
                .insert([
                    {
                        user_id: userId, // Ensure user is logged in
                        product_id: wishListProduct?.product_id,
                        product_name: wishListProduct?.product_name,
                        product_price: wishListProduct?.product_price,
                        product_image: wishListProduct?.image,
                        // Optionally, include description or quantity if needed
                    }
                ]);

            if (error) {
                console.error("Error saving wishlist item to database:", error);
                toast.error("Failed to save wishlist item");
            } else {
                const productWishlist = {
                    product_id: wishListProduct?.product_id,
                    image: wishListProduct?.image,
                    product_name: wishListProduct?.product_name,
                    desc: wishListProduct?.desc,
                    product_price: wishListProduct?.product_price,
                }
                dispatch(addtoWishList(productWishlist));
                toast.success('Added to Wishlist');

            }
        } catch (error) {
            toast.warning(error.toString());

        }
        finally {
            setLoadingItems((prev) => ({ ...prev, [wishListProduct.product_id]: false }));
        }


    };



    return (
        <div className='w-full justify-center  mb-4 items-center text-[40px] font-semibold text-center text-black'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4 md:px-6 pb-8  justify-items-center">
                {allProducts.map((items) => {
                    // Check if the item is already in the wishlist
                    const isInWishlist = wishlistItems.some(wishlist => wishlist?.product_id === items?.product_id);
                    return (
                        <div key={items.id} className="w-full relative shadow-orange-500 border-2 hover:shadow-lg border-gray-200 rounded-lg">
                            <div className='flex justify-center mb-4 border-b-2 bg-gray-50'>
                                <img
                                    className="w-full h-[200px] aspect-[1/1] object-contain"
                                    src={items?.product_image}
                                    alt="product image"
                                />
                            </div>
                            <div className="pb-3">
                                <div className='border-b-2 pb-2 flex justify-between items-center text-left px-2 pr-4 gap-3'>
                                    <h5
                                        onClick={() => items.product_name.length > 20 ? handleShopNow(items.product_id) : null}
                                        className="xl:text-xl text-xl lg:text-[22px] sm:text-[17px] md:text-[20px] text-[15px] font-normal tracking-tight cursor-pointer text-gray-900 dark:text-white"
                                    >
                                        {items.product_name.length > 20 ? items.product_name.slice(0, 20) + "..." : items.product_name}
                                    </h5>
                                    <button
                                        onClick={() => handleAddToWishlist(items)}
                                        disabled={isInWishlist}
                                        className={isInWishlist
                                            ? "text-[25px] text-orange-400 cursor-not-allowed"
                                            : "text-[25px] text-gray-300 hover:text-orange-400"
                                        }
                                    >
                                        {loadingItems[items.product_id] ? <CSpinner /> : <FaHeart />}
                                    </button>
                                </div>

                                <div className="flex px-4 mt-3 gap-3 items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${items.product_price}</span>
                                    <button
                                        onClick={() => handleShopNow(items.product_id)}
                                        className="text-white bg-unique hover:bg-unique focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:px-5 px-3 sm:py-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                    {productLoading? <CSpinner/> : 'Shop Now' }
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


    )
}

export default E_commerceCard














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