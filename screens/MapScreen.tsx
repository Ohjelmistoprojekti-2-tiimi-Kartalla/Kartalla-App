import SearchBar from "../Components/SearchBar";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { use, useEffect, useRef, useState } from "react";
import { MarkerComponent } from "../Components/MapMarkers";
import { styles } from "../styles";
import { fetchNatureLocations } from "../services/lipasService";
import { Location } from "../types/Location";
import * as LocationApi from "expo-location";
import { getBoundingBoxFromLocation } from "../utils/mapUtils";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationsInBounds, setLocationsInBounds] = useState<Location[]>([]);


  // Get users location:
  useEffect(() => {
    (async () => {
      let { status } = await LocationApi.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await LocationApi.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      handleMapReady(); // kutsutaan kun käyttäjän sijainti on saatu

      // Focus map to user location
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          1000
        );
      }
    })();
  }, []);


  // Once the map is rendered determine bounding box and fetch locations
  const handleMapReady = async () => {
    if (!mapRef.current || !userLocation) return;

    // Muodostetaan bounding box 100 km säteelle käyttäjästä --> voi muokata myöhemmin
    const bounds = getBoundingBoxFromLocation(userLocation.latitude, userLocation.longitude, 100);

    const data = await fetchNatureLocations(bounds);
    // const data = await fetchNatureLocations(); // tällä voi testata näyttää kaikki 100 kpl

    setLocationsInBounds(data);
    console.log("Bounding box for 100 km:", bounds);
    console.log("Fetched locations:", data.length);
  };

  // Showing users location on button press
  const handleShowMyLocation = async () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

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
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Fix to be the users location */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={
          {
            latitude: 60.1699,
            longitude: 24.9384,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }
        }
        onMapReady={handleMapReady} // bounding box -search once the map is ready
      >
        <MarkerComponent locations={locationsInBounds} />


        {/* current location  */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="My location"
            pinColor="blue"
          />
        )}
      </MapView>

      { }
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRandomLocation}>
          <Text style={styles.buttonText}>Kokeile onneasi</Text>
        </TouchableOpacity>
      </View> */}


      {/* Floating button on the bottom corner for user location */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleShowMyLocation}>
        <Text style={styles.floatingButtonText}>📍</Text>
      </TouchableOpacity>
    </View>
  );
}
