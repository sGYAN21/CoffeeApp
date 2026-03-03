import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderModel } from '../types/types';

export interface deliveryAddress {
  id: string;
  contactName: string;
  phone: string;
  pincode: string;
  place: string;
  type: string; 
}

interface OrderContextType {
  selectedAddress: deliveryAddress | null; 
  setSelectedAddress: (addr: deliveryAddress | null) => void;
  userName: string;
  setUserName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  instructions: string;
  setInstructions: (v: string) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  getCommonOrderData: (userId: string, total: number) => Partial<OrderModel>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [selectedAddress, setSelectedAddress] = useState<deliveryAddress | null>(null);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');

  const getCommonOrderData = (userId: string, total: number): Partial<OrderModel> => {
    return {
      userId,
      userName: userName || selectedAddress?.contactName || "User",
      phone: phone || selectedAddress?.phone || "",
      // This matches your flat Firebase schema for orders
      address: {
        id: selectedAddress?.id || "",
        name: selectedAddress?.contactName || "",
        details: selectedAddress?.place || "",
        pincode: selectedAddress?.pincode || "",
      },
      instructions,
      paymentMethod,
      totalAmount: total.toString(),
    };
  };

  return (
    <OrderContext.Provider value={{
      instructions, setInstructions,
      paymentMethod, setPaymentMethod,
      selectedAddress, setSelectedAddress,
      userName, setUserName,
      phone, setPhone,
      getCommonOrderData
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};