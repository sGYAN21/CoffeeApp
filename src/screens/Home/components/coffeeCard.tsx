import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Item } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ItemSize } from '../../../store/slices/cartSlice';
import { RootState } from '../../../store/store';
import { useCartActions } from '../../../hooks/useCartActions';
import { useFavouriteActions } from '../../../hooks/useFavouriteActions';

const { width } = Dimensions.get('window');

interface Props {
  item: Item;
}

const CoffeeCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  
  // Centralized Hooks
  const { addItemToCart, removeItemFromCart, isSyncing: cartSyncing } = useCartActions();
  const { addFavourite, removeSingleFavourite } = useFavouriteActions();


  const defaultSize: ItemSize = 'small';
  const displayPrice = item.price[defaultSize] || "0";
  const displayVolume = item.volume[defaultSize] || "0";

  // --- Selectors ---
  const isFavourite = useSelector((state: RootState) =>
    state.favourite.items.some(
      (favItem) =>
        String(favItem.id) === String(item.id) && 
        favItem.type === item.type
    )
  );

  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some(
      (cartItem) =>
        String(cartItem.id) === String(item.id) &&
        cartItem.selectedSize === defaultSize
    )
  );

  // --- Handlers ---
  const handlefavouritePress = (e: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isFavourite) {
      removeSingleFavourite(item.id, item.name, item.type);
    } else {
      addFavourite(item);
    }
  };

  const handleCartPress = (e: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (cartSyncing) return;

    if (isInCart) {
      removeItemFromCart(item.id, item.name, item.type, defaultSize);
    } else {
      
      addItemToCart(item, defaultSize, 1);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('ProductDetails', { item })}
      style={styles.cardContainer}
    >
      <View style={styles.cardInner}>
        <Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={[styles.ratingRow, { marginBottom: 5 }]}>
              <Icon name="star" size={14} color="#E7A13D" />
              <Text style={styles.ratingText}>{item.rating || 0}</Text>
            </View>
            <View style={{ marginBottom: 3 }}>
              <Text style={styles.categoryText}>{item.category} | {item.type}</Text>
            </View>
          </View>

          {/* Displaying Small Volume */}
          <Text style={styles.volumeText}>
            Size: <Text style={{ fontWeight: 'bold' }}>{displayVolume} ml</Text>
          </Text>

          <View style={styles.footer}>
            {/* Displaying Small Price */}
            <Text style={styles.price}>$ {displayPrice}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                onPress={handlefavouritePress}
                style={styles.addButton}
              >
                <Icon
                  name={isFavourite ? "heart" : "heart-outline"}
                  size={22}
                  color={isFavourite ? "#E74C3C" : "black"}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleCartPress} 
                style={styles.addButton}
                disabled={cartSyncing}
              >
                <Icon
                  name={isInCart ? "checkmark-circle" : "add"}
                  size={22}
                  color={isInCart ? "#4CAF50" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.65,
    height: 410,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  cardInner: {
    backgroundColor: '#3C2A21',
    width: '100%',
    height: '80%',
    borderRadius: 40,
    padding: 20,
    justifyContent: 'flex-end',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    zIndex: 10,
  },
  content: { marginBottom: 5 },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    textTransform: 'capitalize'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  ratingText: { color: 'white', marginLeft: 5, fontSize: 12 },
  volumeText: { color: '#D1D1D1', fontSize: 14, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  addButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
  },
});

export default CoffeeCard;