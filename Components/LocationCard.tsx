import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Location } from '../types/Location';
import { styles } from '../styles';

interface Props {
  item: Location;
  onPress: () => void;
  onDelete?: () => void;
}

const LocationCard: React.FC<Props> = ({ item, onPress, onDelete }) => (
  <TouchableOpacity style={styles.locationcard} onPress={onPress} activeOpacity={0.7}>
    <Image
      source={item.images?.[0] || require('../assets/maisema.png')}
      style={styles.image}
    />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.type} numberOfLines={1}>{item.type?.name || 'Nature Reserve'}</Text>
    </View>
    <Ionicons name="bookmark-outline" size={24} color="#fff" style={styles.icon}
    />
    {onDelete && (
      <TouchableOpacity onPress={onDelete} style={styles.icon}>
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    )}

  </TouchableOpacity>
);

export default LocationCard;