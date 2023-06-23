import { Player, Search, Playlist, AddWholePlaylist, SearchSection } from "./components";
import { useEffect, useState } from "react";
import { database, databaseMessengerId } from "../src/firebase";
import { onValue, ref, update, onDisconnect } from "firebase/database";
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
      if (data.mainMessagingSenderId == "") {
        console.log("updated main messenger")
        update(ref(database, "youtubeData/"), { mainMessagingSenderId: databaseMessengerId })
        setDatabaseData({ ...data, mainMessagingSenderId: databaseMessengerId })
      } else {
        console.log(database);
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
    </main>

  );
}

export default App;
