import React from 'react';
import { Text } from 'react-native';
import { styles } from '../styles';

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => (
  <Text style={styles.description}>{text}</Text>
);


export default Description;