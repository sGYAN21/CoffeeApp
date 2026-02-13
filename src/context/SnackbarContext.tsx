import React, { createContext, useContext, useState, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface SnackbarContextType {
    showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();

    const showSnackbar = (msg: string) => {
        setMessage(msg);
        setVisible(true);
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setVisible(false));
        }, 3000);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {visible && (
                <Animated.View style={[styles.snackbar, { top: insets.top + 10, opacity: fadeAnim }]}>
                    <Icon name="checkmark-circle" size={18} color="white" />
                    <Text style={styles.snackbarText}>{message}</Text>
                </Animated.View>
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error('useSnackbar must be used within SnackbarProvider');
    return context;
};

const styles = StyleSheet.create({
    snackbar: { 
        position: 'absolute', 
        alignSelf: 'center', 
        backgroundColor: '#C67C4E', 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15, 
        borderRadius: 30, 
        zIndex: 9999, 
        elevation: 5 },
    snackbarText: { 
        color: 'white', 
        marginLeft: 10, 
        fontWeight: 'bold' }
});