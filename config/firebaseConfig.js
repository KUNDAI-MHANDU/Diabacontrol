// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrv8Cb1RkAHgNz2ZK4x_yYgKnW8vjy-yA",
  authDomain: "diabacontrol-25768.firebaseapp.com",
  projectId: "diabacontrol-25768",
  storageBucket: "diabacontrol-25768.appspot.com",
  messagingSenderId: "572966888597",
  appId: "1:572966888597:web:6a3dba0bdecb768978a79c",
  measurementId: "G-KCLR40FCS4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);