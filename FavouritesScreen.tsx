import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavouritesScreen() {
  return (
    <View style={styles.container}>
      <Text>Suosikit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
