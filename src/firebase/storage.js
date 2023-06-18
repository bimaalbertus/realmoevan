import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage(app);

export default storage;
