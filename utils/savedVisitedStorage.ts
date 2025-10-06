import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../types/Location';

export const addToSavedLocations = async (location: Location) => {
  const saved = await AsyncStorage.getItem('savedLocations');
  let savedArr: Location[] = saved ? JSON.parse(saved) : [];
  if (!savedArr.some(l => l.id === location.id)) {
    savedArr.push(location);
    await AsyncStorage.setItem('savedLocations', JSON.stringify(savedArr));
  }
};

export const addToVisitedLocations = async (location: Location) => {
  const visited = await AsyncStorage.getItem('visitedLocations');
  let visitedArr: Location[] = visited ? JSON.parse(visited) : [];
  if (!visitedArr.some(l => l.id === location.id)) {
    visitedArr.push(location);
    await AsyncStorage.setItem('visitedLocations', JSON.stringify(visitedArr));
  }
};

export const removeFromSavedLocations = async (locationId: number) => {
  const saved = await AsyncStorage.getItem('savedLocations');
  let savedArr: Location[] = saved ? JSON.parse(saved) : [];
  savedArr = savedArr.filter(l => l.id !== locationId);
  await AsyncStorage.setItem('savedLocations', JSON.stringify(savedArr));
};

export const removeFromVisitedLocations = async (locationId: number) => {
  const visited = await AsyncStorage.getItem('visitedLocations');
  let visitedArr: Location[] = visited ? JSON.parse(visited) : [];
  visitedArr = visitedArr.filter(l => l.id !== locationId);
  await AsyncStorage.setItem('visitedLocations', JSON.stringify(visitedArr));
};