import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD6UNcDBPZGzKmUeSnZYpKD5e7fv7EKlw8",
  authDomain: "music-playlists-2c47c.firebaseapp.com",
  projectId: "music-playlists-2c47c",
  storageBucket: "music-playlists-2c47c.appspot.com",
  messagingSenderId: "780732330860",
  appId: "1:780732330860:web:b3d6024e74b069009f7949"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }