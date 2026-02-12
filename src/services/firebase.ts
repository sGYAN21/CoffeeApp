import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
import { getFirestore,setDoc, doc, collection, serverTimestamp } from '@react-native-firebase/firestore';
const COLLECTION_USERS = 'users';
export const emailPasswordSignUp = async (email: string, password: string, userName: string) => {
    try {
        const res = await createUserWithEmailAndPassword(getAuth(), email.trim(), password);

        await updateProfile(res.user, {
            displayName: userName,
        });

        const userDocRef = doc(collection(getFirestore(), COLLECTION_USERS), res.user.uid);
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
    const res = await signInWithEmailAndPassword(getAuth(), email.trim(), password);   
    console.log("SignIn Success UID:", res.user.uid);
    return res; 
  } catch (error: any) {
    console.error("SignIn Error:", error);
    throw new Error(error.message || "SignIn failed");
  }
};

export const SignOut = async () => {
try {
    // UPDATED: Modular Sign Out
    await signOut(getAuth());
    console.log('User signed out successfully');
  } catch (error: any) {
    console.error('Sign out error:', error);
  };
};