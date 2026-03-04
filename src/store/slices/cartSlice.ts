
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../types/types';

export type ItemSize = 'small' | 'medium' | 'large';

export interface CartItem extends Item {
  quantity: number;
  selected: boolean;
  selectedSize: ItemSize;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const getNumericValue = (item: CartItem, key: 'price' | 'volume'): number => {
  const data = item[key];
  const size = item.selectedSize;

  const rawValue = (typeof data === 'object' && data !== null) ? data[size] : data;
  
  const cleanValue = typeof rawValue === 'string' 
    ? parseFloat(rawValue.replace(/[^0-9.-]+/g, "")) 
    : Number(rawValue);

  return isNaN(cleanValue) ? 0 : cleanValue;
};

const calculateTotal = (items: CartItem[]) => {
  return items
    .filter(item => item.selected)
    .reduce((total, item) => {
      const price = getNumericValue(item, 'price');
      return total + price * item.quantity;
    }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalPrice = calculateTotal(state.items);
    },
    // Corrected to handle the wrapped payload from your CartScreen
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        i => i.id === item.id && i.type === item.type && i.selectedSize === item.selectedSize
      );

      if (existingItem) {
      existingItem.quantity = item.quantity;
      } else {
        state.items.push({ ...item, selected: true });
      }
      state.totalPrice = calculateTotal(state.items);
    },

    toggleItemSelection: (state, action: PayloadAction<{ id: string | number; type: string; size: ItemSize }>) => {
      const item = state.items.find(
        i => i.id === action.payload.id && i.type === action.payload.type && i.selectedSize === action.payload.size
      );
      if (item) {
        item.selected = !item.selected;
        state.totalPrice = calculateTotal(state.items);
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: string | number; type: string; size: ItemSize }>) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type && item.selectedSize === action.payload.size
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        state.totalPrice = calculateTotal(state.items);
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string | number; type: string; size: ItemSize }>) => {
      state.items = state.items.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type && item.selectedSize === action.payload.size)
      );
      state.totalPrice = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

export const { setCart,addToCart, removeFromCart, decrementQuantity, clearCart, toggleItemSelection } = cartSlice.actions;
export default cartSlice.reducer;