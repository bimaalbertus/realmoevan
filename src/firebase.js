import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6Z7WG0hqjBiUTUte9Fs-ldP2a3-hdKNY",
  authDomain: "go-watch-97d7a.firebaseapp.com",
  projectId: "go-watch-97d7a",
  storageBucket: "go-watch-97d7a.appspot.com",
  messagingSenderId: "117276097155",
  appId: "1:117276097155:web:f74df17f4ebeda5249f9b6",
  measurementId: "G-LN6PG78YP2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// const storage = firebase.storage();

export { provider, db };
export default db;

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();

export const storage = getStorage(app);
