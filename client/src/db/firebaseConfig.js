import { initializeApp } from "firebase/app";
import { getDatabase, ref, onDisconnect, update, serverTimestamp } from "firebase/database";
import { createUuidv4, getRoomPath } from "../utils";

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_FIREBASE_CONNECTION,
    //messagingSenderId: createUuidv4()
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const databaseMessengerId = createUuidv4();

export const createTimestamp = () => {
    return serverTimestamp();
}

// export function disconnectListener() {
//     console.log("disconnect listener")
//     onDisconnect(ref(database, `${getRoomPath()}/mainMessagingSenderId`)).set("");
// }
// onDisconnect(ref(database, `${getRoomPath()}/mainMessagingSenderId`)).update("").then(() => {
//     console.log("remove field on disconnect")
// })
//handler for exiting window
