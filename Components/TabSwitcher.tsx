import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

interface TabSwitcherProps {
  activeTab: string;
  setActiveTab: (tab: 'saved' | 'visited') => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, setActiveTab }) => (
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

export default TabSwitcher;