import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FlatList, Text, View } from 'react-native';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Total: ${total}</Text>
      <FlatList 
        data={cartItems}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default Cart