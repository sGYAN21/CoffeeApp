import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootState } from '../store/store';
import { addToCart, decrementQuantity, removeFromCart } from '../store/slices/cartSlice';
import CartItem from '../components/CartCard';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.totalPrice);

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color="#DEDEDE" />
      <Text style={styles.emptyText}>Your cart is empty</Text>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      {/* 1. Set background to transparent so the status bar icons (battery/network) show up */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* 2. SafeAreaView handles the top notch/status bar padding automatically */}
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        
        {/* 3. Header is now INSIDE SafeAreaView to prevent overlapping the battery icons */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>

        {/* 4. Combined "Proceed to Buy" button logic */}
        {cartItems.length > 0 && (
          <View style={styles.topButtonContainer}>
            <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
              <Text style={styles.checkoutText}>
                Proceed to Buy ({cartItems.length} items)
              </Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={cartItems}
          keyExtractor={(item) => `${item.id}-${item.type}`}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrement={() => dispatch(addToCart(item))}
              onDecrement={() => dispatch(decrementQuantity({ id: item.id, type: item.type }))}
              onRemove={() => dispatch(removeFromCart({ id: item.id, type: item.type }))}
            />
          )}
          ListEmptyComponent={renderEmptyCart}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  headerTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000'
  },
  topButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: -5, 
  },
  checkoutButton: {
    backgroundColor: '#C67C4E', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  totalAmount: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700'
  },
  listContent: {
    paddingTop: 10, 
    paddingBottom: 40,
    paddingHorizontal: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#9B9B9B'
  }
});

export default CartScreen;