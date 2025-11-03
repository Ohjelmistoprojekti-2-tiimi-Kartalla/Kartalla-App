import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Modal, Button } from 'react-native';
import { Location } from "../types/Location";
import { addToFavorites, removeFromFavorites, getFavoriteLocations } from '../utils/favoritesStorage';
import {
  addToSavedLocations,
  addToVisitedLocations,
  removeFromSavedLocations,
  removeFromVisitedLocations
} from '../utils/savedVisitedStorage';
import { styles } from '../styles';

// määritellään reitit
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

type DestinationDetailsRouteProp = RouteProp<
  RootStackParamList,
  "DestinationDetails"
>;

interface Props {
  route: DestinationDetailsRouteProp;
}

const mockLocation: Location = {
  id: 1,
  name: "Veikeä reitti",
  description: "Kuvankaunis polku, joka kulkee tiheän mäntymetsän läpi. Reitti polveilee virtaavan joen varrella. Matkan varrella on useita näköalapaikkoja. Huikea reitti!",
  images: [
    require('../assets/luontopolku.png'),
    require('../assets/luontopolku2.jpg'),
    require('../assets/maisema.png')
  ],
  sportsPlaceId: 123,
  type: {
    typeCode: 1,
    name: "Luontopolku"
  },
  location: {
    address: "Luontopolku 23, 56700 Padasjoki",
    city: {
      name: "Padasjoki",
      postalCode: "56700",
      postalOffice: "Padasjoki"
    },
    coordinates: {
      wgs84: {
        lat: 60.1699,
        lon: 24.9384
      }
    },
    geometries: {
      type: "FeatureCollection",
      features: []
    }
  },
  properties: {
    infoFi: "Lisätietoa reitistä",
    routeLengthKm: 2.3,
    www: "https://esimerkki.fi"
  }
};

const screenWidth = Dimensions.get('window').width;

const DestinationDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisited, setIsVisited] = useState(false);

  const location = route?.params?.location;
  if (!location || !location.name || !location.sportsPlaceId) {
    return (
      <View style={styles.destinationDetailContainer}>
      </View>
    );
  }


  const images = Array.isArray(location.images) && location.images.length > 0
    ? location.images
    : [{ uri: 'https://via.placeholder.com/320' }]; // Varakuva 

  useEffect(() => {
    getFavoriteLocations().then((favorites) => {
      setIsFavorite(favorites.some((fav) => fav.sportsPlaceId === location.sportsPlaceId));
    });
  }, [location]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(location.sportsPlaceId);
      setIsFavorite(false);
    } else {
      await addToFavorites(location);
      setIsFavorite(true);
    }
  };

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

          {/* Title Section - Paikan nimi ja rating */}

          <TitleSection name={location.name} rating={rating} />

          {/* Meta Infoo paikasta */}
          <MetaInfo
            distance={location.properties?.routeLengthKm ? `${location.properties.routeLengthKm} km` : 'Ei tiedossa'}
            duration="45 min" // Korvaa myöhemmin
            difficulty="Helppo"
          />

          {/* Description - kuvaus paikasta*/}
          <Description text={location.properties?.infoFi || 'Ei kuvausta saatavilla'} />

          {/* Amenities eli "mukavuudet" sektio */}
          <Amenities
            amenities={[
              { icon: 'walk', label: 'Luontopolku' },
              { icon: 'eye', label: 'Lintujen tarkkailu' },
              { icon: 'car', label: 'Parkkeeraus' },
            ]}
          />
          <CommentScreen params={location.sportsPlaceId} />

          {/* Action Buttons / Tallenna - Merkitse vierailluksi*/}
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