import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from './screens/MapScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator id={undefined}>
        <Drawer.Screen name="Kartalla" component={MapScreen} />
        <Drawer.Screen name="Suosikit" component={FavouritesScreen} />
        <Drawer.Screen name="Asetukset" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

