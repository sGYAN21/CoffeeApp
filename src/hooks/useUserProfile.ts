import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export interface deliveryAddress {
  id: string;
  contactName: string;
  phone: string;
  pincode: string;
  place: string;
  type: string; 
}

export interface UserProfile {
  uid: string;
  userName: string; 
  email: string;   
  gender: 'male' | 'female'; 
  age?: number;     
  phoneNumber?: string; 
  profileImageUrl?: string | null;
  deliveryAddress?: deliveryAddress[];
}

const useUserProfile = (userId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot) {
          const data = documentSnapshot.data();
          setUserData({
            uid: documentSnapshot.id,
            userName: data?.userName || '',
            email: data?.email || '',
            gender: data?.gender || 'male',
            age: data?.age,
            phoneNumber: data?.phoneNumber,
            profileImageUrl: data?.profileImageUrl || null,
            deliveryAddress: data?.deliveryAddress || [],
          });
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });

    return () => subscriber();
  }, [userId]);

  // Use .set with { merge: true } to create new fields (like age/phone) 
  // without deleting your existing email/userName
  const updateProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!userId) return;
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .set(updatedFields, { merge: true }); 
      console.log('Profile Updated!');
    } catch (err) {
      console.error("Update Error:", err);
      throw err;
    }
  };
const addAddress = async (newAddress: deliveryAddress) => {
    if (!userId) return;

    const currentAddresses = userData?.deliveryAddress || [];
    if (currentAddresses.length >= 4) {
      throw new Error("LIMIT_REACHED");
    }
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          deliveryAddress: firestore.FieldValue.arrayUnion(newAddress)
        });
    } catch (err) {
      console.error("Add Address Error:", err);
      throw err;
    }
  };
  const deleteAddress = async (addressToDelete: deliveryAddress) => {
    if (!userId) return;
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          deliveryAddress: firestore.FieldValue.arrayRemove(addressToDelete)
        });
    } catch (err) {
      console.error("Delete Address Error:", err);
      throw err;
    }
  };
  return { userData, loading, updateProfile,addAddress, deleteAddress };
};

export default useUserProfile;