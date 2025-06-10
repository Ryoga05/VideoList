import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { FIREBASE_STORAGE } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Menu from '../components/Menu';

const handleLogOut = (navigation) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      navigation.navigate('Login');
    })
    .catch((error) => {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    });
};

export default function Usuario({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);

      // Leer el nombre de usuario desde Firestore
      const fetchUsername = async () => {
        try {
          const userDoc = await getDoc(doc(FIREBASE_STORAGE, 'users', user.email));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username || '');
          }
        } catch (error) {
          console.error('Error al obtener el nombre de usuario:', error);
        }
      };
      fetchUsername();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>
      <Text style={styles.info}>Correo: {email}</Text>
      <Text style={styles.info}>Nombre: {username}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleLogOut(navigation)}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <Menu active="usuario"/>
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
  info: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4B4B4B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});