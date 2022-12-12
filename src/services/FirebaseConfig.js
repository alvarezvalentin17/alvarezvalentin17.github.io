
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAL-BNZzKm5VxWKtnX6gjrwXjxcMys3ZzY",
  authDomain: "proveedores-ferrere.firebaseapp.com",
  projectId: "proveedores-ferrere",
  storageBucket: "proveedores-ferrere.appspot.com",
  messagingSenderId: "122395445242",
  appId: "1:122395445242:web:004eddbdd7c3d630890643"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default db;