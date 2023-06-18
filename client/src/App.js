import { Player, Search, Playlist } from "./components";
import { useMemo, useEffect, useState } from "react";
import { database } from "../src/firebase";
import { onValue, ref } from "firebase/database";

import io from "socket.io-client";
import "./App.css";



function App() {
  const [videoStatus, setVideoStatus] = useState(true)
  const [seekTime, setSeekTime] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [listofPlay, setListOfPlay] = useState([]);
  const [databaseData, setDatabaseData] = useState(null);

  //const socket = io('https://yt-share-server.vercel.app');
  // wss://main.drt1zwpnxk3xb.amplifyapp.com/
  /*   const socket = useMemo(() => new WebSocket("ws://192.168.1.195:443"), []); */
  //const socket = new WebSocket("https://share-c7deb-default-rtdb.europe-west1.firebasedatabase.app/:8080");
  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  // console.log(database)

  useEffect(() => {
    const preventPauseBackgroundTabs = (event) => {
      event.stopImmediatePropagation(); // Prevent event propagation
    };

    // Add a fake event listener to block the event
    window.addEventListener('pausebackgroundtabs', preventPauseBackgroundTabs, true);

    const someRef = ref(database, "youtubeData/");
    onValue(someRef, (snapshot) => {
      const data = snapshot.val();
      console.log("fetchedData", data);
      setDatabaseData(data);
    })
  }, [])

  return (
    <div className="container">
      <Player databaseData={databaseData} />
      <Playlist databaseData={databaseData} />
      <Search />
    </div>
  );
}

export default App;
