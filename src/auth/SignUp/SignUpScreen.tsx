
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { emailPasswordSignUp } from '../../services/firebase';
import bg_signup from '../../assets/signup_img.png'
type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'signup'>;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [secure, setSecure] = useState(true);

  const navigation = useNavigation<SignupNavProp>();

  const handleSignup = async () => {
    try {
      const res = await emailPasswordSignUp(email, password, userName);
      console.log(res);
      Snackbar.show({
        text: 'Account created successfully 🎉',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#C67C4E',
        textColor: '#fff',
      });
      setEmail('');
      setPassword('');
      setUserName('');
      navigation.navigate('signin');

    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={bg_signup}
              style={{ width: 280, height: 220 }}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>


              <Text style={styles.cardTitle}>Create Account</Text>
              {/* <Text style={styles.subtitle}>
              Enter your email and password to register
            </Text> */}
              <View style={styles.inputContainer}>
                <Feather name="user" size={22} color="#999" />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={22} color="#999" />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

              </View>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={22} color="#999" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Feather
                    name={secure ? 'eye' : 'eye-off'}
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('signin')}
                  style={styles.link}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D4037',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    color: '#E0E7FF',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // 
    alignItems: 'stretch',
  },
  cardContent: {
    marginTop: 60
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000'
  },

  button: {
    backgroundColor: '#5D4037',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#444',
  },
  link: {
    color: '#5D4037',
    fontWeight: 'bold',
  },
});
