// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC2zRVoxQbFcJlrV56i-mj4Ink7vu7NQk",
  authDomain: "poem-app-68675.firebaseapp.com",
  projectId: "poem-app-68675",
  storageBucket: "poem-app-68675.appspot.com",
  messagingSenderId: "307756933992",
  appId: "1:307756933992:web:195c73e1cce204c2a9ecdd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


