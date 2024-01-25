// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWGYUPzeLQRrHeqIVfdDoRqDPRUPA0OHQ",
  authDomain: "apptodo-3b93d.firebaseapp.com",
  projectId: "apptodo-3b93d",
  storageBucket: "apptodo-3b93d.appspot.com",
  messagingSenderId: "32717737026",
  appId: "1:32717737026:web:6c8228fc5886207fd6b1db",
  measurementId: "G-JDMW7BZ1WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)

 export const auth = getAuth(app)