import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { getCoordinates } from "../utils/mapUtils";
// import { useNavigation } from "@react-navigation/native";
// import type { StackNavigationProp } from '@react-navigation/stack';
import { getVisitedLocations } from "../utils/savedVisitedStorage";
import React from "react";
import { useState, useEffect } from "react";

//Komponetti saa datan propsina:
interface Props {
    locations: Location[];
    markerRefs: React.MutableRefObject<{ [key: number]: any | null }>;
    onMarkerPress: (location: Location) => void; // callback modaalin avaamiseen
}

export const MarkerComponent: React.FC<Props> = ({ locations, markerRefs, onMarkerPress }) => {

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
                        onPress={() => onMarkerPress(location)} // MapScreen käsittelee modaalin avaamisen
                        pinColor={markerColor} // MarkerColor added
                    />
                );
            })}
        </>
    );
}
