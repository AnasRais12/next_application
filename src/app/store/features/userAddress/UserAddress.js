import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { userAddress: [] };

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {
    addUserAddress: (state, action) => {
      const userAddressLoad = action.payload;
      state.userAddress.push({ ...userAddressLoad });
    },
    setUserAddress: (state, action) => {
      // supabase se wishlisst ka data yahan saved horaha hai
      state.userAddress = action.payload; // Backend se data update
    },
  },
});

export const { addUserAddress, setUserAddress } = userAddressSlice.actions;
export const userAddressReducer = userAddressSlice.reducer;
