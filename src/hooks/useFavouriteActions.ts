import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { RootState } from '../store/store';
import { addTofavourite, removeFromfavourite } from '../store/slices/favouriteSlice';
import { useSnackbar } from '../context/SnackbarContext';
import { Item } from '../constants';

export const useFavouriteActions = () => {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    const userId = useSelector((state: RootState) => state.auth.user?.uid);
    const [isSyncing, setIsSyncing] = useState(false);

    const addFavourite = async (item: Item) => {
        if (!userId ) 
            
        return console.error("No User ID");

        if (isSyncing) return;

       const favDocId = `${userId}_${String(item.id)}`;
        const favRef = firestore().collection('favourites').doc(favDocId);

        try {
            setIsSyncing(true);
            const favData = ({
                productId: String(item.id),
                userId: userId,
                name: item.name,
                image: typeof item.image === 'string' ? item.image : "",
                category:item.category,
                description: item.description || "",
                price: item.price,
                addedAt: firestore.FieldValue.serverTimestamp(),
            });

            await favRef.set(favData);
            dispatch(addTofavourite(item));
            showSnackbar(`${item.name} added to favourites!`);
        } catch (error) {
            console.error("Add Fav Error:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    const removeSingleFavourite = async (itemId: string | number, name: string, type: string) => {


        if (!userId || isSyncing) return;

        const favDocId = `${userId}_${String(itemId)}`;

        try {
            setIsSyncing(true);
            await firestore().collection('favourites').doc(favDocId).delete();

            dispatch(removeFromfavourite({
                id: itemId,
                type
            }));
            showSnackbar(`${name} removed from favourites!`);
        } catch (error) {
            console.error("Remove Fav Error:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    return { addFavourite, removeSingleFavourite, isSyncing };
};