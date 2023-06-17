
import Youtube from "react-youtube";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'


export default function Player({ socket, videoStatus, videoId, seekTime }) {
    const player = useRef(null);

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

    const handleEnd = () => {
        socket.send(JSON.stringify({ message: "onCurrentVideoEnd", videoId: videoId }));
    }

    const handleError = (error) => {
        console.error(error)
        socket.send(JSON.stringify({ message: "onYoutubeError", videoId: videoId }));
    }

    if (videoId == null) {
        return <div>No video queried yet</div>
    }

    return (
        <div className="App">
            <h1>YouTube Sync</h1>
            <ReactPlayer
                playing={videoStatus}
                controls={true}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                onPause={onPause}
                onPlay={onPlay}
                onProgress={handleSeek}
                seconds
                onEnded={handleEnd}
                onError={handleError}
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
