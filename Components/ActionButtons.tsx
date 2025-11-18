import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

interface ButtonProps {
  isSaved: boolean;
  isVisited: boolean;
  onSave: () => void;
  onVisit: () => void;
}

const ActionButtons: React.FC<ButtonProps> = ({ isSaved, isVisited, onSave, onVisit }) => (
  <View style={styles.buttonRow}>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={onSave}
    >
      <Text style={styles.secondaryButtonText}>
        {isSaved ? 'Tallennettu' : 'Tallenna'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.primaryButton,
        isVisited && styles.primaryButtonVisited
      ]}
      onPress={onVisit}
    >
      <Text style={styles.primaryButtonText}>
        {isVisited ? 'Vierailtu ✓' : 'Merkitse vierailluksi'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default ActionButtons;