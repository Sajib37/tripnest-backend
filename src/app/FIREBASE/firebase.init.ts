// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey ,
  authDomain: process.env.FIREBASE_authDomain ,
  projectId: process.env.FIREBASE_projectId ,
  storageBucket: process.env.FIREBASE_storageBucket ,
  messagingSenderId: process.env.FIREBASE_messagingSenderId ,
  appId: process.env.FIREBASE_appId 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;