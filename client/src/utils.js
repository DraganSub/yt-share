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