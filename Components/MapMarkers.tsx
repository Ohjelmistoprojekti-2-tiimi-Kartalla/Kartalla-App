import { Marker, Callout } from "react-native-maps";
import { Location } from "../types/Location";
import { getCoordinates } from "../utils/mapUtils";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { getVisitedLocations } from "../utils/savedVisitedStorage";
import React from "react";
import { useState, useEffect } from "react";

//Component receives the data as props
interface MapMarkersProps {
    locations: Location[];
    markerRefs: React.MutableRefObject<{ [key: number]: any | null }>;
    onMarkerPress: (location: Location) => void; // callback for opening modal
}
// Route type definition for navigation
type RootStackParamList = {
    DestinationDetails: { location: Location };
};

export const MarkerComponent: React.FC<MapMarkersProps> = ({ locations, markerRefs, onMarkerPress }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // used when jumping to a random location to show the location's name
    const handleMarkerPress = (id: number) => {
        const marker = markerRefs.current[id];
        if (marker) {
            marker.showCallout(); // shows the marker's name in the callout
        }
    };

    // Saves visited
    const [visitedIds, setVisitedIds] = useState<number[]>([]);

    // Fetch visited when the component is rendered
    useEffect(() => {
        const fetchVisited = async () => {
            try {
                const visited = await getVisitedLocations();
                const ids = visited.map((loc) => loc.sportsPlaceId);
                setVisitedIds(ids);
            } catch (error) {
                console.error("Error fetching visited locations:", error);
            }
        };
        fetchVisited();
    }, []);

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
                        key={location.sportsPlaceId}
                        onPress={() => onMarkerPress(location)} // MapScreen handles opening the modal 
                        pinColor={markerColor} // MarkerColor added
                    />
                );
            })}
        </>
    );
}
