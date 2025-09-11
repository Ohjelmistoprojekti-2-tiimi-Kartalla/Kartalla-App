import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from "./MapScreen";



const Tab = createBottomTabNavigator();

export default function App() {
   return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Kartalla" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
