import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYD0TLwa0-ziED8dRwy4m_oJ78ftffLYI",
  authDomain: "gomeet-70687.firebaseapp.com",
  databaseURL: "https://gomeet-70687.firebaseio.com",
  projectId: "gomeet-70687",
  storageBucket: "gomeet-70687.appspot.com",
  messagingSenderId: "864542412697",
  appId: "1:864542412697:web:3bc8b66769e817061e8d08",
  measurementId: "G-S7VKWTNEY7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const db = firebaseApp.firestore();
const database = firebaseApp.database;
const options = firebaseApp.options;
const provider = firebase.auth.PhoneAuthProvider;
firebase.auth.Auth.Persistence.LOCAL;

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase.firestore().enablePersistence();

export { auth, storage, options, provider, firebase, db, database };
