import React from "react";

export default function VideoCard({ video, method }) {
    return (
        <div key={video.id.videoId} className='videoResultCard'>
            <h2>{video.snippet.title}</h2>
            <img height="200px" width="400px" src={video.snippet.thumbnails.high.url} />
            <button className="addToPlaylistButton" onClick={() => method(video)}>add</button>
        </div>
    )
}