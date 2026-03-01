import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../constants';

interface favouriteState {
    items: Item[];
}

const initialState: favouriteState = {
    items: [],
};

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourite: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
        addTofavourite: (state, action: PayloadAction<Item>) => {
            const exists = state.items.find(
                item => item.id === action.payload.id && item.type === action.payload.type
            );
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFromfavourite: (state, action: PayloadAction<{ id: string | number; type: string }>) => {
            state.items = state.items.filter(
                (item) => !(String(item.id) === String(action.payload.id) && item.type === action.payload.type)
            );
        },
        clearfavourite: (state) => {
            state.items = [];
        }
    },
});

export const { setFavourite, addTofavourite, removeFromfavourite, clearfavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;