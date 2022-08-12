import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLGCqjvMRoSo1ps7LlHRXEEcIZQpikdUI",
  authDomain: "kartik-sir.firebaseapp.com",
  databaseURL: "https://kartik-sir-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kartik-sir",
  storageBucket: "kartik-sir.appspot.com",
  messagingSenderId: "613906690527",
  appId: "1:613906690527:web:ec8b0d629625a412f2946a"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);