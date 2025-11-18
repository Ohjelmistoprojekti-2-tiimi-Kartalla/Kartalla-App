import React, { useState } from 'react';
import { styles } from '../styles';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Location } from "../types/Location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import LocationCard from '../Components/LocationCard';
import TabSwitcher from '../Components/TabSwitcher';
import EmptyState from '../Components/EmptyState';

type TabType = 'saved' | 'visited';

type RootStackParamList = {
  Kartalla: { screen?: string; params?: { location: Location } };
  DestinationDetails: { location: Location };
  // Add other screens if needed
};

const DestinationListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [saved, setSaved] = useState<Location[]>([]);
  const [visited, setVisited] = useState<Location[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Load saved locations
  const loadSavedLocations = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedLocations');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validLocations = parsed.filter(
          (loc: Location) => loc && loc.sportsPlaceId && loc.name
        );
        setSaved(validLocations);
        console.log('Loaded saved locations:', validLocations);
      }
    } catch (error) {
      console.error('Error loading saved locations:', error);
    }
  };

  // Load visited locations
  const loadVisitedLocations = async () => {
    try {
      const visited = await AsyncStorage.getItem('visitedLocations');
      if (visited) {
        const parsed = JSON.parse(visited);
        const validLocations = parsed.filter(
          (loc: Location) => loc && loc.sportsPlaceId && loc.name
        );
        setVisited(validLocations);
        console.log('Loaded visited locations:', validLocations);
      }
    } catch (error) {
      console.error('Error loading visited locations:', error);
    }
  };

  // Load locations when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadSavedLocations();
      loadVisitedLocations();
    }, [])
  );

  const currentLocations = activeTab === 'saved' ? saved : visited;
  const emptyMessage = activeTab === 'saved'
    ? 'Ei tallennettuja kohteita'
    : 'Ei vierailtuja kohteita';

  // Remove location from saved or visited
  const removeLocation = async (id: string) => {
    try {
      if (activeTab === 'saved') {
        const updated = saved.filter(loc => loc.sportsPlaceId.toString() !== id);
        setSaved(updated);
        await AsyncStorage.setItem('savedLocations', JSON.stringify(updated));
      } else {
        const updated = visited.filter(loc => loc.sportsPlaceId.toString() !== id);
        setVisited(updated);
        await AsyncStorage.setItem('visitedLocations', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error removing location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TabSwitcher
        activeTab={activeTab}
        setActiveTab={(tab: 'saved' | 'visited') => setActiveTab(tab)}
      />
      {currentLocations.length > 0 ? (
        <FlatList
          data={currentLocations}
          renderItem={({ item }) => (
            <LocationCard
              item={item}
              onPress={() => {
                console.log('Navigating with location:', item);
                navigation.navigate('Kartalla', {
                  screen: 'DestinationDetails',
                  params: { location: item },
                });
              }}
              onDelete={() => removeLocation(item.sportsPlaceId.toString())}
            />
          )}
          keyExtractor={(item) => item.sportsPlaceId.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          icon={activeTab === 'saved' ? 'bookmark-outline' : 'checkmark-circle-outline'}
          message={emptyMessage}
        />
      )}
    </View>
  );
};

export default DestinationListScreen;