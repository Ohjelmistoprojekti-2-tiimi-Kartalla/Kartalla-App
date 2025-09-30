import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { Location } from "../types/Location";

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
});

export default DestinationDetailsScreen;
