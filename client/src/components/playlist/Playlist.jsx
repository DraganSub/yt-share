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