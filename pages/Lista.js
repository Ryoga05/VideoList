import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Linking, Alert } from 'react-native';
import { FIREBASE_STORAGE, auth } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import Video from '../components/Video';
import AddVideo from '../components/AddVideo';

export default function Lista({ route, navigation }) {
  const { listaId } = route.params; // Debes pasar listaId al navegar
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [videos, setVideos] = useState([]);

  // Leer los videos de la lista desde Firestore
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        if (!userEmail || !listaId) {
          Alert.alert('Error', 'Faltan datos de usuario o lista');
          setVideos([]);
          return;
        }
        const listaRef = doc(FIREBASE_STORAGE, 'users', userEmail, 'listas', listaId);
        const listaSnap = await getDoc(listaRef);
        if (listaSnap.exists()) {
          setVideos(listaSnap.data().videos || []);
        } else {
          setVideos([]);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los videos de la lista');
        console.error(error);
      }
    };
    fetchVideos();
  }, [listaId]);

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

    const thumbnail = type === "YouTube" ? generateThumbnail(url) : null;
    const title = await fetchVideoTitle(url, type);
    const newVideo = {
      id: Date.now(),
      title,
      type,
      url,
      thumbnail,
    };

    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail || !listaId) {
        Alert.alert('Error', 'Faltan datos de usuario o lista');
        return;
      }
      const listaRef = doc(FIREBASE_STORAGE, 'users', userEmail, 'listas', listaId);
      const listaSnap = await getDoc(listaRef);
      let currentVideos = [];
      if (listaSnap.exists()) {
        currentVideos = listaSnap.data().videos || [];
      }
      const updatedVideos = [...currentVideos, newVideo];
      console.log("Guardando videos:", updatedVideos);
      await setDoc(listaRef, { videos: updatedVideos }, { merge: true });
      setVideos(updatedVideos);
      console.log("Guardado correctamente");
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el video');
      console.error(error);
    }
  };

  const handleVideoPress = (url) => {
    Linking.openURL(url)
      .catch((err) => console.error("Error al intentar abrir la URL: ", err));
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail || !listaId) {
        Alert.alert('Error', 'Faltan datos de usuario o lista');
        return;
      }
      const listaRef = doc(FIREBASE_STORAGE, 'users', userEmail, 'listas', listaId);
      const listaSnap = await getDoc(listaRef);
      let currentVideos = [];
      if (listaSnap.exists()) {
        currentVideos = listaSnap.data().videos || [];
      }
      // Filtra el video a borrar
      const updatedVideos = currentVideos.filter((video) => video.id !== videoId);
      await setDoc(listaRef, { videos: updatedVideos }, { merge: true });
      setVideos(updatedVideos);
    } catch (error) {
      Alert.alert('Error', 'No se pudo borrar el video');
      console.error(error);
    }
  };

  const generateThumbnail = (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0];
        } else {
          videoId = url.split("v=")[1]?.split("&")[0];
        }
      }
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
    } catch (error) {
      console.error("Error al generar la miniatura:", error);
      return null;
    }
  };

  const fetchVideoTitle = async (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0];
        } else {
          videoId = url.split("v=")[1]?.split("&")[0];
        }
      }
      if (videoId) {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        const data = await response.json();
        return data.title;
      } else {
        return "Título no disponible";
      }
    } catch (error) {
      console.error("Error al obtener el título:", error);
      return "Título no disponible";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista</Text>
      <View style={styles.scrollContainer}>
        {videos.length === 0 ? (
          <Text style={styles.emptyMessage}>No tienes videos todavía.</Text>
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Video
                title={item.title}
                image={item.thumbnail}
                type={item.type}
                onPress={() => handleVideoPress(item.url)}
                onDelete={() => handleDeleteVideo(item.id)}
              />
            )}
            contentContainerStyle={videos.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : {}}
          />
        )}
      </View>
      <AddButton onPress={() => setPopupVisible(true)} />
      <AddVideo
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onAddVideo={handleAddVideo}
      />
      <Menu active="listas" />
    </View>
  );
}

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