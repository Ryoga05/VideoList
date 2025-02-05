import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; // Importa signOut desde Firebase


import { FIREBASE_STORAGE } from '../firebaseConfig'; // Importa la configuración de Firebase
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import Menu from '../components/Menu';

const handleLogOut = (navigation) => {
  const auth = getAuth(); // Obtener la instancia de autenticación

  signOut(auth)
    .then(() => {
      // Limpiar el estado de los inputs
      // Navegar a la pantalla de login después de cerrar sesión
      navigation.navigate('Login');
    })
    .catch((error) => {
      // Si ocurre un error, muestra un mensaje de alerta
      Alert.alert('Error', 'No se pudo cerrar sesión');
    });
};


export default function Usuario({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleLogOut(navigation)}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      <Menu active="usuario"/>
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
  button: {
    backgroundColor: '#4B4B4B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});