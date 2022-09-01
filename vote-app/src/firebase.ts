import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-NeLPkUORdUvmsrvEgcwrzfJcsjZkLJU",
  authDomain: "react-3e8f5.firebaseapp.com",
  databaseURL: "https://react-3e8f5-default-rtdb.firebaseio.com",
  projectId: "react-3e8f5",
  storageBucket: "react-3e8f5.appspot.com",
  messagingSenderId: "52196404019",
  appId: "1:52196404019:web:a2b3b07765d3a513656c46",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
