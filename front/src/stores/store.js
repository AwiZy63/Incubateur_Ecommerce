import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/Cart.slice';
import userReducer from './slices/User.slice';

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userReducer
    }
})