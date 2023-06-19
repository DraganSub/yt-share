import React, { useEffect } from "react";
import { VideoCard } from ".";
import { update, ref, remove } from "firebase/database";
import { database } from "../firebase";
import MusicWave from "./MusicWave";

export default function Playlist({ databaseData }) {

    if (databaseData?.playList == null) {
        return <div>Empty playlist</div>
    }
    const playVideo = (video) => {
        update(ref(database, "youtubeData/"), { specificVideo: video.id.videoId, currentTime: 0, isPlaying: true })
    }



    const removeVideoFromPlaylist = (video) => {
        let entryId = null;
        let currentVideoIndex;
        Object.entries(databaseData.playList).map((entry, i) => {
            if (entry[1].id.videoId === video.id.videoId) {
                entryId = entry[0];
                currentVideoIndex = i;
            }
        })

        if (entryId) {
            remove(ref(database, `youtubeData/playList/${entryId}`))
        }

        if (video.id.videoId === databaseData.specificVideo) {
            if (Object.values(databaseData.playList).length > currentVideoIndex + 1) {
                update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].id.videoId, currentTime: 0, isPlaying: true })
            } else {
                update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].id.videoId, currentTime: 0, isPlaying: true })
            }
        }

    }

    return <>
        <div className="flex flex-cl playlist--container">
            <div class="carousel">
                <CurrentPlayingSong data={databaseData} />
            </div>
            <div className="playlist--list">
                {Object.values(databaseData.playList).map(video => <VideoCard video={video} inPlaylist method={playVideo} videoId={databaseData.specificVideo} removeMethod={removeVideoFromPlaylist} />)}
            </div>
        </div>
    </>
}

function CurrentPlayingSong(data) {
    if (data?.data.playList == null) {
        return <div>Not playing any song currently.</div>
    }

    const id = Object.values(data.data.playList).findIndex(element => element.id.videoId == data.data.specificVideo)


    const test = Object.values(data.data.playList).map((vid, i) => {

        if (i == id) {
            const sideImg = Object.values(data.data.playList)

            return <div className="pos-rel flex center current">
                <img className="prev-played-video" src={sideImg[i - 1]?.snippet.thumbnails.high.url} />
                <div className="pos-rel">
                    <img className="currently-playing-img" src={vid.snippet.thumbnails.high.url} />
                    <MusicWave isPlaying={data.data.isPlaying} />
                    <h3 className="playing--title">{vid.snippet.title}</h3>
                </div>
                <img className="next-played-video" src={sideImg[i + 1]?.snippet.thumbnails.high.url} />
            </div>
        }
    })

    return test;

}