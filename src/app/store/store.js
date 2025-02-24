import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./features/CartReducer/CartSlice";
import { WishListReducer } from "./features/wishList/WishList";
export const store = configureStore({
    reducer:{
        cartItem: CartReducer ,
        wishListItem: WishListReducer
    },
})