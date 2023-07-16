import { useEffect, useState } from "react";
import { onValue, ref, onDisconnect } from "firebase/database";
import { database, databaseMessengerId, updateData } from "../db";
import { useNavigate } from "react-router-dom";
import { getRoomPath } from "../utils";
import { Player, Playlist, SavedPlaylists, SearchSection } from "../components";
import "../styles/style.css";

export default function HomePage() {
    const [databaseData, setDatabaseData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const preventPauseBackgroundTabs = (event) => {
            event.stopImmediatePropagation();
        };

        window.addEventListener('pausebackgroundtabs', preventPauseBackgroundTabs, true);

        onValue(ref(database, `${getRoomPath()}`), (snapshot) => {
            const data = snapshot.val();
            // if (data.mainMessagingSenderId === "") {
            //     updateData("youtubeData/", { mainMessagingSenderId: databaseMessengerId })
            //     setDatabaseData({ ...data, mainMessagingSenderId: databaseMessengerId })
            // } else {
            setDatabaseData(data);
            //}
        })

        // onValue(ref(database, "/"), snapshot => {
        //     //get all avaialble rooms
        //     console.log(snapshot.val())
        // })
    }, [])

    const navigateToLanding = async () => {
        localStorage.removeItem("room_key");
        //await updateData("youtubeData/", { mainMessagingSenderId: "" })
        navigate("/");
    }

    return (
        <main className="pos-rel main">
            <button onClick={navigateToLanding}>Back</button>
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
