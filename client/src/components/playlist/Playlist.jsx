import { useState, useEffect } from "react";
import { updateData } from "../../db";
import { PlaylistList } from ".";
import { BroadcastPlaylistIcon } from "../icons/BroadcastingPlaylistIcon";
import { getRoomPath } from "../../utils";

export default function Playlist({ databaseData }) {
    return <>
        <div className="flex flex-cl playlist--container">
            <div className="playlist--list">
                <div className="playlist--container">
                    <div className="pos-rel playlist--title-container playlist--top">
                        <div className="playlist--title">
                            <BroadcastPlaylistIcon />
                            <p className="current-title">Your current playlist:
                            <br />
                            </p>
                        </div>
                        {databaseData &&
                            <div className="playlist--togler" >
                                <PlaylistToggler databaseData={databaseData} />
                            </div>
                        }
                        {/*  <div className="add--accordion-section">
                            <AddPlaylistAccordion />
                        </div> */}
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
        await updateData(`${getRoomPath()}`, { autoPlaylist: !currentToggleState });
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