import React, { useState } from "react";
import { update, ref, remove } from "firebase/database";
import { database } from "../firebase";
import MusicWave from "./MusicWave";
import VideoPlaylistCard from "./VideoPlaylistCard";
import AddWholePlaylist from "./AddWholePlaylist";
import { playlistVideoToUsedVideoObject } from "../utils";

export default function Playlist({ databaseData }) {

    // if (databaseData?.playList == null) {
    //     return <div>Empty playlist</div>
    // }
    const playVideo = async (video) => {
        await update(ref(database, "youtubeData/"), { specificVideo: video.videoId, currentTime: 0, isPlaying: true })
    }



    const removeVideoFromPlaylist = async (video) => {
        let entryId = null;
        let currentVideoIndex;
        Object.entries(databaseData.playList).map((entry, i) => {
            if (entry[1].videoId === video.videoId) {
                entryId = entry[0];
                currentVideoIndex = i;
            }
        })

        if (entryId) {
            await remove(ref(database, `youtubeData/playList/${entryId}`))
        }

        if (video.videoId === databaseData.specificVideo) {
            if (Object.values(databaseData.playList).length > currentVideoIndex + 1) {
                await update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].videoId, currentTime: 0, isPlaying: true })
            } else {
                await update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].videoId, currentTime: 0, isPlaying: true })
            }
        }
    }

    return <>
        <div className="flex flex-cl playlist--container">
            {/*   <div class="carousel">
                <CurrentPlayingSong data={databaseData} />
            </div> */}
            <div className="playlist--list">
                <div className="playlist--container">
                    <div className="pos-rel playlist--title-container playlist--top">
                        <p className="current-title">Your current playlist:
                            <br />
                        </p>
                        <div className="add--accordion-section">
                            <AddPlaylistAccordion />
                        </div>
                    </div>
                    <PlaylistList databaseData={databaseData} />
                </div>
            </div>
        </div>
    </>
}

function PlaylistList({ databaseData }) {
    if (!databaseData || !databaseData.playList || databaseData.playList.length == 0) {
        return <div className="playlist--bottom">Empty playlist</div>
    }

    const playVideo = async (video) => {
        await update(ref(database, "youtubeData/"), { specificVideo: video.videoId, currentTime: 0, isPlaying: true })
    }

    const removeVideoFromPlaylist = async (video) => {
        let entryId = null;
        let currentVideoIndex;
        Object.entries(databaseData.playList).map((entry, i) => {
            if (entry[1].videoId === video.videoId) {
                entryId = entry[0];
                currentVideoIndex = i;
            }
        })

        if (entryId) {
            await remove(ref(database, `youtubeData/playList/${entryId}`))
        }

        if (video.videoId === databaseData.specificVideo) {
            if (Object.values(databaseData.playList).length > currentVideoIndex + 1) {
                await update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].videoId, currentTime: 0, isPlaying: true })
            } else {
                await update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].videoId, currentTime: 0, isPlaying: true })
            }
        }
    }

    return <div className="playlist--bottom">
        {Object.values(databaseData.playList).map(video => <VideoPlaylistCard
            video={video}
            isActive={databaseData.specificVideo == video.videoId}
            inPlaylist
            method={playVideo}
            isPlaying={databaseData.specificVideo == video.videoId && databaseData.isPlaying}
            videoId={databaseData.specificVideo}
            removeMethod={removeVideoFromPlaylist}
        />)}
    </div>
}

function CurrentPlayingSong(data) {
    if (data?.data.playList == null) {
        return <div>Not playing any song currently.</div>
    }

    const id = Object.values(data.data.playList).findIndex(element => element.videoId == data.data.specificVideo)


    const test = Object.values(data.data.playList).map((vid, i) => {

        if (i == id) {
            const sideImg = Object.values(data.data.playList)

            return <div className="pos-rel flex center current">
                <img className="prev-played-video" src={sideImg[i - 1]?.thumbnailUrl} />
                <div className="pos-rel">
                    <img className="currently-playing-img" src={vid.thumbnailUrl} />
                    <MusicWave isPlaying={data.data.isPlaying} />
                    <h3 className="playing--title">{vid.videoTitle}</h3>
                </div>
                <img className="next-played-video" src={sideImg[i + 1]?.thumbnailUrl} />
            </div>
        }
    })

    return test;

}

function AddPlaylistAccordion() {

    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div className="add-pl--btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-6 h-6" style={{ width: "30px", height: "30px", background: "transparent" }} onClick={() => setIsOpen(!isOpen)}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        {isOpen && <div className="add--form-accordion">
            <AddWholePlaylist />
        </div>}
    </>


}