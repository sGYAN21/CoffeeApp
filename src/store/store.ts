import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favouriteReducer from './slices/favouriteSlice';
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
    auth:authReducer,
    orders: orderReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;