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
    <main className="main">
      <div className="play--container">
        <div className="left">
          <Player databaseData={databaseData} />
        </div>
        <div className="right">
          <Search />
        </div>
      </div>
      <div className="playlist">
        <Playlist databaseData={databaseData} />
      </div>
      <AddWholePlaylist />
    </main>

  );
}

export default App;
