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
        const existingItem = state.cart.find((items)=> items.id === cart.id)
      if(existingItem){
          existingItem.quantity+=1
      }
      else{
   state.cart.push({...cart})
      }
     
      
    },
    IncrementQunatity: (state,action) => {
         const itemId = action.payload
         const item = state.cart.find((items) => items.id === itemId)
         if(item){
          item.quantity +=1
         }
    },
    DecrementQuantity: (state,action) => {
      const itemId = action.payload
      const DecrementItem = state.cart.find((items)=> items.id === itemId )
      if(DecrementItem){
        if(DecrementItem.quantity > 1){
          DecrementItem.quantity -=1
        }
      }

    }
  }
});

export const { addToCart,IncrementQunatity,DecrementQuantity } = CartSlice.actions;
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
