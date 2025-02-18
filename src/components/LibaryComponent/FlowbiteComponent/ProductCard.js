import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GrAdd } from "react-icons/gr";
import { TfiMinus } from "react-icons/tfi";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { addToCart, IncrementQunatity, DecrementQuantity } from '@/app/store/features/CartReducer/CartSlice';
import { CardsData } from '@/utils/ProductsDetailPages/ProductData';
import { useDispatch, useSelector, } from 'react-redux';
const ProductCard = (props) => {
  console.log("Props", props);
  const [quantity, setQuantity] = useState(props.product?.quantity || 1);
  const dispatch = useDispatch();
  const cart = useSelector((state => state?.cartItem?.cart) || "")

  const existingProduct = cart.find((item) => item.id === props?.product?.id);
  console.log("Exist Prod", existingProduct)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
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
  console.log("Cart", cart);



  return (
    <div className="font-[sans-serif] mt-20 h-screen flex justify-center p-4 bg-gray-100">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
          <div className="w-full lg:sticky top-0">
            <div className="flex flex-col gap-4">
              <div className="bg-white shadow p-2">
                <img src={`/${props.product.image}`} alt="Product"
                  className="w-full  aspect-[11/8] object-cover object-top" />
              </div>

              {/* /Sugeestion Images */}
              <div className="bg-white p-2 w-full max-w-full overflow-auto">
                <div className="flex justify-between flex-row gap-4 shrink-0">
                  <img src="https://readymadeui.com/images/sunscreen-img-1.webp" alt="Product1"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black" />
                  <img src="https://readymadeui.com/images/sunscreen-img-2.webp" alt="Product2"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
                  <img src="https://readymadeui.com/images/sunscreen-img-3.webp" alt="Product3"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
                  <img src="https://readymadeui.com/images/sunscreen-img-1.webp" alt="Product1"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black" />
                  <img src="https://readymadeui.com/images/sunscreen-img-2.webp" alt="Product2"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
                  <img src="https://readymadeui.com/images/sunscreen-img-3.webp" alt="Product3"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:pt-16">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{props?.product?.ProductName}</h3>
              {/* <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <p className="text-base text-gray-500">4</p>
                <svg className="w-4 h-4 bg-orange-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 bg-orange-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 bg-orange-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 bg-orange-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
              <span className="text-gray-500">|</span>
              <p className="text-sm text-gray-500">76 Ratings</p>
              <span className="text-gray-500">|</span>
              <p className="text-sm text-gray-500">50 Reviews</p>
            </div> */}
              <div className="mt-2">
                <p className="text-gray-500 mt-1 text-sm">{props?.product?.desc}</p>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-4">
              <h4 className="text-unique text-2xl sm:text-3xl font-bold">${props?.product?.Price}</h4>
            </div>


            <hr className="lg:my-6 my-2 border-gray-300" />

            <div>
              <div className="flex gap-2 items-center   bg-inherit px-3 py-2.5 w-max rounded-lg">
                {/* Decrement Button */}
                {/* Increment Button */}
                <button onClick={handleDecrement}
                  disabled={existingProduct}
                  type="button"
                  className="flex items-center justify-center w-8 h-8 bg-gray-300 hover:text-white rounded-full hover:bg-orange-600  focus:outline-none  transition duration-200 ease-in-out"
                >
                  <AiOutlineMinus />

                </button>

                {/* Quantity Display */}
                <span className="text-gray-800 text-sm font-semibold px-3">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={existingProduct}
                  type="button"
                  className="flex items-center justify-center w-8 h-8 bg-gray-300 hover:text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out"
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <button
                  disabled={existingProduct}
                  onClick={handleAddToCart} type="button"
                  className={`px-4 py-3 w-[45%] rounded-[10px] ${existingProduct ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ' bg-unique text-white'} text-sm font-semibold`}>
                  {existingProduct ? 'Added' : 'Add to Cart'}
                </button>
                <button type="button"
                  className="px-4 py-3 w-[45%] border  bg-unique text-white rounded-[10px] text-sm font-semibold">Buy
                  it now</button>
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;












{/* <div classNameName='w-full justify-start bg-[#e4e4e4] md:hidden block px-4 md:px-6  py-4 '>
            <button onClick={()=> router.push('/home')}><FaArrowLeft classNameName='text-black' size={30}/></button>
          </div> */}
// import { FaArrowLeft } from "react-icons/fa";
