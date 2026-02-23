// import React from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// import { theme } from '../constants';

// interface CoffeeProduct {
//   image: any;
//   title: string;
//   description: string; 
//   price: string;
//   rating: number;
// }

// const FavouriteCard = ({ 
//   image, 
//   title, 
//   description, 
//   price, 
//   rating 
// }: CoffeeProduct) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.imageContainer}>
//         <Image source={image} style={styles.prodImg} />
//         <View style={styles.ratingBadge}>
//           <Text style={styles.ratingText}>⭐ {rating}</Text>
//         </View>
//       </View>
      
//       {/* Info Section */}
//       <View style={styles.infoContainer}>
//         <Text style={styles.prodTitle}>{title}</Text>
//         <Text style={styles.description}>{description}</Text>
        
//         <View style={styles.priceRow}>
//           <Text style={styles.priceText}>
//             <Text style={styles.currency}>$ </Text>{price}
//           </Text>
          
//           <TouchableOpacity style={styles.addButton}>
//             <Text style={styles.plusIcon}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: '48%',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 10,
//     marginBottom: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '100%',
//     height: 140,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   prodImg: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   ratingBadge: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderBottomLeftRadius: 15,
//   },
//   ratingText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     marginTop: 10,
//   },
//   prodTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',
//     marginBottom: 4
//   },
//   description: {
//     fontSize: 11,
//     color: '#9b9b9b',
//     marginVertical: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   priceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#9b9b9b',
//   },
//   currency: {
//     color: '#D17842', 
//   },
//   addButton: {
//     backgroundColor: theme.secondary,
//     width: 30,
//     height: 30,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusIcon: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default FavouriteCard;

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { theme, Item } from '../constants'; 

interface FavouriteCardProps {
  item: Item; 
}

const FavouriteCard = ({ item }: FavouriteCardProps) => {

  const priceValues = Object.values(item.price).map(val => Number(val));
  const lowestPrice = Math.min(...priceValues);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>

        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={styles.prodImg} 
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        {/* Item uses 'name', not 'title' */}
        <Text style={styles.prodTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            <Text style={styles.currency}>$ </Text>{lowestPrice}
          </Text>
          
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>
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