// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpp4W4VBLeM98PthqswgZzrQeNq7eXxss",
    authDomain: "diabacontrol-27ffe.firebaseapp.com",
    projectId: "diabacontrol-27ffe",
    storageBucket: "diabacontrol-27ffe.appspot.com",
    messagingSenderId: "975014458613",
    appId: "1:975014458613:web:737b55a7c534c3d30601bc",
    measurementId: "G-7NP3SLWSYH",
    databaseURL: "https://diabacontrol-27ffe-default-rtdb.firebaseio.com/",
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const database = getDatabase(app);
// const analytics = getAnalytics(app);