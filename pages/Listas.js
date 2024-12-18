import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import List from '../components/List'
import AddList from '../components/AddList';


export default function Favoritos({ navigation }) {
  
  const [isPopupVisible, setPopupVisible] = useState(false); // Estado para mostrar/ocultar el popup

  const handleAddList = (name) => {
    console.log('Nombre de la lista:', name);
    // Aquí puedes agregar la lógica para manejar la URL ingresada
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas</Text>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.videoList}>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
        <List/>
      </ScrollView>
      <AddButton onPress={() => setPopupVisible(true)}/>
      <AddList
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Cierra el popup
        onAddList={handleAddList} // Acción al añadir el video
      />
      <Menu active="listas"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 50,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 80,
  },
  videoList: {
  },
});