import React from "react";
import { trimVideoTxt } from "../../utils/utils";

export default function VideoCard({ video, inPlaylist, method, videoId, removeMethod }) {

    const text = !inPlaylist ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-6 h-6 add--btn" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" style={{ background: "transparent" }} />
    </svg>
        : videoId === video.videoId ? "playing" : "play";


    return (
        <div className="pos-rel ">
            <div key={video.videoId} className='videoResultCard '>
                <div className="card--video-img">
                    <div className="lay"></div>
                    <img className="card--img" src={video.thumbnailUrl} />
                    <button className="addToPlaylistButton" onClick={() => method(video)}>{text}</button>
                </div>
                <div className="playlist-video-txt pos-txt-top">
                    <p title={video.videoTitle} className="pl-video--card card-title pl--card__title txt-big">{trimVideoTxt(video.videoTitle)}</p>
                    <span className="my-mix-sub-t" ><i className="my-mix-sub">Search result</i></span>
                </div>
                {removeMethod && <button onClick={() => removeMethod(video)}>Remove</button>}
            </div>
        </div>
    )
}