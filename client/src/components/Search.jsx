import React, { useState } from 'react';
import axios from 'axios';
import { VideoCard } from ".";
import { push, ref } from "firebase/database";
import { database } from '../firebase';
import { toUsedVideoObject } from '../utils';

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
            setVideos(response.data.items.map((video) => toUsedVideoObject(video)));
        } catch (error) {
            console.error(error);
        }
    };

    const addToPlaylist = async (video) => {
        await push(ref(database, "youtubeData/playList"), video)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="search--form">
                <input className="serach--input" type="text" value={searchTerm} placeholder="Search Music" onChange={handleChange} />
                <button className="search--btn" type="submit"> <svg
                    fill="white"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    style={{ background: "transparent" }}
                >
                    <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg></button>
            </form>
            <div className="search--videos">
                {videos.map((video) => (
                    <VideoCard video={video} method={addToPlaylist} />
                ))}
            </div>
        </div>
    );

}