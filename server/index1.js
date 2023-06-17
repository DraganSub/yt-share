const express = require('express')
const { WebSocketServer } = require("ws")

const socketServer = new WebSocketServer({ port: 443 })
const app = express()
const port = 3001;

app.listen(port, () => {
    console.log(`player listening on port ${port}`)
})

socketServer.on("connection", ws => {
    console.log("new connection");
    ws.send(JSON.stringify({
        message: "connection-established"
    }));

    ws.on("message", (event) => {
        console.log("message come", JSON.parse(event))
        const data = JSON.parse(event.toString('utf8'));
        if (data.message === "playVideo") {
            console.log("message send")
            socketServer.clients.forEach(client => {
                client.send(
                    JSON.stringify({
                        message: "playVideo",
                        time: data.time
                    })
                )
            })
        }

    })

    ws.on("close", () => console.log("client disconnected"));


})


