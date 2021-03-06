import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
  authDomain: "instagram-clone-23884.firebaseapp.com",
  databaseURL: "https://instagram-clone-23884.firebaseio.com",
  projectId: "instagram-clone-23884",
  storageBucket: "instagram-clone-23884.appspot.com",
  messagingSenderId: "671034896143",
  appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
});

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export {db, auth, storage};
