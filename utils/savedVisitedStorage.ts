import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../types/Location';

export const addToSavedLocations = async (location: Location) => {
  if (!location || !location.sportsPlaceId || !location.name) {
    console.warn('Invalid location, not saving:', location);
    return;
  }
  try {
    const saved = await AsyncStorage.getItem('savedLocations');
    let savedArr: Location[] = saved ? JSON.parse(saved) : [];
    if (!savedArr.some(l => l.sportsPlaceId === location.sportsPlaceId)) {
      savedArr.push(location);
      await AsyncStorage.setItem('savedLocations', JSON.stringify(savedArr));
      console.log('Saved location:', location.sportsPlaceId);
    } else {
      console.log('Location already saved:', location.sportsPlaceId);
    }
  } catch (error) {
    console.error('Error saving location:', error);
  }
};

export const addToVisitedLocations = async (location: Location) => {
  if (!location || !location.sportsPlaceId || !location.name) {
    console.warn('Invalid location, not saving:', location);
    return;
  }
  try {
    const visited = await AsyncStorage.getItem('visitedLocations');
    let visitedArr: Location[] = visited ? JSON.parse(visited) : [];
    if (!visitedArr.some(l => l.sportsPlaceId === location.sportsPlaceId)) {
      visitedArr.push(location);
      await AsyncStorage.setItem('visitedLocations', JSON.stringify(visitedArr));
      console.log('Visited location:', location.sportsPlaceId);
    } else {
      console.log('Location already visited:', location.sportsPlaceId);
    }
  } catch (error) {
    console.error('Error saving visited location:', error);
  }
};

export const removeFromSavedLocations = async (locationId: number) => {
  try {
    const saved = await AsyncStorage.getItem('savedLocations');
    let savedArr: Location[] = saved ? JSON.parse(saved) : [];
    savedArr = savedArr.filter(l => l.sportsPlaceId !== locationId);
    await AsyncStorage.setItem('savedLocations', JSON.stringify(savedArr));
    console.log('Removed saved location:', locationId);
  } catch (error) {
    console.error('Error removing saved location:', error);
  }
};

export const removeFromVisitedLocations = async (locationId: number) => {
  try {
    const visited = await AsyncStorage.getItem('visitedLocations');
    let visitedArr: Location[] = visited ? JSON.parse(visited) : [];
    visitedArr = visitedArr.filter(l => l.sportsPlaceId !== locationId);
    await AsyncStorage.setItem('visitedLocations', JSON.stringify(visitedArr));
    console.log('Removed visited location:', locationId);
  } catch (error) {
    console.error('Error removing visited location:', error);
  }
};