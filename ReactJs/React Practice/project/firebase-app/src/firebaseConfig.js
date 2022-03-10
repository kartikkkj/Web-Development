import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrcp_0y5rD7rfeZvkmesqDNVZ9TKJsEYg",
  authDomain: "web-app-3f3a8.firebaseapp.com",
  projectId: "web-app-3f3a8",
  storageBucket: "web-app-3f3a8.appspot.com",
  messagingSenderId: "115862983512",
  appId: "1:115862983512:web:ae20995f1a670cf1e00b2d"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
const firestore = firebase.firestore()
export const database = {
    users:firestore.collection("users")
}
export const storage = firebase.storage();