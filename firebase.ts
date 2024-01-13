import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVPPJNBKldysbcHYnX-8rcX8WvVkbMG8c",
  authDomain: "hack-project-4f210.firebaseapp.com",
  projectId: "hack-project-4f210",
  storageBucket: "hack-project-4f210.appspot.com",
  messagingSenderId: "719172825082",
  appId: "1:719172825082:web:8db4b7893310e95ea13e43",
  measurementId: "G-97XR0R62BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseConfig;