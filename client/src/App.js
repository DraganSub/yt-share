import { Player, Search, Playlist, AddWholePlaylist } from "./components";
import { useEffect, useState } from "react";
import { database } from "../src/firebase";
import { onValue, ref } from "firebase/database";
import "./style.css";

function App() {
  const [databaseData, setDatabaseData] = useState(null);

  useEffect(() => {
    const preventPauseBackgroundTabs = (event) => {
      event.stopImmediatePropagation();
    };

    window.addEventListener('pausebackgroundtabs', preventPauseBackgroundTabs, true);

    onValue(ref(database, "youtubeData/"), (snapshot) => {
      const data = snapshot.val();
      setDatabaseData(data);
    })
  }, [])

  return (
    <main className="pos-rel main">
      <div className="play--container">
        <div className="left">
          <Player databaseData={databaseData} />
        </div>
        <div className="right playlist">
          <Playlist databaseData={databaseData} />
        </div>
      </div>
      <div className="pos-rel search--section">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6 search--section" style={{ width: "30px", height: "30px", background: "transparent", cursor: "pointer" }}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" style={{ background: "transparent" }} />
        </svg>
      </div>
    </main>

  );
}

export default App;
