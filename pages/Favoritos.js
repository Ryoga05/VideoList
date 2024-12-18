import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import Video from '../components/Video';
import AddVideo from '../components/AddVideo';


export default function Favoritos({ navigation }) {
  const [isPopupVisible, setPopupVisible] = useState(false); // Estado para mostrar/ocultar el popup
  const [videos, setVideos] = useState([  // Lista de videos, inicializada como un arreglo de objetos
    { id: 1, type: "YouTube", url: "https://www.youtube.com/watch?v=6YLrp2E7ah4", thumbnail: "https://img.youtube.com/vi/6YLrp2E7ah4/0.jpg" },
    { id: 2, type: "Instagram", url: "https://www.instagram.com/kanauru_/reel/DDpF5JMImr9/" },
    { id: 3, type: "YouTube", url: "https://www.youtube.com/watch?v=yutRh3wuncs", thumbnail: "https://img.youtube.com/vi/yutRh3wuncs/0.jpg" },
    { id: 4, type: "YouTube", url: "https://www.youtube.com/watch?v=yutRh3wuncs" },
    { id: 5, type: "YouTube", url: "https://www.youtube.com/watch?v=yutRh3wuncs" },
    { id: 6, type: "YouTube", url: "https://www.youtube.com/watch?v=yutRh3wuncs" }
  ]);

  const handleAddVideo = (url) => {
    console.log('URL del video:', url);
    // Aquí puedes agregar la lógica para manejar la URL ingresada
  };

  const handleVideoPress = (url) => {
    Linking.openURL(url) // Abre la URL del video
      .catch((err) => console.error("Error al intentar abrir la URL: ", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.videoList}>
        <FlatList
        data={videos} // Pasa la lista de videos
        keyExtractor={(item) => item.id.toString()} // Especifica cómo extraer la clave única de cada item
        renderItem={({ item }) => (
          <Video 
            image={item.thumbnail} 
            type={item.type} 
            onPress={() => handleVideoPress(item.url)} />  // Renderiza el componente Video para cada item en la lista
        )}
        />
      </ScrollView>
      <AddButton onPress={() => setPopupVisible(true)}/>
      <AddVideo
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)} // Cierra el popup
        onAddVideo={handleAddVideo} // Acción al añadir el video
      />
      <Menu active="favoritos"/>
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