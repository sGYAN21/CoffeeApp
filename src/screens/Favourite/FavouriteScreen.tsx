import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FavouriteCard from './components/FavouriteCard';
import Icon from 'react-native-vector-icons/Ionicons';

const FavouriteScreen = () => {

  const favoriteItems = useSelector((state: RootState) => state.favourite.items);

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Icon name="cart-outline" size={80} color="#DEDEDE" />
      <Text style={styles.emptyText}>Your cart is empty</Text>
    </View>
  );


  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0C0F14" translucent={true} />

      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>

        {/* Grid List using your FavouriteCard */}
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => `${item.id}-${item.type}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listPadding}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="heart" size={80} color="#DEDEDE" />
              <Text style={styles.emptyText}>No favorites yet!</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <FavouriteCard
                item={item}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 2,
  },
  listPadding: {
    paddingBottom: 100,
    paddingTop: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#52555A',
    fontSize: 16,
  },
});

export default FavouriteScreen;