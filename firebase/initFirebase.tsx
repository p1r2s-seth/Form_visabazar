import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
        apiKey: "AIzaSyBboeFel-ypS-syTw_9tMbIR2mhT_b8BxM",
        authDomain: "visabazar-database.firebaseapp.com",
        projectId: "visabazar-database",
        storageBucket: "visabazar-database.appspot.com",
        messagingSenderId: "645542239696",
        appId: "1:645542239696:web:d17c6c02d8b092019d6dd5",
        measurementId: "G-S418DM151W"
      };
    return initializeApp(firebaseConfig);
  }
}
const app = initializeAppIfNecessary();
const db = getFirestore(app);

export { db };
