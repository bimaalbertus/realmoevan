import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { provider, db, auth };
