import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,

    StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const PlaceOrderScreen = ({ navigation }: any) => {

    const [paymentMethod, setPaymentMethod] = useState('debit_card');
    const [couponCode, setCouponCode] = useState('');

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0C0F14" translucent={true} />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>


                    <Text style={styles.headerTitle}>Place Order</Text>
                    <View style={styles.cartContainer}>
                        <Icon name="cart-outline" size={24} color="#000" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>2</Text>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                      {/* Contact Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact Details</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="person" size={20} color="#666" style={styles.iconPrefix} />
                            <TextInput placeholder="Enter your name" style={styles.input} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="call" size={20} color="#666" style={styles.iconPrefix} />
                            <TextInput
                                placeholder="+1 123 456 7890"
                                style={styles.input}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Delivery Address Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Address</Text>
                        <View style={styles.addressCard}>
                            <Icon name="location" size={20} color="#666" style={styles.iconPrefix} />
                            <Text style={styles.addressText} numberOfLines={1}>
                                123 Main Street, <Text style={styles.fadedText}>Springfield, IL</Text>
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.editText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                  
                    {/* Payment Method Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>

                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('debit_card')}
                        >
                            <View style={styles.paymentLeft}>
                                <Icon name="card-outline" size={22} color="#000" />
                                <Text style={styles.paymentText}>Debit Card</Text>
                            </View>

                            <Icon
                                name={paymentMethod === 'debit_card' ? "checkmark-circle" : "ellipse-outline"}
                                size={22}
                                color={paymentMethod === 'debit_card' ? "#D17842" : "#ccc"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('credit_card')}
                        >
                            <View style={styles.paymentLeft}>
                                <Icon name="card-outline" size={22} color="#000" />
                                <Text style={styles.paymentText}>Credit Card</Text>
                            </View>

                            <Icon
                                name={paymentMethod === 'credit_card' ? "checkmark-circle" : "ellipse-outline"}
                                size={22}
                                color={paymentMethod === 'credit_card' ? "#D17842" : "#ccc"}
                            />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('upi_pay')}
                        >
                            <View style={styles.paymentLeft}>
                                <MaterialIcon name="contactless-payment" size={22} color="#000" />
                                <Text style={styles.paymentText}>UPI Pay</Text>
                            </View>
                            <Icon
                                name={paymentMethod === 'upi_pay' ? "checkmark-circle" : "ellipse-outline"}
                                size={22}
                                color={paymentMethod === 'upi_pay' ? "#D17842" : "#ccc"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('cash')}
                        >
                            <View style={styles.paymentLeft}>
                                <MaterialIcon name="cash" size={22} color="#4CAF50" />
                                <Text style={styles.paymentText}>Cash on Delivery</Text>
                            </View>
                            <Icon
                                name={paymentMethod === 'cash' ? "checkmark-circle" : "ellipse-outline"}
                                size={22}
                                color={paymentMethod === 'cash' ? "#D17842" : "#ccc"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.couponHeader}>
                            <Text style={styles.sectionTitle}>Coupon Code</Text>
                            <TouchableOpacity onPress={() => console.log('Applying:', couponCode)}>
                                <Text style={styles.applyText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.couponInputContainer}>
                            <TextInput
                                placeholder="Enter promo code"
                                style={styles.input}
                                value={couponCode}
                                onChangeText={setCouponCode}
                                placeholderTextColor="#ccc"
                            />
                        </View>
                    </View>
                    {/* Delivery Instructions Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Instructions</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                placeholder="e.g. Leave at the door"
                                style={styles.textArea}
                                multiline
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Footer / Bottom Bar */}
                <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>$12.50</Text>
                    </View>
                    <TouchableOpacity style={styles.placeOrderBtn}>
                        <Text style={styles.placeOrderText}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fcfcfc' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    cartContainer: { padding: 5 },
    badge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#D17842',
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    section: { marginTop: 20 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 10 },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 15,
    },
    addressText: { flex: 1, fontSize: 13, color: '#333', marginLeft: 10 },
    fadedText: { color: '#999' },
    editText: { color: '#D17842', fontWeight: 'bold', fontSize: 13},
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        height: 50,
    },
    iconPrefix: { marginRight: 10 },
    input: { flex: 1, height: '100%', fontSize: 14 },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    paymentLeft: { flexDirection: 'row', alignItems: 'center' },
    paymentText: { marginLeft: 10, fontSize: 14, color: '#333' },
    textAreaContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 60,
    },
    textArea: { flex: 1, textAlignVertical: 'top', paddingTop: 10 },
    couponHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    applyText: {
        color: '#D17842', // Matching your theme orange
        fontWeight: 'bold',
        fontSize: 16,
    },
    couponInputContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalContainer: { borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 2 },
    totalLabel: { fontSize: 12, color: '#000' },
    totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    placeOrderBtn: {
        backgroundColor: '#D17842',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    placeOrderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default PlaceOrderScreen;