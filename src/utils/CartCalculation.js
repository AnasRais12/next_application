export const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  };
