// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// 1. Add these imports for Authentication (Cheat Sheet Page 5)
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig =  {
  apiKey: "AIzaSyC32E9f9TXbOctq3IVGFtaR-jo_R5KOKiQ",
  authDomain: "swiftfinance-65919.firebaseapp.com",
  projectId: "swiftfinance-65919",
  storageBucket: "swiftfinance-65919.firebasestorage.app",
  messagingSenderId: "859984916902",
  appId: "1:859984916902:web:ea1327b59b2c183e029f67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Export the Auth services so we can use them in the pages
const db = getFirestore(app);
const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };