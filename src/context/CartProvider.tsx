import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setUser } from '../store/slices/authSlice';
import { setCart, CartItem, ItemSize } from '../store/slices/cartSlice';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(async (user) => {
            if (user) {
              
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    userName: user.displayName || 'User',
                }));


                try {
                    const cartSnapshot = await firestore()
                        .collection('carts')
                        .where('userId', '==', user.uid)
                        .get();

                    const cloudItems: CartItem[] = cartSnapshot.docs.map(doc => {
                        const data = doc.data();
                        const size = data.size as ItemSize; 
                        return {
  
                            id: data.productId ,
                            name: data.name,
                            image: data.image,
                            type: data.type || "coffee",
                            category: data.category || "",
                            description: data.description || "",
                            rating: data.rating || 0,
                            price: {
                                [size]: data.price
                            },
                            volume: {
                                [size]: data.volume || 0
                            },

                            // Cart Specific Properties
                            quantity: parseInt(data.quantitiy || "1"),
                            selectedSize: size,
                            selected: true,
                        } as CartItem;
                    });
                    dispatch(setCart(cloudItems));
                } catch (error) {
                    console.error("Sync Error:", error);
                }
            } else {
                // Handle Logout
                dispatch(setUser(null));
                dispatch(setCart([]));
            }
        });

        return subscriber;
    }, [dispatch]);

    return <>{children}</>;
};

export default CartProvider;