import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CommentType } from './CommentsModal';
import { styles } from '../styles';



type Props = {
    item: CommentType;
    deleteComment: (commentId: string, details: string) => void;

};

//Show Comments on FlatList and delete button
const Comment = ({ item, deleteComment }: Props) => {
    return (
        <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
            <Text style={styles.description}>{item.details}</Text>
            <View>
                {/* icon to delete comment */}
                <TouchableOpacity
                    onPress={() => { deleteComment(item?.id, item?.details?.slice(0, 40) + '...'); }}>
                    <Text style={{ color: "red", fontSize: 10 }}> poista </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};
export default Comment;
