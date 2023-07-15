import { Player, Playlist, SavedPlaylists, SearchSection } from "./components";
import { useEffect, useState } from "react";
import { database, databaseMessengerId, updateData } from "./db";
import { onValue, ref } from "firebase/database";
import "./styles/style.css";

function App() {
  const [databaseData, setDatabaseData] = useState(null);

  useEffect(() => {
    const preventPauseBackgroundTabs = (event) => {
      event.stopImmediatePropagation();
    };

    window.addEventListener('pausebackgroundtabs', preventPauseBackgroundTabs, true);

    onValue(ref(database, "youtubeData/"), (snapshot) => {
      const data = snapshot.val();
      if (data.mainMessagingSenderId === "") {
        updateData("youtubeData/", { mainMessagingSenderId: databaseMessengerId })
        setDatabaseData({ ...data, mainMessagingSenderId: databaseMessengerId })
      } else {
        setDatabaseData(data);
      }
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
      <div className="saved-playlists--section">
        <SavedPlaylists databaseData={databaseData} />
      </div>
    </main>
  );
}

export default App;
