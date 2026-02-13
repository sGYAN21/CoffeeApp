import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Item } from '../constants/index';

interface CartCardProps {
  item: Item & { quantity: number }; // Merging your type with quantity from Redux
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.checkIcon}>
        <Icon name="checkbox" size={20} color="#C67C4E" />
      </View>

      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemType}>{item.type} | {item.volume}</Text>
        </View>
        
        <Text style={styles.itemPrice}>${item.price}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.actionText}>Save for later</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modern Quantity Selector */}
      <View style={styles.qtyWrapper}>
        <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
          <Icon name="remove" size={16} color="#2F2D2C" />
        </TouchableOpacity>
        <Text style={styles.qtyNumber}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
          <Icon name="add" size={16} color="#2F2D2C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: { marginRight: 8 },
  image: { width: 75, height: 75, borderRadius: 12 },
  infoContainer: { flex: 1, marginLeft: 12, height: 75, justifyContent: 'space-between' },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#2F2D2C' },
  itemType: { fontSize: 12, color: '#9B9B9B' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#2F2D2C' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 11, color: '#C67C4E' },
  divider: { width: 1, height: 10, backgroundColor: '#EDEDED', marginHorizontal: 8 },
  qtyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  qtyBtn: { padding: 6 },
  qtyNumber: { paddingHorizontal: 4, fontWeight: '600', minWidth: 20, textAlign: 'center' },
});

export default CartCard;