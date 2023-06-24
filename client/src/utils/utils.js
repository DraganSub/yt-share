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