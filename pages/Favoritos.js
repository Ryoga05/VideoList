import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '../components/Menu';
import AddButton from '../components/AddButton';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';


export default function Favoritos({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Hola esto es VideoList</Text>
      <AddButton></AddButton>
      <Menu/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 16,
  }
});