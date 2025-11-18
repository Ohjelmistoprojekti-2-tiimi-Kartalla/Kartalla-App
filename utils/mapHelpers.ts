import * as LocationApi from "expo-location";
import { Location } from "../types/Location";
import MapView from "react-native-maps";

// Apufunktio nimen hakemiseen TypeScript-virheiden välttämiseksi
export const getLocationNameFi = (location: Location) => {
    if (typeof location.name === "string") return location.name;
    if (location.name && typeof location.name === "object" && "fi" in location.name) {
        const val = (location.name as any).fi;
        if (typeof val === "string") return val;
    }
    return "Ei nimeä saatavilla";
};


// Get users location:
export const requestUserLocation = async () => {
    const { status } = await LocationApi.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("Permission to access location was denied");
        return null;
    }

    const location = await LocationApi.getCurrentPositionAsync({});
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
};

// Focus map to user location
export const animateToUserLocation = (mapRef: React.RefObject<MapView>, coords: { latitude: number; longitude: number }) => {
    mapRef.current?.animateToRegion(
        {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        },
        1000
    );
};


export const pickRandomLocation = (locations: Location[]) => {
    if (locations.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
};


