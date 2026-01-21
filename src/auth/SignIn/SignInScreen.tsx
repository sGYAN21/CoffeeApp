import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { AuthStackParamList } from '../types';
import { signIn } from '../../services/firebase';
import Snackbar from 'react-native-snackbar';

type SigninNavProp = NativeStackNavigationProp<AuthStackParamList, 'signin'>;

const SignInScreen = () => {
  // 1. FIXED: Hook moved INSIDE the component
  const navigation = useNavigation<SigninNavProp>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSignin = async () => {
    if (!email || !password) 
    setLoading(true);
    try {
      const res = await signIn(email, password);   
      console.log("Logged in successfully:", res);
       Snackbar.show({
        text: 'User Sign in successfully 🎉',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#C67C4E',
        textColor: '#fff',
      });
      navigation.navigate('Home');
   
    }
    catch (error: any) {
      console.log(error);
  
    } finally {
      setLoading(false);
    }

  };   

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* 2. FIXED: onPress goes on the TouchableOpacity */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleSignin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Optional: Add a link to Sign Up screen */}
        <TouchableOpacity onPress={() => navigation.navigate('signup' as any)}>
          <Text style={styles.switchText}>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, justifyContent: 'center', flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', 
    borderWidth: 1, borderColor: '#ddd', 
    borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50 },
  forgotText: { textAlign: 'right', color: '#C67C4E', marginBottom: 20 },
  loginButton: { 
    backgroundColor: '#C67C4E', padding: 15, 
    borderRadius: 8, alignItems: 'center', height: 55, justifyContent: 'center'
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dividerContainer: { 
    flexDirection: 'row', alignItems: 'center', marginVertical: 30 
  },
  divider: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, color: '#888' },
  switchText: { textAlign: 'center', marginTop: 20, color: '#666' },
  linkText: { color: '#C67C4E', fontWeight: 'bold' }
});

export default SignInScreen;