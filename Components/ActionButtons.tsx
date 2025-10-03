import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  isSaved: boolean;
  isVisited: boolean;
  onSave: () => void;
  onVisit: () => void;
}

const ActionButtons: React.FC<Props> = ({ isSaved, isVisited, onSave, onVisit }) => (
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

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  primaryButtonVisited: {
    backgroundColor: '#2e7d32',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ActionButtons;