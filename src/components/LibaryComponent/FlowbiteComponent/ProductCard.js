import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CSpinner from '@/components/CSpinner';
import Swal from 'sweetalert2';
import useSession from '@/utils/UserExist/GetSession';
import { getCart } from '@/utils/reduxGlobalStates/ReduxStates';
import { supabase } from '@/lib/supabase';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import {
  addToCart,
  IncrementQunatity,
  DecrementQuantity,
} from '@/app/store/features/CartReducer/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
const ProductCard = (props) => {
  const { data } = props;
  console.log(data, 'ye raha mera product');
  const [quantity, setQuantity] = useState(props.product?.quantity || 1);
  const session = useSession();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const cart = getCart();
  const existingProduct = cart.find(
    (item) => item.product_id === data?.product_id
  );
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      Swal.fire({
        icon: 'info',
        text: 'Please login first if you  add items to cart',
      });
      return;
    }
    try {
      setloading(true);
      const productCart = {
        product_id: data?.product_id,
        product_image: data?.product_image,
        product_name: data?.product_name,
        product_price: data?.product_price,
        desc: data?.desc,
        quantity,
      };
      console.log('ProductCart', productCart);
      const { dataItems, error } = await supabase.from('cart').insert([
        {
          user_id: session?.user?.id,
          product_id: data?.product_id,
          product_name: data?.product_name,
          product_price: data?.product_price,
          product_image: data?.image,
          quantity: quantity,
        },
      ]);

      if (error) {
        console.error('Error saving cart item to database:', error);
        toast.error('Failed to add item to cart');
        return;
      }

      // Update local Redux state if database insertion is successful
      dispatch(addToCart(productCart));
      toast.success('Added to cart successfully!');
    } catch (error) {
      toast.warning(error.toString());
    } finally {
      setloading(false);
    }
  };
  console.log('Cart Product Page wala ', cart);
  console.log('Cart', cart);

  return (
    <div className="font-[sans-serif] mt-20 py-10 flex justify-center p-4 bg-gray-50">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
          <div className="w-full lg:sticky top-0">
            <div className="flex flex-col gap-4">
              <div className="bg-white shadow p-2">
                <img
                  src={`/${data?.product_image}`}
                  alt="Product"
                  className="w-full  aspect-[11/8] object-cover object-top"
                />
              </div>

              {/* /Sugeestion Images */}
              <div className="bg-white p-2 w-full max-w-full overflow-auto">
                <div className="flex justify-between flex-row gap-4 shrink-0">
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-1.webp"
                    alt="Product1"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black"
                  />
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-2.webp"
                    alt="Product2"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent"
                  />
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-3.webp"
                    alt="Product3"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent"
                  />
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-1.webp"
                    alt="Product1"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-black"
                  />
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-2.webp"
                    alt="Product2"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent"
                  />
                  <img
                    src="https://readymadeui.com/images/sunscreen-img-3.webp"
                    alt="Product3"
                    className="w-16 h-16 aspect-square object-cover object-top cursor-pointer shadow-md border-b-2 border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:pt-16">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {data?.product_name}
              </h3>
              <div className="mt-2">
                <p className="text-gray-500 mt-1 text-sm">{data?.desc}</p>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-4">
              <h4 className="text-unique text-2xl sm:text-3xl font-bold">
                ${data?.product_price}
              </h4>
            </div>

            <hr className="lg:my-6 my-2 border-gray-300" />

            <div>
              <div className="flex gap-2 items-center   bg-inherit px-3 py-2.5 w-max rounded-lg">
                <button
                  onClick={handleDecrement}
                  disabled={existingProduct}
                  type="button"
                  className="flex items-center justify-center w-8 h-8 bg-gray-300 hover:text-white rounded-full hover:bg-orange-600  focus:outline-none  transition duration-200 ease-in-out"
                >
                  <AiOutlineMinus />
                </button>

                {/* Quantity Display */}
                <span className="text-gray-800 text-sm font-semibold px-3">
                  {quantity}
                </span>
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
                  onClick={handleAddToCart}
                  type="button"
                  className={`px-4 py-3 w-[45%] rounded-[10px] ${existingProduct ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ' bg-unique text-white'} text-sm font-semibold`}
                >
                  {loading ? (
                    <CSpinner />
                  ) : existingProduct ? (
                    'Added'
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button
                  type="button"
                  className="px-4 py-3 w-[45%] border  bg-unique text-white rounded-[10px] text-sm font-semibold"
                >
                  Buy it now
                </button>
                <div className="w-full justify-center flex items-center">
                  <p className="text-sm underline pb-1">
                    <Link href="/home" className="text-unique">
                      Back To Home
                    </Link>
                  </p>
                </div>
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

{
  /* <div classNameName='w-full justify-start bg-[#e4e4e4] md:hidden block px-4 md:px-6  py-4 '>
            <button onClick={()=> router.push('/home')}><FaArrowLeft classNameName='text-black' size={30}/></button>
          </div> */
}
// import { FaArrowLeft } from "react-icons/fa";
