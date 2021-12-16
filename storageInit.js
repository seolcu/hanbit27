import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUfi7nR-NNy07bL9jr9gbxfZaFv58_7I8",
  authDomain: "hanbit27-b2a04.firebaseapp.com",
  projectId: "hanbit27-b2a04",
  storageBucket: "hanbit27-b2a04.appspot.com",
  messagingSenderId: "214043574262",
  appId: "1:214043574262:web:c266001a679ca1068811d7",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

export default storage;
