import React, { useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'
import { database } from "../firebase";
import { update, ref } from "firebase/database";


export default function Player({ databaseData }) {
    const player = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);

    if (databaseData == null) {
        return <div>No video queried yet</div>;
    }

    const handleSeek = (seconds) => {
        if (databaseData.currentTime < seconds.playedSeconds) {
            update(ref(database, "youtubeData/"), { currentTime: seconds.playedSeconds })
        }
    }

    const handleEnd = () => {
        let currentVideoIndex;
        Object.entries(databaseData.playList).map((entry, i) => {
            if (entry[1].id.videoId === databaseData.specificVideo) {
                currentVideoIndex = i;
            }
        })

        if (Object.entries(databaseData.playList).length > currentVideoIndex + 1) {
            update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].id.videoId, currentTime: 0, isPlaying: true })
        } else {
            update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].id.videoId, currentTime: 0, isPlaying: true })
        }
    }

    const handleStart = () => {
        player.current.seekTo(databaseData.currentTime);
    }

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
                onEnded={handleEnd}
                onError={handleEnd}
                onReady={handleStart}
                muted={isMuted}
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

            <button onClick={onPlay}>PLAY</button>
            <button onClick={onPause}>STOP</button>
            <button onClick={() => setIsMuted(!isMuted)}>Mute/Unmute</button>
            <VolumeSlider volume={volume} setVolume={setVolume} setIsMuted={setIsMuted} />
        </div>
    );
};

function VolumeSlider({ volume, setVolume, setIsMuted }) {
    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setIsMuted(false);
        setVolume(newVolume);
    };
    return (

        <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
        />

    );
};

