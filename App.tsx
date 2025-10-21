import 'react-native-gesture-handler';
import { styles } from "./styles";
import React from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from './screens/MapScreen';
import DestinationDetailsScreen from './screens/DestinationDetailsScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import DestinationListScreen from './screens/DestinationListScreen';
import { SettingsProvider } from "./utils/SettingsContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Nested navigation: Inside the Drawer is a Stack and inside that are Screens.

function MapStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {/* The user sees the title "Kartalla", but the technical name is "MapScreen" */}
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: "Kartalla" }}
      />
      <Stack.Screen
        name="DestinationDetails"
        component={DestinationDetailsScreen}
        options={{ title: "Kohteen tiedot" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Drawer.Navigator id={undefined} screenOptions={{ headerShown: true, headerStyle: styles.header, headerTintColor: '#F3F4F4' }}>
          <Drawer.Screen name="Kartalla" component={MapStack} />
          <Drawer.Screen name="Suosikit" component={FavouritesScreen} />
          <Drawer.Screen name="Kohteet" component={DestinationListScreen} />
          <Drawer.Screen name="Asetukset" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </SettingsProvider>
  );
}