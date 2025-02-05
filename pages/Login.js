import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Si el usuario está autenticado, navega a la pantalla de Favoritos
          navigation.navigate('Favoritos');
        }
      });
    
      // Limpia el observer cuando el componente se desmonta
      return () => unsubscribe();
    }, []);

    const handleLogin = () => {
        const auth = getAuth(); // Obtener la instancia de autenticación

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('Favoritos'); // Navegar a Favoritos si el login es correcto
            })
            .catch(() => {
                Alert.alert('Error', 'Correo o contraseña incorrectos'); // Muestra un mensaje si falla
            });
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
                  <View style={styles.loginBox}>
                    <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                      <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.loginInput}
                      placeholder="Introduce tu correo..."
                      placeholderTextColor={styles.loginInputText.color}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={styles.loginInput}
                      placeholder="Introduce tu contraseña..."
                      placeholderTextColor={styles.loginInputText.color}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginText}>Login</Text>
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
  loginBox: {
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
  loginInput: {
    backgroundColor: 'rgba(28, 28, 28, 0.4)', // Fondo con 40% de opacidad
    borderRadius: 15,
    margin: 10,
    padding: 12,
    minHeight: 60,
    width: '90%',
    color: 'white',
  },
  loginInputText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  loginButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    margin: 15,
    height: '20%',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  signUpButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    margin: 15,
    height: '15%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 12
  }
});