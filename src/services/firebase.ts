import auth from '@react-native-firebase/auth';


export const createUser = async (email: string, password: string,userName:string) => {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    return res; 
};

export const signIn= async (email: string, password: string) => {
    const res = await auth().signInWithEmailAndPassword(email, password);   
    return res; 
};
export const logoutUser = async () => {
    await auth().signOut();  
};