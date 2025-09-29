import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { Alert, Button, Text, View } from "react-native";
import { getCoordinates } from "../utils/mapUtils";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { useRef } from "react";

//Komponetti saa datan propsina:
interface Props {
    locations: Location[];
    markerRefs: React.MutableRefObject<{ [key: number]: any | null }>;
}
// Reitin tyypin määrittely navigaatiota varten
type RootStackParamList = {
    DestinationDetails: { location: Location };
};

export const MarkerComponent: React.FC<Props> = ({ locations, markerRefs }) => {
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

                return (
                    <Marker
                        ref={ref => { markerRefs.current[location.sportsPlaceId] = ref; }}
                        key={location.sportsPlaceId}
                        coordinate={{ latitude: coords.lat, longitude: coords.lon }}
                        title={location.name || location['name-localized']?.fi || "Ei nimeä saatavilla"}
                        onPress={() => {
                            Alert.alert(
                                location.name || "Ei nimeä",
                                location.location.address || "Ei osoitetta",
                                [
                                    {
                                        text: 'Show More',
                                        onPress: () =>
                                            navigation.navigate("DestinationDetails", { location })
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log("Cancel pressed"),
                                        style: 'cancel',
                                    },
                                ],
                                { cancelable: true }
                            );
                        }}
                    />
                );
            })}
        </>
    );
};
