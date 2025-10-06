import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => (
  <Text style={styles.description}>{text}</Text>
);

const styles = StyleSheet.create({
  description: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default Description;