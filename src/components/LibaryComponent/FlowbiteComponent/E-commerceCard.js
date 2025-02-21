'use client'
import React, { useState, useEffect } from 'react';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart, FiUser, FiSearch,FiHeart } from "react-icons/fi";
import { useRouter } from 'next/navigation';

function E_commerceCard() {
    const allProducts = Object.values(CardsData).flat();
    const router = useRouter()
    // const [compressedImages, setCompressedImages] = useState({}); // Store compressed images
    const handleShopNow = (id) => {
        router.push(`/product/${id}`)
    }
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

    return (
        <div className='w-full justify-center pt-5 mb-4 items-center text-[40px] font-semibold text-center text-black'>
            <div className="grid grid-cols-1 sm:grid-cols-2 px-4 md:px-6 pb-8 justify-items-center md:grid-cols-2 xl:grid-cols-4 py-6 gap-4">
                {allProducts.map((items) => (
                    <div key={items.id} className="w-full relative shadow-orange-500 border-2 hover:shadow-lg border-gray-200 rounded-lg">
                        <div className='flex justify-center mb-4 border-b-2 bg-gray-50'>
                            <img
                                className="w-full  h-[200px] aspect-[1/1] object-contain"
                                src={items?.image}
                                alt="product image"
                            />
                        </div>
                        <div className="pb-3 ">
                            <div className='border-b-2 text-left px-4'>
                                <h5 onClick={() => items.ProductName.length > 20 ? handleShopNow(items.id) : null} className="xl:text-xl text-xl  lg:text-[22px] sm:text-[17px] md:text-[20px] text-[15px] font-normal mb-2 tracking-tight cursor-pointer  text-gray-900 dark:text-white"> {items.ProductName.length > 20 ? items.ProductName.slice(0, 20) + "..." : items.ProductName}</h5>
                            </div>

                            <div className="flex  px-4 mt-3 gap-3 items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${items.Price}</span>
                                <button onClick={() => handleShopNow(items.id)} className="text-white bg-unique hover:bg-unique focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:px-5 px-3 sm:py-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shop Now</button>
                            </div>
                        </div>
                        <button onClick={() => handleShopNow(items.id)} className=" text-[25px] text-gray-200 hover:text-orange-400 absolute top-2 left-4 lg:right-4"><FaHeart className=''/></button>

                    </div>
                ))}
            </div>

        </div>

    )
}

export default E_commerceCard