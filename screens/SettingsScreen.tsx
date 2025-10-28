import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { Button, Message } from '../Components/commentHelpers';
import CommentsModal from '../Components/CommentsModal';
import { styles } from '../styles';
import CommentScreen from './CommentScreen';


export default function SettingsScreen() {


  return (
    <View style={styles.container}>
      <Text>Asetukset</Text>
      <CommentScreen params={"1000"} />
    </View>
  );
}

