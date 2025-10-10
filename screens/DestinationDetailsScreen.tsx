import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Modal, Button } from 'react-native';
import { Location } from "../types/Location";
import { addToFavorites, removeFromFavorites, getFavoriteLocations } from '../utils/favoritesStorage';
import {
  addToSavedLocations,
  addToVisitedLocations,
  removeFromSavedLocations,
  removeFromVisitedLocations
} from '../utils/savedVisitedStorage';

// määritellään reitit
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from '../Components/ImageCarousel';
import TitleSection from '../Components/TitleSection'; 
import MetaInfo from '../Components/MetaInfo';
import Amenities from '../Components/Amenities';
import ActionButtons from '../Components/ActionButtons';
import Description from '../Components/Description';

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
      <View style={styles.container}>
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
    <View style={styles.container}>
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
        <View style={styles.content}>

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
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.closeModalButton}
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
                <Image source={img} style={styles.fullscreenImage} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.modalDotsContainer}>
            {images.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  previewIndex === idx ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  heroSection: {
    position: 'relative',
    height: 320,
  },
  heroImage: {
    width: screenWidth,
    height: 320,
    resizeMode: 'cover',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    
    elevation: 5,
  },
  floatingActions: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#fff',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  content: {
    padding: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,193,7,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },
  description: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  amenityCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#4caf50',
    alignItems: 'center',
  },
  primaryButtonVisited: {
    backgroundColor: '#2e7d32',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  closeModalButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain',
  },
  modalDotsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
   info: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerImage: {
    width: screenWidth,
    height: 180,
    borderRadius: 16,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default DestinationDetailsScreen;