import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { Location } from "../types/Location";
import { getFavoriteLocations } from '../utils/favoritesStorage';
import {addToSavedLocations, addToVisitedLocations,removeFromSavedLocations, removeFromVisitedLocations} from '../utils/savedVisitedStorage';
import { styles } from '../styles';

// Component imports
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from '../Components/ImageCarousel';
import TitleSection from '../Components/TitleSection';
import MetaInfo from '../Components/MetaInfo';
import Amenities from '../Components/Amenities';
import ActionButtons from '../Components/ActionButtons';
import Description from '../Components/Description';
import CommentScreen from './CommentScreen';

type RootStackParamList = {
  DestinationDetails: { location: Location };
};

type DestinationDetailsRouteProp = RouteProp<RootStackParamList, "DestinationDetails">;

interface DestinationDetailsProps {
  route: DestinationDetailsRouteProp;
}

const screenWidth = Dimensions.get('window').width;

const DestinationDetailsScreen: React.FC<DestinationDetailsProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  const location = route?.params?.location;
  if (!location || !location.name || !location.sportsPlaceId) {
    return (
      <View style={styles.destinationDetailContainer}>
      </View>
    );
  }

  const images = Array.isArray(location.images) && location.images.length > 0
    ? location.images
    : [{ uri: 'https://via.placeholder.com/320' }]; // Placeholder image 

  useEffect(() => {
    getFavoriteLocations().then((favorites) => {
      setIsFavorite(favorites.some((fav) => fav.sportsPlaceId === location.sportsPlaceId));
    });
  }, [location]);

  const rating = 4.7;

  return (
    <View style={styles.destinationDetailContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageCarousel
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onImagePress={(idx) => {
            setPreviewIndex(idx);
            setPreviewVisible(true);
          }}
          onBack={() => navigation.goBack()}
          isLiked={isLiked}
          onLike={() => setIsLiked(!isLiked)}
        />
        <View style={styles.destinationDetailContent}>

          {/* Title Section - Name and rating of the location */}

          <TitleSection name={location.name} rating={rating} />

          {/* Meta Info about the location */}
          <MetaInfo
            distance={location.properties?.routeLengthKm ? `${location.properties.routeLengthKm} km` : 'Ei tiedossa'}
            duration="45 min" // Replace later
            difficulty="Helppo"
          />

          {/* Description - Description of the location */}
          <Description text={location.properties?.infoFi || 'Ei kuvausta saatavilla'} />

          {/* Amenities of the location */}
          <Amenities
            amenities={[
              { icon: 'walk', label: 'Luontopolku' },
              { icon: 'eye', label: 'Lintujen tarkkailu' },
              { icon: 'car', label: 'Parkkeeraus' },
            ]}
          />
          <CommentScreen params={location.sportsPlaceId.toString()} />

          {/* Action Buttons / save and mark as visited */}
          <ActionButtons
            isSaved={isSaved}
            isVisited={isVisited}
            onSave={async () => {
              if (isSaved) {
                await removeFromSavedLocations(location.sportsPlaceId);
                setIsSaved(false);
              } else {
                await addToSavedLocations(location);
                setIsSaved(true);
              }
            }}
            onVisit={async () => {
              if (isVisited) {
                await removeFromVisitedLocations(location.sportsPlaceId);
                setIsVisited(false);
              } else {
                await addToVisitedLocations(location);
                setIsVisited(true);
              }
            }}
          />
        </View>
      </ScrollView>
      <Modal visible={previewVisible} transparent={true}>
        <View style={styles.destinationDetailModalBackground}>
          <TouchableOpacity
            style={styles.destinationDetailCloseModalButton}
            onPress={() => setPreviewVisible(false)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: previewIndex * screenWidth, y: 0 }}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setPreviewIndex(index);
            }}
            style={{ flex: 1 }}
          >
            {images.map((img, idx) => (
              <View
                key={idx}
                style={{
                  width: screenWidth,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image source={img} style={styles.destinationDetailFullscreenImage} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.destinationDetailModalDotsContainer}>
            {images.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.destinationDetailDot,
                  previewIndex === idx ? styles.destinationDetailActiveDot : styles.destinationDetailInactiveDot,
                ]}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DestinationDetailsScreen;