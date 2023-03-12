// 只引入需要的,减小应用体积,v9版本不同记得加上/compat
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqI_VKqESHzJLjcIlp8FypGtiKXNjKxOM",
  authDomain: "music-d34b2.firebaseapp.com",
  projectId: "music-d34b2",
  storageBucket: "music-d34b2.appspot.com",
  messagingSenderId: "679007498395",
  appId: "1:679007498395:web:14d787c3ba624bea11963e",
  measurementId: "G-YFZKYZ3TPR",
};
// Initialize Firebase

// export default firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");

export { auth, db, usersCollection, storage };
