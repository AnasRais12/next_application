"use client";
import { RemoveFromWishList, setWishlist } from "@/app/store/features/wishList/WishList";
import { addToCart } from "@/app/store/features/CartReducer/CartSlice";
import { motion } from "framer-motion";
import useSession from "@/utils/UserExist/GetSession";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import CSpinner from "@/components/CSpinner";
import { getWishList } from "@/utils/reduxGlobalStates/ReduxStates";
import { useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
export default function Wishlist({ setWishlistModal }) {
  const wishlistItems = getWishList()
  const session = useSession()
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()

  const wishListToCart = (cartToWishList) => {
    console.log("CARTTOWISHLIST", cartToWishList)

    try {
      setloading(true)
      const wishListProduct = {
        id: cartToWishList?.id,
        image: cartToWishList?.image,
        ProductName: cartToWishList?.ProductName,
        Price: cartToWishList?.Price,
        desc: cartToWishList?.desc,
        quantity: 1
      }
      dispatch(addToCart(wishListProduct));
      dispatch(RemoveFromWishList(cartToWishList?.id))
      toast.success('Added to cart successfully!');
      setWishlistModal(false)

    } catch (error) {
      toast.warning(error);

    }
    finally {
      setloading(false)
    }
  };
  const deleteWishListItem = async (id) => {
    if (!session?.user?.id) {
      toast.error("User not logged in");
      return;
    }
    try {
      // Delete from Supabase wishlist table
      const { data, error } = await supabase
        .from("wishlist")
        .delete()
        .eq("product_id", id)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error deleting wishlist item:", error);
        toast.error("Failed to remove item from backend");
      } else {
        // Update Redux state if backend deletion is successful
        dispatch(RemoveFromWishList(id));
        toast.success("Item removed from wishlist");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error removing item");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white w-80 h-fit  shadow-lg p-3 overflow-y-auto"
      >
        {/* Header & Close Button */}
        <div className="flex justify-between  items-center border-b pb-2">
          <h2 className="text-lg font-semibold">My Wishlist</h2>
          <button onClick={() => setWishlistModal(false)}>
            <RxCross2 size={22} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Wishlist Items */}
        <ul className="mt-4 space-y-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col border-b pb-3 bg-gray-50 p-2 rounded transition duration-200"
              >
                <div className="flex items-center">
                  {/* Product Image */}
                  <img
                    src={`/${item.image}`}
                    alt={item.ProductName}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.ProductName}
                    </h3>
                    <p className="text-gray-600 text-md">${item.Price}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => wishListToCart(item)}
                    className="flex items-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-2 py-1 rounded"
                  >
                    {loading ? <CSpinner /> : (

                      <>
                        <FiShoppingCart className="mr-1" size={16} />
                        Add to cart
                      </>

                    )}
                  </button>
                  <button

                    className="flex items-center  text-[red] hover:text-[#ff3737] text-sm font-medium px-2 py-1 rounded"
                  >
                    <RxCross2
                      onClick={() => deleteWishListItem(item?.id)}
                      size={22} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No items in wishlist</p>
          )}
        </ul>
      </motion.div>
    </div>
  );
}
