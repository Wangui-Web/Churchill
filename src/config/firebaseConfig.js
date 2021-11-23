import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC0e75sMGpxxKmJGrnfwmOtR4IjF9HsV10",
  authDomain: "churchill-ticket-booking.firebaseapp.com",
  projectId: "churchill-ticket-booking",
  storageBucket: "churchill-ticket-booking.appspot.com",
  messagingSenderId: "84959113485",
  appId: "1:84959113485:web:b25185e992763cb4ab0044"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const database = getFirestore(firebaseApp)
export { auth, database };