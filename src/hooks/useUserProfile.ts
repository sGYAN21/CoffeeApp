import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export interface UserProfile {
  uid: string;
  userName: string; 
  email: string;   
  gender: 'male' | 'female'; 
  age?: number;     
  phoneNumber?: string; 
  profileImageUrl?: string | null;
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
            // These will be undefined until you save them for the first time
            age: data?.age,
            phoneNumber: data?.phoneNumber,
            profileImageUrl: data?.profileImageUrl || null,
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

  return { userData, loading, updateProfile };
};

export default useUserProfile;