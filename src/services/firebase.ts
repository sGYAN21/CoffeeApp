import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithCredential,} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {getFirestore,setDoc, doc, collection, serverTimestamp,getDoc } from '@react-native-firebase/firestore';
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

export const signInWithGoogle = async () => {
  try {
    // 1. Check if the device has Google Play Services
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // 2. Perform the sign-in request
    const signInResult = await GoogleSignin.signIn();
    
    // 3. Extract the ID Token
    const idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // 4. Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // 5. Sign-in the user with the credential
    const userCredential = await signInWithCredential(getAuth(), googleCredential);
    const user = userCredential.user;

    // 6. Check if user exists in Firestore, if not, create them
    const userDocRef = doc(getFirestore(), COLLECTION_USERS, user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        userName: user.displayName || 'Google User',
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        loginMethod: 'google'
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    throw error;
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