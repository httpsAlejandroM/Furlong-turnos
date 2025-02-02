// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// todo: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0co7SzDr0xXOZtgicqmU5DiYCcuV0V-o",
  authDomain: "furlong-turnos.firebaseapp.com",
  projectId: "furlong-turnos",
  storageBucket: "furlong-turnos.firebasestorage.app",
  messagingSenderId: "979179618195",
  appId: "1:979179618195:web:f6f2bab6fc1418bf13f266",
  measurementId: "G-5DEMGQLER3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
    app,
    analytics,
    db
}