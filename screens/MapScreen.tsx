import SearchBar from "../Components/SearchBar";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { MarkerComponent } from "../Components/MapMarkers";
import { styles } from "../styles";
import { fetchNatureLocations } from "../services/lipasService";
import { Location } from "../types/Location";
import { getBoundingBoxFromLocation } from "../types/BoundingBox";
import { getCoordinates } from "../utils/mapUtils";
import { Ionicons } from "@expo/vector-icons";
import ModalCard from "../Components/ModalCard";
import { useSettings } from "../utils/SettingsContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  getLocationNameFi,
  requestUserLocation,
  animateToUserLocation,
  pickRandomLocation,
} from "../utils/mapHelpers";
import FilterModal from "../Components/filterModal";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null!);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationsInBounds, setLocationsInBounds] = useState<Location[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // Valittu sijainti modaalia varten
  const [showDistanceText, setShowDistanceText] = useState(false);

  // Filtering
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

  const { distance, routeLengthFilter } = useSettings();
  const markerRefs = useRef<{ [key: number]: any | null }>({});


  // --------------Käyttäjän sijainti --------------------
  useEffect(() => {
    (async () => {
      const location = await requestUserLocation();
      if (!location) return;
      setUserLocation(location);
      animateToUserLocation(mapRef, location);
    })();
  }, []);

  // -------------------- Kartan lataus ja kohteiden haku --------------------
  const handleMapReady = () => setMapReady(true);

  useFocusEffect(
    useCallback(() => {
      if (!userLocation || !mapReady) return;

      const fetchLocations = async () => {
        const bounds = getBoundingBoxFromLocation(
          userLocation.latitude,
          userLocation.longitude,
          distance
        );
        const data = await fetchNatureLocations(bounds);
        setLocationsInBounds(data);
        console.log(`Haettiin ${data.length} kohdetta ${distance} km säteellä käyttäjästä`);
      };

      fetchLocations();

      if (distance) {
        setShowDistanceText(true);
        const timer = setTimeout(() => {
          setShowDistanceText(false);
        }, 3000); // Näytä teksti 3 sekuntia
        return () => clearTimeout(timer);
      }
    }, [userLocation, mapReady, distance, routeLengthFilter])
  );

  // -------------------- Painikkeet --------------------
  const handleShowMyLocation = () => {
    if (userLocation) animateToUserLocation(mapRef, userLocation);
  };

  const handleRandomLocation = () => {
    const location = pickRandomLocation(locationsInBounds);
    if (!location) return;

    const coords = getCoordinates(location);
    if (!coords) return;

    mapRef.current?.animateToRegion(
      {
        latitude: coords.lat,
        longitude: coords.lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000
    );
    setSelectedLocation(location);
    setTimeout(() => markerRefs.current[location.sportsPlaceId]?.showCallout(), 1000);
  };

  // ---------------- Suodatus haun ja filtteröinnin mukaan -------------------
  const filteredLocations = locationsInBounds.filter((location) => {
    // Hae nimen perusteella
    const searched = getLocationNameFi(location).toLowerCase().includes(search.toLowerCase());

    // Filtteröi reitin pituuden perusteella
    const routeLength = location.properties?.routeLengthKm || 0;

    const routeLengthMatches =
      !routeLengthFilter ||
      (routeLength >= routeLengthFilter.minKm && routeLength <= routeLengthFilter.maxKm);

    return searched && routeLengthMatches;
  });

  // -------------------- Markkerin painallus --------------------
  const handleMarkerPress = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  //------ Reitin pituuden ja hakusäteen näyttävän tekstin muodostus -----------
  const getFilterText = () => {
    if (!routeLengthFilter) return "";
    if (routeLengthFilter.id === "under3") return "reitit alle 3 km";
    if (routeLengthFilter.id === "3to5") return "reitit 3–5 km";
    if (routeLengthFilter.id === "5to10") return "reitit 5–10 km";
    if (routeLengthFilter.id === "over10") return "reitit yli 10 km";
    return "";
  };

  const disappearingText = `Säde ${distance} km${routeLengthFilter ? `, ${getFilterText()}` : ""}`;

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Fix to be the users location */}
      <MapView
        key={distance} // re-renders map when distance setting is changed
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

      {showDistanceText && (
        <View style={styles.distanceTextContainer}>
          <Text style={styles.distanceText}>{disappearingText}</Text>
        </View>
      )}

      {selectedLocation && (
        <ModalCard
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          location={selectedLocation}
        />
      )}

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
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </View>
  );
}


