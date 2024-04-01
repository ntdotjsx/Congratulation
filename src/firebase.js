import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    //
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Create a Firestore instance

export { app, db }; // Export both app and db