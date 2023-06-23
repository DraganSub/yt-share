import { Player, Search, Playlist, AddWholePlaylist, SearchSection } from "./components";
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
        <SearchSection />
      </div>
    </main>

  );
}

export default App;
