import React from "react";
import { ref, push } from "firebase/database";
import { database } from "../../utils/firebase";

export default function PlaylistItemCard({ playlist }) {

    const addToListOfPlaylists = async () => {
        const playlistObject = {
            isPlaylistActive: false,
            playListTitle: playlist.playlistTitle,
            playlistId: playlist.playlistId,
            playlistImg: playlist.thumbnailUrl
        }
        await push(ref(database, "youtubeData/playListList"), playlistObject)
    }

    return <div>
        <div>
            {playlist.playlistId}
        </div>
        <div>{playlist.playlistTitle}</div>
        <div>{playlist.thumbnailUrl}</div>
        <button onClick={() => addToListOfPlaylists()}>Add to playlist list</button>
    </div>
}