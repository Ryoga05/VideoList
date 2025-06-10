import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import List from '../components/ListComponent'
import AddList from '../components/AddList';


export default function Listas({ navigation }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [lists, setLists] = useState([]);

  // Leer listas del usuario actual al montar el componente
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userEmail = auth.currentUser.email;
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORAGE, 'users', userEmail, 'listas')
        );
        const loadedLists = [];
        querySnapshot.forEach((doc) => {
          loadedLists.push({ id: doc.id, ...doc.data() });
        });
        setLists(loadedLists);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar las listas');
        console.error(error);
      }
    };
    fetchLists();
  }, []);

  // Guardar una nueva lista en Firestore
  const handleAddList = async (title, description, image) => {
    try {
      const userEmail = auth.currentUser.email;
      const newList = {
        title,
        description,
        image,
        videos: [],
      };
      const docRef = await addDoc(
        collection(FIREBASE_STORAGE, 'users', userEmail, 'listas'),
        newList
      );
      setLists([...lists, { id: docRef.id, ...newList }]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la lista');
      console.error(error);
    }
  };

  const handleListPress = (item) => {
    navigation.navigate('Lista', { listaId: item.id });
  };

  const handleAddVideo = async (listaId, newVideo) => {
    try {
      const userEmail = auth.currentUser.email;
      const listaRef = doc(FIREBASE_STORAGE, 'users', userEmail, 'listas', listaId);
      const listaSnap = await getDoc(listaRef);
      let currentVideos = [];
      if (listaSnap.exists()) {
        currentVideos = listaSnap.data().videos || [];
      }
      const updatedVideos = [...currentVideos, newVideo];
      await setDoc(listaRef, { videos: updatedVideos }, { merge: true });
      setVideos(updatedVideos);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el video a la lista');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas</Text>
      <View style={styles.scrollContainer}>
        {lists.length === 0 ? (
          <Text style={styles.emptyMessage}>No tienes listas todavía.</Text>
        ) : (
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <List
                title={item.title}
                description={item.description}
                image={item.image}
                onPress={() => handleListPress(item)}
              />
            )}
            contentContainerStyle={lists.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : {}}
          />
        )}
      </View>
      <AddButton onPress={() => setPopupVisible(true)} />
      <AddList
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onAddList={handleAddList}
      />
      <Menu active="listas" />
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