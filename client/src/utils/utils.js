import { createTimestamp } from "../db"

export function toUsedVideoObject(video) {
    return {
        videoId: video.id.videoId,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        videoTitle: video.snippet.title
    }
}

export function playlistVideoToUsedVideoObject(video) {
    return {
        videoId: video.snippet.resourceId.videoId,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        videoTitle: video.snippet.title
    }
}

export function playlistSearchToPlaylistObject(playlist) {
    return {
        playlistId: playlist.id.playlistId,
        playlistTitle: playlist.snippet.title,
        thumbnailUrl: playlist.snippet.thumbnails.high.url
    }
}

export const trimVideoTxt = (txt) => {
    const t = capitalizeWords(txt)
    if (t.length > 40) {
        return t.substring(0, 30) + '...';
    }
    return t;
}

export function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

export function createUuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
    );
}

export function getRoomPath() {
    const key = localStorage.getItem("room_key");
    return `rooms/${key}`
}

export function createTimeStamp() {
    //return Date.now();
    return createTimestamp();
}

export function calculateDiffBetweenTimestampAndNow(videoTimestamp) {
    const now = Date.now();
    console.log("now", now);
    console.log("now in date", Date.now())
    const diffInMiliSeconds = now - videoTimestamp;
    const diffInSeconds = diffInMiliSeconds / 1000;
    console.log("ms", diffInMiliSeconds)
    console.log("sec", diffInSeconds)
    //return diffInSeconds
    const diff = diffInSeconds < 0 ? 0 : diffInSeconds;
    console.log("diff", diff)
    return diff;
}

//pc - 1690308729971
//laptop - 1690308752658