import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBcMKa3eYZ1t069CSSMRvTjPTcXkDRoSRM",
  authDomain: "videolist-6d609.firebaseapp.com",
  projectId: "videolist-6d609",
  storageBucket: "videolist-6d609.firebasestorage.app",
  messagingSenderId: "509553126428",
  appId: "1:509553126428:web:5ba3c725a317c1b144c3d9"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_STORAGE = getFirestore(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);