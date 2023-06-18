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
    // set(ref(database, "youtubeData/"), {
    //   currentTime: 0,
    //   playList: ["aaa"],
    //   specificVideo: "iddd"
    // })

    const someRef = ref(database, "youtubeData/");
    onValue(someRef, (snapshot) => {
      const data = snapshot.val();
      console.log("fetchedData", data);
      setDatabaseData(data);
    })
  }, [])

  // useEffect(() => {
  //   socket.onmessage = (event) => {
  //     console.log(event)
  //     const data = JSON.parse(event.data);
  //     if (data.message === "play") {
  //       setVideoStatus(true);
  //       console.log("play locally video")
  //     }
  //     else if (data.message === "stop") {
  //       console.log("stop locally video")
  //       setVideoStatus(false);
  //     } else if (data.message === "currentTime") {
  //       console.log("currentTimeOfVide", data.currentTime);
  //       // player.current.seekTo(data.currentTime);
  //       setSeekTime(data.currentTime)

  //     } else if (data.message === "playSpecificVideoInPlayer") {
  //       console.log("receivied play new video message", data.video)
  //       setVideoId(data.video);
  //     } else if (data.message === "newPlaylistEntry" || data.message === "currentPlaylist") {
  //       setListOfPlay(data.playList);
  //     } else if (data.message === "currentVideo") {
  //       setVideoId(data.videoId)
  //     }
  //   }
  // }, [])
  // const socket = new WebSocket("wss://yt-share-server.vercel.app:443");

  return (
    <div className="container">
      <Player databaseData={databaseData} />
      <Playlist databaseData={databaseData} />
      <Search />
    </div>
  );
}

export default App;
