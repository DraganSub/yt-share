import { Player, Search, Playlist } from "./components";
import { useMemo, useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
function App() {
  const [videoStatus, setVideoStatus] = useState(true)
  const [seekTime, setSeekTime] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [listofPlay, setListOfPlay] = useState([]);

  //const socket = io('https://yt-share-server.vercel.app');
  const socket = useMemo(() => new WebSocket("ws://192.168.0.35:443"), []);

  useEffect(() => {
    socket.onmessage = (event) => {
      console.log(event)
      const data = JSON.parse(event.data);
      if (data.message === "play") {
        setVideoStatus(true);
        console.log("play locally video")
      }
      else if (data.message === "stop") {
        console.log("stop locally video")
        setVideoStatus(false);
      } else if (data.message === "currentTime") {
        console.log("currentTimeOfVide", data.currentTime);
        // player.current.seekTo(data.currentTime);
        setSeekTime(data.currentTime)

      } else if (data.message === "playSpecificVideoInPlayer") {
        console.log("receivied play new video message", data.video)
        setVideoId(data.video);
      } else if (data.message === "newPlaylistEntry" || data.message === "currentPlaylist") {
        setListOfPlay(data.playList);
      } else if (data.message === "currentVideo") {
        setVideoId(data.videoId)
      }
    }
  }, [])
  // const socket = new WebSocket("wss://yt-share-server.vercel.app:443");
  return (
    <div className="container">
      <Player socket={socket} videoStatus={videoStatus} videoId={videoId} seekTime={seekTime} />
      <Playlist socket={socket} listofPlay={listofPlay} videoId={videoId} />
      <Search socket={socket} />
    </div>
  );
}

export default App;
