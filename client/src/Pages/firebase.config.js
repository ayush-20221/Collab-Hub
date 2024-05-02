// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeRx1v1AEL8138iklIDr_Hf5C0KuZ-X2M",
  authDomain: "collab-hub-3eb2a.firebaseapp.com",
  projectId: "collab-hub-3eb2a",
  storageBucket: "collab-hub-3eb2a.appspot.com",
  messagingSenderId: "829116214937",
  appId: "1:829116214937:web:b2d90766e3007a1c8fd208",
  measurementId: "G-JFDR3YLTC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);