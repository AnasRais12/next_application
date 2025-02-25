export const calculateTotalproduct_price = (cart) => {
    return cart.reduce((total, item) => total + item.product_price * item.quantity, 0);
  };
