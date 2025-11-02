import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';

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


export default TitleSection;