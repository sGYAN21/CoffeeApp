
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import imageBack from '../../assets/productBack.webp';
import { ItemSize } from '../../store/slices/cartSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { useCartActions } from '../../hooks/useCartActions';
import { useFavouriteActions } from '../../hooks/useFavouriteActions';
const { height } = Dimensions.get('window');
const sizes: { label: string; value: ItemSize }[] = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];
const ProductScreen = ({ route }: any) => {

  const formatName = (name: string) => {
    if (!name) return '';
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const { item }: any = route.params || {};
  const navigation = useNavigation<any>();
  const { addItemToCart } = useCartActions();
  const insets = useSafeAreaInsets();

  const { addFavourite, removeSingleFavourite, } = useFavouriteActions();
  const [selectedSize, setSelectedSize] = useState<ItemSize>('small');
  const [quantity, setQuantity] = useState(1);


  const isFavourite = useSelector((state: RootState) => {
    const found = state.favourite.items.some(
      (favItem) =>
        String(favItem.id) === String(item.id) &&
        favItem.type === item.type
    );
    return found;
  });

  const currentPrice = item.price[selectedSize];
  const currentVolume = item.volume[selectedSize];


  const handleBuyNow = () => {
    navigation.navigate('PlaceOrder');
  };
  
  const handleAddToCart = () => {
    addItemToCart(item, selectedSize, quantity);
  };

  const handlefavouritePress = (e: any) => {
    e.stopPropagation();
    if (isFavourite) {
      removeSingleFavourite(item.id, item.name, item.type);
    } else {
      addFavourite(item);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground
          source={imageBack}
          style={[styles.headerBg, { paddingTop: insets.top }]}
          imageStyle={{ opacity: 0.6 }}
        >
          {/* Top Bar Navigation */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundBtn}
              onPress={handlefavouritePress}
            >
              <Icon
                name={isFavourite ? "heart" : "heart-outline"}
                size={23}
                color={isFavourite ? "#E74C3C" : "#fff"}
              />
            </TouchableOpacity>
          </View>

          {/* Overlapping Coffee Image centered in header */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.mainImage}
            />
          </View>
        </ImageBackground>

        {/* Product Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={16} color="#E7A13D" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>$ {currentPrice}</Text>
          </View>

          <Text style={styles.sectionTitle}>{formatName(item.category)} size</Text>

          <FlatList
            data={sizes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(s) => s.value}
            contentContainerStyle={styles.sizeList}
            renderItem={({ item: size }) => {
              const isActive = selectedSize === size.value;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedSize(size.value)}
                  style={[styles.sizeBtn, isActive && styles.activeSizeBtn]}
                >
                  <Text style={[styles.sizeText, isActive && styles.activeSizeText]}>
                    {size.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {item.description || "A rich and delicious coffee experience crafted specifically for your taste."}
          </Text>

          <View style={styles.volumeRow}>
            <Text style={[styles.volumeLabel, { color: '#2F2D2C', }]}>Volume {"  "}<Text style={{ fontWeight: 'semibold' }}>{currentVolume} ml</Text></Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                <Icon name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                <Icon name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Now Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 15 }]}>
        <TouchableOpacity
          style={styles.cartIconBtn}
          onPress={handleAddToCart}
        >
          <Icon name="basket-outline" size={28} color="#9B9B9B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerBg: {
    width: '100%',
    height: height * 0.35
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10
  },
  roundBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -100,
    width: '100%'
  },
  mainImage: {
    width: 260,
    height: 260,
    borderRadius: 70
  },
  detailsContainer: {
    paddingHorizontal: 25,
    marginTop: 120
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(198, 124, 78, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: theme.primary
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F2D2C'
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2F2D2C'
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2F2D2C',
    marginTop: 15
  },
  sizeList: {
    marginVertical: 15
  },
  sizeBtn: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 15,
    marginRight: 15
  },
  activeSizeBtn: {
    backgroundColor: theme.primary
  },
  sizeText: {
    color: '#9B9B9B',
    fontWeight: '500'
  },
  activeSizeText: {
    color: 'white'
  },
  description: {
    color: '#9B9B9B',
    lineHeight: 24,
    fontSize: 16,
    marginTop: 10
  },
  volumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 30,
    padding: 5
  },
  qtyBtn: {
    padding: 6
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  cartIconBtn: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 20,
    padding: 15,
    marginRight: 15
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 20, height: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyNowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  // Snackbar Styles
  snackbar: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#C67C4E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  snackbarText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  }
});

export default ProductScreen;