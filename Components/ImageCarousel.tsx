import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface ImagesProps {
  images: any[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  onImagePress: (idx: number) => void;
  onBack: () => void;
  isLiked: boolean;
  onLike: () => void;
}

const ImageCarousel: React.FC<ImagesProps> = ({
  images, activeIndex, setActiveIndex, onImagePress, onBack, isLiked, onLike
}) => (
  <View style={{ position: 'relative', height: 320 }}>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={(event) => {
        const index = Math.round(
          event.nativeEvent.contentOffset.x / Dimensions.get('window').width
        );
        setActiveIndex(index);
      }}
      scrollEventThrottle={16}
    >
      {images.map((img, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onImagePress(idx)}
          activeOpacity={0.9}
        >
          <Image source={img} style={{ width: Dimensions.get('window').width, height: 320, resizeMode: 'cover' }} />
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Back Button */}
    <TouchableOpacity
      style={{
        position: 'absolute', top: 50, left: 20, width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center'
      }}
      onPress={onBack}
    >
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>

    {/* Share & Like Buttons */}
    <View style={{ position: 'absolute', top: 50, right: 20, flexDirection: 'row', gap: 10 }}>
      <TouchableOpacity
        style={{
          width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center'
        }}
        onPress={() => {/* Share functionality */}}
      >
        <Ionicons name="share-outline" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)',
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center'
        }}
        onPress={onLike}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? "#ff3e3eff" : "#fff"}
        />
      </TouchableOpacity>
    </View>

    {/* Dots Indicator */}
    <View style={{
      position: 'absolute', bottom: 20, left: 0, right: 0,
      flexDirection: 'row', justifyContent: 'center', gap: 6
    }}>
      {images.map((_, idx) => (
        <View
          key={idx}
          style={{
            height: 6, borderRadius: 3,
            width: activeIndex === idx ? 20 : 6,
            backgroundColor: activeIndex === idx ? '#fff' : 'rgba(255,255,255,0.4)',
            marginHorizontal: 3
          }}
        />
      ))}
    </View>
  </View>
);

export default ImageCarousel;