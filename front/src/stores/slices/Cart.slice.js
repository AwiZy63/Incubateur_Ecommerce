import { createSlice } from "@reduxjs/toolkit";
import { notify } from "../../App";

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
            notify("success", `Vous avez ajouté ${newItem.quantity} ${newItem.name} à votre panier`);
        },
        removeFromCart: (state, action) => {
            const { itemId, outOfStock } = action.payload;
            const itemToRemove = state.cartItems.find((item) => item.id === itemId);

            console.log(itemToRemove)
            if (!outOfStock) {
                notify("info", `Vous avez supprimé ${itemToRemove.quantity} ${itemToRemove.name} de votre panier`);
            }
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.cartItems.find((item) => item.id === itemId);

            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
        emptyCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;