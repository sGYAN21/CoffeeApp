import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from '@react-native-firebase/auth'; 
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../auth/types';
import LoadingIndicator from '../components/LoadingIndicator';
type SplashNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'splashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  const hasNavigated = useRef(false);
useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(getAuth(), (user: FirebaseAuthTypes.User | null) => {
      
      if (hasNavigated.current) return;
      hasNavigated.current = true;

      const timer = setTimeout(() => {
        if (user) {
          console.log("User detected, navigating to MainTabs");
          navigation.dispatch(StackActions.replace('MainTabs' as any)); 
        } else {
          console.log("No user detected, navigating to signin");
          navigation.dispatch(StackActions.replace('signin'));
        }
      }, 2000);

      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2C1B12" barStyle="light-content" />
      <View style={styles.brandContainer}>
        <Text style={styles.logo}>Coffee Paglu</Text>
        {/* <Text style={styles.tagline}>Sip. Scan. Repeat. ☕</Text> */}
        <Text style={styles.tagline}>First coffee. Then everything else ☕</Text>

      </View>
      <View style={styles.loaderContainer}>
        {/* Use the new component here */}
        <LoadingIndicator size={60} color="#D4A373" speed={500} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1B12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    marginTop: 12,
    fontSize: 16,
    color: '#D4A373',
    fontWeight: '500',
    letterSpacing: 0.5,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
  },
  loaderContainer: {
    marginTop: 20,
  },
});
