const express = require('express')
const { WebSocketServer } = require("ws")
const cors = require('cors');
require('dotenv').config()
const socketServer = new WebSocketServer({ port: 443 })
const app = express()
app.use(cors())
app.listen(port, () => {
    console.log(`player listening on port ${process.env.PORT}`)
})
let currentTime = 0;
let playList = [];
let specificVideo = null;

socketServer.on("connection", ws => {
    console.log("new connection");
    ws.send(JSON.stringify({
        message: "connection-established"
    }));
    console.log("current currentTime", currentTime)
    ws.send(JSON.stringify({
        message: "currentTime",
        currentTime: currentTime
    }))
    ws.send(JSON.stringify({
        message: "currentPlaylist",
        playList: playList
    }))
    ws.send(JSON.stringify({
        message: "currentVideo",
        videoId: specificVideo || playList[0]?.video.id.videoId || null
    }))

    ws.on("message", (event) => {
        console.log("message come", JSON.parse(event))
        const data = JSON.parse(event.toString('utf8'));
        if (data.message === "playVideo") {
            console.log("message send")
            socketServer.clients.forEach(client => {
                client.send(
                    JSON.stringify({
                        message: "play",
                    })
                )
            })
        } else if (data.message === "stopVideo") {
            socketServer.clients.forEach(client => {
                client.send(
                    JSON.stringify({
                        message: "stop",
                    })
                )
            })
        } else if (data.message === "seekSeconds") {
            if (currentTime < data.currentTime) {
                console.log("reset currenttime to bigger value")
                currentTime = data.currentTime;
            }
        } else if (data.message === "addToPlaylist") {
            console.log("added video to list", data.video)
            playList.push({ video: data.video });
            socketServer.clients.forEach(client => {
                client.send(JSON.stringify({
                    message: "newPlaylistEntry",
                    playList: playList
                }))
            })
        } else if (data.message === "playSpecificVideo") {
            specificVideo = data.video.id.videoId;
            currentTime = 0;
            socketServer.clients.forEach(client => {
                console.log(JSON.stringify({
                    message: "playSpecificVideoInPlayer",
                    video: data.video.id.videoId
                }))
                client.send(JSON.stringify({
                    message: "playSpecificVideoInPlayer",
                    video: data.video.id.videoId
                }))
            })
        } else if (data.message === "removeVideoFromPlaylist") {
            const currentPlaylist = playList;
            const newPlaylist = currentPlaylist.filter(video => data.video.id.videoId !== video.video.id.videoId);
            const index = playList.findIndex(item => item.video.id.videoId === data.video.id.videoId);
            if (index !== null || index !== undefined) {
                if (playList.length > index + 1) {
                    specificVideo = playList[index + 1].video.id.videoId;
                } else {
                    specificVideo = playList[0].video.id.videoId;
                }
                currentTime = 0;
                socketServer.clients.forEach(client => {
                    client.send(JSON.stringify({
                        message: "playSpecificVideoInPlayer",
                        video: specificVideo
                    }))
                })
            }
            playList = newPlaylist;
            socketServer.clients.forEach(client => {
                client.send(JSON.stringify({
                    message: "newPlaylistEntry",
                    playList: playList
                }))
            })
        } else if (data.message === "onCurrentVideoEnd" || data.message === "onYoutubeError") {
            const index = playList.findIndex(item => item.video.id.videoId === data.videoId);
            console.log(index)
            if (index !== null || index !== undefined) {
                currentTime = 0;
                console.log(playList.length)
                if (playList.length > index + 1) {
                    specificVideo = playList[index + 1].video.id.videoId;

                } else {
                    specificVideo = playList[0].video.id.videoId;
                }
                socketServer.clients.forEach(client => {
                    client.send(JSON.stringify({
                        message: "playSpecificVideoInPlayer",
                        video: specificVideo
                    }))
                })
            }
        }

    })

    ws.on("close", () => console.log("client disconnected"));


})


