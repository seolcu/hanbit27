import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSQUw2J_Nz2Td8u4zbEgsYwy3car8mkVA",
  authDomain: "hanbit27-9f927.firebaseapp.com",
  databaseURL: "https://hanbit27-9f927-default-rtdb.firebaseio.com",
  projectId: "hanbit27-9f927",
  storageBucket: "hanbit27-9f927.appspot.com",
  messagingSenderId: "984091181751",
  appId: "1:984091181751:web:88182610eab43f785e4332",
  measurementId: "G-REBSRPKHJK",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

export default storage;
