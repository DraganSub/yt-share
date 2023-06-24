import React, { useState } from "react";
import axios from "axios";
import { playlistSearchToPlaylistObject } from "../../utils/utils";
import { PlaylistSearchCard } from "../cards";

const API_KEY = 'AIzaSyAX9r_Id8dEmOFAF2MPpFhim-Trf4vGdco';

export default function SearchPlaylists() {
    const [searchTerm, setSearchTerm] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchPlaylists();
    };

    const searchPlaylists = async () => {
        try {
            const response = await axios.get(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&type=playlist&key=${API_KEY}`
            );
            setPlaylists(response.data.items.map((playlist) => playlistSearchToPlaylistObject(playlist)));
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="search--form">
                <input className="serach--input" type="text" value={searchTerm} placeholder="Search Playlists" onChange={handleChange} />
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
            <div className="search--videos search--bottom" style={{ marginTop: "20px" }}>
                {playlists.map(playlist => <PlaylistSearchCard playlist={playlist} />)}
            </div>
        </div>
    );
}