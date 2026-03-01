import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, doc, setDoc, deleteDoc } from '@react-native-firebase/firestore';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, ItemSize } from '../store/slices/cartSlice';
import { useSnackbar } from '../context/SnackbarContext';
import { Item } from '../constants';

export const useCartActions = () => {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();
    const userId = useSelector((state: RootState) => state.auth.user?.uid);
    const [isSyncing, setIsSyncing] = useState(false);

    const addItemToCart = async (item: Item, size: ItemSize, quantity: number = 1) => {
        if (!userId) {
            showSnackbar("Please login to add items to cart");
            return;
        }
        if (isSyncing) return;

        const cartDocId = `${userId}_${item.id}_${size}`;
        const cartRef = doc(getFirestore(), 'carts', cartDocId);

        try {
            setIsSyncing(true);
            const currentPrice = item.price[size];

            const cartItemData = {
                productId: item.id.toString(),
                userId: userId,
                name: item.name,
                image: typeof item.image === 'string' ? item.image : "",
                price: currentPrice,
                quantitiy: quantity.toString(), // Kept spelling for your DB consistency
                size: size,
                type: item.type,
                updatedAt: new Date().toISOString(),
            };

            await setDoc(cartRef, cartItemData);

            dispatch(addToCart({
                ...item,
                selectedSize: size,
                quantity: quantity,
                selected: true,
            }));

            showSnackbar(`${item.name} (${size}) added to cart!`);
        } catch (error) {
            console.error("Add to cart error:", error);
            showSnackbar("Failed to sync cart");
        } finally {
            setIsSyncing(false);
        }
    };

    const removeItemFromCart = async (
        itemId: string | number,
        name: string,
        type: string,
        size: ItemSize) => {
        if (!userId || isSyncing) return;

        const cartDocId = `${userId}_${itemId}_${size}`;
        const cartRef = doc(getFirestore(), 'carts', cartDocId);

        try {
            setIsSyncing(true);
            await deleteDoc(cartRef);
            dispatch(removeFromCart({ id: itemId, type, size }));
            showSnackbar(`${name} (${size}) removed from cart!`);
        } catch (error) {
            console.error("Remove from cart error:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    return { addItemToCart, removeItemFromCart, isSyncing };
};