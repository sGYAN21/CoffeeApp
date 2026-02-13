import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { CLIENT_ID } from '../../lib/constants';

import googlelogo from '../assets/logo/google-logo.png';
import hub from '../assets/logo/hub.png';
import hamster from '../assets/logo/hamster.png';

const GoogleSignInButton = () => {

  GoogleSignin.configure({
    webClientId: CLIENT_ID,
  });

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data?.idToken || ''
      );

      return auth().signInWithCredential(googleCredential);

    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Google Main Button */}
      <TouchableOpacity style={styles.googleButton} onPress={googleSignin}>
        <Image source={googlelogo} style={styles.logo} />
        <Text style={styles.text}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Social Icons Row */}
      <View style={styles.iconRow}>
        
        <TouchableOpacity style={styles.iconBtn}>
          <Image source={googlelogo} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Image source={hamster} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Image source={hub} style={styles.icon} />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
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
