import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, CoffeeItem } from '../constants';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Props {
  item: CoffeeItem;
}

const CoffeeCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>(); // Add <any> to prevent TS errors with navigation.navigate

  return (
    // 1. Wrap the whole card in a TouchableOpacity for better UX
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={() => navigation.navigate('ProductDetails', { item })} 
      style={styles.cardContainer}
    >
      <View style={styles.cardInner}>
        {/* 2. Handle both local assets and remote URIs */}
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
            
            {/* 3. Keep the button visual but prevent navigation double-trigger */}
            <View style={styles.addButton}>
              <Icon name="add" size={24} color="black" />
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
    // Elevation for Android and Shadows for iOS to match design depth
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
    padding: 8, 
    borderRadius: 50,
  },
});

export default CoffeeCard;