import { useEffect, useState } from "react";
import { onValue, ref, onDisconnect } from "firebase/database";
import { database, databaseMessengerId } from "../db";
import { useNavigate } from "react-router-dom";
import { getRoomPath } from "../utils";
import { MobileTopMenu, Player, Playlist, SavedPlaylists, SearchSection } from "../components";
import "../styles/style.css";
import { useSearch } from "../context/SearchContex";
import TopMenu from "../components/common/TopMenu";
import { usePlaylist } from "../context/PlaylistContext";
import { updateData } from "../db";

let disposer;
export default function HomePage() {
    const [databaseData, setDatabaseData] = useState(null);
    const navigate = useNavigate();

    const { isPlaylistActive } = usePlaylist();
    const { isSearchActive, setIsSearchActive } = useSearch();
    useEffect(() => {
        const preventPauseBackgroundTabs = (event) => {
            event.stopImmediatePropagation();
        };

        window.addEventListener('pausebackgroundtabs', preventPauseBackgroundTabs, true);

        disposer = onValue(ref(database, `${getRoomPath()}`), async (snapshot) => {
            const data = snapshot.val();
            if (!localStorage.getItem("room_key")) {
                return;
            }
            console.log(data);
            if ((data && !data.mainMessagingSenderId && localStorage.getItem("room_key")) || (data && data.mainMessagingSenderId === "" && localStorage.getItem("room_key"))) {
                await updateData(`${getRoomPath()}`, { mainMessagingSenderId: databaseMessengerId })
                setDatabaseData({ ...data, mainMessagingSenderId: databaseMessengerId })
            } else {
                setDatabaseData(data);
            }
        })

        return () => {
            disposer();
            setDatabaseData(null);
            localStorage.removeItem("room_key");
        }

    }, [])

    useEffect(() => {
        if (databaseData && databaseData?.mainMessagingSenderId === databaseMessengerId) {
            onDisconnect(ref(database, `${getRoomPath()}`)).update({ mainMessagingSenderId: "" })
        }
    }, [databaseData?.mainMessagingSenderId])



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
        disposer();
        if (databaseData?.mainMessagingSenderId === databaseMessengerId) {
            await updateData(`${getRoomPath()}`, { mainMessagingSenderId: "" });
        }
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
