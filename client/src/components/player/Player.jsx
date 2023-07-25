import React, { useState } from "react";
import { useRef } from "react";
import ReactPlayer from 'react-player'
import { databaseMessengerId, updateData, removeData, pushData } from "../../db";
import { VolumeSlider } from ".";
import { playlistVideoToUsedVideoObject, getRoomPath, createTimeStamp, calculateDiffBetweenTimestampAndNow } from "../../utils";
import VolumeControls from "./VideoControls";

const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function Player({ databaseData }) {
    const player = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    if (databaseData == null) {
        return <div>No video queried yet</div>;
    }

    const handleSeek = async (seconds) => {
        //&& databaseMessengerId === databaseData?.mainMessagingSenderId
        // if (!isTransitioning) {
        //     await updateData(`${getRoomPath()}`, { currentTime: seconds.playedSeconds });
        // }
    }

    const handleEnd = async (event) => {
        console.log("end event", event)
        if (!databaseData.playList || databaseData.playList.length === 0) {
            return;
        }
        let currentVideoIndex;
        let currentVideoEntry;
        Object.entries(databaseData.playList).forEach((entry, i) => {
            if (entry[1].videoId === databaseData.specificVideo) {
                currentVideoIndex = i;
                currentVideoEntry = entry[0];
            }
        })
        setIsTransitioning(true);
        //block handle seek for updating current time with wrong values
        if (Object.entries(databaseData.playList).length > currentVideoIndex + 1) {
            await updateData(`${getRoomPath()}`, { isPlaying: false, specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].videoId });
            await updateData(`${getRoomPath()}`, { videoTimeStamp: createTimeStamp() });
            await updateData(`${getRoomPath()}`, { isPlaying: true });
        } else if (databaseData.autoPlaylist && Object.entries(databaseData.playListList).length > 1) {
            //if autoplaylist is set to true, we need to direct user to another playlist if they exist
            //if there are playlist+1 direct to that playlist, if !playlist+1 direct to first playlist
            let activePlaylistIndex;
            Object.entries(databaseData.playListList).forEach((entry, i) => {
                //find active playlist
                if (entry[1].isPlaylistActive) {
                    activePlaylistIndex = i;
                }
            })
            if (Object.values(databaseData.playListList)[activePlaylistIndex + 1]) {
                replaceCurrentPlaylist(Object.values(databaseData.playListList)[activePlaylistIndex + 1].playlistId)
            } else {
                replaceCurrentPlaylist(Object.values(databaseData.playListList)[0].playlistId)
            }
        } else {
            await updateData(`${getRoomPath()}`, { specificVideo: Object.values(databaseData.playList)[0].videoId, videoTimeStamp: createTimeStamp(), isPlaying: true });
        }
        setIsTransitioning(false);

        if (event === 150 && currentVideoEntry) {
            //remove video from playlist with 150 error from playlist
            //current playing video already should be next so we can safely remove video from playlist
            await removeData(`${getRoomPath()}/playList/${currentVideoEntry}`);
            console.error("author does not allow playing this outside youtube, removing video from playlist: ", currentVideoEntry);
        }
    }

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
        const playlistData = await fetchData(playlistId);
        if (playlistData.length > 0) {
            let entryId = null;

            Object.entries(databaseData.playListList).forEach((entry, i) => {
                if (entry[1].playlistId === playlistId) {
                    entryId = entry[0];
                } else if (entry[1].isPlaylistActive) {
                    updateData(`${getRoomPath()}/playListList/${entry[0]}`, { isPlaylistActive: false });
                }
            })
            await removeData(`${getRoomPath()}/playList`);
            await updateData(`${getRoomPath()}/playListList/${entryId}`, { isPlaylistActive: true });
            firstVideoId = playlistData[0].videoId;
            playlistData.forEach(video => {
                addToPlaylist(video)
            });
            if (firstVideoId) {
                replaceCurrentVideo(firstVideoId);
            }
        }
    }

    const addToPlaylist = async (video) => {
        await pushData(`${getRoomPath()}/playList`, video);
    }

    const replaceCurrentVideo = async (videoId) => {
        updateData(`${getRoomPath()}`, { specificVideo: videoId, videoTimeStamp: createTimeStamp(), isPlaying: true });
    }

    const handleStart = () => {
        const timeinseconds = calculateDiffBetweenTimestampAndNow(databaseData.videoTimeStamp)
        player.current.seekTo(timeinseconds);
    }

    const onPause = async () => {
        await updateData(`${getRoomPath()}`, { isPlaying: false });
    }

    const onPlay = async () => {
        await updateData(`${getRoomPath()}`, { isPlaying: true });
    }

    const handleBuffer = () => {
        console.log("buffer on")
    }

    const handleBufferEnd = () => {
        console.log("buffer end")
    }

    return (
        <div className="player pos-rel">
            <ReactPlayer
                //style={{ pointerEvents: "none", WebkitUserSelect: "none", msUserSelect: "none", userSelect: "none" }}
                playing={databaseData.isPlaying}
                controls={true}
                url={`https://www.youtube.com/watch?v=${databaseData.specificVideo}`}
                // onPause={onPause}
                // onPlay={onPlay}
                onProgress={handleSeek}
                onEnded={handleEnd}
                onError={handleEnd}
                onReady={handleStart}
                //onBuffer={handleBuffer}
                // onBufferEnd={handleStart}
                //onStart={handleStart}
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
            {/* <div className="video-controls-container">
                <VolumeControls
                    onPause={onPause}
                    onPlay={onPlay}
                    databaseData={databaseData}
                    setIsMuted={setIsMuted}
                    isMuted={isMuted}
                />
                <VolumeSlider volume={volume} setVolume={setVolume} setIsMuted={setIsMuted} />
            </div> */}
        </div>
    );
};

