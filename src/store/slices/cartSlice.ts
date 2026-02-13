import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../constants';

export interface CartItem extends Item {
  quantity: number;
}
interface CartState {
  items: Item[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.totalPrice += Number(action.payload.price);
    },
    removeFromCart: (state, action: PayloadAction<{ id: number, type: string }>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingItem) {
        state.totalPrice -= Number(existingItem.price);
        state.items = state.items.filter(
          item => !(item.id === action.payload.id && item.type === action.payload.type)
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;