import { ActivityIndicator, Alert, FlatList, Text, View, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Input, Message } from './commentHelpers';
import Comment from './Comment';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';


export type CommentType = {
    id: string;
    details: string;
    post: {
        id: string;
    };
};
type Props = {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    postId: string;
    setCommentsTotal: Dispatch<SetStateAction<number>>;
};

const CommentsModal = ({ modalVisible, setModalVisible, setCommentsTotal, postId }: Props) => {
    const [details, setDetails] = useState<string>('');
    const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);
    const [successAddComment, setSuccessAddComment] = useState<boolean>(false);
    const [errorAddComment, setErrorAddComment] = useState<string>('');
    const [comments, setComments] = useState<CommentType[]>([]);

    const [loadingGetComments, setLoadingGetComments] = useState<boolean>(false);
    const [successGetComments, setSuccessGetComments] = useState<boolean>(false);
    const [errorGetComments, setErrorGetComments] = useState<string>('');
    const [successDeleteComments, setSuccessDeleteComments] = useState<boolean>(false);
    const [errorDeleteComments, setErrorDeleteComments] = useState<string>('');

    const commentsCollection = collection(db, 'comments');
    //adding comment
    const addComment = async () => {
        setLoadingAddComment(true);
        setErrorAddComment('');
        setSuccessAddComment(false);
        try {
            const commentItem = {
                details,
                post: {
                    id: postId
                },
            };
            await addDoc(commentsCollection, commentItem);
            setSuccessAddComment(true);
            setDetails('');
        } catch (error: any) {
            setSuccessAddComment(false);
            setErrorAddComment(error?.message || "An error occured while adding comment");
        }
        setLoadingAddComment(false);
    };
    //Loading Comments from Firebase storage
    const getComments = async () => {
        setLoadingGetComments(true);
        setErrorGetComments('');
        setSuccessGetComments(false);
        try {
            const postDoc = query(commentsCollection, where("post.id", "==", postId));
            const data = await getDocs(postDoc);
            const itemsList: any = [];
            data.forEach((doc) => {
                itemsList.push({ ...doc.data(), id: doc.id });
            });
            setComments(itemsList);
            setSuccessGetComments(true);
            setCommentsTotal(itemsList?.length);
        } catch (error: any) {
            setSuccessGetComments(false);
            setErrorGetComments(error?.message || "An error occured while fetching comment");
        }
        setLoadingGetComments(false);
    };

    //Delete comment and confirm deleting
    const deleteComment = async (commentId: string, details: string) => {
        Alert.alert('Delete Comment', details, [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    setErrorDeleteComments('');
                    setSuccessDeleteComments(false);
                    try {
                        const postDoc = doc(db, 'comments', commentId);
                        await deleteDoc(postDoc);
                        setSuccessDeleteComments(true);
                    } catch (error: any) {
                        setSuccessDeleteComments(false);
                        setErrorDeleteComments(error?.message || "An error occured while deleting comment");
                    }
                }
            },
        ]);


    };
    //rerenders comments after commenting or deleting
    useEffect(() => {
        getComments();
    }, [successAddComment, successDeleteComments]);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.commentInputContainer}>
                    <View style={{ alignItems: "flex-start" }}>
                        <TouchableOpacity
                            style={styles.destinationDetailCloseModalButton}
                            onPress={() => { setModalVisible(!modalVisible); }}
                        >
                            <Ionicons name="close" size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    {loadingAddComment ? <ActivityIndicator size='large' /> : null}
                    {errorAddComment ? <Message message={errorAddComment} variant='red' /> : null}
                    <View style={{ paddingTop: 70 }}>
                        {/*Text box*/}
                        <Input label=' Kommentoi' value={details} onChangeText={(text) => setDetails(text)} multiline numberOfLines={4} style={styles.textArea} />
                        <View style={styles.commentButton}>
                            {/*Comment "Button"*/}
                            <TouchableOpacity
                                onPress={() => {
                                    addComment();
                                }} disabled={!details || loadingAddComment}
                            >
                                <Text style={styles.commentButtonText}>KOMMENTOI</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/*Error messages and loading icon when getting comments*/}
                <View style={styles.line} />
                {loadingGetComments ? <ActivityIndicator size='large' /> : null}
                {errorGetComments ? <Message message={errorGetComments} variant='red' /> : null}
                <FlatList
                    data={comments}
                    renderItem={({ item }) => <Comment item={item} deleteComment={deleteComment} />}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.line} />}
                    ListEmptyComponent={() => <Text style={styles.commentButtonText}>Ole ensinmäinen kommentoija</Text>}
                />
            </View>
        </Modal>
    );
};
export default CommentsModal;
