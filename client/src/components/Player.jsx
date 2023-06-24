import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'
import { database, databaseMessengerId } from "../firebase";
import { update, ref } from "firebase/database";


export default function Player({ databaseData }) {
    const player = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    if (databaseData == null) {
        return <div>No video queried yet</div>;
    }

    const handleSeek = async (seconds) => {
        if (!isTransitioning && databaseMessengerId === databaseData?.mainMessagingSenderId) {
            await update(ref(database, "youtubeData/"), { currentTime: seconds.playedSeconds })
        }
    }

    const handleEnd = async (event) => {
        console.log("end event", event)
        if (!databaseData.playList || databaseData.playList.length === 0) {
            return;
        }
        let currentVideoIndex;
        Object.entries(databaseData.playList).forEach((entry, i) => {
            if (entry[1].videoId === databaseData.specificVideo) {
                currentVideoIndex = i;
            }
        })
        setIsTransitioning(true);
        //block handle seek for updating current time with wrong values
        if (Object.entries(databaseData.playList).length > currentVideoIndex + 1) {
            await update(ref(database, "youtubeData/"), { isPlaying: false, specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].videoId })
            await update(ref(database, "youtubeData/"), { currentTime: 0 });
            await update(ref(database, "youtubeData/"), { isPlaying: true })
        } else {
            await update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].videoId, currentTime: 0, isPlaying: true })
        }
        setIsTransitioning(false);
    }

    const handleStart = () => {
        player.current.seekTo(databaseData.currentTime);
    }

    const onPause = async (event) => {
        console.log("stop event", event)
        console.log("stopping")
        await update(ref(database, "youtubeData/"), { isPlaying: false })
    }

    const onPlay = async (event) => {
        console.log("play event", event)
        console.log("playing")
        await update(ref(database, "youtubeData/"), { isPlaying: true })

    }

    return (
        <div className="player pos-rel">
            <ReactPlayer
                style={{ pointerEvents: "none", WebkitUserSelect: "none", msUserSelect: "none", userSelect: "none" }}
                playing={databaseData.isPlaying}
                controls={false}
                url={`https://www.youtube.com/watch?v=${databaseData.specificVideo}`}
                // onPause={onPause}
                // onPlay={onPlay}
                onProgress={handleSeek}
                onEnded={handleEnd}
                onError={handleEnd}
                onReady={handleStart}
                muted={isMuted}
                width={1100}
                height={665}
                volume={volume}
                config={{
                    youtube: {
                        playerVars: {
                            playsinline: 1,
                            origin: window.location.origin
                        }
                    }
                }}
                ref={player}
            />
            <div className="video-controls-container">
                <button className="play-btn" onClick={databaseData.isPlaying ? onPause : onPlay}>
                    {databaseData.isPlaying ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                            style={{ backgroundColor: "transparent" }} stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: "transparent" }} fill="white" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLineJoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    }
                </button>
                <button className="mute-btn" onClick={() => setIsMuted(!isMuted)}>{!isMuted ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.4"
                        style={{ backgroundColor: "transparent" }} stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.4"
                        style={{ backgroundColor: "transparent" }} stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                }</button>
                <VolumeSlider volume={volume} setVolume={setVolume} setIsMuted={setIsMuted} />
            </div>
        </div>
    );
};

function VolumeSlider({ volume, setVolume, setIsMuted }) {
    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setIsMuted(false);
        setVolume(newVolume);
        const element = document.getElementById("test");
        console.log(volume * 100)
        element.style.setProperty("--before-width", `${volume * 100}% `);
    };


    return (
        <div class="slider">
            <input
                type="range"
                id="test"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
            />
        </div>

    );
};



