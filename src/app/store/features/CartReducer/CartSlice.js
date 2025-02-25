import React from 'react'                              
import { createSlice } from '@reduxjs/toolkit'

const initialState = { cart: []  }


const CartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = action.payload;     
      console.log(cart, "Cart From Action")
        const existingItem = state.cart.find((items)=> items.product_id === cart.product_id)
      if(existingItem){
          existingItem.quantity+=1
      }
      else{
   state.cart.push({...cart})
      }
     
      
    },
    IncrementQunatity: (state,action) => {
         const itemId = action.payload
         const item = state.cart.find((items) => items.product_id === itemId)
         if(item){
          item.quantity +=1
         }
    },
    DecrementQuantity: (state,action) => {
      const itemId = action.payload
      const DecrementItem = state.cart.find((items)=> items.product_id === itemId )
      if(DecrementItem){
        if(DecrementItem.quantity > 1){
          DecrementItem.quantity -=1
        }
      }
    },
    RemoveFromCart: (state,action) => {
      const itemId = action.payload
      state.cart = state.cart.filter((items)=> items.product_id !== itemId)
    },
    setCartlist: (state, action) => {                      // supabase se wishlisst ka data yahan saved horaha hai 
      state.cart = action.payload; // Backend se data update
  }
  }
});

export const { addToCart,IncrementQunatity,DecrementQuantity,RemoveFromCart,setCartlist } = CartSlice.actions;
export const CartReducer = CartSlice.reducer;
// import slice
// create intial state
// used slice ({})
  // slice ka naam 
  // slice uski initial state jahan se start karwaana hai 
  // slice ke reducers
  // phr reducers se slice.actions karwana 
  // or reducer ko slic.reducer batanaa 
// Or Inhe Export karna phr 
