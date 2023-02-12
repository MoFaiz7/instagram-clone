import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfR-FW53Q0-i8-d1UtOazfOCUWpcJeTJo",
    authDomain: "ig-clone-2acd9.firebaseapp.com",
    projectId: "ig-clone-2acd9",
    storageBucket: "ig-clone-2acd9.appspot.com",
    messagingSenderId: "819752353136",
    appId: "1:819752353136:web:e5a1cda6c7d59d5641e3b5",
    measurementId: "G-DS2XXYLNG3"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const dataref = firebase.database();

export { auth, db, storage, dataref };
