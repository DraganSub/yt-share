
import Youtube from "react-youtube";
import React, { useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'
import { database } from "../firebase";
import { update, ref } from "firebase/database";


export default function Player({ databaseData }) {
    const player = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    if (databaseData == null) {
        return <div>No video queried yet</div>;
    }

    const handleSeek = (seconds) => {
        // if (isMuted) {
        //     setIsMuted(false);
        // }
        if (databaseData.currentTime < seconds.playedSeconds) {
            update(ref(database, "youtubeData/"), { currentTime: seconds.playedSeconds })
        }
    }

    // const handleEnd = () => {
    //     socket.send(JSON.stringify({ message: "onCurrentVideoEnd", videoId: videoId }));
    // }

    // const handleError = (error) => {
    //     console.error(error)
    //     socket.send(JSON.stringify({ message: "onYoutubeError", videoId: videoId }));
    // }

    const handleStart = () => {
        player.current.seekTo(databaseData.currentTime);
        // setTimeout(() => {
        //     setIsMuted(false);
        // }, 500)
    }

    // if (videoId == null) {
    //     return 
    // }

    const onPause = () => {
        update(ref(database, "youtubeData/"), { isPlaying: false })
    }

    const onPlay = () => {
        update(ref(database, "youtubeData/"), { isPlaying: true })

    }

    return (
        <div className="App">
            <h1>YouTube Sync</h1>
            <ReactPlayer
                playing={databaseData.isPlaying}
                controls={false}
                url={`https://www.youtube.com/watch?v=${databaseData.specificVideo}`}
                onPause={onPause}
                onPlay={onPlay}
                onProgress={handleSeek}
                // seconds
                // onEnded={handleEnd}
                // onError={handleError}
                onReady={handleStart}
                // config={{
                //     youtube: {
                //         playerVars: {
                //             start: seekTime

                //         }
                //     }
                // }}
                muted={isMuted}
                ref={player}
            />

            <button onClick={onPlay}>PLAY</button>
            <button onClick={onPause}>STOP</button>
            <button onClick={() => setIsMuted(!isMuted)}>Mute/Unmute</button>
        </div>
    );
};
