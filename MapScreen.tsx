import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import React, { useEffect } from "react";
import { myMarkerComponent } from "./Components/MapMarkers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});


export default function MapScreen() {

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{

                    // Helsingin koordinaatit
                    latitude: 60.1699,   
                    longitude: 24.9384,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {myMarkerComponent()}
            </MapView>
        </View>
    );
}