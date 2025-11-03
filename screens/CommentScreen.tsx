import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Message } from '../Components/commentHelpers';
import CommentsModal from '../Components/CommentsModal';
import { styles } from '../styles';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
    params: string;
}
const CommentScreen: React.FC<Props> = ({ params }) => {

    type PostType = {
        id: string;
        details: string;
        locationId: string;
    };

    // const locationId = "19999" //This is just for testing
    // Makes locationId to String
    const numberParam = params.toString();
    const locationId = numberParam;

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
        <View style={{ paddingBottom: 20 }} >
            {loading ? <ActivityIndicator size='large' /> : null}
            {error ? <Message message={error} variant='red' /> : null}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.amenityCard}>
                    <View style={styles.amenityIcon}>
                        <AntDesign name="comment" size={24} color="#4caf50" />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                        }} >
                        <Text style={styles.amenityText}>Kommentit</Text>
                        <Text style={{ color: "white", fontSize: 10 }}> ({commentsTotal}) Kommenttia</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCommentsTotal={setCommentsTotal} postId={locationId} />
        </View>
    );
}

export default CommentScreen