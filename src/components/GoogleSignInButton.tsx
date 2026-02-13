import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import googlelogo from '../assets/logo/google-logo.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../services/firebase';
import { CLIENT_ID } from '../../lib/constants';
const GoogleSignInButton = () => {

GoogleSignin.configure({
  webClientId: CLIENT_ID, 
  offlineAccess: true,
});

  const handleGooglePress = async () => {
    try {
      const userCredential = await signInWithGoogle();
      
      if (userCredential) {
        console.log('Signed in with Google!', userCredential.user.uid);
      }
    } catch (error: any) {

      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('User cancelled the login flow');
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.googleButton} onPress={handleGooglePress}>
        <Image source={googlelogo} style={styles.logo} />
        <Text style={styles.text}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: -10,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },

  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },

  iconRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: 180,
  },

  iconBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    elevation: 3,
  },

  icon: {
    width: 24,
    height: 24,
  },
});
