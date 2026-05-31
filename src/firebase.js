import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_DOMAINE",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_BUCKET",
  messagingSenderId: "TON_SENDER",
  appId: "TON_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);