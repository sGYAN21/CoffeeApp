// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import deliveryMan from '../../assets/success/deliveryMan.webp';
// import { useNavigation } from '@react-navigation/native';

// const SuccessScreen = ( { item }: any) => {
//     const navigation = useNavigation<any>();

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.content}>

//                 {/* 1. Main Title */}
//                 <Animated.View entering={FadeInUp.delay(200)} style={styles.textCenter}>
//                     <Text style={styles.title}>Order Placed!</Text>
//                 </Animated.View>

//                 {/* 2. Illustration & Subtitle */}
//                 <Animated.View entering={FadeInDown.delay(400)} style={styles.illustrationContainer}>
//                     <Image
//                         source={deliveryMan}
//                         style={styles.mapImage}
//                         resizeMode="contain"
//                     />
//                     <Text style={styles.subtitle}>Your Item is on the way!</Text>
//                 </Animated.View>

//                 {/* 3. Divider */}
//                 <View style={styles.divider} />

//                 {/* 4. Preparation Badge */}
//                 <Animated.View entering={FadeInUp.delay(600)} style={styles.timeBadge}>
//                     <Text style={styles.timeText}>Sit back & relax, we're preparing your order</Text>
//                 </Animated.View>

//                 {/* 5. Action Buttons */}
//                 <Animated.View entering={FadeInDown.delay(800)} style={styles.footer}>
//                     <TouchableOpacity 
//                         style={styles.trackButton}
//                         onPress={() => {/* Add tracking logic */}}
//                     >
//                         <Text style={styles.trackButtonText}>Track Order</Text>
//                     </TouchableOpacity>

//                     <View style={styles.backHomeContainer}>
//                         <View style={styles.line} />
//                         <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
//                             <Text style={styles.backHomeText}>Back to Home</Text>
//                         </TouchableOpacity>
//                         <View style={styles.line} />
//                     </View>
//                 </Animated.View>

//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     content: {
//         flex: 1,
//         alignItems: 'center',
//         paddingHorizontal: 30,
//         paddingTop: 60, 
//     },
//     textCenter: {
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     title: {
//         fontSize: 34,
//         fontWeight: '800',
//         color: '#3C2A21', 
//         textAlign: 'center',
//     },
//     illustrationContainer: {
//         alignItems: 'center',
//         width: '100%',
//         marginBottom: 20,
//     },
//     mapImage: {
//         width: 250,
//         height: 200,
//         marginBottom: 20,
//     },
//     subtitle: {
//         fontSize: 18,
//         color: '#C67C4E',
//         fontWeight: '600',
//         marginTop: 10,
//     },
//     divider: {
//         width: '100%',
//         height: 1,
//         backgroundColor: '#F0F0F0',
//         marginVertical: 20,
//     },
//     timeBadge: {
//         backgroundColor: '#E8F5E9',
//         paddingVertical: 14,
//         paddingHorizontal: 25,
//         borderRadius: 30,
//         borderWidth: 1,
//         borderColor: '#C8E6C9',
//         marginBottom: 40,
//     },
//     timeText: {
//         color: '#2E7D32',
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     footer: {
//         width: '100%',
//         alignItems: 'center',
//         marginTop:100,
//     },
//     trackButton: {
//         backgroundColor: '#3C2A21', 
//         width: '80%', 
//         paddingVertical: 18,
//         borderRadius: 40,
//         alignItems: 'center',
//         marginBottom: 25,
//         // Shadow
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//     },
//     trackButtonText: {
//         color: '#FFF',
//         fontSize: 18,
//         fontWeight: '700',
//     },
//     backHomeContainer: {

//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     line: {
//         height: 1,
//         width: 40,
//         backgroundColor: '#DDD',
//     },
//     backHomeText: {
//         color: '#C67C4E', 
//         fontSize: 16,
//         fontWeight: '700',
//         marginHorizontal: 15,
//     },
// });

// export default SuccessScreen;


import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import deliveryMan from '../../assets/success/deliveryMan.webp';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
    const navigation = useNavigation<any>();

    // 1. Initialize Animation Values
    const fadeAnimTitle = useRef(new Animated.Value(0)).current;
    const slideAnimTitle = useRef(new Animated.Value(-20)).current;

    const fadeAnimIllustration = useRef(new Animated.Value(0)).current;
    const slideAnimIllustration = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // 2. Define the Animation Sequence
        Animated.stagger(200, [
            // Title: Fade In + Slide Down (FadeInUp equivalent)
            Animated.parallel([
                Animated.timing(fadeAnimTitle, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(slideAnimTitle, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]),
            // Illustration: Fade In + Slide Up (FadeInDown equivalent)
            Animated.parallel([
                Animated.timing(fadeAnimIllustration, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(slideAnimIllustration, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Main Title */}
                <Animated.View style={[styles.textCenter, { opacity: fadeAnimTitle, transform: [{ translateY: slideAnimTitle }] }]}>
                    <Text style={styles.title}>Order Placed!</Text>
                </Animated.View>

                {/* Illustration & Subtitle */}
                <Animated.View style={[styles.illustrationContainer, { opacity: fadeAnimIllustration, transform: [{ translateY: slideAnimIllustration }] }]}>
                    <Image source={deliveryMan} style={styles.mapImage} resizeMode="contain" />
                    <Text style={styles.subtitle}>Your Item is on the way!</Text>
                </Animated.View>

                <View style={styles.divider} />
                <Animated.View  style={styles.timeBadge}>
                    <Text style={styles.timeText}>Sit back & relax, we're preparing your order</Text>
                </Animated.View>

                {/* Bottom section (Footer) */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.trackButton}>
                        <Text style={styles.trackButtonText}>Track Order</Text>
                    </TouchableOpacity>

                    <View style={styles.backHomeContainer}>
                        <View style={styles.line} />
                        <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
                            <Text style={styles.backHomeText}>Back to Home</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 60,
    },
    textCenter: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#3C2A21',
        textAlign: 'center',
    },
    illustrationContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    mapImage: {
        width: 250,
        height: 200,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#C67C4E',
        fontWeight: '600',
        marginTop: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
    },
    timeBadge: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#C8E6C9',
        marginBottom: 40,
    },
    timeText: {
        color: '#2E7D32',
        fontWeight: '600',
        fontSize: 14,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 100,
    },
    trackButton: {
        backgroundColor: '#3C2A21',
        width: '80%',
        paddingVertical: 18,
        borderRadius: 40,
        alignItems: 'center',
        marginBottom: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    trackButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    backHomeContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        width: 40,
        backgroundColor: '#DDD',
    },
    backHomeText: {
        color: '#C67C4E',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 15,
    },
});

export default SuccessScreen;