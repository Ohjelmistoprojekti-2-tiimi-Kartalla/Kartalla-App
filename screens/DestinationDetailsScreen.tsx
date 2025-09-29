import React from 'react';
import { View, Text } from 'react-native';
import { styles } from "../styles";
import { RouteProp } from "@react-navigation/native";
import { Location } from "../types/Location";

// määritellään reitit
type RootStackParamList = {
  DestinationDetails: { location: Location };
};

// props-tyyppi tälle näkymälle
type DestinationDetailsRouteProp = RouteProp<
  RootStackParamList,
  "DestinationDetails"
>;

interface Props {
  route: DestinationDetailsRouteProp;
}
const DestinationDetailsScreen: React.FC<Props> = ({ route }: any) => {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        {location.name}
      </Text>
    </View>
  );
};

export default DestinationDetailsScreen;
