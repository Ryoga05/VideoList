import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login'
import Favoritos from './pages/Favoritos';
import Listas from './pages/Listas'
import Usuario from './pages/Usuario'
import Lista from './pages/Lista'

import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Listas" component={Listas} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Usuario" component={Usuario} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Lista" component={Lista} options={{ headerShown: false ,  animation: 'none'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}