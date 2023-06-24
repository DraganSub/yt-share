import { initializeApp } from "firebase/app";
import { getDatabase, ref, onDisconnect } from "firebase/database";

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const firebaseConfig = {
    databaseURL: "https://share-c7deb-default-rtdb.europe-west1.firebasedatabase.app/",
    messagingSenderId: uuidv4()
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const databaseMessengerId = database.app._options.messagingSenderId;

onDisconnect(ref(database, "youtubeData/mainMessagingSenderId")).set("");