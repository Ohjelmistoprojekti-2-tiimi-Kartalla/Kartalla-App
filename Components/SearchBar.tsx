import React from "react";
import { TextInput } from "react-native";
import { styles } from "../styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Hae kohteita..."
      value={value}
      onChangeText={onChangeText}
    />
  );
}