import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  rating: number;
}

const TitleSection: React.FC<Props> = ({ name, rating }) => (
  <View style={styles.titleSection}>
    <Text style={styles.title} numberOfLines={2}>
      {name}
    </Text>
    <View style={styles.ratingBadge}>
      <Ionicons name="star" size={14} color="#ffc107" />
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,193,7,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TitleSection;