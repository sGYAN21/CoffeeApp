import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

// Components & Hooks
import AddressBottomSheet from './components/AdressBottomSheet';
import ReviewItemCard from './components/ReviewItemCard';
import DeliveryCard from './components/DeliveryCard';
import { useOrder } from '../../context/OrderContext';
import { usePlaceOrder } from '../../hooks/usePlaceOrder';
import { RootState } from '../../store/store';
import useUserProfile from '../../hooks/useUserProfile';

const PlaceOrderScreen = ({ navigation }: any) => {
   const { placeBatchOrder, loading } = usePlaceOrder();
   
    const user = auth().currentUser;
 
    const {
        selectedAddress, setSelectedAddress,
        userName, setUserName,
        phone, setPhone,
        instructions, setInstructions,
        paymentMethod, setPaymentMethod,
        getCommonOrderData
    } = useOrder();

    // 2. Sync logic: If context has no address but user profile does, auto-select the first one
    const { userData } = useUserProfile(user?.uid);
    const savedAddresses = userData?.deliveryAddress || [];

    useEffect(() => {
        if (!selectedAddress && savedAddresses.length > 0) {
            const firstAddr = savedAddresses[0];
            setSelectedAddress(firstAddr);
            setUserName(firstAddr.contactName);
            setPhone(firstAddr.phone);
        }
    }, [savedAddresses]);

    // Redux selectors
    const cartItems = useSelector((state: RootState) =>
        state.cart.items.filter(item => item.selected)
    );
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const userId = useSelector((state: RootState) => state.auth.user?.uid);

    const [isSheetVisible, setSheetVisible] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    const handleConfirmOrder = async () => {
        // Validation using context values
        if (!selectedAddress || !phone || !userName) {
            Alert.alert("Missing Details", "Please select a delivery address.");
            return;
        }

        if (cartItems.length === 0) {
            Alert.alert("Empty Cart", "You don't have any selected items to order.");
            return;
        }

        const commonData = getCommonOrderData(userId || 'guest', totalPrice);
        const result = await placeBatchOrder(cartItems, commonData);

        if (result.success) {
            navigation.navigate('SuccessScreen', { txnId: result.transactionId });
        } else {
            Alert.alert("Order Failed", "Something went wrong. Please try again.");
        }
    };

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" translucent={true} />
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
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <View style={styles.horizontalSection}>
                        <Text style={styles.sectionTitle}>Review Items</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalList}
                        >
                            {cartItems.map((item, index) => (
                                <ReviewItemCard key={index} item={item} />
                            ))}
                        </ScrollView>
                    </View>
                    {/* Delivery Address Section */}
                    <View style={styles.section}>
                        {/* Always show the header and button here */}
                        <View style={styles.headerRow}>
                            <Text style={styles.sectionTitle}>Deliver to:</Text>
                            <TouchableOpacity onPress={() => setSheetVisible(true)}>
                                <Text style={styles.editText}>
                                    {selectedAddress ? "Change" : "Select"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Conditionally show the card or the placeholder */}
                        {selectedAddress ? (
                            <DeliveryCard
                                name={selectedAddress?.contactName || "No address selected"}
                                label={selectedAddress?.type || "Home"}
                                address={selectedAddress?.place || "Please add a delivery address"}
                                phone={selectedAddress?.phone || ""}
                                onChangePress={() => setSheetVisible(true)}
                            />
                        ) : (
                            <View style={styles.addressCard}>
                                <Text style={styles.fadedText}>No address selected</Text>
                            </View>
                        )}
                    </View>

                    {/* Payment Method Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Payment Method</Text>
                        {['debit_card', 'credit_card', 'upi_pay', 'cash'].map((method) => (
                            <TouchableOpacity
                                key={method}
                                style={styles.paymentOption}
                                onPress={() => setPaymentMethod(method)}
                            >
                                <View style={styles.paymentLeft}>
                                    <Icon name={method.includes('card') ? "card-outline" : method === 'cash' ? "cash-outline" : "qr-code-outline"} size={22} color="#000" />
                                    <Text style={styles.paymentText}>{method.replace('_', ' ').toUpperCase()}</Text>
                                </View>
                                <Icon
                                    name={paymentMethod === method ? "checkmark-circle" : "ellipse-outline"}
                                    size={22}
                                    color={paymentMethod === method ? "#D17842" : "#ccc"}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Coupon Section */}
                    <View style={styles.section}>
                        <View style={styles.couponHeader}>
                            <Text style={styles.sectionTitle}>Coupon Code</Text>
                            <TouchableOpacity><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
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
                        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Delivery Instructions</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                placeholder="e.g. Leave at the door"
                                style={styles.textArea}
                                multiline
                                value={instructions}
                                onChangeText={setInstructions}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.placeOrderBtn, loading && { backgroundColor: '#ccc' }]}
                        onPress={handleConfirmOrder}
                        disabled={loading}
                    >
                        <Text style={styles.placeOrderText}>{loading ? "Processing..." : "Place Order"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <AddressBottomSheet
                isVisible={isSheetVisible}
                onClose={() => setSheetVisible(false)}
                selectedId={selectedAddress?.id || ''}
                onSelect={(id) => {
                    const addr = savedAddresses.find(a => a.id === id);
                    if (addr) {
                        setSelectedAddress(addr);
                        setUserName(addr.contactName);
                        setPhone(addr.phone);
                    }
                    setSheetVisible(false);
                }}
            />

        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    horizontalSection: {
        marginTop: 15,
        marginBottom: -10,
    },
    horizontalList: {
        paddingVertical: 10,
        paddingRight: 20,
    },
    cartContainer: {
        padding: 5
    },
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
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    addressCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
    },

    fadedText: {
        color: '#999'
    },
    editText: {
        color: '#D17842',
        fontWeight: 'bold',
        fontSize: 13,
    },
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
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14
    },
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
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    paymentText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333'
    },
    textAreaContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 60,
    },
    textArea: {
        flex: 1,
        textAlignVertical: 'top',
        paddingTop: 10
    },
    couponHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    applyText: {
        color: '#D17842',
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
    totalContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 2
    },
    totalLabel: {
        fontSize: 12,
        color: '#000'
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    placeOrderBtn: {
        backgroundColor: '#D17842',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    placeOrderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});

export default PlaceOrderScreen;