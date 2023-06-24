import React from "react";
import { remove, ref, update, push } from "firebase/database";
import { database } from "../../utils/firebase";
import { playlistVideoToUsedVideoObject } from "../../utils/utils";
import { MusicWave } from "../common";


const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function SavedPlaylists({ databaseData }) {

    if (databaseData == null || databaseData.playListList == null) {
        return <div>No playlists saved</div>
    }

    return <div className="saved-playlists--container playlists--overflow">
        {Object.values(databaseData.playListList).map(playlist =>
            <PlaylistItem key={playlist.playlistId} playlistItem={playlist} allPlaylists={databaseData.playListList} />
        )}
    </div>
}

function PlaylistItem({ playlistItem, allPlaylists }) {
    const fetchData = async (playlistId) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${playlistId}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.items.length > 0) {
                const videosThatWork = data.items.filter(video => video.snippet.title !== "Deleted video" && video.snippet.title !== "Private video");
                return videosThatWork.map(video => playlistVideoToUsedVideoObject(video));
            }
        } catch (error) {
            console.error('Error fetching playlist data:', error);
            return [];
        }
    }

    const replaceCurrentPlaylist = async (playlistId = null) => {
        let firstVideoId = null;
        const playlistData = await fetchData(playlistId || playlistItem.playlistId);
        if (playlistData.length > 0) {
            let entryId = null;

            Object.entries(allPlaylists).forEach((entry, i) => {
                if (entry[1].playlistId === playlistId || entry[1].playlistId === playlistItem.playlistId) {
                    entryId = entry[0];
                } else if (entry[1].isPlaylistActive) {
                    update(ref(database, `youtubeData/playListList/${entry[0]}`), { isPlaylistActive: false });
                }
            })
            await remove(ref(database, `youtubeData/playList`))
            await update(ref(database, `youtubeData/playListList/${entryId}`), { isPlaylistActive: true });
            firstVideoId = playlistData[0].videoId;
            playlistData.forEach(video => {
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

    const removePlaylistFromList = async () => {
        let entryId = null;
        let currentPlaylistIndex;
        Object.entries(allPlaylists).forEach((entry, i) => {
            if (entry[1].playlistId === playlistItem.playlistId) {
                entryId = entry[0];
                currentPlaylistIndex = i
            }
        })
        if (!playlistItem.isPlaylistActive && entryId) {
            await remove(ref(database, `youtubeData/playListList/${entryId}`));
        } else if (playlistItem.isPlaylistActive && entryId) {
            if (Object.values(allPlaylists).length > currentPlaylistIndex + 1) {
                await replaceCurrentPlaylist(Object.values(allPlaylists)[currentPlaylistIndex + 1].playlistId);
            } else {
                await replaceCurrentPlaylist(Object.values(allPlaylists)[0].playlistId);
            }
            await remove(ref(database, `youtubeData/playListList/${entryId}`));
        }
    }

    return <>
        <div class="card">
            <img src={playlistItem.playlistImg} alt={playlistItem.playlistImg} class="card__img" />
            <span class="card__footer">
                <span className="saved-playlists--title">{playlistItem.playListTitle}</span>
            </span>
            {playlistItem.isPlaylistActive && <div className="saved--playlist-wave">
                <MusicWave isPlaying={playlistItem.isPlaylistActive} />
            </div>}
            {!playlistItem.isPlaylistActive &&
                <span class="card__action">
                    <svg onClick={() => replaceCurrentPlaylist()} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                        style={{ width: "50px", height: "50px", background: "transparent" }} class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                </span>
            }

            <span class="card__action--delete" onClick={() => removePlaylistFromList()}>
                <div className="remove--saved-playlist">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6" style={{ background: "transparent", width: "50px", height: "50px" }}>
                        <path

                            stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </div>
            </span>
        </div>
    </>
}