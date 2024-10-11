// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqPNS-XEikKMUTDtYY5yvF6pb2SceeKt8",
  authDomain: "assignment5032-8c0f6.firebaseapp.com",
  projectId: "assignment5032-8c0f6",
  storageBucket: "assignment5032-8c0f6.appspot.com",
  messagingSenderId: "411624631634",
  appId: "1:411624631634:web:ab20d2c0e4ca34bfe65e8b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db
