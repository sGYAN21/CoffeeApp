import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favouriteReducer from './slices/favouriteSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourite: favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;