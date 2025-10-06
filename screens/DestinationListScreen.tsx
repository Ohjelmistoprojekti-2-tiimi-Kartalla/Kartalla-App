import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Location } from "../types/Location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import LocationCard from '../Components/LocationCard';
import TabSwitcher from '../Components/TabSwitcher';
import EmptyState from '../Components/EmptyState';

type TabType = 'saved' | 'visited';

type RootStackParamList = {
  DestinationDetails: { location: Location };
  // lisää muut ruudut jos tarvitset
};

const DestinationListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [saved, setSaved] = useState<Location[]>([]);
  const [visited, setVisited] = useState<Location[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Lataa tallennetut kohteet
  const loadSavedLocations = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedLocations');
      if (saved) {
        setSaved(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved locations:', error);
    }
  };

  // Lataa vieraillut kohteet
  const loadVisitedLocations = async () => {
    try {
      const visited = await AsyncStorage.getItem('visitedLocations');
      if (visited) {
        setVisited(JSON.parse(visited));
      }
    } catch (error) {
      console.error('Error loading visited locations:', error);
    }
  };

  // Lataa data kun näkymä tulee aktiiviseksi
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
              onPress={() => navigation.navigate('DestinationDetails', { location: item })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E2C',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default DestinationListScreen;