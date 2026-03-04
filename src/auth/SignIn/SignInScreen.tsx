import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { use, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthStackParamList } from '../../types/types';
import { emailPasswordSignIn } from '../../services/firebase';
import Snackbar from 'react-native-snackbar';
import bg_signin from '../../assets/signin_img.png';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { theme } from '../../constants';
import { useSnackbar } from '../../context/SnackbarContext';
type SigninNavProp = NativeStackNavigationProp<AuthStackParamList, 'signin'>;

const SignInScreen = () => {
  const navigation = useNavigation<SigninNavProp>();
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const handleSignin = async () => {
    if (!email || !password) {
      Snackbar.show({
        text: 'Please enter both email and password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#FF0000',
      });
      return;
    }
    try {
      const res = await emailPasswordSignIn(email, password);
      console.log('Logged in successfully:', res.user.uid);
      showSnackbar("Sign in Successfully 🎉");
      navigation.navigate('MainTabs' as any);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Image
            source={bg_signin}
            style={{ width: 240, height: 250 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.title}>Hello, Coffee Paglu</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Icon
                name="mail-outline"
                size={20}
                color="#666"
                style={styles.icon}
              />
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
              <Icon
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPassVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPassVisible(!isPassVisible)}
              >
                <Icon
                  name={isPassVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('forgetpassword' as any)}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
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

            <GoogleSignInButton />
            <TouchableOpacity
              onPress={() => navigation.navigate('getstarted' as any)}
            >
              <Text style={styles.switchText}>
                Don't have an account?{' '}
                <Text style={styles.linkText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  content: {
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'stretch',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  forgotText: {
    textAlign: 'right',
    color: theme.primary,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  linkText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
