import React from "react";
import { MusicWave } from "..";
import { trimVideoTxt } from "../../utils/utils";

export default function VideoPlaylistCard({ video, isActive, method, removeMethod, isPlaying }) {
  return (
    <div className="pos-rel play-hov">
      <div key={video.videoId} className={isActive ? " video-playlist__card pl-is-active" : "video-playlist__card"} onClick={() => method(video)}>
        <div className="pl-video--card pl--card__video-img pos-rel">
          <img className="pl-video--card pl--card__img" src={video.thumbnailUrl} />
          <MusicWave className="inside-video--img" isPlaying={isPlaying} />
        </div>
        <div className="playlist-video-txt">
          <p title={video.videoTitle} className="pl-video--card card-title pl--card__title">{trimVideoTxt(video.videoTitle)}</p>
          <span className="my-mix-sub-t" ><i className="my-mix-sub">My Mix</i></span>
        </div>
      </div>
      {removeMethod && <button className="pl--remove-from-playlist" onClick={() => removeMethod(video)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6  add--btn" stroke="white"
          style={{ width: "25px", height: "25px", background: "transparent" }}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" style={{ background: "transparent" }} />
        </svg>
      </button>}
    </div>
  )
}