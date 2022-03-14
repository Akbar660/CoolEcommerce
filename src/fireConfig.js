
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkbTbeD22x-PJlptHwvqhtxz7Tj3DAypU",
  authDomain: "coolecommerce-93b78.firebaseapp.com",
  projectId: "coolecommerce-93b78",
  storageBucket: "coolecommerce-93b78.appspot.com",
  messagingSenderId: "249477895253",
  appId: "1:249477895253:web:26449e65136940881070dc",
  measurementId: "G-9H4VBJY66P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB=getFirestore(app);

export default fireDB;