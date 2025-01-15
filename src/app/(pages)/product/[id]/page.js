'use client'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { CardsData } from '@/utils/ProductsDetailPages/ProductData'
import { useParams } from 'next/navigation'
function Single_Product() {
    const [cartQuantity, setCartQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
  const handleAddToCart = () => setCartQuantity(cartQuantity + quantity);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'];
    const params = useParams()
    const router = useRouter()
    const product = Object.values(CardsData).flat().find((item) => item.id === parseInt(params?.id))
    console.log("Params:", params?.id)
    console.log("Product Details:", product) // Converting the string ID to a number

    useEffect(() => {
        if (!product) {
            Swal.fire({
        icon: 'info',
                text: 'Endless Stock'
            })
            router.push('/home')
        }
    }, [product])


    return (
        <div className='flex h-fit md:min-h-screen justify-center items-center md:items-center bg-[#e4e4e4] p-0 sm:p-4'>
          <div className='flex flex-col md:flex-row xl:w-[100%] py-3 px-1 sm:px-4 lg:w-full mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden'>
            <div className='w-full md:w-1/2 h-64 md:h-auto bg-gray-200'>
              <img
                className='h-full w-full rounded-[10px] object-cover transition duration-300 ease-in-out transform hover:scale-105'
                src={`/${product.image}`}
                alt='Red Nike running shoe'
              />
            </div>
            <div className='w-full md:w-1/2 p-6  flex flex-col gap-2 pt-24 '>
              <h2 className='block mt-1 text-xl md:text-2xl leading-tight font-medium text-black'>{product.ProductName}</h2>
              <p className='mt-2 text-gray-500 text-sm md:text-base'>The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor.</p>
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-2xl md:text-3xl font-bold text-gray-900'>${product.Price}</span>
                <div className='text-gray-700 text-sm md:text-base'>User:{product.id}</div>
              </div>
              {/* <div className='mt-4'>
                <span className='text-gray-700 text-sm md:text-base'>Size:</span>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded-full ${
                        selectedSize === size
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div> */}
              <div className='mt-6 md:mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
                <button className='w-full sm:w-auto flex-1 bg-indigo-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base'>
                  Buy Now
                </button>
                <button className='w-full sm:w-auto flex items-center justify-center bg-gray-200 text-gray-700 py-2 md:py-3 px-4 md:px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out text-sm md:text-base'>
                  <FaShoppingCart className='mr-2' /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default Single_Product




  

 
