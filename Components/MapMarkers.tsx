import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { getCoordinates } from "../utils/mapUtils";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import React from "react";



//Komponetti saa datan propsina:
interface Props {
    locations: Location[];
    markerRefs: React.MutableRefObject<{ [key: number]: any | null }>;
    onMarkerPress: (location: Location) => void; // callback modaalin avaamiseen
    visitedIds: number[];
}

// Reitin tyypin määrittely navigaatiota varten
type RootStackParamList = {
    DestinationDetails: { location: Location };
};

export const MarkerComponent: React.FC<Props> = ({ locations, markerRefs, onMarkerPress, visitedIds }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // tämän avulla randomkohteeseen hypätessä näytetään kohteen nimi
    const handleMarkerPress = (id: number) => {
        const marker = markerRefs.current[id];
        if (marker) {
            marker.showCallout(); // näyttää markkerin nimen calloutissa
        }
    };






    console.log("Renderöitäviä markkereita:", locations.length);
    return (
        <>
            {locations.map((location) => {
                const coords = getCoordinates(location);
                if (!coords) return null;

                // If is visited marker color is green, otherwise red
                const isVisited = visitedIds.includes(location.sportsPlaceId);
                const markerColor = isVisited ? "green" : "red";

                return (
                    <Marker
                        ref={ref => { markerRefs.current[location.sportsPlaceId] = ref; }}
                        coordinate={{ latitude: coords.lat, longitude: coords.lon }}
                        key={`${location.sportsPlaceId}-${visitedIds.includes(location.sportsPlaceId) ? 'v' : 'n'}`} // Added visitedIs to allow to show visited marker on green when coming back to Mapscreen
                        onPress={() => onMarkerPress(location)} // MapScreen käsittelee modaalin avaamisen
                        pinColor={markerColor} // MarkerColor added
                    />
                );
            })}
        </>
    );
}
