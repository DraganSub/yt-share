import React, { useState } from 'react';
import axios from 'axios';
import { VideoCard } from "..";
import { push, ref } from "firebase/database";
import { database } from '../../utils/firebase';
import { toUsedVideoObject } from '../../utils/utils';
import { SearchbarSearchIcon } from '../icons/SearchbarSearchIcon';

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
                        maxResults: 10,
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
                <button className="search--btn" type="submit">
                    <SearchbarSearchIcon />
                </button>
            </form>
            <div className="search--videos search--bottom" style={{ marginTop: "20px" }}>
                {videos.map((video) => (
                    <VideoCard video={video} method={addToPlaylist} />
                ))}
            </div>
        </div>
    );

}