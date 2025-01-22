import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import List from '../components/ListComponent'
import AddList from '../components/AddList';


export default function Listas({ navigation }) {
  
  const [isPopupVisible, setPopupVisible] = useState(false); // Estado para mostrar/ocultar el popup
  const [lists, setLists] = useState([  // Lista de videos, inicializada como un arreglo de objetos
      { id: 1, title: "Title", description: "Description", image: null},
      { id: 2, title: "Title", description: "Description"},
      { id: 3, title: "Title", description: "Description"},
      { id: 4, title: "Title", description: "Description"},
      { id: 5, title: "Title", description: "Description"},
    ]);

  const handleAddList = (title, description, image) => {
    
    const newList = {
      id: Date.now(),
      title,
      description,
      image
    };

    setLists([...lists, newList]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas</Text>
      <View style={styles.scrollContainer}>
        {lists.length === 0 ? (
          <Text style={styles.emptyMessage}>No tienes listas todavía.</Text>
        ) : (
          <FlatList
            data={lists} // Pasa la lista de listas
            keyExtractor={(item) => item.id.toString()} // Especifica cómo extraer la clave única de cada item
            renderItem={({ item }) => (
              <List 
                title={item.title}
                description={item.description}
                image={item.image}
                onPress={() => handleVideoPress(item.url)} // Renderiza el componente Video para cada item en la lista
              />
            )}
            contentContainerStyle={lists.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : {}}
          />
        )}
      </View>
      <AddButton onPress={() => setPopupVisible(true)}/>
      <AddList
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Cierra el popup
        onAddList={(title, description, image) => handleAddList(title, description, image)} // Acción al añadir el video
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
  emptyMessage: {
    color: '#B0B0B0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});