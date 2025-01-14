import { createSlice } from "@reduxjs/toolkit"
const initialState = { value: 0 }
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value = state.value + 1
        },
        decrement: (state) => {
            if (state.value > 0) {
                state.value -= 1

            }
        },
        IncremntByAmount: (state,action) => {
            state.value += action.payload
        },
        IncreasedAmountWithName: (state, action) => {
            state.value += action.payload

        }
    }
}) 
console.log("Counter Slice + ",counterSlice)

export const { increment, decrement, IncremntByAmount, IncreasedAmountWithName } = counterSlice.actions
export const counterReducer = counterSlice.reducer 

