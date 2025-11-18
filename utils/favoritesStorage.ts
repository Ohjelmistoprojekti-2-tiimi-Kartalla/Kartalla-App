import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../types/Location';

// Saving location to favorites
export const addToFavorites = async (location: Location): Promise<void> => {
  try {
    const favorites = await getFavoriteLocations();

    if (!favorites.some((fav) => fav.sportsPlaceId === location.sportsPlaceId)) {
      favorites.push(location);

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

// Removing location from favorites
export const removeFromFavorites = async (sportsPlaceId: number): Promise<void> => {
  try {
    const favorites = await getFavoriteLocations();
    const updatedFavorites = favorites.filter((fav) => fav.sportsPlaceId !== sportsPlaceId);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

// Fetching favorite locations
export const getFavoriteLocations = async (): Promise<Location[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem('favorites');
    const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
    return favorites;

  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};
