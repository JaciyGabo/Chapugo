import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from 'firebase/firestore';
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDTT1VEGLPbRfPLISD4CecEyVJEdBbY5L8",
  authDomain: "grupot209aplicaciones-f8bd8.firebaseapp.com",
  databaseURL: "https://grupot209aplicaciones-f8bd8-default-rtdb.firebaseio.com",
  projectId: "grupot209aplicaciones-f8bd8",
  storageBucket: "grupot209aplicaciones-f8bd8.appspot.com",
  messagingSenderId: "240553178624",
  appId: "1:240553178624:web:70a71014823fed6b350ae5",
  measurementId: "G-9RCV95ZJ75"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
export const terrario = ref(db, '50/11');