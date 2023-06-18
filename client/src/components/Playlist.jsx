import React from "react";
import { useEffect, useState } from "react";
import { VideoCard } from ".";
import { update, ref, child, remove } from "firebase/database";
import { database } from "../firebase";

export default function Playlist({ databaseData }) {

    if (databaseData?.playList == null) {
        return <div>Empty playlist</div>
    }
    const playVideo = (video) => {
        update(ref(database, "youtubeData/"), { specificVideo: video.id.videoId, currentTime: 0 })
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
                update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[currentVideoIndex + 1].id.videoId, currentTime: 0 })
            } else {
                update(ref(database, "youtubeData/"), { specificVideo: Object.values(databaseData.playList)[0].id.videoId, currentTime: 0 })
            }
        }

    }

    return <div>
        Playlist:
        <div>
            {Object.values(databaseData.playList).map(video => <VideoCard video={video} inPlaylist method={playVideo} videoId={databaseData.specificVideo} removeMethod={removeVideoFromPlaylist} />)}
        </div>
    </div>
}