import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderModel } from '../../types/types';

interface OrderState {
  orderHistory: OrderModel[];
  activeOrder: OrderModel | null;
  loading: boolean;
}

const initialState: OrderState = {
  orderHistory: [],
  activeOrder: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    
    addOrderToHistory: (state, action: PayloadAction<OrderModel[]>) => {
      state.orderHistory = [...action.payload, ...state.orderHistory];
      state.activeOrder = action.payload[0]; 
    },
   

    setOrderHistory: (state, action: PayloadAction<OrderModel[]>) => {
      state.orderHistory = action.payload;
    },

    clearActiveOrder: (state) => {
      state.activeOrder = null;
    }
  },
});

export const { addOrderToHistory, setOrderHistory, clearActiveOrder } = orderSlice.actions;
export default orderSlice.reducer;