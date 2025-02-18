import { useSelector } from "react-redux";
export const getCart = () => useSelector((state) => state?.cartItem?.cart || []);

