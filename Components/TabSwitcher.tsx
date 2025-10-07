import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  activeTab: string;
  setActiveTab: (tab: 'saved' | 'visited') => void;
}

const TabSwitcher: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
      onPress={() => setActiveTab('saved')}
    >
      <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'visited' && styles.activeTab]}
      onPress={() => setActiveTab('visited')}
    >
      <Text style={[styles.tabText, activeTab === 'visited' && styles.activeTabText]}>Visited</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#1a2f26',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    marginTop:14,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2d4a3e',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6b8b7f',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default TabSwitcher;