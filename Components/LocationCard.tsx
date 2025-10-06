import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Location } from '../types/Location';

interface Props {
  item: Location;
  onPress: () => void;
}

const LocationCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <Image
      source={item.images?.[0] || require('../assets/maisema.png')}
      style={styles.image}
    />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.type} numberOfLines={1}>{item.type?.name || 'Nature Reserve'}</Text>
    </View>
    <Ionicons name="bookmark-outline" size={24} color="#fff" style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2f26',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 8,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#6b8b7f',
  },
  icon: {
    padding: 16,
  },
});

export default LocationCard;