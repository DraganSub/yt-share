import { useEffect, useState, useRef } from "react";
import { onValue, ref, onDisconnect, set, get, child } from "firebase/database";
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

        const disposer = onValue(ref(database, `${getRoomPath()}`), async (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            // if ((data && !data.mainMessagingSenderId && localStorage.getItem("room_key")) || (data && data.mainMessagingSenderId === "" && localStorage.getItem("room_key"))) {
            //     await updateData(`${getRoomPath()}`, { mainMessagingSenderId: databaseMessengerId })
            //     disconnectListener();
            //     setDatabaseData({ ...data, mainMessagingSenderId: databaseMessengerId })
            // } else {
            setDatabaseData(data);
            // }
        })

        // onDisconnect(() => {
        //     if (databaseData.mainMessagingSenderId === databaseMessengerId && databaseData) {
        //         ref(database, `${getRoomPath()}/mainMessagingSenderId`).set("");
        //     }
        // })


        // return () => {
        //     // disposer();
        //     //ref(database, `${getRoomPath()}`).onDisconnect().update({ mainMessagingSenderId: "" });
        //     //ref(database, `${getRoomPath()}`).onDisconnect().update({ mainMessagingSenderId: "" });
        //     //updateData(`${getRoomPath()}`, { mainMessagingSenderId: "" })
        //     disposer();
        //     disposers();
        //     console.log("remove field ")
        // }
        return () => {
            disposer();
            localStorage.removeItem("room_key");
        }

    }, [])



    // async function handleBeforeUnload() {
    //     console.log("handle before unload")
    //     console.log(databaseData);
    // }

    // async function disposers() {
    //     // await get(ref(database, `${getRoomPath()}`)).then((snapshot) => {
    //     //     const values = snapshot.val();
    //     //     if (values.mainMessagingSenderId === databaseMessengerId) {
    //     //         
    //     //     }
    //     // })
    //     if (databaseData.mainMessagingSenderId === databaseMessengerId) {
    //         await updateData(`${getRoomPath()}`, { mainMessagingSenderId: "" });
    //     }
    //     localStorage.removeItem("room_key");
    // }

    const navigateToLanding = async () => {
        //await updateData(`${getRoomPath()}`, { mainMessagingSenderId: "" })
        //localStorage.removeItem("room_key");
        // disposer();
        // if (databaseData?.mainMessagingSenderId === databaseMessengerId) {
        //     await updateData(`${getRoomPath()}`, { mainMessagingSenderId: "" });
        // }
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
