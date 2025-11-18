
import { Text, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';
import { styles } from '../styles';

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
};

//Text box and text imput
//Example how to use: 
//<Input label=[text] value={text} onChangeText={(text) => setText(text)}
//multiline numberOfLines={4}/>
const Input = ({ label, ...textInputProps }: TextProps) => {
    return (
        <View style={styles.CommentComponentContainer}>
            <TextInput {...textInputProps} placeholder={label} placeholderTextColor={"#fffefeff"}
                style={[styles.textInput, textInputProps.style]} />
        </View>
    );
};
//Error message
//Example how to use if error occur
// {error ? <Message message={"error message"} variant='red' /> : null}
const Message = ({ variant, message }: MessageProps) => {
    return (
        <View>
            <Text style={{ color: variant, marginVertical: 20 }}>{message}</Text>
        </View>
    );
};
export { Input, Message };
