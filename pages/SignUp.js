import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 


export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  
  const handleSignUp = async () => {
    const auth = getAuth();
    const db = getFirestore()

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // El usuario recién creado
      
      // Crear un documento en Firestore con el UID del usuario y el nombre de usuario
      await setDoc(doc(db, 'users', user.uid), {
        username: username,  // Guardamos el nombre de usuario
      });
      
      // Navegar a la pantalla de Login o Favoritos
      navigation.navigate('Favoritos'); // O 'Favoritos' dependiendo de lo que quieras
    } catch (error) {
      // Manejar errores (ej. correo ya en uso, contraseña débil, etc.)
      console.error(error.message);
      Alert.alert('Error', 'Hubo un problema al crear la cuenta. Intenta nuevamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>VideoList</Text>
            <Image source={require('../assets/Logo.png')} style={styles.logo}/>
            <View style={styles.signUpBox}>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.signUpInput}
                placeholder="Introduce tu nombre de usuario..."
                placeholderTextColor={styles.SignUpInputText.color}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.signUpInput}
                placeholder="Introduce tu correo..."
                placeholderTextColor={styles.SignUpInputText.color}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.signUpInput}
                placeholder="Introduce tu contraseña..."
                placeholderTextColor={styles.SignUpInputText.color}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                  <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  logo: {
    width: '60%',
    height: undefined, // Permitirá que la altura se ajuste automáticamente
    aspectRatio: 1, // Mantendrá la proporción de la imagen
    resizeMode: 'contain', // Evitará que la imagen se deforme
    borderRadius: 50,
  },
  signUpBox: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B4B4B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 40,
  },
  signUpInput: {
    backgroundColor: 'rgba(28, 28, 28, 0.4)', // Fondo con 40% de opacidad
    borderRadius: 15,
    margin: 10,
    padding: 12,
    minHeight: 60,
    width: '90%',
    color: 'white',
  },
  SignUpInputText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  signUpButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    height: '20%',
    width: '60%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  loginButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    height: '15%',
    width: '40%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 12
  }
});