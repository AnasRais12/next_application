
export const cartIncrement = async (id, cart, dispatch, supabase, IncrementQunatity,userId) => {
    try {
        const item = cart.find((item) => item.product_id === id);
        if (!item) return;
        const newQuantity = item.quantity + 1;

        const { error } = await supabase
            .from("cart")
            .update({ quantity: newQuantity })
            .eq("product_id", id)
            .eq("user_id", userId);

        if (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        } else {
            dispatch(IncrementQunatity(id));
        }
    } catch (err) {
        console.error(err);
        toast.error(err.toString());
    }
};

export const cartDecrement = async (id, cart, dispatch, supabase,  DecrementQuantity,userId) => {
    console.log('adasdadsadsasdads')
    try {
        const item = cart.find((item) => item.product_id === id);
        console.log('true')

        if (!item || item.quantity <= 1) return;

        console.log('falsesaeaseaeasea')

        const newQuantity = item.quantity - 1;

        const { error } = await supabase
            .from("cart")
            .update({ quantity: newQuantity })
            .eq("product_id", id)
            .eq("user_id", userId);

        if (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        } else {
            dispatch(DecrementQuantity(id));
        }
    } catch (err) {
        console.error(err);
        toast.error(err.toString());
    }
};

export const deleteCartItem = async (id, supabase, session, dispatch, RemoveFromCart, toast, setCrossButtonLoading, setRemoveCart) => {
    if (!session?.user?.id) {
        toast.error("User not logged in");
        return;
    }

    try {
        setCrossButtonLoading((prev) => ({ ...prev, [id]: true })); // 🔄 Button loading state ON

        const { error } = await supabase
            .from("cart")
            .delete()
            .eq("product_id", id)
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Error deleting cart item from database:", error);
            toast.error("Failed to remove item from cart");
            return;
        }

        dispatch(RemoveFromCart(id)); // 🛒 Redux state update
        toast.success("Item removed from cart successfully");
        setRemoveCart(false);
    } catch (err) {
        console.error("An error occurred while removing the item:", err);
        toast.error("An error occurred while removing the item");
    } finally {
        setCrossButtonLoading((prev) => ({ ...prev, [id]: false })); // 🔄 Button loading state OFF
    }
};