import React from 'react'                              
import { createSlice } from '@reduxjs/toolkit'

const initialState = { cart: [],value: 0 }


const CartSlice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = action.payload;     
      const existingItem = state.cart.find(item => item.id === cart.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...cart, quantity: 1 });
      }
      // Optional: Update value if needed
      // state.value += cart.price || 0; // Assuming cart items have a price
    }
  }
});

export const { addToCart } = CartSlice.actions;
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
