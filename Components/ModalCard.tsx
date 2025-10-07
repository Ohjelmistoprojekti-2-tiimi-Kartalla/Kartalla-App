import React from "react";
import { Modal, Text, Pressable, Image } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Location } from "../types/Location";

interface ModalCardProps {
    visible: boolean;
    onClose: () => void;
    location: Location;
}

type RootStackParamList = {
    DestinationDetails: { location: Location };
};

function ModalCard({ visible, onClose, location }: ModalCardProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const name =
        typeof location.name === "string"
            ? location.name
            : "Ei nimeä saatavilla";
    const address = location.location?.address || "Ei osoitetta saatavilla";

    const handleViewDetails = () => {
        navigation.navigate("DestinationDetails", { location });
        onClose(); // sulkee modaalin
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
                    <Image source={require("../assets/maisema.png")} style={styles.cardImage} />
                    <Text style={styles.cardTitle}>{name}</Text>
                    <Text style={styles.cardAddress}>{address}</Text>

                    <Pressable style={styles.viewButton} onPress={handleViewDetails}>
                        <Text style={styles.viewButtonText}>Tarkastele</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

export default ModalCard;
