// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const admin = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
