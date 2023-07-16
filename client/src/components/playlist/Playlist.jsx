import { useState, useEffect } from "react";
import { updateData } from "../../db";
import { AddPlaylistAccordion, PlaylistList } from ".";

export default function Playlist({ databaseData }) {
    return <>
        <div className="flex flex-cl playlist--container">
            {/*   <div class="carousel">
                <CurrentPlayingSong data={databaseData} />
            </div> */}
            <div className="playlist--list">
                <div className="playlist--container">
                    <div className="pos-rel playlist--title-container playlist--top">
                        <p className="current-title">Your current playlist:
                            <br />
                        </p>
                        {databaseData && <PlaylistToggler databaseData={databaseData} />}
                        <div className="add--accordion-section">
                            <AddPlaylistAccordion />
                        </div>
                    </div>
                    <PlaylistList
                        databaseData={databaseData}
                    />
                </div>
            </div>
        </div>
    </>
}

function PlaylistToggler({ databaseData }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(databaseData.autoPlaylist)
    }, [databaseData.autoPlaylist])

    const handleToggle = async () => {
        const currentToggleState = isChecked;
        setIsChecked(!currentToggleState);
        //call function that changes state in db
        await updateData(`rooms/${localStorage.getItem("room_key")}`, { autoPlaylist: !currentToggleState });
    };

    return (
        <div className="toggler">
            <input
                type="checkbox"
                id="toggle"
                className="toggle-input"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label htmlFor="toggle" className="toggle-label"></label>
        </div>
    );
}