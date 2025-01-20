import { configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./features/CartReducer/CartSlice";
import { counterReducer } from "./features/counter/CounterSlice";
export const store = configureStore({
    reducer:{
        lime:counterReducer,
        cartItem: CartReducer 
    },
})