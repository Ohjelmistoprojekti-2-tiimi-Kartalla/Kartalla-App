import { View, TouchableOpacity, Text, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { use, useEffect, useRef, useState } from "react";
import { myMarkerComponent } from "./Components/MapMarkers";
import { styles } from "./styles";

const NATURE_LOCATIONS_JSON_URL = "http://lipas.cc.jyu.fi/api/sports-places?typeCodes=4404&typeCodes=4405&typeCodes=111&pageSize=100";
// Luotopolku 4044, Retkeilyreitti 4405, Kansallispuisto 111 --> Voidaan lisätä muita samalla tavalla

async function fetchFullNatureLocation(id: number) {
  const url = `http://lipas.cc.jyu.fi/api/sports-places/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Status code ${response.status}`);
  }
  return response.json(); // sisältää koko olion
}

async function fetchNatureLocations() {
  const response = await fetch(NATURE_LOCATIONS_JSON_URL);
  if (!response.ok) {
    console.log(response);
    throw new Error(`Received status code ${response.status}`);
  }
  const minimalData = await response.json(); // tällä saa vain kohteiden id:t

  // Haetaan jokainen kohde erikseen, jotta saadaan location ja name
  const fullData = await Promise.all(
    minimalData.map((place: any) => fetchFullNatureLocation(place.sportsPlaceId))
  );

  return fullData;
}

// const data = require("./test.json"); // testailudatan haku


export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchAndSetLocations = async () => {
      try {
        const data = await fetchNatureLocations();


        // *-----------Testilogituksia--------------*
        console.log("Saadut kohteet:", data.length); // Varmistetaan, että data on saatu
        // Logataan jokainen kohde ja ensimmäinen koordinaatti
        data.forEach((place, index) => {
          const firstFeature = place.location?.geometries?.features?.[0];
          let lat: number | undefined;
          let lon: number | undefined;

          if (firstFeature?.geometry.type === "Point") {
            [lon, lat] = firstFeature.geometry.coordinates as number[];
          } else if (firstFeature?.geometry.type === "LineString") {
            [lon, lat] = (firstFeature.geometry.coordinates as number[][])[0];
          }

          const name =
            place.name ||
            place["name-localized"]?.fi ||
            place["name-localized"]?.en ||
            "Nimetön";

          console.log(`${index + 1}: ${name}, coords: ${lat}, ${lon}`);
        });

        // *-----------Testilogituksia--------------*

        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } fetchNatureLocations()

    };
    fetchAndSetLocations();
  }, []);


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
        {locations.map((place, index) => {
          const firstFeature = place.location?.geometries?.features?.[0];
          if (!firstFeature) return null;

          let lat: number | undefined;
          let lon: number | undefined;

          // Rajapinnasta tulee kahdenlaisia geometrioita: Point ja LineString, pitää käsitellä molemmat
          if (firstFeature.geometry.type === "Point") {
            [lon, lat] = firstFeature.geometry.coordinates as number[];
          } else if (firstFeature.geometry.type === "LineString") {
            [lon, lat] = (firstFeature.geometry.coordinates as number[][])[0];
          }

          if (lat === undefined || lon === undefined) return null;

          return (
            <Marker
              key={index}
              coordinate={{ latitude: lat, longitude: lon }}
              title={place.name || place['name-localized']?.fi || "Nimetön"}
            />
          );
        })}


        {/* {myMarkerComponent()} */}
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
