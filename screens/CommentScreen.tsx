import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { Message } from '../Components/commentHelpers';
import CommentsModal from '../Components/CommentsModal';
import { styles } from '../styles';


export default function CommentScreen(params) {

    type PostType = {
        id: string;
        details: string;
        locationId: string;
    };
    type Props = {};
    // const locationId = params;
    const locationId = "19999";
    const [post, setPost] = useState<PostType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [commentsTotal, setCommentsTotal] = useState<number>(0);

    //Ottaa kohteen locationId:n perusteella kommentit
    const getPosts = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const postDoc = doc(db, 'posts', locationId);
            const data = await getDoc(postDoc);
            const item = data?.data() as Omit<PostType, "locationId">;
            setPost({ ...item, locationId });
            setSuccess(true);
        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while fetching comment");
        }
        setLoading(false);
    };
    useEffect(() => {
        getPosts();
        console.log(params)
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size='large' /> : null}
            {error ? <Message message={error} variant='red' /> : null}
            {Boolean(post) ? <ScrollView>
                <Text>{post?.details}</Text>
                <View style={styles.line} />
                <View style={styles.commentButtonContainer}>
                    <Button title={`Comments`} onPress={() => {
                        setModalVisible(true);
                    }} />
                    <Text> ({commentsTotal}) Comments</Text>
                </View>
            </ScrollView> : null}
            <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCommentsTotal={setCommentsTotal} postId={locationId} />
        </View>
    );
}

