import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CommentType } from './CommentsModal';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';



type Props = {
    item: CommentType;
    deleteComment: (commentId: string, details: string) => void;

};

//Show Comments and delete button on FlatList
const Comment = ({ item, deleteComment }: Props) => {
    return (
        <View style={{ flexDirection: "column", borderWidth: 1, borderColor: "white" }}>
            <Text style={styles.description}>{item.details}</Text>
            <View style={{ alignSelf: "flex-end", padding: 2 }}>
                {/* icon to delete comment */}
                {/* No authorization implemented */}
                <TouchableOpacity
                    onPress={() => { deleteComment(item?.id, item?.details?.slice(0, 50)); }}>
                    <Ionicons name="trash-outline" size={20} color="#ff6b6b" style={{ padding: 2 }} />
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default Comment;
