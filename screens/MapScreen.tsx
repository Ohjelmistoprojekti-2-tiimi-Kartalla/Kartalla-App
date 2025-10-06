import SearchBar from "../Components/SearchBar";
import { View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { MarkerComponent } from "../Components/MapMarkers";
import { styles } from "../styles";
import { fetchNatureLocations } from "../services/lipasService";
import { Location } from "../types/Location";
import * as LocationApi from "expo-location";
import { getBoundingBoxFromLocation } from "../utils/mapUtils";
import { getCoordinates } from "../utils/mapUtils";
import { Ionicons } from "@expo/vector-icons";
import ModalCard from "../Components/ModalCard";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState("");
  // const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationsInBounds, setLocationsInBounds] = useState<Location[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // Valittu sijainti modaalia varten

  // Apufunktio nimen hakemiseen TypeScript-virheiden välttämiseksi
  const getLocationNameFi = (location: Location) => {
    if (typeof location.name === "string") return location.name;
    if (location.name && typeof location.name === "object" && "fi" in location.name) {
      const val = (location.name as any).fi;
      if (typeof val === "string") return val;
    }
    return "Ei nimeä saatavilla";
  };

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

  useEffect(() => {
    if (!userLocation || !mapReady) return;

    const fetchLocations = async () => {
      const bounds = getBoundingBoxFromLocation(userLocation.latitude, userLocation.longitude, 100); // 100 km
      const data = await fetchNatureLocations(bounds);
      setLocationsInBounds(data);
      console.log("Bounding box for 100 km:", bounds);
      console.log("Fetched locations:", data.length);
    };

    fetchLocations();
  }, [userLocation, mapReady]);

  // Makes sure map is ready before fetching locations
  const handleMapReady = async () => {
    setMapReady(true);
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

  // ---------------Satunnaisen kohteen näyttäminen -----------------------------------------//
  const markerRefs = useRef<{ [key: number]: any | null }>({});

  const handleRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locationsInBounds.length);
    const location = locationsInBounds[randomIndex];
    const coordinates = getCoordinates(location);
    mapRef.current?.animateToRegion(
      {
        latitude: coordinates?.lat,
        longitude: coordinates?.lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000
    );
    setSelectedLocation(location);

    // Pieni viive, jotta kartta ehtii liikkua, sitten näytetään callout: eli kohteen nimi
    setTimeout(() => {
      markerRefs.current[location.sportsPlaceId]?.showCallout();
    }, 1000);
  };

  // ---------------------------------------------------------------------------------------//

  // Suodatetaan kohteet hakutekstin perusteella
  const filteredLocations = locationsInBounds.filter((location) => {
    const coords = getCoordinates(location);
    if (!coords) return false;

    return getLocationNameFi(location)
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const handleMarkerPress = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

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
        onMapReady={handleMapReady} // bounding box -search once the map is ready
      >
        {/* Use filtered locations based on the SearchBar input */}
        <MarkerComponent locations={filteredLocations} markerRefs={markerRefs} onMarkerPress={handleMarkerPress} />

        {selectedLocation && (
          <ModalCard
            visible={!!selectedLocation}
            onClose={() => setSelectedLocation(null)}
            location={selectedLocation}
          />
        )}

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
      <View style={styles.randomButtonContainer}>
        <TouchableOpacity style={styles.randomButton} onPress={handleRandomLocation}>
          <Ionicons name="shuffle-outline" size={26} color="#0E1815" />
        </TouchableOpacity>
      </View>
      <View style={styles.myLocationButtonContainer}>
        <TouchableOpacity style={styles.myLocationButton} onPress={handleShowMyLocation}>
          <Ionicons name="navigate-outline" size={26} color="#0E1815" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

