// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC32E9f9TXbOctq3IVGFtaR-jo_R5KOKiQ",
  authDomain: "swiftfinance-65919.firebaseapp.com",
  projectId: "swiftfinance-65919",
  storageBucket: "swiftfinance-65919.firebasestorage.app",
  messagingSenderId: "859984916902",
  appId: "1:859984916902:web:ea1327b59b2c183e029f67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service 
export const db = getFirestore(app); 