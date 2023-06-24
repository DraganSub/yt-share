import { ref, remove, update } from "@firebase/database";
import { database } from "../../utils/firebase";
import { VideoPlaylistCard } from "../cards";

export default function PlaylistList(data) {
  const {
    databaseData,
  } = data;
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