import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import Video from '../components/Video';
import AddVideo from '../components/AddVideo';


export default function Favoritos({ navigation }) {
  const [isPopupVisible, setPopupVisible] = useState(false); // Estado para mostrar/ocultar el popup
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userEmail = auth.currentUser.email;
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORAGE, 'users', userEmail, 'favoritos')
        );
        const loadedVideos = [];
        querySnapshot.forEach((doc) => {
          loadedVideos.push({ id: doc.id, ...doc.data() });
        });
        setVideos(loadedVideos);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los videos favoritos');
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddVideo = async (url) => {
    if (!isValidURL(url)) {
      alert("La URL no es válida");
      return;
    }

    let type = "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      type = "YouTube";
    } else if (url.includes("instagram.com")) {
      type = "Instagram";
    } else {
      alert("No se reconoce el tipo de video. Solo se admiten YouTube o Instagram.");
      return;
    }

    // Generar la miniatura si es un video de YouTube
    const thumbnail = type === "YouTube" ? generateThumbnail(url) : null;
    const title = await fetchVideoTitle(url);
    const newVideo = {
      id: Date.now(),
      title,
      type,
      url,
      thumbnail,
    };
  
    try {
      const userEmail = auth.currentUser.email;
      await addDoc(
        collection(FIREBASE_STORAGE, 'users', userEmail, 'favoritos'),
        newVideo
      );
      setVideos([...videos, newVideo]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el video');
      console.error(error);
    }
  };

  const handleVideoPress = (url) => {
    Linking.openURL(url) // Abre la URL del video
      .catch((err) => console.error("Error al intentar abrir la URL: ", err));
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        Alert.alert('Error', 'Faltan datos de usuario');
        return;
      }
      // Borra el documento del video favorito
      await deleteDoc(doc(FIREBASE_STORAGE, 'users', userEmail, 'favoritos', videoId.toString()));
      // Actualiza el estado local
      setVideos(videos.filter((video) => video.id !== videoId));
    } catch (error) {
      Alert.alert('Error', 'No se pudo borrar el video');
      console.error(error);
    }
  };

  const generateThumbnail = (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0]; // Extrae el ID de la URL corta
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0]; // Para URL de Shorts
        } else {
          videoId = url.split("v=")[1]?.split("&")[0]; // Para URL estándar
        }
      }
  
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
    } catch (error) {
      console.error("Error al generar la miniatura:", error);
      return null;
    }
  };

  //Genera el titulo del video en base a la URL
  const fetchVideoTitle = async (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0]; // Extrae el ID de la URL corta
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0]; // Para URL de Shorts
        } else {
          videoId = url.split("v=")[1]?.split("&")[0]; // Para URL estándar
        }
      }
  
      if (videoId) {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        const data = await response.json();
        return data.title; // El título del video
      } else {
        return "Título no disponible"; // Título genérico en caso de error
      }
    } catch (error) {
      console.error("Error al obtener el título:", error);
      return "Título no disponible"; // Título genérico en caso de error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <View style={styles.scrollContainer}>
        {videos.length === 0 ? (
          <Text style={styles.emptyMessage}>No tienes videos favoritos todavía.</Text>
        ) : (
          <FlatList
            data={videos} // Pasa la lista de videos
            keyExtractor={(item) => item.id.toString()} // Especifica cómo extraer la clave única de cada item
            renderItem={({ item }) => (
              <Video 
                title={item.title}
                image={item.thumbnail} 
                type={item.type} 
                onPress={() => handleVideoPress(item.url)} // Renderiza el componente Video para cada item en la lista
                onDelete={() => handleDeleteVideo(item.id)}
              />
            )}
            contentContainerStyle={videos.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : {}}
          />
        )}
      </View>
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
  emptyMessage: {
    color: '#B0B0B0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});