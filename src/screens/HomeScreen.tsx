import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, categories, coffeeItems } from '../constants';
import CoffeeCard from '../components/coffeeCard';
import image from '../assets/beans.jpg';
const { width, height } = Dimensions.get('window');
const HomeScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Latte');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={image} // Update with your actual file name
        style={styles.bgImage}
        resizeMode="cover"
      ></ImageBackground>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        <View style={styles.locationContainer}>
          <Icon name="location" size={18} color={theme.primary} />
          <Text style={styles.locationText}>New York, NYC</Text>
        </View>
        <Icon name="notifications-outline" size={24} color="black" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
          <View style={styles.searchIconBg}>
            <Icon name="search" size={18} color="white" />
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={{ marginTop: 25 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyExtractor={(item) => item}
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

      {/* Carousel Slider */}
      <View style={{ flex: 1, marginTop: 40 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={coffeeItems}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => <CoffeeCard item={item} />}
          snapToInterval={width * 0.7 + 20}
          decelerationRate="fast"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  bgImage: {
    width: width,
    height: height / 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, marginTop: 40, },
  avatar: { width: 45, height: 45, borderRadius: 22 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontWeight: 'bold', marginLeft: 5, fontSize: 16 },
  searchSection: { paddingHorizontal: 20, marginTop: 20 },
  searchBar: { flexDirection: 'row', backgroundColor: '#EDEDED', borderRadius: 30, padding: 8, alignItems: 'center', justifyContent: 'space-between' },
  searchText: { color: '#999', marginLeft: 15, fontSize: 16 },
  searchIconBg: { backgroundColor: theme.primary, padding: 10, borderRadius: 25 },
  categoryBtn: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 25, marginRight: 10, backgroundColor: '#EDEDED' },
  activeCategoryBtn: { backgroundColor: theme.primary },
  categoryText: { color: '#444', fontWeight: 'bold', fontSize: 16 },
  activeCategoryText: { color: 'white' },
});

export default HomeScreen;