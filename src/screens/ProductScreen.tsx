
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   ScrollView,
//   Animated,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { theme } from '../constants';
// import { useNavigation } from '@react-navigation/native';
// import imageBack from '../assets/coffee-beans.jpg';
// import { useDispatch } from 'react-redux';
// import { useSnackbar } from '../context/SnackbarContext';
// import { addToCart } from '../store/slices/cartSlice';

// const { width, height } = Dimensions.get('window');
// const sizes = ['Small', 'Medium', 'Large'];

// const ProductScreen = ({ route }: any) => {
//   const { item }: any = route.params || {};
//   const navigation = useNavigation<any>();
//   const insets = useSafeAreaInsets();

//   const dispatch = useDispatch();
//   const { showSnackbar } = useSnackbar();
//   const [selectedSize, setSelectedSize] = useState('Small');
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {

//     dispatch(addToCart({
//       ...item,
//       quantity: quantity,
//       selectedSize: selectedSize, 
//     }));

//     // 2. Trigger Global Snackbar
//     showSnackbar(`${quantity} ${item.name} (${selectedSize}) added to cart`);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

//         {/* Header Section with Background Pattern */}
//         <ImageBackground
//           source={imageBack}
//           style={[styles.headerBg, { paddingTop: insets.top }]}
//           imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
//         >
//           {/* Top Bar Navigation */}
//           <View style={styles.navBar}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
//               <Icon name="arrow-back" size={24} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.roundBtn}>
//               <Icon name="heart" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

//           {/* Overlapping Coffee Image centered in header */}
//           <View style={styles.imageContainer}>
//             <Image
//               source={item.image}
//               style={styles.mainImage}
//             />
//           </View>
//         </ImageBackground>

//         {/* Product Details Section */}
//         <View style={styles.detailsContainer}>
//           <View style={styles.ratingBadge}>
//             <Icon name="star" size={16} color="#E7A13D" />
//             <Text style={styles.ratingText}>{item.rating}</Text>
//           </View>

//           <View style={styles.titleRow}>
//             <Text style={styles.title}>{item.name}</Text>
//             <Text style={styles.price}>$ {item.price}</Text>
//           </View>

//           <Text style={styles.sectionTitle}>Coffee size</Text>

//           <FlatList
//             data={sizes}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={(size) => size}
//             contentContainerStyle={styles.sizeList}
//             renderItem={({ item: size }) => {
//               const isActive = selectedSize === size;
//               return (
//                 <TouchableOpacity
//                   onPress={() => setSelectedSize(size)}
//                   style={[styles.sizeBtn, isActive && styles.activeSizeBtn]}
//                 >
//                   <Text style={[styles.sizeText, isActive && styles.activeSizeText]}>
//                     {size}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />

//           <Text style={styles.sectionTitle}>About</Text>
//           <Text style={styles.description}>
//             {item.description || "A rich and delicious coffee experience crafted specifically for your taste."}
//           </Text>

//           <View style={styles.volumeRow}>
//             <Text style={styles.volumeLabel}>Volume <Text style={{ fontWeight: 'bold' }}>{item.volume}</Text></Text>

//             <View style={styles.quantityContainer}>
//               <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
//                 <Icon name="remove" size={20} color="black" />
//               </TouchableOpacity>
//               <Text style={styles.qtyText}>{quantity}</Text>
//               <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
//                 <Icon name="add" size={20} color="black" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Buy Now Footer */}
//       <View style={[styles.footer, { paddingBottom: insets.bottom + 15 }]}>
//         <TouchableOpacity
//           style={styles.cartIconBtn}
//           onPress={handleAddToCart}
//         >
//           <Icon name="basket-outline" size={28} color="#9B9B9B" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.buyNowBtn}>
//           <Text style={styles.buyNowText}>Buy now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   headerBg: {
//     width: '100%',
//     height: height * 0.35
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 10
//   },
//   roundBtn: {
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 10,
//     borderRadius: 50
//   },
//   imageContainer: {
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: -100,
//     width: '100%'
//   },
//   mainImage: {
//     width: 260,
//     height: 260,
//     borderRadius: 130
//   },
//   detailsContainer: {
//     paddingHorizontal: 25,
//     marginTop: 120
//   },
//   ratingBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(198, 124, 78, 0.1)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     alignSelf: 'flex-start'
//   },
//   ratingText: {
//     marginLeft: 5,
//     fontWeight: 'bold',
//     color: theme.primary
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 20
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#2F2D2C'
//   },
//   price: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#2F2D2C'
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2F2D2C',
//     marginTop: 15
//   },
//   sizeList: {
//     marginVertical: 15
//   },
//   sizeBtn: {
//     backgroundColor: '#F0F0F0',
//     paddingHorizontal: 28,
//     paddingVertical: 14,
//     borderRadius: 15,
//     marginRight: 15
//   },
//   activeSizeBtn: {
//     backgroundColor: theme.primary
//   },
//   sizeText: {
//     color: '#9B9B9B',
//     fontWeight: '500'
//   },
//   activeSizeText: {
//     color: 'white'
//   },
//   description: {
//     color: '#9B9B9B',
//     lineHeight: 24,
//     fontSize: 16,
//     marginTop: 10
//   },
//   volumeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 25,
//     marginBottom: 10
//   },
//   volumeLabel: {
//     fontSize: 16,
//     color: '#9B9B9B'
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//     borderRadius: 30,
//     padding: 5
//   },
//   qtyBtn: {
//     padding: 10
//   },
//   qtyText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 15
//   },
// footer: {
//   position: 'absolute',
//   bottom: 0,
//   width: '100%',
//   flexDirection: 'row',
//   paddingHorizontal: 25,
//   paddingTop: 20,
//   backgroundColor: 'white',
//   alignItems: 'center'
// },
// cartIconBtn: {
//   borderWidth: 1,
//   borderColor: '#F0F0F0',
//   borderRadius: 20,
//   padding: 15,
//   marginRight: 15
// },
// buyNowBtn: {
//   flex: 1,
//   backgroundColor: theme.primary,
//   borderRadius: 20, height: 65,
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// buyNowText: {
//   color: 'white',
//   fontSize: 20,
//   fontWeight: 'bold'
// },

//   // Snackbar Styles
//   snackbar: {
//     position: 'absolute',
//     alignSelf: 'center',
//     backgroundColor: '#C67C4E',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   snackbarText: {
//     color: 'white',
//     marginLeft: 10,
//     fontWeight: '600',
//     fontSize: 14,
//   }
// });

// export default ProductScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSnackbar } from '../context/SnackbarContext';
import { addToCart } from '../store/slices/cartSlice';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');
const sizes = ['Small', 'Medium', 'Large'];

const ProductScreen = ({ route }: any) => {
  const { item }: any = route.params || {};
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const [selectedSize, setSelectedSize] = useState('Small');

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1, selectedSize }));
    showSnackbar(`${item.name} (${selectedSize}) added to cart`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ScrollView needs to contain the image and the box to scroll together */}
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Top Image Section */}
        <View style={styles.imageHeader}>
          <Image source={item.image} style={styles.mainImage} resizeMode="cover" />

          {/* Custom Header Nav */}
          <View style={[styles.navBar, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundBtn}>
              <Icon name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundBtn}>
              <Icon name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={14} color="#C67C4E" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>

        {/* Content Section overlapping the image */}
        <View style={styles.contentBody}>
          {/* Title Overlay sitting inside the image area */}
          <View style={styles.titleOverlay}>
            <Text style={styles.headerTitle}>{item.name}</Text>

          </View>
          <Text style={styles.sectionTitle}>Coffee Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => {
              const isActive = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[styles.sizeBtn, isActive && styles.activeSizeBtn]}
                >
                  <Text style={[styles.sizeText, isActive && styles.activeSizeText]}>{size}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {item.description} <Text style={styles.readMore}>Read more</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Footer stays at the bottom */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 15 }]}>
        <TouchableOpacity style={styles.cartIconBtn} onPress={handleAddToCart}>
          <Icon name="basket-outline" size={28} color="#9B9B9B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Text style={styles.buyNowText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  imageHeader: {
    width: width,
    height: height * 0.45
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  navBar: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  roundBtn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 50
  },
  titleOverlay: {

  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black'
  },
  subTitle: {
    fontSize: 14,
    color: 'black',
    marginTop: 4
  },
  ratingContainer:{
    position: 'absolute', 
    bottom: 60, 
    left: 25
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: 10
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 12
  },
  contentBody: {
    backgroundColor: 'white',
    padding: 25,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: height * 0.5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2D2C',
    marginBottom: 15
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  sizeBtn: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EDEDED',
    marginHorizontal: 5
  },
  activeSizeBtn: {
    backgroundColor: '#4B2C20',
    borderColor: '#4B2C20'
  },
  sizeText: {
    color: '#2F2D2C',
    fontSize: 14
  },
  activeSizeText: {
    color: 'white',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#9B9B9B',
    lineHeight: 22
  },
  readMore: {
    color: '#2F2D2C',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
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
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ProductScreen;