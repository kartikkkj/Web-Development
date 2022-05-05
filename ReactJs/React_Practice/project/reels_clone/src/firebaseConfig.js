import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWK1mTbVMidkmr-lQblFNoxxODZfwfcYI",
  authDomain: "mujra-bcd5f.firebaseapp.com",
  projectId: "mujra-bcd5f",
  storageBucket: "mujra-bcd5f.appspot.com",
  messagingSenderId: "1058774535327",
  appId: "1:1058774535327:web:9a6d4020f9031f2a0626aa",
  measurementId: "G-89XPN92EX0"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
const firestore = firebase.firestore()
export const database = {
    users:firestore.collection("users"),
    posts:firestore.collection("posts"),
    comments:firestore.collection("comments"),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();