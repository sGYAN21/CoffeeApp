
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, Item } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSnackbar } from '../context/SnackbarContext';
import { useDispatch, useSelector } from 'react-redux';
import { addTofavourite, removeFromfavourite } from '../store/slices/favouriteSlice';
import { addToCart, removeFromCart, ItemSize } from '../store/slices/cartSlice';
import { RootState } from '../store/store';

const { width } = Dimensions.get('window');

interface Props {
  item: Item;
}

const CoffeeCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  // --- Logic to find Lowest Price and Volume ---
  const getLowestPriceDetails = () => {
    // Convert the price object into an array of [size, priceValue]
    const priceEntries = Object.entries(item.price) as [ItemSize, string][];
    
    // Find the entry with the minimum price
    const lowestEntry = priceEntries.reduce((min, current) => {
      return Number(current[1]) < Number(min[1]) ? current : min;
    });

    const lowestSize = lowestEntry[0];
    const lowestPrice = lowestEntry[1];
    const correspondingVolume = item.volume[lowestSize];

    return { lowestPrice, correspondingVolume, lowestSize };
  };

  const { lowestPrice, correspondingVolume, lowestSize } = getLowestPriceDetails();

  // --- Selectors ---
  const isfavourite = useSelector((state: RootState) =>
    state.favourite.items.some((fav) => fav.id === item.id && fav.type === item.type)
  );

  // For the "isInCart" check on the main card, we check if ANY size of this item is in cart
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((cartItem) => cartItem.id === item.id && cartItem.type === item.type)
  );

  const handlefavouritePress = (e: any) => {
    e.stopPropagation();
    if (isfavourite) {
      dispatch(removeFromfavourite({ id: item.id, type: item.type }));
      showSnackbar(`${item.name} removed from favourites`);
    } else {
      dispatch(addTofavourite(item));
      showSnackbar(`${item.name} added to favourites!`);
    }
  };

  const handleCartPress = (e: any) => {
    e.stopPropagation();
    if (isInCart) {
      // For simplicity on the main card, we remove the lowest-priced variant if toggled off
      dispatch(removeFromCart({ id: item.id, type: item.type, size: lowestSize }));
      showSnackbar(`${item.name} removed from cart`);
    } else {
      // Defaulting to the lowest priced size (e.g., Small) when clicking '+' on the main card
      dispatch(addToCart({ 
        ...item,
        selectedSize: lowestSize,
        quantity: 1,
        selected: true,
      }));
      showSnackbar(`${item.name} (${lowestSize}) added to cart!`);
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

          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color="#E7A13D" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          {/* Displaying Lowest Volume */}
          <Text style={styles.volumeText}>
            From <Text style={{ fontWeight: 'bold' }}>{correspondingVolume}</Text>
          </Text>

          <View style={styles.footer}>
            {/* Displaying Lowest Price */}
            <Text style={styles.price}>$ {lowestPrice}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                onPress={handlefavouritePress}
                style={styles.addButton}
              >
                <Icon
                  name={isfavourite ? "heart" : "heart-outline"}
                  size={22}
                  color={isfavourite ? "#E74C3C" : "black"}
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleCartPress} style={styles.addButton}>
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
    height: 420,
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