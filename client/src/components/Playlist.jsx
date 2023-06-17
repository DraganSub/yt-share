import React from "react";
import { useEffect, useState } from "react";
import { VideoCard } from ".";

export default function Playlist({ socket }) {
    const [listofPlay, setListOfPlay] = useState([]);

    useEffect(() => {
        socket.on("playlistChange", (data) => {
            setListOfPlay(data.list);
        })
        return () => {
            socket.off("plalistChange");
        }
    }, [])

    const playVideo = (video) => {
        socket.emit("playVideo", { video: video });
    }

    return <div>
        Playlist:
        <div>
            {listofPlay.map(video => <VideoCard video={video} method={playVideo} />)}
        </div>
    </div>
}