import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { addToCart, IncrementQunatity, DecrementQuantity } from '@/app/store/features/CartReducer/CartSlice';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import { useDispatch, useSelector, } from 'react-redux';
const ProductCard = (props) => {
  console.log("Props", props.product.image);
  const [quantity, setQuantity] = useState(props.product?.quantity || 1);
  const dispatch = useDispatch();
  const cart = useSelector((state => state?.cartItem?.cart) || "")
  console.log("Cart", cart);

  const existingProduct = cart.find((item) => item.id === props?.product?.id);
  console.log("Exist Prod",existingProduct)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const DecrementQuantity = () => {
    if(quantity > 1){
    setQuantity(quantity - 1)

    }
  }
 
  const handleAddToCart = () => {
    const productCart = {
      id: props.product?.id,
      image: props?.product?.image,
      ProductName: props?.product?.ProductName,
      Price: props?.product?.Price,
      desc: props?.product?.desc,
      quantity,
    }
    dispatch(addToCart(productCart));
  };
  console.log("Cart Product Page wala ", cart)


  return (
    <div className='flex min-h-screen justify-center items-center bg-custom-bg  p-4'>
      <div className='flex flex-col md:flex-row max-w-6xl w-full mx-auto py-4 px-4 bg-gray-100 shadow-lg shadow-black rounded-xl  overflow-hidden'>
        <div className='w-full md:w-1/2 border-4 h-64 md:h-auto'>
          <img
            className='h-full w-full object-containn md:object-cover transition duration-300 ease-in-out transform hover:scale-105'
            src={`/${props?.product?.image}`}
            alt='Red Nike running shoe'
          />
        </div>
        <div className='w-full flex flex-col justify-center items-center md:w-1/2 p-6 md:p-8'>
          <h2 className='w-full mt-1 text-xl md:text-2xl leading-tight font-medium text-black'>{props?.product?.ProductName}</h2>
          <p className='mt-2 text-gray-500 text-sm md:text-base'>{props?.product?.desc}</p>
          <div className='mt-4 w-full flex items-center justify-between'>
            <span className='text-2xl md:text-3xl font-bold text-gray-900'>${props?.product?.Price}</span>
            <div className='text-gray-700 text-sm md:text-base'>{props?.product?.id}</div>
          </div>

          <div className='mt-6 md:mt-8  w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
            <div className='flex gap-5 items-center'>
              <button onClick={DecrementQuantity} className={`w-full  sm:w-auto flex-1 ${existingProduct? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ' bg-indigo-600 text-white'} py-2 md:py-3 px-4 md:px-6 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base`}>
                -              </button>
              <p className='text-black py-3 text-center px-3 '>{quantity} </p>
              <button onClick={ handleIncrement} className={`w-full  sm:w-auto flex-1 ${existingProduct? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ' bg-indigo-600 text-white'} py-2 md:py-3 px-4 md:px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base`}>
                +
              </button>
            </div>
            <button
              disabled={existingProduct}
              onClick={handleAddToCart} className={`${existingProduct? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ' bg-indigo-600 text-white'} w-full sm:w-auto flex border-2 shadow-md  items-center justify-center  py-2 md:py-3 px-4 md:px-6 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base`}>
             {existingProduct? 'Added' :  (<><FaShoppingCart className='mr-2' /> Add to Cart</>)}
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
