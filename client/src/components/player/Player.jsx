import React, { useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'
import { database, databaseMessengerId } from "../../utils/firebase";
import { update, ref } from "firebase/database";
import { VolumeSlider } from ".";
import VolumeControls from "./VideoControls";


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
                <VolumeControls
                    onPause={onPause}
                    onPlay={onPlay}
                    databaseData={databaseData}
                    setIsMuted={setIsMuted}
                    isMuted={isMuted}
                />
                <VolumeSlider volume={volume} setVolume={setVolume} setIsMuted={setIsMuted} />
            </div>
        </div>
    );
};

