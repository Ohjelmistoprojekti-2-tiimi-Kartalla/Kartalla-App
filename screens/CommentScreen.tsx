import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Message } from '../Components/commentHelpers';
import CommentsModal from '../Components/CommentsModal';
import { styles } from '../styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PostType } from '../types/CommentType';
interface Props {
    params: string;
}
//Get LocationId from DestinationDetalisScreen as params
const CommentScreen: React.FC<Props> = ({ params }) => {

    const locationId = params;

    const [post, setPost] = useState<PostType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [commentsTotal, setCommentsTotal] = useState<number>(0);

    //Get all comments that maches locationId:n
    const getComments = async () => {
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
            setError(error?.message || "Kommenttien tuominen ei onnistunut");
        }
        setLoading(false);
    };
    useEffect(() => {
        getComments();
        console.log("LocationId = " + locationId)
    }, []);

    return (
        <View style={{ paddingBottom: 20 }} >
            {/* Error message */}
            {error ? <Message message={error} variant='red' /> : null}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.amenityCard}>
                    <View style={styles.amenityIcon}>
                        <AntDesign name="comment" size={24} color="#4caf50" />
                    </View>
                    {/* Button to open CommentsModal */}
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