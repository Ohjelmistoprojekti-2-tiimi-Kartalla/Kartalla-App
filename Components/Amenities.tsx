import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

interface Amenity {
  icon: string;
  label: string;
}

interface Props {
  amenities: Amenity[];
}

const Amenities: React.FC<Props> = ({ amenities }) => (
  <View>
    <Text style={styles.sectionTitle}>Mukavuudet</Text>
    <View style={styles.amenitiesGrid}>
      {amenities.map((amenity, idx) => (
        <View key={idx} style={styles.amenityCard}>
          <View style={styles.amenityIcon}>
            <Ionicons name={amenity.icon as any} size={16} color="#4caf50" />
          </View>
          <Text style={styles.amenityText}>{amenity.label}</Text>
        </View>
      ))}
    </View>
  </View>
);



export default Amenities;