import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setFavourite, clearfavourite } from '../store/slices/favouriteSlice';
import { Item } from '../constants';

const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const favSnapshot = await firestore()
                        .collection('favourites')
                        .where('userId', '==', user.uid)
                        .get();

                    const cloudItems: Item[] = favSnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: data.productId,
                            name: data.name,
                            image: data.image,
                            type: data.type || "coffee",
                            description: data.description || "",
                            rating: data.rating || 0,
                            price: data.price || {},
                            volume: data.volume || {},
                        } as Item;
                    });

                    dispatch(setFavourite(cloudItems));
                } catch (error) {
                    console.error("Favourite Sync Error:", error);
                }
            } else {
                dispatch(clearfavourite());
            }
        });

        return subscriber;
    }, [dispatch]);

    return <>{children}</>;
};

export default FavouriteProvider;