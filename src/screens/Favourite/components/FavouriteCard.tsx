import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {  Item } from '../../../types/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartActions } from '../../../hooks/useCartActions';
import { useFavouriteActions } from '../../../hooks/useFavouriteActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ItemSize } from '../../../store/slices/cartSlice';

interface FavouriteCardProps {
  item: Item;
}

const FavouriteCard = ({ item }: FavouriteCardProps) => {
  const navigation = useNavigation<any>();
  
  // Centralized Hooks
  const { addItemToCart, removeItemFromCart, isSyncing: cartSyncing } = useCartActions();
  const { addFavourite, removeSingleFavourite } = useFavouriteActions();

  // Define targeting 'small' size for the quick-add button
  const lowestSize: ItemSize = 'small';
  const displayPrice = item.price[lowestSize] || "0";

  const handlePress = () => {
    navigation.navigate('ProductDetails', {
      item: item,
      category: item.category
    });
  };

  // Selector for Favourite status
  const isFavourite = useSelector((state: RootState) =>
    state.favourite.items.some(
      (favItem) => String(favItem.id) === String(item.id) && favItem.type === item.type
    )
  );

  // Selector for Cart status (specifically for the 'small' size)
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some(
      (cartItem) =>
        String(cartItem.id) === String(item.id) &&
        cartItem.selectedSize === lowestSize
    )
  );

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
      removeItemFromCart(item.id, item.name, item.type, lowestSize);
    } else {
      addItemToCart(item, lowestSize, 1);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={styles.prodImg}
          />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.prodTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            <Text style={styles.currency}>$ </Text>{displayPrice}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
              onPress={handlefavouritePress}
              style={styles.addButton}
            >
              <Icon
                name={isFavourite ? "heart" : "heart-outline"}
                size={19}
                color={isFavourite ? "#fff" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleCartPress}
              style={[styles.addButton, isInCart && { backgroundColor: '#4CAF50' }]}
              disabled={cartSyncing}
            >
              <Icon
                name={isInCart ? "checkmark-circle" : "add"}
                size={22}
                color={isFavourite ? "#fff" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    borderRadius: 15,
    overflow: 'hidden',
  },
  prodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 10,
  },
  prodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  description: {
    fontSize: 11,
    color: '#9b9b9b',
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F3337',
  },
  currency: {
    color: '#D17842',
  },
  addButton: {
    backgroundColor: '#D17842',
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavouriteCard;