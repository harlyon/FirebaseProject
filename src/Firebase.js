import firebase from "firebase";
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyA3IUuT8bpeOpLhV7TkSwPFpe_8ecj3mjc",
  authDomain: "project2-888db.firebaseapp.com",
  databaseURL: "https://project2-888db.firebaseio.com",
  projectId: "project2-888db",
  storageBucket: "project2-888db.appspot.com",
  messagingSenderId: "965105450373",
  appId: "1:965105450373:web:ad2699fc8ce5b036"
};

firebase.initializeApp(config);
firebase.firestore();
export default firebase;