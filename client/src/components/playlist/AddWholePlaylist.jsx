import React, { useState } from "react";
import { pushData, removeData } from "../../db";
import { playlistVideoToUsedVideoObject } from "../../utils";

const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function AddWholePlaylist({ setIsOpen }) {
    const [playlistId, setPlaylistId] = useState("");
    const [playlistName, setPlaylistTitle] = useState("");
    const [resultNumber, setResultNumber] = useState(null);
    const [fetchedVideos, setFetchedVideos] = useState(null);

    const fetchData = async (playlistId) => {
        if (!playlistId) {
            return;
        }
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${playlistId}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.items.length > 0) {
                const videosThatWork = data.items.filter(video => video.snippet.title !== "Deleted video" && video.snippet.title !== "Private video");
                setFetchedVideos(videosThatWork.map(video => playlistVideoToUsedVideoObject(video)));
            }
            setResultNumber(data.items.length);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }

    const addToListOfPlaylists = async () => {
        const playlistObject = {
            isPlaylistActive: false,
            playListTitle: playlistName,
            playlistId: playlistId,
            playlistImg: fetchedVideos[0].thumbnailUrl
        }
        await pushData(`rooms/${localStorage.getItem("room_key")}/playListList`, playlistObject)
        setIsOpen(false);
    }

    const removeAll = async () => {
        await removeData(`rooms/${localStorage.getItem("room_key")}/playList`);
    }

    return <div className="add-pl-form">
        <h3 className="add-pl-title">Add playlist</h3>
        <input name="playlistId" className="playlistId" placeholder="Please add your list id here" onChange={(e) => setPlaylistId(e.target.value)} value={playlistId} />
        <input name="playlistName" className="playlistId" placeholder="Playlist title" onChange={(e) => setPlaylistTitle(e.target.value)} value={playlistName} />
        <button className="submit-pl--btn" onClick={() => fetchData(playlistId)}>Submit</button>
        {resultNumber && <><div>Results: {resultNumber}</div> <button onClick={() => addToListOfPlaylists()} className="submit-pl--btn replace-btn" >Add to playlist list</button></>}
        <button className="remove-pl--btn" onClick={removeAll}>Remove all items from playlist</button>
    </div>
}