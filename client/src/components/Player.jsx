
import Youtube from "react-youtube";
import React, { useEffect, useState } from "react";


export default function Player({ socket }) {
    const [playerState, setPlayerState] = useState(-1);
    const [playerTime, setPlayerTime] = useState(0);


    useEffect(() => {
        socket.onmessage = (event) => {
            console.log(event)
            const data = JSON.parse(event.data);
            if (data.message === "playVideo") {
                setPlayerState(1);
                setPlayerTime(data.time);
            }
        }
        // socket.on('playVideo', (data) => {
        //     setPlayerState(1);
        //     setPlayerTime(data.time);
        // });

        // socket.on('pauseVideo', (data) => {
        //     setPlayerState(2);
        //     setPlayerTime(data.time);
        // });

        // socket.on('seekVideo', (data) => {
        //     setPlayerState(1);
        //     setPlayerTime(data.time);
        // });

        // return () => {
        //     socket.off('playVideo');
        //     socket.off('pauseVideo');
        //     socket.off('seekVideo');
        // };

    }, []);

    const handlePlayerStateChange = (event) => {
        const { target } = event;
        const { currentTime, playerState: state } = target;
        setPlayerTime(currentTime);
        console.log(event)

        if (event.data === 1) {
            // socket.emit('playVideo', { time: currentTime });
            socket.send(JSON.stringify({ message: "playVideo", time: playerTime }))
        } else if (event.data === 2) {
            socket.send(JSON.stringify({ message: "stopVideo", time: currentTime }))
            // socket.emit('pauseVideo', { time: currentTime });
        }
    };

    const handlePlayerSeek = (event) => {
        const { target } = event;
        const { currentTime } = target;
        setPlayerTime(currentTime);

        socket.emit('seekVideo', { time: currentTime });
    };

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1,
            start: playerTime
        },
    };

    return (
        <div className="App">
            <h1>YouTube Sync</h1>
            <Youtube
                videoId="jEzUuwqf_ZU"
                opts={opts}
                onStateChange={handlePlayerStateChange}
            //onSeek={handlePlayerSeek}
            />
            <p>Current Time: {playerTime}</p>
        </div>
    );
};
