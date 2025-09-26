import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { Alert, Button, Text, View } from "react-native";
import { getCoordinates } from "../utils/mapUtils";

//Komponetti saa datan propsina:
interface Props {
    locations: Location[];
}

export const MarkerComponent: React.FC<Props> = ({ locations }) => {
    console.log("MarkerComponent render, locations:", locations.length);
    return (
        <>
            {locations.map((location) => {
                const coords = getCoordinates(location);
                if (!coords) return null;

                return (
                    <Marker
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
                                        onPress: () => console.log("function not implemented")
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log("Cancel pressed"),
                                        style: 'cancel',
                                    },
                                ],
                                 {cancelable: true,}
                            );
                        }}
                    />
                );
            })}
        </>
    );
};
