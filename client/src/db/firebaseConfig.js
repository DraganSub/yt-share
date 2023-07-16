import { initializeApp } from "firebase/app";
import { getDatabase, ref, onDisconnect } from "firebase/database";
import { createUuidv4 } from "../utils";

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_FIREBASE_CONNECTION,
    //messagingSenderId: createUuidv4()
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

//export const databaseMessengerId = database.app._options.messagingSenderId;

//onDisconnect(ref(database, "youtubeData/mainMessagingSenderId")).set("");