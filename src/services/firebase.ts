import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
import { setDoc, doc, collection, serverTimestamp } from '@react-native-firebase/firestore';
const COLLECTION_USERS = 'users';
export const emailPasswordSignUp = async (email: string, password: string, userName: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth(), email.trim(), password);

        await updateProfile(res.user, {
            displayName: userName,
        });

        const userDocRef = doc(collection(firestore(), COLLECTION_USERS), res.user.uid);
        await setDoc(userDocRef, {
            uid: res.user.uid,
            email: res.user.email,
            userName: userName,
            createdAt: serverTimestamp(), 
        });

        return res;
    } catch (error) {
        console.log("signUp Error", error);
    }
};

export const emailPasswordSignIn = async (email: string, password: string) => {
    try {
    // UPDATED: Modular Sign In
    const res = await signInWithEmailAndPassword(auth(), email.trim(), password);   
    return res; 
  } catch (error: any) {
    console.error("SignIn Error:", error);
    throw new Error(error.message || "SignIn failed");
  }
};

export const SignOut = async () => {
try {
    // UPDATED: Modular Sign Out
    await signOut(auth());
    console.log('User signed out successfully');
  } catch (error: any) {
    console.error('Sign out error:', error);
  };
};