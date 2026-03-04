import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, doc, setDoc, deleteDoc } from '@react-native-firebase/firestore';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, ItemSize } from '../store/slices/cartSlice';
import { useSnackbar } from '../context/SnackbarContext';
import { Item } from '../types/types';

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
                volume: item.volume[size],
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
    const updateQuantity = async (item: any, newQuantity: number) => {
        if (!userId || isSyncing) return;

        if (newQuantity <= 0) {
            // Automatically remove if quantity drops to 0
            return removeItemFromCart(item.id, item.name, item.type, item.selectedSize);
        }

        const cartDocId = `${userId}_${item.id}_${item.selectedSize}`;
        const cartRef = doc(getFirestore(), 'carts', cartDocId);

        try {
            setIsSyncing(true);
            
            // We use merge: true so we only update the quantity field
            await setDoc(cartRef, { 
                quantitiy: newQuantity.toString(),
                updatedAt: new Date().toISOString() 
            }, { merge: true });

            // Sync Redux
            dispatch(addToCart({
                ...item,
                quantity: newQuantity,
            }));

        } catch (error) {
            console.error("Update quantity error:", error);
            showSnackbar("Failed to update quantity");
        } finally {
            setIsSyncing(false);
        }
    };

    return { addItemToCart, removeItemFromCart,updateQuantity, isSyncing };
};