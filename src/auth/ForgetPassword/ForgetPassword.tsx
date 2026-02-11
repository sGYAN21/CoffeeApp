import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthStackParamList } from '../types';

const bg_forget = require('../../assets/forgetPassword.png');

type forgetPassword = NativeStackNavigationProp<AuthStackParamList, 'forgetPassword'>;
const ForgetPassword = () => {
    const navigation = useNavigation<forgetPassword>();
    const [email, setEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showOtpSection, setShowOtpSection] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timer, setTimer] = useState<number>(30);

    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const otpInputs = useRef<Array<TextInput | null>>([]);
    useEffect(() => {
        let interval: number;
        if (showOtpSection && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtpSection, timer]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSendOtp = (): void => {
        if (!email.includes('@')) {
            Alert.alert("Error", "Please enter a valid email");
            return;
        }
        setShowOtpSection(true);
        setTimer(30);
    };

    const handleResendOtp = (): void => {
        if (timer === 0) {
            setOtp(['', '', '', '']);
            setTimer(30);
            Alert.alert("OTP Sent", "A new code has been sent to your email.");
        }
    };

    const handleOtpChange = (value: string, index: number): void => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleResetPassword = (): void => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length < 4) {
            Alert.alert("Error", "Please enter the 4-digit OTP.");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        Alert.alert("Success", "Password updated successfully!");
        navigation.navigate('signin' as any)
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 ,}} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Image source={bg_forget} style={styles.headerImage} />
                </View>

                <View style={styles.card}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.title}>Forget Password</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="mail-outline" size={22} color="#666" />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                editable={!showOtpSection}
                                keyboardType="email-address"
                            />
                        </View>

                        {!showOtpSection ? (
                            <TouchableOpacity onPress={handleSendOtp} style={styles.sendOtpAnchor}>
                                <Text style={styles.sendOtpText}>Send OTP</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.otpSection}>

                                <View style={styles.otpHeader}>
                                    <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0}>
                                        <Text style={[styles.resendText, timer === 0 && { color: '#5D4037', fontWeight: 'bold' }]}>
                                            {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend OTP"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.otpRow}>
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(ref) => (otpInputs.current[index] = ref)}
                                            style={styles.otpBox}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            onChangeText={(val) => handleOtpChange(val, index)}
                                            value={digit}
                                        />
                                    ))}
                                </View>

                                {/* New Password Field */}
                                <View style={styles.inputContainer}>
                                    <Icon name="lock-closed-outline" size={20} color="#666" />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="New Password"
                                        placeholderTextColor="#999"
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        secureTextEntry={!isPassVisible}
                                    />
                                    <TouchableOpacity onPress={() => setIsPassVisible(!isPassVisible)}>
                                        <Icon name={isPassVisible ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                {/* Confirm Password Field */}
                                <View style={styles.inputContainer}>
                                    <Icon name="lock-closed-outline" size={20} color="#666" />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#999"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!isConfirmPassVisible}
                                    />
                                    <TouchableOpacity onPress={() => setIsConfirmPassVisible(!isConfirmPassVisible)}>
                                        <Icon name={isConfirmPassVisible ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={handleResetPassword
                                }
                                    style={styles.verifyBtn}>
                                    <Text style={styles.verifyBtnText}>Update Password</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('signin' as any)}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#666'
                            }}>
                                Are You rememberd password? <Text style={{
                                    color: '#5D4037',
                                    fontWeight: 'bold'
                                }}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5D4037'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50
    },
    headerImage: {
        width: 220,
        height: 220,
        borderRadius: 10
    },
    card: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        flex:1,
        minHeight: '100%', 
        paddingBottom: 40,
          alignItems: 'stretch',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 18,
        marginLeft: 10,
        color: '#333'

    },
    content: { marginTop: 40, 
          
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
        height: 55,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#333'
    },
    sendOtpAnchor: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: -10
    },
    sendOtpText: {
        color: '#5D4037',
        fontWeight: '600',
        fontSize: 14
    },
    otpSection: {
        marginTop: 10,

    },
    otpHeader: {
        alignItems: 'flex-end',
        marginBottom: 15
    },
    resendText: {
        color: '#5D4037',
        fontSize: 13
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    otpBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: '#FAFAFA',
        color: '#333'
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd'
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#888'
    },
    verifyBtn: {
        backgroundColor: '#5D4037',
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    verifyBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default ForgetPassword;

