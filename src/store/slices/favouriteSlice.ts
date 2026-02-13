import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../constants';

interface favouriteState {
    items: Item[];
}

const initialState: favouriteState = {
    items: [],
};

export const favouriteSlice = createSlice({
    name: 'favourite ',
    initialState,
    reducers: {
        addTofavourite: (state, action: PayloadAction<Item>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },

        removeFromfavourite: (state, action: PayloadAction<{ id: number; type: string }>) => {
            state.items = state.items.filter(
                (item) => !(item.id === action.payload.id && item.type === action.payload.type)
            );
        },
        clearfavourite: (state) => {
            state.items = [];
        }
    },
});

export const { addTofavourite, removeFromfavourite, clearfavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;