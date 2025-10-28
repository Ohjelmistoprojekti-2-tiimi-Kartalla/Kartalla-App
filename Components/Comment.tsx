import { Text, View } from 'react-native';
import React from 'react';
import { CommentType } from './CommentsModal';
import { Button } from './commentHelpers';


type Props = {
    item: CommentType;
    deleteComment: (commentId: string, details: string) => void;
    loadingDeleteComments: boolean;
};

//Kommentin poistaminen
const Comment = ({ item, deleteComment, loadingDeleteComments }: Props) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    variant='red' title='Remove'
                    onPress={() => { deleteComment(item?.id, item?.details?.slice(0, 40) + '...'); }}
                    width={70}
                    height={25}
                    paddingVertical={4} />
            </View>
            <Text>{item.details}</Text>
        </View>
    );
};
export default Comment;
