'use client'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/LibaryComponent/FlowbiteComponent/ProductCard'
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
    const productId = Object.values(CardsData).flat().find((item) => item.id === parseInt(params?.id))
    const product ={
      ...productId,quantity: 1
    }
    console.log("Product ITems",productId)
    // console.log("Params:", params?.id)
    // console.log("Product Details:", product) // Converting the string ID to a number

    useEffect(() => {
        if (!productId) {
            Swal.fire({
        icon: 'info',
                text: 'Endless Stock'
            })
            router.push('/home')
        }
    }, [productId])


    return (
      <>
      
       <ProductCard product={product}     />

        </>
      );
    };
    
export default Single_Product




  

 
