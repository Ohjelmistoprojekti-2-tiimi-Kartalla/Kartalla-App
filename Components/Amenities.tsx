import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  amenityCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});

export default Amenities;