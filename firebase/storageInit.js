import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKut2rohO8_saVAOdkG8luqKq4NCDNcb0",
  authDomain: "hanbit27-ef641.firebaseapp.com",
  databaseURL:
    "https://hanbit27-ef641-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hanbit27-ef641",
  storageBucket: "hanbit27-ef641.appspot.com",
  messagingSenderId: "84779829568",
  appId: "1:84779829568:web:194d36024e6d1b3b8192a5",
  measurementId: "G-4B1TEXG8ME",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
