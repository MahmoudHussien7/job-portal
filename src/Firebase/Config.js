// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz0fymahLpIP0jXvxzz8Ls-diqwwxnNFQ",
  authDomain: "chatapp-1f85e.firebaseapp.com",
  projectId: "chatapp-1f85e",
  storageBucket: "chatapp-1f85e.firebasestorage.app",
  messagingSenderId: "774658452259",
  appId: "1:774658452259:web:886edcd43a48dfb422fa96",
  measurementId: "G-8Y3XWJYVY5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
