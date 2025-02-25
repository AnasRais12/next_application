import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { wishList: [] };


const WishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addtoWishList: (state, action) => {
            console.log(action.payload,"))))))))))))))))))))payload")
            const wishListload = action.payload;
            state.wishList.push({ ...wishListload })
        },

        RemoveFromWishList: (state,action) => {
            const wishListId = action.payload
            state.wishList = state.wishList.filter((items)=> items.product_id !== wishListId)
          },
          setWishlist: (state, action) => {                      // supabase se wishlisst ka data yahan saved horaha hai 
            state.wishList = action.payload; // Backend se data update
        }
    }
})

export const { addtoWishList, RemoveFromWishList,setWishlist } = WishListSlice.actions;
export const WishListReducer = WishListSlice.reducer;