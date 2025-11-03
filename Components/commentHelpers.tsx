// components/Button.tsx

import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from '../styles';

type ButtonProps = {
    variant?: 'green' | 'blue' | 'red' | 'gray' | 'info' | 'dark-red';
    title: string;
    onPress: () => void;
    width?: string | number;
    height?: string | number;
    paddingVertical?: number,
    disabled?: boolean;
};

type TextProps = TextInputProps & {
    label: string;
};

type MessageProps = {
    variant: 'green' | 'blue' | 'red';
    message: string;
};
const colors = {
    blue: '#007bff',
    green: "#28a745",
    red: "#dc3545",
    gray: '#6c757d',
    info: "#17a2b8",
    'dark-red': '#8b0000'
};
const Button = ({ variant = "blue", title, onPress, width = "100%", height = 'auto', paddingVertical = 10, disabled = false }: ButtonProps) => {
    return (
        <TouchableOpacity style={{ backgroundColor: colors[variant], alignItems: 'center', paddingVertical, borderRadius: 8, width: 100, height: 50, alignContent: "flex-end" }} onPress={onPress} disabled={disabled}>
            <Text style={{ color: 'white' }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
//Text box
const Input = ({ label, ...textInputProps }: TextProps) => {
    return (
        <View style={styles.CommentComponentContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputProps} placeholder={label} style={[styles.textInput, textInputProps.style]} />
        </View>
    );
};
//Error message
const Message = ({ variant, message }: MessageProps) => {
    return (
        <View>
            <Text style={{ color: variant, marginVertical: 20 }}>{message}</Text>
        </View>
    );
};
export { Button, Input, Message };
