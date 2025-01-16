import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '@/app/store/features/CartReducer/CartSlice';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import { useDispatch,useSelector } from 'react-redux';

const ProductCard = (props) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart || []);
  console.log("Cart",cart)
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className='flex min-h-screen justify-center items-center bg-custom-bg  p-4'>
      <div className='flex flex-col md:flex-row max-w-6xl w-full mx-auto py-4 px-4 bg-gray-100 shadow-lg shadow-black rounded-xl  overflow-hidden'>
        <div className='w-full md:w-1/2 border-4 h-64 md:h-auto'>
          <img
            className='h-full w-full object-containn md:object-cover transition duration-300 ease-in-out transform hover:scale-105'
            src={`/${props?.image}`}
            alt='Red Nike running shoe'
          />
        </div>
        <div className='w-full flex flex-col justify-center items-center md:w-1/2 p-6 md:p-8'>
          <h2 className='w-full mt-1 text-xl md:text-2xl leading-tight font-medium text-black'>{props?.ProductName}</h2>
          <p className='mt-2 text-gray-500 text-sm md:text-base'>{props?.desc}</p>
          <div className='mt-4 w-full flex items-center justify-between'>
            <span className='text-2xl md:text-3xl font-bold text-gray-900'>${props?.Price}</span>
            <div className='text-gray-700 text-sm md:text-base'>{props?.id}</div>
          </div>
          
          <div className='mt-6 md:mt-8  w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
            <button className='w-full sm:w-auto flex-1 bg-indigo-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base'>
              Buy Now
            </button>
            <button  onClick={() => handleAddToCart(props.id)} className='w-full sm:w-auto flex items-center justify-center bg-gray-200 text-gray-700 py-2 md:py-3 px-4 md:px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base'>
              <FaShoppingCart className='mr-2' /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;












{/* <div className='w-full justify-start bg-[#e4e4e4] md:hidden block px-4 md:px-6  py-4 '>
            <button onClick={()=> router.push('/home')}><FaArrowLeft className='text-black' size={30}/></button>
          </div> */}
// import { FaArrowLeft } from "react-icons/fa";
