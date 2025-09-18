import { StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";
import MapView from "react-native-maps";
import React, { useRef, useState } from "react";
import { myMarkerComponent } from "./Components/MapMarkers";
const data = require("./test.json");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#bbdaa4",    
    paddingVertical: 4,            
    paddingHorizontal: 14,         
    borderRadius: 30,             
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#655252ff",
    fontSize: 14,               
    fontWeight: "bold",
  },
  searchBar: {
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
});

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState("");

  const handleRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const location = data[randomIndex];
    mapRef.current?.animateToRegion(
      {
        latitude: parseFloat(location.coordinates[0]),
        longitude: parseFloat(location.coordinates[1]),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Hae kohteita..."
        value={search}
        onChangeText={setSearch}
      />  
      
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
        {myMarkerComponent()}
      </MapView>

      {}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRandomLocation}>
          <Text style={styles.buttonText}>Kokeile onneasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
