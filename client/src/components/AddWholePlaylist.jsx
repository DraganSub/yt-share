import React, { useState } from "react";
import { push, ref, remove, update } from "firebase/database";
import { database } from "../firebase";
import { playlistVideoToUsedVideoObject } from "../utils";
const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function AddWholePlaylist() {
    const [playlistId, setPlaylistId] = useState("");
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
                setFetchedVideos(data.items.map(video => {
                    if (video.snippet.title !== "Deleted video") {
                        return playlistVideoToUsedVideoObject(video)
                    }
                }));
            }
            setResultNumber(data.items.length);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }

    const addToCurrentPlaylist = async () => {
        let firstVideoId = null;
        if (fetchedVideos.length > 0) {
            await remove(ref(database, `youtubeData/playList`))
            firstVideoId = fetchedVideos[0].videoId;
            fetchedVideos.map(video => {

                addToPlaylist(video)

            });
            if (firstVideoId) {
                replaceCurrentVideo(firstVideoId);
            }
        }
    }

    const replaceCurrentVideo = async (videoId) => {
        await update(ref(database, "youtubeData/"), { specificVideo: videoId, currentTime: 0, isPlaying: true })
    }

    const addToPlaylist = async (video) => {
        await push(ref(database, "youtubeData/playList"), video)
    }

    const removeAll = async () => {
        await remove(ref(database, `youtubeData/playList`))
    }

    return <div className="add-pl-form">
        <h3 className="add-pl-title">Add playlist</h3>
        <input name="playlistId" className="playlistId" placeholder="Please add your list id here" onChange={(e) => setPlaylistId(e.target.value)} value={playlistId} />
        <button className="submit-pl--btn" onClick={() => fetchData(playlistId)}>Submit</button>
        {resultNumber && <><div>Results: {resultNumber}</div> <button onClick={() => addToCurrentPlaylist()} className="submit-pl--btn replace-btn" >Replace current playlist</button></>}
        <button className="remove-pl--btn" onClick={removeAll}>Remove all items from playlist</button>
    </div>
}