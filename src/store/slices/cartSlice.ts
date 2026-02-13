import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../constants';

export interface CartItem extends Item {
  quantity: number;
  selected: boolean;
}
interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const calculateTotal = (items: CartItem[]) => {
  return items
    .filter(item => item.selected)
    .reduce((total, item) => total + Number(item.price) * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
  const existingItem = state.items.find(
        item => item.id === action.payload.id && item.type === action.payload.type
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add new item with initial quantity of 1
        state.items.push({ ...action.payload, quantity: 1, selected: true });
      }
     state.totalPrice = calculateTotal(state.items);
    },
    toggleItemSelection: (state, action: PayloadAction<{ id: number; type: string }>) => {
      const item = state.items.find(
        i => i.id === action.payload.id && i.type === action.payload.type
      );
      if (item) {
        item.selected = !item.selected;
        state.totalPrice = calculateTotal(state.items);
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: number, type: string }>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalPrice -= Number(item.price);
        } else {
          // If quantity is 1 and user hits minus, remove it entirely
          state.totalPrice -= Number(item.price);
          state.items.splice(itemIndex, 1);
        }
      }
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

export const { addToCart, removeFromCart,decrementQuantity, clearCart,toggleItemSelection } = cartSlice.actions;
export default cartSlice.reducer;