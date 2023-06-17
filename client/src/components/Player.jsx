import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import io from 'socket.io-client';


const Player = () => {
    const socket = io('https://yt-share-server.vercel.app', { path: '/socket.io' });
    const [playerState, setPlayerState] = useState(-1);
    const [playerTime, setPlayerTime] = useState(0);

    useEffect(() => {
        socket.on('playVideo', (data) => {
            setPlayerState(1);
            setPlayerTime(data.time);
        });

        socket.on('pauseVideo', (data) => {
            setPlayerState(2);
            setPlayerTime(data.time);
        });

        socket.on('seekVideo', (data) => {
            setPlayerState(1);
            setPlayerTime(data.time);
        });

        return () => {
            socket.off('playVideo');
            socket.off('pauseVideo');
            socket.off('seekVideo');
        };
    }, []);

    const handlePlayerStateChange = (event) => {
        const { target } = event;
        const { currentTime, playerState: state } = target;
        setPlayerTime(currentTime);

        if (state === 1) {
            socket.emit('playVideo', { time: currentTime });
        } else if (state === 2) {
            socket.emit('pauseVideo', { time: currentTime });
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
        },
    };

    return (
        <div className="App">
            <h1>YouTube Sync</h1>
            <YouTube
                videoId="YOUR_VIDEO_ID"
                opts={opts}
                onStateChange={handlePlayerStateChange}
                onSeek={handlePlayerSeek}
            />
            <p>Current Time: {playerTime}</p>
        </div>
    );
};

export default Player;
