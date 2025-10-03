import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  distance: string;
  duration: string;
  difficulty: string;
}

const MetaInfo: React.FC<Props> = ({ distance, duration, difficulty }) => (
  <View style={styles.metaRow}>
    <View style={styles.metaItem}>
      <Ionicons name="location-outline" size={16} color="#888" />
      <Text style={styles.metaText}>{distance}</Text>
    </View>
    <View style={styles.metaItem}>
      <Ionicons name="time-outline" size={16} color="#888" />
      <Text style={styles.metaText}>{duration}</Text>
    </View>
    <View style={styles.metaItem}>
      <Ionicons name="walk-outline" size={16} color="#888" />
      <Text style={styles.metaText}>{difficulty}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },
});

export default MetaInfo;