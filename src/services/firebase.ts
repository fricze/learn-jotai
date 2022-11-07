import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHM_5ZV93_8qQhZMsR3R_E1HxwbzMQdT4",
    authDomain: "learn-jotai.firebaseapp.com",
    projectId: "learn-jotai",
    storageBucket: "learn-jotai.appspot.com",
    messagingSenderId: "225081137614",
    appId: "1:225081137614:web:bcee16a9f9dc04464bf39f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
