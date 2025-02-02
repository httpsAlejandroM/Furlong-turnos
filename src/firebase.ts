// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// todo: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//TODO: agregar keys a variables de entorno
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,//"AIzaSyC0co7SzDr0xXOZtgicqmU5DiYCcuV0V-o",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,//"furlong-turnos.firebaseapp.com",
  projectId: "furlong-turnos",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET ,//"furlong-turnos.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_SENDER_ID ,//"979179618195",
  appId: import.meta.env.VITE_APP_ID ,//"1:979179618195:web:f6f2bab6fc1418bf13f266",
  measurementId: import.meta.env.VITE_MEASUREMENT_ID ,//"G-5DEMGQLER3"
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