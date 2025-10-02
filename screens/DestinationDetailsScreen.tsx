import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { RouteProp, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { Location } from "../types/Location";
import { addToFavorites, removeFromFavorites, getFavoriteLocations } from '../utils/favoritesStorage';

// määritellään reitit
type RootStackParamList = {
  DestinationDetails: { location: Location };
};

// props-tyyppi tälle näkymälle
type DestinationDetailsRouteProp = RouteProp<
  RootStackParamList,
  "DestinationDetails"
>;

interface Props {
  route: DestinationDetailsRouteProp;
}

const DestinationDetailsScreen: React.FC<Props> = ({ route }) => {
  const { location } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavoriteLocations().then((favorites) => {
      setIsFavorite(favorites.some((fav) => fav.sportsPlaceId === location.sportsPlaceId));
    });
  }, [location]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(location.sportsPlaceId);
      setIsFavorite(false);
    } else {
      await addToFavorites(location);
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Otsikko ylös */}
      <Text style={styles.title}>{location.name}</Text>

      {/* Header-kuvat */}
      <View style={styles.imageRow}>
        <Image
          source={require('../assets/maisema.png')}
          style={styles.headerImage}
        />
      </View>

      <Text style={styles.info}>{location.location.address || 'Ei osoitetta'}</Text>
      {location.properties?.infoFi && <Text style={styles.info}>{location.properties.infoFi}</Text>}
      <Button
        title={isFavorite ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
        onPress={toggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1815', 
    padding: 16,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  title: {
    color: '#fff',
    fontSize: 18,           
    fontWeight: 'bold',
    marginTop: 10,          
    marginBottom: 16,
    textAlign: 'center',    
    alignSelf: 'center',
    fontFamily: 'serif', // <-- lisää tämä rivi
  },
   info: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default DestinationDetailsScreen;
