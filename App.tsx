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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Nested navigaatio: Drawerin sisällä on Stack ja sen sisällä Screens.

function MapStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      {/* Käyttäjälle näkyvä otsikko "Kartalla", mutta tekninen nimi on "MapScreen" */}
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
    <><NavigationContainer>
      <Drawer.Navigator id={undefined} screenOptions={{ headerShown: true, headerStyle: styles.header, headerTintColor: '#F3F4F4' }}>
        {/* Drawerissa näkyvä nimi "Kartalla" mutta komponenttina MapStack */}
        <Drawer.Screen
          name="Kartalla"
          component={MapStack} />
        <Drawer.Screen
          name="Suosikit"
          component={FavouritesScreen} />
        <Drawer.Screen
          name="Asetukset"
          component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer><StatusBar barStyle="light-content" /></> // Asettaa ns. status barin (esim. kellonaika, akku) vaaleaksi
  );
}

