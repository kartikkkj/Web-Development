// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrcp_0y5rD7rfeZvkmesqDNVZ9TKJsEYg",
  authDomain: "web-app-3f3a8.firebaseapp.com",
  projectId: "web-app-3f3a8",
  storageBucket: "web-app-3f3a8.appspot.com",
  messagingSenderId: "115862983512",
  appId: "1:115862983512:web:ae20995f1a670cf1e00b2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();