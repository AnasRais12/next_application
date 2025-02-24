import { useSelector } from "react-redux";
export const getCart = () => useSelector((state) => state?.cartItem?.cart || []);
export const getWishList = () => useSelector((state) => state?.wishListItem?.wishList || []);

