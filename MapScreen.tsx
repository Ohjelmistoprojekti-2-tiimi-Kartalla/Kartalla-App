import { View, TouchableOpacity, Text, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { use, useEffect, useRef, useState } from "react";
import { MarkerComponent } from "./Components/MapMarkers";
import { styles } from "./styles";
import { fetchNatureLocations } from "./services/lipasService";
import { Location } from "./types/Location";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchAndSetLocations = async () => {
      try {
        const data = await fetchNatureLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchAndSetLocations();
  }, []);

  // TO DO: Fix
  // const handleRandomLocation = () => {
  //   const randomIndex = Math.floor(Math.random() * data.length);
  //   const location = data[randomIndex];
  //   mapRef.current?.animateToRegion(
  //     {
  //       latitude: parseFloat(location.coordinates[0]),
  //       longitude: parseFloat(location.coordinates[1]),
  //       latitudeDelta: 0.1,
  //       longitudeDelta: 0.1,
  //     },
  //     1000
  //   );
  // };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchBar}
        placeholder="Hae kohteita..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Fix to be the users location */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 60.1699,
          longitude: 24.9384,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MarkerComponent locations={locations} />
      </MapView>

      { }
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRandomLocation}>
          <Text style={styles.buttonText}>Kokeile onneasi</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
