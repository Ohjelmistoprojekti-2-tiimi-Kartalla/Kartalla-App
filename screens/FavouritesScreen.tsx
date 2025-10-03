import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Location } from '../types/Location';
import { getFavoriteLocations } from '../utils/favoritesStorage';

type RootStackParamList = {
  Kartalla: { screen?: string; params?: { location: Location } };
  DestinationDetails: { location: Location };
  Suosikit: undefined;
};

export default function FavouritesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [favorites, setFavorites] = useState<Location[]>([]);
  const isFocused = useIsFocused();

  const fetchFavorites = async () => {
    const favorites = await getFavoriteLocations();
    setFavorites(favorites);
  };

  useEffect(() => {
    fetchFavorites();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Kartalla', {
          screen: 'DestinationDetails',
          params: { location: item },
        });
      }}
    >
      <Text style={styles.itemText}>
        {typeof item.name === 'string' ? item.name : item.name || item.name || 'Ei nimeä'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Ei suosikkeja</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.sportsPlaceId.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1815',
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});