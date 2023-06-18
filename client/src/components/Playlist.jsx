import React from "react";
import { useEffect, useState } from "react";
import { VideoCard } from ".";

export default function Playlist({ socket, listofPlay, videoId }) {
    // const [listofPlay, setListOfPlay] = useState([]);

    // useEffect(() => {
    //     socket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         if (data.message === "newPlaylistEntry" || data.message === "currentPlaylist") {
    //             setListOfPlay(data.playList);
    //         }

    //     }
    // }, [])

    const playVideo = (video) => {
        socket.send(JSON.stringify({ message: "playSpecificVideo", video: video }))
    }

    const removeVideoFromPlaylist = (video) => {
        socket.send(JSON.stringify({ message: "removeVideoFromPlaylist", video: video }));
    }

    return <div>
        Playlist:
        <div>
            {listofPlay.map(video => <VideoCard video={video.video} inPlaylist method={playVideo} videoId={videoId} removeMethod={removeVideoFromPlaylist} />)}
        </div>
    </div>
}