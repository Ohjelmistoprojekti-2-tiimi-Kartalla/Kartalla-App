import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: React.ComponentProps<typeof Ionicons>['name']; 
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
    <Ionicons name={icon} size={64} color="#444" />
    <Text style={{ fontSize: 16, color: '#666', marginTop: 16 }}>{message}</Text>
  </View>
);

export default EmptyState;