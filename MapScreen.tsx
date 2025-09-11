import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";


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
                <Marker
                    coordinate={{ latitude: 60.1699, longitude: 24.9384 }}
                    title="Helsinki :3"
                />
            </MapView>
        </View>
    );
}