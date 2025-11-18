import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

interface MetaInfoProps {
  distance: string;
  duration: string;
  difficulty: string;
}

const MetaInfo: React.FC<MetaInfoProps> = ({ distance, duration, difficulty }) => (
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

export default MetaInfo;