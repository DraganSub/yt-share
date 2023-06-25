import React from "react";
import { trimVideoTxt } from "../../utils/utils";
import { AddToPlaylistIcon } from "../icons/AddToPlaylistIcon";

export default function VideoCard({ video, inPlaylist, method, videoId, removeMethod }) {

    const text = !inPlaylist ? <AddToPlaylistIcon />
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