import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, Item } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSnackbar } from '../context/SnackbarContext';
import { useDispatch, useSelector } from 'react-redux';
import { addTofavourite, removeFromfavourite } from '../store/slices/favouriteSlice';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { CartItem } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
const { width } = Dimensions.get('window');

interface Props {
  item: Item;
}

const CoffeeCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.some((fav) => fav.id === item.id && fav.type === item.type)
  );
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((cartItem) => cartItem.id === item.id && cartItem.type === item.type)
  );
  const handleFavoritePress = (e: any) => {
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromfavourite({ id: item.id, type: item.type }));
      showSnackbar(`${item.name} removed from favorites`);
    } else {
      dispatch(addTofavourite(item));
      showSnackbar(`${item.name} added to favorites!`);
    }
  };

  const handleCartPress = (e: any) => {
    e.stopPropagation();
    e.stopPropagation();

    if (isInCart) {
      // Remove if already there
      dispatch(removeFromCart({ id: item.id, type: item.type }));
      showSnackbar(`${item.name} removed from cart`);
    } else {
      // Add if not there
      const itemToAdd: CartItem = { ...item, quantity: 1 };
      dispatch(addToCart(itemToAdd));
      showSnackbar(`${item.name} added to cart!`);
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
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color="#E7A13D" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <Text style={styles.volumeText}>
            Volume <Text style={{ fontWeight: 'bold' }}>{item.volume}</Text>
          </Text>

          <View style={styles.footer}>
            <Text style={styles.price}>$ {item.price}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity
                onPress={handleFavoritePress}
                style={styles.addButton}
              >
                <Icon
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#E74C3C" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCartPress} style={styles.addButton}>
                <Icon
                  name={isInCart ? "checkmark-circle" : "add"}
                  size={24}
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
    width: width * 0.7,
    height: 450,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  cardInner: {
    backgroundColor: '#5D4037',
    width: '100%',
    height: '80%',
    borderRadius: 40,
    padding: 25,
    justifyContent: 'flex-end',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    zIndex: 10,
  },
  content: { marginBottom: 10 },
  name: { fontSize: 28, fontWeight: 'bold', color: theme.white, marginBottom: 5 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  ratingText: { color: theme.white, marginLeft: 5, fontSize: 14 },
  volumeText: { color: '#D1D1D1', fontSize: 16, marginBottom: 15 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: theme.white, fontSize: 24, fontWeight: 'bold' },
  addButton: {
    backgroundColor: theme.white,
    padding: 7,
    borderRadius: 50,
  },
});

export default CoffeeCard;