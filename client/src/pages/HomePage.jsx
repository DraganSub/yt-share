import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../db";
import { useNavigate } from "react-router-dom";
import { getRoomPath } from "../utils";
import { MobileTopMenu, Player, Playlist, SavedPlaylists, SearchSection } from "../components";
import "../styles/style.css";
import { useSearch } from "../context/SearchContex";
import TopMenu from "../components/common/TopMenu";
import { usePlaylist } from "../context/PlaylistContext";

export default function HomePage() {
    const [databaseData, setDatabaseData] = useState(null);
    const navigate = useNavigate();

    const { isSearchActive, setIsSearchActive } = useSearch();
    const { isPlaylistActive } = usePlaylist();
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
            setDatabaseData(null);
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
            <div className="play--container">
                <div className="top--menu-mobile">
                    <MobileTopMenu databaseData={databaseData} navigate={navigateToLanding} />
                </div>
                <div className="top--menu">
                    <TopMenu
                        databaseData={databaseData} navigate={navigateToLanding}
                    />
                </div>
                <div className="content--group">
                    <div className="left">
                        <Player databaseData={databaseData} />
                    </div>
                    <div className="right playlist">
                        <Playlist databaseData={databaseData} />
                    </div>
                </div>
            </div>

            {
                isPlaylistActive &&
                <div className="pos-rel search--section"><SavedPlaylists databaseData={databaseData} /></div>
            }

            {
                isSearchActive &&
                <div className="pos-rel search--section search--menu-web">
                    <SearchSection />
                </div>
            }
        </main>
    );
}
