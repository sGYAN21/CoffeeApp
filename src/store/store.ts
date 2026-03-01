import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favouriteReducer from './slices/favouriteSlice';
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;