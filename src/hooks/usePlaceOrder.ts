import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { OrderModel } from '../types/types';

export const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);

  const placeBatchOrder = async (cartItems: any[], commonData: any) => {
    setLoading(true);
    const batch = firestore().batch();
    const transactionId = `TXN-${Date.now()}`;
    const orderedAt = new Date().toISOString();

    try {
      cartItems.forEach((item) => {
        const orderRef = firestore().collection('orders').doc();
        
        const orderEntry: OrderModel = {
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price[item.selectedSize].toString(),
          quantity: item.quantity.toString(),
          size: item.selectedSize,
          subtotal: (item.price[item.selectedSize] * item.quantity).toFixed(2),
          
          orderStatus: "Pending",
          orderedAt,
          transactionId,
          userId: commonData.userId,
          
          paymentMethod: commonData.paymentMethod,
          paymentStatus: "Pending", 
          totalAmount: commonData.totalAmount,
          
          userName: commonData.userName,
          phone: commonData.phone,
          address: commonData.address, 
          instructions: commonData.instructions,
        };

        batch.set(orderRef, orderEntry);

        // Delete item from cart after order is placed
        const cartDocId = `${commonData.userId}_${item.id}_${item.selectedSize}`;
        const cartRef = firestore().collection('carts').doc(cartDocId);
        batch.delete(cartRef);
      });

      await batch.commit();
      return { success: true, transactionId };
    } catch (error) {
      console.error("Order Error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { placeBatchOrder, loading };
};