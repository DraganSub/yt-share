
import Youtube from "react-youtube";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'


export default function Player({ socket }) {
    const [playerState, setPlayerState] = useState(-1);
    const [playerTime, setPlayerTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playable, setPlayable] = useState(false);
    const [videoStatus, setVideoStatus] = useState(true)
    const [seekTime, setSeekTime] = useState(0);
    const [muted, setIsMuted] = useState(true);

    const player = useRef(null);


    useEffect(() => {
        socket.onmessage = (event) => {
            console.log(event)
            const data = JSON.parse(event.data);
            setPlayable(false);
            if (data.message === "play") {
                setVideoStatus(true);
                console.log("play locally video")
            }
            else if (data.message === "stop") {
                console.log("stop locally video")
                setVideoStatus(false);
            } else if (data.message === "currentTime") {
                console.log("currentTimeOfVide", data.currentTime);
                setSeekTime(data.currentTime)
                player.current.seekTo(data.currentTime);
            }
        }
    }, []);

    const onPlay = () => {

        console.log("msg to play")
        socket.send(JSON.stringify({ message: "playVideo" }))

    }

    const onPause = () => {


        console.log("msg to stop")
        socket.send(JSON.stringify({ message: "stopVideo" }))

    }

    const handleSeek = (seconds) => {
        console.log(seconds);
        socket.send(JSON.stringify({ message: "seekSeconds", currentTime: seconds.playedSeconds }))
    }

    // if (seekTime == 0) {
    //     return null;
    // }

    return (
        <div className="App">
            <h1>YouTube Sync</h1>
            <ReactPlayer
                playing={videoStatus}
                controls={true}
                url={"https://www.youtube.com/watch?v=jEzUuwqf_ZU"}
                onPause={onPause}
                onPlay={onPlay}
                onProgress={handleSeek}
                seconds
                config={{
                    youtube: {
                        playerVars: {
                            start: seekTime

                        }
                    }
                }}
                muted={true}
                ref={player}
            />

            <button onClick={onPlay}>PLAY</button>
            <button onClick={onPause}>STOP</button>
            <p>Current Time: {seekTime}</p>
        </div>
    );
};
