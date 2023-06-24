import React from "react";
import { remove, ref, update, push } from "firebase/database";
import { database } from "../../utils/firebase";
import { playlistVideoToUsedVideoObject } from "../../utils/utils";


const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function SavedPlaylists({ databaseData }) {

    if (databaseData == null || databaseData.playListList == null) {
        return <div>No playlists saved</div>
    }

    return Object.values(databaseData.playListList).map(playlist =>
        <PlaylistItem key={playlist.playlistId} playlistItem={playlist} allPlaylists={databaseData.playListList} />
    )
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

    return <div>
        <div>{playlistItem.playListTitle}</div>
        <div>{JSON.stringify(playlistItem.isPlaylistActive)}</div>
        <div>{playlistItem.nrOfSongs}</div>
        <button onClick={() => replaceCurrentPlaylist()}>Play</button>
        <button onClick={() => removePlaylistFromList()}>Remove</button>
    </div>
}