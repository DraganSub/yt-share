import React, { useState } from 'react';
import axios from 'axios';
import { VideoCard } from ".";
import { push, ref } from "firebase/database";
import { database } from '../firebase';

const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [videos, setVideos] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchVideos();
    };

    const searchVideos = async () => {
        try {
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        key: API_KEY,
                        q: searchTerm,
                        part: 'snippet',
                        type: 'video',
                        maxResults: 5,
                    },
                }
            );
            setVideos(response.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    const addToPlaylist = (video) => {
        push(ref(database, "youtubeData/playList"), video)
    }

    return (
        <div>
            <h1>YouTube Video Search</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <div>
                {videos.map((video) => (
                    <VideoCard video={video} method={addToPlaylist} />
                ))}
            </div>
        </div>
    );

}