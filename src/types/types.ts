import { ImageSourcePropType } from 'react-native';

export type AuthStackParamList = {
  signup: undefined;
  signin: undefined;
  forgetPassword: undefined;
  splashScreen: undefined;
};



export interface Item {
  id: string | number;
  name: string;
  price: {
    small: string;
    medium: string;
    large: string;
  };
  volume: {
    small: string;
    medium: string;
    large: string;
  };
  rating: string;
  image: ImageSourcePropType;
  description: string;
  type: string;
  category: string;
}

export interface OrderModel {
  // Product Details
  productId: string | number;
  name: string;
  image: string;
  price: string;
  quantity: string;
  size: string;      
  subtotal: string;

  // Order & Status
  orderStatus: "Pending" | "Confirmed" | "Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
  orderedAt: string;
  transactionId: string;
  userId: string;

  // Payment Details
  paymentMethod: string;
  paymentStatus: "Pending" | "Completed" | "Refunded";
  totalAmount: string;  

  // Delivery & Contact Info (From your UI)
  userName: string;
  phone: string;
  address: {
    id: string;
    name: string;
    details: string;
    pincode:string;
  };
  instructions?: string; 
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  price: {
    small: string;
    medium: string;
    large: string;
  };
  volume: {
    small: string;
    medium: string;
    large: string;
  };
  createdAt?: number;
}
