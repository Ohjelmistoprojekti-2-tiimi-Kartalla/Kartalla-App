import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from "../styles";
import Slider from '@react-native-community/slider';
import { useSettings } from "../utils/SettingsContext";

export default function SettingsScreen() {
  const { distance, setDistance } = useSettings();
  const [tempValue, setTempValue] = React.useState(distance ?? 100);

  React.useEffect(() => {
    setTempValue(distance);
  }, [distance]);

  const handleSave = () => {
    setDistance(tempValue);
    console.log("Asetettu etäisyys: ", tempValue);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.settingsTitle}>Haettavien kohteiden etäisyys</Text>

      <Slider
        style={{ width: '90%', height: 40, marginLeft: 20 }}
        value={tempValue} // sets initial value
        step={10} // steps are 10 kilometers
        onValueChange={setTempValue} // updates the value when dragging for text
        minimumValue={10}
        maximumValue={500}
        minimumTrackTintColor="#0E1815"
        maximumTrackTintColor="#BEC8C8"
      />
      <Text style={styles.settingsText}>{tempValue.toFixed(0)} km</Text>
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Tallenna asetukset</Text>
      </Pressable>
    </View>
  );
}

