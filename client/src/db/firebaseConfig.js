import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { createUuidv4 } from "../utils";

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_FIREBASE_CONNECTION,
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const databaseMessengerId = createUuidv4();
