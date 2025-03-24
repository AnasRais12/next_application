import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from './features/CartReducer/CartSlice';
import { userAddressReducer } from './features/userAddress/UserAddress';
import { WishListReducer } from './features/wishList/WishList';
export const store = configureStore({
  reducer: {
    cartItem: CartReducer,
    userAddressList: userAddressReducer,
    wishListItem: WishListReducer,
  },
});
