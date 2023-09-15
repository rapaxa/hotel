import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from "@firebase/storage";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDFTWPd7CAFUBhUzQbn9K8KgH1bb2XnM-M",
    authDomain: "my-social-5cd7b.firebaseapp.com",
    projectId: "my-social-5cd7b",
    storageBucket: "my-social-5cd7b.appspot.com",
    messagingSenderId: "721399813963",
    appId: "1:721399813963:web:2ee89ade6e3cb258d63ace",
    databaseURL: " https://my-social-5cd7b-default-rtdb.firebaseio.com",

};

export const app = initializeApp(firebaseConfig);
export  const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app);
export const database = getDatabase(app); //real time db
