import { Player, Search, Playlist } from "./components";
import { useMemo } from "react";
import io from "socket.io-client";
import "./App.css";
function App() {

  //const socket = io('https://yt-share-server.vercel.app');
  //const socket = new WebSocket("ws://localhost:443");
  const socket = new WebSocket("wss://main.drt1zwpnxk3xb.amplifyapp.com:8080");
  return (
    <div className="container">
      <Player socket={socket} />
      {/* <Playlist socket={socket} /> 
      <Search socket={socket} /> */}
    </div>
  );
}

export default App;
