import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { getCoordinates } from "../utils/mapUtils";
import React from "react";

//Component receives the data as props
interface MapMarkersProps {
    locations: Location[];
    markerRefs: React.MutableRefObject<{ [key: number]: any | null }>;
    onMarkerPress: (location: Location) => void; // callback for opening modal
    visitedIds: number[];
}

export const MarkerComponent: React.FC<MapMarkersProps> = ({ locations, markerRefs, onMarkerPress, visitedIds }) => {

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
                        onPress={() => onMarkerPress(location)} // MapScreen handles opening the modal 
                        pinColor={markerColor} // MarkerColor added
                    />
                );
            })}
        </>
    );
}
