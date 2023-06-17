const express = require('express')
const { WebSocketServer } = require("ws")
const cors = require('cors');

const socketServer = new WebSocketServer({ port: 443 })
const app = express()
const port = 3001;

app.use(cors())
app.listen(port, () => {
    console.log(`player listening on port ${port}`)
})
let currentTime = 0;

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
        }

    })

    ws.on("close", () => console.log("client disconnected"));


})


