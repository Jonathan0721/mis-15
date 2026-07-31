import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbpbEvs1xHEHftUJf_x3IjDEubqT-YWF8",
  authDomain: "mis-15-2dc38.firebaseapp.com",
  projectId: "mis-15-2dc38",
  storageBucket: "mis-15-2dc38.firebasestorage.app",
  messagingSenderId: "653525918574",
  appId: "1:653525918574:web:906df53b46137b1225d77f",
  measurementId: "G-J5MDZ9VSEP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);