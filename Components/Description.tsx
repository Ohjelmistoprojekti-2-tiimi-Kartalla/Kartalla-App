import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles';
interface DescriptionProps {
  text: string;
}

const Description: React.FC<DescriptionProps> = ({ text }) => (
  <Text style={styles.description}>{text}</Text>
);

export default Description;