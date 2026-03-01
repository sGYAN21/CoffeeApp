import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, } from '../../constants/index';
import CoffeeCard from './components/coffeeCard';
import backgroundImg from '../../assets/background.png';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const { width, height } = Dimensions.get('window');

import { productCategories, products } from './Model/product';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [mainCategory, setMainCategory] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatName = (name: string) => {
    if (!name) return '';
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

useEffect(() => {
    const loadInitialCategories = async () => {
      const cats = await productCategories();
      if (cats.length > 0) {
        setCategories(cats);
        setMainCategory(cats[0]);
      }
    };
    loadInitialCategories();
  }, []);

  useEffect(() => {
    if (!mainCategory) return;

    const loadData = async () => {
      setLoading(true);
      const { items, individualNames } = await products(mainCategory);
      
      setItems(items);
      setSubCategories(['All', ...individualNames]); 
      setLoading(false);
    };

    loadData();
  }, [mainCategory]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return activeCategory === 'All' || item.name === activeCategory;
    });
  }, [activeCategory, items]);
  const handleMainCategoryPress = (item: string) => {
    setMainCategory(item);
    setActiveCategory('All'); 
  }
  return (
    <SafeAreaProvider style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={backgroundImg}
        style={styles.bgImage}
        imageStyle={styles.imageBrightness}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.locationContainer}>
              <Icon name="location" size={18} color={theme.primary} />
              <Text style={styles.locationText}>New York, NYC</Text>
            </View>

            <TouchableOpacity>
              <Icon name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Text style={styles.searchText}>Search</Text>
              <View style={styles.searchIconBg}>
                <Icon name="search" size={18} color="white" />
              </View>
            </View>
          </View>
          <View style={styles.mainCategoryWrapper}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories} 
              contentContainerStyle={{ paddingHorizontal: 20 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleMainCategoryPress(item)}
                  style={[styles.mainCatBtn, mainCategory === item && styles.activeMainCatBtn]}
                >
                  <Text style={[styles.mainCatText, mainCategory === item && styles.activeMainCatText]}>
                   {formatName(item)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ImageBackground>

 <View style={styles.contentBody}>

        <View style={styles.subCategoryWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={subCategories} 
            contentContainerStyle={{ paddingHorizontal: 20 }}

            keyExtractor={(item) => `sub-${mainCategory}-${item}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setActiveCategory(item)}
                style={[styles.categoryBtn, activeCategory === item && styles.activeCategoryBtn]}
              >
                <Text style={[styles.categoryText, activeCategory === item && styles.activeCategoryText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Card List Area */}
        <View style={styles.cardListContainer}>
          {loading?(<ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />):(
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredItems}
            extraData={cartItems}
            keyExtractor={(item) => item.id.toString() + item.type}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => <CoffeeCard item={item} />}
            snapToInterval={width * 0.7 + 20}
            decelerationRate="fast"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon name="cafe-outline" size={50} color="#ccc" />
                <Text style={styles.emptyText}>No {activeCategory} items available</Text>
              </View>
            }
          />
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  bgImage: {
    width: width,
    height: height / 3.5, 
    backgroundColor: '#000',
  },
  imageBrightness: {
    opacity: 0.6,
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: 'white'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
    color: '#000'
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    padding: 6,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  searchText: {
    color: '#999',
    fontSize: 16
  },
  searchIconBg: {
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 25
  },
  mainCategoryWrapper: {
    marginTop: 20,
  },
  mainCatBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  activeMainCatBtn: {
    backgroundColor: 'white'
  },
  mainCatText: {
    color: 'white',
    fontWeight: '600'
  },
  activeMainCatText: {
    color: 'black'
  },
  contentBody: {
    flex: 1,
    marginTop: 20,
  },
  subCategoryWrapper: {
    marginBottom: 10
  },
  categoryBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#EDEDED',
    alignSelf: 'center'
  },
  activeCategoryBtn: {
    backgroundColor: theme.primary
  },
  categoryText: {
    color: '#444',
    fontWeight: 'bold',
  },
  activeCategoryText: {
    color: 'white'
  },
  cardListContainer: {
    flex: 1,
    marginTop: 1,
  },
  emptyContainer: {
    width: width - 40,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: { 
    color: '#999',
     marginTop: 10, 
     fontSize: 16 }
});
export default HomeScreen;