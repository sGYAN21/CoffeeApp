import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { toggleItemSelection, CartItem } from '../../../store/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

interface CartCardProps {

  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onIncrement, onDecrement, onRemove }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const displayPrice = item.price[item.selectedSize];
 const displayVolume = typeof item.volume === 'object' 
  ? item.volume[item.selectedSize] 
  : item.volume;

  // Calculate total for this specific row (price * quantity)
  const lineTotal = (Number(displayPrice) * item.quantity).toFixed(2);
  const handlePress = () => {
    navigation.navigate('ProductDetails', {
      item: item,
      category: item.category
    });
  };
  const toggleCheckbox = () => {
    // Pass id, type, AND size to uniquely identify this item in the cart
    dispatch(toggleItemSelection({
      id: item.id,
      type: item.type,
      size: item.selectedSize
    }));
  };

  return (
    <View style={[styles.card, !item.selected && styles.fadedCard]}>
      <TouchableOpacity
        style={styles.clickableArea}
        onPress={handlePress}
        activeOpacity={0.7}

        >
        <View>
          <Image source={{ uri: typeof item.image === 'string' ? item.image : ''}} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              {/* Show specific size and volume for this selected item */}
              <Text style={styles.itemType}>
                {item.selectedSize.charAt(0).toUpperCase() + item.selectedSize.slice(1)} | {displayVolume || '--'} ml
              </Text>
            </View>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkIcon}>
              <Icon
                name={item.selected ? "checkbox" : "square-outline"}
                size={25}
                color="#C67C4E"
              />
            </TouchableOpacity>
          </View>

          {/* Display the unit price and the calculated line total */}
          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>${displayPrice}</Text>
            {item.quantity > 1 && (
              <Text style={styles.lineTotal}> (Total: ${lineTotal})</Text>
            )}
          </View>

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
      </TouchableOpacity>
      {/* Quantity Selector */}
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fadedCard: {
    opacity: 0.5,
  },
  clickableArea: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginLeft: 8,
    marginTop: -5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    minHeight: 90,
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2D2C'
  },
  itemType: {
    fontSize: 12,
    color: '#9B9B9B',
    marginTop: 2
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2D2C'
  },
  lineTotal: {
    fontSize: 12,
    color: '#C67C4E',
    fontWeight: '500'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    fontSize: 11,
    color: '#C67C4E'
  },
  divider: {
    width: 1,
    height: 10,
    backgroundColor: '#EDEDED',
    marginHorizontal: 8
  },
  qtyWrapper: {
    position: 'absolute',
    right: 12,
    bottom: 12, // Adjusted to fit nicely
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  qtyBtn: { padding: 6 },
  qtyNumber: {
    paddingHorizontal: 8,
    fontWeight: '600',
    minWidth: 25,
    textAlign: 'center'
  },
});

export default CartCard;