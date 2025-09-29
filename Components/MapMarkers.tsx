import { Marker } from "react-native-maps";
import { Location } from "../types/Location";
import { Alert, Button, Text, View } from "react-native";
import { getCoordinates } from "../utils/mapUtils";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';

//Komponetti saa datan propsina:
interface Props {
    locations: Location[];
}
// Reitin tyypin määrittely navigaatiota varten
type RootStackParamList = {
    DestinationDetails: { location: Location };
};

export const MarkerComponent: React.FC<Props> = ({ locations }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    console.log("Renderöitäviä markkereita:", locations.length);
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
